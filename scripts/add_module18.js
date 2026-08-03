// scripts/add_module18.js
// Passo de pós-processamento (como inject_charts.js / inject_summaries.js) que
// acrescenta um novo módulo — "Galeria de Falhas: Rolamentos e Redutores em
// Detalhe" — combinando imagens ilustrativas já existentes (assets/img) com
// gráficos dinâmicos (mesmo componente SVG dos exercícios), simulando
// cenários reais estágio a estágio.
//
// Executar por último, depois de build_site.js + inject_charts.js + inject_summaries.js:
//   node scripts/build_site.js
//   node scripts/inject_charts.js
//   node scripts/inject_summaries.js
//   node scripts/add_module18.js
const fs = require("fs");
const path = require("path");

const CONTENT_PATH = path.join(__dirname, "..", "data", "content.js");
const src = fs.readFileSync(CONTENT_PATH, "utf-8");
const jsonStr = src.slice(src.indexOf("["), src.lastIndexOf("]") + 1);
const COURSE = JSON.parse(jsonStr);

// Evita duplicar se o script for rodado mais de uma vez
if (COURSE.find((m) => m.id === "m18")) {
  console.log("Módulo 18 já existe — nada a fazer.");
  process.exit(0);
}

function H2(text) { return { type: "h2", text }; }
function P(text) { return { type: "p", text }; }
function Bullet(text) { return { type: "bullet", text }; }
function Img(src, caption) { return { type: "image", src, caption }; }
function Chart(spectrum, caption) { return { type: "chart", spectrum, caption }; }
function Table(header, rows) { return { type: "table", header, rows }; }

const body = [];

body.push(P(
  "Este módulo reúne, num só lugar, a evolução visual e espectral das falhas mais comuns em rolamentos e redutores de " +
  "engrenagens — as duas famílias de componentes mais frequentemente diagnosticadas por análise de vibração em campo. " +
  "Cada defeito é mostrado com uma imagem ilustrativa do padrão espectral esperado e um gráfico dinâmico simulando um " +
  "cenário real (passe o mouse ou clique para explorar os valores, como nos exercícios de prática)."
));

body.push(H2("18.1 Rolamentos: os quatro estágios, lado a lado"));
body.push(P(
  "Os quatro estágios já foram apresentados no Módulo 7 — aqui eles são reunidos visualmente, estágio a estágio, para " +
  "reforçar como o mesmo defeito físico (uma trinca microscópica na pista) se manifesta de forma completamente " +
  "diferente no espectro conforme evolui."
));

body.push(Img("assets/img/06_rolamento_estagio1.png",
  "Figura 18.1 — Estágio 1: nenhum pico discreto visível no espectro de velocidade/aceleração; o defeito só aparece no envelope de aceleração."));
body.push(Chart(
  { mode: "freq", xmax: 6, unit: "Ordens (x RPM) — espectro de envelope (gE)", peaks: [{ order: 3.2, amp: 0.55 }, { order: 1, amp: 0.08 }], noise: 0.04 },
  "Cenário simulado — Estágio 1: único pico discreto no envelope, próximo à frequência de defeito calculada (BPFO/BPFI)."
));

body.push(Img("assets/img/07_rolamento_estagio2.png",
  "Figura 18.2 — Estágio 2: bandas laterais começam a se formar ao redor da frequência natural do componente do rolamento."));
body.push(Chart(
  { mode: "freq", xmax: 20, unit: "Ordens (x RPM) — banda estreita ao redor de Fn", peaks: [{ order: 14, amp: 0.15 }, { order: 15, amp: 0.45 }, { order: 16, amp: 0.15 }], noise: 0.06 },
  "Cenário simulado — Estágio 2: pico na frequência natural do componente, já com bandas laterais discretas ao redor."
));

body.push(Img("assets/img/08_rolamento_estagio3.png",
  "Figura 18.3 — Estágio 3: picos discretos de BPFO (ou BPFI/BSF) e seus harmônicos, cercados por bandas laterais em 1X RPM."));
