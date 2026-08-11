/* Testes da Biblioteca, do bloco de Referências por módulo e da Tabela de
   Diagnóstico em texto nativo. Roda em Node com um DOM mínimo simulado. */
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const PROJ = __dirname;
const rd = (p) => fs.readFileSync(path.join(PROJ, p), "utf-8");

const store = {};
function makeEl() {
  return {
    _html: "", style: {}, dataset: {}, value: "", textContent: "",
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); },
      toggle(c, f) { f === undefined ? (this._s.has(c) ? this._s.delete(c) : this._s.add(c)) : (f ? this._s.add(c) : this._s.delete(c)); },
      contains(c) { return this._s.has(c); },
    },
    set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; },
    querySelectorAll() { return []; }, querySelector() { return null; },
    addEventListener() {}, appendChild() {}, remove() {}, focus() {},
    scrollIntoView() {}, getAttribute() { return null; }, setAttribute() {},
    closest() { return null; }, scrollTop: 0,
  };
}
const elements = {};
["content", "modlist", "sidebar", "sidebar-overlay", "progress-count", "progress-bar-fill",
 "diag-table-modal", "dtm-body", "dtm-chips", "dtm-search", "dtm-empty", "dtm-poster",
 "dtm-poster-btn", "lib-search"].forEach((id) => (elements[id] = makeEl()));

const fakeDocument = {
  getElementById: (id) => elements[id] || null,
  querySelectorAll: () => [], querySelector: () => null,
  addEventListener: () => {}, createElement: () => makeEl(),
  body: { style: {} }, documentElement: { dataset: {}, style: {}, setAttribute() {} },
};
const ctx = {
  document: fakeDocument, console,
  localStorage: { getItem: (k) => store[k] || null, setItem: (k, v) => { store[k] = v; }, removeItem: (k) => { delete store[k]; } },
  location: { hash: "" }, history: { replaceState() {} },
  setTimeout: (f) => f && f(), requestAnimationFrame: (f) => f && f(),
  navigator: {}, speechSynthesis: { speak() {}, cancel() {}, getVoices: () => [] },
  scrollTo() {},
};
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);

vm.runInContext(rd("data/content.js") + "\nthis.COURSE=COURSE;", ctx);
vm.runInContext(rd("data/lube_content.js") + "\nthis.LUBE_COURSE=LUBE_COURSE;", ctx);
vm.runInContext(rd("data/cases.js") + "\nthis.CASES=CASES;", ctx);
vm.runInContext(rd("data/diag_table.js") + "\nthis.DIAG_TABLE=DIAG_TABLE;", ctx);
vm.runInContext(rd("data/library.js") + "\nthis.LIBRARY=LIBRARY;this.LIBRARY_CATEGORIES=LIBRARY_CATEGORIES;", ctx);
vm.runInContext(rd("assets/js/acronyms.js"), ctx);
vm.runInContext(rd("assets/js/charts.js"), ctx);
vm.runInContext(rd("assets/js/app.js"), ctx);
vm.runInContext(rd("assets/js/library.js"), ctx);

const ALL = ctx.COURSE.concat(ctx.LUBE_COURSE);

console.log("=== Biblioteca ===");
console.log("itens no acervo:", ctx.LIBRARY.length);

let semArquivo = [];
ctx.LIBRARY.forEach((it) => {
  if (!fs.existsSync(path.join(PROJ, it.file))) semArquivo.push(it.id + " -> " + it.file);
  if (!fs.existsSync(path.join(PROJ, it.cover))) semArquivo.push(it.id + " -> " + it.cover);
});
console.log("todos os PDFs e capas existem no disco:", semArquivo.length === 0, semArquivo.join("; "));

const ids = new Set(ALL.map((m) => m.id));
let refsInvalidas = [];
ctx.LIBRARY.forEach((it) => (it.usedIn || []).forEach((id) => { if (!ids.has(id)) refsInvalidas.push(it.id + " -> " + id); }));
console.log("todos os módulos citados em usedIn existem:", refsInvalidas.length === 0, refsInvalidas.join("; "));

