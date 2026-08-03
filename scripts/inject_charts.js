// scripts/inject_charts.js
// Passo de pós-processamento executado DEPOIS de scripts/build_site.js.
// Insere nós do tipo "chart" (espectro/forma de onda dinâmicos, renderizados em
// SVG por assets/js/charts.js) em pontos específicos do conteúdo dos módulos,
// tornando as aulas mais visuais/dinâmicas em vez de só texto.
//
// Uso:
//   node scripts/build_site.js      # gera data/content.js a partir de /tmp/content.json
//   node scripts/inject_charts.js   # insere os gráficos dinâmicos em data/content.js
//
// Reexecutar build_site.js sozinho apaga os gráficos injetados (ele regenera o
// arquivo do zero a partir do conteúdo bruto) — sempre rode inject_charts.js
// novamente em seguida.
const fs = require("fs");
const path = require("path");

const CONTENT_PATH = path.join(__dirname, "..", "data", "content.js");
const src = fs.readFileSync(CONTENT_PATH, "utf-8");
const jsonStr = src.slice(src.indexOf("["), src.lastIndexOf("]") + 1);
const COURSE = JSON.parse(jsonStr);

function chartNode(spec, caption) {
  return { type: "chart", spectrum: spec, caption: caption };
}

// Specs reaproveitadas do mesmo raciocínio dos casos práticos (data/cases.js),
// para manter consistência visual entre módulos e a página de prática.
const SPECS = {
  unbalance: { mode: "freq", xmax: 5, unit: "Ordens (x RPM)", peaks: [{ order: 1, amp: 1.0 }, { order: 2, amp: 0.08 }, { order: 3, amp: 0.05 }] },
  misalign: { mode: "freq", xmax: 6, unit: "Ordens (x RPM)", peaks: [{ order: 1, amp: 0.5 }, { order: 2, amp: 0.9 }, { order: 3, amp: 0.2 }] },
  looseness: { mode: "freq", xmax: 6.5, unit: "Ordens (x RPM)", peaks: [{ order: 0.5, amp: 0.25 }, { order: 1, amp: 0.7 }, { order: 1.5, amp: 0.3 }, { order: 2, amp: 0.55 }, { order: 2.5, amp: 0.2 }, { order: 3, amp: 0.4 }, { order: 4, amp: 0.3 }, { order: 5, amp: 0.22 }] },
  belt: { mode: "freq", xmax: 3, unit: "Ordens do eixo do motor (x RPM)", peaks: [{ order: 0.3, amp: 0.2 }, { order: 0.6, amp: 0.5 }, { order: 0.9, amp: 0.3 }, { order: 1, amp: 0.35 }, { order: 1.2, amp: 0.15 }] },
  gearGMF: { mode: "freq", xmax: 18, unit: "Ordens (x RPM do pinhão)", peaks: [{ order: 1, amp: 0.15 }, { order: 2, amp: 0.08 }, { order: 7, amp: 0.25 }, { order: 8, amp: 0.9 }, { order: 9, amp: 0.25 }, { order: 16, amp: 0.15 }] },
  rotorBars: { mode: "freq", xmax: 1.6, unit: "Ordens (x RPM)", peaks: [{ order: 0.673, amp: 0.25 }, { order: 1, amp: 1.0 }, { order: 1.327, amp: 0.25 }] },
  cavitation: { mode: "freq", xmax: 20, unit: "Ordens (x RPM)", peaks: [{ order: 6, amp: 0.9 }, { order: 12, amp: 0.3 }], noise: 0.35 },
  resonance: { mode: "freq", xmax: 10, unit: "Ordens (x RPM)", peaks: [{ order: 1, amp: 0.2 }, { order: 8, amp: 1.0 }] },
  bpfoStage3: { mode: "freq", xmax: 12, unit: "Ordens (x RPM)", peaks: [{ order: 2.5, amp: 0.25 }, { order: 3.5, amp: 0.7 }, { order: 4.5, amp: 0.25 }, { order: 6, amp: 0.2 }, { order: 7, amp: 0.55 }, { order: 8, amp: 0.2 }, { order: 9.5, amp: 0.15 }, { order: 10.5, amp: 0.4 }, { order: 11.5, amp: 0.15 }] },
  gearImpact: { mode: "time", xmax: 0.6, unit: "Tempo (s)", peaks: [{ order: 0.0, amp: 0.9 }, { order: 0.2, amp: 0.9 }, { order: 0.4, amp: 0.9 }, { order: 0.6, amp: 0.9 }], width: 0.006 },
  envelope: { mode: "freq", xmax: 6, unit: "Ordens (x RPM) — espectro de envelope (gE)", peaks: [{ order: 3.2, amp: 0.6 }, { order: 1, amp: 0.1 }], noise: 0.05 },
};

function findModule(id) { return COURSE.find((m) => m.id === id); }
function idxOfHeading(m, text) { return m.body.findIndex((n) => (n.type === "h2" || n.type === "h3") && n.text === text); }
function insertAfter(m, idx, node) {
  if (idx < 0) { console.warn("  [aviso] heading não encontrado, gráfico não inserido:", m.id); return; }
  m.body.splice(idx + 1, 0, node);
}

let insertedTotal = 0;
function markInserted() { insertedTotal++; }

