const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  ImageRun, PageBreak, TableOfContents, Header, Footer, PageNumber,
  LevelFormat, convertInchesToTwip, VerticalAlign
} = require("docx");

const IMG = "/tmp/imgs/";

// ---------- helpers ----------
function H1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, pageBreakBefore: true, spacing: { after: 200 } });
}
function H2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 } });
}
function H3(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } });
}
function P(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 160, line: 276 },
    children: [new TextRun({ text, ...opts })],
  });
}
function PB(runsArr) {
  // paragraph from array of {text, bold, italics, color}
  return new Paragraph({
    spacing: { after: 160, line: 276 },
    children: runsArr.map(r => new TextRun(r)),
  });
}
function Bullet(text, level = 0) {
  return new Paragraph({
    text,
    bullet: { level },
    spacing: { after: 90 },
  });
}
function NumberedNote(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, italics: true, color: "555555" })],
  });
}
function Quote(text) {
  return new Paragraph({
    spacing: { after: 160, before: 80 },
    indent: { left: 400 },
    border: { left: { color: "1F5FA8", space: 8, style: BorderStyle.SINGLE, size: 12 } },
    children: [new TextRun({ text, italics: true })],
  });
}
function Img(fname, widthPx = 560, caption = "") {
  const data = fs.readFileSync(IMG + fname);
  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 150, after: 60 },
      children: [new ImageRun({ data, transformation: { width: widthPx, height: Math.round(widthPx * 0.51) }, type: "png", imgFile: fname })],
    }),
  ];
  if (caption) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: caption, italics: true, size: 18, color: "555555" })],
    }));
  }
  return children;
}

function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width || 2000, type: WidthType.DXA },
    shading: opts.header ? { fill: "1F5FA8", type: ShadingType.CLEAR } : (opts.shade ? { fill: "EAF1FA", type: ShadingType.CLEAR } : undefined),
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      children: [new TextRun({ text, bold: !!opts.header, color: opts.header ? "FFFFFF" : "000000", size: opts.size || 20 })],
    })],
  });
}
function simpleTable(headerRow, rows, colWidths) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headerRow.map((h, i) => cell(h, { header: true, width: colWidths[i], center: true })),
      }),
      ...rows.map((r, ri) => new TableRow({
        children: r.map((c, i) => cell(c, { width: colWidths[i], center: i > 0, shade: ri % 2 === 1 })),
      })),
    ],
  });
}

function exerciseBlock(title, questions, answers) {
  const out = [];
  out.push(H3("Exercícios de fixação — " + title));
  questions.forEach((q, i) => out.push(P(`${i + 1}. ${q}`)));
  out.push(new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "Gabarito comentado", bold: true, color: "1F5FA8" })],
  }));
  answers.forEach((a, i) => out.push(P(`${i + 1}. ${a}`, { italics: false })));
  return out;
}

// ============================================================
// DOCUMENT CONTENT
// ============================================================

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22 } },
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 34, bold: true, color: "1F5FA8", font: "Calibri" },
        paragraph: { spacing: { before: 0, after: 240 }, border: { bottom: { color: "1F5FA8", space: 4, style: BorderStyle.SINGLE, size: 12 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 27, bold: true, color: "1F5FA8" } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 23, bold: true, color: "B5462A" } },
    ],
  },
  sections: [],
});

const sections = [];

