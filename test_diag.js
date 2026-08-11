const fs = require("fs"), vm = require("vm"), path = require("path");
const PROJ = __dirname;
function rd(p){ return fs.readFileSync(path.join(PROJ,p),"utf-8"); }

const store = {};
function makeEl(){ return { _html:"", style:{}, dataset:{}, classList:{ _s:new Set(),
  add(c){this._s.add(c)}, remove(c){this._s.delete(c)}, toggle(c,f){ f===undefined? (this._s.has(c)?this._s.delete(c):this._s.add(c)) : (f?this._s.add(c):this._s.delete(c)); }, contains(c){return this._s.has(c)} },
  set innerHTML(v){ this._html=v; }, get innerHTML(){ return this._html; },
  querySelectorAll(){ return []; }, querySelector(){ return null; },
  addEventListener(){}, focus(){}, textContent:"", appendChild(){}, remove(){}, closest(){return null}, getAttribute(){return null}, setAttribute(){}, scrollTop:0 }; }
const elements = {};
["diag-table-modal","dtm-body","dtm-chips","dtm-search","dtm-empty","dtm-poster","dtm-poster-btn","content","modlist","sidebar","sidebar-overlay","progress-count","progress-bar-fill"].forEach(id=>elements[id]=makeEl());

const fakeDocument = {
  getElementById:(id)=>elements[id]||null,
  querySelectorAll:()=>[], querySelector:()=>null,
  addEventListener:()=>{}, createElement:()=>makeEl(),
  body:{ style:{} }, documentElement:{ dataset:{}, style:{} },
};
const ctx = { document:fakeDocument, window:{}, console,
  localStorage:{ getItem:k=>store[k]||null, setItem:(k,v)=>{store[k]=v}, removeItem:k=>{delete store[k]} },
  location:{ hash:"" }, setTimeout:(f)=>f&&f(), requestAnimationFrame:(f)=>f&&f(),
  navigator:{}, speechSynthesis:{ speak(){}, cancel(){}, getVoices:()=>[] } };
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);

vm.runInContext(rd("data/content.js")+"\nthis.COURSE=COURSE;", ctx);
vm.runInContext(rd("data/lube_content.js")+"\nthis.LUBE_COURSE=LUBE_COURSE;", ctx);
vm.runInContext(rd("data/diag_table.js")+"\nthis.DIAG_TABLE=DIAG_TABLE;", ctx);
vm.runInContext(rd("assets/js/acronyms.js"), ctx);
vm.runInContext(rd("assets/js/charts.js"), ctx);
vm.runInContext(rd("assets/js/app.js"), ctx);

console.log("DIAG_TABLE seções:", ctx.DIAG_TABLE.length);

// abre o modal -> deve renderizar
ctx.window.toggleDiagTable();
const html = elements["dtm-body"]._html;
const chips = elements["dtm-chips"]._html;

console.log("renderizou conteúdo:", html.length > 3000, "(", html.length, "chars )");
console.log("sem 'undefined':", !html.includes("undefined"));
console.log("sem '[object Object]':", !html.includes("[object Object]"));
console.log("chips gerados:", (chips.match(/dtm-chip/g)||[]).length, "(esperado 12: Tudo + 11 seções)");

let faltando = [];
ctx.DIAG_TABLE.forEach(s=>{
  if (!html.includes(s.id)) faltando.push(s.id+" (id)");
  (s.items||[]).forEach(it=>{ if(!html.includes(it.title.slice(0,18).replace(/&/g,"&amp;"))) faltando.push(s.id+" > "+it.title.slice(0,25)); });
  (s.stages||[]).forEach(st=>{ if(!html.includes(st.stage)) faltando.push(s.id+" > "+st.stage); });
});
console.log("todas as seções e itens presentes:", faltando.length===0, faltando.join("; "));

// referências de módulo devem existir no curso
const ids = new Set(ctx.COURSE.concat(ctx.LUBE_COURSE).map(m=>m.id));
let badRefs = [];
ctx.DIAG_TABLE.forEach(s=>(s.modules||[]).forEach(m=>{ if(!ids.has(m.id)) badRefs.push(s.id+" -> "+m.id); }));
console.log("todos os módulos referenciados existem:", badRefs.length===0, badRefs.join("; "));

// funções globais expostas
["filterDiagTable","searchDiagTable","goToFromDiag","toggleDiagTable","toggleDiagPoster"].forEach(f=>{
  console.log("window."+f+":", typeof ctx.window[f]==="function");
});
require("fs").writeFileSync("/tmp/dtm_body.html", elements["dtm-body"]._html);
require("fs").writeFileSync("/tmp/dtm_chips.html", elements["dtm-chips"]._html);
console.log("\nDONE");
