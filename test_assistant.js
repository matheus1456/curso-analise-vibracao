/* Testes da Calculadora de Diagnóstico (sem IA, sem rede):
   - motor determinístico conferido contra os exemplos numéricos do curso
   - renderização do formulário, dos cálculos e do parecer por regras
   - garantia de que a página NÃO faz nenhuma requisição de rede e não
     contém resquício de integração com API paga                          */
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const PROJ = __dirname;
const rd = (p) => fs.readFileSync(path.join(PROJ, p), "utf-8");

let pass = 0, fail = 0;
function check(label, cond, extra) {
  if (cond) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FALHA " + label + (extra ? "  -> " + extra : "")); }
}
function near(a, b, tol) { return Math.abs(a - b) <= tol; }

// ---------------------------------------------- 1. motor (sem DOM)
console.log("\n=== Motor determinístico ===");
const E = require("./data/diag_engine.js");

const b = E.bearingFreqs({ balls: 9, ballDia: 12, pitchDia: 60, contactAngle: 0, rpm: 1770 });
check("BPFO bate com o exemplo do Módulo 7 (106,2 Hz)", near(b.BPFO.hz, 106.2, 0.15), b.BPFO.hz);
check("BPFI bate com o exemplo do Módulo 7 (159,3 Hz)", near(b.BPFI.hz, 159.3, 0.15), b.BPFI.hz);
check("BPFO em ordens ≈ 3,6×", near(b.BPFO.order, 3.6, 0.05), b.BPFO.order);
check("BPFI em ordens ≈ 5,4×", near(b.BPFI.order, 5.4, 0.05), b.BPFI.order);
check("FTF menor que 0,5× RPM", b.FTF.order < 0.5, b.FTF.order);
check("BSF entre BPFO e BPFI em Hz", b.BSF.hz > 0 && b.BSF.hz < b.BPFI.hz, b.BSF.hz);
check("geometria incompleta devolve null", E.bearingFreqs({ balls: 9, rpm: 1770 }) === null);

check("GMF bate com o Módulo 8 (979 Hz)", near(E.gearMeshFreq(33, 1780).hz, 979, 1));

check("zona A abaixo do limite A/B", E.isoZone(1.2, "10816-3-g2-rigido").zone === "A");
check("zona B entre A/B e B/C", E.isoZone(2.0, "10816-3-g2-rigido").zone === "B");
check("zona C entre B/C e C/D", E.isoZone(3.5, "10816-3-g2-rigido").zone === "C");
check("zona D acima do C/D", E.isoZone(6.0, "10816-3-g2-rigido").zone === "D");
check("limite exato cai na zona inferior", E.isoZone(2.8, "10816-3-g2-rigido").zone === "B");
check("tabela inexistente devolve null", E.isoZone(3, "nao-existe") === null);
check("as 12 tabelas ISO têm ab < bc < cd",
  Object.keys(E.ISO_TABLES).length === 12 &&
  Object.keys(E.ISO_TABLES).every((k) => {
    const t = E.ISO_TABLES[k];
    return t.ab < t.bc && t.bc < t.cd;
  }), Object.keys(E.ISO_TABLES).length + " tabelas");

check("frequência de correia é menor que a rotação", E.beltFreq(1760, 200, 1400).order < 1);

check("2× axial com fase 180° traz desalinhamento em primeiro",
  E.ruleHypotheses({ dominantOrder: 2, direction: "axial", phase: "180" })[0].hypothesis === "Desalinhamento");
check("1× radial em fase traz desbalanceamento em primeiro",
  E.ruleHypotheses({ dominantOrder: 1, direction: "radial-h", phase: "em-fase" })[0].hypothesis === "Desbalanceamento");
check("0,45× identifica oil whirl",
  E.ruleHypotheses({ dominantOrder: 0.45 }).some((x) => /oil whirl/i.test(x.hypothesis)));
check("série de harmônicos identifica folga",
  E.ruleHypotheses({ harmonics: true }).some((x) => /folga/i.test(x.hypothesis)));
check("ruído aleatório de alta frequência identifica cavitação",
  E.ruleHypotheses({ randomHF: true }).some((x) => /cavita/i.test(x.hypothesis)));
