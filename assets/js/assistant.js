/* =========================================================
   assets/js/assistant.js — Calculadora de Diagnóstico

   NÃO usa IA e NÃO faz nenhuma requisição de rede. Roda inteiramente no
   navegador, offline, sem custo de espécie alguma.

   Duas camadas, ambas determinísticas:

   1) CÁLCULOS (data/diag_engine.js) — zona de severidade ISO 10816,
      frequências de defeito de rolamento (BPFO/BPFI/BSF/FTF), frequência de
      engrenamento (GMF) e frequência de correia. Os limites das tabelas ISO
      reproduzem os valores do Módulo 4, para que calculadora e material
      didático nunca discordem.

   2) PARECER AUTOMÁTICO — redige um texto de laudo a partir desses cálculos,
      por regras derivadas da tabela de diagnóstico SKF. É redação por regra
      fixa, não é modelo de linguagem.
   ========================================================= */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
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
    h += "<h1>🧮 Calculadora de Diagnóstico</h1>";
    h += '<p class="asst-sub">Preencha o que você mediu em campo. A calculadora classifica a severidade pela ' +
         "ISO 10816, calcula as frequências de defeito a partir da geometria e redige um parecer com as hipóteses " +
         "mais compatíveis, segundo a tabela SKF. Roda inteiramente no seu navegador — funciona offline e não " +
         "depende de nenhum serviço externo.</p>";
    h += "</header>";

    h += '<form id="asst-form" onsubmit="return false">';

    h += '<fieldset class="asst-fs"><legend>1. Equipamento</legend><div class="asst-grid">';
    h += fld("asst-maquina", "Tipo de máquina", '<input id="asst-maquina" type="text" placeholder="Ex.: bomba centrífuga, ventilador, redutor" />');
    h += fld("asst-rpm", "Rotação (rpm) *", '<input id="asst-rpm" type="number" step="any" placeholder="1780" />');
    h += fld("asst-potencia", "Potência (kW)", '<input id="asst-potencia" type="number" step="any" placeholder="75" />');
    h += fld("asst-iso", "Critério ISO aplicável", '<select id="asst-iso"><option value="">— não avaliar por norma —</option>' + isoOpts + "</select>");
    h += "</div></fieldset>";

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

    h += '<fieldset class="asst-fs"><legend>4. Geometria (opcional — permite calcular as frequências de defeito)</legend><div class="asst-grid">';
    h += fld("asst-nb", "Rolamento: nº de elementos (N)", '<input id="asst-nb" type="number" step="any" placeholder="9" />');
    h += fld("asst-dd", "Diâmetro do elemento d (mm)", '<input id="asst-dd" type="number" step="any" placeholder="12" />');
    h += fld("asst-dp", "Diâmetro primitivo p (mm)", '<input id="asst-dp" type="number" step="any" placeholder="60" />');
    h += fld("asst-beta", "Ângulo de contato β (graus)", '<input id="asst-beta" type="number" step="any" placeholder="0" />');
    h += fld("asst-dentes", "Engrenagem: nº de dentes", '<input id="asst-dentes" type="number" step="any" placeholder="33" />');
    h += fld("asst-polia", "Correia: diâmetro da polia (mm)", '<input id="asst-polia" type="number" step="any" placeholder="200" />');
    h += fld("asst-correia", "Correia: comprimento (mm)", '<input id="asst-correia" type="number" step="any" placeholder="1400" />');
    h += "</div></fieldset>";

    h += '<div class="asst-actions">';
    h += '<button type="button" class="asst-btn asst-btn-main" onclick="asstAnalyze()">Calcular</button>';
    h += '<button type="button" class="asst-btn" onclick="asstReset()">Limpar</button>';
    h += "</div>";
    h += "</form>";

    h += '<div id="asst-result"></div>';
    h += '<p class="asst-disclaimer">Ferramenta de apoio ao raciocínio, não um laudo. Os cálculos de norma e de ' +
         "frequência são determinísticos e podem ser conferidos à mão; o parecer segue regras fixas e não cobre " +
         "todos os casos. A decisão final é sempre do analista responsável.</p>";
    h += "</div>";
    return h;
  }

  function fld(id, label, control) {
    return '<div class="asst-fld"><label for="' + esc(id) + '">' + esc(label) + "</label>" + control + "</div>";
  }
  function chk(id, label) {
    return '<label class="asst-chk"><input type="checkbox" id="' + esc(id) + '" /> <span>' + esc(label) + "</span></label>";
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
      beltLength: num("asst-correia")
    };
  }

  // --------------------------------------------------------- render cálculos
  function factsHtml(facts, input) {
    var h = '<section class="asst-facts"><h2>📐 Cálculos</h2>';
    h += '<p class="asst-facts-sub">Feitos no seu navegador, pelas mesmas fórmulas e tabelas dos Módulos 4, 7, 8 e 9. ' +
         "Podem ser conferidos à mão.</p>";

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

  // ------------------------------------------------- parecer por regras
  function parecerHtml(facts, input) {
    var p = [];

    if (facts.iso) {
      var z = facts.iso;
      var urg = { A: "Nenhuma ação necessária.", B: "Operação normal, mantenha a rota de monitoramento.",
        C: "Programe intervenção na próxima parada; aumente a frequência de medição.",
        D: "Ação corretiva imediata; avalie parar a máquina." }[z.zone];
      p.push("A máquina está na <strong>zona " + z.zone + "</strong> pelo critério " + esc(z.table) +
        ". " + esc(z.meaning) + " <strong>" + esc(urg) + "</strong>");
    }

    var top = (facts.rules || [])[0];
    if (top) {
      p.push("A hipótese mais compatível com os sintomas informados é <strong>" + esc(top.hypothesis) +
        "</strong>. " + esc(top.why));
      if (facts.rules.length > 1) {
        p.push("Também merecem verificação: " + facts.rules.slice(1).map(function (r) {
          return "<strong>" + esc(r.hypothesis) + "</strong>";
        }).join(", ") + ".");
      }
    }

    if (facts.bearing && input.dominantOrder) {
      var o = Number(input.dominantOrder);
      var match = null;
      ["BPFO", "BPFI", "BSF", "FTF"].forEach(function (k) {
        if (Math.abs(facts.bearing[k].order - o) <= 0.15) match = k;
      });
      if (match) {
        p.push("A ordem dominante observada (" + o + "×) coincide com o <strong>" + match +
          "</strong> calculado pela geometria do rolamento (" + facts.bearing[match].order +
          "×). Essa é uma correspondência forte: confirme no espectro de envelope se há harmônicos dessa " +
          "frequência e, no caso do BPFI, bandas laterais espaçadas de 1× RPM.");
      } else {
        p.push("A ordem dominante observada (" + o + "×) <strong>não</strong> coincide com nenhuma das " +
          "frequências de defeito calculadas. Vale reconferir a geometria do rolamento; se ela estiver " +
          "correta, considere causas que não seguem as frequências de defeito, como falso brinelamento " +
          "(Módulo 22) ou origem elétrica (Módulo 10).");
      }
    }

    if (input.temp && input.temp >= 80) {
      p.push("A temperatura de " + input.temp + " °C é alta. Se não houver defeito localizado no envelope, " +
        "suspeite de pré-carga por folga interna errada ou ajuste excessivo (Módulo 24) antes de trocar o rolamento.");
    }

    var faltando = [];
    if (!input.direction) faltando.push("a direção predominante da vibração");
    if (!input.phase) faltando.push("a relação de fase entre os mancais");
    if (!input.dominantOrder && !input.peakHz) faltando.push("a ordem ou a frequência do pico dominante");
    if (!input.isoTable) faltando.push("o critério ISO aplicável à máquina");
    if (faltando.length) {
      p.push("<em>Para fechar melhor o diagnóstico, faltou informar: " + esc(faltando.join(", ")) + ".</em>");
    }

    if (!p.length) return "";
    return '<section class="asst-parecer"><h2>📝 Parecer</h2>' +
      '<p class="asst-facts-sub">Redigido por regras a partir dos cálculos acima.</p>' +
      p.map(function (x) { return "<p>" + x + "</p>"; }).join("") + "</section>";
  }

  // ---------------------------------------------------------------- ações
  window.asstAnalyze = function () {
    var input = readInput();
    if (!input.rpm) {
      document.getElementById("asst-result").innerHTML =
        '<div class="asst-err">Informe pelo menos a rotação da máquina (rpm) — sem ela não dá para converter frequências em ordens.</div>';
      return;
    }
    var facts = window.DIAG_ENGINE.buildFacts(input);
    var box = document.getElementById("asst-result");
    box.innerHTML = factsHtml(facts, input) + parecerHtml(facts, input);
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  window.asstReset = function () {
    var f = document.getElementById("asst-form");
    if (f) f.reset();
    var r = document.getElementById("asst-result");
    if (r) r.innerHTML = "";
  };

  window.renderAssistantPage = function () {
    var el = document.getElementById("content");
    if (!el) return;
    el.innerHTML = formHtml();
    if (window.revealOnScroll) window.revealOnScroll();
  };

  // exposto para os testes
  window.__asstInternals = { parecerHtml: parecerHtml, factsHtml: factsHtml };
})();
