// functions/api/proxy.js
// Cloudflare Pages Function — GET /api/proxy?url=...&filename=...
// Streams Pinterest CDN files to client (avoids CORS issues)

export async function onRequestGet(context) {
  const { request } = context;
  const reqUrl = new URL(request.url);
  const mediaUrl = reqUrl.searchParams.get("url");
  const filename = (reqUrl.searchParams.get("filename") || "pinterest-download").replace(/[^a-z0-9_\-\.]/gi, "_");

  if (!mediaUrl) {
    return new Response("Missing ?url parameter.", { status: 400 });
  }

  // Security: only allow Pinterest CDN domains
  let parsedMedia;
  try {
    parsedMedia = new URL(mediaUrl);
  } catch {
    return new Response("Invalid URL.", { status: 400 });
  }

  const allowedHosts = /^(i|v|v1|v2)\.pinimg\.com$/;
  if (!allowedHosts.test(parsedMedia.hostname)) {
    return new Response("Only Pinterest CDN URLs are allowed.", { status: 403 });
  }

  try {
    const upstream = await fetch(mediaUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.pinterest.com/",
      },
    });

    if (!upstream.ok) {
      return new Response("Failed to fetch media from Pinterest.", { status: upstream.status });
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";

    // Stream the response
    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": upstream.headers.get("content-length") || "",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response("Proxy error: " + err.message, { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
