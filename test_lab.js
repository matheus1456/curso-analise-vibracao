const fs = require("fs");
const vm = require("vm");

const PROJ = "/tmp/project/curso-vibracao";
const labJs = fs.readFileSync(PROJ + "/assets/js/lab.js", "utf-8");

// ---------------------------------------------------------------------------
// Fake DOM: scans every innerHTML assignment for id="..."/class="..." tags and
// auto-registers a lightweight fake element per tag, so querySelector("#id")
// and querySelectorAll(".class") work against whatever markup lab.js actually
// generates (including the dynamically-swapped "Conversores" sub-forms) —
// without needing a real HTML parser (jsdom isn't installable offline here).
// ---------------------------------------------------------------------------
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
    _html: "", children: [], _attrs: {},
    classList: { set: new Set(), add(c) { this.set.add(c); }, remove(c) { this.set.delete(c); }, contains(c) { return this.set.has(c); } },
    style: {}, value: "",
    _listeners: {},
    addEventListener(type, cb) { (this._listeners[type] = this._listeners[type] || []).push(cb); },
    removeEventListener(type, cb) {
      if (!this._listeners[type]) return;
      this._listeners[type] = this._listeners[type].filter((f) => f !== cb);
    },
    fire(type, ev) { (this._listeners[type] || []).forEach((cb) => cb(ev || { target: this })); },
    dispatchEvent(ev) { this.fire(ev.type, ev); },
    appendChild(c) { this.children.push(c); },
    setAttribute(k, v) { this._attrs[k] = v; },
    getAttribute(k) { return this._attrs[k]; },
    getBoundingClientRect() { return { top: 0, left: 0, width: 760, height: 380 }; },
    getContext() {
      return {
        lineCap: "", lineJoin: "", strokeStyle: "", lineWidth: 1,
        beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, clearRect() {}, drawImage() {},
      };
    },
    toDataURL() { return "data:image/png;base64,FAKE"; },
    width: 760, height: 380,
    querySelector(sel) {
      if (sel.startsWith("#")) return GLOBAL_ID_INDEX[sel.slice(1)] || null;
      if (sel.startsWith(".")) return (GLOBAL_CLASS_INDEX[sel.slice(1)] || [])[0] || null;
      return null;
    },
    querySelectorAll(sel) {
      if (sel.startsWith(".")) return GLOBAL_CLASS_INDEX[sel.slice(1)] || [];
      if (sel.startsWith("#")) { const e = GLOBAL_ID_INDEX[sel.slice(1)]; return e ? [e] : []; }
      return [];
    },
  };
  Object.defineProperty(el, "textContent", { get() { return this._html; }, set(v) { this._html = v; } });
  Object.defineProperty(el, "innerHTML", {
    get() { return this._html; },
    set(v) { this._html = v; scanAndRegister(v); },
  });
  return el;
}

function setAndFire(id, value) {
  const el = GLOBAL_ID_INDEX[id];
  if (!el) throw new Error("campo não encontrado no fake DOM: " + id);
  el.value = value;
  el.fire("input");
}
function getVal(id) {
  const el = GLOBAL_ID_INDEX[id];
  return el ? el.value : undefined;
}
function getText(id) {
  const el = GLOBAL_ID_INDEX[id];
  return el ? el.textContent : undefined;
}

const store = {};
const fakeWindow = { localStorage: { getItem: (k) => (store[k] !== undefined ? store[k] : null), setItem: (k, v) => { store[k] = v; }, removeItem: (k) => { delete store[k]; } } };

let overlayEl = null;
// document-level keydown listener registry, so the calculator's keyboard
// shortcut handler (added/removed on every tab render / modal close) has
// something real to attach to and we can assert it's cleaned up properly.
const docListeners = {};
const fakeDocument = {
  getElementById: (id) => (id === "lab-overlay" ? overlayEl : makeEl()),
  createElement: (tag) => { const e = makeEl(); if (tag === "div" && !overlayEl) overlayEl = e; return e; },
  body: { appendChild: () => {} },
  addEventListener: (type, cb) => { (docListeners[type] = docListeners[type] || []).push(cb); },
  removeEventListener: (type, cb) => {
    if (!docListeners[type]) return;
    docListeners[type] = docListeners[type].filter((f) => f !== cb);
  },
};

const context = { document: fakeDocument, window: fakeWindow, localStorage: fakeWindow.localStorage, console, setTimeout, clearTimeout, Math, Image: function () { this.onload = null; }, Event: function (t) { this.type = t; } };
vm.createContext(context);
vm.runInContext(labJs, context);

console.log("openLab / closeLab expostos:", typeof context.window.openLab === "function", typeof context.window.closeLab === "function");

try {
  context.window.openLab("m6");
  console.log("openLab não lança erro: true");
  console.log("Overlay marcado como aberto:", overlayEl && overlayEl.classList.contains("open"));
} catch (e) {
  console.log("openLab não lança erro: false ->", e.message);
}

// Calculadora é a aba padrão ao abrir: deve registrar exatamente 1 listener
// de keydown no document (para os atalhos de teclado da calculadora).
console.log("Listener de teclado da calculadora registrado (1x):", (docListeners["keydown"] || []).length === 1);

// Trocar de aba não deve acumular listeners (bug corrigido em rodada anterior:
// cada renderModal() precisa desanexar o listener anterior antes de recriar).
context.window.openLab("m6"); // reabrir simula um novo render completo
console.log("Sem acúmulo de listeners após reabrir:", (docListeners["keydown"] || []).length === 1);

