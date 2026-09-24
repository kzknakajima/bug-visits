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
    overlay = document.createElement("div");
    overlay.id = "mc-detail-overlay";
    overlay.style.cssText =
      "display:none;position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:2000;align-items:center;justify-content:center;padding:16px;";
    overlay.innerHTML =
      '<div id="mc-detail-card" style="background:#fff;border-radius:12px;max-width:420px;width:100%;max-height:80vh;overflow-y:auto;padding:20px;font-family:system-ui,\'Hiragino Sans\',sans-serif;color:#1e293b;box-shadow:0 10px 30px rgba(0,0,0,.2);"></div>';
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    });
    document.body.appendChild(overlay);
    return overlay;
  }

  window.showRecordDetail = function (record) {
    if (!record) return;
    const overlay = ensureOverlay();
    const card = document.getElementById("mc-detail-card");
    card.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">' +
      '<h2 style="margin:0 0 4px;font-size:16px;">' + escapeHtml(record.placeName || "") + "</h2>" +
      '<button id="mc-detail-close" style="border:none;background:#f1f5f9;border-radius:6px;padding:4px 8px;cursor:pointer;font-size:13px;">閉じる</button>' +
      "</div>" +
      '<div style="font-size:12px;color:#64748b;margin-bottom:8px;">' +
      escapeHtml(record.date || "") + " ・ " + escapeHtml(record.spotType || "") + " ・ " + escapeHtml(record.weather || "") +
      "</div>" +
      (record.placeMemo ? '<div style="font-size:12px;color:#64748b;margin-bottom:8px;">' + escapeHtml(record.placeMemo) + "</div>" : "") +
      rowsHtml("捕まえた", record.catches) +
      rowsHtml("見ただけ", record.sightings) +
      (record.memo ? '<h3>メモ</h3><p style="font-size:13px;">' + escapeHtml(record.memo) + "</p>" : "");
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
