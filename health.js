// functions/api/health.js
export async function onRequestGet() {
  return new Response(
    JSON.stringify({ status: "ok", service: "PinSave - Pinterest Downloader", timestamp: new Date().toISOString() }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
