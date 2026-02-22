/* PinSave — Shared App Logic
   All language pages include this file and set window.T (translations) before loading */

(function () {
  "use strict";

  // ── Language menu (Updated) ────────────────────────────────────────────────
  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");
  
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      langMenu.classList.toggle("open");
    });

    // Agar menu ke bahar ya button ke icon par click ho toh band karein
    document.addEventListener("click", (e) => {
      if (!langMenu.contains(e.target) && !langBtn.contains(e.target)) {
        langMenu.classList.remove("open");
      }
    });
  }

  // ── FAQ accordion ──────────────────────────────────────────────────────────
  document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains("on");
      document.querySelectorAll(".faq-item.on").forEach(el => el.classList.remove("on"));
      if (!isOpen) item.classList.add("on");
    });
  });

  // ── Paste from clipboard ───────────────────────────────────────────────────
  window.pasteUrl = async function () {
    try {
      const text = await navigator.clipboard.readText();
      const input = document.getElementById("pinUrl");
      if (input) input.value = text;
    } catch {
      document.getElementById("pinUrl")?.focus();
    }
  };

  // ── Auto-paste Pinterest URL from clipboard on input focus ─────────────────
  const pinInput = document.getElementById("pinUrl");
  if (pinInput) {
    pinInput.addEventListener("focus", async () => {
      if (pinInput.value) return;
      try {
        const t = await navigator.clipboard.readText();
        if (t && (t.includes("pinterest.com") || t.includes("pin.it"))) pinInput.value = t;
      } catch (_) {}
    });
    pinInput.addEventListener("keydown", e => { if (e.key === "Enter") startDownload(); });
  }

  // ── Core download flow ─────────────────────────────────────────────────────
  window.startDownload = async function () {
    const input = document.getElementById("pinUrl");
    const btn = document.getElementById("mainBtn");
    const errEl = document.getElementById("errBox");
    const resEl = document.getElementById("resBox");

    const url = (input?.value || "").trim();
    const T = window.T || {};

    // Reset UI
    if (errEl) errEl.style.display = "none";
    if (resEl) resEl.style.display = "none";

    if (!url) { showErr(T.err_empty || "Please paste a Pinterest URL."); return; }

    // Set loading
    btn?.classList.add("busy");

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      // Safely parse JSON
      let data;
      const raw = await res.text();
      try { data = JSON.parse(raw); }
      catch { throw new Error(T.err_server || "Server error. Please try again."); }

      if (!res.ok || !data.success) {
        throw new Error(data.error || T.err_fail || "Failed to get media. Please try again.");
      }

      renderResult(data.data);

    } catch (e) {
      showErr(e.message || (T.err_fail || "Something went wrong. Please try again."));
    } finally {
      btn?.classList.remove("busy");
    }
  };

  function showErr(msg) {
    const el = document.getElementById("errBox");
    const txt = document.getElementById("errTxt");
    if (!el) return;
    if (txt) txt.textContent = msg;
    el.style.display = "flex";
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function proxyUrl(mediaUrl, name) {
    return `/api/proxy?url=${encodeURIComponent(mediaUrl)}&name=${encodeURIComponent(name)}`;
  }

  function renderResult(d) {
    const T = window.T || {};
    const el = document.getElementById("resBox");
    if (!el) return;

    // Thumbnail
    const thumb = document.getElementById("resThumb");
    if (thumb) { thumb.src = d.thumbnail || ""; thumb.style.display = d.thumbnail ? "block" : "none"; }

    // Badge
    const badge = document.getElementById("resBadge");
    if (badge) {
      badge.textContent = d.type.toUpperCase();
      badge.className = "type-badge " + (d.type === "video" ? "tv" : d.type === "gif" ? "tg" : "ti");
    }

    // Title & desc
    const title = document.getElementById("resTitle");
    if (title) title.textContent = d.title || "Pinterest Pin";
    const desc = document.getElementById("resDesc");
    if (desc) desc.textContent = d.description || "";

    // Download buttons
    const btns = document.getElementById("resBtns");
    if (btns) {
      btns.innerHTML = "";

      if (d.type === "video" && d.videos?.length > 0) {
        // Primary HD button
        btns.appendChild(makeLink(
          "⬇ " + (T.btn_hd || "Download HD"),
          proxyUrl(d.videos[0], "pinterest-video.mp4")
        ));
        // Quality variants
        if (d.qualities?.length > 1) {
          d.qualities.slice(1).forEach(q => {
            btns.appendChild(makeLink(q.label, proxyUrl(q.url, "pinterest-video.mp4"), true));
          });
        }
        // Direct link fallback
        btns.appendChild(makeLink(T.btn_open || "Open in Browser", d.videos[0], true, "_blank"));

      } else if (d.images?.length > 0) {
        const ext = d.type === "gif" ? "gif" : "jpg";
        btns.appendChild(makeLink(
          "⬇ " + (T.btn_img || "Download Image"),
          proxyUrl(d.images[0], `pinterest-image.${ext}`)
        ));
        btns.appendChild(makeLink(T.btn_open || "Open in Browser", d.images[0], true, "_blank"));
      }
    }

    el.style.display = "block";
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function makeLink(label, href, alt = false, target = "") {
    const a = document.createElement("a");
    a.href = href;
    a.className = "dlink" + (alt ? " alt" : "");
    a.textContent = label;
    if (!alt) a.download = "";
    if (target) a.target = target;
    return a;
  }

})();
