/* =========================================================
   data/diag_engine.js — motor determinístico do Assistente de Diagnóstico

   Tudo o que pode ser CALCULADO fica aqui, em JavaScript puro: zonas de
   severidade ISO 10816, frequências de defeito de rolamento, GMF, frequência
   de correia e conversões. Esses são exatamente os pontos em que um modelo de
   linguagem erra com mais facilidade (aritmética e consulta de tabela), então
   o resultado é calculado antes e entregue pronto ao modelo, que fica
   responsável apenas pela interpretação.

   Os limites das tabelas ISO reproduzem os valores usados no Módulo 4 do
   curso, para que assistente e material didático nunca discordem.

   Sem dependência de DOM — pode ser testado em Node.
   ========================================================= */

// ---------------------------------------------------------------- ISO 10816
// Cada entrada traz os limites das zonas em velocidade RMS (mm/s).
const ISO_TABLES = {
  "10816-3-g1-rigido": {
    label: "ISO 10816-3 — Grupo 1 (máquinas grandes, > 300 kW), suporte rígido",
    modulo: "m4", ab: 2.3, bc: 4.5, cd: 7.1
  },
  "10816-3-g1-flexivel": {
    label: "ISO 10816-3 — Grupo 1 (máquinas grandes, > 300 kW), suporte flexível",
    modulo: "m4", ab: 3.5, bc: 7.1, cd: 11.0
  },
  "10816-3-g2-rigido": {
    label: "ISO 10816-3 — Grupo 2 (máquinas médias, 15 a 300 kW), suporte rígido",
    modulo: "m4", ab: 1.4, bc: 2.8, cd: 4.5
  },
  "10816-3-g2-flexivel": {
    label: "ISO 10816-3 — Grupo 2 (máquinas médias, 15 a 300 kW), suporte flexível",
    modulo: "m4", ab: 2.3, bc: 4.5, cd: 7.1
  },
  "10816-2-1500": {
    label: "ISO 10816-2 — Turbinas a vapor e geradores, 1500 / 1800 rpm",
    modulo: "m4", ab: 2.8, bc: 5.3, cd: 8.5
  },
  "10816-2-3000": {
    label: "ISO 10816-2 — Turbinas a vapor e geradores, 3000 / 3600 rpm",
    modulo: "m4", ab: 3.8, bc: 7.5, cd: 11.8
  },
  "10816-4": {
    label: "ISO 10816-4 — Turbinas a gás",
    modulo: "m4", ab: 4.5, bc: 9.3, cd: 14.7
  },
  "10816-5": {
    label: "ISO 10816-5 — Máquinas hidráulicas",
    modulo: "m4", ab: 1.6, bc: 2.5, cd: 4.0
  },
  "10816-7-c1-p": {
    label: "ISO 10816-7 — Bombas rotodinâmicas, Categoria I, até 200 kW",
    modulo: "m4", ab: 2.5, bc: 4.0, cd: 6.6
  },
  "10816-7-c1-g": {
    label: "ISO 10816-7 — Bombas rotodinâmicas, Categoria I, acima de 200 kW",
    modulo: "m4", ab: 3.5, bc: 5.0, cd: 7.6
  },
  "10816-7-c2-p": {
    label: "ISO 10816-7 — Bombas rotodinâmicas, Categoria II, até 200 kW",
    modulo: "m4", ab: 3.2, bc: 5.1, cd: 8.5
  },
  "10816-7-c2-g": {
    label: "ISO 10816-7 — Bombas rotodinâmicas, Categoria II, acima de 200 kW",
    modulo: "m4", ab: 4.2, bc: 6.1, cd: 9.5
  }
};

const ZONE_MEANING = {
  A: "Vibração típica de máquina recém-comissionada — condição de novo/excelente.",
  B: "Operação de longo prazo sem restrição — condição aceitável.",
  C: "Operação restrita: aceitável apenas por tempo limitado, até a próxima intervenção planejada.",
  D: "Risco de dano — nível suficiente para causar avaria à máquina; ação corretiva imediata."
};

