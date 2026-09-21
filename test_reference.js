// Testes da página "Consulta Rápida" (assets/js/refpage.js + data/reference.js),
// reorganizada em 3 áreas: Análise de Vibração, Falhas em Rolamentos e Lubrificação.
// Usa um fake DOM em Node (jsdom não é instalável offline aqui), no mesmo padrão
// dos demais test_*.js do projeto.
const fs = require("fs");
const vm = require("vm");
const PROJ = __dirname;

const GLOBAL_ID_INDEX = {};
const GLOBAL_CLASS_INDEX = {};

function parseAttrs(tagStr) {
  const attrs = {};
  const re = /([a-zA-Z-]+)=(["'])(.*?)\2/g;
  let m;
  while ((m = re.exec(tagStr))) attrs[m[1]] = m[3];
  return attrs;
}
function scanAndRegister(html) {
  const tagRe = /<[a-zA-Z][^>]*>/g;
  let m;
  while ((m = tagRe.exec(html))) {
    const attrs = parseAttrs(m[0]);
    if (!attrs.id && !attrs.class) continue;
    const fe = (attrs.id && GLOBAL_ID_INDEX[attrs.id]) || makeEl();
    fe._attrs = attrs;
    if (attrs.id) GLOBAL_ID_INDEX[attrs.id] = fe;
    if (attrs.class) {
      attrs.class.split(/\s+/).forEach((cls) => {
        if (!GLOBAL_CLASS_INDEX[cls]) GLOBAL_CLASS_INDEX[cls] = [];
        if (GLOBAL_CLASS_INDEX[cls].indexOf(fe) === -1) GLOBAL_CLASS_INDEX[cls].push(fe);
      });
    }
  }
}
function makeEl() {
  const el = {
    _html: "", _attrs: {}, children: [], style: {}, value: "", textContent: "",
    classList: {
      set: new Set(),
      add(c) { this.set.add(c); }, remove(c) { this.set.delete(c); },
      contains(c) { return this.set.has(c); },
    },
    _listeners: {},
    addEventListener(t, cb) { (this._listeners[t] = this._listeners[t] || []).push(cb); },
    removeEventListener(t, cb) {
      if (!this._listeners[t]) return;
      this._listeners[t] = this._listeners[t].filter((f) => f !== cb);
    },
    fire(t, ev) { (this._listeners[t] || []).forEach((cb) => cb(ev || { target: this })); },
    appendChild(c) { this.children.push(c); },
    setAttribute(k, v) { this._attrs[k] = v; },
    getAttribute(k) { return this._attrs[k]; },
    scrollIntoView() {},
    querySelector(sel) {
      if (sel.startsWith("#")) return GLOBAL_ID_INDEX[sel.slice(1)] || null;
      const l = GLOBAL_CLASS_INDEX[sel.replace(/^\./, "")] || [];
      return l[0] || null;
    },
    querySelectorAll(sel) {
      if (sel.startsWith(".")) return GLOBAL_CLASS_INDEX[sel.slice(1)] || [];
      return [];
    },
  };
  Object.defineProperty(el, "innerHTML", {
    get() { return this._html; },
    set(v) { this._html = v; scanAndRegister(v); },
  });
  Object.defineProperty(el, "offsetWidth", { get() { return 800; } });
  return el;
}

const store = {};
const contentEl = makeEl();
const fakeDocument = {
  getElementById: (id) => (id === "content" ? contentEl : GLOBAL_ID_INDEX[id] || null),
  createElement: () => makeEl(),
  body: { appendChild: () => {} },
  addEventListener: () => {}, removeEventListener: () => {},
};
const fakeWindow = {
  localStorage: {
    getItem: (k) => (store[k] !== undefined ? store[k] : null),
    setItem: (k, v) => { store[k] = v; },
    removeItem: (k) => { delete store[k]; },
  },
  print: () => { fakeWindow.__printed = true; },
};

const ctx = {
  document: fakeDocument, window: fakeWindow,
  localStorage: fakeWindow.localStorage, console,
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(PROJ + "/data/reference.js", "utf8"), ctx);
vm.runInContext("globalThis.REFERENCE = REFERENCE;", ctx);
vm.runInContext(fs.readFileSync(PROJ + "/assets/js/refpage.js", "utf8"), ctx);

const REF = ctx.REFERENCE;

console.log("--- Estrutura de dados ---");
console.log("REFERENCE.areas existe:", Array.isArray(REF.areas));
console.log("Exatamente 3 áreas:", REF.areas.length === 3, "(", REF.areas.length, ")");
const ids = REF.areas.map((a) => a.id);
console.log("IDs esperados (vibracao, rolamentos, lubrificacao):",
  JSON.stringify(ids) === JSON.stringify(["vibracao", "rolamentos", "lubrificacao"]));

let estruturaOk = true;
REF.areas.forEach((a) => {
  if (!a.label || !a.icon || !a.sections || !a.sections.length) estruturaOk = false;
  a.sections.forEach((s) => {
    if (!s.title || !s.table || !s.table.header || !s.table.rows || !s.table.rows.length) estruturaOk = false;
    // toda linha deve ter o mesmo nº de colunas do cabeçalho
    s.table.rows.forEach((r) => { if (r.length !== s.table.header.length) estruturaOk = false; });
  });
});
console.log("Todas as seções têm título, tabela e linhas coerentes com o cabeçalho:", estruturaOk);
console.log("Compatibilidade: REFERENCE.sections achatado bate com a soma das áreas:",
  REF.sections.length === REF.areas.reduce((n, a) => n + a.sections.length, 0));

console.log("\n--- Renderização ---");
ctx.window.renderReferencePage();
const html1 = contentEl.innerHTML;
console.log("renderReferencePage não lança erro: true");
console.log("Renderiza as 3 abas:", (html1.match(/class='ref-tab[ ']/g) || []).length === 3);
console.log("Área inicial é 'Análise de Vibração':", html1.includes("Análise de Vibração"));
console.log("Mostra apenas a área ativa (Lubrificação ausente do corpo):",
  !html1.includes("Graus de viscosidade ISO VG"));
console.log("Botão de PDF presente:", html1.includes("printReference()"));
console.log("Tabelas renderizadas:", (html1.match(/<table/g) || []).length === REF.areas[0].sections.length);

console.log("\n--- Troca de aba ---");
const tabs = GLOBAL_CLASS_INDEX["ref-tab"] || [];
const tabLub = tabs.filter((t) => t._attrs["data-area"] === "lubrificacao")[0];
console.log("Aba de Lubrificação encontrada:", !!tabLub);
tabLub.fire("click");
const html2 = contentEl.innerHTML;
console.log("Após clicar, mostra conteúdo de Lubrificação:", html2.includes("Graus de viscosidade ISO VG"));
console.log("E deixa de mostrar o conteúdo de Vibração:",
  !html2.includes("Diagnóstico rápido por ordem do espectro"));
console.log("Preferência persistida em localStorage:", store["vibcourse_ref_area"] === "lubrificacao");

const tabRol = (GLOBAL_CLASS_INDEX["ref-tab"] || []).filter((t) => t._attrs["data-area"] === "rolamentos")[0];
tabRol.fire("click");
const html3 = contentEl.innerHTML;
console.log("Aba de Rolamentos mostra a classificação ISO 15243:", html3.includes("ISO 15243"));
console.log("Aba de Rolamentos mostra designação de rolamento:", html3.includes("Designação de rolamento"));

console.log("\n--- Conteúdo essencial por área ---");
const flat = (id) => JSON.stringify(REF.areas.filter((a) => a.id === id)[0]);
console.log("Vibração traz tabela de fase:", flat("vibracao").includes("Confirmação por fase"));
console.log("Vibração traz configuração de coleta (Fmax/resolução):", flat("vibracao").includes("Fmax"));
console.log("Vibração traz ISO 10816:", flat("vibracao").includes("ISO 10816"));
console.log("Rolamentos traz BPFO/BPFI:", flat("rolamentos").includes("BPFO"));
console.log("Rolamentos traz folga interna (C3):", flat("rolamentos").includes("C3"));
console.log("Rolamentos traz vida nominal L10:", flat("rolamentos").includes("L10"));
console.log("Lubrificação traz ISO VG:", flat("lubrificacao").includes("ISO VG"));
console.log("Lubrificação traz NLGI:", flat("lubrificacao").includes("NLGI"));
console.log("Lubrificação traz G = 0,005 × D × B:", flat("lubrificacao").includes("0,005 × D × B"));
console.log("Lubrificação traz fator κ:", flat("lubrificacao").includes("κ"));
console.log("Lubrificação traz ISO 4406:", flat("lubrificacao").includes("ISO 4406"));

console.log("\n--- Sanidade do CSS da página ---");
const cssRef = fs.readFileSync(PROJ + "/assets/css/refpage.css", "utf8");
const cssStyle = fs.readFileSync(PROJ + "/assets/css/style.css", "utf8");
// 1) toda classe usada pelo refpage.js precisa ter regra em algum CSS do projeto
const jsSrc = fs.readFileSync(PROJ + "/assets/js/refpage.js", "utf8");
const allCss = cssRef + cssStyle +
  fs.readFileSync(PROJ + "/assets/css/practice.css", "utf8") +
  fs.readFileSync(PROJ + "/assets/css/lab.css", "utf8");
const usadas = new Set();
(jsSrc.match(/class='[^']+'/g) || []).forEach(function (m) {
  m.slice(7, -1).split(/[\s+]/).forEach(function (c) {
    c = c.replace(/[^a-zA-Z0-9_-]/g, "");
    // "only-print" é marcador semântico legado, sem regra própria (o efeito vem de .ref-print-title)
    if (c && c !== "only-print" && c !== "n") usadas.add(c);
  });
});
const semCss = [...usadas].filter(function (c) { return allCss.indexOf("." + c) === -1; });
console.log("Toda classe usada pelo refpage.js tem regra CSS:", semCss.length === 0,
  semCss.length ? "-> sem regra: " + semCss.join(", ") : "");

// 2) toda variável CSS referenciada precisa existir (var indefinida = regra descartada silenciosamente)
const varsRef = [...new Set((cssRef.match(/var\(--[a-z-]+/g) || []).map(function (v) { return v.slice(4); }))];
const semVar = varsRef.filter(function (v) { return cssStyle.indexOf(v + ":") === -1; });
console.log("Toda variável CSS de refpage.css está definida em style.css:", semVar.length === 0,
  semVar.length ? "-> indefinida: " + semVar.join(", ") : "");

// 3) as abas precisam ter estilo de estado ativo (senão a área selecionada fica indistinguível)
console.log("Existe regra de estado ativo para as abas:", /\.ref-tab\.active\s*{/.test(cssRef));

console.log("\nDONE");
