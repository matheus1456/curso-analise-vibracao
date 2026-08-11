/* Testes do Assistente de Diagnóstico:
   - motor determinístico conferido contra os exemplos numéricos do curso
   - renderização do formulário e do painel de cálculos
   - montagem do prompt e chamada à API com fetch simulado (nenhuma rede real)
   - tratamento de erro e ausência de chave                                   */
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

const g = E.gearMeshFreq(33, 1780);
check("GMF bate com o Módulo 8 (979 Hz)", near(g.hz, 979, 1), g.hz);

check("zona A abaixo do limite A/B", E.isoZone(1.2, "10816-3-g2-rigido").zone === "A");
check("zona B entre A/B e B/C", E.isoZone(2.0, "10816-3-g2-rigido").zone === "B");
check("zona C entre B/C e C/D", E.isoZone(3.5, "10816-3-g2-rigido").zone === "C");
check("zona D acima do C/D", E.isoZone(6.0, "10816-3-g2-rigido").zone === "D");
check("limite exato cai na zona inferior", E.isoZone(2.8, "10816-3-g2-rigido").zone === "B");
check("tabela inexistente devolve null", E.isoZone(3, "nao-existe") === null);
check("todas as tabelas ISO têm ab < bc < cd",
  Object.keys(E.ISO_TABLES).every((k) => {
    const t = E.ISO_TABLES[k];
    return t.ab < t.bc && t.bc < t.cd;
  }));

const belt = E.beltFreq(1760, 200, 1400);
check("frequência de correia é menor que a rotação", belt.order < 1, belt.order);

const r1 = E.ruleHypotheses({ dominantOrder: 2, direction: "axial", phase: "180" });
check("2× axial com fase 180° traz desalinhamento em primeiro", r1[0].hypothesis === "Desalinhamento", JSON.stringify(r1[0]));
const r2 = E.ruleHypotheses({ dominantOrder: 1, direction: "radial-h", phase: "em-fase" });
check("1× radial em fase traz desbalanceamento em primeiro", r2[0].hypothesis === "Desbalanceamento", JSON.stringify(r2[0]));
const r3 = E.ruleHypotheses({ dominantOrder: 0.45 });
check("0,45× identifica oil whirl", r3.some((x) => /oil whirl/i.test(x.hypothesis)));
const r4 = E.ruleHypotheses({ harmonics: true });
check("série de harmônicos identifica folga", r4.some((x) => /folga/i.test(x.hypothesis)));
const r5 = E.ruleHypotheses({ randomHF: true });
check("ruído aleatório de alta frequência identifica cavitação", r5.some((x) => /cavita/i.test(x.hypothesis)));
check("entrada vazia não gera hipótese nem erro", E.ruleHypotheses({}).length === 0);

const facts = E.buildFacts({ rpm: 1770, velRms: 5.0, isoTable: "10816-3-g2-rigido", balls: 9, ballDia: 12, pitchDia: 60, dominantOrder: 3.6, envelopeHigh: true });
check("buildFacts devolve iso, bearing e rules", !!(facts.iso && facts.bearing && facts.rules.length));

// ---------------------------------------------- 2. página (DOM simulado)
console.log("\n=== Página e integração ===");
const store = {};
function makeEl() {
  return {
    _html: "", style: {}, dataset: {}, value: "", textContent: "", checked: false,
    classList: { _s: new Set(), add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); },
      toggle(c, f) { f === undefined ? (this._s.has(c) ? this._s.delete(c) : this._s.add(c)) : (f ? this._s.add(c) : this._s.delete(c)); },
      contains(c) { return this._s.has(c); } },
    set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; },
    set outerHTML(v) { this._html = v; }, get outerHTML() { return this._html; },
    querySelectorAll() { return []; }, querySelector() { return null; },
    addEventListener() {}, appendChild() {}, remove() {}, focus() {}, reset() {},
    scrollIntoView() {}, getAttribute() { return null; }, setAttribute() {},
    closest() { return null; }, scrollTop: 0,
  };
}
const elements = {};
["content", "modlist", "sidebar", "sidebar-overlay", "progress-count", "progress-bar-fill",
 "diag-table-modal", "dtm-body", "dtm-chips", "dtm-search", "dtm-empty",
 "asst-result", "asst-key-panel", "asst-model", "asst-key-input", "asst-form", "asst-ai"]
  .forEach((id) => (elements[id] = makeEl()));

// campos do formulário usados pelo readInput()
["asst-maquina","asst-rpm","asst-potencia","asst-iso","asst-vel","asst-acel","asst-env","asst-temp",
 "asst-ponto","asst-dir","asst-ordem","asst-pico","asst-fase","asst-harm","asst-side","asst-envhigh",
 "asst-random","asst-elet","asst-nb","asst-dd","asst-dp","asst-beta","asst-dentes","asst-polia",
 "asst-correia","asst-contexto"].forEach((id) => (elements[id] = makeEl()));

const fakeDocument = {
  getElementById: (id) => elements[id] || null,
  querySelectorAll: () => [], querySelector: () => null,
  addEventListener: () => {}, createElement: () => makeEl(),
  body: { style: {} }, documentElement: { dataset: {}, style: {}, setAttribute() {} },
};

let fetchCalls = [];
let fetchImpl = null;

