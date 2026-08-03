/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/refpage.js — página "Consulta Rápida" para o Engenheiro de
   Confiabilidade (dados em data/reference.js — variável global REFERENCE).
   Inclui exportação para PDF via impressão nativa do navegador (sem
   dependências externas), usando o layout definido em assets/css/refpage.css
   com regras @media print.
   ========================================================= */
(function () {
  "use strict";

  function escapeHtml(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  // decorate(): igual a escapeHtml(), mas envolve siglas técnicas conhecidas com
  // um tooltip explicativo (assets/js/acronyms.js). Só em texto "prosa".
  function decorate(s) { return window.decorateAcronyms ? window.decorateAcronyms(s) : escapeHtml(s); }

  function renderTable(t) {
    let h = "<div class='table-scroll'><table class='data-table ref-table'><thead><tr>" +
      t.header.map((x) => "<th>" + decorate(x) + "</th>").join("") + "</tr></thead><tbody>";
    t.rows.forEach((r) => { h += "<tr>" + r.map((x) => "<td>" + decorate(x) + "</td>").join("") + "</tr>"; });
    h += "</tbody></table></div>";
    return h;
  }

  function renderSection(sec) {
    return "<section class='ref-section reveal'>" +
      "<h2>" + decorate(sec.title) + "</h2>" +
      "<p class='ref-intro'>" + decorate(sec.intro) + "</p>" +
      renderTable(sec.table) +
      (sec.note ? "<p class='ref-note'>" + decorate(sec.note) + "</p>" : "") +
      "</section>";
  }

  window.printReference = function () {
    window.print();
  };

  window.renderReferencePage = function () {
    const contentEl = document.getElementById("content");
    let html = "<div id='ref-page'>";
    html += "<div class='ref-header no-print reveal'>" +
      "<div>" +
      "<h1 style='margin:0;'>📖 Consulta Rápida — Engenheiro de Confiabilidade</h1>" +
      "<p style='color:var(--muted); font-size:13.5px; margin:6px 0 0 0;'>As referências mais usadas no dia a dia: padrões de espectro, bandas laterais, fórmulas de rolamento e limites da ISO 10816 — tudo em uma página, pronta para consulta ou impressão.</p>" +
      "</div>" +
      "<button class='verify-btn ref-pdf-btn' onclick='printReference()'>📄 Baixar como PDF</button>" +
      "</div>";
    html += "<div class='ref-print-title only-print'><h1>Consulta Rápida — Engenharia de Confiabilidade</h1><p>Referência para o Engenheiro de Confiabilidade</p></div>";
    REFERENCE.sections.forEach((sec) => { html += renderSection(sec); });
    html += "</div>";

    contentEl.innerHTML = html;
    contentEl.classList.remove("fade-target");
    void contentEl.offsetWidth;
    contentEl.classList.add("fade-target");
    if (window.initScrollReveal) window.initScrollReveal();
  };
})();