body.push(Chart(
  { mode: "freq", xmax: 12, unit: "Ordens (x RPM)", peaks: [{ order: 2.5, amp: 0.25 }, { order: 3.5, amp: 0.7 }, { order: 4.5, amp: 0.25 }, { order: 6, amp: 0.2 }, { order: 7, amp: 0.55 }, { order: 8, amp: 0.2 }, { order: 9.5, amp: 0.15 }, { order: 10.5, amp: 0.4 }, { order: 11.5, amp: 0.15 }] },
  "Cenário simulado — Estágio 3: harmônicos discretos de BPFO com bandas laterais regulares em 1X."
));

body.push(Img("assets/img/09_rolamento_estagio4.png",
  "Figura 18.4 — Estágio 4: piso de ruído de banda larga elevado; os picos discretos começam a desaparecer dentro do ruído — falha iminente."));
body.push(Chart(
  { mode: "freq", xmax: 12, unit: "Ordens (x RPM)", peaks: [{ order: 3.5, amp: 0.25 }, { order: 7, amp: 0.2 }], noise: 0.55 },
  "Cenário simulado — Estágio 4: ruído de banda larga dominante; harmônicos antes nítidos agora quase submersos no ruído."
));

body.push(H2("18.2 Redutores de engrenagens: defeitos mais comuns"));
body.push(P(
  "Nos redutores, os defeitos costumam se manifestar de três formas principais: desgaste progressivo (afeta a GMF e " +
  "suas bandas laterais), folga no engrenamento (harmônicos e sub-harmônicos, semelhante à folga mecânica do Módulo " +
  "6.3) e dente trincado ou quebrado (impacto discreto e periódico na forma de onda no tempo)."
));

body.push(Img("assets/img/10_engrenagens.png",
  "Figura 18.5 — Desgaste progressivo do engrenamento: GMF dominante, cercada por bandas laterais espaçadas em 1X RPM."));
body.push(Chart(
  { mode: "freq", xmax: 18, unit: "Ordens (x RPM do pinhão)", peaks: [{ order: 1, amp: 0.15 }, { order: 2, amp: 0.08 }, { order: 7, amp: 0.25 }, { order: 8, amp: 0.9 }, { order: 9, amp: 0.25 }, { order: 16, amp: 0.15 }] },
  "Cenário simulado — desgaste de engrenamento: GMF na 8ª ordem (nº de dentes do pinhão), com bandas laterais na rotação do pinhão."
));

body.push(Img("assets/img/20_folga_A_vs_C.png",
  "Figura 18.6 — Folga no engrenamento: comparação entre uma condição normal (A) e uma condição com folga excessiva (C), com série de harmônicos característica."));
body.push(Chart(
  { mode: "freq", xmax: 6.5, unit: "Ordens (x RPM)", peaks: [{ order: 0.5, amp: 0.25 }, { order: 1, amp: 0.7 }, { order: 1.5, amp: 0.3 }, { order: 2, amp: 0.55 }, { order: 2.5, amp: 0.2 }, { order: 3, amp: 0.4 }, { order: 4, amp: 0.3 }, { order: 5, amp: 0.22 }] },
  "Cenário simulado — folga no engrenamento: série completa de harmônicos e sub-harmônicos, semelhante à folga mecânica generalizada."
));

body.push(Img("assets/img/22_dente_quebrado_fo.png",
  "Figura 18.7 — Dente de engrenagem trincado ou quebrado: impacto nítido e repetitivo, um por volta do eixo com o dente danificado."));
body.push(Chart(
  { mode: "time", xmax: 0.6, unit: "Tempo (s)", peaks: [{ order: 0.0, amp: 0.9 }, { order: 0.2, amp: 0.9 }, { order: 0.4, amp: 0.9 }, { order: 0.6, amp: 0.9 }], width: 0.006 },
  "Cenário simulado — dente trincado: impacto periódico nítido na forma de onda no tempo, período igual a 1 volta do eixo danificado."
));

