/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/lab.js — botão "🧪 Laboratório" disponível em todos os módulos
   e também na página de Prática de Diagnóstico.
   Abre um modal com quatro abas:
     1) Calculadora (aritmética, com suporte a digitação pelo teclado)
     2) Conversores (unidades mais usadas em análise de vibração)
     3) Anotações do aluno (texto, salvo por módulo/página)
     4) Rascunho (desenho livre tipo caneta, salvo por módulo/página)
   Tudo é salvo apenas no localStorage do navegador, por id de módulo.
   ========================================================= */
(function () {
  "use strict";

  const NOTES_KEY_PREFIX = "vibcourse_lab_notes_";
  const DRAW_KEY_PREFIX = "vibcourse_lab_draw_";
  let activeModuleId = null;
  let activeTab = "calc";
  let calcExpr = "";
  let drawCtx = null;
  let drawing = false;
  let lastPt = null;
  let penColor = "#1f5fa8";
  let penSize = 3;
  let calcKeydownHandler = null;
  // Tipo de conversão/cálculo selecionado na aba "Conversores". Fica em memória
  // (não precisa persistir) para manter a escolha do usuário ao reabrir o
  // Laboratório na mesma sessão.
  let convType = "rpm_hz";

  function escapeHtmlLab(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function loadNotes(id) { try { return localStorage.getItem(NOTES_KEY_PREFIX + id) || ""; } catch (e) { return ""; } }
  function saveNotes(id, txt) { try { localStorage.setItem(NOTES_KEY_PREFIX + id, txt); } catch (e) {} }
  function loadDrawing(id) { try { return localStorage.getItem(DRAW_KEY_PREFIX + id) || ""; } catch (e) { return ""; } }
  function saveDrawing(id, dataUrl) { try { localStorage.setItem(DRAW_KEY_PREFIX + id, dataUrl); } catch (e) {} }

  function ensureOverlay() {
    let ov = document.getElementById("lab-overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "lab-overlay";
      ov.className = "lab-overlay";
      ov.addEventListener("click", function (ev) {
        if (ev.target === ov) window.closeLab();
      });
      document.body.appendChild(ov);
    }
    return ov;
  }

  // Layout tipo calculadora de bolso: linha de ações (C/⌫/%/parênteses) no
  // topo, depois o teclado numérico 4×4 com os operadores destacados numa
  // coluna própria (à direita), e "=" ocupando duas colunas na última linha
  // para ficar fácil de acertar tanto no clique quanto no toque.
  function calcButtons() {
    const rows = [
      ["7", "8", "9", "÷"],
      ["4", "5", "6", "×"],
      ["1", "2", "3", "−"],
      ["0", ".", "=", "+"],
    ];
    let h = "";
    rows.forEach((row) => {
      h += "<div class='lab-calc-row'>";
      row.forEach((k) => {
        const opClass = "÷×−+".indexOf(k) !== -1 ? " lab-calc-op" : "";
        const eqClass = k === "=" ? " lab-calc-eq" : "";
        h += "<button class='lab-calc-key" + opClass + eqClass + "' data-key=\"" + k + "\">" + k + "</button>";
      });
      h += "</div>";
    });
    return h;
  }

  function renderCalcTab() {
    return (
      "<div class='lab-calc'>" +
      "<div class='lab-calc-display' id='lab-calc-display'>" + escapeHtmlLab(calcExpr || "0") + "</div>" +
      "<div class='lab-calc-actions'>" +
      "<button class='lab-calc-key lab-calc-clear' data-key='C'>C</button>" +
      "<button class='lab-calc-key' data-key='⌫'>⌫</button>" +
      "<button class='lab-calc-key' data-key='%'>%</button>" +
      "<button class='lab-calc-key' data-key='('>(</button>" +
      "<button class='lab-calc-key' data-key=')'>)</button>" +
      "</div>" +
      calcButtons() +
      "<div class='lab-calc-hint'>⌨️ Também aceita digitação pelo teclado — números, + − × ÷ (ou * /), parênteses, Enter para = e Esc para limpar.</div>" +
      "</div>"
    );
  }

  // Cada entrada descreve um tipo de conversão/cálculo disponível no seletor da
  // aba "Conversores". `group` separa as conversões de unidade simples das
  // fórmulas do curso (que exigem mais de uma variável de entrada).
  const CONV_TYPES = [
    { id: "rpm_hz", group: "Rotação e amplitude", label: "RPM ↔ Hz" },
    { id: "vel_accel", group: "Rotação e amplitude", label: "Deslocamento ↔ Velocidade ↔ Aceleração (numa frequência f)" },
    { id: "pico_rms", group: "Rotação e amplitude", label: "Pico ↔ RMS ↔ Pico-a-pico (+ fator de crista)" },
    { id: "db_ratio", group: "Rotação e amplitude", label: "dB ↔ Razão de amplitude" },
    { id: "c_f", group: "Rotação e amplitude", label: "°C ↔ °F" },
    { id: "bearing_freq", group: "Fórmulas do curso", label: "Frequências de defeito de rolamento — BPFO/BPFI/BSF/FTF (Módulo 7)" },
    { id: "gmf", group: "Fórmulas do curso", label: "Frequência de engrenamento — GMF (Módulo 8)" },
    { id: "l10", group: "Fórmulas do curso", label: "Vida nominal do rolamento — L10/Lnm (Módulo 19)" },
  ];

  function convTypeSelectHtml() {
    const groups = [];
    CONV_TYPES.forEach((t) => { if (groups.indexOf(t.group) === -1) groups.push(t.group); });
    let html = "<select id='lab-conv-type-select' class='lab-conv-type-select'>";
    groups.forEach((g) => {
      html += "<optgroup label='" + g + "'>";
      CONV_TYPES.filter((t) => t.group === g).forEach((t) => {
        html += "<option value='" + t.id + "'" + (t.id === convType ? " selected" : "") + ">" + t.label + "</option>";
      });
      html += "</optgroup>";
    });
    html += "</select>";
    return html;
  }

  // Campo numérico editável e reutilizável para os pares/trincas bidirecionais:
  // o usuário pode digitar em QUALQUER um dos campos ligados que os outros são
  // recalculados automaticamente ("e vice-versa"), em vez de ter uma direção
  // fixa de conversão como na versão anterior desta aba.
  function convField(id, label, placeholder) {
    return "<div class='lab-conv-field'><label for='" + id + "'>" + label + "</label>" +
      "<input type='number' id='" + id + "' placeholder='" + (placeholder || "") + "' step='any'/></div>";
  }

  function renderConvBody(type) {
    if (type === "rpm_hz") {
      return "<div class='lab-conv-block'>" +
        "<h4>RPM ↔ Hz</h4>" +
        "<div class='lab-conv-fields'>" + convField("cv-rpm", "RPM", "ex.: 1780") + convField("cv-hz", "Hz", "ex.: 29.67") + "</div>" +
        "<div class='lab-conv-hint'>Digite em qualquer um dos dois campos — o outro é calculado automaticamente (Hz = RPM/60).</div>" +
        "</div>";
    }
    if (type === "vel_accel") {
      return "<div class='lab-conv-block'>" +
        "<h4>Deslocamento, velocidade e aceleração (onda senoidal pura)</h4>" +
        "<div class='lab-conv-fields'>" + convField("cv-freq", "Frequência f (Hz)", "ex.: 29.5") + "</div>" +
        "<div class='lab-conv-fields'>" +
        convField("cv-desl", "Deslocamento (µm pico)", "ex.: 50") +
        convField("cv-vel", "Velocidade (mm/s pico)", "ex.: 9.3") +
        convField("cv-accel", "Aceleração (g pico)", "ex.: 0.17") +
        "</div>" +
        "<div class='lab-conv-hint'>Defina a frequência f e digite em qualquer um dos três campos de amplitude — os outros dois são recalculados (v = 2πfd, a = 2πfv).</div>" +
        "</div>";
    }
    if (type === "pico_rms") {
      return "<div class='lab-conv-block'>" +
        "<h4>Pico ↔ RMS ↔ Pico-a-pico</h4>" +
        "<div class='lab-conv-fields'>" +
        convField("cv-pico", "Pico (0-p)", "ex.: 7.0") +
        convField("cv-rms", "RMS", "ex.: 4.95") +
        convField("cv-pp", "Pico-a-pico", "ex.: 14.0") +
        "</div>" +
        "<div class='lab-conv-readout' id='cv-crest-out'>Fator de crista (Pico/RMS): —</div>" +
        "<div class='lab-conv-hint'>Válido para onda senoidal pura (Pico = RMS×√2 = Pico-a-pico/2). Fator de crista muito acima de ~3-4 é indício de impactos/choques no sinal.</div>" +
        "</div>";
    }
    if (type === "db_ratio") {
      return "<div class='lab-conv-block'>" +
        "<h4>dB ↔ Razão de amplitude</h4>" +
        "<div class='lab-conv-fields'>" + convField("cv-db", "dB", "ex.: 12") + convField("cv-ratio", "Razão (×)", "ex.: 3.98") + "</div>" +
        "<div class='lab-conv-hint'>Digite em qualquer um dos dois campos (dB = 20·log₁₀(razão)).</div>" +
        "</div>";
    }
    if (type === "c_f") {
      return "<div class='lab-conv-block'>" +
        "<h4>°C ↔ °F</h4>" +
        "<div class='lab-conv-fields'>" + convField("cv-c", "°C", "ex.: 65") + convField("cv-f", "°F", "ex.: 149") + "</div>" +
        "<div class='lab-conv-hint'>Digite em qualquer um dos dois campos.</div>" +
        "</div>";
    }
    if (type === "bearing_freq") {
      return "<div class='lab-conv-block'>" +
        "<h4>Frequências de defeito de rolamento (BPFO/BPFI/BSF/FTF)</h4>" +
        "<div class='lab-conv-fields'>" +
        convField("cv-b-n", "N — nº de elementos rolantes", "ex.: 9") +
        convField("cv-b-d", "d — diâmetro do elemento (mm)", "ex.: 12") +
        convField("cv-b-p", "p — diâmetro primitivo (mm)", "ex.: 60") +
        "</div>" +
        "<div class='lab-conv-fields'>" +
        convField("cv-b-beta", "β — ângulo de contato (graus)", "ex.: 0") +
        convField("cv-b-fri", "RPM do eixo (pista interna)", "ex.: 1770") +
        convField("cv-b-fre", "RPM da pista externa (0 = fixa)", "0") +
        "</div>" +
        "<div class='lab-conv-readout' id='cv-bearing-out'>BPFO: — · BPFI: — · BSF: — · FTF: —</div>" +
        "<div class='lab-conv-hint'>Mesma fórmula do Módulo 7: BPFO/BPFI = (N/2)·(fri−fre)·[1∓(d/p)cosβ]. Resultados em Hz e em ordens (×RPM do eixo), no mesmo padrão dos espectros do curso.</div>" +
        "</div>";
    }
    if (type === "gmf") {
      return "<div class='lab-conv-block'>" +
        "<h4>Frequência de engrenamento (GMF)</h4>" +
        "<div class='lab-conv-fields'>" +
        convField("cv-g-teeth", "Nº de dentes da engrenagem", "ex.: 33") +
        convField("cv-g-rpm", "RPM do eixo dessa engrenagem", "ex.: 1780") +
        "</div>" +
        "<div class='lab-conv-readout' id='cv-gmf-out'>GMF: —</div>" +
        "<div class='lab-conv-hint'>GMF = nº de dentes × RPM do eixo. Resultado em Hz e em CPM (ciclos por minuto).</div>" +
        "</div>";
    }
    if (type === "l10") {
      return "<div class='lab-conv-block'>" +
        "<h4>Vida nominal do rolamento (L10 / Lnm — Módulo 19)</h4>" +
        "<div class='lab-conv-fields'>" +
        convField("cv-l-c", "C — capacidade dinâmica (kN)", "ex.: 45") +
        convField("cv-l-p", "P — carga equivalente (kN)", "ex.: 9") +
        "</div>" +
        "<div class='lab-conv-fields'>" +
        "<div class='lab-conv-field'><label for='cv-l-exp'>Tipo de rolamento</label>" +
        "<select id='cv-l-exp'><option value='3'>Esferas (p = 3)</option><option value='3.333'>Rolos (p = 10/3)</option></select></div>" +
        convField("cv-l-rpm", "RPM de operação", "ex.: 1780") +
        "</div>" +
        "<div class='lab-conv-fields'>" +
        convField("cv-l-a1", "a1 — fator de confiabilidade", "1 (=90%)") +
        convField("cv-l-askf", "aSKF — fator de ajuste SKF", "1") +
        "</div>" +
        "<div class='lab-conv-readout' id='cv-l10-out'>L_nm: —</div>" +
        "<div class='lab-conv-hint'>L_nm = a1 · aSKF · (C/P)^p, em milhões de revoluções — convertido aqui também para horas de operação contínua na RPM informada.</div>" +
        "</div>";
    }
    return "";
  }

  function renderConvTab() {
    return (
      "<div class='lab-conv'>" +
      "<label class='lab-conv-type-label' for='lab-conv-type-select'>Escolha o tipo de conversão/cálculo:</label>" +
      convTypeSelectHtml() +
      "<div id='lab-conv-body'>" + renderConvBody(convType) + "</div>" +
      "</div>"
    );
  }

  function renderNotesTab(id) {
    const notes = loadNotes(id);
    return (
      "<div class='lab-notes'>" +
      "<textarea id='lab-notes-area' class='lab-notes-area' placeholder='Digite suas anotações sobre este módulo...'>" +
      escapeHtmlLab(notes) +
      "</textarea>" +
      "<div class='lab-notes-actions'>" +
      "<span id='lab-notes-status' class='lab-notes-status'></span>" +
      "<button class='verify-btn' id='lab-notes-save'>Salvar anotações</button>" +
      "</div></div>"
    );
  }

  function renderDrawTab() {
    return (
      "<div class='lab-draw'>" +
      "<div class='lab-draw-toolbar'>" +
      "<span class='lab-draw-label'>Cor:</span>" +
      "<button class='lab-color-swatch' data-color='#1f5fa8' style='background:#1f5fa8'></button>" +
      "<button class='lab-color-swatch' data-color='#b5462a' style='background:#b5462a'></button>" +
      "<button class='lab-color-swatch' data-color='#2f9e5c' style='background:#2f9e5c'></button>" +
      "<button class='lab-color-swatch' data-color='#1a1a1a' style='background:#1a1a1a'></button>" +
      "<span class='lab-draw-label'>Espessura:</span>" +
      "<input type='range' id='lab-pen-size' min='1' max='10' value='3'/>" +
      "<button class='lab-draw-btn' id='lab-draw-undo'>↩ Limpar tudo</button>" +
      "<button class='verify-btn' id='lab-draw-save'>Salvar rascunho</button>" +
      "</div>" +
      "<canvas id='lab-draw-canvas' class='lab-draw-canvas' width='760' height='380'></canvas>" +
      "<div class='lab-notes-status' id='lab-draw-status'></div>" +
      "</div>"
    );
  }

  function wireCalc(container) {
    const display = container.querySelector("#lab-calc-display");
    function refresh() { display.textContent = calcExpr || "0"; }
    function pressKey(k) {
      if (k === "C") { calcExpr = ""; }
      else if (k === "⌫") { calcExpr = calcExpr.slice(0, -1); }
      else if (k === "=") {
        try {
          const sanitized = calcExpr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/[^0-9+\-*/().% ]/g, "");
          // eslint-disable-next-line no-new-func
          const result = Function('"use strict"; return (' + sanitized + ")")();
          calcExpr = (Math.round((result + Number.EPSILON) * 100000) / 100000).toString();
        } catch (e) { calcExpr = "Erro"; }
      } else {
        calcExpr += k;
      }
      refresh();
    }
    container.querySelectorAll(".lab-calc-key").forEach((btn) => {
      btn.addEventListener("click", function () { pressKey(btn.getAttribute("data-key")); });
    });

    // Digitação pelo teclado físico — mapeia teclas comuns para os mesmos
    // símbolos usados nos botões, cumprindo a dica mostrada na própria aba.
    const KEY_MAP = { "*": "×", "/": "÷", "-": "−", "Enter": "=", "=": "=", "Escape": "C", "Backspace": "⌫" };
    calcKeydownHandler = function (ev) {
      const raw = ev.key;
      const mapped = KEY_MAP[raw];
      if (mapped) { ev.preventDefault(); pressKey(mapped); return; }
      if (/^[0-9.()%+]$/.test(raw)) { ev.preventDefault(); pressKey(raw); }
    };
    document.addEventListener("keydown", calcKeydownHandler);
  }

  function detachCalcKeydown() {
    if (calcKeydownHandler) {
      document.removeEventListener("keydown", calcKeydownHandler);
      calcKeydownHandler = null;
    }
  }

  // Formata um número calculado para exibição; se a entrada estiver incompleta
  // ou o resultado não for um número válido, mostra "—" em vez de deixar um
  // campo com NaN/lixo — cobre o caso de faltar algum valor para completar o
  // cálculo (o campo simplesmente fica pronto para nova digitação, sem travar).
  function fmtNum(n, decimals) {
    if (n === null || n === undefined || isNaN(n) || !isFinite(n)) return "—";
    return n.toFixed(decimals === undefined ? 2 : decimals);
  }

  function readNum(container, id) {
    const el = container.querySelector("#" + id);
    if (!el) return NaN;
    const v = parseFloat((el.value || "").toString().replace(",", "."));
    return v;
  }

  function setVal(container, id, value) {
    const el = container.querySelector("#" + id);
    if (!el) return;
    if (document.activeElement === el) return; // não sobrescreve o campo que o usuário está digitando
    el.value = value;
  }

  // Liga um grupo de N campos numéricos de forma bidirecional: ao digitar em
  // QUALQUER campo do grupo, `recompute(values, changedId)` é chamado com os
  // valores atuais de todos os campos (o que acabou de mudar já está incluído)
  // e deve devolver um objeto { id: novoValorOuTextoOuUndefined } com os
  // valores a escrever nos OUTROS campos (o campo alterado nunca é sobrescrito
  // enquanto o usuário ainda está com o foco nele).
  function wireLinkedFields(container, ids, recompute) {
    function update(changedId) {
      const values = {};
      ids.forEach((id) => { values[id] = readNum(container, id); });
      const updates = recompute(values, changedId) || {};
      Object.keys(updates).forEach((id) => {
        if (id === changedId) return;
        setVal(container, id, updates[id]);
      });
    }
    ids.forEach((id) => {
      const el = container.querySelector("#" + id);
      if (el) el.addEventListener("input", function () { update(id); });
    });
  }

  function wireReadout(container, ids, outId, compute) {
    const out = container.querySelector("#" + outId);
    function update() {
      const values = ids.map((id) => readNum(container, id));
      out.textContent = compute.apply(null, values);
    }
    ids.forEach((id) => {
      const el = container.querySelector("#" + id);
      if (el) el.addEventListener("input", update);
    });
    update();
  }

  function wireConvBody(container, type) {
    if (type === "rpm_hz") {
      wireLinkedFields(container, ["cv-rpm", "cv-hz"], function (v, changed) {
        if (changed === "cv-hz") return { "cv-rpm": isNaN(v["cv-hz"]) ? "" : fmtNum(v["cv-hz"] * 60, 2) };
        return { "cv-hz": isNaN(v["cv-rpm"]) ? "" : fmtNum(v["cv-rpm"] / 60, 3) };
      });
      return;
    }
    if (type === "vel_accel") {
      // v [mm/s] = 2π·f·d(mm) ; a [g] = 2π·f·v(mm/s)/9810 — d em µm precisa ir para mm (÷1000)
      wireLinkedFields(container, ["cv-freq", "cv-desl", "cv-vel", "cv-accel"], function (v, changed) {
        const f = v["cv-freq"];
        if (isNaN(f) || f <= 0) return {};
        const w = 2 * Math.PI * f;
        if (changed === "cv-desl") {
          const vel = w * (v["cv-desl"] / 1000);
          return { "cv-vel": fmtNum(vel, 3), "cv-accel": fmtNum((w * vel) / 9810, 4) };
        }
        if (changed === "cv-accel") {
          const vel = (v["cv-accel"] * 9810) / w;
          return { "cv-vel": fmtNum(vel, 3), "cv-desl": fmtNum((vel * 1000) / w, 2) };
        }
        // padrão: mudou a velocidade (ou a própria frequência) — recalcula a partir da velocidade
        const vel = v["cv-vel"];
        if (isNaN(vel)) return {};
        return { "cv-desl": fmtNum((vel * 1000) / w, 2), "cv-accel": fmtNum((w * vel) / 9810, 4) };
      });
      return;
    }
    if (type === "pico_rms") {
      wireLinkedFields(container, ["cv-pico", "cv-rms", "cv-pp"], function (v, changed) {
        let pico = v["cv-pico"];
        if (changed === "cv-rms") pico = v["cv-rms"] * Math.SQRT2;
        else if (changed === "cv-pp") pico = v["cv-pp"] / 2;
        if (isNaN(pico)) return {};
        return {
          "cv-pico": fmtNum(pico, 3),
          "cv-rms": fmtNum(pico / Math.SQRT2, 3),
          "cv-pp": fmtNum(pico * 2, 3),
        };
      });
      wireReadout(container, ["cv-pico", "cv-rms"], "cv-crest-out", function (pico, rms) {
        if (isNaN(pico) || isNaN(rms) || rms === 0) return "Fator de crista (Pico/RMS): —";
        return "Fator de crista (Pico/RMS): " + fmtNum(pico / rms, 2) + "×";
      });
      return;
    }
    if (type === "db_ratio") {
      wireLinkedFields(container, ["cv-db", "cv-ratio"], function (v, changed) {
        if (changed === "cv-ratio") {
          if (isNaN(v["cv-ratio"]) || v["cv-ratio"] <= 0) return {};
          return { "cv-db": fmtNum(20 * Math.log10(v["cv-ratio"]), 2) };
        }
        if (isNaN(v["cv-db"])) return {};
        return { "cv-ratio": fmtNum(Math.pow(10, v["cv-db"] / 20), 4) };
      });
      return;
    }
    if (type === "c_f") {
      wireLinkedFields(container, ["cv-c", "cv-f"], function (v, changed) {
        if (changed === "cv-f") {
          if (isNaN(v["cv-f"])) return {};
          return { "cv-c": fmtNum(((v["cv-f"] - 32) * 5) / 9, 1) };
        }
        if (isNaN(v["cv-c"])) return {};
        return { "cv-f": fmtNum((v["cv-c"] * 9) / 5 + 32, 1) };
      });
      return;
    }
    if (type === "bearing_freq") {
      wireReadout(container, ["cv-b-n", "cv-b-d", "cv-b-p", "cv-b-beta", "cv-b-fri", "cv-b-fre"], "cv-bearing-out",
        function (n, d, p, betaDeg, rpmI, rpmE) {
          const fre = isNaN(rpmE) ? 0 : rpmE / 60;
          const fri = rpmI / 60;
          if (isNaN(n) || isNaN(d) || isNaN(p) || isNaN(fri) || p === 0) return "BPFO: — · BPFI: — · BSF: — · FTF: —";
          const beta = ((isNaN(betaDeg) ? 0 : betaDeg) * Math.PI) / 180;
          const fr = fri - fre;
          const ratio = (d / p) * Math.cos(beta);
          const bpfo = (n / 2) * fr * (1 - ratio);
          const bpfi = (n / 2) * fr * (1 + ratio);
          const ftf = (fr / 2) * (1 - ratio);
          const bsf = ((p / (2 * d)) * fr * (1 - ratio * ratio)) || 0;
          const shaftHz = fri || 1;
          return "BPFO: " + fmtNum(bpfo, 2) + " Hz (" + fmtNum(bpfo / shaftHz, 2) + "×RPM) · " +
            "BPFI: " + fmtNum(bpfi, 2) + " Hz (" + fmtNum(bpfi / shaftHz, 2) + "×RPM) · " +
            "BSF: " + fmtNum(bsf, 2) + " Hz (" + fmtNum(bsf / shaftHz, 2) + "×RPM) · " +
            "FTF: " + fmtNum(ftf, 3) + " Hz (" + fmtNum(ftf / shaftHz, 3) + "×RPM)";
        });
      return;
    }
    if (type === "gmf") {
      wireReadout(container, ["cv-g-teeth", "cv-g-rpm"], "cv-gmf-out", function (teeth, rpm) {
        if (isNaN(teeth) || isNaN(rpm)) return "GMF: —";
        const hz = teeth * (rpm / 60);
        return "GMF: " + fmtNum(hz, 2) + " Hz (" + fmtNum(hz * 60, 0) + " CPM)";
      });
      return;
    }
    if (type === "l10") {
      wireReadout(container, ["cv-l-c", "cv-l-p", "cv-l-exp", "cv-l-rpm", "cv-l-a1", "cv-l-askf"], "cv-l10-out",
        function (C, P, p, rpm, a1, aSKF) {
          if (isNaN(C) || isNaN(P) || P <= 0 || isNaN(p)) return "L_nm: —";
          const a1v = isNaN(a1) ? 1 : a1;
          const aSKFv = isNaN(aSKF) ? 1 : aSKF;
          const Lnm = a1v * aSKFv * Math.pow(C / P, p);
          let extra = "";
          if (!isNaN(rpm) && rpm > 0) {
            const horas = (Lnm * 1e6) / (60 * rpm);
            extra = " · " + fmtNum(horas, 0) + " horas de operação (a " + fmtNum(rpm, 0) + " RPM) · " + fmtNum(horas / 8760, 1) + " anos (operação 24/7)";
          }
          return "L_nm: " + fmtNum(Lnm, 2) + " milhões de revoluções" + extra;
        });
      // select não dispara "input" em todos os navegadores da mesma forma — garantir com "change" também
      const sel = container.querySelector("#cv-l-exp");
      if (sel) sel.addEventListener("change", function () { sel.dispatchEvent(new Event("input")); });
      return;
    }
  }

  function wireConv(container) {
    const select = container.querySelector("#lab-conv-type-select");
    const body = container.querySelector("#lab-conv-body");
    wireConvBody(body, convType);
    select.addEventListener("change", function () {
      convType = select.value;
      body.innerHTML = renderConvBody(convType);
      wireConvBody(body, convType);
    });
  }

  function wireNotes(container, id) {
    const area = container.querySelector("#lab-notes-area");
    const status = container.querySelector("#lab-notes-status");
    const saveBtn = container.querySelector("#lab-notes-save");
    saveBtn.addEventListener("click", function () {
      saveNotes(id, area.value);
      status.textContent = "✅ Salvo";
      setTimeout(() => { status.textContent = ""; }, 1800);
    });
    let debounce;
    area.addEventListener("input", function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () { saveNotes(id, area.value); status.textContent = "✅ Salvo automaticamente"; setTimeout(() => { status.textContent = ""; }, 1500); }, 900);
    });
  }

  function wireDraw(container, id) {
    const canvas = container.querySelector("#lab-draw-canvas");
    const status = container.querySelector("#lab-draw-status");
    drawCtx = canvas.getContext("2d");
    drawCtx.lineCap = "round";
    drawCtx.lineJoin = "round";

    const saved = loadDrawing(id);
    if (saved) {
      const img = new Image();
      img.onload = function () { drawCtx.drawImage(img, 0, 0); };
      img.src = saved;
    }

    function posFromEvent(ev) {
      const rect = canvas.getBoundingClientRect();
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const clientY = ev.touches ? ev.touches[0].clientY : ev.clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
    }
    function start(ev) {
      drawing = true;
      lastPt = posFromEvent(ev);
      if (ev.preventDefault) ev.preventDefault();
    }
    function move(ev) {
      if (!drawing) return;
      const pt = posFromEvent(ev);
      drawCtx.strokeStyle = penColor;
      drawCtx.lineWidth = penSize;
      drawCtx.beginPath();
      drawCtx.moveTo(lastPt.x, lastPt.y);
      drawCtx.lineTo(pt.x, pt.y);
      drawCtx.stroke();
      lastPt = pt;
      if (ev.preventDefault) ev.preventDefault();
    }
    function end() { drawing = false; }

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mouseleave", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);

    container.querySelectorAll(".lab-color-swatch").forEach((sw) => {
      sw.addEventListener("click", function () { penColor = sw.getAttribute("data-color"); });
    });
    container.querySelector("#lab-pen-size").addEventListener("input", function (ev) { penSize = parseInt(ev.target.value, 10); });
    container.querySelector("#lab-draw-undo").addEventListener("click", function () {
      drawCtx.clearRect(0, 0, canvas.width, canvas.height);
      saveDrawing(id, "");
    });
    container.querySelector("#lab-draw-save").addEventListener("click", function () {
      saveDrawing(id, canvas.toDataURL("image/png"));
      status.textContent = "✅ Rascunho salvo";
      setTimeout(() => { status.textContent = ""; }, 1800);
    });
  }

  function renderModal() {
    detachCalcKeydown(); // evita empilhar listeners a cada re-render/troca de aba
    const ov = ensureOverlay();
    const tabs = [
      { id: "calc", label: "🧮 Calculadora" },
      { id: "conv", label: "🔁 Conversores" },
      { id: "notes", label: "📝 Anotações" },
      { id: "draw", label: "✏️ Rascunho" },
    ];
    let tabsHtml = "";
    tabs.forEach((t) => {
      tabsHtml += "<button class='lab-tab" + (activeTab === t.id ? " active" : "") + "' data-tab='" + t.id + "'>" + t.label + "</button>";
    });
    let bodyHtml = "";
    if (activeTab === "calc") bodyHtml = renderCalcTab();
    else if (activeTab === "conv") bodyHtml = renderConvTab();
    else if (activeTab === "notes") bodyHtml = renderNotesTab(activeModuleId);
    else bodyHtml = renderDrawTab();

    ov.innerHTML =
      "<div class='lab-modal'>" +
      "<div class='lab-modal-header'>" +
      "<h3>🧪 Laboratório</h3>" +
      "<button class='lab-close-btn' id='lab-close-btn' aria-label='Fechar'>✕</button>" +
      "</div>" +
      "<div class='lab-tabs'>" + tabsHtml + "</div>" +
      "<div class='lab-modal-body'>" + bodyHtml + "</div>" +
      "</div>";

    ov.querySelector("#lab-close-btn").addEventListener("click", window.closeLab);
    ov.querySelectorAll(".lab-tab").forEach((btn) => {
      btn.addEventListener("click", function () {
        activeTab = btn.getAttribute("data-tab");
        renderModal();
      });
    });
    if (activeTab === "calc") wireCalc(ov);
    else if (activeTab === "conv") wireConv(ov);
    else if (activeTab === "notes") wireNotes(ov, activeModuleId);
    else wireDraw(ov, activeModuleId);
  }

  window.openLab = function (moduleId) {
    activeModuleId = moduleId || "geral";
    activeTab = "calc";
    calcExpr = "";
    const ov = ensureOverlay();
    ov.classList.add("open");
    renderModal();
  };

  window.closeLab = function () {
    detachCalcKeydown();
    const ov = document.getElementById("lab-overlay");
    if (ov) ov.classList.remove("open");
  };
})();
