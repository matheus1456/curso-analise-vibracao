const fs = require("fs");
const path = require("path");

const OUT = "/tmp/project/curso-vibracao";
const modules = JSON.parse(fs.readFileSync("/tmp/content.json", "utf-8"));

const meta = {
  m0: { num: "0", short: "Antes de Começar", level: "básico" },
  m1: { num: "1", short: "Manutenção e Confiabilidade", level: "básico" },
  m2: { num: "2", short: "Fundamentos Físicos", level: "básico" },
  m3: { num: "3", short: "Sensores e Instrumentação", level: "básico" },
  m4: { num: "4", short: "Normas ISO 10816", level: "intermediário" },
  m5: { num: "5", short: "Metodologia de Análise Espectral", level: "intermediário" },
  m6: { num: "6", short: "Catálogo de Falhas por Espectro", level: "intermediário" },
  m7: { num: "7", short: "Rolamentos e Envelope", level: "intermediário" },
  m8: { num: "8", short: "Engrenagens", level: "intermediário" },
  m9: { num: "9", short: "Correias e Transmissões", level: "intermediário" },
  m10: { num: "10", short: "Máquinas Elétricas", level: "intermediário" },
  m11: { num: "11", short: "Bombas, Ventiladores e Compressores", level: "intermediário" },
  m12: { num: "12", short: "Forma de Onda, Fase e Órbitas", level: "avançado" },
  m13: { num: "13", short: "Programa de Monitoramento", level: "avançado" },
  m14: { num: "14", short: "Balanceamento de Campo", level: "avançado" },
  m15: { num: "15", short: "Alinhamento de Eixos", level: "avançado" },
  m16: { num: "16", short: "Estudos de Caso Integrados", level: "avançado" },
  m17: { num: "17", short: "Glossário Técnico", level: "referência" },
};

// Load video manifest if it exists (id -> relative mp4 path), else all null
let videoManifest = {};
const vmPath = "/tmp/project/curso-vibracao/data/video_manifest.json";
if (fs.existsSync(vmPath)) {
  videoManifest = JSON.parse(fs.readFileSync(vmPath, "utf-8"));
}

modules.forEach((m) => {
  m.meta = meta[m.id];
  m.videoUrl = videoManifest[m.id] || null;
});

fs.writeFileSync(
  path.join(OUT, "data", "content.js"),
  "// Gerado automaticamente por scripts/build_site.js — não editar manualmente.\nconst COURSE = " +
    JSON.stringify(modules) +
    ";\n"
);

console.log("data/content.js gerado com", modules.length, "módulos.");
