const fs = require("fs");
const vm = require("vm");

const PROJ = "/tmp/project/curso-vibracao";
const contentJs = fs.readFileSync(PROJ + "/data/content.js", "utf-8");
const lubeContentJs = fs.readFileSync(PROJ + "/data/lube_content.js", "utf-8");
const casesJs = fs.readFileSync(PROJ + "/data/cases.js", "utf-8");
const bearingCasesJs = fs.readFileSync(PROJ + "/data/bearing_failure_cases.js", "utf-8");
const lubeCasesJs = fs.readFileSync(PROJ + "/data/lube_cases.js", "utf-8");
const chartsJs = fs.readFileSync(PROJ + "/assets/js/charts.js", "utf-8");
const appJs = fs.readFileSync(PROJ + "/assets/js/app.js", "utf-8");
const practiceJs = fs.readFileSync(PROJ + "/assets/js/practice.js", "utf-8");
const effectsJs = fs.readFileSync(PROJ + "/assets/js/effects.js", "utf-8");

function makeEl() {
  const el = {
    _html: "", children: [],
    classList: {
      set: new Set(),
      add(c) { this.set.add(c); }, remove(c) { this.set.delete(c); },
      toggle(c) { if (this.set.has(c)) this.set.delete(c); else this.set.add(c); },
      contains(c) { return this.set.has(c); },
    },
    dataset: {}, style: {},
    set innerHTML(v) { this._html = v; },
    get innerHTML() { return this._html; },
    set textContent(v) { this._html = v; },
    get textContent() { return this._html; },
    appendChild(c) { this.children.push(c); },
    querySelectorAll(sel) {
      // very small subset support for "svg" and ".hover-capture" etc. inside a fake container tree
      return this._fakeQuery ? this._fakeQuery(sel) : [];
    },
    querySelector(sel) { const r = this.querySelectorAll(sel); return r[0] || null; },
    addEventListener(type, cb) { (this._listeners = this._listeners || {})[type] = cb; },
    closest() { return null; },
    getBoundingClientRect() { return { top: 0, left: 0, width: 640, height: 260 }; },
    setAttribute(k, v) { (this._attrs = this._attrs || {})[k] = v; },
    getAttribute(k) { return (this._attrs || {})[k]; },
    get offsetWidth() { return 640; },
    remove() {}, // no-op: effects.js (celebrate()) chama el.remove() em setTimeout
  };
  return el;
}
// Minimal fake element used specifically for the spectrum SVG container,
// since the generic fake DOM above doesn't parse innerHTML into real nodes.
function makeSpectrumContainerStub() {
  const svgFake = makeEl();
  const captureFake = makeEl();
  const lineFake = makeEl();
  const circleFake = makeEl();
  const guideFake = makeEl();
  guideFake.querySelector = (sel) => (sel === "line" ? lineFake : sel === "circle" ? circleFake : null);
  const tooltipFake = makeEl();
  const markerFake = makeEl();
  const markerLineFake = makeEl();
  const markerCircleFake = makeEl();
  markerFake.querySelector = (sel) => (sel === "line" ? markerLineFake : sel === "circle" ? markerCircleFake : null);
  const clickReadoutFake = makeEl();
  const el = makeEl();
  const lookup = { "svg": svgFake, ".hover-capture": captureFake, ".hover-guide": guideFake, ".svg-tooltip": tooltipFake, ".click-marker": markerFake, ".svg-click-readout": clickReadoutFake };
  el.querySelector = (sel) => lookup[sel] || null;
  el._stubs = { svgFake, captureFake, guideFake, tooltipFake, lineFake, circleFake, markerFake, clickReadoutFake };
  return el;
}