function isoZone(velRms, tableId) {
  const t = ISO_TABLES[tableId];
  if (!t || typeof velRms !== "number" || isNaN(velRms)) return null;
  let zone;
  if (velRms <= t.ab) zone = "A";
  else if (velRms <= t.bc) zone = "B";
  else if (velRms <= t.cd) zone = "C";
  else zone = "D";
  return {
    zone: zone,
    meaning: ZONE_MEANING[zone],
    table: t.label,
    limits: { "A/B": t.ab, "B/C": t.bc, "C/D": t.cd },
    value: velRms,
    modulo: t.modulo
  };
}

// ------------------------------------------------- Frequências de rolamento
// BPFO/BPFI = (N/2)·(fri − fre)·[1 ∓ (d/p)·cosβ]   — mesma fórmula do Módulo 7
function bearingFreqs(opts) {
  const N = Number(opts.balls);
  const d = Number(opts.ballDia);
  const p = Number(opts.pitchDia);
  const beta = Number(opts.contactAngle || 0) * Math.PI / 180;
  const rpm = Number(opts.rpm);
  if (!N || !d || !p || !rpm) return null;

  const shaftHz = rpm / 60;
  const ratio = (d / p) * Math.cos(beta);
  const bpfo = (N / 2) * shaftHz * (1 - ratio);
  const bpfi = (N / 2) * shaftHz * (1 + ratio);
  const bsf = (p / (2 * d)) * shaftHz * (1 - ratio * ratio);
  const ftf = (shaftHz / 2) * (1 - ratio);

  const round = (x, n) => Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
  return {
    shaftHz: round(shaftHz, 2),
    BPFO: { hz: round(bpfo, 2), order: round(bpfo / shaftHz, 2) },
    BPFI: { hz: round(bpfi, 2), order: round(bpfi / shaftHz, 2) },
    BSF: { hz: round(bsf, 2), order: round(bsf / shaftHz, 2) },
    FTF: { hz: round(ftf, 3), order: round(ftf / shaftHz, 3) }
  };
}

function gearMeshFreq(teeth, rpm) {
  const t = Number(teeth), r = Number(rpm);
  if (!t || !r) return null;
  const shaftHz = r / 60;
  const g = t * shaftHz;
  return { hz: Math.round(g * 100) / 100, order: t, shaftHz: Math.round(shaftHz * 100) / 100 };
}

// F correia = (π · RPM_polia · diâmetro primitivo) ÷ comprimento da correia
function beltFreq(rpm, pulleyDia, beltLength) {
  const r = Number(rpm), d = Number(pulleyDia), L = Number(beltLength);
  if (!r || !d || !L) return null;
  const shaftHz = r / 60;
  const f = shaftHz * (Math.PI * d) / L;
  return {
    hz: Math.round(f * 100) / 100,
    order: Math.round((f / shaftHz) * 1000) / 1000,
    shaftHz: Math.round(shaftHz * 100) / 100
  };
}

function hzToOrder(hz, rpm) {
  const h = Number(hz), r = Number(rpm);
  if (!h || !r) return null;
  return Math.round((h / (r / 60)) * 100) / 100;
}