const catIds = new Set(ctx.LIBRARY_CATEGORIES.map((c) => c.id));
let catRuim = ctx.LIBRARY.filter((it) => !catIds.has(it.category)).map((i) => i.id);
console.log("todas as categorias são válidas:", catRuim.length === 0, catRuim.join("; "));

ctx.window.renderLibraryPage();
const libHtml = elements["content"]._html;
console.log("página renderiza:", libHtml.length > 2000);
console.log("sem 'undefined':", !libHtml.includes("undefined"));
console.log("sem '[object Object]':", !libHtml.includes("[object Object]"));
console.log("mostra todas as capas:", ctx.LIBRARY.every((it) => libHtml.includes(it.cover)));
console.log("tem botão de baixar:", libHtml.includes("download"));

ctx.window.libFilter("normas");
const normasHtml = elements["content"]._html;
const nNormas = ctx.LIBRARY.filter((i) => i.category === "normas").length;
console.log("filtro por categoria funciona:", (normasHtml.match(/class="lib-card"/g) || []).length === nNormas);
ctx.window.libFilter("todos");

console.log("\n=== Referências por módulo ===");
const cobertura = {};
ctx.LIBRARY.forEach((it) => (it.usedIn || []).forEach((id) => { (cobertura[id] = cobertura[id] || []).push(it.id); }));
const semRef = ALL.filter((m) => !cobertura[m.id]).map((m) => m.id);
console.log("todos os " + ALL.length + " módulos têm referências:", semRef.length === 0, semRef.join(", "));

let notasInvalidas = [];
ALL.forEach((m) => {
  Object.keys(m.refNotes || {}).forEach((srcId) => {
    const src = ctx.LIBRARY.find((x) => x.id === srcId);
    if (!src) notasInvalidas.push(m.id + " -> fonte inexistente: " + srcId);
    else if ((src.usedIn || []).indexOf(m.id) === -1) notasInvalidas.push(m.id + " -> nota para fonte que não o lista: " + srcId);
  });
});
console.log("refNotes apontam para fontes válidas:", notasInvalidas.length === 0, notasInvalidas.join("; "));

let modSemBloco = [];
["m4", "m15", "m22", "m24", "mlub9", "m8", "m17"].forEach((id) => {
  ctx.window.goTo(id);
  const h = elements["content"]._html;
  if (!h.includes("Referências deste módulo")) modSemBloco.push(id);
  if (h.includes("undefined")) modSemBloco.push(id + " (undefined)");
});
console.log("bloco aparece nos módulos testados:", modSemBloco.length === 0, modSemBloco.join(", "));

ctx.window.goTo("m15");
const m15html = elements["content"]._html;
console.log("m15 cita o Manual SKF:", m15html.includes("Manual de Manutenção de Rolamentos SKF"));
console.log("m15 mostra a nota de capítulo:", m15html.includes("Capítulo 6"));
console.log("m15 tem link para o PDF:", m15html.includes("assets/pdf/skf-manual-manutencao-rolamentos.pdf"));

console.log("\n=== Tabela de Diagnóstico (texto nativo) ===");
ctx.window.toggleDiagTable();
const dtm = elements["dtm-body"]._html;
console.log("seções renderizadas:", ctx.DIAG_TABLE.length, "| conteúdo:", dtm.length > 3000);
console.log("sem 'undefined':", !dtm.includes("undefined"));
let diagRefRuim = [];
ctx.DIAG_TABLE.forEach((s) => (s.modules || []).forEach((m) => { if (!ids.has(m.id)) diagRefRuim.push(s.id + " -> " + m.id); }));
console.log("módulos citados na tabela existem:", diagRefRuim.length === 0, diagRefRuim.join("; "));

console.log("\n=== Navegação ===");
console.log("goTo('library') não lança erro:", (function () { try { ctx.window.goTo("library"); return true; } catch (e) { return e.message; } })());
console.log("goToLibraryItem existe:", typeof ctx.window.goToLibraryItem === "function");

console.log("\nDONE");
