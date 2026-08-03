/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/practice.js — Página de Prática de Diagnóstico
   (dados em data/cases.js — variável global CASES)
   ========================================================= */
(function () {
  "use strict";

  const LEVEL_LABEL = { "básico": "Básico", "intermediário": "Intermediário", "avançado": "Avançado" };
  // Ordem fixa para agrupar visualmente os casos por nível (Básico → Intermediário →
  // Avançado), independente da ordem em que foram acrescentados ao arquivo de dados.
  const LEVEL_ORDER = { "básico": 0, "intermediário": 1, "avançado": 2 };
  const STORAGE_KEY = "vibcourse_practice_progress_v1";
  const STORAGE_KEY_BF = "vibcourse_bearing_practice_progress_v1";
  const STORAGE_KEY_LUBE = "vibcourse_lube_practice_progress_v1";
  let selectedCaseId = null;
  let selectedBfCaseId = null;
  let selectedLubeCaseId = null;
  // "spectrum" = casos com espectro dinâmico (padrão); "bearing" = seção
  // "Análise de Falhas - Rolamentos" (fotos reais para identificação); "lube" =
  // seção "Engenheiro de Lubrificação" (interpretação de relatório de óleo)
  let practiceView = "spectrum";

  function loadProgress() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }
  function loadBfProgress() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY_BF)) || {}; } catch (e) { return {}; } }
  function saveBfProgress(p) { localStorage.setItem(STORAGE_KEY_BF, JSON.stringify(p)); }
  function loadLubeProgress() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY_LUBE)) || {}; } catch (e) { return {}; } }
  function saveLubeProgress(p) { localStorage.setItem(STORAGE_KEY_LUBE, JSON.stringify(p)); }
  function escapeHtml(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  // decorate(): igual a escapeHtml(), mas envolve siglas técnicas conhecidas (BPFO,
  // GMF, RMS...) com um tooltip explicativo (assets/js/acronyms.js). Usar somente
  // em texto "prosa" — nunca dentro de SVG (ex.: rótulo do gráfico de tendência)
  // nem em valores de atributos HTML (ex.: alt="...").
  function decorate(s) { return window.decorateAcronyms ? window.decorateAcronyms(s) : escapeHtml(s); }

  // renderSpectrumSVG/buildCurve agora vêm de assets/js/charts.js (compartilhado com os módulos do curso)
  const renderSpectrumSVG = function (container, spec, opts) { window.renderSpectrumSVG(container, spec, opts); };

  /* ============ Renderizador de gráfico de tendência histórica (SVG) ============ */
  function renderTrendSVG(container, trend) {
    const W = 640, H = 220, padL = 46, padR = 16, padT = 16, padB = 34;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const vals = trend.values;
    const maxY = Math.max(trend.dangerLimit * 1.15, ...vals);
    function xPix(i) { return padL + (i / (vals.length - 1)) * plotW; }
    function yPix(y) { return padT + plotH - (y / maxY) * plotH; }

    const linePath = "M " + vals.map((v, i) => xPix(i).toFixed(1) + " " + yPix(v).toFixed(1)).join(" L ");
    const alertY = yPix(trend.alertLimit);
    const dangerY = yPix(trend.dangerLimit);

    let xticks = "";
    trend.months.forEach((m, i) => {
      const xp = xPix(i);
      xticks += `<line x1="${xp}" y1="${padT + plotH}" x2="${xp}" y2="${padT + plotH + 5}" stroke="#8aa0b8" stroke-width="1"/>`;
      xticks += `<text x="${xp}" y="${padT + plotH + 18}" font-size="10" fill="#5a6b80" text-anchor="middle">${m}</text>`;
    });
    let yticks = "";
    for (let t = 0; t <= 4; t++) {
      const yv = (t / 4) * maxY;
      const yp = yPix(yv);
      yticks += `<line x1="${padL - 5}" y1="${yp}" x2="${padL}" y2="${yp}" stroke="#8aa0b8" stroke-width="1"/>`;
      yticks += `<text x="${padL - 9}" y="${yp + 3}" font-size="10" fill="#5a6b80" text-anchor="end">${yv.toFixed(1)}</text>`;
    }
    const dots = vals.map((v, i) => {
      const cls = v >= trend.dangerLimit ? "#ff6b6b" : v >= trend.alertLimit ? "#ffd166" : "#6fd88a";
      return `<circle cx="${xPix(i).toFixed(1)}" cy="${yPix(v).toFixed(1)}" r="3.4" fill="${cls}" class="trend-dot" data-v="${v}" data-m="${trend.months[i]}"/>`;
    }).join("");

    const html = `
      <svg viewBox="0 0 ${W} ${H}" class="spectrum-svg trend-svg" preserveAspectRatio="xMidYMid meet">
        <rect x="0" y="0" width="${W}" height="${H}" fill="#0f2b4c" rx="10"/>
        <rect x="${padL}" y="${padT}" width="${plotW}" height="${Math.max(0, padT + plotH - dangerY)}" fill="rgba(255,107,107,0.10)"/>
        <rect x="${padL}" y="${dangerY}" width="${plotW}" height="${Math.max(0, dangerY - alertY)}" fill="rgba(255,209,102,0.08)"/>
        <line x1="${padL}" y1="${alertY}" x2="${padL + plotW}" y2="${alertY}" stroke="#ffd166" stroke-width="1" stroke-dasharray="4,3"/>
        <line x1="${padL}" y1="${dangerY}" x2="${padL + plotW}" y2="${dangerY}" stroke="#ff6b6b" stroke-width="1" stroke-dasharray="4,3"/>
        <text x="${padL + plotW - 4}" y="${alertY - 4}" font-size="9.5" fill="#ffd166" text-anchor="end">Alerta ISO 10816 (${trend.alertLimit} ${trend.unit})</text>
        <text x="${padL + plotW - 4}" y="${dangerY - 4}" font-size="9.5" fill="#ff6b6b" text-anchor="end">Perigo (${trend.dangerLimit} ${trend.unit})</text>
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="#3a6690" stroke-width="1"/>
        <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="#3a6690" stroke-width="1"/>
        ${xticks}${yticks}
        <path d="${linePath}" fill="none" stroke="#4d9de0" stroke-width="1.8"/>
        ${dots}
        <text x="${padL + plotW / 2}" y="${H - 4}" font-size="10.5" fill="#a9bdd6" text-anchor="middle">Últimas 6 medições (tendência)</text>
        <text x="14" y="${padT + 8}" font-size="10.5" fill="#a9bdd6" transform="rotate(-90 14 ${padT + 8})" text-anchor="end">${escapeHtml(trend.unit)}</text>
      </svg>
    `;
    container.innerHTML = html;
  }

  /* ============ Análise de Falhas - Rolamentos (fotos reais para identificação) ============ */
  function renderBfChips() {
    const progress = loadBfProgress();
    // Agrupa visualmente por nível (Básico → Intermediário → Avançado) em vez da
    // ordem bruta do arquivo de dados, que intercala níveis (ex.: básico, avançado,
    // avançado, intermediário...). O número do chip preserva a posição ORIGINAL do
    // caso na lista (não a posição pós-ordenação), para não confundir quem já
    // memorizou "caso 5", etc.
    const cases = BEARING_FAILURE_CASES.map((c, i) => ({ c, originalIndex: i }))
      .sort((a, b) => LEVEL_ORDER[a.c.level] - LEVEL_ORDER[b.c.level] || a.originalIndex - b.originalIndex);
    let html = "";
    let lastLevel = null;
    cases.forEach(({ c, originalIndex }) => {
      if (c.level !== lastLevel) {
        lastLevel = c.level;
        html += `<span class="chip-level-label">${LEVEL_LABEL[c.level]}</span>`;
      }
      const done = progress[c.id];
      const active = c.id === selectedBfCaseId;
      html += `<button class="case-chip ${active ? "active" : ""} ${done ? "done" : ""}" data-id="${c.id}" onclick="selectBearingCase('${c.id}')">
        <span class="chip-num">${originalIndex + 1}</span>
        <span class="chip-lvl lvl-${c.level}">${LEVEL_LABEL[c.level]}</span>
        ${done ? "<span class='chip-check'>✓</span>" : ""}
      </button>`;
    });
    return html;
  }

  function renderBfCaseDetail(c) {
    const progress = loadBfProgress();
    const isDone = !!progress[c.id];
    const cases = BEARING_FAILURE_CASES;
    const idx = cases.findIndex((x) => x.id === c.id);
    let html = "";
    html += `<div class="practice-topbar reveal">
      <span class="level-tag">${LEVEL_LABEL[c.level]} · Caso ${idx + 1} de ${cases.length}</span>
      ${isDone ? "<span class='case-done-badge'>✅ Resolvido</span>" : ""}
    </div>`;
    html += `<div class="briefing-panel reveal">
      <h3>🏭 Cenário de aplicação real</h3>
      <p style="margin:0;">${decorate(c.scenario)}</p>
    </div>`;
    html += `<div class="bf-photo-panel reveal">
      <img class="bf-photo" src="${c.photo}" alt="${escapeHtml(c.photoCaption)}" loading="lazy"/>
      <p class="hint" style="text-align:center;">${decorate(c.photoCaption)}</p>
    </div>`;
    html += `<div class="diagnosis-panel reveal">
      <h3>🔍 ${decorate(c.question)}</h3>
      <div class="check-options diag-options">
        ${c.options.map((opt, i) => `<label class="radio-pill"><input type="radio" name="bf-diagnosis" value="${i}"/> ${decorate(opt)}</label>`).join("")}
      </div>
      <div class="diag-actions">
        <button class="verify-btn" onclick="checkBearingCase('${c.id}')">▶ Verificar identificação</button>
        ${c.hint ? `<button class="hint-btn" onclick="toggleBfHint('${c.id}')">💡 Dica</button>` : ""}
      </div>
      ${c.hint ? `<div id="bf-hint-box-${c.id}" class="hint-box" style="display:none">${decorate(c.hint)}</div>` : ""}
      <div id="bf-feedback-panel"></div>
    </div>`;

    const detailEl = document.getElementById("bf-case-detail");
    detailEl.innerHTML = html;
    detailEl.classList.remove("fade-target");
    void detailEl.offsetWidth;
    detailEl.classList.add("fade-target");
    if (window.initScrollReveal) window.initScrollReveal();
  }

  window.selectBearingCase = function (id) {
    selectedBfCaseId = id;
    window.renderPracticePage();
    window.scrollTo(0, 0);
  };

  window.toggleBfHint = function (id) {
    const box = document.getElementById("bf-hint-box-" + id);
    if (!box) return;
    box.style.display = box.style.display === "none" ? "block" : "none";
  };

  window.checkBearingCase = function (id) {
    const cases = BEARING_FAILURE_CASES;
    const c = cases.find((x) => x.id === id);
    const el = document.querySelector('input[name="bf-diagnosis"]:checked');
    const val = el ? parseInt(el.value, 10) : -1;
    const correct = val === c.correctIndex;

    const panel = document.getElementById("bf-feedback-panel");
    let html = `<div class="feedback-banner ${correct ? "pass" : "fail"} reveal visible">
      ${correct ? "✅ Identificação correta!" : "🔎 Ainda não é isso — releia a explicação abaixo e compare com a foto."}
    </div>`;
    html += `<div class="explanation-box"><b>Explicação:</b> ${decorate(c.explanation)}</div>`;
    html += `<div class="explanation-box"><b>Causa raiz:</b> ${decorate(c.cause)}</div>`;
    html += `<div class="action-box"><b>${decorate(c.action)}</b></div>`;
    panel.innerHTML = html;

    if (correct) {
      const progress = loadBfProgress();
      const wasAlready = !!progress[id];
      progress[id] = true;
      saveBfProgress(progress);
      const chipRow = document.getElementById("bf-case-chip-row");
      if (chipRow) chipRow.innerHTML = renderBfChips();
      if (!wasAlready && window.celebrate) window.celebrate();
    }
  };

  window.setPracticeView = function (view) {
    practiceView = view;
    window.renderPracticePage();
    window.scrollTo(0, 0);
  };

  /* ============ Engenheiro de Lubrificação (relatórios reais de análise de óleo) ============ */
  function renderLubeChips() {
    const progress = loadLubeProgress();
    const cases = LUBE_CASES.slice().sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.num - b.num);
    let html = "";
    let lastLevel = null;
    cases.forEach((c) => {
      if (c.level !== lastLevel) {
        lastLevel = c.level;
        html += `<span class="chip-level-label">${LEVEL_LABEL[c.level]}</span>`;
      }
      const done = progress[c.id];
      const active = c.id === selectedLubeCaseId;
      html += `<button class="case-chip ${active ? "active" : ""} ${done ? "done" : ""}" data-id="${c.id}" onclick="selectLubeCase('${c.id}')">
        <span class="chip-num">${c.num}</span>
        <span class="chip-lvl lvl-${c.level}">${LEVEL_LABEL[c.level]}</span>
        ${done ? "<span class='chip-check'>✓</span>" : ""}
      </button>`;
    });
    return html;
  }

  // Painel de leituras de análise de óleo: formato livre {label, value}, diferente
  // do painel fixo de vibração (renderReadings), pois cada caso de lubrificação usa
  // um conjunto diferente de testes (ISO 4406, TAN, TBN, Karl Fischer, ICP, FTIR...).
  function renderOilReadings(readings) {
    if (!readings || !readings.length) return "";
    return `<div class="readings-panel">
      <div class="readings-title">🧾 Relatório de análise de óleo</div>
      <div class="readings-grid oil-readings-grid">
        ${readings.map((r) => `<div class="reading-cell"><span class="reading-label">${decorate(r.label)}</span><span class="reading-value">${decorate(r.value)}</span></div>`).join("")}
      </div>
    </div>`;
  }

  // Laudo de análise de óleo em formato de relatório laboratorial completo
  // (cabeçalho de amostra + tabelas de físico-química / metais de desgaste /
  // aditivos / contagem de partículas + parecer técnico), inspirado na
  // organização típica de laudos reais (ex.: LUBRIN, PURILUB) — estrutura
  // genérica, sem reproduzir marca, logotipo ou layout proprietário de nenhum
  // laboratório específico.
  const LAUDO_STATUS_LABEL = { ok: "Normal", warn: "Atenção", crit: "Crítico" };
  function laudoStatusBadge(status) {
    const s = status || "ok";
    return `<span class="laudo-status ${s}">${LAUDO_STATUS_LABEL[s] || s}</span>`;
  }
  function laudoTable(title, rows, cols) {
    if (!rows || !rows.length) return "";
    return `<div class="laudo-section">
      <h4>${decorate(title)}</h4>
      <table class="laudo-table">
        <thead><tr>${cols.map((c) => `<th>${decorate(c)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((r) => `<tr>
            <td>${decorate(r.param)}</td>
            <td>${decorate(r.result)}</td>
            <td>${decorate(r.ref || "—")}</td>
            <td>${laudoStatusBadge(r.status)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`;
  }
  function renderLaudo(laudo) {
    if (!laudo) return "";
    const s = laudo.sample || {};
    const fields = [
      ["Cliente / Ativo", s.equipamento], ["Ponto de coleta", s.ponto], ["Lubrificante", s.lubrificante],
      ["Data da coleta", s.dataColeta], ["Data da análise", s.dataAnalise], ["Horas de uso do óleo", s.horasOleo],
    ];
    return `<div class="laudo-report reveal">
      <div class="laudo-header">
        <div><div class="laudo-lab-name">🧪 ${decorate(laudo.lab || "Laboratório de Análise de Óleo")}</div>
        <div class="laudo-lab-sub">Laudo de análise físico-química e de contaminação</div></div>
        <div class="laudo-lab-sub">Nº ${decorate(laudo.numero || "—")}</div>
      </div>
      <div class="laudo-sample-grid">
        ${fields.map(([k, v]) => v ? `<div class="lf"><span class="k">${decorate(k)}</span><span class="v">${decorate(v)}</span></div>` : "").join("")}
      </div>
      ${laudoTable("Físico-química", laudo.physChem, ["Parâmetro", "Resultado", "Ref. óleo novo", "Status"])}
      ${laudoTable("Metais de desgaste (ICP, ppm)", laudo.wearMetals, ["Elemento", "Resultado", "Ref. óleo novo", "Status"])}
      ${laudoTable("Pacote de aditivos (ICP, ppm)", laudo.additives, ["Elemento", "Resultado", "Ref. óleo novo", "Status"])}
      ${laudoTable("Contagem de partículas", laudo.particleCount, ["Método", "Resultado", "Alvo do sistema", "Status"])}
      ${laudo.opinion ? `<div class="laudo-section"><h4>Parecer técnico</h4><div class="laudo-opinion"><b>Laboratório:</b> ${decorate(laudo.opinion)}</div></div>` : ""}
    </div>`;
  }

  function renderLubeCaseDetail(c) {
    const progress = loadLubeProgress();
    const isDone = !!progress[c.id];
    const cases = LUBE_CASES;
    let html = "";
    html += `<div class="practice-topbar reveal">
      <span class="level-tag">${LEVEL_LABEL[c.level]} · Caso ${c.num} de ${cases.length}</span>
      ${c.relatedModule ? `<button class="module-link-badge" onclick="goTo('${c.relatedModule}')" title="Rever a teoria deste caso">🎓 ${decorate(c.relatedModuleLabel)}</button>` : ""}
      ${isDone ? "<span class='case-done-badge'>✅ Resolvido</span>" : ""}
    </div>`;
    html += `<h1 class="mod-title">${decorate(c.title)}</h1>`;
    html += `<div class="case-data-panel reveal">
      <div class="case-data-section">
        <h3>📋 Dados de campo</h3>
        <ul class="bullets">${c.briefing.map((bText) => "<li>" + decorate(bText) + "</li>").join("")}</ul>
        ${c.laudo ? "" : renderOilReadings(c.readings)}
      </div>
    </div>`;
    if (c.photo) {
      html += `<div class="bf-photo-panel reveal">
        <img class="bf-photo" src="${c.photo}" alt="${escapeHtml(c.photoCaption || "")}" loading="lazy"/>
        <p class="hint" style="text-align:center;">${decorate(c.photoCaption || "")}</p>
      </div>`;
    }
    if (c.laudo) html += renderLaudo(c.laudo);
    html += `<div class="diagnosis-panel reveal">
      <h3>🛢️ ${c.questionLabel ? decorate(c.questionLabel) : "Qual é o diagnóstico?"}</h3>
      <div class="check-options diag-options">
        ${c.diagnosisOptions.map((o) => `<label class="radio-pill"><input type="radio" name="lube-diagnosis" value="${o.id}"/> ${decorate(o.text)}</label>`).join("")}
      </div>
      <div class="diag-actions">
        <button class="verify-btn" onclick="checkLubeCase('${c.id}')">▶ Verificar diagnóstico</button>
        ${c.hint ? `<button class="hint-btn" onclick="toggleLubeHint('${c.id}')">💡 Dica</button>` : ""}
      </div>
      ${c.hint ? `<div id="lube-hint-box-${c.id}" class="hint-box" style="display:none">${decorate(c.hint)}</div>` : ""}
      <div id="lube-feedback-panel"></div>
    </div>`;

    const detailEl = document.getElementById("lube-case-detail");
    detailEl.innerHTML = html;
    detailEl.classList.remove("fade-target");
    void detailEl.offsetWidth;
    detailEl.classList.add("fade-target");
    if (window.initScrollReveal) window.initScrollReveal();
  }

  window.selectLubeCase = function (id) {
    selectedLubeCaseId = id;
    window.renderPracticePage();
    window.scrollTo(0, 0);
  };

  window.toggleLubeHint = function (id) {
    const box = document.getElementById("lube-hint-box-" + id);
    if (!box) return;
    box.style.display = box.style.display === "none" ? "block" : "none";
  };

  window.checkLubeCase = function (id) {
    const c = LUBE_CASES.find((x) => x.id === id);
    const diagEl = document.querySelector('input[name="lube-diagnosis"]:checked');
    const diagVal = diagEl ? diagEl.value : null;
    const correct = diagVal === c.correctDiagnosis;

    const panel = document.getElementById("lube-feedback-panel");
    let html = `<div class="feedback-banner ${correct ? "pass" : "fail"} reveal visible">
      ${correct ? "✅ Diagnóstico correto!" : "🔎 Ainda não é isso — releia a explicação abaixo e compare com o relatório."}
    </div>`;
    html += `<div class="explanation-box"><b>Explicação:</b> ${decorate(c.explanation)}</div>`;
    html += `<div class="explanation-box"><b>Causa raiz:</b> ${decorate(c.cause)}</div>`;
    html += `<div class="action-box"><b>${decorate(c.action)}</b></div>`;

    if (c.diagnosisOptions && c.diagnosisOptions.some((o) => o.solution)) {
      html += `<div class="solution-guide reveal">
        <h4>🗂️ O que fazer em cada hipótese de diagnóstico</h4>
        <ul class="solution-guide-list">
          ${c.diagnosisOptions.map((o) => {
            const isCorrect = o.id === c.correctDiagnosis;
            const isChosen = o.id === diagVal;
            const tagHtml = isCorrect
              ? `<span class="sg-tag sg-tag-correct">✓ Diagnóstico correto</span>`
              : (isChosen ? `<span class="sg-tag sg-tag-chosen">Sua resposta</span>` : "");
            return `<li class="solution-guide-item ${isCorrect ? "is-correct" : ""} ${isChosen && !isCorrect ? "is-chosen-wrong" : ""}">
              <div class="sg-hypothesis">${decorate(o.text)} ${tagHtml}</div>
              ${o.solution ? `<div class="sg-solution">${decorate(o.solution)}</div>` : ""}
            </li>`;
          }).join("")}
        </ul>
      </div>`;
    }

    panel.innerHTML = html;

    if (correct) {
      const progress = loadLubeProgress();
      const wasAlready = !!progress[id];
      progress[id] = true;
      saveLubeProgress(progress);
      const chipRow = document.getElementById("lube-case-chip-row");
      if (chipRow) chipRow.innerHTML = renderLubeChips();
      if (!wasAlready && window.celebrate) window.celebrate();
    }
  };

  /* ============ Página de prática ============ */
  function renderChips() {
    const progress = loadProgress();
    // Agrupa visualmente por nível (Básico → Intermediário → Avançado). Os casos
    // c16-c27 (adicionados em rodadas posteriores) não estavam em ordem de nível no
    // arquivo de dados, o que fazia o agrupamento por nível repetir/alternar de
    // forma confusa — por isso ordenamos uma cópia só para exibição, mantendo o
    // número de exibição (c.num) do caso original.
    const sortedCases = CASES.slice().sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.num - b.num);
    let html = "";
    let lastLevel = null;
    sortedCases.forEach((c) => {
      if (c.level !== lastLevel) {
        lastLevel = c.level;
        html += `<span class="chip-level-label">${LEVEL_LABEL[c.level]}</span>`;
      }
      const done = progress[c.id];
      const active = c.id === selectedCaseId;
      html += `<button class="case-chip ${active ? "active" : ""} ${done ? "done" : ""}" data-id="${c.id}" onclick="selectCase('${c.id}')">
        <span class="chip-num">${c.num}</span>
        <span class="chip-lvl lvl-${c.level}">${LEVEL_LABEL[c.level]}</span>
        ${done ? "<span class='chip-check'>✓</span>" : ""}
      </button>`;
    });
    return html;
  }

  function renderReadings(r) {
    if (!r) return "";
    return `<div class="readings-panel">
      <div class="readings-title">📟 Leitura do coletor (padrão SKF)</div>
      <div class="readings-grid">
        <div class="reading-cell"><span class="reading-label">Temperatura</span><span class="reading-value">${r.temp}&nbsp;°C</span></div>
        <div class="reading-cell"><span class="reading-label">Velocidade</span><span class="reading-value">${r.vel}&nbsp;mm/s RMS</span></div>
        <div class="reading-cell"><span class="reading-label">Aceleração</span><span class="reading-value">${r.accel}&nbsp;g</span></div>
        <div class="reading-cell"><span class="reading-label">Envelope</span><span class="reading-value">${r.envelope}&nbsp;gE Pk-Pk</span></div>
      </div>
    </div>`;
  }

  function renderCheckControl(check) {
    if (check.type === "mc") {
      return `<div class="check-block reveal">
        <div class="check-label">${decorate(check.label)}</div>
        <div class="check-options">
          ${check.options.map((o) => `<label class="radio-pill"><input type="radio" name="chk-${check.id}" value="${o.id}"/> ${decorate(o.text)}</label>`).join("")}
        </div>
      </div>`;
    }
    return `<div class="check-block reveal">
      <div class="check-label">${decorate(check.label)}</div>
      <input type="text" inputmode="decimal" class="numeric-input" id="chk-${check.id}" placeholder="Digite o valor..."/>
    </div>`;
  }

  function renderCaseDetail(c) {
    const progress = loadProgress();
    const isDone = !!progress[c.id];
    let html = "";
    html += `<div class="practice-topbar reveal">
      <span class="level-tag">${LEVEL_LABEL[c.level]} · Caso ${c.num} de ${CASES.length}</span>
      ${c.relatedModule ? `<button class="module-link-badge" onclick="goTo('${c.relatedModule}')" title="Rever a teoria deste caso">🎓 ${decorate(c.relatedModuleLabel)}</button>` : ""}
      ${isDone ? "<span class='case-done-badge'>✅ Resolvido</span>" : ""}
    </div>`;
    html += `<h1 class="mod-title">${decorate(c.title)}</h1>`;
    // Painel único de "dados de campo" — antes eram 3 blocos separados (dados de
    // campo, espectro, tendência histórica); agora ficam juntos num só cartão,
    // com divisores internos, para reduzir a fragmentação visual da página.
    html += `<div class="case-data-panel reveal">
      <div class="case-data-section">
        <h3>📋 Dados de campo</h3>
        <ul class="bullets">${c.briefing.map((b) => "<li>" + decorate(b) + "</li>").join("")}</ul>
        ${renderReadings(c.readings)}
      </div>
      <hr class="panel-divider"/>
      <div class="case-data-section case-spectrum-block">
        <h4>📊 Espectro</h4>
        <div id="spectrum-container"></div>
        <p class="hint">Passe o mouse para ler os valores em tempo real, ou <b>clique no gráfico</b> para fixar um ponto de medição (como um analisador real).</p>
      </div>
      <hr class="panel-divider"/>
      <div class="case-data-section">
        <h4>📈 Tendência histórica (como um sistema de monitoramento real)</h4>
        <div id="trend-container"></div>
        <p class="hint">Passe o mouse sobre os pontos para ver mês e amplitude. As faixas coloridas seguem os limites de alerta/perigo da ISO 10816 usados neste caso.</p>
      </div>
    </div>`;

    html += `<div class="diagnosis-panel reveal">
      <h3>🩺 Qual é o diagnóstico?</h3>
      <div class="check-options diag-options">
        ${c.diagnosisOptions.map((o) => `<label class="radio-pill"><input type="radio" name="diagnosis" value="${o.id}"/> ${decorate(o.text)}</label>`).join("")}
      </div>
      ${c.checks.map(renderCheckControl).join("")}
      <div class="diag-actions">
        <button class="verify-btn" onclick="checkCase('${c.id}')">▶ Verificar diagnóstico</button>
        ${c.hint ? `<button class="hint-btn" onclick="toggleHint('${c.id}')">💡 Dica</button>` : ""}
      </div>
      ${c.hint ? `<div id="hint-box-${c.id}" class="hint-box" style="display:none">${decorate(c.hint)}</div>` : ""}
      <div id="feedback-panel"></div>
    </div>`;

    const detailEl = document.getElementById("case-detail");
    detailEl.innerHTML = html;
    detailEl.classList.remove("fade-target");
    void detailEl.offsetWidth;
    detailEl.classList.add("fade-target");

    renderSpectrumSVG(document.getElementById("spectrum-container"), c.spectrum, { height: 380 });
    if (c.trend) renderTrendSVG(document.getElementById("trend-container"), c.trend);
    if (window.initScrollReveal) window.initScrollReveal();
  }

  window.renderPracticePage = function () {
    const contentEl = document.getElementById("content");
    const viewTabsHtml = `<div class="practice-view-tabs reveal">
      <button class="practice-view-tab ${practiceView === "spectrum" ? "active" : ""}" onclick="setPracticeView('spectrum')">📊 Casos com Espectro</button>
      <button class="practice-view-tab ${practiceView === "bearing" ? "active" : ""}" onclick="setPracticeView('bearing')">🔩 Análise de Falhas — Rolamentos</button>
      <button class="practice-view-tab ${practiceView === "lube" ? "active" : ""}" onclick="setPracticeView('lube')">🛢️ Engenheiro de Lubrificação</button>
    </div>`;

    if (practiceView === "lube") {
      const cases = LUBE_CASES;
      if (!selectedLubeCaseId) selectedLubeCaseId = cases[0] && cases[0].id;
      const c = cases.find((x) => x.id === selectedLubeCaseId);
      const progress = loadLubeProgress();
      const doneCount = Object.keys(progress).filter((k) => progress[k]).length;

      const html = `<div class="practice-header reveal">
        <div class="practice-header-top">
          <h2 style="margin:0;">🛢️ Engenheiro de Lubrificação</h2>
          <div class="practice-header-actions">
            <span class="practice-progress">${doneCount}/${cases.length} casos resolvidos</span>
            ${window.openLab ? `<button class="lab-btn" onclick="openLab('practice')">🧪 Laboratório</button>` : ""}
          </div>
        </div>
        ${viewTabsHtml}
        <p style="color:var(--muted); font-size:13.5px; margin:6px 0 14px 0;">
          Casos reais de interpretação de relatório de análise de óleo — contaminação, degradação e desgaste — baseados no Body of Knowledge ICML/Noria. Veja os Módulos L1-L8 para a base teórica completa.
        </p>
        <div class="case-chip-row" id="lube-case-chip-row">${renderLubeChips()}</div>
      </div>
      <div id="lube-case-detail" class="fade-target"></div>`;

      contentEl.innerHTML = html;
      if (c) renderLubeCaseDetail(c);
      return;
    }

    if (practiceView === "bearing") {
      const cases = BEARING_FAILURE_CASES;
      if (!selectedBfCaseId) selectedBfCaseId = cases[0] && cases[0].id;
      const c = cases.find((x) => x.id === selectedBfCaseId);
      const progress = loadBfProgress();
      const doneCount = Object.keys(progress).filter((k) => progress[k]).length;

      const html = `<div class="practice-header reveal">
        <div class="practice-header-top">
          <h2 style="margin:0;">🔩 Análise de Falhas — Rolamentos</h2>
          <div class="practice-header-actions">
            <span class="practice-progress">${doneCount}/${cases.length} casos resolvidos</span>
            ${window.openLab ? `<button class="lab-btn" onclick="openLab('practice')">🧪 Laboratório</button>` : ""}
          </div>
        </div>
        ${viewTabsHtml}
        <p style="color:var(--muted); font-size:13.5px; margin:6px 0 14px 0;">
          Fotos reais de rolamentos danificados (material técnico SKF), dentro de cenários de aplicação real — identifique o modo de falha (ISO 15243) antes de ver a causa raiz e a ação corretiva. Veja os Módulos 19-21 para a base teórica completa.
        </p>
        <div class="case-chip-row" id="bf-case-chip-row">${renderBfChips()}</div>
      </div>
      <div id="bf-case-detail" class="fade-target"></div>`;

      contentEl.innerHTML = html;
      if (c) renderBfCaseDetail(c);
      return;
    }

    if (!selectedCaseId) selectedCaseId = CASES[0].id;
    const c = CASES.find((x) => x.id === selectedCaseId);
    const progress = loadProgress();
    const doneCount = Object.keys(progress).filter((k) => progress[k]).length;

    const chipsHtml = `<div class="practice-header reveal">
      <div class="practice-header-top">
        <h2 style="margin:0;">🧪 Prática de Diagnóstico</h2>
        <div class="practice-header-actions">
          <span class="practice-progress">${doneCount}/${CASES.length} casos resolvidos</span>
          ${window.openLab ? `<button class="lab-btn" onclick="openLab('practice')">🧪 Laboratório</button>` : ""}
        </div>
      </div>
      ${viewTabsHtml}
      <p style="color:var(--muted); font-size:13.5px; margin:6px 0 14px 0;">
        Casos reais, com espectros dinâmicos — passe o mouse para ler os valores e teste sua hipótese diagnóstica.
      </p>
      <div class="case-chip-row" id="case-chip-row">${renderChips()}</div>
    </div>
    <div id="case-detail" class="fade-target"></div>`;

    contentEl.innerHTML = chipsHtml;
    renderCaseDetail(c);
  };

  window.toggleHint = function (id) {
    const box = document.getElementById("hint-box-" + id);
    if (!box) return;
    box.style.display = box.style.display === "none" ? "block" : "none";
  };

  window.selectCase = function (id) {
    selectedCaseId = id;
    window.renderPracticePage();
    window.scrollTo(0, 0);
  };

  window.checkCase = function (id) {
    const c = CASES.find((x) => x.id === id);
    const diagEl = document.querySelector('input[name="diagnosis"]:checked');
    const diagVal = diagEl ? diagEl.value : null;
    const diagCorrect = diagVal === c.correctDiagnosis;

    const results = [{
      label: "Diagnóstico principal",
      correct: diagCorrect,
    }];

    c.checks.forEach((chk) => {
      let ok = false;
      if (chk.type === "mc") {
        const el = document.querySelector(`input[name="chk-${chk.id}"]:checked`);
        ok = el ? el.value === chk.correct : false;
      } else {
        const el = document.getElementById(`chk-${chk.id}`);
        const val = el ? parseFloat((el.value || "").replace(",", ".")) : NaN;
        ok = !isNaN(val) && Math.abs(val - chk.correct) <= (chk.tolerance || 0.1);
      }
      results.push({ label: chk.label, correct: ok });
    });

    const allOk = results.every((r) => r.correct);
    const panel = document.getElementById("feedback-panel");
    let html = `<div class="feedback-banner ${allOk ? "pass" : "fail"} reveal visible">
      ${allOk ? "✅ Diagnóstico correto — todos os itens conferem!" : "🔎 Ainda não está tudo certo — confira o checklist abaixo."}
    </div>`;
    html += `<ul class="checklist">`;
    results.forEach((r) => {
      html += `<li class="${r.correct ? "ok" : "no"}">${r.correct ? "✓" : "✗"} ${decorate(r.label)}</li>`;
    });
    html += `</ul>`;
    html += `<div class="explanation-box"><b>Explicação:</b> ${decorate(c.explanation)}</div>`;
    html += `<div class="action-box"><b>${decorate(c.action)}</b></div>`;

    // Mini-guia de decisão: mostra a ação correspondente a CADA hipótese de
    // diagnóstico (não só a correta), para o usuário comparar o que se faria em
    // cada cenário e entender por que as outras opções estão descartadas.
    if (c.diagnosisOptions && c.diagnosisOptions.some((o) => o.solution)) {
      html += `<div class="solution-guide reveal">
        <h4>🗂️ O que fazer em cada hipótese de diagnóstico</h4>
        <ul class="solution-guide-list">
          ${c.diagnosisOptions.map((o) => {
            const isCorrect = o.id === c.correctDiagnosis;
            const isChosen = o.id === diagVal;
            const tagHtml = isCorrect
              ? `<span class="sg-tag sg-tag-correct">✓ Diagnóstico correto</span>`
              : (isChosen ? `<span class="sg-tag sg-tag-chosen">Sua resposta</span>` : "");
            return `<li class="solution-guide-item ${isCorrect ? "is-correct" : ""} ${isChosen && !isCorrect ? "is-chosen-wrong" : ""}">
              <div class="sg-hypothesis">${decorate(o.text)} ${tagHtml}</div>
              ${o.solution ? `<div class="sg-solution">${decorate(o.solution)}</div>` : ""}
            </li>`;
          }).join("")}
        </ul>
      </div>`;
    }

    panel.innerHTML = html;

    if (allOk) {
      const progress = loadProgress();
      const wasAlready = !!progress[id];
      progress[id] = true;
      saveProgress(progress);
      const chipRow = document.getElementById("case-chip-row");
      if (chipRow) chipRow.innerHTML = renderChips();
      if (!wasAlready && window.celebrate) window.celebrate();
    }
  };
})();
