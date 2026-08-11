// Biblioteca do curso — acervo de referências técnicas utilizadas na construção
// dos módulos. Cada entrada aponta para o arquivo em assets/pdf/, a capa gerada
// a partir da primeira página em assets/img/capas/, e os módulos do curso que
// se apoiaram naquele material (campo usedIn, usado também pelo bloco
// "Referências" ao final de cada módulo).
//
// Os arquivos são materiais técnicos de terceiros (SKF, ISO/BSI, Noria, ICML,
// Mobius Institute e outros), reunidos aqui como bibliografia de estudo.
// Os direitos de cada publicação pertencem aos respectivos autores e editores.

const LIBRARY = [
  // ---------------------------------------------------------------- Vibração
  {
    id: "skf-vibracoes",
    file: "assets/pdf/skf-tecnologia-de-vibracoes.pdf",
    cover: "assets/img/capas/skf-tecnologia-de-vibracoes.jpg",
    title: "Tecnologia de Vibrações",
    publisher: "SKF Reliability Systems",
    year: "2004",
    pages: 90,
    category: "vibracao",
    type: "Apostila técnica",
    lang: "pt-BR",
    description: "Apostila de formação da SKF Reliability Systems em análise de vibração: grandezas medidas, instrumentação, análise espectral e catálogo de defeitos. É a base do encadeamento didático dos módulos iniciais e intermediários da trilha de vibração.",
    usedIn: ["m2", "m3", "m5", "m6", "m7", "m8", "m10", "m14", "m17"]
  },
  {
    id: "skf-ebook-vibracao",
    file: "assets/pdf/skf-ebook-analise-vibracao.pdf",
    cover: "assets/img/capas/skf-ebook-analise-vibracao.jpg",
    title: "Análise de Vibração — Defeitos e Relação de Fases",
    publisher: "SKF",
    year: "2022",
    pages: 26,
    category: "vibracao",
    type: "E-book / slides",
    lang: "pt-BR",
    description: "Material em slides cobrindo desbalanceamento, desalinhamento e folga mecânica (tipos A, B e C), sempre com a relação de fases correspondente a cada defeito, além da fórmula de frequência de correia.",
    usedIn: ["m6", "m8", "m9", "m12"]
  },
  {
    id: "skf-ebook-cbm",
    file: "assets/pdf/skf-ebook-manutencao-condicao.pdf",
    cover: "assets/img/capas/skf-ebook-manutencao-condicao.jpg",
    title: "Manutenção Baseada na Condição (CBM)",
    publisher: "SKF",
    year: "2022",
    pages: 24,
    category: "vibracao",
    type: "E-book / slides",
    lang: "pt-BR",
    description: "Panorama das tecnologias de monitoramento de condição além da vibração: termografia infravermelha e emissividade, análise de óleo lubrificante, ultrassom, MCSA e inspeção sensitiva. Fonte principal do Módulo 23.",
    usedIn: ["m1", "m10", "m13", "m23"]
  },
  {
    id: "confiabilidade-basico",
    file: "assets/pdf/confiabilidade-vibracao-basico.pdf",
    cover: "assets/img/capas/confiabilidade-vibracao-basico.jpg",
    title: "Análise de Vibração — Introdução",
    publisher: "Confiabilidade Manutenção Preditiva Ltda.",
    pages: 10,
    category: "vibracao",
    type: "Apostila introdutória",
    lang: "pt-BR",
    description: "Apostila introdutória que apresenta as quatro gerações da manutenção (corretiva, preventiva, preditiva e proativa), as grandezas de vibração e os três defeitos fundamentais, com espectros reais de campo.",
    usedIn: ["m1", "m2", "m6"]
  },
  {
    id: "mobius-cat-ii",
    file: "assets/pdf/mobius-iso-cat-ii.pdf",
    cover: "assets/img/capas/mobius-iso-cat-ii.jpg",
    title: "ISO Cat II & ASNT Level II Vibration Analysis",
    publisher: "Mobius Institute",
    pages: 6,
    category: "vibracao",
    type: "Programa de certificação",
    lang: "en",
    description: "Programa do curso de certificação Categoria II do Mobius Institute. Usado como referência do escopo esperado de um analista de vibração certificado, orientando a profundidade dos módulos intermediários e avançados.",
    usedIn: ["m0", "m13"]
  },
  {
    id: "vibration-monitoring-fans",
    file: "assets/pdf/vibration-monitoring-fans.pdf",
    cover: "assets/img/capas/vibration-monitoring-fans.jpg",
    title: "System Protection by Vibration Monitoring for Fans",
    publisher: "Systemair",
    pages: 8,
    category: "vibracao",
    type: "Catálogo técnico",
    lang: "en",
    description: "Catálogo de sistemas de monitoramento contínuo de vibração aplicados a ventiladores, com faixas de alarme e critérios de proteção — exemplo prático de monitoramento on-line em campo.",
    usedIn: ["m11", "m13"]
  },

  // ------------------------------------------------------------------ Normas
  {
    id: "iso-10816-1",
    file: "assets/pdf/iso-10816-1.pdf",
    cover: "assets/img/capas/iso-10816-1.jpg",
    title: "ISO 10816-1 — Diretrizes gerais",
    publisher: "BSI / ISO",
    year: "1995 (+A1:2009)",
    pages: 26,
    category: "normas",
    type: "Norma técnica",
    lang: "en",
    restricted: true,
    officialUrl: "https://www.iso.org",
    description: "Parte 1 da família ISO 10816: avaliação da vibração de máquinas por medições em partes não rotativas. Define os conceitos de zonas de severidade A, B, C e D usados em todo o curso.",
    usedIn: ["m4"]
  },
  {
    id: "iso-10816-2",
    file: "assets/pdf/iso-10816-2.pdf",
    cover: "assets/img/capas/iso-10816-2.jpg",
    title: "ISO 10816-2 — Turbinas a vapor e geradores acima de 50 MW",
    publisher: "BSI / ISO",
    year: "2009",
    pages: 26,
    category: "normas",
    type: "Norma técnica",
    lang: "en",
    restricted: true,
    officialUrl: "https://www.iso.org",
    description: "Critérios de avaliação para turbinas a vapor e turbogeradores de grande porte com mancais de deslizamento, operando a 1500, 1800, 3000 e 3600 r/min.",
    usedIn: ["m4"]
  },
  {
    id: "iso-10816-3",
    file: "assets/pdf/iso-10816-3.pdf",
    cover: "assets/img/capas/iso-10816-3.jpg",
    title: "ISO 10816-3 — Máquinas industriais acima de 15 kW",
    publisher: "BSI / ISO",
    year: "2009",
    pages: 24,
    category: "normas",
    type: "Norma técnica",
    lang: "en",
    restricted: true,
    officialUrl: "https://www.iso.org",
    description: "A parte mais usada no dia a dia: máquinas industriais de 15 kW a 50 MW, classificadas em Grupos 1 a 4 e por tipo de fundação (rígida ou flexível). É a base da tabela de severidade aplicada nos casos práticos.",
    usedIn: ["m4", "m13", "m16"]
  },
  {
    id: "iso-10816-4",
    file: "assets/pdf/iso-10816-4.pdf",
    cover: "assets/img/capas/iso-10816-4.jpg",
    title: "ISO 10816-4 — Turbinas a gás",
    publisher: "BSI / ISO",
    year: "2009",
    pages: 28,
    category: "normas",
    type: "Norma técnica",
    lang: "en",
    restricted: true,
    officialUrl: "https://www.iso.org",
    description: "Critérios para conjuntos de turbinas a gás com mancais de deslizamento, excluindo aplicações aeronáuticas derivadas.",
    usedIn: ["m4"]
  },
  {
    id: "iso-10816-5",
    file: "assets/pdf/iso-10816-5.pdf",
    cover: "assets/img/capas/iso-10816-5.jpg",
    title: "ISO 10816-5 — Máquinas de usinas hidrelétricas",
    publisher: "BSI / ISO",
    year: "2001",
    pages: 28,
    category: "normas",
    type: "Norma técnica",
    lang: "en",
    restricted: true,
    officialUrl: "https://www.iso.org",
    description: "Conjuntos de máquinas de usinas hidrelétricas e estações de bombeamento. É a parte cujos limites são expressos em deslocamento pico a pico em micrômetros — detalhe de unidade que costuma gerar erro de leitura.",
    usedIn: ["m4"]
  },
  {
    id: "iso-10816-7",
    file: "assets/pdf/iso-10816-7.pdf",
    cover: "assets/img/capas/iso-10816-7.jpg",
    title: "ISO 10816-7 — Bombas rotodinâmicas",
    publisher: "BSI / ISO",
    year: "2009",
    pages: 28,
    category: "normas",
    type: "Norma técnica",
    lang: "en",
    restricted: true,
    officialUrl: "https://www.iso.org",
    description: "Critérios específicos para bombas rotodinâmicas industriais, incluindo medições em bombas com potência acima de 1 kW — referência direta dos casos de bomba da Prática de Diagnóstico.",
    usedIn: ["m4", "m11"]
  },

  // -------------------------------------------------------------- Rolamentos
  {
    id: "skf-manual-manutencao",
    file: "assets/pdf/skf-manual-manutencao-rolamentos.pdf",
    cover: "assets/img/capas/skf-manual-manutencao-rolamentos.jpg",
    title: "Manual de Manutenção de Rolamentos SKF",
    publisher: "SKF",
    pages: 454,
    category: "rolamentos",
    type: "Manual de referência",
    lang: "pt-BR",
    description: "O manual mais completo do acervo: designação de rolamentos, folga interna, ajustes, montagem e desmontagem, vedações, alinhamento de eixos e de correias, lubrificação, inspeção, tabela de solução de problemas por sintoma e classificação ISO 15243 de danos. Fonte principal dos Módulos 22 e 24 e das seções novas dos Módulos 9 e 15.",
    usedIn: ["m9", "m15", "m17", "m19", "m20", "m21", "m22", "m24"]
  },
  {
    id: "skf-analise-falha",
    file: "assets/pdf/skf-analise-falha-rolamentos.pdf",
    cover: "assets/img/capas/skf-analise-falha-rolamentos.jpg",
    title: "Análise de Falhas de Rolamentos",
    publisher: "SKF",
    pages: 106,
    category: "rolamentos",
    type: "Manual técnico",
    lang: "pt-BR",
    description: "Catálogo fotográfico e descritivo dos modos de falha de rolamentos segundo a ISO 15243: fadiga, desgaste, corrosão, erosão elétrica, deformação plástica e fratura, com causa raiz e ação corretiva de cada padrão visual.",
    usedIn: ["m18", "m19", "m20", "m21"]
  },
  {
    id: "skf-treinamento-falhas",
    file: "assets/pdf/skf-treinamento-analise-falhas.pdf",
    cover: "assets/img/capas/skf-treinamento-analise-falhas.jpg",
    title: "Treinamento — Análise de Falhas em Rolamentos",
    publisher: "SKF",
    pages: 54,
    category: "rolamentos",
    type: "Material de treinamento",
    lang: "pt-BR",
    description: "Versão didática do material de análise de falhas, com estudos de caso reais documentados pela SKF (descarrilamento ferroviário, motor elétrico, moinho de argila e britador de mandíbulas) e o roteiro de coleta de evidências.",
    usedIn: ["m18", "m19", "m21"]
  },

  // ------------------------------------------------------------ Lubrificação
  {
    id: "mle-lubrificacao",
    file: "assets/pdf/mle-engenheiro-lubrificacao.pdf",
    cover: "assets/img/capas/mle-engenheiro-lubrificacao.jpg",
    title: "MLE — Engenheiro de Lubrificação de Máquina",
    publisher: "Noria / ICML",
    pages: 267,
    category: "lubrificacao",
    type: "Livro-texto",
    lang: "es",
    restricted: true,
    officialUrl: "https://www.noria.com",
    description: "Livro-texto de preparação para a certificação MLE (Machinery Lubrication Engineer): tribologia, seleção de lubrificantes, controle de contaminação, análise de óleo e gestão do programa de lubrificação.",
    usedIn: ["mlub1", "mlub2", "mlub4", "mlub7", "mlub11"]
  },
  {
    id: "noria-nivel-i",
    file: "assets/pdf/noria-lubricacion-nivel-i.pdf",
    cover: "assets/img/capas/noria-lubricacion-nivel-i.jpg",
    title: "Lubricación Nivel I",
    publisher: "Noria Latín América",
    pages: 264,
    category: "lubrificacao",
    type: "Livro-texto",
    lang: "es",
    restricted: true,
    officialUrl: "https://www.noria.com",
    description: "Curso de lubrificação industrial nível I: regimes de lubrificação, óleos base e aditivos, graxas e espessantes, armazenamento e manuseio, e fundamentos de análise de óleo.",
    usedIn: ["mlub1", "mlub2", "mlub3", "mlub5", "mlub6"]
  },
  {
    id: "noria-catalogo",
    file: "assets/pdf/noria-catalogo-treinamento.pdf",
    cover: "assets/img/capas/noria-catalogo-treinamento.jpg",
    title: "Catálogo de Treinamentos Noria",
    publisher: "Noria Corporation",
    pages: 28,
    category: "lubrificacao",
    type: "Catálogo de cursos",
    lang: "pt-BR",
    description: "Descrição do conteúdo dos cinco cursos da Noria (Industrial Lubrication Fundamentals, Machinery Lubrication I e II, Oil Analysis Report Interpretation e Oil Analysis II/III). Usado para definir o escopo e a sequência da trilha de lubrificação.",
    usedIn: ["mlub4", "mlub7", "mlub8", "mlub9", "mlub10", "mlub11"]
  },
  {
    id: "icml-certificacao",
    file: "assets/pdf/icml-certificacao-mla-mlt.pdf",
    cover: "assets/img/capas/icml-certificacao-mla-mlt.jpg",
    title: "Requisitos de Certificação ICML — MLA e MLT",
    publisher: "ICML — International Council for Machinery Lubrication",
    pages: 25,
    category: "lubrificacao",
    type: "Body of Knowledge",
    lang: "pt-BR",
    description: "Body of Knowledge oficial do ICML para as certificações MLT I/II e MLA I/II/III, com o peso percentual de cada tópico no exame. Foi a base primária para definir o conteúdo dos módulos de lubrificação.",
    usedIn: ["mlub1", "mlub7", "mlub8", "mlub12"]
  }
];

const LIBRARY_CATEGORIES = [
  { id: "todos", label: "Todos", icon: "📚" },
  { id: "vibracao", label: "Análise de Vibração", icon: "📈" },
  { id: "normas", label: "Normas ISO 10816", icon: "📐" },
  { id: "rolamentos", label: "Rolamentos e Falhas", icon: "⚙️" },
  { id: "lubrificacao", label: "Lubrificação", icon: "🛢️" }
];

if (typeof window !== "undefined") {
  window.LIBRARY = LIBRARY;
  window.LIBRARY_CATEGORIES = LIBRARY_CATEGORIES;
}
