const fs = require("fs");
const MODULES = JSON.parse(fs.readFileSync("scripts/lube_course_v2_final.json", "utf-8"));
const header = "// Gerado automaticamente por scripts/add_lube_track.js + scripts/write_lube_content_v2.js — não editar manualmente.\n" +
  "// Trilha \"Engenheiro de Lubrificação\" (mlub1-mlub12), baseada no Body of Knowledge\n" +
  "// ICML (MLT I/II, MLA I/II/III), no catálogo de treinamento Noria e em artigos\n" +
  "// técnicos da Noria/Machinery Lubrication (RULER, MPC/verniz, ASCEND/ORS) e da\n" +
  "// Lubrin (LIS — Sistema de Identificação de Lubrificantes).\n";
const src = header + "const LUBE_COURSE = " + JSON.stringify(MODULES, null, 1) + ";\n";
fs.writeFileSync("data/lube_content.js", src, "utf-8");
console.log("data/lube_content.js reescrito:", MODULES.length, "módulos");