// ---------- COVER ----------
sections.push({
  properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
  children: [
    new Paragraph({ spacing: { before: 2000 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "ANÁLISE DE VIBRAÇÃO EM MÁQUINAS ROTATIVAS", bold: true, size: 52, color: "1F5FA8" })] }),
    new Paragraph({ spacing: { before: 300 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Formação Técnica para Engenheiros de Confiabilidade", size: 30, color: "333333" })] }),
    new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Fundamentos físicos, instrumentação, normas ISO 10816 e diagnóstico prático por análise espectral", size: 22, italics: true, color: "555555" })] }),
    new Paragraph({ spacing: { before: 2000 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Curso completo com exemplos de espectros, estudos de caso e exercícios comentados", size: 20, color: "555555" })] }),
  ],
});

// ---------- SUMÁRIO ----------
sections.push({
  properties: {},
  children: [
    new Paragraph({ text: "Sumário", heading: HeadingLevel.HEADING_1, spacing: { after: 240 } }),
    new TableOfContents("Sumário", { hyperlink: true, headingStyleRange: "1-3" }),
  ],
});

// ============================================================
// MÓDULO 1
// ============================================================
let m1 = [];
m1.push(H1("Módulo 1 — Manutenção, Confiabilidade e o Papel do Analista de Vibração"));
m1.push(P("Este curso forma o Engenheiro de Confiabilidade para uma das competências mais valorizadas na manutenção industrial: diagnosticar o estado de saúde de máquinas rotativas através da análise de suas vibrações. Antes de entrar na física e na matemática do sinal vibratório, é preciso entender por que essa disciplina existe e qual é o papel do profissional que a pratica dentro de uma estratégia de confiabilidade."));

m1.push(H2("1.1 As três gerações da manutenção"));
m1.push(P("A manutenção industrial evoluiu em três estratégias principais, e entender essa evolução ajuda a justificar por que a análise de vibração é hoje uma ferramenta central."));
m1.push(Bullet("Manutenção corretiva — o equipamento opera até falhar. É a forma mais antiga e mais cara: gera paradas não programadas, perda de produção, danos secundários e risco à segurança."));
m1.push(Bullet("Manutenção preventiva — as intervenções seguem um calendário fixo, baseado na vida média estatística dos componentes. Reduz quebras inesperadas, mas troca peças que ainda tinham vida útil, além de introduzir o risco de falhas causadas pela própria intervenção (erro de montagem, por exemplo)."));
m1.push(Bullet("Manutenção preditiva (ou por condição) — a intervenção é decidida a partir da condição real do equipamento, medida por técnicas como análise de vibração, termografia, análise de óleo e ferrografia. É a estratégia mais econômica e mais segura, pois cada máquina é tratada de acordo com sua própria condição, evitando tanto a quebra quanto a troca desnecessária de componentes."));
m1.push(P("A análise de vibração é, entre as técnicas preditivas, a que oferece a melhor relação custo-benefício para máquinas rotativas, porque a vibração é o sintoma mais precoce e mais rico em informação sobre praticamente todos os defeitos mecânicos: desbalanceamento, desalinhamento, folgas, defeitos em rolamentos, engrenagens, problemas elétricos e efeitos hidráulicos/aerodinâmicos."));

m1.push(H2("1.2 O que se espera de um Engenheiro de Confiabilidade"));
m1.push(P("Um profissional formado nesta trilha deve ser capaz de:"));
m1.push(Bullet("Planejar um programa de monitoramento (rotas, pontos, periodicidade, parâmetros)."));
m1.push(Bullet("Coletar dados corretamente, com o sensor certo, no ponto certo e com as configurações de aquisição adequadas."));
m1.push(Bullet("Avaliar a severidade da vibração segundo normas internacionais (família ISO 10816)."));
m1.push(Bullet("Ler e interpretar espectros (FFT), formas de onda no tempo e, quando necessário, fase e órbitas."));
m1.push(Bullet("Diagnosticar a causa raiz do problema — não apenas dizer que \"a máquina vibra muito\", mas apontar se é desbalanceamento, desalinhamento, rolamento, engrenagem, folga, problema elétrico, etc."));
m1.push(Bullet("Recomendar a ação corretiva (balanceamento, alinhamento, troca de rolamento, correção de folga) e priorizar a intervenção dentro do plano de manutenção."));
m1.push(Bullet("Documentar e comunicar o diagnóstico de forma clara para engenharia, operação e gestão."));
m1.push(Quote("Referência de currículo internacional: o padrão ISO 18436-2 (adotado por certificadoras como o Mobius Institute) organiza a formação de analistas em Categorias I, II e III, começando pelos fundamentos físicos e avançando até diagnóstico avançado, balanceamento e alinhamento. Este curso segue uma lógica equivalente."));

m1.push(H2("1.3 Estrutura deste curso"));
m1.push(P("O curso está organizado em dezoito módulos (0 a 17), do nível básico ao avançado: começa com uma revisão de conceitos e matemática elementar (Módulo 0), progride pelos fundamentos físicos e normativos, aprofunda-se no diagnóstico por espectro com fartura de exemplos numéricos, avança para as competências de correção (balanceamento e alinhamento) e termina com dez estudos de caso integrados e um glossário técnico de referência. Cada módulo termina com exercícios de fixação e gabarito comentado."));
m1.push(Bullet("Módulo 0 — Nível básico: conceitos e matemática elementar (RMS, pico, frequência, ordens)"));
m1.push(Bullet("Módulo 2 — Fundamentos físicos da vibração (grandezas, frequência, forma de onda, FFT) — com exemplos numéricos"));
m1.push(Bullet("Módulo 3 — Sensores e instrumentação"));
m1.push(Bullet("Módulo 4 — Normas internacionais ISO 10816 (Partes 1, 2, 3, 4, 5 e 7)"));
m1.push(Bullet("Módulo 5 — Metodologia de análise espectral (harmônicos, ordens, bandas laterais, resolução) — com exemplos numéricos"));
m1.push(Bullet("Módulo 6 — Catálogo de falhas por espectro: desbalanceamento (com subtipos), desalinhamento, folga, eixo empenado, excentricidade, ressonância, batimento"));
m1.push(Bullet("Módulo 7 — Rolamentos: cálculo de BPFO/BPFI/BSF/FTF, estágios de falha e técnica de envelope"));
m1.push(Bullet("Módulo 8 — Engrenagens, com exemplo de forma de onda de dente quebrado"));
m1.push(Bullet("Módulo 9 — Correias e transmissões, com cálculo de frequência de correia"));
m1.push(Bullet("Módulo 10 — Máquinas elétricas, incluindo barras de rotor quebradas"));
m1.push(Bullet("Módulo 11 — Bombas, ventiladores e compressores, incluindo ressonância de BPF"));
m1.push(Bullet("Módulo 12 — Forma de onda no tempo, fase e órbitas"));
m1.push(Bullet("Módulo 13 — Programa de monitoramento de condição"));
m1.push(Bullet("Módulo 14 — Balanceamento de campo em um plano (nível avançado, com exemplo numérico completo)"));
m1.push(Bullet("Módulo 15 — Alinhamento de eixos (nível avançado, com cálculo de calços)"));
m1.push(Bullet("Módulo 16 — Dez estudos de caso integrados, do básico ao avançado"));
m1.push(Bullet("Módulo 17 — Glossário técnico de referência"));

m1.push(...exerciseBlock("Módulo 1",
  [
    "Cite as três estratégias clássicas de manutenção e explique a principal desvantagem de cada uma.",
    "Por que a análise de vibração costuma ser a técnica preditiva de melhor custo-benefício para máquinas rotativas?",
    "Liste três competências que um Engenheiro de Confiabilidade deve ter além de \"ler o espectro\"."
  ],
  [
    "Corretiva (opera até quebrar — alto custo e risco); Preventiva (intervenção por calendário — troca peças com vida útil restante e pode introduzir falhas na intervenção); Preditiva (intervenção pela condição real — exige instrumentação e capacitação técnica, mas é a mais econômica e segura).",
    "Porque a vibração é sintoma precoce e presente na quase totalidade dos defeitos mecânicos de máquinas rotativas (desbalanceamento, desalinhamento, folgas, rolamentos, engrenagens, elétrico, hidráulico/aerodinâmico), permitindo diagnóstico de causa raiz com um único conjunto de medições.",
    "Planejar rotas e pontos de medição; selecionar e configurar corretamente a instrumentação; aplicar critérios normativos de severidade (ISO 10816); diagnosticar causa raiz; recomendar e priorizar ações corretivas; comunicar o diagnóstico de forma clara para diferentes públicos."
  ]));

// ============================================================
// MÓDULO 2 — FUNDAMENTOS FÍSICOS
// ============================================================
let m2 = [];
m2.push(H1("Módulo 2 — Fundamentos Físicos da Vibração"));
m2.push(P("Vibração é o movimento oscilatório de um corpo em torno de uma posição de referência (equilíbrio). Em máquinas rotativas, esse movimento é gerado por forças dinâmicas — desbalanceamento residual do rotor, forças de engrenamento, impactos de rolamentos, forças eletromagnéticas, forças de fluido — que excitam a estrutura da máquina. O objetivo da análise de vibração é medir esse movimento e, a partir de suas características (amplitude, frequência e fase), inferir qual força está causando a vibração e qual é a sua severidade."));

m2.push(H2("2.1 Grandezas de medição: deslocamento, velocidade e aceleração"));
m2.push(P("Um mesmo movimento vibratório pode ser expresso por três grandezas relacionadas entre si pela derivada no tempo:"));
m2.push(Bullet("Deslocamento (µm) — a amplitude do movimento. É sensível a vibrações de baixa frequência e é a grandeza mais usada em medições de vibração relativa de eixo (proximity probes) em máquinas com mancais de filme de óleo."));
m2.push(Bullet("Velocidade (mm/s) — proporcional à energia da vibração. É a grandeza mais usada para avaliação de severidade em banda larga (10 Hz a 1000 Hz), pois representa bem o \"potencial destrutivo\" da vibração em uma ampla faixa de frequências — é a base da família de normas ISO 10816."));
m2.push(Bullet("Aceleração (m/s² ou \"g\") — proporcional à força dinâmica envolvida. É sensível a vibrações de alta frequência, por isso é a grandeza preferida para detectar impactos de curtíssima duração, como os gerados por defeitos em rolamentos e engrenagens."));
m2.push(P("Matematicamente, para uma vibração senoidal pura de frequência f, a relação entre as três grandezas é:"));
m2.push(Quote("Aceleração = (2πf) × Velocidade;      Velocidade = (2πf) × Deslocamento"));
m2.push(P("Essa relação mostra por que, na prática, a mesma amplitude de deslocamento gera aceleração cada vez maior conforme a frequência aumenta. Por isso a escolha da grandeza de medição deve considerar a faixa de frequência do fenômeno que se quer detectar: baixa frequência → deslocamento; faixa média (severidade geral) → velocidade; alta frequência (rolamentos, engrenagens) → aceleração (ou técnicas derivadas, como o envelope, vistas no Módulo 7)."));

m2.push(H2("2.2 Frequência e sua relação com a rotação da máquina"));
m2.push(P("A frequência (Hz, ciclos por segundo, ou CPM, ciclos por minuto) é a informação mais importante do sinal de vibração, pois é ela que aponta a fonte do problema. Na análise de máquinas rotativas, é convenção normalizar as frequências em relação à velocidade de rotação do eixo, chamada de 1X RPM (ou simplesmente 1X). Assim, fala-se em \"ordens\" de rotação:"));
m2.push(Bullet("1X — frequência de rotação do eixo. Aparece em quase todo espectro; seu domínio absoluto costuma indicar desbalanceamento."));
m2.push(Bullet("2X, 3X, 4X... — harmônicos da rotação, múltiplos inteiros de 1X. Aparecem por desalinhamento, folga, eixo empenado, entre outros."));
m2.push(Bullet("0,5X, 1,5X, 2,5X... — sub-harmônicos e ordens fracionárias, associados tipicamente a folga mecânica ou instabilidade de filme de óleo."));
m2.push(Bullet("Frequências não síncronas — não são múltiplos de 1X; correspondem a fenômenos com \"relógio próprio\", como frequências de defeito de rolamento (BPFO, BPFI, BSF, FTF), frequência de engrenamento (GMF) e frequência de passagem de pás (BPF)."));
m2.push(P("Trabalhar em ordens (em vez de Hz) tem uma vantagem prática enorme: o mesmo padrão de defeito produz o mesmo espectro em ordens, independentemente da velocidade real da máquina, o que padroniza a interpretação entre equipamentos diferentes."));

m2.push(H2("2.3 Forma de onda no tempo"));
m2.push(P("A forma de onda no tempo é o registro bruto da vibração — amplitude em função do tempo, sem qualquer transformação. É o dado \"mais verdadeiro\" que existe, mas também o mais difícil de interpretar a olho nu quando o sinal é uma mistura de várias frequências, como é o caso quase sempre em máquinas reais. Ainda assim, a forma de onda no tempo é indispensável para confirmar impactos (dente de engrenagem quebrado, rolamento severamente danificado), truncamentos (folga tipo C) e para medir diretamente o tempo entre eventos repetitivos."));

m2.push(H2("2.4 A Transformada Rápida de Fourier (FFT) e o espectro"));
m2.push(P("O matemático francês Jean-Baptiste Fourier demonstrou que qualquer sinal periódico complexo pode ser decomposto na soma de senoides simples, cada uma com sua própria frequência, amplitude e fase. A FFT (Fast Fourier Transform) é o algoritmo que faz essa decomposição de forma computacionalmente eficiente, convertendo o sinal do domínio do tempo para o domínio da frequência."));
m2.push(P("O resultado é o espectro (ou espectro de frequência): um gráfico onde o eixo horizontal é a frequência (ou ordem) e o eixo vertical é a amplitude de cada componente senoidal presente no sinal. É a principal ferramenta de diagnóstico do analista de vibração, porque cada tipo de defeito produz uma \"assinatura\" característica no espectro — um conjunto específico de picos em frequências específicas. É exatamente esse mapeamento entre padrão espectral e causa física que será estudado em detalhe a partir do Módulo 5."));

m2.push(H2("2.5 Parâmetros de aquisição que todo analista precisa entender"));
m2.push(Bullet("Fmax (frequência máxima analisada) — deve ser escolhida para cobrir, com folga, a frequência mais alta de interesse diagnóstico (por exemplo, harmônicos altos de GMF ou BPFO)."));
m2.push(Bullet("Resolução (número de linhas do espectro / Δf) — determina a capacidade de separar picos próximos, como bandas laterais coladas à GMF. Resolução insuficiente \"borra\" picos vizinhos em um só."));
m2.push(Bullet("Janelamento (windowing) — reduz o vazamento espectral (leakage) causado por sinais não perfeitamente periódicos dentro do tempo de aquisição; a janela Hanning é a mais usada em monitoramento de rotina."));
m2.push(Bullet("Médias (averaging) — lineares (para reduzir ruído aleatório), com sobreposição (overlap, para acelerar a coleta) ou de retenção de pico (peak hold, para capturar eventos transitórios)."));
m2.push(P("Esses parâmetros não são apenas \"configuração de equipamento\": uma escolha errada pode mascarar completamente um defeito real ou criar falsos positivos. Um Engenheiro de Confiabilidade experiente sempre revisa a configuração de aquisição antes de confiar em um diagnóstico."));

m2.push(H2("2.6 Exemplos numéricos resolvidos"));
m2.push(H3("Exemplo 1 — Escolhendo Fmax e evitando aliasing"));
m2.push(P("Um redutor tem GMF calculada em 1240 Hz e você quer visualizar, com folga, ao menos o segundo harmônico da GMF (2×GMF). Que Fmax mínimo deve ser configurado?"));
m2.push(Quote("2 × GMF = 2 × 1240 = 2480 Hz. Por segurança e para deixar margem visual acima do pico de interesse,\numa escolha típica seria Fmax ≈ 3000 a 3200 Hz (cerca de 1,25× o valor mínimo necessário)."));
m2.push(P("Regra prática: o Fmax deve sempre superar com folga (25% a 30%, tipicamente) a frequência mais alta de interesse diagnóstico — nunca configure o Fmax exatamente no valor do pico que você quer ver, pois ele ficará espremido na borda direita do gráfico e picos ainda mais altos (que poderiam indicar problemas) ficarão de fora da medição."));
m2.push(H3("Exemplo 2 — Convertendo velocidade para aceleração"));
m2.push(P("Uma vibração senoidal pura de 90 Hz tem 3,0 mm/s RMS de velocidade. Qual é a aceleração RMS equivalente, em m/s²?"));
m2.push(Quote("Aceleração = (2πf) × Velocidade = (2π × 90) × 0,003 m/s = 565,5 × 0,003 ≈ 1,70 m/s² RMS\n(equivalente a aproximadamente 0,17 g RMS, considerando 1 g ≈ 9,81 m/s²)"));
m2.push(P("Note como a mesma vibração \"pesa\" muito mais em termos de aceleração à medida que a frequência sobe — é exatamente por isso que a aceleração é a grandeza mais sensível para revelar defeitos de alta frequência, como os de rolamentos e engrenagens (Módulos 7 e 8)."));
m2.push(H3("Exemplo 3 — Identificando a ordem de um pico"));
m2.push(P("Uma bomba opera a 1770 rpm. O espectro mostra um pico bem definido em 106,2 Hz. A que ordem esse pico corresponde, e que hipótese diagnóstica inicial isso sugere?"));
m2.push(Quote("1X = 1770 ÷ 60 = 29,5 Hz\nOrdem = 106,2 ÷ 29,5 ≈ 3,6X RPM"));
m2.push(P("Uma ordem não inteira como 3,6X não corresponde a um harmônico simples da rotação — é característica de uma frequência de defeito de rolamento (BPFO, BPFI ou BSF, ver Módulo 7) ou de outra fonte não síncrona. O próximo passo seria comparar 3,6X com as frequências de defeito calculadas para o rolamento específico instalado naquele ponto."));

m2.push(...exerciseBlock("Módulo 2",
  [
    "Uma máquina de 3000 RPM apresenta pico dominante em 50 Hz. A que ordem de rotação (xRPM) isso corresponde e o que isso sugere preliminarmente?",
    "Por que a aceleração é a grandeza preferida para detectar defeitos de rolamento, e a velocidade é preferida para severidade geral em banda larga?",
    "O que é \"leakage\" (vazamento espectral) e qual recurso de aquisição é usado para reduzi-lo?"
  ],
  [
    "3000 RPM = 50 Hz de rotação (1X). Logo, 50 Hz = 1X exatamente, sugerindo desbalanceamento como hipótese inicial (a ser confirmada por fase e demais evidências).",
    "Defeitos de rolamento geram impactos de curtíssima duração cujo conteúdo de energia está concentrado em altas frequências — a aceleração amplifica esses componentes (A = 2πf·V), tornando-os visíveis. Já a severidade geral da máquina, historicamente correlacionada com energia vibratória e dano por fadiga em uma ampla faixa de frequência, é bem representada pela velocidade RMS, base das normas ISO 10816.",
    "É a distorção espectral que ocorre quando o sinal capturado não é um número inteiro de ciclos dentro da janela de tempo de aquisição, espalhando energia de um pico ao redor de sua frequência real. É reduzido aplicando uma função de janelamento (janela), sendo a Hanning a mais comum em monitoramento de rotina."
  ]));

// ============================================================
// MÓDULO 3 — SENSORES
// ============================================================
let m3 = [];
m3.push(H1("Módulo 3 — Sensores e Instrumentação"));
m3.push(P("A qualidade de qualquer diagnóstico depende diretamente da qualidade do dado coletado. Este módulo cobre os três tipos de transdutores usados em análise de vibração industrial, suas faixas de aplicação e cuidados de montagem."));

m3.push(H2("3.1 Tipos de transdutores"));
m3.push(H3("Sensores de proximidade (proximity probes / eddy current)"));
m3.push(P("Medem o deslocamento relativo entre o eixo (rotor) e o sensor, fixado na carcaça do mancal — não tocam o eixo. São a escolha padrão em máquinas críticas com mancais de filme de óleo (turbinas, compressores centrífugos, grandes motores/geradores), onde o movimento relevante é o do eixo dentro da folga do mancal. Faixa útil: DC até poucos kHz."));
m3.push(H3("Sensores de velocidade (velocímetros / \"velocity pickups\")"));
m3.push(P("Sensores eletromecânicos (bobina/ímã) que geram sinal proporcional à velocidade absoluta da carcaça. Foram o padrão histórico de monitoramento de rotina, hoje amplamente substituídos por acelerômetros com integração eletrônica, por serem mais robustos e de faixa de frequência mais ampla."));
m3.push(H3("Acelerômetros piezoelétricos"));
m3.push(P("São o sensor mais usado atualmente para monitoramento em carcaça/mancal (vibração absoluta). Um cristal piezoelétrico gera carga elétrica proporcional à aceleração. Faixa de frequência tipicamente de poucos Hz até dezenas de kHz — por isso são a base para detectar defeitos de alta frequência em rolamentos e engrenagens, inclusive por meio de técnicas de demodulação/envelope (Módulo 7)."));

m3.push(H2("3.2 Montagem do sensor e frequência natural do conjunto"));
m3.push(P("Todo sensor + método de fixação tem uma frequência natural de montagem. Acima dela, a resposta deixa de ser confiável. Em ordem decrescente de rigidez (e de faixa de frequência útil):"));
m3.push(Bullet("Rosca fixa (stud) diretamente na carcaça — melhor fixação, maior faixa de frequência útil (recomendada para medições de alta frequência / envelope)."));
m3.push(Bullet("Base magnética plana — prática para rotas manuais, mas reduz a faixa de frequência útil em relação à fixação por rosca."));
m3.push(Bullet("Ponta de prova manual (\"stinger\") — a mais flexível, adequada apenas para triagem rápida em baixa frequência, nunca para diagnóstico fino de rolamentos."));
m3.push(P("Regra prática: quanto mais alta a frequência que se quer captar (por exemplo, defeitos incipientes de rolamento), mais rígida deve ser a fixação do sensor."));

m3.push(H2("3.3 Seleção do ponto e direção de medição"));
m3.push(P("A ISO 10816-1 recomenda medições nos mancais (ou pedestais), em até três direções mutuamente perpendiculares: horizontal e vertical (radiais) e axial. Para monitoramento de rotina, geralmente basta uma ou duas direções radiais, complementadas por uma medição axial — especialmente importante em mancais de escora, onde forças axiais dinâmicas são relevantes (por exemplo, no diagnóstico de desalinhamento angular, tratado no Módulo 6)."));

m3.push(...exerciseBlock("Módulo 3",
  [
    "Para monitorar uma turbina a vapor de grande porte com mancais de filme de óleo, qual sensor é o mais indicado para acompanhar o movimento relativo do eixo, e por quê?",
    "Por que a fixação do acelerômetro por base magnética não é recomendada para diagnóstico fino de defeitos incipientes de rolamento?",
    "Cite as três direções de medição recomendadas pela ISO 10816-1 e diga em qual delas normalmente se detecta melhor o desalinhamento angular."
  ],
  [
    "Sensor de proximidade (eddy current), porque mede diretamente o deslocamento relativo entre o eixo e a carcaça do mancal — grandeza fisicamente relevante quando o eixo se move dentro da folga de um mancal de filme de óleo, situação em que a vibração absoluta da carcaça pode não representar bem o estado do rotor.",
    "Porque a base magnética reduz a frequência natural de montagem do sensor, limitando a faixa de frequência útil da medição — defeitos incipientes de rolamento geram energia em frequências altas que exigem fixação rígida (rosca/stud) para serem captados com fidelidade.",
    "Horizontal, vertical e axial. O desalinhamento angular é caracteristicamente identificado pela alta vibração axial no acoplamento."
  ]));

// ============================================================
// MÓDULO 4 — NORMAS ISO 10816
// ============================================================
let m4 = [];
m4.push(H1("Módulo 4 — Normas Internacionais ISO 10816: Critérios de Severidade"));
m4.push(P("A família de normas ISO 10816 (\"Mechanical vibration — Evaluation of machine vibration by measurements on non-rotating parts\") é a referência internacional para avaliar se o nível de vibração medido em uma máquina é aceitável, requer atenção ou indica risco de dano. A Parte 1 estabelece os princípios gerais; as demais partes trazem limites numéricos específicos por tipo de máquina."));

m4.push(H2("4.1 Os dois critérios de avaliação"));
m4.push(Bullet("Critério I — Magnitude de vibração: compara o valor RMS de vibração medido contra quatro zonas de severidade (A, B, C e D), definidas para cada classe de máquina."));
m4.push(Bullet("Critério II — Variação da magnitude: avalia mudanças na vibração ao longo do tempo em relação a uma condição de referência (baseline), independentemente de a variação ser um aumento ou uma redução. Uma variação superior a 25% do limite superior da zona B já é considerada significativa e deve disparar investigação, mesmo que o valor absoluto ainda esteja dentro da zona B."));

m4.push(H2("4.2 As quatro zonas de severidade"));
m4.push(simpleTable(
  ["Zona", "Significado"],
  [
    ["A", "Vibração típica de máquina recém-comissionada — condição de novo/excelente."],
    ["B", "Operação de longo prazo sem restrição — condição aceitável."],
    ["C", "Operação restrita, aceitável apenas por tempo limitado até a próxima intervenção planejada."],
    ["D", "Risco de dano — nível considerado suficiente para causar avaria à máquina; ação corretiva imediata."],
  ], [1500, 7500]));

m4.push(P("Sobre esses limites são normalmente definidos os patamares operacionais de ALARME (indica que uma investigação deve começar) e TRIP (nível a partir do qual a máquina deve ser desligada, em sistemas de proteção automática)."));

m4.push(H2("4.3 ISO 10816-2 — Turbinas a vapor e geradores de grande porte"));
m4.push(P("Aplica-se a turbinas a vapor e geradores acima de 50 MW, tipicamente em rotação de 1500/1800 ou 3000/3600 rpm. Valores de vibração de velocidade RMS (mm/s), medidos na carcaça/pedestal do mancal:"));
m4.push(simpleTable(
  ["Zona limite", "1500 / 1800 rpm (mm/s)", "3000 / 3600 rpm (mm/s)"],
  [["A/B", "2,8", "3,8"], ["B/C", "5,3", "7,5"], ["C/D", "8,5", "11,8"]],
  [3000, 3000, 3000]));

m4.push(H2("4.4 ISO 10816-3 — Máquinas industriais de médio/grande porte (motores, bombas, compressores acoplados)"));
m4.push(P("Cobre máquinas industriais com potência acima de 15 kW, divididas em Grupo 1 (potência > 300 kW até 50 MW, ou motores com altura de eixo ≥ 315 mm) e Grupo 2 (potência de 15 a 300 kW, ou altura de eixo entre 160 e 315 mm), cada um avaliado conforme o suporte seja rígido ou flexível."));
m4.push(H3("Grupo 1 — grandes máquinas"));
m4.push(simpleTable(
  ["Suporte", "Zona", "Deslocamento RMS (µm)", "Velocidade RMS (mm/s)"],
  [
    ["Rígido", "A/B", "29", "2,3"], ["Rígido", "B/C", "57", "4,5"], ["Rígido", "C/D", "90", "7,1"],
    ["Flexível", "A/B", "45", "3,5"], ["Flexível", "B/C", "90", "7,1"], ["Flexível", "C/D", "140", "11,0"],
  ], [2000, 1500, 3000, 3000]));
m4.push(H3("Grupo 2 — máquinas médias"));
m4.push(simpleTable(
  ["Suporte", "Zona", "Deslocamento RMS (µm)", "Velocidade RMS (mm/s)"],
  [
    ["Rígido", "A/B", "22", "1,4"], ["Rígido", "B/C", "45", "2,8"], ["Rígido", "C/D", "71", "4,5"],
    ["Flexível", "A/B", "37", "2,3"], ["Flexível", "B/C", "71", "4,5"], ["Flexível", "C/D", "113", "7,1"],
  ], [2000, 1500, 3000, 3000]));

m4.push(H2("4.5 ISO 10816-4 — Turbinas a gás"));
m4.push(P("Para turbinas a gás (tipicamente ao redor de 3000 rpm), a norma estabelece limites únicos de velocidade RMS na carcaça/pedestal:"));
m4.push(simpleTable(["Zona limite", "Velocidade RMS (mm/s)"], [["A/B", "4,5"], ["B/C", "9,3"], ["C/D", "14,7"]], [4000, 4000]));

m4.push(H2("4.6 ISO 10816-5 — Máquinas hidráulicas (turbinas hidráulicas, bombas de armazenamento e geradores associados)"));
m4.push(P("Divide as máquinas em quatro grupos conforme configuração (horizontal/vertical) e tipo de fixação dos mancais. Exemplo — Grupo 1 (conjuntos horizontais com mancais de pedestal, rotação acima de 300 rpm):"));
m4.push(simpleTable(
  ["Zona limite", "Deslocamento pico a pico (µm)", "Velocidade RMS (mm/s)"],
  [["A/B", "30", "1,6"], ["B/C", "50", "2,5"], ["C/D", "80", "4,0"]], [4000, 3000, 3000]));

m4.push(H2("4.7 ISO 10816-7 — Bombas centrífugas (rotodinâmicas)"));
m4.push(P("Traz critérios específicos por faixa de potência e por categoria de aplicação (Categoria I — instalações críticas/especiais; Categoria II — instalações industriais gerais). Resumo simplificado para bombas acima de 1 kW:"));
m4.push(simpleTable(
  ["Zona", "Categoria I, ≤200 kW (mm/s)", "Categoria I, >200 kW (mm/s)", "Categoria II, ≤200 kW (mm/s)", "Categoria II, >200 kW (mm/s)"],
  [
    ["A", "2,5", "3,5", "3,2", "4,2"],
    ["B", "4,0", "5,0", "5,1", "6,1"],
    ["C", "6,6", "7,6", "8,5", "9,5"],
  ], [1600, 2100, 2100, 2100, 2100]));
m4.push(P("A norma também recomenda o alarme (~1,25× o limite superior da zona B) e o trip (~1,25× o limite superior da zona C) como referências práticas para configurar sistemas de proteção."));

m4.push(H2("4.8 Exemplo resolvido: definindo ALARME e TRIP"));
m4.push(P("Considere um turbogerador a vapor de 3000 rpm (ISO 10816-2). O limite B/C é 7,5 mm/s. Ao colocar a máquina em operação, o valor estável (baseline) medido no mancal foi de 4,0 mm/s RMS."));
m4.push(Bullet("Novo limite de ALARME = baseline + 25% do limite B/C = 4,0 + 0,25 × 7,5 = 5,9 mm/s."));
m4.push(Bullet("O limite de TRIP permanece no valor C/D da norma: 11,8 mm/s, a menos que haja justificativa técnica específica para alterá-lo."));
m4.push(P("Esse procedimento — ancorar o alarme no baseline real da máquina, e não apenas no limite genérico da norma — é a prática recomendada para reduzir falsos alarmes sem perder sensibilidade a mudanças reais de condição."));

m4.push(...exerciseBlock("Módulo 4",
  [
    "Um motor elétrico de 200 kW (Grupo 2, suporte rígido) apresenta 3,1 mm/s RMS de vibração no mancal. Em que zona ele se encontra segundo a ISO 10816-3?",
    "Explique a diferença entre o Critério I e o Critério II da ISO 10816-1.",
    "Por que os valores numéricos das zonas de severidade não devem ser usados diretamente como especificação contratual de aceitação, segundo a própria norma?"
  ],
  [
    "Para Grupo 2 rígido: A/B = 1,4; B/C = 2,8; C/D = 4,5 mm/s. Com 3,1 mm/s, o valor está entre B/C (2,8) e C/D (4,5), portanto na Zona C — operação aceitável apenas por tempo limitado, com necessidade de planejamento de intervenção.",
    "O Critério I avalia o valor absoluto (magnitude) da vibração contra zonas fixas de severidade. O Critério II avalia a variação da magnitude ao longo do tempo em relação a uma referência (baseline) — uma mudança significativa pode indicar um problema em desenvolvimento mesmo que o valor absoluto ainda esteja em zona aceitável.",
    "Porque os limites de zona foram estabelecidos a partir de experiência internacional geral, para evitar exigências grosseiramente inadequadas ou irrealistas — não consideram particularidades de projeto de cada máquina. A especificação de aceitação definitiva deve ser acordada entre fabricante e cliente, podendo ser mais rigorosa ou mais permissiva conforme o caso."
  ]));

// ============================================================
// MÓDULO 5 — METODOLOGIA DE ANÁLISE ESPECTRAL
// ============================================================
let m5 = [];
m5.push(H1("Módulo 5 — Metodologia de Análise Espectral"));
m5.push(P("Antes de estudar cada tipo de defeito individualmente (Módulos 6 a 11), é essencial dominar o método de leitura de um espectro. Um analista experiente segue sempre uma sequência disciplinada, evitando concluir a partir de um único pico isolado."));

m5.push(H2("5.1 Roteiro de leitura de um espectro"));
m5.push(Bullet("1. Identificar 1X RPM — a partir da velocidade de rotação real da máquina, localizar a posição de 1X no espectro. Todas as demais frequências serão interpretadas em relação a ela."));
m5.push(Bullet("2. Verificar quais ordens estão presentes e dominantes — 1X, 2X, 3X, sub-harmônicos, ou frequências não síncronas."));
m5.push(Bullet("3. Procurar bandas laterais (sidebands) — picos simetricamente espaçados ao redor de um pico principal, a uma distância igual a uma frequência moduladora (por exemplo, 1X RPM ao redor da frequência de engrenamento). Bandas laterais quase sempre indicam modulação — um sinal de que vale a pena investigar mais a fundo."));
m5.push(Bullet("4. Comparar as três direções de medição (horizontal, vertical, axial) — a direção dominante é uma pista poderosa: desalinhamento angular tende a ser dominante em axial; desbalanceamento, em radial."));
m5.push(Bullet("5. Cruzar com a fase, quando disponível — a relação de fase entre pontos de medição (por exemplo, 180° entre lados opostos de um acoplamento) discrimina entre hipóteses que produzem espectros parecidos, como desbalanceamento e desalinhamento."));
m5.push(Bullet("6. Verificar a tendência histórica — um espectro isolado responde \"o que está acontecendo agora\"; a tendência ao longo do tempo (histórico de amplitude em 1X, por exemplo) responde \"o problema está piorando e a que velocidade\"."));
m5.push(Bullet("7. Confirmar com a forma de onda no tempo — especialmente para impactos (rolamentos, engrenagens) e truncamentos (folga), onde o espectro sozinho pode ser ambíguo."));

m5.push(H2("5.2 Harmônicos, bandas laterais e o conceito de modulação"));
m5.push(P("Um harmônico é um múltiplo inteiro da frequência fundamental (2X, 3X, 4X...) e aparece quando o movimento vibratório, embora periódico, não é uma senoide pura — por exemplo, um rotor com folga que bate contra um limite mecânico a cada volta gera um sinal \"achatado\" ou truncado, rico em harmônicos."));
m5.push(P("Já uma banda lateral surge de um fenômeno de modulação de amplitude: uma frequência \"portadora\" de alta frequência (por exemplo, a frequência de engrenamento GMF, ou a frequência natural de um componente de rolamento) tem sua amplitude modulada periodicamente por uma frequência mais baixa (por exemplo, a rotação do eixo com a engrenagem defeituosa). O resultado no espectro são dois picos simétricos, um acima e um abaixo da portadora, espaçados exatamente pela frequência moduladora. O espaçamento das bandas laterais é, portanto, uma informação de diagnóstico tão importante quanto a amplitude do pico principal — ele aponta qual eixo ou componente está causando a modulação."));

m5.push(H2("5.3 Escalas, unidades e cuidado com comparações"));
m5.push(P("Sempre confirme a unidade do eixo vertical do espectro (mm/s RMS? pico? pico a pico? em g?) antes de comparar contra um limite normativo — comparar um valor de pico contra um limite RMS (ou vice-versa) é um erro comum que leva a diagnósticos incorretos. Para uma vibração predominantemente senoidal em uma única frequência, o valor de pico é aproximadamente √2 vezes o valor RMS."));

m5.push(H2("5.4 Por que a resolução espectral importa: exemplo visual"));
m5.push(...Img("25_resolucao_comparativa.png", 560, "Figura 5.1 — Mesmo defeito, duas resoluções diferentes: à esquerda, a baixa resolução funde a GMF e a banda lateral em um único pico, escondendo a modulação; à direita, a resolução adequada revela claramente as duas bandas laterais."));
m5.push(P("Este par de espectros ilustra por que a resolução (número de linhas ÷ Fmax = Δf, a menor diferença de frequência que o espectro consegue distinguir) não é um detalhe técnico secundário: com resolução insuficiente, bandas laterais coladas a um pico principal (como a GMF) simplesmente desaparecem, fundidas em um único pico mais largo — e a informação de modulação, que aponta a causa raiz do defeito, some com elas. Regra prática: para separar bandas laterais espaçadas por Δfsb, a resolução do espectro (Δf) deve ser bem menor que Δfsb — como referência inicial, ao menos 4 a 5 vezes menor."));
m5.push(H2("5.5 Exemplo numérico: calculando o espaçamento esperado de bandas laterais"));
m5.push(P("Um redutor tem pinhão girando a 1450 rpm e coroa a 362,5 rpm. A GMF medida é de 8,0 kHz. No espectro, você vê bandas laterais ao redor da GMF espaçadas em aproximadamente 24,2 Hz. Qual eixo está modulando o engrenamento?"));
m5.push(Quote("Pinhão: 1450 ÷ 60 = 24,17 Hz          Coroa: 362,5 ÷ 60 = 6,04 Hz"));
m5.push(P("O espaçamento observado (≈24,2 Hz) coincide com a rotação do pinhão, não da coroa — logo, a modulação (e portanto a causa mais provável do defeito: excentricidade, folga ou desalinhamento associado a esse eixo) está associada ao pinhão. Esse é exatamente o raciocínio aplicado no Estudo de Caso 3 (Módulo 16) e detalhado no Módulo 8."));

m5.push(...exerciseBlock("Módulo 5",
  [
    "O que diferencia um harmônico de uma banda lateral, em termos de origem física?",
    "Um espectro mostra um pico grande na frequência de engrenamento (GMF), com dois picos menores simétricos ao seu redor, espaçados de 24 Hz. Sabendo que o pinhão gira a 24 Hz, o que esse padrão sugere?",
    "Por que a comparação com a fase é útil para diferenciar desbalanceamento de desalinhamento, mesmo quando os dois produzem picos em 1X e 2X?"
  ],
  [
    "O harmônico é um múltiplo inteiro da própria frequência fundamental, originado por distorção da forma de onda de um único fenômeno periódico (por exemplo, truncamento por folga). A banda lateral surge de modulação de amplitude entre duas frequências distintas — uma portadora de alta frequência e uma moduladora de baixa frequência — aparecendo como picos simétricos ao redor da portadora, espaçados pela frequência moduladora.",
    "Sugere modulação da frequência de engrenamento pela rotação do pinhão (24 Hz) — um indicativo típico de excentricidade, desgaste ou folga associada ao pinhão, já que o espaçamento das bandas laterais aponta exatamente para o eixo do pinhão como fonte da modulação.",
    "Porque a relação de fase entre pontos de medição revela o padrão de movimento da máquina: desbalanceamento tende a produzir vibração em fase (ou com padrões característicos de rotor em balanço), enquanto desalinhamento angular tende a produzir diferença de fase próxima de 180° através do acoplamento. Dois defeitos com espectros parecidos podem ser discriminados observando esse comportamento de fase."
  ]));

// (continues in part 2 script)
module.exports = { doc, sections, H1, H2, H3, P, PB, Bullet, Quote, Img, cell, simpleTable, exerciseBlock, m1, m2, m3, m4, m5 };