// Fechar o modal deve remover o listener de teclado por completo.
context.window.closeLab();
console.log("Listener de teclado removido ao fechar:", (docListeners["keydown"] || []).length === 0);

// Notes persistence contract: saving/loading uses the vibcourse_lab_notes_<id> key
store["vibcourse_lab_notes_m6"] = "Minhas anotações de teste";
console.log("Notas persistidas por módulo (chave dedicada):", store["vibcourse_lab_notes_m6"] === "Minhas anotações de teste");

console.log("Aba 'Conversores' presente no lab.js:", labJs.includes('"conv"') && labJs.includes("Conversores"));

// --------------------------------------------------------------------------
// Aba "Conversores" — seletor de tipo de conversão/cálculo (task #92):
// digitar em qualquer campo de um par/trinca ligado recalcula os outros
// ("e vice-versa"), e as fórmulas do curso (BPFO/BPFI/BSF/FTF, GMF, L10)
// batem com os valores apresentados nos módulos correspondentes.
// --------------------------------------------------------------------------
console.log("\n--- Aba Conversores ---");
context.window.openLab("m7");
const convBtn = (GLOBAL_CLASS_INDEX["lab-tab"] || []).find((e) => e._attrs["data-tab"] === "conv");
convBtn.fire("click");
console.log("Seletor de tipo de conversão presente:", !!GLOBAL_ID_INDEX["lab-conv-type-select"]);
const typeSelect = GLOBAL_ID_INDEX["lab-conv-type-select"];
// As <option> ficam dentro do HTML do <select>, que por sua vez está dentro do
// HTML maior do overlay (nosso fake DOM não propaga innerHTML para dentro de
// tags aninhadas escritas como texto cru) — por isso contamos no HTML do
// overlay inteiro, não no _html do próprio elemento <select>.
console.log("Seletor tem pelo menos 8 opções:", (overlayEl._html.match(/<option /g) || []).length >= 8);

// RPM <-> Hz, bidirecional
setAndFire("cv-rpm", "1780");
console.log("1780 RPM -> Hz ~29.667:", Math.abs(parseFloat(getVal("cv-hz")) - 29.667) < 0.01);
setAndFire("cv-hz", "50");
console.log("50 Hz -> RPM = 3000.00:", getVal("cv-rpm") === "3000.00");

// Campo vazio não deve gerar NaN/lixo — o campo ligado some (fica pronto para
// nova digitação) em vez de mostrar "NaN" (robustez pedida pelo usuário:
// "caso falte algum valor para realizar a atividade").
setAndFire("cv-rpm", "");
console.log("Campo vazio -> campo ligado não mostra NaN:", getVal("cv-hz") !== "NaN" && !getVal("cv-hz").includes("NaN"));

// Frequências de defeito de rolamento — reproduz o exemplo numérico do Módulo 7
// (N=9, d=12mm, p=60mm, β=0°, eixo a 1770 rpm, pista externa fixa)
typeSelect.value = "bearing_freq";
typeSelect.fire("change");
// Antes de preencher: com os campos ainda vazios, o resultado (somente
// leitura) deve mostrar travessões — não NaN — cobrindo o pedido do usuário
// de que faltar algum valor não trave/quebre o cálculo.
console.log("Antes de preencher, resultado mostra travessões (não NaN):", getText("cv-bearing-out").includes("—") && !getText("cv-bearing-out").includes("NaN"));
setAndFire("cv-b-n", "9");
setAndFire("cv-b-d", "12");
setAndFire("cv-b-p", "60");
setAndFire("cv-b-beta", "0");
setAndFire("cv-b-fre", "0");
setAndFire("cv-b-fri", "1770");
const bearingOut = getText("cv-bearing-out");
console.log("BPFO calculado bate com o Módulo 7 (106,2 Hz):", bearingOut.includes("106.20"));
console.log("BPFI calculado bate com o Módulo 7 (159,3 Hz):", bearingOut.includes("159.30"));
console.log("Resultado também mostra em ordens (×RPM):", bearingOut.includes("×RPM"));

// GMF
typeSelect.value = "gmf";
typeSelect.fire("change");
setAndFire("cv-g-teeth", "33");
setAndFire("cv-g-rpm", "1780");
console.log("GMF (33 dentes, 1780 rpm) = 979.00 Hz:", getText("cv-gmf-out").includes("979.00"));

// Vida nominal L10/Lnm — (C/P)^p com p=3 (esferas)
typeSelect.value = "l10";
typeSelect.fire("change");
setAndFire("cv-l-c", "45");
setAndFire("cv-l-p", "9");
setAndFire("cv-l-rpm", "1780");
const expSel = GLOBAL_ID_INDEX["cv-l-exp"];
expSel.value = "3";
expSel.fire("input");
console.log("L10 (C=45,P=9,p=3) = 125 milhões de revoluções:", getText("cv-l10-out").includes("125.00"));

// Pico <-> RMS <-> Pico-a-pico, com fator de crista
typeSelect.value = "pico_rms";
typeSelect.fire("change");
setAndFire("cv-pico", "7.0");
console.log("Pico 7.0 -> RMS = 4.950:", getVal("cv-rms") === "4.950");
console.log("Pico 7.0 -> Pico-a-pico = 14.000:", getVal("cv-pp") === "14.000");
console.log("Fator de crista calculado:", getText("cv-crest-out").includes("1.41"));

console.log("\nDONE");