const elements = {};
function getEl(id) {
  if (!elements[id]) {
    elements[id] = id === "spectrum-container" ? makeSpectrumContainerStub() : makeEl();
  }
  return elements[id];
}
const store = {};
const fakeWindow = {
  localStorage: { getItem: (k) => (store[k] !== undefined ? store[k] : null), setItem: (k, v) => { store[k] = v; } },
  scrollTo: () => {}, location: { hash: "" }, history: { replaceState: () => {} },
  CASES: undefined,
};
const fakeDocument = {
  getElementById: (id) => getEl(id),
  createElement: () => makeEl(),
  querySelectorAll: (sel) => {
    // used by app.js? no. used by checkCase for radio inputs -> return [] by default (patched per-call below)
    return fakeDocument._radioAnswers && fakeDocument._radioAnswers[sel] ? [fakeDocument._radioAnswers[sel]] : [];
  },
  querySelector: (sel) => (fakeDocument._radioAnswers && fakeDocument._radioAnswers[sel]) || null,
  addEventListener: () => {},
  body: makeEl(),
};
const context = {
  document: fakeDocument, window: fakeWindow, localStorage: fakeWindow.localStorage,
  location: fakeWindow.location, history: fakeWindow.history, console,
  requestAnimationFrame: () => {}, setTimeout, clearTimeout,
  MutationObserver: function () { return { observe() {} }; },
  IntersectionObserver: function () { return { observe() {}, disconnect() {}, unobserve() {} }; },
  Math,
};
vm.createContext(context);

vm.runInContext(contentJs + "\nthis.COURSE = COURSE;", context);
vm.runInContext(lubeContentJs + "\nthis.LUBE_COURSE = LUBE_COURSE;", context);
vm.runInContext(casesJs + "\nthis.CASES = CASES;", context);
vm.runInContext(bearingCasesJs + "\nthis.BEARING_FAILURE_CASES = BEARING_FAILURE_CASES;", context);
vm.runInContext(lubeCasesJs + "\nthis.LUBE_CASES = LUBE_CASES;", context);
vm.runInContext(chartsJs, context);
vm.runInContext(appJs, context);
vm.runInContext(practiceJs, context);
vm.runInContext(effectsJs, context);

console.log("CASES length:", context.CASES.length);

// Navigate to practice page
context.window.goTo("practice");
const contentHtml = elements["content"]._html;
console.log("Practice page rendered, contains chip row:", contentHtml.includes("case-chip-row"));
console.log("Contains spectrum container:", elements["case-detail"]._html.includes("spectrum-container"));

// Check spectrum-container got an SVG (renderSpectrumSVG sets innerHTML on it)
const specEl = elements["spectrum-container"];
console.log("Spectrum SVG present:", specEl && specEl._html.includes("<svg"));
console.log("Spectrum SVG has no leftover typo token:", specEl && !specEl._html.includes("4d7episode"));

// Simulate selecting case c3 (folga mecânica)
context.window.selectCase("c3");
const c3Html = elements["case-detail"]._html;
console.log("\\n--- Caso c3 ---");
console.log("Title present:", c3Html.includes("harmônicos"));

// Simulate answering correctly: diagnosis 'c', subh numeric 0.5, fase 'instavel'
fakeDocument._radioAnswers = {
  'input[name="diagnosis"]:checked': { value: "c" },
  'input[name="chk-fase"]:checked': { value: "instavel" },
};
elements["chk-subh"] = makeEl();
elements["chk-subh"].value = "0.5";

context.window.checkCase("c3");
const fb = elements["feedback-panel"]._html;
console.log("Feedback banner pass:", fb.includes("pass"));
console.log("Checklist has 3 items marked ok:", (fb.match(/class="ok"/g) || []).length === 3);

// verify progress saved
console.log("Practice progress stored:", store["vibcourse_practice_progress_v1"]);

// Now simulate a WRONG answer for case c1
context.window.selectCase("c1");
fakeDocument._radioAnswers = {
  'input[name="diagnosis"]:checked': { value: "b" }, // wrong (should be 'a')
  'input[name="chk-dir"]:checked': { value: "axial" }, // wrong (should be 'radial')
};
elements["chk-order"] = makeEl();
elements["chk-order"].value = "1";
context.window.checkCase("c1");
const fb1 = elements["feedback-panel"]._html;
console.log("\\n--- Caso c1 (respostas erradas) ---");
console.log("Feedback banner fail:", fb1.includes("fail"));
console.log("Checklist has 'no' entries:", (fb1.match(/class="no"/g) || []).length >= 2);

