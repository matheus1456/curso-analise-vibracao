/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/app.js — lógica principal (dados vêm de data/content.js)
   ========================================================= */
(function () {
  "use strict";

  // data/content.js declara os módulos "clássicos" (const ALL_MODULES, trilhas
  // vibração + rolamentos) e data/lube_content.js declara a trilha de
  // lubrificação como um array separado (const LUBE_COURSE) — mesmo padrão já
  // usado para CASES/BEARING_FAILURE_CASES/LUBE_CASES em practice.js. Aqui os
  // dois são combinados num único array de trabalho para toda a navegação.
  const ALL_MODULES = COURSE.concat(typeof LUBE_COURSE !== "undefined" ? LUBE_COURSE : []);

  const LEVEL_ORDER = ["básico", "intermediário", "avançado", "referência"];
  const LEVEL_LABEL = {
    "básico": "Nível básico",
    "intermediário": "Nível intermediário",
    "avançado": "Nível avançado",
    "referência": "Referência",
  };
  // Categorização de mais alto nível do menu, por tema (pedido do usuário): cada
  // módulo tem meta.track, e dentro de cada trilha os módulos continuam agrupados
  // por nível (meta.level), exatamente como antes.
  const TRACK_ORDER = ["vibracao", "rolamentos", "lubrificacao"];
  const TRACK_LABEL = {
    "vibracao": "Análise de Vibração I, II e III",
    "rolamentos": "Análise de Falhas - Rolamentos",
    "lubrificacao": "Engenheiro de Lubrificação",
  };
  const STORAGE_KEY = "vibcourse_progress_v1";
  const GROUPS_KEY = "vibcourse_sidebar_groups_v1";

  let currentId = null;

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

  function loadCollapsedGroups() {
    try { return JSON.parse(localStorage.getItem(GROUPS_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveCollapsedGroups(g) { localStorage.setItem(GROUPS_KEY, JSON.stringify(g)); }

  // groupkey = "<track>|<level>" — chave composta, necessária porque o mesmo nível
  // (ex.: "avançado") agora existe em mais de uma trilha (vibração, rolamentos,
  // lubrificação), e cada combinação trilha+nível precisa poder ser recolhida de
  // forma independente.
  window.toggleSidebarGroup = function (groupkey) {
    const groups = loadCollapsedGroups();
    groups[groupkey] = !groups[groupkey];
    saveCollapsedGroups(groups);
    applyGroupCollapse(groups);
  };

  function applyGroupCollapse(groups) {
    document.querySelectorAll(".modlink[data-groupkey]").forEach((li) => {
      const collapsed = !!groups[li.dataset.groupkey];
      li.style.display = collapsed ? "none" : "";
    });
    document.querySelectorAll(".level-heading").forEach((h) => {
      const collapsed = !!groups[h.dataset.groupkey];
      h.classList.toggle("collapsed", collapsed);
    });
  }

  window.toggleSidebar = function () {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("sidebar-overlay").classList.toggle("open");
  };

  function renderSidebar() {
    const progress = loadProgress();
    const ul = document.getElementById("modlist");
    ul.innerHTML = "";

    // Item fixo: página de Prática de Diagnóstico (fora da lista de módulos/trilhas)
    const practiceProgress = (function () { try { return JSON.parse(localStorage.getItem("vibcourse_practice_progress_v1")) || {}; } catch (e) { return {}; } })();
    const practiceDone = Object.keys(practiceProgress).filter((k) => practiceProgress[k]).length;
    const practiceLi = document.createElement("li");
    practiceLi.className = "modlink practice-link" + (currentId === "practice" ? " active" : "");
    practiceLi.dataset.id = "practice";
    practiceLi.innerHTML = '<span class="badge">🧪</span><span>Prática de Diagnóstico</span>' +
      (practiceDone ? '<span class="practice-mini-count">' + practiceDone + '/' + (window.CASES ? CASES.length : 10) + '</span>' : "");
    ul.appendChild(practiceLi);

    const chatLi = document.createElement("li");
    chatLi.className = "modlink chat-link" + (currentId === "chat" ? " active" : "");
    chatLi.dataset.id = "chat";
    chatLi.innerHTML = '<span class="badge">💬</span><span>Chat com IA</span>';
    ul.appendChild(chatLi);

    const refLi = document.createElement("li");
    refLi.className = "modlink ref-link" + (currentId === "reference" ? " active" : "");
    refLi.dataset.id = "reference";
    refLi.innerHTML = '<span class="badge">📖</span><span>Consulta Rápida</span>';
    ul.appendChild(refLi);

    const sep = document.createElement("li");
    sep.className = "sidebar-sep";
    ul.appendChild(sep);

    const collapsedGroups = loadCollapsedGroups();
    // Agrupa os módulos por trilha (meta.track) na ordem fixa TRACK_ORDER e,
    // dentro de cada trilha, por nível (meta.level) — mantendo o agrupamento por
    // nível que já existia, agora aninhado dentro de cada categoria temática.
    const byTrack = {};
    ALL_MODULES.forEach((m) => { (byTrack[m.meta.track] = byTrack[m.meta.track] || []).push(m); });
    TRACK_ORDER.forEach((track) => {
      const mods = byTrack[track];
      if (!mods || !mods.length) return;
      // Percentual de conclusão da trilha: conta quantos módulos DESTA trilha
      // (não do curso inteiro) já estão marcados como concluídos.
      const trackDone = mods.filter((m) => progress[m.id]).length;
      const trackPct = Math.round((trackDone / mods.length) * 100);
      const trackHeading = document.createElement("li");
      trackHeading.className = "track-heading";
      trackHeading.innerHTML = "<span>" + TRACK_LABEL[track] + "</span><span class='track-heading-pct'>" + trackPct + "%</span>";
      ul.appendChild(trackHeading);

      let lastLevel = null;
      mods.forEach((m) => {
        if (m.meta.level !== lastLevel) {
          lastLevel = m.meta.level;
          const groupkey = track + "|" + lastLevel;
          const h = document.createElement("li");
          h.className = "level-heading" + (collapsedGroups[groupkey] ? " collapsed" : "");
          h.dataset.groupkey = groupkey;
          h.onclick = function () { window.toggleSidebarGroup(groupkey); };
          h.innerHTML = '<span class="level-heading-arrow">▾</span><span>' + LEVEL_LABEL[lastLevel] + "</span>";
          ul.appendChild(h);
        }
        const groupkey = track + "|" + m.meta.level;
        const li = document.createElement("li");
        li.className = "modlink" + (m.id === currentId ? " active" : "") + (progress[m.id] ? " done" : "");
        li.dataset.id = m.id;
        li.dataset.groupkey = groupkey;
        li.style.display = collapsedGroups[groupkey] ? "none" : "";
        li.innerHTML = '<span class="badge">' + m.meta.num + '</span><span>' + m.meta.short + '</span><span class="check">✓</span>';
        ul.appendChild(li);
      });
    });
    const doneCount = Object.keys(progress).filter((k) => progress[k]).length;
    document.getElementById("progress-count").textContent = doneCount + "/" + ALL_MODULES.length;
    document.getElementById("progress-bar-fill").style.width = (doneCount / ALL_MODULES.length * 100) + "%";
  }

  window.handleNavClick = function (ev) {
    const li = ev.target.closest(".modlink");
    if (!li) return;
    goTo(li.dataset.id);
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-overlay").classList.remove("open");
  };

  function escapeHtml(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  // decorate(): igual a escapeHtml(), mas também envolve siglas técnicas conhecidas
  // (BPFO, GMF, RMS...) com um tooltip explicativo (assets/js/acronyms.js). Usar
  // apenas em texto "prosa" exibido como HTML normal — nunca dentro de SVG ou de
  // valores de atributos (ex.: alt="...").
  function decorate(s) { return window.decorateAcronyms ? window.decorateAcronyms(s) : escapeHtml(s); }

  let pendingCharts = []; // { id, spec } coletados durante renderBody(), renderizados após o innerHTML ser aplicado
  let chartCounter = 0;

  function renderNode(n) {
    switch (n.type) {
      case "h2": return "<h2 class='reveal'>" + decorate(n.text) + "</h2>";
      case "h3": return "<h3 class='reveal'>" + decorate(n.text) + "</h3>";
      case "p": return "<p class='reveal'>" + decorate(n.text) + "</p>";
      case "quote": return "<blockquote class='quote reveal'>" + decorate(n.text) + "</blockquote>";
      case "image":
        return "<figure class='fig reveal'><img src='" + n.src + "' loading='lazy' alt=\"" + escapeHtml(n.caption || "") + "\"/><figcaption>" + decorate(n.caption || "") + "</figcaption></figure>";
      case "table": {
        let h = "<div class='table-scroll reveal'><table class='data-table'><thead><tr>" + n.header.map((x) => "<th>" + decorate(x) + "</th>").join("") + "</tr></thead><tbody>";
        n.rows.forEach((r) => { h += "<tr>" + r.map((x) => "<td>" + decorate(x) + "</td>").join("") + "</tr>"; });
        h += "</tbody></table></div>";
        return h;
      }
      case "chart": {
        const chartId = "mod-chart-" + (chartCounter++);
        pendingCharts.push({ id: chartId, spec: n.spectrum });
        return "<div class='chart-block reveal'>" +
          (n.caption ? "<div class='chart-caption'>📊 " + decorate(n.caption) + "</div>" : "") +
          "<div id='" + chartId + "' class='mod-chart-container'></div>" +
          "<p class='chart-hint'>Passe o mouse sobre o gráfico para ler os valores exatos de ordem e amplitude.</p>" +
          "</div>";
      }
      default: return "";
    }
  }

  function renderBody(nodes) {
    let html = "";
    let bulletBuf = [];
    function flushBullets() {
      if (bulletBuf.length) {
        html += "<ul class='bullets reveal'>" + bulletBuf.map((t) => "<li>" + decorate(t) + "</li>").join("") + "</ul>";
        bulletBuf = [];
      }
    }
    nodes.forEach((n) => {
      if (n.type === "bullet") { bulletBuf.push(n.text); return; }
      flushBullets();
      html += renderNode(n);
    });
    flushBullets();
    return html;
  }

  // Placeholder mostrado quando não há vídeo configurado OU quando o arquivo
  // de vídeo referenciado no manifest não pôde ser carregado (arquivo ausente,
  // corrompido ou ainda não colocado na pasta assets/video/).
  function videoPlaceholderHtml(reason) {
    return "<div class='play-ico'>▶</div><div class='vc-text'>" +
      "<h4>Vídeo-aula deste módulo</h4><p>" + decorate(reason) + "</p></div>";
  }

  window.handleVideoError = function (id, num) {
    const wrap = document.getElementById("video-wrap-" + id);
    if (!wrap) return;
    wrap.classList.remove("video-wrap");
    wrap.classList.add("video-card");
    wrap.innerHTML = videoPlaceholderHtml(
      "O arquivo de vídeo deste módulo não pôde ser carregado (ainda não foi colocado em assets/video/, ou o link expirou). Veja assets/video/LEIA-ME.txt para as instruções de instalação."
    );
  };

  function renderVideoCard(m) {
    if (m.videoUrl) {
      return "<div class='video-wrap reveal' id='video-wrap-" + m.id + "'>" +
        "<video class='mod-video' controls preload='metadata' onerror=\"handleVideoError('" + m.id + "','" + m.meta.num + "')\">" +
        "<source src='" + m.videoUrl + "' type='video/mp4' onerror=\"handleVideoError('" + m.id + "','" + m.meta.num + "')\"/></video>" +
        "<div class='video-caption'>Vídeo-aula gerada por IA (NotebookLM) — módulo " + m.meta.num + "</div>" +
        "</div>";
    }
    return "<div class='video-card reveal'>" +
      videoPlaceholderHtml("Em produção via IA (NotebookLM) — assim que estiver pronto, o vídeo aparecerá automaticamente aqui.") +
      "</div>";
  }

  function renderQuiz(quiz, moduleId, quizIndex) {
    let h = "<div class='quiz-box reveal'><h3>📝 " + decorate(quiz.title) + "</h3>";
    quiz.questions.forEach((q, i) => {
      const qid = "quiz-" + moduleId + "-" + quizIndex + "-" + i;
      const opts = (q.options || []);
      h += "<div class='q-item' style='animation-delay:" + (i * 0.05) + "s' id='" + qid + "'>" +
        "<div class='q-text'>" + (i + 1) + ". " + decorate(q.text) + "</div>" +
        "<div class='q-options'>" +
        opts.map((o) =>
          "<label class='q-option' data-oid='" + o.id + "'>" +
          "<input type='radio' name='" + qid + "' value='" + o.id + "' onchange=\"checkQuizAnswer('" + qid + "','" + o.id + "','" + q.correct + "')\"/>" +
          "<span>" + o.id.toUpperCase() + ") " + decorate(o.text) + "</span>" +
          "</label>"
        ).join("") +
        "</div>" +
        "<div class='q-feedback'></div>" +
        "<div class='answer'><strong>Explicação:</strong> " + decorate(q.explanation || "") + "</div>" +
        "</div>";
    });
    h += "</div>";
    return h;
  }

  window.checkQuizAnswer = function (qid, chosen, correct) {
    const container = document.getElementById(qid);
    if (!container) return;
    const isCorrect = chosen === correct;
    container.querySelectorAll(".q-option").forEach((label) => {
      label.classList.remove("correct", "incorrect");
      const oid = label.getAttribute("data-oid");
      if (oid === correct) label.classList.add("correct");
      else if (oid === chosen && !isCorrect) label.classList.add("incorrect");
    });
    const fb = container.querySelector(".q-feedback");
    if (fb) {
      fb.textContent = isCorrect ? "✅ Correto!" : "❌ Incorreto — a resposta certa está destacada acima.";
      fb.className = "q-feedback shown " + (isCorrect ? "ok" : "bad");
    }
    const ans = container.querySelector(".answer");
    if (ans) ans.classList.add("shown");
    container.querySelectorAll("input[type='radio']").forEach((inp) => { inp.disabled = true; });
  };

  function renderModule(m) {
    const progress = loadProgress();
    const idx = ALL_MODULES.findIndex((x) => x.id === m.id);
    const prev = ALL_MODULES[idx - 1];
    const next = ALL_MODULES[idx + 1];
    pendingCharts = [];
    window.CURRENT_MODULE = m;
    let html = "";
    html += "<div id='topbar'>";
    html += "<span class='level-tag'>" + LEVEL_LABEL[m.meta.level] + " · Módulo " + m.meta.num + "</span>";
    html += "<span class='nav-buttons'>" +
      "<button onclick=\"" + (prev ? "goTo('" + prev.id + "')" : "") + "\" " + (prev ? "" : "disabled") + ">← Anterior</button>" +
      "<button onclick=\"" + (next ? "goTo('" + next.id + "')" : "") + "\" " + (next ? "" : "disabled") + ">Próximo →</button>" +
      "</span></div>";
    html += "<h1 class='mod-title'>" + decorate(m.title) + "</h1>";
    html += "<div class='audio-controls reveal'>";
    if (window.isReadingSupported && window.isReadingSupported()) {
      html +=
        "<button id='audio-toggle-btn' class='audio-btn' onclick='toggleReading(CURRENT_MODULE)'>🔊 Ouvir aula</button>" +
        "<button id='audio-stop-btn' class='audio-btn audio-stop' style='display:none' onclick='stopReading()'>⏹ Parar</button>" +
        "<span id='audio-engine-badge' class='audio-engine-badge' style='display:none'></span>";
    }
    if (window.openLab) {
      html += "<button class='lab-btn' onclick=\"openLab('" + m.id + "')\">🧪 Laboratório</button>";
    }
    html += "</div>";
    html += renderVideoCard(m);
    html += renderBody(m.body);
    if (m.summary && m.summary.length) {
      html += "<div class='summary-box reveal'><h3>📌 Resumo do módulo</h3><ul class='bullets'>" +
        m.summary.map((s) => "<li>" + decorate(s) + "</li>").join("") +
        "</ul></div>";
    }
    m.quizzes.forEach((q, qi) => { html += renderQuiz(q, m.id, qi); });
    const isDone = !!progress[m.id];
    html += "<div class='complete-bar reveal'>" +
      "<div>" + (isDone ? "✅ Módulo concluído" : "Marque este módulo como concluído ao terminar.") + "</div>" +
      "<div class='cb-nav'>" +
      "<button class='" + (isDone ? "done" : "") + "' onclick=\"markDone('" + m.id + "')\">" + (isDone ? "Concluído" : "Marcar como concluído") + "</button>" +
      (next ? "<button onclick=\"goTo('" + next.id + "')\">Próximo módulo →</button>" : "") +
      "</div></div>";
    const contentEl = document.getElementById("content");
    contentEl.innerHTML = html;
    contentEl.classList.remove("fade-target");
    void contentEl.offsetWidth; // force reflow to restart animation
    contentEl.classList.add("fade-target");
    pendingCharts.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el && window.renderSpectrumSVG) window.renderSpectrumSVG(el, c.spec);
    });
    if (window.initScrollReveal) window.initScrollReveal();
  }

  function renderCover() {
    let html = "<div id='cover'>";
    html += "<h1>Análise de Vibração em Máquinas Rotativas</h1>";
    html += "<p class='subtitle'>Formação técnica interativa para Engenheiro de Confiabilidade — " + ALL_MODULES.length + " módulos em 3 trilhas (Análise de Vibração, Análise de Falhas em Rolamentos e Engenheiro de Lubrificação), do nível básico ao avançado, com exemplos de espectros, exercícios comentados, vídeo-aulas geradas por IA e estudos de caso.</p>";
    html += "<div class='cover-btn-row'>" +
      "<button class='start-btn' onclick=\"goTo('m0')\">Começar o curso →</button>" +
      "<button class='start-btn secondary' onclick=\"goTo('practice')\">🧪 Praticar com casos reais →</button>" +
      "<button class='start-btn secondary' onclick=\"goTo('chat')\">💬 Tirar dúvidas com a IA →</button>" +
      "<button class='start-btn secondary' onclick=\"goTo('reference')\">📖 Consulta rápida →</button>" +
      "</div>";
    // Um cartão por trilha temática, e dentro de cada cartão os módulos ainda
    // agrupados por nível — mesma lógica de agrupamento usada na sidebar.
    html += "<div class='track-grid'>";
    const byTrack = {};
    ALL_MODULES.forEach((m) => { (byTrack[m.meta.track] = byTrack[m.meta.track] || []).push(m); });
    TRACK_ORDER.forEach((track) => {
      const mods = byTrack[track];
      if (!mods || !mods.length) return;
      const byLevel = {};
      mods.forEach((m) => { (byLevel[m.meta.level] = byLevel[m.meta.level] || []).push(m); });
      html += "<div class='track-card'><h4>" + TRACK_LABEL[track] + "</h4>";
      LEVEL_ORDER.forEach((lvl) => {
        if (!byLevel[lvl]) return;
        html += "<p><b>" + LEVEL_LABEL[lvl] + ":</b> " +
          byLevel[lvl].map((m) => m.meta.num + ". " + m.meta.short).join(" · ") + "</p>";
      });
      html += "</div>";
    });
    html += "</div></div>";
    const contentEl = document.getElementById("content");
    contentEl.innerHTML = html;
    contentEl.classList.remove("fade-target");
    void contentEl.offsetWidth;
    contentEl.classList.add("fade-target");
  }

  window.goTo = function (id) {
    if (window.stopReading) window.stopReading();
    currentId = id;
    window.scrollTo(0, 0);
    if (id === "practice") {
      if (window.renderPracticePage) window.renderPracticePage();
      renderSidebar();
      history.replaceState(null, "", "#practice");
      return;
    }
    if (id === "chat") {
      if (window.renderChatPage) window.renderChatPage();
      renderSidebar();
      history.replaceState(null, "", "#chat");
      return;
    }
    if (id === "reference") {
      if (window.renderReferencePage) window.renderReferencePage();
      renderSidebar();
      history.replaceState(null, "", "#reference");
      return;
    }
    const m = ALL_MODULES.find((x) => x.id === id);
    renderModule(m);
    renderSidebar();
    history.replaceState(null, "", "#" + id);
  };

  window.markDone = function (id) {
    const p = loadProgress();
    const wasAlready = !!p[id];
    p[id] = true;
    saveProgress(p);
    renderSidebar();
    renderModule(ALL_MODULES.find((x) => x.id === id));
    if (!wasAlready && window.celebrate) window.celebrate();
  };

  // init
  renderSidebar();
  const hash = location.hash.replace("#", "");
  if (hash === "practice" || hash === "chat" || hash === "reference" || (hash && ALL_MODULES.find((x) => x.id === hash))) {
    goTo(hash);
  } else {
    renderCover();
  }
})();
