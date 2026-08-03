/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/acronyms.js — dicionário de siglas técnicas + tooltip ao passar o mouse
   Usado por app.js, practice.js e refpage.js no lugar de escapeHtml() em
   trechos de texto "prosa" (nunca dentro de SVG ou de atributos HTML).
   ========================================================= */
(function () {
  "use strict";

  // Termo -> definição (reaproveita, sempre que possível, a redação exata do
  // Glossário Técnico do curso — Módulo 17/22 — para manter consistência).
  const ACR = {
    "BPFO": "Ball Pass Frequency Outer race — frequência de passagem dos elementos rolantes pela pista EXTERNA do rolamento.",
    "BPFI": "Ball Pass Frequency Inner race — frequência de passagem dos elementos rolantes pela pista INTERNA do rolamento.",
    "BPF": "Ball/Blade Pass Frequency — frequência de passagem de elementos rolantes (rolamento) ou de pás (ventiladores/bombas), conforme o contexto.",
    "BSF": "Ball Spin Frequency — frequência de giro do próprio elemento rolante em torno do seu eixo.",
    "FTF": "Fundamental Train Frequency — frequência fundamental da gaiola do rolamento (velocidade de translação do conjunto de elementos rolantes).",
    "GMF": "Gear Mesh Frequency — frequência de engrenamento = número de dentes × rotação do respectivo eixo.",
    "RMS": "Root Mean Square — valor eficaz; medida de amplitude que pondera a energia do sinal ao longo do tempo (para uma senoide pura, RMS = pico ÷ √2).",
    "FMAX": "Frequência máxima analisada em um espectro — define a resolução e o alcance da FFT.",
    "FFT": "Fast Fourier Transform — Transformada Rápida de Fourier; algoritmo que converte um sinal no tempo em um espectro de frequência.",
    "ISO": "International Organization for Standardization — organização internacional de normalização (ex.: ISO 10816, ISO 15243).",
    "NPSH": "Net Positive Suction Head — carga líquida positiva de sucção; parâmetro que determina se uma bomba vai cavitar.",
    "MCSA": "Motor Current Signature Analysis — análise da assinatura de corrente elétrica do motor, usada para diagnosticar problemas mecânicos e elétricos.",
    "BART": "Bearing Analysis Reporting Tool — ferramenta de software da SKF (com IA) para apoiar relatórios de inspeção e análise de falhas de rolamentos.",
    "WEC": "White Etching Crack — trinca de gravação branca; rede de microtrincas subsuperficiais associada à fadiga prematura de rolamentos.",
    "HRC": "Hardness Rockwell C — escala de dureza Rockwell C, usada para medir a dureza do aço dos rolamentos.",
    "SCADA": "Supervisory Control and Data Acquisition — sistema de supervisão, controle e aquisição de dados de um processo industrial.",
    "XRD": "X-Ray Diffraction — difração de raios-X; técnica de laboratório usada para medir austenita retida e tensões residuais no aço.",
    "EP": "Extreme Pressure — aditivo de extrema pressão usado em lubrificantes para reduzir o desgaste sob cargas elevadas.",
    "HFD": "High Frequency Detection — parâmetro de altíssima frequência usado para detectar defeitos de rolamento no estágio mais inicial (submicroscópico).",
    "CPM": "Ciclos Por Minuto — unidade de frequência equivalente a RPM, usada às vezes no lugar de Hz.",
    "RPM": "Rotações Por Minuto — unidade de velocidade de rotação do eixo.",
    "TRIP": "Nível de vibração que, se ultrapassado, exige parada imediata da máquina para evitar dano.",
    "VFD": "Variable Frequency Drive — conversor/inversor de frequência usado para variar a velocidade de motores elétricos.",
    "MCC": "Motor Control Center — centro de controle de motores (painel elétrico que agrupa os acionamentos de vários motores).",
    "OEM": "Original Equipment Manufacturer — fabricante original do equipamento.",
  };

  const KEYS = Object.keys(ACR).sort((a, b) => b.length - a.length);
  const pattern = new RegExp("\\b(" + KEYS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "g");

  function escapeHtmlBasic(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function escapeAttr(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // decorateAcronyms(text): escapa o texto (igual ao escapeHtml já usado no
  // site) e, além disso, envolve cada sigla conhecida com um <span> que mostra
  // a definição num tooltip ao passar o mouse (ou ao focar, via teclado).
  // Uso: exatamente no lugar de escapeHtml(), só em texto "prosa" (nunca
  // dentro de SVG ou de valores de atributos HTML).
  window.decorateAcronyms = function (text) {
    const escaped = escapeHtmlBasic(text);
    return escaped.replace(pattern, function (match) {
      const def = ACR[match];
      if (!def) return match;
      return (
        '<span class="acr" tabindex="0">' + match +
        '<span class="acr-tip" role="tooltip">' + escapeAttr(def) + "</span></span>"
      );
    });
  };
})();
