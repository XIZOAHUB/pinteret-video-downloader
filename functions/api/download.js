// functions/api/download.js
// Cloudflare Pages Function — handles POST /api/download

export async function onRequestPost(context) {
  const { request } = context;

  // CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), { status: 400, headers });
  }

  const url = (body.url || "").trim();

  if (!url) {
    return new Response(JSON.stringify({ error: "Please provide a URL." }), { status: 400, headers });
  }

  if (!isPinterestUrl(url)) {
    return new Response(JSON.stringify({ error: "Please enter a valid Pinterest URL." }), { status: 400, headers });
  }

  try {
    const result = await extractPinMedia(url);
    return new Response(JSON.stringify({ success: true, data: result }), { status: 200, headers });
  } catch (err) {
    const msg = err.message || "Failed to extract media.";
    const status = msg.includes("private") ? 403 : msg.includes("not found") ? 404 : 500;
    return new Response(JSON.stringify({ error: msg }), { status, headers });
  }
}

// Handle OPTIONS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isPinterestUrl(url) {
  try {
    const parsed = new URL(url);
    return /pinterest\.(com|co\.[a-z]{2}|[a-z]{2})$/i.test(parsed.hostname) || url.includes("pin.it");
  } catch {
    return false;
  }
}

function getRandomUA() {
  const agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
  ];
  return agents[Math.floor(Math.random() * agents.length)];
}

async function expandShortUrl(url) {
  if (!url.includes("pin.it")) return url;
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": getRandomUA() },
    });
    return res.url || url;
  } catch {
    return url;
  }
}

async function extractPinMedia(rawUrl) {
  const url = await expandShortUrl(rawUrl);

  const res = await fetch(url, {
    headers: {
      "User-Agent": getRandomUA(),
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Referer": "https://www.pinterest.com/",
      "DNT": "1",
    },
    redirect: "follow",
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("Pin not found. Check the link.");
    if (res.status === 403 || res.status === 401) throw new Error("This pin is private.");
    throw new Error(`Pinterest returned status ${res.status}.`);
  }

  const html = await res.text();

  // ── Extract via regex ──────────────────────────────────────────────────────
  const videoUrls = [];
  const imageUrls = [];

  // Video patterns
  const videoRe = /https:\/\/v[\d]?\.pinimg\.com\/[^\s"'\\]+?\.mp4/g;
  for (const m of html.matchAll(videoRe)) videoUrls.push(m[0]);

  // Image patterns
  const imgRe = /https:\/\/i\.pinimg\.com\/(?:originals|736x|564x)\/[^\s"'\\]+?\.(jpg|jpeg|png|gif|webp)/g;
  for (const m of html.matchAll(imgRe)) imageUrls.push(m[0]);

  // ── Try __PWS_DATA__ JSON blob ─────────────────────────────────────────────
  const pwsMatch = html.match(/__PWS_DATA__\s*=\s*(\{.+?\})\s*(?:<\/script>|;)/s);
  if (pwsMatch) {
    try {
      const str = pwsMatch[1];
      const vMatches = str.matchAll(/https:\\\/\\\/v[\d]?\.pinimg\.com[^"\\]+?\.mp4/g);
      for (const m of vMatches) videoUrls.push(m[0].replace(/\\\//g, "/"));

      const iMatches = str.matchAll(/https:\\\/\\\/i\.pinimg\.com\\\/originals[^"\\]+/g);
      for (const m of iMatches) imageUrls.push(m[0].replace(/\\\//g, "/"));
    } catch (_) {}
  }

  // ── og: meta tags ──────────────────────────────────────────────────────────
  const ogVideoMatch = html.match(/<meta[^>]+property="og:video"[^>]+content="([^"]+)"/);
  const ogImageMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
  const ogTitleMatch = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/);
  const ogDescMatch  = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/);
  const titleMatch   = html.match(/<title[^>]*>([^<]+)<\/title>/);

  if (ogVideoMatch) videoUrls.unshift(ogVideoMatch[1]);
  if (ogImageMatch) imageUrls.unshift(ogImageMatch[1]);

  const title = (ogTitleMatch?.[1] || titleMatch?.[1] || "Pinterest Pin")
    .replace(" | Pinterest", "")
    .trim();
  const description = ogDescMatch?.[1] || "";

  // De-duplicate
  const uniqueVideos = [...new Set(videoUrls)].filter(Boolean);
  const uniqueImages = [...new Set(imageUrls)].filter(Boolean);

  if (uniqueVideos.length === 0 && uniqueImages.length === 0) {
    throw new Error("No media found. Make sure the pin is public.");
  }

  // Type detection
  let type = "image";
  if (uniqueVideos.length > 0) type = "video";
  else if (uniqueImages[0]?.match(/\.gif/i)) type = "gif";

  // Quality variants
  let qualities = [];
  if (type === "video" && uniqueVideos.length > 0) {
    const base = uniqueVideos[0];
    qualities = [
      { label: "HD (720p)", url: base },
      { label: "SD (480p)", url: base.replace("V_720P", "V_480P").replace("hls720p", "hls480p") },
      { label: "Low (360p)", url: base.replace("V_720P", "V_360P").replace("hls720p", "hls360p") },
    ];
  }

  return {
    type,
    title,
    description,
    thumbnail: uniqueImages[0] || null,
    videos: uniqueVideos,
    images: uniqueImages,
    qualities,
    sourceUrl: url,
  };
}
