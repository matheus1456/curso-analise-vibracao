const fs = require("fs");
const vm = require("vm");

const PROJ = "/tmp/project/curso-vibracao";
const contentJs = fs.readFileSync(PROJ + "/data/content.js", "utf-8");
const lubeContentJs = fs.readFileSync(PROJ + "/data/lube_content.js", "utf-8");
const chartsJs = fs.readFileSync(PROJ + "/assets/js/charts.js", "utf-8");
const audioJs = fs.readFileSync(PROJ + "/assets/js/audio.js", "utf-8");
const appJs = fs.readFileSync(PROJ + "/assets/js/app.js", "utf-8");
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
    set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; },
    set textContent(v) { this._html = v; }, get textContent() { return this._html; },
    appendChild(c) { this.children.push(c); },
    querySelectorAll() { return []; }, querySelector() { return null; },
    addEventListener() {}, closest() { return null; },
    getBoundingClientRect() { return { top: 0, left: 0, width: 640, height: 260 }; },
    setAttribute() {}, getAttribute() {},
    get offsetWidth() { return 100; },
    remove() {}, // no-op: effects.js (celebrate()) chama el.remove() em setTimeout
  };
  return el;
}
// Stub usado para qualquer container que possa receber um gráfico dinâmico
// (renderSpectrumSVG de charts.js) — suporta as consultas svg/.hover-capture/etc.
function makeChartContainerStub() {
  const svgFake = makeEl();
  const captureFake = makeEl();
  const lineFake = makeEl();
  const circleFake = makeEl();
  const guideFake = makeEl();
  guideFake.querySelector = (sel) => (sel === "line" ? lineFake : sel === "circle" ? circleFake : null);
  const tooltipFake = makeEl();
  const el = makeEl();
  const markerFake = makeEl(); const markerLineFake = makeEl(); const markerCircleFake = makeEl();
  markerFake.querySelector = (sel) => (sel === "line" ? markerLineFake : sel === "circle" ? markerCircleFake : null);
  const clickReadoutFake = makeEl();
  const lookup = { svg: svgFake, ".hover-capture": captureFake, ".hover-guide": guideFake, ".svg-tooltip": tooltipFake, ".click-marker": markerFake, ".svg-click-readout": clickReadoutFake };
  el.querySelector = (sel) => lookup[sel] || null;
  return el;
}
const elements = {};
function getEl(id) {
  if (!elements[id]) {
    elements[id] = (id.indexOf("mod-chart-") === 0 || id === "spectrum-container") ? makeChartContainerStub() : makeEl();
  }
  return elements[id];
}
const store = {};
let lastUtterance = null;
const fakeSpeechSynthesis = {
  cancel() {}, pause() {}, resume() {},
  speak(u) { lastUtterance = u; },
  getVoices() { return [{ lang: "pt-BR", name: "Fake PT-BR Voice" }]; },
};
function FakeSpeechSynthesisUtterance(text) { this.text = text; }
const fakeWindow = {
  localStorage: { getItem: (k) => (store[k] !== undefined ? store[k] : null), setItem: (k, v) => { store[k] = v; } },
  scrollTo: () => {}, location: { hash: "" }, history: { replaceState: () => {} },
  speechSynthesis: fakeSpeechSynthesis,
};
const fakeDocument = {
  getElementById: (id) => getEl(id), createElement: () => makeEl(),
  querySelectorAll: () => [], addEventListener: () => {},
  body: makeEl(),
};
const context = {
  document: fakeDocument, window: fakeWindow, localStorage: fakeWindow.localStorage,
  location: fakeWindow.location, history: fakeWindow.history, console,
  requestAnimationFrame: () => {}, setTimeout, clearTimeout, MutationObserver: function () { return { observe() {} }; },
  IntersectionObserver: function () { return { observe() {}, disconnect() {}, unobserve() {} }; },
  SpeechSynthesisUtterance: FakeSpeechSynthesisUtterance,
};
vm.createContext(context);

vm.runInContext(contentJs + "\nthis.COURSE = COURSE;", context);
vm.runInContext(lubeContentJs + "\nthis.LUBE_COURSE = LUBE_COURSE;", context);
// ALL_MODULES = trilha clássica (COURSE) + trilha "Engenheiro de Lubrificação"
// (LUBE_COURSE) — mesma combinação feita internamente por app.js.
context.ALL_MODULES = context.COURSE.concat(context.LUBE_COURSE);
console.log("COURSE length:", context.COURSE.length, "| LUBE_COURSE length:", context.LUBE_COURSE.length, "| total:", context.ALL_MODULES.length);

vm.runInContext(chartsJs, context);
vm.runInContext(audioJs, context);
vm.runInContext(appJs, context);
vm.runInContext(effectsJs, context);

// --- teste da leitura em áudio (Web Speech API) ---
context.window.goTo("m6");
const m6html = elements["content"]._html;
console.log("Botão 'Ouvir aula' presente:", m6html.includes("audio-toggle-btn"));
context.window.toggleReading(context.COURSE.find((x) => x.id === "m6"));
console.log("speechSynthesis.speak() chamado:", lastUtterance !== null);
console.log("Utterance contém o título do módulo:", lastUtterance && lastUtterance.text.indexOf("Módulo 6") === 0);
context.window.stopReading();

context.window.goTo("m6");
const h6 = elements["content"]._html;
console.log("m6 -> images:", (h6.match(/<img /g) || []).length, "| quiz:", h6.includes("quiz-box"), "| video-card:", h6.includes("video-card"));

