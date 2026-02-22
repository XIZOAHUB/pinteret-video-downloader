// functions/api/download.js
// Cloudflare Pages Function — POST /api/download
// Multiple extraction methods for maximum reliability

export async function onRequestPost({ request }) {
  const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  // Parse body
  let body;
  try { body = await request.json(); }
  catch { return json({ error: "Invalid request body." }, 400, HEADERS); }

  const rawUrl = (body.url || "").trim();
  if (!rawUrl) return json({ error: "Please paste a Pinterest URL." }, 400, HEADERS);
  if (!isPinterestUrl(rawUrl)) return json({ error: "Please enter a valid Pinterest URL (pinterest.com or pin.it)." }, 400, HEADERS);

  // Try methods in order
  for (const method of [tryResourceApi, tryMobileHtml, tryOembed]) {
    try {
      const result = await method(rawUrl);
      if (result && (result.videos.length > 0 || result.images.length > 0)) {
        return json({ success: true, data: result }, 200, HEADERS);
      }
    } catch (_) {}
  }

  return json({
    error: "Could not download this pin. It may be private, or Pinterest is temporarily blocking our server. Please try again."
  }, 500, HEADERS);
}

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

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...headers } });
}

function isPinterestUrl(url) {
  try {
    const h = new URL(url).hostname;
    return /pinterest\.(com|co\.[a-z]{2}|[a-z]{2,3})$/i.test(h);
  } catch {
    return url.includes("pin.it/");
  }
}

function pinId(url) {
  return url.match(/\/pin\/(\d+)/)?.[1] || null;
}

function ua() {
  const list = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
  ];
  return list[Math.floor(Math.random() * list.length)];
}

async function resolveUrl(url) {
  if (!url.includes("pin.it")) return url;
  const r = await fetch(url, { method: "HEAD", redirect: "follow", headers: { "User-Agent": ua() }, signal: AbortSignal.timeout(8000) });
  return r.url || url;
}

function buildResult(videos, images, title, description, sourceUrl) {
  const type = videos.length > 0 ? "video" : (images[0]?.includes(".gif") ? "gif" : "image");
  const qualities = videos.length > 0 ? [
    { label: "HD (720p)", url: videos[0] },
    { label: "SD (480p)", url: videos[0].replace(/V_720P|hls720p/g, m => m === "V_720P" ? "V_480P" : "hls480p") },
  ].filter((q, i, a) => a.findIndex(x => x.url === q.url) === i) : [];
  return {
    type, title: (title || "Pinterest Pin").replace(" | Pinterest", "").trim(),
    description: description || "",
    thumbnail: images[0] || null,
    videos: [...new Set(videos)], images: [...new Set(images)],
    qualities, sourceUrl,
  };
}

// ─── Method 1: Pinterest Resource API ────────────────────────────────────────
async function tryResourceApi(rawUrl) {
  const fullUrl = await resolveUrl(rawUrl);
  const id = pinId(fullUrl);
  if (!id) throw new Error("No pin ID found.");

  const apiUrl = `https://www.pinterest.com/resource/PinResource/get/?data=${encodeURIComponent(JSON.stringify({
    options: { id, field_set_key: "unauth_react_main_pin" }, context: {}
  }))}&_=${Date.now()}`;

  const res = await fetch(apiUrl, {
    headers: {
      "User-Agent": ua(),
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": `https://www.pinterest.com/pin/${id}/`,
      "X-Requested-With": "XMLHttpRequest",
    },
    signal: AbortSignal.timeout(12000),
  });

  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  const pin = data?.resource_response?.data;
  if (!pin) throw new Error("No pin data.");

  const videos = [], images = [];

  // Videos
  const videoList = pin?.videos?.video_list || {};
  Object.values(videoList)
    .sort((a, b) => (b.width || 0) - (a.width || 0))
    .forEach(v => { if (v.url?.includes(".mp4")) videos.push(v.url); });

  // Images
  for (const k of ["orig", "736x", "564x", "474x", "236x"]) {
    if (pin?.images?.[k]?.url) images.push(pin.images[k].url);
  }

  return buildResult(videos, images, pin.title || pin.description, pin.description, fullUrl);
}

// ─── Method 2: HTML scraping (mobile UA) ─────────────────────────────────────
async function tryMobileHtml(rawUrl) {
  const fullUrl = await resolveUrl(rawUrl);
  const res = await fetch(fullUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Chrome/121.0.0.0 Mobile Safari/537.36",
      "Accept": "text/html,*/*;q=0.9",
      "Accept-Language": "en-US,en;q=0.8",
      "Referer": "https://www.google.com/",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(14000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  if (html.length < 200) throw new Error("Empty response");

  const videos = [...html.matchAll(/https:\/\/v[\d]?\.pinimg\.com\/[^\s"'\\<>]+\.mp4/g)].map(m => m[0]);
  const images = [...html.matchAll(/https:\/\/i\.pinimg\.com\/(?:originals|736x|564x)\/[^\s"'\\<>]+\.(?:jpg|jpeg|png|gif|webp)/g)].map(m => m[0]);

  // Try PWS data blob
  const pwsM = html.match(/__PWS_DATA__\s*=\s*(\{.+?\})\s*(?:<\/script>|;)/s);
  if (pwsM) {
    try {
      const s = pwsM[1];
      [...s.matchAll(/https:\\\/\\\/v[\d]?\.pinimg\.com[^"\\]+\.mp4/g)].forEach(m => videos.push(m[0].replace(/\\\//g, "/")));
      [...s.matchAll(/https:\\\/\\\/i\.pinimg\.com\\\/originals[^"\\]+/g)].forEach(m => images.push(m[0].replace(/\\\//g, "/")));
    } catch (_) {}
  }

  // og: tags
  const ogV = html.match(/property="og:video"\s+content="([^"]+)"/)?.[1] || html.match(/content="([^"]+)"\s+property="og:video"/)?.[1];
  const ogI = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1] || html.match(/content="([^"]+)"\s+property="og:image"/)?.[1];
  const ogT = html.match(/property="og:title"\s+content="([^"]+)"/)?.[1] || html.match(/content="([^"]+)"\s+property="og:title"/)?.[1];
  const ogD = html.match(/property="og:description"\s+content="([^"]+)"/)?.[1];

  if (ogV) videos.unshift(ogV);
  if (ogI) images.unshift(ogI);

  return buildResult(videos, images, ogT, ogD, fullUrl);
}

// ─── Method 3: oEmbed (images only fallback) ─────────────────────────────────
async function tryOembed(rawUrl) {
  const fullUrl = await resolveUrl(rawUrl);
  const res = await fetch(`https://www.pinterest.com/oembed.json?url=${encodeURIComponent(fullUrl)}`, {
    headers: { "User-Agent": ua() },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`oEmbed ${res.status}`);
  const data = await res.json();
  const thumb = data?.thumbnail_url;
  if (!thumb) throw new Error("No thumbnail");
  return buildResult([], [thumb], data?.title, "", fullUrl);
}