// --- Keyboard navigation of the fixed click-marker (Round C item 1) ---
context.window.selectCase("c3");
const spec2 = elements["spectrum-container"];
const captureStub = spec2._stubs.captureFake;
const markerLineStub = spec2._stubs.lineFake; // shared makeEl querySelector("line") returns lineFake for both guide/marker in this stub, see below
// The stub wires guideFake.querySelector -> lineFake/circleFake and markerFake.querySelector -> markerLineFake/markerCircleFake separately,
// so read the marker line/circle via the marker group directly:
const markerGroup = spec2.querySelector(".click-marker");
const markerLine2 = markerGroup.querySelector("line");
const readoutEl = spec2.querySelector(".svg-click-readout");

captureStub._listeners.click({ clientX: 300 });
const readoutAfterClick = readoutEl._html;
const xAfterClick = markerLine2._attrs["x1"];

captureStub._listeners.keydown({ key: "ArrowRight", preventDefault: () => {} });
const xAfterRight = markerLine2._attrs["x1"];
console.log("\\n--- Navegação por teclado no marcador ---");
console.log("Marcador aparece após clique:", readoutAfterClick.includes("Ponto de medição marcado"));
console.log("Seta direita desloca o marcador (posição mudou):", xAfterRight !== xAfterClick);
console.log("Legenda de teclado exibida:", readoutEl._html.includes("use ← →"));

captureStub._listeners.keydown({ key: "ArrowLeft", preventDefault: () => {} });
const xAfterLeft = markerLine2._attrs["x1"];
console.log("Seta esquerda desloca o marcador de volta:", xAfterLeft !== xAfterRight);

// --- Análise de Falhas - Rolamentos (seção de fotos reais para identificação) ---
console.log("\\n--- Análise de Falhas - Rolamentos ---");
console.log("BEARING_FAILURE_CASES length:", context.BEARING_FAILURE_CASES.length);

context.window.setPracticeView("bearing");
const bfContentHtml = elements["content"]._html;
console.log("Tabs de alternância presentes:", bfContentHtml.includes("practice-view-tab"));
console.log("Grade de casos (chip row) presente:", bfContentHtml.includes("bf-case-chip-row"));

const bf1Html = elements["bf-case-detail"]._html;
console.log("Foto do primeiro caso presente:", bf1Html.includes("bf-photo"));
console.log("Opções de identificação presentes:", bf1Html.includes('name="bf-diagnosis"'));

// Selecionar um caso específico e responder corretamente (bf2 = fadiga subsuperficial, índice 0)
context.window.selectBearingCase("bf2");
fakeDocument._radioAnswers = { 'input[name="bf-diagnosis"]:checked': { value: "0" } };
context.window.checkBearingCase("bf2");
const bfFb = elements["bf-feedback-panel"]._html;
console.log("Feedback de identificação correta:", bfFb.includes("pass"));
console.log("Progresso da seção de rolamentos salvo:", JSON.stringify(store["vibcourse_bearing_practice_progress_v1"]));

// Resposta errada em outro caso
context.window.selectBearingCase("bf3");
fakeDocument._radioAnswers = { 'input[name="bf-diagnosis"]:checked': { value: "1" } };
context.window.checkBearingCase("bf3");
const bfFb2 = elements["bf-feedback-panel"]._html;
console.log("Feedback de identificação incorreta:", bfFb2.includes("fail"));

// Voltar para a aba de espectro deve preservar a seleção anterior de caso com espectro
context.window.setPracticeView("spectrum");
console.log("Volta para a aba de espectro sem erros:", elements["content"]._html.includes("case-chip-row"));

// --- Engenheiro de Lubrificação (seção nova, rodada I: casos reais de análise de óleo) ---
console.log("\\n--- Engenheiro de Lubrificação ---");
console.log("LUBE_CASES length:", context.LUBE_CASES.length);