body.push(H2("18.3 Tabela-resumo: diferenciando rolamento, engrenagem e defeito elétrico"));
body.push(P("Os três tipos de defeito mais confundidos entre si na prática têm assinaturas que, quando comparadas lado a lado, ficam bem mais fáceis de distinguir:"));
body.push(Table(
  ["Sintoma no espectro", "Rolamento (Estágio 3+)", "Engrenagem (desgaste)", "Elétrico (barras do rotor)"],
  [
    ["Frequência central típica", "BPFO / BPFI / BSF (não síncrona, não inteira)", "GMF = nº de dentes × RPM", "1X (RPM do motor)"],
    ["Bandas laterais espaçadas em", "1X RPM do eixo", "1X do eixo modulador (pinhão ou coroa)", "2× frequência de polo (fp)"],
    ["Envelope de aceleração", "Muito elevado", "Baixo a moderado", "Normal"],
    ["Temperatura", "Pode subir em estágios avançados", "Pode subir com desgaste severo", "Tipicamente elevada"],
    ["Confirmação complementar", "Técnica de envelope (Módulo 7.5)", "Inspeção boroscópica / óleo", "Análise de corrente (MCSA)"],
  ]
));

const summary = [
  "Os quatro estágios de falha de rolamento têm assinaturas espectrais completamente diferentes — do envelope isolado (Estágio 1) ao ruído de banda larga dominante (Estágio 4).",
  "Defeitos de engrenagem se manifestam de três formas principais: desgaste (bandas na GMF), folga (harmônicos/sub-harmônicos) e dente trincado (impacto periódico na forma de onda).",
  "Rolamento, engrenagem e defeito elétrico podem ser confundidos entre si — a tabela-resumo compara os quatro critérios mais úteis para diferenciá-los rapidamente em campo.",
];

const quizzes = [{
  title: "Fixação — Galeria de Falhas",
  questions: [
    "Em qual estágio de falha de rolamento o defeito só é detectável pelo envelope de aceleração, sem alteração perceptível em velocidade ou aceleração pura?",
    "Que padrão no espectro indica desgaste progressivo num engrenamento, e em que ordem (múltiplo de RPM) ele aparece?",
    "Como diferenciar, pela leitura do envelope de aceleração, um defeito de rolamento avançado de um defeito elétrico nas barras do rotor?",
  ],
  answers: [
    "Estágio 1 — o defeito é submicroscópico e libera energia de impacto em frequência alta demais para aparecer em velocidade/aceleração pura; só o envelope de aceleração demodula essa energia.",
    "A frequência de engrenamento (GMF), na ordem igual ao número de dentes do componente modulador (pinhão ou coroa), cercada por bandas laterais espaçadas na rotação desse mesmo eixo.",
    "No defeito de rolamento avançado, o envelope de aceleração fica muito elevado; no defeito elétrico de barras do rotor, o envelope permanece normal, mesmo com bandas laterais visíveis em 1X — a origem ali é elétrica, não mecânica.",
  ],
}];

const newModule = {
  id: "m18",
  title: "Módulo 18 — Galeria de Falhas: Rolamentos e Redutores em Detalhe",
  body,
  quizzes,
  summary,
  meta: { num: "17", short: "Galeria de Falhas: Rolamentos e Redutores", level: "avançado" },
  videoUrl: null,
};

// Inserir logo antes do módulo de Glossário (m17), mantendo os módulos do
// mesmo nível ("avançado") agrupados de forma contígua na barra lateral.
const glossaryIdx = COURSE.findIndex((m) => m.id === "m17");
if (glossaryIdx === -1) {
  COURSE.push(newModule);
} else {
  COURSE.splice(glossaryIdx, 0, newModule);
  COURSE[glossaryIdx + 1].meta.num = "18"; // renumera o Glossário para 18
}

fs.writeFileSync(
  CONTENT_PATH,
  "// Gerado automaticamente por scripts/build_site.js + scripts/inject_charts.js + scripts/inject_summaries.js + scripts/add_module18.js — não editar manualmente.\nconst COURSE = " +
    JSON.stringify(COURSE) +
    ";\n"
);

console.log("Módulo 18 (Galeria de Falhas) adicionado. Total de módulos:", COURSE.length);