check("bandas laterais identificam engrenagem",
  E.ruleHypotheses({ sidebands: true }).some((x) => /engrenagem/i.test(x.hypothesis)));
check("componente fixa identifica origem elétrica",
  E.ruleHypotheses({ electricalHz: true }).some((x) => /elétrica/i.test(x.hypothesis)));
check("entrada vazia não gera hipótese nem erro", E.ruleHypotheses({}).length === 0);
check("todo módulo citado pelas regras tem id no formato certo",
  E.ruleHypotheses({ dominantOrder: 1, harmonics: true, sidebands: true, randomHF: true, electricalHz: true })
    .every((x) => /^m\d+$/.test(x.modulo)));

const facts = E.buildFacts({ rpm: 1770, velRms: 5.0, isoTable: "10816-3-g2-rigido", balls: 9, ballDia: 12, pitchDia: 60, dominantOrder: 3.6, envelopeHigh: true });
check("buildFacts devolve iso, bearing e rules", !!(facts.iso && facts.bearing && facts.rules.length));

// ---------------------------------------------- 2. página (DOM simulado)
console.log("\n=== Página ===");
function makeEl() {
  return {
    _html: "", style: {}, dataset: {}, value: "", textContent: "", checked: false,
    classList: { _s: new Set(), add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); },
      toggle(c, f) { f === undefined ? (this._s.has(c) ? this._s.delete(c) : this._s.add(c)) : (f ? this._s.add(c) : this._s.delete(c)); },
      contains(c) { return this._s.has(c); } },
    set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; },
    querySelectorAll() { return []; }, querySelector() { return null; },
    addEventListener() {}, appendChild() {}, remove() {}, focus() {}, reset() {},
    scrollIntoView() {}, getAttribute() { return null; }, setAttribute() {},
    closest() { return null; }, scrollTop: 0,
  };
}
const store = {};
const elements = {};
["content", "modlist", "sidebar", "sidebar-overlay", "progress-count", "progress-bar-fill",
 "diag-table-modal", "dtm-body", "dtm-chips", "dtm-search", "dtm-empty",
 "asst-result", "asst-form",
 "asst-maquina","asst-rpm","asst-potencia","asst-iso","asst-vel","asst-acel","asst-env","asst-temp",
 "asst-ponto","asst-dir","asst-ordem","asst-pico","asst-fase","asst-harm","asst-side","asst-envhigh",
 "asst-random","asst-elet","asst-nb","asst-dd","asst-dp","asst-beta","asst-dentes","asst-polia",
 "asst-correia"].forEach((id) => (elements[id] = makeEl()));

const fakeDocument = {
  getElementById: (id) => elements[id] || null,
  querySelectorAll: () => [], querySelector: () => null,
  addEventListener: () => {}, createElement: () => makeEl(),
  body: { style: {}, appendChild() {}, removeChild() {} },
  documentElement: { dataset: {}, style: {}, setAttribute() {} },
};

// Qualquer tentativa de rede é registrada — a página não pode fazer nenhuma.
let networkCalls = [];
const ctx = {
  document: fakeDocument, console,
  localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } },
  location: { hash: "" }, history: { replaceState() {} },
  setTimeout: (f) => f && f(), requestAnimationFrame: (f) => f && f(),
  navigator: {}, speechSynthesis: { speak() {}, cancel() {}, getVoices: () => [] },
  scrollTo() {},
  fetch: function (url) { networkCalls.push("fetch " + url); return Promise.reject(new Error("bloqueado")); },
  XMLHttpRequest: function () { networkCalls.push("XHR"); },
};
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);

vm.runInContext(rd("data/content.js") + "\nthis.COURSE=COURSE;", ctx);
vm.runInContext(rd("data/lube_content.js") + "\nthis.LUBE_COURSE=LUBE_COURSE;", ctx);
vm.runInContext(rd("data/diag_table.js") + "\nthis.DIAG_TABLE=DIAG_TABLE;", ctx);
vm.runInContext(rd("data/library.js"), ctx);
vm.runInContext(rd("data/diag_engine.js"), ctx);
vm.runInContext(rd("assets/js/acronyms.js"), ctx);
vm.runInContext(rd("assets/js/charts.js"), ctx);
vm.runInContext(rd("assets/js/app.js"), ctx);
vm.runInContext(rd("assets/js/assistant.js"), ctx);

