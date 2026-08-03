// Gera data/lube_content.js (trilha "Engenheiro de Lubrificação", módulos mlub1-mlub8)
// e adiciona o campo meta.track a TODOS os módulos existentes em data/content.js,
// necessário para o novo menu em 3 categorias (Análise de Vibração I/II/III,
// Análise de Falhas - Rolamentos, Engenheiro de Lubrificação).
const fs = require("fs");

const LUBE_MODULES = JSON.parse(fs.readFileSync("scripts/lube_modules_raw.json", "utf-8"));

// 1) escreve data/lube_content.js
const header = `// Gerado automaticamente por scripts/add_lube_track.js — não editar manualmente.\n` +
  `// Trilha "Engenheiro de Lubrificação" (mlub1-mlub8), baseada no Body of Knowledge\n` +
  `// ICML (MLT I/II, MLA I/II/III) e no catálogo de treinamento Noria.\n`;
const lubeSrc = header + "const LUBE_COURSE = " + JSON.stringify(LUBE_MODULES, null, 1) + ";\n";
fs.writeFileSync("data/lube_content.js", lubeSrc, "utf-8");
console.log("data/lube_content.js escrito:", LUBE_MODULES.length, "módulos");

// 2) adiciona meta.track a todos os módulos de data/content.js
let src = fs.readFileSync("data/content.js", "utf-8");
const marker = "const COURSE = ";
const idx = src.indexOf(marker);
if (idx === -1) throw new Error("marcador 'const COURSE = ' não encontrado em content.js");
const headerComment = src.slice(0, idx);
let jsonPart = src.slice(idx + marker.length).trim();
if (jsonPart.endsWith(";")) jsonPart = jsonPart.slice(0, -1);
const COURSE = JSON.parse(jsonPart);

// m18-m21 = trilha "Análise de Falhas - Rolamentos"; todo o restante = "Análise de Vibração I, II e III"
const ROLAMENTOS_IDS = new Set(["m18", "m19", "m20", "m21"]);
COURSE.forEach((m) => {
  m.meta.track = ROLAMENTOS_IDS.has(m.id) ? "rolamentos" : "vibracao";
});

const newSrc = headerComment.replace(
  /\/\/ Gerado automaticamente por [^\n]*\n/,
  "// Gerado automaticamente por scripts/build_site.js + scripts/inject_charts.js + scripts/inject_summaries.js + scripts/add_module18.js + add_bearing_modules.js + add_lube_track.js — não editar manualmente.\n"
) + marker + JSON.stringify(COURSE, null, 1) + ";\n";
fs.writeFileSync("data/content.js", newSrc, "utf-8");
console.log("data/content.js atualizado: meta.track adicionado a", COURSE.length, "módulos");
console.log(" - vibracao:", COURSE.filter(m => m.meta.track === "vibracao").length);
console.log(" - rolamentos:", COURSE.filter(m => m.meta.track === "rolamentos").length);