const ctx = {
  document: fakeDocument, console,
  localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } },
  location: { hash: "" }, history: { replaceState() {} },
  setTimeout: (f) => f && f(), requestAnimationFrame: (f) => f && f(),
  navigator: {}, speechSynthesis: { speak() {}, cancel() {}, getVoices: () => [] },
  scrollTo() {},
  fetch: function (url, opts) { fetchCalls.push({ url: url, opts: opts }); return fetchImpl(url, opts); },
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
check("traz as tabelas ISO no seletor", formHtml.includes("10816-3-g2-rigido") && formHtml.includes("10816-7-c2-g"));
check("mostra o painel de chave quando não há chave", formHtml.includes("asst-key-input"));
check("campo da chave é do tipo password", /id="asst-key-input" type="password"/.test(formHtml));

// --- análise sem chave: só cálculos
elements["asst-rpm"].value = "1770";
elements["asst-vel"].value = "5,0";
elements["asst-iso"].value = "10816-3-g2-rigido";
elements["asst-ordem"].value = "2";
elements["asst-dir"].value = "axial";
elements["asst-fase"].value = "180";
ctx.window.asstAnalyze();
let res = elements["asst-result"]._html;
check("sem chave, calcula e mostra a zona ISO", res.includes("Zona") && res.includes("mm/s RMS"));
check("sem chave, mostra a triagem por regras", res.includes("Desalinhamento"));
check("sem chave, avisa que a IA está desativada", res.includes("asst-ai-off"));
check("sem chave, nenhuma requisição de rede", fetchCalls.length === 0, JSON.stringify(fetchCalls.map((c) => c.url)));
check("valor com vírgula é lido corretamente", res.includes("5") && !res.includes("NaN"));

// --- rpm ausente
elements["asst-rpm"].value = "";
ctx.window.asstAnalyze();
check("sem rpm, pede a rotação em vez de quebrar", elements["asst-result"]._html.includes("rotação"));
elements["asst-rpm"].value = "1770";

// --- com chave: chamada simulada bem-sucedida
store["vibcourse_anthropic_api_key"] = "sk-ant-CHAVE-DE-TESTE";
fetchCalls = [];
fetchImpl = function () {
  return Promise.resolve({
    ok: true, status: 200,
    json: () => Promise.resolve({ content: [{ type: "text", text: "## Leitura da condição\nZona C.\n\n## Hipóteses\n- **Desalinhamento** — confiança alta" }] })
  });
};
ctx.window.asstAnalyze();

setTimeout(function () {
  const msgCall = fetchCalls.find((c) => String(c.url).indexOf("/v1/messages") !== -1);
  check("chamou o endpoint /v1/messages", !!msgCall, JSON.stringify(fetchCalls.map((c) => c.url)));
  if (msgCall) {
    const hh = msgCall.opts.headers;
    check("usa o host oficial da Anthropic", String(msgCall.url).indexOf("https://api.anthropic.com") === 0);
    check("envia x-api-key", hh["x-api-key"] === "sk-ant-CHAVE-DE-TESTE");
    check("envia anthropic-version", hh["anthropic-version"] === "2023-06-01");
    check("envia o cabeçalho de acesso direto do navegador",
      hh["anthropic-dangerous-direct-browser-access"] === "true");
    const body = JSON.parse(msgCall.opts.body);
    check("informa um modelo", typeof body.model === "string" && body.model.length > 3, body.model);
    check("define max_tokens", body.max_tokens > 0);
    check("manda uma mensagem de usuário", body.messages[0].role === "user");
    const prompt = body.messages[0].content;
    check("prompt inclui os cálculos já feitos", prompt.indexOf("CÁLCULOS JÁ REALIZADOS") !== -1);
    check("prompt proíbe recalcular", /NÃO os recalcule/.test(prompt));
    check("prompt inclui trechos do curso", prompt.indexOf("TRECHOS DO CURSO") !== -1);
    check("prompt inclui o BPFO calculado ou a zona ISO", /BPFO|zone/.test(prompt));
    check("prompt pede resposta em português", /português do Brasil/.test(prompt));
    check("a chave NÃO aparece no corpo da requisição", msgCall.opts.body.indexOf("sk-ant-") === -1);
  }
  const aiHtml = elements["asst-ai"]._html;
  check("renderiza a resposta da IA", aiHtml.indexOf("Leitura da condição") !== -1);
  check("converte markdown em HTML", aiHtml.indexOf("<h3>") !== -1 && aiHtml.indexOf("<strong>") !== -1);

  // --- erro da API
  fetchImpl = function () {
    return Promise.resolve({ ok: false, status: 401, json: () => Promise.resolve({ error: { message: "invalid x-api-key" } }) });
  };
  ctx.window.asstAnalyze();
  setTimeout(function () {
    const err = elements["asst-ai"]._html;
    check("erro da API é mostrado sem quebrar a página", err.indexOf("asst-err") !== -1);
    check("erro de chave traz orientação", /inválida|expirada/.test(err));

    // --- markdown seguro
    const md = ctx.window.__asstInternals.mdToHtml("## T\n<script>alert(1)</script>\n- **a**");
    check("markdown escapa HTML injetado", md.indexOf("<script") === -1, md.slice(0, 80));

    // a chave configurada nunca pode aparecer no HTML da página
    ctx.window.renderAssistantPage();
    const withKeyHtml = elements["content"]._html;
    check("chave configurada não aparece no HTML da página",
      withKeyHtml.indexOf("sk-ant-CHAVE-DE-TESTE") === -1);
    check("com chave, some o campo de entrada e aparece o seletor de modelo",
      withKeyHtml.indexOf("asst-key-input") === -1 && withKeyHtml.indexOf("asst-model") !== -1);

    console.log("\n=== Resultado: " + pass + " ok, " + fail + " falhas ===");
    console.log(fail === 0 ? "DONE" : "DONE COM FALHAS");
    if (fail > 0) process.exitCode = 1;
  }, 10);
}, 10);
