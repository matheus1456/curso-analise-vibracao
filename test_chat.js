const fs = require("fs");
const vm = require("vm");

const PROJ = "/tmp/project/curso-vibracao";
const openaiJs = fs.readFileSync(PROJ + "/assets/js/openai.js", "utf-8");
const chatJs = fs.readFileSync(PROJ + "/assets/js/chat.js", "utf-8");

function makeEl() {
  const el = {
    _html: "", children: [],
    classList: { set: new Set(), add(c) { this.set.add(c); }, remove(c) { this.set.delete(c); }, toggle(c) { if (this.set.has(c)) this.set.delete(c); else this.set.add(c); }, contains(c) { return this.set.has(c); } },
    dataset: {}, style: {}, value: "",
    set innerHTML(v) { this._html = v; },
    get innerHTML() { return this._html; },
    appendChild(c) { this.children.push(c); },
    addEventListener(type, cb) { (this._listeners = this._listeners || {})[type] = cb; },
    querySelector() { return makeEl(); },
    querySelectorAll() { return []; },
    setAttribute() {}, getAttribute() {},
    get offsetWidth() { return 640; },
    scrollTop: 0, scrollHeight: 100,
  };
  return el;
}
const elements = {};
function getEl(id) { if (!elements[id]) elements[id] = makeEl(); return elements[id]; }
const store = {};
const fakeWindow = { localStorage: { getItem: (k) => (store[k] !== undefined ? store[k] : null), setItem: (k, v) => { store[k] = v; }, removeItem: (k) => { delete store[k]; } } };
const fakeDocument = { getElementById: (id) => getEl(id), createElement: () => makeEl(), addEventListener: () => {}, body: makeEl() };

// fake fetch that simulates a successful OpenAI chat-completions response
let lastFetchBody = null;
let fetchMode = "success"; // "success" | "unauthorized" | "network-error"
function fakeFetch(url, opts) {
  lastFetchBody = JSON.parse(opts.body);
  if (fetchMode === "network-error") {
    return Promise.reject(new TypeError("Failed to fetch"));
  }
  if (fetchMode === "unauthorized") {
    return Promise.resolve({
      ok: false, status: 401,
      json: () => Promise.resolve({ error: { message: "Incorrect API key provided." } }),
    });
  }
  return Promise.resolve({
    ok: true, status: 200,
    json: () => Promise.resolve({ choices: [{ message: { role: "assistant", content: "Resposta de teste sobre 1X e desbalanceamento." } }] }),
  });
}

const context = {
  document: fakeDocument, window: fakeWindow, localStorage: fakeWindow.localStorage,
  console, fetch: fakeFetch, setTimeout,
};
vm.createContext(context);
vm.runInContext(openaiJs, context);
vm.runInContext(chatJs, context);

// 1. No key stored -> should render key setup UI inside #chat-root, referencing OpenAI (not Anthropic)
context.window.renderChatPage();
console.log("Content wraps chat-root:", elements["content"]._html.includes("chat-root"));
const setupHtml = elements["chat-root"]._html;
console.log("Key setup shown when no key:", setupHtml.includes("chat-key-input"));
console.log("Setup mentions OpenAI (not Anthropic):", setupHtml.includes("OpenAI") && !/anthropic/i.test(setupHtml));
console.log("Setup uses sk-... placeholder:", setupHtml.includes("sk-..."));

// 2. Simulate saving a key directly via localStorage (as the click handler would), using the shared OpenAI key
store["vibcourse_openai_api_key"] = "sk-test-123";
context.window.renderChatPage();
const rootHtml = elements["chat-root"]._html;
console.log("Chat UI shown when key present:", rootHtml.includes("chat-messages"));

// 3. Send a message -> verify OpenAI-shaped request body and response parsing
elements["chat-input"].value = "Por que aparece 1X no espectro?";
let sendClickHandler = elements["chat-send"]._listeners && elements["chat-send"]._listeners.click;
if (sendClickHandler) sendClickHandler();

setTimeout(() => {
  console.log("Request uses OpenAI model gpt-4o-mini:", lastFetchBody && lastFetchBody.model === "gpt-4o-mini");
  console.log("Request includes system + user messages:", lastFetchBody && lastFetchBody.messages && lastFetchBody.messages.length >= 2 && lastFetchBody.messages[0].role === "system");
  const msgsHtml = elements["chat-messages"]._html;
  console.log("Assistant reply rendered from choices[0].message.content:", msgsHtml.includes("Resposta de teste sobre 1X e desbalanceamento"));

  console.log("\nDONE");
}, 50);