ctx.window.renderAssistantPage();
const formHtml = elements["content"]._html;
check("formulário renderiza", formHtml.length > 2000);
check("sem 'undefined' no formulário", !formHtml.includes("undefined"));
check("traz as 12 tabelas ISO no seletor", Object.keys(E.ISO_TABLES).every((k) => formHtml.includes(k)));
check("título não menciona IA", !/\bIA\b|intelig/i.test(formHtml.slice(0, 1200)));
check("informa que funciona offline", /offline/i.test(formHtml));

elements["asst-rpm"].value = "1770";
elements["asst-vel"].value = "5,2";
elements["asst-iso"].value = "10816-3-g2-rigido";
elements["asst-ordem"].value = "3,6";
elements["asst-nb"].value = "9";
elements["asst-dd"].value = "12";
elements["asst-dp"].value = "60";
elements["asst-envhigh"].checked = true;
ctx.window.asstAnalyze();
const res = elements["asst-result"]._html;

check("calcula e mostra a zona ISO", res.includes("Zona D") && res.includes("5.2 mm/s RMS"));
check("mostra a tabela de frequências do rolamento", res.includes("106.2") && res.includes("159.3"));
check("mostra a triagem por regras", /Defeito localizado de rolamento/.test(res));
check("mostra o parecer", res.includes("asst-parecer"));
check("parecer cita a zona", /zona D<\/strong>/.test(res));
check("parecer detecta que a ordem casa com o BPFO", /coincide com o <strong>BPFO/.test(res));
check("parecer aponta o que faltou informar", /faltou informar/.test(res));
check("sem 'undefined' no resultado", !res.includes("undefined"));
check("sem '[object Object]' no resultado", !res.includes("[object Object]"));
check("valor com vírgula é lido corretamente (5,2)", res.includes("5.2") && !res.includes("NaN"));
check("links para os módulos do curso", /goTo\('m4'\)/.test(res) && /goTo\('m7'\)/.test(res));

// caso em que a ordem não casa com nenhuma frequência
elements["asst-ordem"].value = "7,9";
ctx.window.asstAnalyze();
check("avisa quando a ordem NÃO casa com nenhuma frequência",
  /não<\/strong> coincide/.test(elements["asst-result"]._html));

// rpm ausente
elements["asst-rpm"].value = "";
ctx.window.asstAnalyze();
check("sem rpm, pede a rotação em vez de quebrar", elements["asst-result"]._html.includes("rotação"));

// ---------------------------------------------- 3. custo zero
console.log("\n=== Sem IA e sem rede ===");
check("a página NÃO fez nenhuma requisição de rede", networkCalls.length === 0, networkCalls.join(", "));

const src = rd("assets/js/assistant.js");
check("não há chamada a api.anthropic.com", src.indexOf("api.anthropic.com") === -1);
check("não há manipulação de chave de API", !/x-api-key|sk-ant-|apiKey|API_KEY/i.test(src));
check("não há fetch nem XMLHttpRequest", !/\bfetch\s*\(|XMLHttpRequest/.test(src));
check("não há referência a modelo de IA", !/claude-|gpt-|copilot/i.test(src));

const css = rd("assets/css/assistant.css");
check("o CSS não tem mais estilos de painel de chave", css.indexOf(".asst-key") === -1);
check("o CSS mantém o estilo do parecer", css.indexOf(".asst-parecer") !== -1);

const idx = rd("index.html");
check("index.html não carrega nada de IA no assistente", !/assistant.*anthropic/i.test(idx));
check("menu rápido aponta para a Calculadora", /Calculadora de Diagn/.test(idx));

console.log("\n=== Resultado: " + pass + " ok, " + fail + " falhas ===");
console.log(fail === 0 ? "DONE" : "DONE COM FALHAS");
if (fail > 0) process.exitCode = 1;
