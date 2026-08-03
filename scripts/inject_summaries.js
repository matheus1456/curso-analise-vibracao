// scripts/inject_summaries.js
// Passo de pós-processamento (como scripts/inject_charts.js) que adiciona um
// campo `summary` (array de pontos-chave) a cada módulo em data/content.js.
// O resumo é renderizado pelo app.js como uma caixa "📌 Resumo do módulo",
// posicionada logo antes dos exercícios de fixação (quizzes).
//
// Uso (sempre depois de build_site.js e inject_charts.js):
//   node scripts/build_site.js
//   node scripts/inject_charts.js
//   node scripts/inject_summaries.js
const fs = require("fs");
const path = require("path");

const CONTENT_PATH = path.join(__dirname, "..", "data", "content.js");
const src = fs.readFileSync(CONTENT_PATH, "utf-8");
const jsonStr = src.slice(src.indexOf("["), src.lastIndexOf("]") + 1);
const COURSE = JSON.parse(jsonStr);

const SUMMARIES = {
  m0: [
    "Amplitude, frequência e fase são as três características básicas de qualquer vibração — a mesma lógica do pneu desbalanceado de um carro.",
    "Amplitude pode ser expressa em pico, pico a pico ou RMS — RMS é a mais usada para severidade porque representa a energia média do sinal.",
    "Frequência pode ser expressa em Hz, CPM ou ordens (múltiplos da rotação) — ordens são a unidade mais útil para diagnóstico.",
    "dB é uma escala logarítmica de razão de amplitude, comum em relatórios de ruído e em alguns equipamentos de aquisição.",
  ],
  m1: [
    "A manutenção evoluiu de corretiva (1ª geração) para preventiva (2ª geração) e para preditiva/baseada em condição (3ª geração).",
    "O Engenheiro de Confiabilidade atua na fronteira entre manutenção, operação e engenharia, com foco em causa raiz, não só em sintomas.",
    "Este curso segue uma progressão do básico (conceitos e normas) ao avançado (balanceamento, alinhamento, estudos de caso integrados).",
  ],
  m2: [
    "Deslocamento, velocidade e aceleração são as três grandezas de medição — cada uma é mais sensível a uma faixa de frequência diferente.",
    "A FFT converte um sinal no tempo em um espectro de frequências, que é a principal ferramenta de diagnóstico em análise de vibração.",
    "Fmax e a resolução espectral (linhas de FFT) precisam ser escolhidos com cuidado para não perder informação nem gerar aliasing.",
    "Velocidade e aceleração podem ser convertidas entre si matematicamente, mas cada uma é preferida em faixas de frequência diferentes.",
  ],
  m3: [
    "Sensores de proximidade medem deslocamento relativo eixo-mancal; velocímetros e acelerômetros medem vibração absoluta da carcaça.",
    "Acelerômetros piezoelétricos são o sensor mais usado hoje, cobrindo uma ampla faixa de frequência com boa robustez.",
    "A frequência natural do conjunto sensor + suporte de montagem limita a faixa útil de medição — uma má fixação pode mascarar defeitos reais.",
    "O ponto e a direção de medição (radial horizontal, radial vertical, axial) devem ser padronizados para permitir comparação histórica confiável.",
  ],
  m4: [
    "A família ISO 10816 define zonas de severidade (A, B, C, D) para avaliar a condição de uma máquina a partir da vibração global.",
    "Cada parte da norma (10816-2 a 10816-7) se aplica a um tipo/porte de máquina diferente, com limites numéricos próprios.",
    "ALARME normalmente corresponde ao limite superior da Zona B/C, e TRIP ao limite superior da Zona C/D — mas isso deve ser ajustado ao histórico real da máquina.",
  ],
  m5: [
    "Ler um espectro é um processo sistemático: identificar 1X, procurar harmônicos, depois bandas laterais, depois ruído de banda larga.",
    "Bandas laterais são picos simétricos ao redor de uma frequência central, espaçados na frequência de modulação — a chave para diagnósticos avançados.",
    "A resolução espectral (número de linhas de FFT) determina se bandas laterais próximas conseguem ser distinguidas ou aparecem como um único pico borrado.",
  ],
  m6: [
    "Desbalanceamento: 1X dominante, radial, fase estável — o defeito mais comum e mais fácil de corrigir (balanceamento de campo).",
    "Desalinhamento: 2X dominante (axial no caso angular, radial no caso paralelo), com diferença de fase característica através do acoplamento.",
    "Folga mecânica: série completa de harmônicos e sub-harmônicos (0,5X, 1,5X...), fase instável, forma de onda truncada.",
    "Eixo empenado, rotor excêntrico, ressonância e batimento têm assinaturas próprias, todas cobertas com exemplos de espectro nesta seção.",
  ],
  m7: [
    "Cada elemento do rolamento (pista externa, pista interna, esfera/rolo, gaiola) tem uma frequência característica própria: BPFO, BPFI, BSF, FTF.",
    "A falha de rolamento evolui em quatro estágios — do submicroscópico (Estágio 1, só visível no envelope) até a falha iminente (Estágio 4).",
    "A técnica de envelope de aceleração demodula os impactos de altíssima frequência, detectando o defeito muito antes da velocidade de vibração reagir.",
  ],
  m8: [
    "Um engrenamento saudável tem GMF (frequência de engrenamento) com amplitude baixa e estável, sem bandas laterais significativas.",
    "Bandas laterais ao redor da GMF, espaçadas na rotação de um dos eixos, indicam folga, desalinhamento ou excentricidade associada àquele eixo.",
    "A amplitude da GMF cair com o aumento de carga é um indício típico de folga no engrenamento, não de dente trincado.",
  ],
  m9: [
    "Correias frouxas, gastas ou desiguais geram picos não síncronos (não múltiplos inteiros de 1X), tipicamente em 2× a frequência da correia.",
    "A amplitude desses picos costuma ser instável, pulsando com a rotação do equipamento acionado — diferente de um defeito fixo no eixo.",
    "Sempre trocar o jogo completo de correias, nunca uma unidade isolada, para manter tensão e desgaste uniformes.",
  ],
  m10: [
    "Barras de rotor quebradas em motores de indução geram bandas laterais ao redor de 1X, espaçadas na frequência de polo (fp).",
    "O escorregamento (diferença entre rotação síncrona e real) é a base do cálculo das frequências de polo e de escorregamento.",
    "A análise de corrente do motor (MCSA) é o método complementar recomendado para confirmar defeitos elétricos do rotor.",
  ],
  m11: [
    "A frequência de passagem de pás (BPF = nº de pás × RPM) é a assinatura normal de bombas, ventiladores e compressores — o problema é quando ela é amplificada.",
    "BPF coincidindo com uma frequência natural da estrutura (ressonância) é uma causa comum de amplitude anormalmente alta, mesmo sem defeito real do rotor.",
    "Cavitação por NPSH insuficiente gera ruído aleatório de banda larga sobreposto ao BPF, que varia com a condição de sucção (não é um defeito mecânico fixo).",
  ],
  m12: [
    "A forma de onda no tempo revela impactos, truncamentos e batimentos que o espectro sozinho pode mascarar ou diluir.",
    "A análise de fase compara o movimento relativo entre pontos da máquina, sendo essencial para diferenciar desbalanceamento de desalinhamento e eixo empenado.",
    "Órbitas (medidas por sensores de proximidade XY) mostram o caminho real do eixo dentro do mancal, úteis em máquinas com mancais hidrodinâmicos.",
  ],
  m13: [
    "Um programa de monitoramento de condição eficaz exige padronização de pontos, direções e unidades de medição entre coletas.",
    "Rotas e periodicidade devem ser definidas conforme a criticidade de cada máquina — não é preciso medir tudo com a mesma frequência.",
    "Baseline e alarmes devem ser calibrados com o histórico real da máquina, não apenas com os limites genéricos da norma.",
  ],
  m14: [
    "O balanceamento de campo em um plano corrige desbalanceamento residual sem precisar levar o rotor a uma bancada de balanceamento.",
    "O método usa vetores (amplitude e fase) de antes e depois de um peso de teste conhecido para calcular a massa e o ângulo de correção.",
    "Cuidados práticos incluem garantir repetibilidade da medição de fase e não exceder o peso de teste recomendado pelo fabricante.",
  ],
  m15: [
    "Desalinhamento tem dois componentes independentes: offset paralelo (radial) e desvio angular — ambos precisam ser corrigidos.",
    "Métodos modernos de alinhamento a laser são mais precisos que réguas e relógios comparadores, especialmente para desvios pequenos.",
    "O cálculo da correção em calços (shims) usa a geometria dos pés da máquina e as leituras de desvio nos dois planos.",
  ],
  m16: [
    "Os 10 estudos de caso integram tudo o que foi visto nos módulos anteriores: leitura de espectro, cálculo de frequências características e decisão de ação.",
    "Cada caso segue o mesmo raciocínio: dados de campo → hipóteses → confirmação pela assinatura espectral → diagnóstico → ação recomendada.",
    "Os gráficos dinâmicos inseridos nos casos reproduzem os mesmos espectros usados na página de Prática de Diagnóstico, para reforçar o aprendizado.",
  ],
  m17: [
    "O glossário técnico reúne, em ordem alfabética, todos os termos e siglas usados ao longo do curso (BPFO, GMF, RMS, Zonas ISO, etc.).",
    "Use esta seção como referência rápida sempre que encontrar uma sigla ou termo técnico que não lembre o significado exato.",
  ],
};

let updated = 0;
COURSE.forEach((m) => {
  if (SUMMARIES[m.id]) { m.summary = SUMMARIES[m.id]; updated++; }
});

fs.writeFileSync(
  CONTENT_PATH,
  "// Gerado automaticamente por scripts/build_site.js + scripts/inject_charts.js + scripts/inject_summaries.js — não editar manualmente.\nconst COURSE = " +
    JSON.stringify(COURSE) +
    ";\n"
);

console.log("Resumos inseridos em", updated, "módulos.");