// ------------------------------------------- Triagem por regras (sem IA)
// Ranking preliminar de hipóteses a partir dos sintomas informados, usando os
// mesmos critérios da tabela de diagnóstico SKF. Funciona sem chave de API e
// serve de âncora para o modelo: se a IA divergir bastante disso, o analista
// tem um segundo parecer para comparar.
function ruleHypotheses(input) {
  const H = [];
  const ord = input.dominantOrder;      // ordem dominante observada (× RPM)
  const dir = input.direction;          // "axial" | "radial-h" | "radial-v"
  const harmonics = !!input.harmonics;  // série de harmônicos de 1X
  const sidebands = !!input.sidebands;  // bandas laterais
  const phase = input.phase;            // "em-fase" | "180" | "diferente" | ""
  const envHigh = !!input.envelopeHigh; // envelope elevado
  const randomHF = !!input.randomHF;    // ruído aleatório de alta frequência
  const axial = dir === "axial";

  function add(name, score, why, mod) {
    if (score > 0) H.push({ hypothesis: name, score: score, why: why, modulo: mod });
  }

  if (ord && Math.abs(ord - 1) < 0.15) {
    let s = 3;
    let why = "Pico dominante em 1× RPM.";
    if (!axial) { s += 2; why += " Predominância radial reforça desbalanceamento."; }
    if (phase === "em-fase") { s += 2; why += " Fases iguais entre mancais indicam desbalanceamento estático."; }
    if (phase === "180") { why += " Fases opostas apontam desbalanceamento acoplado (ou desalinhamento — comparar com 2×)."; }
    add("Desbalanceamento", s, why, "m6");
    if (axial) {
      add("Desalinhamento de polias (transmissão por correia)", 4,
        "1× RPM predominante na direção axial é a assinatura de desalinhamento de polia.", "m9");
    }
  }

  if (ord && Math.abs(ord - 2) < 0.2) {
    let s = 4;
    let why = "Pico dominante em 2× RPM.";
    if (axial) { s += 3; why += " Predominância axial é característica de desalinhamento angular."; }
    if (phase === "180") { s += 2; why += " Fases opostas (180°) entre equipamentos acoplados reforçam o diagnóstico."; }
    add("Desalinhamento", s, why, "m15");
  }

  if (harmonics) {
    add("Folga mecânica", 5,
      "Série de harmônicos de 1× RPM com amplitude decrescente é o padrão de folga (estrutural ou de ajuste).",
      "m6");
    add("Fluência do anel no assento (creep)", 2,
      "Folga que reaparece após troca de rolamento sugere perda de interferência no assento — código 30/31 da SKF.",
      "m22");
  }

  if (ord && ord > 2.5 && ord < 12 && envHigh) {
    add("Defeito localizado de rolamento", 6,
      "Ordem não inteira entre 2,5× e 12× com envelope elevado é compatível com BPFO/BPFI. Confirmar pelo cálculo da geometria.",
      "m7");
  }

  if (envHigh && !ord) {
    add("Lubrificação deficiente ou contaminação", 4,
      "Envelope elevado em banda larga, sem picos discretos, aponta atrito/lubrificação antes de defeito localizado.",
      "m7");
  }

  if (sidebands) {
    add("Defeito de engrenagem", 4,
      "Bandas laterais em torno da GMF indicam modulação por dente danificado, desalinhamento ou backlash.",
      "m8");
  }

  if (randomHF) {
    add("Cavitação (bombas)", 4,
      "Ruído aleatório em larga faixa de alta frequência é a assinatura de cavitação; verificar NPSH e condições de sucção.",
      "m11");
  }

  if (ord && ord > 0.35 && ord < 0.55) {
    add("Instabilidade do filme de óleo (oil whirl)", 6,
      "Pico entre 0,42× e 0,48× RPM caracteriza instabilidade do filme de óleo em mancal de deslizamento.",
      "m12");
  }

  if (input.electricalHz) {
    add("Origem elétrica", 4,
      "Componente fixa em 120 Hz (ou 360 Hz em acionamento CC) que não acompanha a rotação indica origem elétrica.",
      "m10");
  }

  H.sort((a, b) => b.score - a.score);
  return H;
}

// Monta o pacote de fatos calculados que será entregue ao modelo.
function buildFacts(input) {
  const facts = {};
  if (input.velRms && input.isoTable) facts.iso = isoZone(Number(input.velRms), input.isoTable);
  if (input.balls && input.ballDia && input.pitchDia && input.rpm) {
    facts.bearing = bearingFreqs(input);
  }
  if (input.teeth && input.rpm) facts.gmf = gearMeshFreq(input.teeth, input.rpm);
  if (input.pulleyDia && input.beltLength && input.rpm) {
    facts.belt = beltFreq(input.rpm, input.pulleyDia, input.beltLength);
  }
  if (input.peakHz && input.rpm) facts.peakOrder = hzToOrder(input.peakHz, input.rpm);
  facts.rules = ruleHypotheses(input);
  return facts;
}

if (typeof window !== "undefined") {
  window.DIAG_ENGINE = { ISO_TABLES, isoZone, bearingFreqs, gearMeshFreq, beltFreq, hzToOrder, ruleHypotheses, buildFacts };
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ISO_TABLES, isoZone, bearingFreqs, gearMeshFreq, beltFreq, hzToOrder, ruleHypotheses, buildFacts };
}
