// Shared record-detail modal for the static (GitHub Pages) views.
// Replaces window.__MC_VIEW.openItem, which only exists inside the
// MulmoClaude host app.
(function () {
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function rowsHtml(title, rows) {
    if (!rows || !rows.length) return "";
    const items = rows
      .map((r) => "<li>" + escapeHtml(r.creature || "") + (r.note ? " - " + escapeHtml(r.note) : "") + " x" + (r.count || 1) + "</li>")
      .join("");
    return "<h3>" + title + "</h3><ul>" + items + "</ul>";
  }

  function ensureOverlay() {
    let overlay = document.getElementById("mc-detail-overlay");
    if (overlay) return overlay;

    const style = document.createElement("style");
    style.textContent =
      "#mc-detail-overlay{display:none;position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:2000;" +
      "align-items:flex-end;justify-content:center;}" +
      "@media (min-width:640px){#mc-detail-overlay{align-items:center;padding:16px;}}" +
      "#mc-detail-card{background:#fff;width:100%;max-width:480px;max-height:85vh;overflow-y:auto;" +
      "font-family:-apple-system,system-ui,'Hiragino Sans',sans-serif;color:#0f172a;" +
      "border-radius:18px 18px 0 0;box-shadow:0 -4px 24px rgba(0,0,0,.18);" +
      "padding:8px 20px calc(20px + env(safe-area-inset-bottom,0px));" +
      "-webkit-overflow-scrolling:touch;}" +
      "@media (min-width:640px){#mc-detail-card{border-radius:16px;padding:20px;}}" +
      "#mc-detail-card .mc-grabber{width:36px;height:4px;border-radius:2px;background:#e2e8f0;margin:8px auto 12px;}" +
      "@media (min-width:640px){#mc-detail-card .mc-grabber{display:none;}}" +
      "#mc-detail-card h2{margin:0 0 4px;font-size:17px;}" +
      "#mc-detail-card h3{margin:14px 0 6px;font-size:13px;color:#334155;}" +
      "#mc-detail-card ul{margin:0;padding-left:18px;font-size:14px;line-height:1.6;}" +
      "#mc-detail-card p{font-size:14px;line-height:1.6;margin:0;}" +
      "#mc-detail-close{border:none;background:#f1f5f9;border-radius:10px;padding:8px 14px;cursor:pointer;" +
      "font-size:14px;font-weight:600;min-height:36px;touch-action:manipulation;flex:none;}";
    document.head.appendChild(style);

    overlay = document.createElement("div");
    overlay.id = "mc-detail-overlay";
    overlay.innerHTML = '<div id="mc-detail-card"><div class="mc-grabber"></div><div id="mc-detail-body"></div></div>';
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    });
    document.body.appendChild(overlay);
    return overlay;
  }

  window.showRecordDetail = function (record) {
    if (!record) return;
    const overlay = ensureOverlay();
    const body = document.getElementById("mc-detail-body");
    body.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:start;gap:10px;">' +
      '<h2>' + escapeHtml(record.placeName || "") + "</h2>" +
      '<button id="mc-detail-close">閉じる</button>' +
      "</div>" +
      '<div style="font-size:12.5px;color:#64748b;margin-bottom:8px;">' +
      escapeHtml(record.date || "") + " ・ " + escapeHtml(record.spotType || "") + " ・ " + escapeHtml(record.weather || "") +
      "</div>" +
      (record.placeMemo ? '<div style="font-size:12.5px;color:#64748b;margin-bottom:8px;">' + escapeHtml(record.placeMemo) + "</div>" : "") +
      rowsHtml("捕まえた", record.catches) +
      rowsHtml("見ただけ", record.sightings) +
      (record.memo ? '<h3>メモ</h3><p>' + escapeHtml(record.memo) + "</p>" : "");
    document.getElementById("mc-detail-close").onclick = () => (overlay.style.display = "none");
    overlay.style.display = "flex";
  };

  // Fetch data.json once and cache it; shared by map.html / zukan.html.
  let cache = null;
  window.loadBugVisits = async function () {
    if (cache) return cache;
    const res = await fetch("./data.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    cache = await res.json();
    return cache;
  };

  window.openRecordById = async function (id) {
    const items = await window.loadBugVisits();
    const rec = items.find((it) => it.id === id);
    window.showRecordDetail(rec);
  };
})();