context.window.goTo("m4");
const h4 = elements["content"]._html;
console.log("m4 -> tables:", (h4.match(/<table/g) || []).length);

context.window.markDone("m6");
console.log("progress after markDone:", store["vibcourse_progress_v1"]);
console.log("sidebar progress:", elements["progress-count"]._html);

let problems = 0;
context.ALL_MODULES.forEach((mod) => {
  context.window.goTo(mod.id);
  const h = elements["content"]._html;
  if (h.includes("undefined") || h.includes("[object Object]")) { console.log("PROBLEM in", mod.id); problems++; }
});
console.log("Scanned:", context.ALL_MODULES.length, "modules | problems:", problems);

// --- trilha "Engenheiro de Lubrificação" (rodada I): sidebar em 3 categorias ---
context.window.goTo("mlub1");
console.log("goTo('mlub1') renderiza título correto:", elements["content"]._html.includes("Fundamentos de Tribologia"));
// O fake <ul> nunca limpa seu array `children` entre renders (só reseta o
// innerHTML/_html), então cada goTo() acumula outra rodada inteira de <li> por
// cima da anterior — pegamos só os últimos N itens (o total de linhas de UM
// render completo da sidebar) para checar exclusivamente o render mais recente.
const SIDEBAR_ITEMS_PER_RENDER = 3 /*fixos*/ + 1 /*separador*/ + 3 /*track-headings*/ + 8 /*level-headings*/ + context.ALL_MODULES.length;
const lastRender = elements["modlist"].children.slice(-SIDEBAR_ITEMS_PER_RENDER);
const sidebarHtml = lastRender.map((c) => c._html).join("");
console.log("Sidebar tem as 3 categorias:",
  sidebarHtml.includes("Análise de Vibração I, II e III") &&
  sidebarHtml.includes("Análise de Falhas - Rolamentos") &&
  sidebarHtml.includes("Engenheiro de Lubrificação"));
const lubeModlinks = lastRender.filter((c) => c.className.indexOf("modlink") === 0 && c.dataset && c.dataset.groupkey && c.dataset.groupkey.indexOf("lubrificacao|") === 0);
console.log("12 módulos de lubrificação no menu:", lubeModlinks.length === 12, "(encontrados:", lubeModlinks.length, ")");

// --- teste do novo schema de quiz de múltipla escolha (rodadaJ) ---
const h_m0 = (() => { context.window.goTo("m0"); return elements["content"]._html; })();
const hasQOptions = h_m0.includes("q-option") && h_m0.includes("checkQuizAnswer(");
const hasNoOldGabarito = !h_m0.includes("Ver gabarito comentado");
console.log("m0 quiz usa opções de múltipla escolha:", hasQOptions, "| formato antigo removido:", hasNoOldGabarito);

let allModulesHaveMCQuizzes = true;
let totalQuizQuestions = 0;
context.ALL_MODULES.forEach((m) => {
  (m.quizzes || []).forEach((qz) => {
    qz.questions.forEach((q) => {
      totalQuizQuestions++;
      if (!q.options || q.options.length !== 4 || !q.correct || !q.explanation) {
        allModulesHaveMCQuizzes = false;
        console.log("  problema em", m.id, ":", JSON.stringify(q).slice(0, 80));
      }
    });
  });
});
console.log("Todas as", totalQuizQuestions, "perguntas de todos os módulos estão no schema MC:", allModulesHaveMCQuizzes);

// simula clique numa opção (smoke test: checkQuizAnswer não deve lançar erro)
context.window.goTo("m0");
console.log("checkQuizAnswer não lança erro:", (() => { try { context.window.checkQuizAnswer("quiz-m0-0-0", "a", "a"); return true; } catch (e) { console.log(e); return false; } })());

// --- teste do motor de voz de IA (OpenAI TTS) com fallback automático ---
// Cenário 1: chave presente + callOpenAI bem-sucedido -> deve usar o motor "ai"
// e NUNCA chamar speechSynthesis.speak (senão o fallback estaria disparando à toa).
context.window.stopReading();
lastUtterance = null;
let audioPlayed = false;
context.window.loadOpenAIKey = () => "sk-test-123";
context.Audio = function (url) { this.url = url; this.play = () => { audioPlayed = true; }; this.pause = () => {}; };
context.window.callOpenAI = (path, body, opts) => Promise.resolve({ ok: true, blob: { fake: true } });
context.window.URL = { createObjectURL: () => "blob:fake" };
context.window.toggleReading(context.COURSE.find((x) => x.id === "m6"));
setTimeout(() => {
  console.log("\\n--- Motor de voz de IA (sucesso) ---");
  console.log("Áudio de IA tocado (sem cair para o navegador):", audioPlayed);
  console.log("speechSynthesis.speak NÃO foi chamado nesse caminho:", lastUtterance === null);
  context.window.stopReading();

  // Cenário 2: chave presente mas callOpenAI falha (simulando CORS/rede bloqueada)
  // -> deve cair automaticamente para a voz do navegador, sem travar.
  context.window.callOpenAI = () => Promise.reject({ status: 0, message: "CORS bloqueado" });
  context.window.toggleReading(context.COURSE.find((x) => x.id === "m6"));
  setTimeout(() => {
    console.log("\\n--- Motor de voz de IA (falha -> fallback) ---");
    console.log("Cai para speechSynthesis.speak() quando a IA falha:", lastUtterance !== null);
    context.window.stopReading();
    console.log("\\nDONE");
  }, 30);
}, 30);
