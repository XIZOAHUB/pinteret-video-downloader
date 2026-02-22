// functions/api/proxy.js
// Cloudflare Pages Function — GET /api/proxy?url=...&name=...
// Streams Pinterest CDN media to browser as a direct download

export async function onRequestGet({ request }) {
  const { searchParams } = new URL(request.url);
  const mediaUrl = searchParams.get("url") || "";
  const filename = (searchParams.get("name") || "pinterest-download")
    .replace(/[^a-z0-9_\-\.]/gi, "_").slice(0, 120);

  if (!mediaUrl) {
    return txt("Missing ?url param.", 400);
  }

  // Only allow Pinterest CDN
  let parsed;
  try { parsed = new URL(mediaUrl); } catch { return txt("Invalid URL.", 400); }
  if (!/^(i|v|v1|v2)\.pinimg\.com$/.test(parsed.hostname)) {
    return txt("Only Pinterest CDN URLs are allowed.", 403);
  }

  try {
    const upstream = await fetch(mediaUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36",
        "Referer": "https://www.pinterest.com/",
        "Accept": "*/*",
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!upstream.ok) return txt(`Pinterest CDN error: ${upstream.status}`, 502);

    const ct = upstream.headers.get("content-type") || "application/octet-stream";
    const cl = upstream.headers.get("content-length") || "";

    const respHeaders = new Headers({
      "Content-Type": ct,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    });
    if (cl) respHeaders.set("Content-Length", cl);

    return new Response(upstream.body, { status: 200, headers: respHeaders });
  } catch (e) {
    return txt("Proxy failed: " + e.message, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS" },
  });
}

function txt(msg, status) {
  return new Response(msg, { status, headers: { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" } });
}