// --- Módulo 6: catálogo de falhas por espectro ---
{
  const m = findModule("m6");
  // do fim para o início para não bagunçar os índices ao inserir múltiplas vezes
  let idx = idxOfHeading(m, "6.3 Folga mecânica");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.looseness, "Espectro típico de folga mecânica: série de harmônicos e sub-harmônicos (0,5X, 1,5X, 2,5X...)")); markInserted(); }
  idx = idxOfHeading(m, "6.2 Desalinhamento");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.misalign, "Espectro típico de desalinhamento angular: 2X axial dominante sobre 1X")); markInserted(); }
  idx = idxOfHeading(m, "6.1 Desbalanceamento de massa");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.unbalance, "Espectro típico de desbalanceamento de massa: 1X dominante, harmônicos baixos")); markInserted(); }
}

// --- Módulo 7: rolamentos e envelope ---
{
  const m = findModule("m7");
  let idx = idxOfHeading(m, "7.5 Técnica de envelope (demodulação de amplitude)");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.envelope, "Espectro de envelope revelando um defeito de rolamento em Estágio 1 — imperceptível em velocidade/aceleração pura")); markInserted(); }
  idx = idxOfHeading(m, "Estágio 3 — Defeito estabelecido");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.bpfoStage3, "Espectro de um rolamento em Estágio 3: harmônicos discretos de BPFO com bandas laterais em 1X")); markInserted(); }
}

// --- Módulo 8: engrenagens ---
{
  const m = findModule("m8");
  let idx = idxOfHeading(m, "8.2 Diagnósticos característicos");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.gearGMF, "Espectro de um engrenamento com folga: bandas laterais regulares ao redor da GMF")); markInserted(); }
}

// --- Módulo 9: correias ---
{
  const m = findModule("m9");
  let idx = idxOfHeading(m, "Exemplo numérico: calculando a frequência da correia");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.belt, "Espectro típico de correia gasta/frouxa: pico não síncrono em 2× a frequência da correia")); markInserted(); }
}

// --- Módulo 10: máquinas elétricas ---
{
  const m = findModule("m10");
  let idx = idxOfHeading(m, "Exemplo numérico: frequência de polo e escorregamento");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.rotorBars, "Espectro de um motor com barras de rotor quebradas: bandas laterais simétricas ao redor de 1X")); markInserted(); }
}

// --- Módulo 11: bombas, ventiladores e compressores ---
{
  const m = findModule("m11");
  let idx = idxOfHeading(m, "11.2 Turbulência e cavitação");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.cavitation, "Espectro típico de cavitação: ruído aleatório de banda larga sobreposto ao BPF")); markInserted(); }
  idx = idxOfHeading(m, "11.1 Frequência de passagem de pás (BPF)");
  if (idx >= 0) { insertAfter(m, idx, chartNode(SPECS.resonance, "Espectro com BPF amplificado por ressonância estrutural da base")); markInserted(); }
}

// --- Módulo 16: estudos de caso integrados (reaproveita os espectros dos casos práticos) ---
{
  const m = findModule("m16");
  const caseCharts = [
    { heading: "Caso 1 — Motor-bomba centrífuga, 3000 rpm", spec: SPECS.unbalance, caption: "Espectro do Caso 1: 1X dominante — desbalanceamento" },
    { heading: "Caso 2 — Ventilador industrial de tiragem, acionado por correias", spec: SPECS.belt, caption: "Espectro do Caso 2: pico não síncrono — correia gasta" },
    { heading: "Caso 3 — Redutor de engrenagens de uma esteira transportadora", spec: SPECS.gearGMF, caption: "Espectro do Caso 3: bandas laterais ao redor da GMF" },
    { heading: "Caso 4 — Motor elétrico com suspeita de defeito de rolamento", spec: SPECS.bpfoStage3, caption: "Espectro do Caso 4: harmônicos de BPFO em Estágio 3" },
    { heading: "Caso 6 — Ventilador industrial com ressonância estrutural (nível intermediário)", spec: SPECS.resonance, caption: "Espectro do Caso 6: BPF coincidindo com a frequência natural da base" },
    { heading: "Caso 7 — Compressor alternativo com folga em mancal (nível intermediário)", spec: SPECS.looseness, caption: "Espectro do Caso 7: harmônicos e sub-harmônicos — folga mecânica" },
    { heading: "Caso 8 — Motor de indução com barras de rotor quebradas (nível avançado)", spec: SPECS.rotorBars, caption: "Espectro do Caso 8: bandas laterais simétricas ao redor de 1X" },
    { heading: "Caso 9 — Bomba com cavitação por baixa pressão de sucção (nível intermediário)", spec: SPECS.cavitation, caption: "Espectro do Caso 9: ruído de banda larga — cavitação" },
    { heading: "Caso 10 — Redutor com dente de engrenagem trincado (nível avançado)", spec: SPECS.gearImpact, caption: "Forma de onda do Caso 10: impacto periódico — dente trincado" },
  ];
  // inserir de trás para frente para não invalidar índices já calculados a cada passo
  caseCharts.slice().reverse().forEach((cc) => {
    const idx = idxOfHeading(m, cc.heading);
    if (idx >= 0) { insertAfter(m, idx, chartNode(cc.spec, cc.caption)); markInserted(); }
    else console.warn("  [aviso] heading do Módulo 16 não encontrado:", cc.heading);
  });
}

fs.writeFileSync(
  CONTENT_PATH,
  "// Gerado automaticamente por scripts/build_site.js + scripts/inject_charts.js — não editar manualmente.\nconst COURSE = " +
    JSON.stringify(COURSE) +
    ";\n"
);

console.log("Gráficos dinâmicos inseridos:", insertedTotal);
