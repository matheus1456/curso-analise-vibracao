const fs = require("fs");
const CASES = JSON.parse(fs.readFileSync("scripts/lube_cases_raw.json", "utf-8"));
const header = "// Gerado automaticamente por scripts/build_lube_cases_file.js — não editar manualmente.\n" +
  "// Seção \"Engenheiro de Lubrificação\" da Prática de Diagnóstico: casos reais de\n" +
  "// interpretação de relatório de análise de óleo, baseados no Body of Knowledge\n" +
  "// ICML (MLA I/II/III) e nas práticas descritas no catálogo de treinamento Noria.\n";
const src = header + "const LUBE_CASES = " + JSON.stringify(CASES, null, 1) + ";\n";
fs.writeFileSync("data/lube_cases.js", src, "utf-8");
console.log("data/lube_cases.js escrito:", CASES.length, "casos");