context.window.setPracticeView("lube");
const lubeContentHtml = elements["content"]._html;
console.log("3ª aba (Lubrificação) presente na barra de abas:", lubeContentHtml.includes("Engenheiro de Lubrificação"));
console.log("Grade de casos (chip row) presente:", lubeContentHtml.includes("lube-case-chip-row"));

const lc1Html = elements["lube-case-detail"]._html;
console.log("Painel de leituras de óleo presente:", lc1Html.includes("Relatório de análise de óleo"));
console.log("Opções de diagnóstico presentes:", lc1Html.includes('name="lube-diagnosis"'));
console.log("Badge de módulo relacionado presente:", lc1Html.includes("module-link-badge"));

// Responder corretamente ao primeiro caso (lc1 = contaminação por partículas, opção "a")
context.window.selectLubeCase("lc1");
fakeDocument._radioAnswers = { 'input[name="lube-diagnosis"]:checked': { value: "a" } };
context.window.checkLubeCase("lc1");
const lubeFb = elements["lube-feedback-panel"]._html;
console.log("Feedback de diagnóstico correto:", lubeFb.includes("pass"));
console.log("Mini-guia de solução por hipótese presente:", lubeFb.includes("solution-guide"));
console.log("Progresso da seção de lubrificação salvo:", JSON.stringify(store["vibcourse_lube_practice_progress_v1"]));

// Resposta errada em outro caso
context.window.selectLubeCase("lc4");
fakeDocument._radioAnswers = { 'input[name="lube-diagnosis"]:checked': { value: "b" } }; // errado (correto é 'a')
context.window.checkLubeCase("lc4");
const lubeFb2 = elements["lube-feedback-panel"]._html;
console.log("Feedback de diagnóstico incorreto:", lubeFb2.includes("fail"));

// Todos os 10 casos devem ter solution em todas as opções (nenhum "undefined" vazando pro HTML)
let lubeProblems = 0;
context.LUBE_CASES.forEach((c) => {
  context.window.selectLubeCase(c.id);
  const h = elements["lube-case-detail"]._html;
  if (h.includes("undefined") || h.includes("[object Object]")) { console.log("PROBLEM in", c.id); lubeProblems++; }
});
console.log("Casos de lubrificação sem problemas de renderização:", lubeProblems === 0);

// --- rodadaJ: laudo de análise de óleo (LUBRIN/PURILUB) + exercícios visuais ---
context.window.selectLubeCase("lc11");
const laudoHtml = elements["lube-case-detail"]._html;
console.log("Caso com laudo mostra laudo-report:", laudoHtml.includes("laudo-report"));
console.log("Laudo mostra nome do laboratório (LUBRIN):", laudoHtml.includes("LUBRIN"));
console.log("Laudo mostra tabela de físico-química:", laudoHtml.includes("Físico-química"));
console.log("Laudo mostra tabela de metais de desgaste:", laudoHtml.includes("Metais de desgaste"));
console.log("Laudo mostra parecer técnico:", laudoHtml.includes("laudo-opinion"));
console.log("Laudo NÃO duplica o painel antigo de leituras:", !laudoHtml.includes("readings-panel"));

context.window.selectLubeCase("lc14");
const ferroHtml = elements["lube-case-detail"]._html;
console.log("Caso de ferrografia visual mostra foto:", ferroHtml.includes("ferro_A_corte.png"));
console.log("Caso de ferrografia visual usa bf-photo-panel:", ferroHtml.includes("bf-photo-panel"));
console.log("Pergunta customizada (questionLabel) aparece:", ferroHtml.includes("representa"));

let allNewCasesOk = true;
["lc11","lc12","lc13","lc14","lc15","lc16","lc17","lc18","lc19"].forEach((id) => {
  context.window.selectLubeCase(id);
  const h = elements["lube-case-detail"]._html;
  if (h.includes("undefined") || h.includes("[object Object]")) { console.log("PROBLEM in", id); allNewCasesOk = false; }
});
console.log("Os 9 novos casos (lc11-lc19) renderizam sem problemas:", allNewCasesOk);
console.log("LUBE_CASES agora com 19 casos:", context.LUBE_CASES.length === 19);

console.log("\\nDONE");
