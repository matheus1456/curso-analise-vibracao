// Tabela de possíveis diagnósticos por vibração — versão em texto nativo.
// Transcrição fiel do pôster técnico da SKF "Tabela de possíveis diagnósticos por
// vibração", reorganizada como conteúdo HTML para permitir leitura nítida em
// qualquer nível de zoom, busca por texto e uso em telas pequenas.
// O pôster original continua disponível em assets/img/tabela_diagnostico_skf.jpeg.

const DIAG_TABLE = [
  {
    id: "desbalanceamento",
    title: "Desbalanceamento",
    color: "#d94f45",
    modules: [{ id: "m6", label: "Módulo 6.1" }, { id: "m14", label: "Módulo 14" }],
    summary: "Aumento na amplitude na frequência de rotação do equipamento, com valores elevados.",
    items: [
      {
        title: "Desbalanceamento estático",
        bullets: [
          "Fases iguais entre mancais.",
          "Vibração em fase nos dois mancais."
        ]
      },
      {
        title: "Desbalanceamento dinâmico",
        bullets: [
          "Fases diferentes entre mancais.",
          "Vibração com fase diferente em cada mancal."
        ]
      },
      {
        title: "Desbalanceamento acoplado (ou conjugado)",
        bullets: [
          "Fases 180° opostas entre mancais.",
          "Vibração em oposição de fase de 180 graus."
        ]
      }
    ]
  },

  {
    id: "desalinhamento",
    title: "Desalinhamento",
    color: "#dd5f36",
    modules: [{ id: "m6", label: "Módulo 6.2" }, { id: "m15", label: "Módulo 15" }],
    summary: "Presença da frequência de 2×RPM do equipamento (às vezes até maior que 1×RPM). Fases opostas (180°) entre equipamentos acoplados.",
    items: [
      {
        title: "Desalinhamento paralelo",
        bullets: ["Predomina característica de vibração no radial (vertical e horizontal)."]
      },
      {
        title: "Desalinhamento angular",
        bullets: ["Predomina característica de vibração na axial (sentido do eixo)."]
      }
    ]
  },

  {
    id: "folgas",
    title: "Folgas",
    color: "#dd8a2b",
    modules: [{ id: "m6", label: "Módulo 6.3" }, { id: "m22", label: "Módulo 22" }],
    items: [
      {
        title: "1 — Estática: tipos A e B",
        bullets: [
          "Amplitudes de 1×RPM aparecem quando a folga for estrutural, por falta de rigidez nos pés da máquina, torção da máquina ou fragilidade na base de concreto.",
          "Folgas mecânicas entre componentes (ex.: entre eixo e anel do rolamento) são causadas por ajuste impróprio.",
          "Em geral causam sub-harmônicos de múltiplos exatos de 1/2 e 1/3 rpm (0,5; 1,5; 2,5; etc.)."
        ]
      },
      {
        title: "2 — Dinâmica: tipo C",
        bullets: [
          "Série harmônica de picos da frequência de RPM (1×, 2×, 3×, 4×RPM, etc.), formando uma parábola descendente, caracterizando evolução da folga mecânica."
        ]
      }
    ]
  },

  {
    id: "bombas",
    title: "Bombas centrífugas",
    color: "#e79a45",
    modules: [{ id: "m11", label: "Módulo 11" }],
    items: [
      {
        title: "Passagem de palhetas",
        bullets: [
          "Presença do pico de BPF (número de pás × RPM), podendo ter altas amplitudes e ainda a presença de harmônicos do BPF."
        ]
      },
      {
        title: "Cavitação",
        bullets: [
          "Presença de frequência de BPF (número de pás × RPM) e vibração randômica em alta frequência.",
          "Normalmente a cavitação gera ruído aleatório, energia em larga faixa de alta frequência. Normalmente indica pressão insuficiente na sucção.",
          "A cavitação pode rapidamente destruir as partes internas da bomba se não for corrigida. Isto pode principalmente causar a erosão das pás do impelidor.",
          "Quando presente é frequente haver ruído como pedras passando pela bomba."
        ]
      }
    ]
  },

  {
    id: "engrenagens",
    title: "Engrenagens",
    color: "#efb539",
    modules: [{ id: "m8", label: "Módulo 8" }],
    items: [
      {
        title: "Dente quebrado — identificado com o sinal no tempo (forma de onda)",
        bullets: [
          "Engrenamento: GMF = Gear Mesh Frequency = (n.º de dentes × RPM).",
          "Impactos periódicos no ciclo da RPM do equipamento."
        ],
        note: "No exemplo do pôster: uma coroa engrenando em 2 subpistas, com 2 dentes danificados — um com maior e outro com menor extensão do dano."
      },
      {
        title: "Folga / batimento entre engrenagens (backlash)",
        bullets: [
          "Presença do pico de GMF (Gear Mesh Frequency = número de dentes × RPM) com bandas laterais da RPM da engrenagem desgastada."
        ]
      },
      {
        title: "Desalinhamento entre engrenagens",
        bullets: [
          "O desalinhamento das engrenagens quase sempre excita a segunda ordem ou altos harmônicos da GMF (frequência de engrenamento) com bandas laterais da frequência de rotação.",
          "Frequentemente apresentará somente amplitude 1 × GMF, mas altos níveis a 2× ou 3× GMF também podem aparecer."
        ]
      },
      {
        title: "Desalinhamento entre engrenagens + backlash",
        bullets: [
          "Forma mais grave (evolução) dos defeitos entre engrenagens.",
          "Característica: picos harmônicos da GMF com bandas laterais."
        ]
      }
    ]
  },

  {
    id: "eletrico",
    title: "Elétrico",
    color: "#199a4a",
    modules: [{ id: "m10", label: "Módulo 10" }, { id: "m23", label: "Módulo 23" }],
    items: [
      {
        title: "Elétrico — motor CC: frequência de SCR",
        bullets: [
          "Pico na frequência de 360 Hz (SCR), frequência de disparo independente da RPM do equipamento.",
          "Os problemas podem ser detectados por amplitude maior que a normal na frequência de disparo (SCR)."
        ]
      },
      {
        title: "120 Hz: variação no \"entre ferros\"",
        bullets: [
          "Presença de pico da frequência de 120 Hz, independente da RPM do equipamento.",
          "Este tipo de defeito ocorre quando o gap de ar varia devido à torção da carcaça do motor (ex.: pé manco do motor)."
        ]
      },
      {
        title: "Problemas do estator — frequência de ranhuras",
        bullets: [
          "Elétrico: motor de indução trifásico (CA).",
          "Harmônicos na rede/motor com inversor de frequência.",
          "Pico de RBPF (frequência de ranhuras = número de ranhuras do estator × RPM) com bandas laterais de 2×fl (120 Hz)."
        ]
      },
      {
        title: "Envelope de aceleração no defeito elétrico",
        bullets: [
          "O envelope de aceleração demodula a série harmônica da frequência de 120 Hz, devido à excitação da frequência de RBPF (ranhuras)."
        ]
      },
      {
        title: "Problemas no rotor — análise da corrente elétrica (\"check elétrico\")",
        bullets: [
          "Pico na frequência da rede e bandas laterais do escorregamento × número de polos.",
          "É analisado o diferencial entre as bandas laterais e o pico central."
        ]
      }
    ]
  },

  {
    id: "correias",
    title: "Correias",
    color: "#2aa55c",
    modules: [{ id: "m9", label: "Módulo 9" }],
    items: [
      {
        title: "Frequência de batimento de correias",
        formula: "F correia = (3,142 × RPM polia × diâmetro primitivo) ÷ comprimento da correia",
        bullets: [
          "Pico da frequência da correia (abaixo da RPM), podendo haver harmônicos desta."
        ]
      }
    ]
  },

  {
    id: "batimento",
    title: "Efeito de batimento",
    color: "#57bd79",
    modules: [{ id: "m6", label: "Módulo 6" }, { id: "m12", label: "Módulo 12" }],
    items: [
      {
        title: "Batimento — característica",
        bullets: [
          "Sinal no tempo \"semelhante\" a uma modulação AM, porém com maior energia.",
          "O sinal é bem identificado na forma de onda e é formado a partir de duas frequências próximas que se somam e subtraem-se ao longo do tempo.",
          "O sinal é \"percebido\" (sentido) estando-se ao lado do equipamento, devido à sua intensidade."
        ]
      },
      {
        title: "Batimento — observação",
        bullets: [
          "Através de um \"zoom\" real é possível identificar as frequências que geram o efeito de batimento."
        ]
      }
    ]
  },

  {
    id: "mancais",
    title: "Mancais de deslizamento (casquilho)",
    color: "#8ad0a1",
    modules: [{ id: "m12", label: "Módulo 12" }],
    items: [
      {
        title: "Mancais de deslizamento",
        bullets: ["Pico da frequência de RPM e harmônicos."]
      },
      {
        title: "Instabilidade do filme de óleo (oil whirl)",
        bullets: [
          "Pico entre 0,42 e 0,48 × RPM do equipamento (abaixo da RPM), caracterizando instabilidade no filme de óleo."
        ]
      }
    ]
  },

  {
    id: "envelope",
    title: "Envelope de aceleração",
    color: "#1478be",
    modules: [{ id: "m7", label: "Módulo 7.5" }],
    items: [
      {
        title: "Problema de natureza elétrica",
        bullets: ["Série harmônica de picos de 120 Hz, 240 Hz, 360 Hz."]
      },
      {
        title: "Folgas no rolamento",
        bullets: ["Série harmônica de picos da RPM: 1×, 2×, 3×, 4×, etc."]
      },
      {
        title: "Defeito no rolamento (BPFO, BPFI, BSF, FTF)",
        bullets: [
          "A série harmônica de picos do defeito de frequência de falha do rolamento está caracterizada (demodulação) em baixa frequência, o que torna mais fácil analisar separadamente:",
          "FTF — frequência de falha na gaiola.",
          "BSF — frequência de falha no elemento rolante.",
          "BPFO — frequência de falha no anel externo.",
          "BPFI — frequência de falha no anel interno."
        ]
      }
    ]
  },

  {
    id: "evolucao",
    title: "Evolução de falhas de rolamento",
    color: "#6fa8dc",
    modules: [{ id: "m7", label: "Módulo 7" }, { id: "m18", label: "Módulo 18" }],
    summary: "Comparação, estágio a estágio, entre o que o envelope de aceleração já mostra e o que as técnicas convencionais (velocidade) ainda não conseguem detectar.",
    stages: [
      {
        stage: "Estágio 01",
        envelope: "Identificação das frequências no espectro e início dos picos de defeitos.",
        velocidade: "Espectro não mostra nenhuma característica de falha ou picos destacados. Nível global baixo."
      },
      {
        stage: "Estágio 02",
        envelope: "Aumento nos picos de defeitos identificados.",
        velocidade: "Espectro começa a mostrar picos destacados em alta frequência do defeito no rolamento. Nível global permanece baixo."
      },
      {
        stage: "Estágio 03",
        envelope: "Aparecimento de bandas laterais, aumentando o grau de modulação.",
        velocidade: "Espectro mostra picos mais destacados em alta frequência e alguns picos em baixa frequência. O nível global apresenta aumento no valor."
      },
      {
        stage: "Estágio 04",
        envelope: "Descaracterização do espectro, com aumento dos níveis globais (carpete elevado).",
        velocidade: "Espectro apresenta picos em alta e em baixa frequência, com a presença de \"carpetes\". O nível global possui valor elevado, normalmente alcançando os níveis de alarme."
      }
    ]
  }
];

if (typeof window !== "undefined") window.DIAG_TABLE = DIAG_TABLE;
