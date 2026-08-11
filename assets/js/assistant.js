/* =========================================================
   assets/js/assistant.js — Assistente de Diagnóstico com IA

   Arquitetura em duas camadas:

   1) MOTOR DETERMINÍSTICO (data/diag_engine.js) — roda sempre, sem chave e
      sem internet. Calcula zona ISO 10816, frequências de defeito de
      rolamento, GMF, frequência de correia e uma triagem de hipóteses pelas
      regras da tabela SKF. É a camada em que confiamos para número e norma.

   2) INTERPRETAÇÃO POR IA (opcional) — envia os dados do formulário JUNTO com
      os resultados já calculados e com os trechos pertinentes do curso para a
      API da Anthropic, e recebe hipóteses ordenadas, evidência a favor e
      contra, o que medir em seguida e a ação recomendada.

   A chamada é feita direto do navegador com o cabeçalho oficial
   "anthropic-dangerous-direct-browser-access". A chave é do próprio usuário,
   fica apenas no localStorage do navegador dele e vai somente para
   api.anthropic.com — nenhum servidor deste projeto a recebe.
   ========================================================= */
(function () {
  "use strict";

  var KEY_STORAGE = "vibcourse_anthropic_api_key";
  var MODEL_STORAGE = "vibcourse_anthropic_model";
  var API_URL = "https://api.anthropic.com/v1/messages";
  var MODELS_URL = "https://api.anthropic.com/v1/models";
  var API_VERSION = "2023-06-01";

  // Lista de reserva, usada se a consulta a /v1/models falhar.
  var FALLBACK_MODELS = [
    { id: "claude-sonnet-5", label: "Claude Sonnet 5 — equilíbrio entre custo e qualidade" },
    { id: "claude-opus-5", label: "Claude Opus 5 — máxima capacidade de raciocínio" },
    { id: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5 — mais rápido e barato" }
  ];
  var DEFAULT_MODEL = "claude-sonnet-5";

  var lastFacts = null;
  var lastInput = null;
  var busy = false;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function getKey() { try { return localStorage.getItem(KEY_STORAGE) || ""; } catch (e) { return ""; } }
  function setKey(v) { try { v ? localStorage.setItem(KEY_STORAGE, v) : localStorage.removeItem(KEY_STORAGE); } catch (e) {} }
  function getModel() { try { return localStorage.getItem(MODEL_STORAGE) || DEFAULT_MODEL; } catch (e) { return DEFAULT_MODEL; } }
  function setModel(v) { try { localStorage.setItem(MODEL_STORAGE, v); } catch (e) {} }
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
  function num(id) { var v = val(id); return v === "" ? null : Number(v.replace(",", ".")); }
  function checked(id) { var el = document.getElementById(id); return !!(el && el.checked); }

  // ------------------------------------------------------------- formulário
  function formHtml() {
    var isoOpts = "";
    var tables = (window.DIAG_ENGINE && window.DIAG_ENGINE.ISO_TABLES) || {};
    Object.keys(tables).forEach(function (k) {
      isoOpts += '<option value="' + esc(k) + '">' + esc(tables[k].label) + "</option>";
    });

    var h = '<div class="asst-page">';
    h += '<header class="asst-header">';
    h += "<h1>🤖 Assistente de Diagnóstico</h1>";
    h += '<p class="asst-sub">Preencha o que você mediu em campo. O assistente calcula a zona ISO e as frequências de ' +
         "defeito na hora, e — se você configurar uma chave da Anthropic — usa o Claude para interpretar o conjunto, " +
         "ancorado nos módulos deste curso.</p>";
    h += "</header>";

    h += '<form id="asst-form" onsubmit="return false">';

    // --- equipamento
    h += '<fieldset class="asst-fs"><legend>1. Equipamento</legend><div class="asst-grid">';
    h += fld("asst-maquina", "Tipo de máquina", '<input id="asst-maquina" type="text" placeholder="Ex.: bomba centrífuga, ventilador, redutor" />');
    h += fld("asst-rpm", "Rotação (rpm) *", '<input id="asst-rpm" type="number" step="any" placeholder="1780" />');
    h += fld("asst-potencia", "Potência (kW)", '<input id="asst-potencia" type="number" step="any" placeholder="75" />');
    h += fld("asst-iso", "Critério ISO aplicável", '<select id="asst-iso"><option value="">— não avaliar por norma —</option>' + isoOpts + "</select>");
    h += "</div></fieldset>";

    // --- medição
    h += '<fieldset class="asst-fs"><legend>2. Leituras do coletor</legend><div class="asst-grid">';
    h += fld("asst-vel", "Velocidade (mm/s RMS)", '<input id="asst-vel" type="number" step="any" placeholder="4,8" />');
    h += fld("asst-acel", "Aceleração (g RMS)", '<input id="asst-acel" type="number" step="any" placeholder="1,5" />');
    h += fld("asst-env", "Envelope (gE Pk-Pk)", '<input id="asst-env" type="number" step="any" placeholder="2,2" />');
    h += fld("asst-temp", "Temperatura do mancal (°C)", '<input id="asst-temp" type="number" step="any" placeholder="62" />');
    h += fld("asst-ponto", "Ponto de medição", '<input id="asst-ponto" type="text" placeholder="Ex.: mancal LA do motor" />');
    h += fld("asst-dir", "Direção predominante",
      '<select id="asst-dir"><option value="">— não informado —</option>' +
      '<option value="radial-h">Radial horizontal</option>' +
      '<option value="radial-v">Radial vertical</option>' +
      '<option value="axial">Axial</option></select>');
    h += "</div></fieldset>";

    // --- espectro
    h += '<fieldset class="asst-fs"><legend>3. O que o espectro mostra</legend><div class="asst-grid">';
    h += fld("asst-ordem", "Ordem dominante (× RPM)", '<input id="asst-ordem" type="number" step="any" placeholder="2" />');
    h += fld("asst-pico", "…ou frequência do pico (Hz)", '<input id="asst-pico" type="number" step="any" placeholder="59,3" />');
    h += fld("asst-fase", "Relação de fase entre mancais",
      '<select id="asst-fase"><option value="">— não medida —</option>' +
      '<option value="em-fase">Em fase (iguais)</option>' +
      '<option value="180">Opostas (180°)</option>' +
      '<option value="diferente">Diferentes / instáveis</option></select>');
    h += "</div>";
    h += '<div class="asst-checks">';
    h += chk("asst-harm", "Série de harmônicos de 1× (2×, 3×, 4×…)");
    h += chk("asst-side", "Bandas laterais em torno de um pico");
    h += chk("asst-envhigh", "Envelope elevado / carpete alto");
    h += chk("asst-random", "Ruído aleatório em alta frequência");
    h += chk("asst-elet", "Componente fixa em 120 Hz ou 360 Hz");
    h += "</div></fieldset>";

    // --- geometria opcional
    h += '<fieldset class="asst-fs"><legend>4. Geometria (opcional — permite calcular as frequências de defeito)</legend><div class="asst-grid">';
    h += fld("asst-nb", "Rolamento: nº de elementos (N)", '<input id="asst-nb" type="number" step="any" placeholder="9" />');
    h += fld("asst-dd", "Diâmetro do elemento d (mm)", '<input id="asst-dd" type="number" step="any" placeholder="12" />');
    h += fld("asst-dp", "Diâmetro primitivo p (mm)", '<input id="asst-dp" type="number" step="any" placeholder="60" />');
    h += fld("asst-beta", "Ângulo de contato β (graus)", '<input id="asst-beta" type="number" step="any" placeholder="0" />');
    h += fld("asst-dentes", "Engrenagem: nº de dentes", '<input id="asst-dentes" type="number" step="any" placeholder="33" />');
    h += fld("asst-polia", "Correia: diâmetro da polia (mm)", '<input id="asst-polia" type="number" step="any" placeholder="200" />');
    h += fld("asst-correia", "Correia: comprimento (mm)", '<input id="asst-correia" type="number" step="any" placeholder="1400" />');
    h += "</div></fieldset>";

    // --- contexto livre
    h += '<fieldset class="asst-fs"><legend>5. Histórico e contexto</legend>';
    h += '<textarea id="asst-contexto" rows="3" placeholder="Tendência dos últimos meses, intervenções recentes, ruído, o que o operador relata…"></textarea>';
    h += "</fieldset>";

    h += '<div class="asst-actions">';
    h += '<button type="button" class="asst-btn asst-btn-main" onclick="asstAnalyze()">Analisar</button>';
    h += '<button type="button" class="asst-btn" onclick="asstReset()">Limpar</button>';
    h += "</div>";
    h += "</form>";

    h += '<div id="asst-result"></div>';
    h += keyPanelHtml();
    h += '<p class="asst-disclaimer">O assistente é uma ferramenta de apoio ao raciocínio, não um laudo. ' +
         "Os cálculos de norma e de frequência são determinísticos e conferíveis; a interpretação por IA pode errar. " +
         "A decisão final é sempre do analista responsável.</p>";
    h += "</div>";
    return h;
  }

  function fld(id, label, control) {
    return '<div class="asst-fld"><label for="' + esc(id) + '">' + esc(label) + "</label>" + control + "</div>";
  }
  function chk(id, label) {
    return '<label class="asst-chk"><input type="checkbox" id="' + esc(id) + '" /> <span>' + esc(label) + "</span></label>";
  }

  function keyPanelHtml() {
    var has = !!getKey();
    var h = '<section class="asst-key" id="asst-key-panel">';
    h += "<h3>🔑 Interpretação por IA (opcional)</h3>";
    if (has) {
      h += '<p class="asst-key-ok">Chave configurada neste navegador. A interpretação por IA está ativa.</p>';
      h += '<div class="asst-key-row">';
      h += '<label for="asst-model">Modelo</label><select id="asst-model" onchange="asstSetModel(this.value)"></select>';
      h += '<button type="button" class="asst-btn asst-btn-sm" onclick="asstClearKey()">Remover chave</button>';
      h += "</div>";
    } else {
      h += "<p>Sem chave, o assistente continua funcionando: a zona ISO, as frequências de defeito e a triagem " +
           "por regras são calculadas no seu navegador. A chave só é necessária para a camada de interpretação.</p>";
      h += '<div class="asst-key-row">';
      h += '<input id="asst-key-input" type="password" placeholder="Cole aqui sua chave da Anthropic (sk-ant-…)" autocomplete="off" />';
      h += '<button type="button" class="asst-btn asst-btn-sm" onclick="asstSaveKey()">Salvar chave</button>';
      h += "</div>";
      h += '<p class="asst-key-note">A chave é gravada apenas no localStorage deste navegador e enviada somente para ' +
           "api.anthropic.com. Nenhum servidor deste site a recebe. O consumo é cobrado na sua própria conta Anthropic. " +
           'Você pode criar uma chave no <a href="https://console.anthropic.com" target="_blank" rel="noopener">Console da Anthropic ↗</a>.</p>';
    }
    h += "</section>";
    return h;
  }

  // ------------------------------------------------------------ coleta form
  function readInput() {
    return {
      maquina: val("asst-maquina"),
      rpm: num("asst-rpm"),
      potencia: num("asst-potencia"),
      isoTable: val("asst-iso"),
      velRms: num("asst-vel"),
      acel: num("asst-acel"),
      envelope: num("asst-env"),
      temp: num("asst-temp"),
      ponto: val("asst-ponto"),
      direction: val("asst-dir"),
      dominantOrder: num("asst-ordem"),
      peakHz: num("asst-pico"),
      phase: val("asst-fase"),
      harmonics: checked("asst-harm"),
      sidebands: checked("asst-side"),
      envelopeHigh: checked("asst-envhigh"),
      randomHF: checked("asst-random"),
      electricalHz: checked("asst-elet"),
      balls: num("asst-nb"),
      ballDia: num("asst-dd"),
      pitchDia: num("asst-dp"),
      contactAngle: num("asst-beta") || 0,
      teeth: num("asst-dentes"),
      pulleyDia: num("asst-polia"),
      beltLength: num("asst-correia"),
      contexto: val("asst-contexto")
    };
  }

  // --------------------------------------------------------- render cálculos
  function factsHtml(facts, input) {
    var h = '<section class="asst-facts"><h2>📐 Cálculos (determinísticos)</h2>';
    h += '<p class="asst-facts-sub">Feitos no seu navegador, pelas mesmas fórmulas e tabelas dos Módulos 4, 7, 8 e 9. ' +
         "Não dependem de IA e podem ser conferidos à mão.</p>";

    if (facts.iso) {
      var z = facts.iso;
      h += '<div class="asst-card asst-zone asst-zone-' + z.zone + '">';
      h += '<div class="asst-zone-badge">Zona ' + z.zone + "</div>";
      h += "<div><strong>" + esc(z.value) + " mm/s RMS</strong> — " + esc(z.meaning) +
           '<div class="asst-card-note">' + esc(z.table) +
           " · limites A/B " + z.limits["A/B"] + " · B/C " + z.limits["B/C"] + " · C/D " + z.limits["C/D"] + " mm/s" +
           ' <button class="asst-mod" onclick="goTo(\'m4\')">Módulo 4 ↗</button></div></div>';
      h += "</div>";
    }

    if (facts.bearing) {
      var b = facts.bearing;
      h += '<div class="asst-card"><h4>Frequências de defeito do rolamento <button class="asst-mod" onclick="goTo(\'m7\')">Módulo 7 ↗</button></h4>';
      h += '<table class="asst-table"><thead><tr><th>Frequência</th><th>Hz</th><th>Ordem (× RPM)</th></tr></thead><tbody>';
      ["BPFO", "BPFI", "BSF", "FTF"].forEach(function (k) {
        h += "<tr><td>" + k + "</td><td>" + b[k].hz + "</td><td>" + b[k].order + "×</td></tr>";
      });
      h += "</tbody></table>";
      h += '<p class="asst-card-note">Rotação do eixo: ' + b.shaftHz + " Hz</p></div>";
    }

    if (facts.gmf) {
      h += '<div class="asst-card"><h4>Frequência de engrenamento (GMF) <button class="asst-mod" onclick="goTo(\'m8\')">Módulo 8 ↗</button></h4>' +
           "<p>GMF = <strong>" + facts.gmf.hz + " Hz</strong> (" + facts.gmf.order + "× RPM)</p></div>";
    }
    if (facts.belt) {
      h += '<div class="asst-card"><h4>Frequência da correia <button class="asst-mod" onclick="goTo(\'m9\')">Módulo 9 ↗</button></h4>' +
           "<p>F correia = <strong>" + facts.belt.hz + " Hz</strong> (" + facts.belt.order + "× RPM)</p></div>";
    }
    if (facts.peakOrder) {
      h += '<div class="asst-card"><h4>Conversão do pico informado</h4><p>' + input.peakHz +
           " Hz a " + input.rpm + " rpm = <strong>" + facts.peakOrder + "× RPM</strong></p></div>";
    }

    if (facts.rules && facts.rules.length) {
      h += '<div class="asst-card"><h4>Triagem por regras (tabela SKF)</h4><ol class="asst-rules">';
      facts.rules.forEach(function (r) {
        h += "<li><strong>" + esc(r.hypothesis) + "</strong> — " + esc(r.why) +
             ' <button class="asst-mod" onclick="goTo(\'' + esc(r.modulo) + '\')">ver módulo ↗</button></li>';
      });
      h += "</ol></div>";
    } else {
      h += '<div class="asst-card"><p class="asst-card-note">Nenhuma regra disparou com os dados informados. ' +
           "Preencher a ordem dominante, a direção e a relação de fase costuma ser o que mais ajuda.</p></div>";
    }

    h += "</section>";
    return h;
  }

  // ----------------------------------------------- contexto do curso (RAG)
  // Seleciona só os trechos pertinentes para não estourar o prompt.
  function courseContext(facts, input) {
    var parts = [];
    var wanted = {};
    (facts.rules || []).forEach(function (r) { wanted[r.modulo] = true; });
    if (facts.iso) wanted.m4 = true;
    if (facts.bearing) wanted.m7 = true;
    if (facts.gmf) wanted.m8 = true;
    if (facts.belt) wanted.m9 = true;

    var all = (window.COURSE || []).concat(window.LUBE_COURSE || []);
    Object.keys(wanted).forEach(function (id) {
      var m = all.find(function (x) { return x.id === id; });
      if (!m) return;
      var resumo = (m.summary || []).join(" ");
      parts.push("### " + m.title + "\n" + (resumo || "").slice(0, 900));
    });

    // Tabela de diagnóstico: seções relacionadas às hipóteses levantadas.
    if (window.DIAG_TABLE) {
      var secs = window.DIAG_TABLE.filter(function (s) {
        return (s.modules || []).some(function (mm) { return wanted[mm.id]; });
      });
      secs.slice(0, 5).forEach(function (s) {
        var txt = "### Tabela SKF — " + s.title + "\n" + (s.summary || "") + "\n";
        (s.items || []).forEach(function (it) {
          txt += "- " + it.title + ": " + (it.bullets || []).join(" ") + "\n";
        });
        parts.push(txt.slice(0, 1200));
      });
    }
    return parts.join("\n\n");
  }

  function buildPrompt(facts, input) {
    var ctx = courseContext(facts, input);
    var p = "Você é um instrutor de análise de vibração ajudando um engenheiro de confiabilidade a interpretar uma medição de campo.\n\n";
    p += "REGRAS IMPORTANTES:\n";
    p += "- Os cálculos abaixo (zona ISO, BPFO/BPFI/BSF/FTF, GMF, frequência de correia) JÁ FORAM FEITOS e estão corretos. NÃO os recalcule nem os contradiga. Use-os como fato.\n";
    p += "- Fundamente cada hipótese no material do curso fornecido, citando o módulo correspondente.\n";
    p += "- Se os dados forem insuficientes para concluir, diga isso claramente e indique o que falta medir.\n";
    p += "- Escreva em português do Brasil, de forma direta e técnica. Não invente números que não foram informados.\n\n";
    p += "DADOS INFORMADOS PELO ANALISTA:\n" + JSON.stringify(input, null, 1) + "\n\n";
    p += "CÁLCULOS JÁ REALIZADOS (determinísticos, confiáveis):\n" + JSON.stringify(facts, null, 1) + "\n\n";
    p += "TRECHOS DO CURSO PERTINENTES:\n" + ctx + "\n\n";
    p += "Responda EXATAMENTE nesta estrutura, em markdown:\n\n";
    p += "## Leitura da condição\nUm parágrafo curto situando a severidade e o quadro geral.\n\n";
    p += "## Hipóteses, da mais provável para a menos\nPara cada uma: nome, grau de confiança (alta/média/baixa), evidência A FAVOR, evidência CONTRA e o módulo do curso que a explica.\n\n";
    p += "## O que medir em seguida\nLista objetiva de medições ou verificações que confirmam ou descartam a hipótese principal.\n\n";
    p += "## Ação recomendada\nO que fazer, com que urgência, e o que NÃO fazer sem antes confirmar.\n";
    return p;
  }

  // ------------------------------------------------------------- chamada API
  function callClaude(prompt, onDone, onError) {
    var key = getKey();
    if (!key) { onError("no-key"); return; }
    fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": API_VERSION,
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: getModel(),
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }]
      })
    })
      .then(function (r) {
        return r.json().then(function (data) { return { ok: r.ok, status: r.status, data: data }; });
      })
      .then(function (res) {
        if (!res.ok) {
          var msg = (res.data && res.data.error && res.data.error.message) || ("Erro HTTP " + res.status);
          onError(msg);
          return;
        }
        var txt = "";
        (res.data.content || []).forEach(function (b) { if (b.type === "text") txt += b.text; });
        onDone(txt || "(resposta vazia)");
      })
      .catch(function (e) { onError(e && e.message ? e.message : String(e)); });
  }

  // Markdown mínimo: títulos, negrito, listas e parágrafos.
  function mdToHtml(md) {
    var lines = String(md).split("\n");
    var out = "", inList = false;
    function inline(s) {
      return esc(s)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code>$1</code>");
    }
    lines.forEach(function (ln) {
      var t = ln.trim();
      if (/^#{1,6}\s/.test(t)) {
        if (inList) { out += "</ul>"; inList = false; }
        var lvl = t.match(/^#+/)[0].length;
        var tag = lvl <= 2 ? "h3" : "h4";
        out += "<" + tag + ">" + inline(t.replace(/^#+\s*/, "")) + "</" + tag + ">";
      } else if (/^[-*]\s+/.test(t) || /^\d+\.\s+/.test(t)) {
        if (!inList) { out += "<ul>"; inList = true; }
        out += "<li>" + inline(t.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")) + "</li>";
      } else if (t === "") {
        if (inList) { out += "</ul>"; inList = false; }
      } else {
        if (inList) { out += "</ul>"; inList = false; }
        out += "<p>" + inline(t) + "</p>";
      }
    });
    if (inList) out += "</ul>";
    return out;
  }

  // ---------------------------------------------------------------- ações
  window.asstAnalyze = function () {
    if (busy) return;
    var input = readInput();
    if (!input.rpm) {
      document.getElementById("asst-result").innerHTML =
        '<div class="asst-err">Informe pelo menos a rotação da máquina (rpm) — sem ela não dá para converter frequências em ordens.</div>';
      return;
    }
    var facts = window.DIAG_ENGINE.buildFacts(input);
    lastFacts = facts; lastInput = input;

    var box = document.getElementById("asst-result");
    box.innerHTML = factsHtml(facts, input);

    if (!getKey()) {
      box.innerHTML += '<section class="asst-ai asst-ai-off"><h2>🤖 Interpretação por IA</h2>' +
        "<p>Configure uma chave da Anthropic no painel abaixo para receber hipóteses ordenadas, evidências a favor e " +
        "contra, e a ação recomendada. Os cálculos acima já estão completos e não dependem disso.</p></section>";
      box.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    busy = true;
    box.innerHTML += '<section class="asst-ai" id="asst-ai"><h2>🤖 Interpretação por IA</h2>' +
      '<p class="asst-loading">Consultando o Claude…</p></section>';
    box.scrollIntoView({ behavior: "smooth", block: "start" });

    callClaude(buildPrompt(facts, input), function (txt) {
      busy = false;
      var el = document.getElementById("asst-ai");
      if (el) el.innerHTML = "<h2>🤖 Interpretação por IA</h2>" +
        '<div class="asst-ai-body">' + mdToHtml(txt) + "</div>" +
        '<p class="asst-ai-foot">Gerado por ' + esc(getModel()) +
        ". Confira sempre contra os cálculos determinísticos acima.</p>";
    }, function (err) {
      busy = false;
      var el = document.getElementById("asst-ai");
      var extra = "";
      if (/cors/i.test(err)) {
        extra = " Se o erro for de CORS, verifique se a sua organização na Anthropic permite acesso direto do navegador.";
      } else if (/authentication|invalid.*api|401/i.test(err)) {
        extra = " A chave parece inválida ou expirada — remova e cadastre novamente.";
      } else if (/credit|quota|429/i.test(err)) {
        extra = " Pode ser limite de uso ou saldo insuficiente na conta Anthropic.";
      }
      if (el) el.innerHTML = "<h2>🤖 Interpretação por IA</h2>" +
        '<div class="asst-err">Não foi possível obter a interpretação: ' + esc(err) + extra + "</div>" +
        "<p>Os cálculos determinísticos acima continuam válidos.</p>";
    });
  };

  window.asstReset = function () {
    var f = document.getElementById("asst-form");
    if (f) f.reset();
    var r = document.getElementById("asst-result");
    if (r) r.innerHTML = "";
    lastFacts = null; lastInput = null;
  };

  window.asstSaveKey = function () {
    var el = document.getElementById("asst-key-input");
    if (!el || !el.value.trim()) return;
    setKey(el.value.trim());
    el.value = "";
    var panel = document.getElementById("asst-key-panel");
    if (panel) panel.outerHTML = keyPanelHtml();
    loadModels();
  };

  window.asstClearKey = function () {
    setKey("");
    var panel = document.getElementById("asst-key-panel");
    if (panel) panel.outerHTML = keyPanelHtml();
  };

  window.asstSetModel = function (v) { setModel(v); };

  // Consulta /v1/models para montar a lista; cai na lista de reserva se falhar.
  function loadModels() {
    var sel = document.getElementById("asst-model");
    if (!sel) return;
    function fill(list) {
      sel.innerHTML = list.map(function (m) {
        return '<option value="' + esc(m.id) + '"' + (m.id === getModel() ? " selected" : "") + ">" +
               esc(m.label || m.id) + "</option>";
      }).join("");
    }
    fill(FALLBACK_MODELS);
    var key = getKey();
    if (!key) return;
    fetch(MODELS_URL + "?limit=20", {
      headers: {
        "x-api-key": key,
        "anthropic-version": API_VERSION,
        "anthropic-dangerous-direct-browser-access": "true"
      }
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.data || !d.data.length) return;
        fill(d.data.map(function (m) { return { id: m.id, label: m.display_name || m.id }; }));
      })
      .catch(function () { /* mantém a lista de reserva */ });
  }

  // ---------------------------------------------------------------- página
  window.renderAssistantPage = function () {
    var el = document.getElementById("content");
    if (!el) return;
    el.innerHTML = formHtml();
    loadModels();
    if (window.revealOnScroll) window.revealOnScroll();
  };

  // exposto para os testes
  window.__asstInternals = {
    buildPrompt: buildPrompt, mdToHtml: mdToHtml, courseContext: courseContext,
    API_URL: API_URL, API_VERSION: API_VERSION
  };
})();
