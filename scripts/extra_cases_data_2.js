// Casos extras: redutores (engrenagens), motores elétricos e compressores de
// parafuso isento de óleo — continuam a numeração de data/cases.js (c22-c27).
const EXTRA_CASES_2 = [
  {
    id: "c22",
    num: 22,
    level: "intermediário",
    title: "Redutor industrial com desgaste avançado nas engrenagens (GMF elevado)",
    briefing: [
      "Redutor de dois estágios que aciona uma esteira transportadora de minério de ferro, operando em ambiente abrasivo e com trocas de óleo frequentemente atrasadas pela equipe de manutenção.",
      "Operadores relatam um \"chiado\" metálico crescente ao longo dos últimos meses, que muda de intensidade conforme a carga na esteira aumenta ou diminui.",
      "A última troca de óleo mostrou partículas metálicas finas e brilhantes no fundo do dreno, em quantidade maior que o normal."
    ],
    readings: { temp: 58, vel: 6.8, accel: 2.1, envelope: 1.1 },
    spectrum: {
      mode: "freq",
      xmax: 40,
      unit: "Ordens (x RPM do eixo de entrada)",
      peaks: [
        { order: 1, amp: 0.18 },
        { order: 33, amp: 2.9 },
        { order: 32, amp: 0.95 },
        { order: 34, amp: 0.9 }
      ],
      noise: 0.35
    },
    trend: {
      unit: "mm/s RMS",
      months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      values: [2.0, 2.6, 3.4, 4.3, 5.6, 6.8],
      alertLimit: 4.5,
      dangerLimit: 7.1
    },
    diagnosisOptions: [
      { id: "a", text: "Desgaste avançado nos dentes de engrenagem (GMF elevado com bandas laterais)" },
      { id: "b", text: "Defeito de rolamento no eixo de saída do redutor" },
      { id: "c", text: "Desalinhamento entre o motor e o redutor" },
      { id: "d", text: "Folga mecânica na fixação da base do redutor" }
    ],
    correctDiagnosis: "a",
    checks: [
      {
        id: "gmf_order",
        label: "Em qual ordem (x RPM do eixo de entrada) aparece o pico de engrenamento (GMF), correspondente ao número de dentes do pinhão?",
        type: "numeric",
        correct: 33,
        tolerance: 1
      },
      {
        id: "sidebands",
        label: "O que indicam as bandas laterais (sidebands) observadas ao redor do GMF, espaçadas em 1x RPM?",
        type: "mc",
        options: [
          { id: "desgaste", text: "Modulação de amplitude causada por desgaste ou excentricidade nos dentes" },
          { id: "normal", text: "Comportamento normal do engrenamento, sem significado diagnóstico" }
        ],
        correct: "desgaste"
      }
    ],
    hint: "Dica: engrenagens saudáveis também produzem um pico no GMF (número de dentes × RPM do eixo), mas de amplitude baixa e sem bandas laterais relevantes. Bandas espaçadas em 1x RPM ao redor do GMF indicam modulação de amplitude — sinal típico de desgaste distribuído, excentricidade do eixo do pinhão ou, em casos mais avançados, um dente lascado.",
    explanation: "O pico dominante na ordem 33 (número de dentes do pinhão de entrada) com amplitude elevada, cercado por bandas laterais espaçadas em 1x RPM, é a assinatura clássica de desgaste avançado no engrenamento — não de um defeito de rolamento (que apareceria em ordens não-inteiras como BPFO/BPFI) nem de desalinhamento (que se manifestaria predominantemente em 1x e 2x RPM). A presença de partículas metálicas finas no óleo confirma a origem: material sendo removido da superfície dos dentes por desgaste abrasivo, agravado pelas trocas de óleo atrasadas.",
    action: "Ação recomendada: inspeção boroscópica do conjunto de engrenagens no próximo desligamento programado, análise de partículas de desgaste no óleo (ferrografia) para confirmar a origem e a taxa de progressão, correção imediata da periodicidade de troca de óleo, e acompanhamento semanal da tendência do pico de GMF até a intervenção."
  },
  {
    id: "c23",
    num: 23,
    level: "avançado",
    title: "Redutor: defeito de rolamento em estágio inicial no eixo de saída de baixíssima rotação",
    briefing: [
      "Redutor de alta relação de redução cujo eixo de saída aciona um agitador de tanque de processo a apenas 45 rpm — uma rotação muito baixa para os padrões usuais de monitoramento.",
      "A equipe de confiabilidade reporta que a velocidade RMS global permanece dentro da faixa normal, sem nenhuma variação perceptível nas últimas semanas.",
      "O programa de monitoramento também acompanha o parâmetro de envelope (HFD), que vem subindo de forma consistente mês a mês nesse mesmo período."
    ],
    readings: { temp: 38, vel: 1.8, accel: 0.4, envelope: 1.6 },
    spectrum: {
      mode: "freq",
      xmax: 10,
      unit: "Ordens (x RPM do eixo de saída) — espectro de envelope (gE)",
      peaks: [
        { order: 1, amp: 0.08 },
        { order: 3.2, amp: 0.5 },
        { order: 6.4, amp: 0.35 }
      ],
      noise: 0.05
    },
    trend: {
      unit: "gE Pk-Pk",
      months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      values: [0.4, 0.6, 0.9, 1.2, 1.6, 2.0],
      alertLimit: 1.5,
      dangerLimit: 2.5
    },
    diagnosisOptions: [
      { id: "a", text: "Defeito de rolamento em estágio inicial no eixo de saída (rotação muito baixa)" },
      { id: "b", text: "Desbalanceamento do eixo de saída" },
      { id: "c", text: "Problema de lubrificação generalizado, sem defeito localizado" },
      { id: "d", text: "Ressonância estrutural do agitador" }
    ],
    correctDiagnosis: "a",
    checks: [
      {
        id: "bpfo_order",
        label: "Em qual ordem (x RPM do eixo de saída) aparece o pico compatível com BPFO neste caso?",
        type: "numeric",
        correct: 3.2,
        tolerance: 0.3
      },
      {
        id: "indicador",
        label: "Qual parâmetro está mais sensível neste estágio inicial, dada a baixíssima rotação do eixo de saída (45 rpm)?",
        type: "mc",
        options: [
          { id: "rms", text: "Velocidade RMS global" },
          { id: "envelope", text: "Envelope / HFD (demodulação de alta frequência)" }
        ],
        correct: "envelope"
      }
    ],
    hint: "Dica: em eixos de rotação muito baixa (abaixo de ~100 rpm), a energia de impacto de um defeito de rolamento é fraca e se dilui dentro do espectro de velocidade convencional. O envelope (demodulação de alta frequência) amplifica seletivamente esses impactos e costuma ser o primeiro parâmetro a indicar o problema — muitas vezes semanas ou meses antes de qualquer alteração perceptível no RMS global.",
    explanation: "Este caso ilustra uma limitação importante da velocidade RMS global em máquinas de baixíssima rotação: a energia liberada por um impacto localizado (como uma falha inicial de pista) é proporcional à velocidade de rotação, então em 45 rpm esses impactos são fracos demais para alterar de forma perceptível o RMS, mesmo que o defeito já esteja presente. O envelope, por demodular especificamente a energia de alta frequência gerada pelos impactos, revela a falha muito antes — como confirma o pico crescente na ordem 3,2x RPM (compatível com BPFO) e a tendência de subida consistente do parâmetro de envelope ao longo de seis meses.",
    action: "Ação recomendada: manter o monitoramento por envelope com frequência aumentada (semanal), programar a substituição do rolamento na próxima janela de parada planejada (o estágio ainda é inicial, sem urgência de parada não programada), e evitar decisões baseadas apenas na velocidade RMS global em ativos de rotação muito baixa."
  },
  {
    id: "c24",
    num: 24,
    level: "avançado",
    title: "Motor elétrico de indução com suspeita de barra de rotor quebrada",
    briefing: [
      "Motor de indução trifásico de 200 cv acionando um exaustor de grande porte em operação contínua, sem variação recente de carga ou processo.",
      "Uma análise preliminar de assinatura de corrente do motor (MCSA), feita pela equipe elétrica, já havia levantado suspeita de um problema no circuito do rotor, mas sem confirmação mecânica.",
      "No espectro de vibração de alta resolução (zoom FFT), aparecem duas bandas laterais bem próximas de cada lado do pico de 1x RPM — só visíveis com uma resolução de frequência bem mais fina que a análise de rotina padrão."
    ],
    readings: { temp: 61, vel: 3.4, accel: 0.6, envelope: 0.3 },
    spectrum: {
      mode: "freq",
      xmax: 3,
      unit: "Ordens (x RPM)",
      peaks: [
        { order: 1, amp: 1.8 },
        { order: 0.94, amp: 0.6 },
        { order: 1.06, amp: 0.55 }
      ],
      noise: 0.15
    },
    trend: {
      unit: "mm/s RMS",
      months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      values: [2.2, 2.5, 2.8, 3.0, 3.2, 3.4],
      alertLimit: 4.5,
      dangerLimit: 7.1
    },
    diagnosisOptions: [
      { id: "a", text: "Barra de rotor quebrada (bandas laterais ao redor de 1x RPM espaçadas pela frequência de escorregamento)" },
      { id: "b", text: "Desbalanceamento residual do rotor" },
      { id: "c", text: "Excentricidade estática do entreferro" },
      { id: "d", text: "Empeno do eixo do motor" }
    ],
    correctDiagnosis: "a",
    checks: [
      {
        id: "origem_banda",
        label: "O que causa as bandas laterais observadas ao redor de 1x RPM neste caso?",
        type: "mc",
        options: [
          { id: "escorregamento", text: "Modulação pela frequência de escorregamento do motor — assinatura de barra de rotor quebrada" },
          { id: "desbalance", text: "Simplesmente desbalanceamento — não indica nenhum problema elétrico" }
        ],
        correct: "escorregamento"
      },
      {
        id: "metodo",
        label: "Qual exame complementar confirma este diagnóstico de forma mais direta?",
        type: "mc",
        options: [
          { id: "mcsa", text: "MCSA — análise da assinatura de corrente do motor" },
          { id: "termografia", text: "Termografia da carcaça externa do motor" }
        ],
        correct: "mcsa"
      }
    ],
    hint: "Dica: barras de rotor quebradas produzem bandas laterais ao redor de 1x RPM espaçadas pela frequência de escorregamento (slip), que costuma ser muito pequena — por isso, na prática, essas bandas só aparecem com FFT de altíssima resolução (zoom FFT), diferente do espaçamento bem mais largo típico de folga mecânica ou desbalanceamento. A confirmação definitiva vem da análise de corrente elétrica (MCSA), que enxerga o mesmo fenômeno pelo lado elétrico.",
    explanation: "O padrão observado — duas bandas laterais simétricas e muito próximas do pico de 1x RPM, visíveis apenas com resolução espectral elevada — é a assinatura vibratória clássica de uma ou mais barras de rotor quebradas ou trincadas em motores de indução. O rotor danificado cria uma assimetria magnética que se manifesta como uma modulação de amplitude na frequência de escorregamento (a diferença entre a rotação síncrona e a rotação real do rotor), distinta de um desbalanceamento comum (que não produz esse par de bandas) ou de uma excentricidade estática (que tende a gerar componentes em múltiplos da frequência de linha, não bandas ao redor de 1x RPM). A suspeita prévia levantada pelo MCSA reforça a origem elétrica do problema.",
    action: "Ação recomendada: confirmar com uma análise MCSA completa e formal (não apenas preliminar), avaliar a severidade pelo número de barras afetadas, planejar a parada para reparo ou rebobinamento do rotor na primeira janela de manutenção disponível, e evitar partidas a plena carga até a intervenção, já que o esforço de partida agrava a propagação de trincas em barras já comprometidas."
  },
  {
    id: "c25",
    num: 25,
    level: "avançado",
    title: "Motor elétrico acionado por inversor de frequência com defeito de rolamento por correntes de eixo",
    briefing: [
      "Motor elétrico de 75 cv recentemente convertido de partida direta para acionamento por inversor de frequência (VFD), como parte de um projeto de eficiência energética.",
      "Poucos meses após a conversão, o rolamento do lado oposto ao acoplamento (que havia sido substituído por um novo há pouco tempo) passou a apresentar um ruído agudo intermitente.",
      "O espectro de envelope mostra uma série de harmônicos regularmente espaçados, com amplitudes semelhantes entre si — sem o decaimento gradual normalmente esperado num defeito mecânico comum."
    ],
    readings: { temp: 44, vel: 2.6, accel: 1.8, envelope: 3.4 },
    spectrum: {
      mode: "freq",
      xmax: 18,
      unit: "Ordens (x RPM) — espectro de envelope (gE)",
      peaks: [
        { order: 1, amp: 0.1 },
        { order: 3.5, amp: 0.4 },
        { order: 7, amp: 0.5 },
        { order: 10.5, amp: 0.45 },
        { order: 14, amp: 0.4 }
      ],
      noise: 0.1
    },
    trend: {
      unit: "gE Pk-Pk",
      months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      values: [0.6, 1.1, 1.8, 2.4, 3.0, 3.4],
      alertLimit: 2.0,
      dangerLimit: 3.0
    },
    diagnosisOptions: [
      { id: "a", text: "Erosão elétrica (fluting) por correntes de eixo induzidas pelo inversor de frequência" },
      { id: "b", text: "Defeito de rolamento por fadiga mecânica clássica, sem relação com o acionamento" },
      { id: "c", text: "Desalinhamento entre o motor e a carga acionada" },
      { id: "d", text: "Lubrificação inadequada (graxa incompatível)" }
    ],
    correctDiagnosis: "a",
    checks: [
      {
        id: "padrao_harmonicos",
        label: "O que é característico do padrão de harmônicos observado (vários harmônicos de amplitude semelhante, sem o decaimento típico)?",
        type: "mc",
        options: [
          { id: "fluting", text: "Erosão elétrica (fluting) — sulcos regulares na pista causados por descargas de corrente" },
          { id: "fadiga", text: "Fadiga mecânica clássica de rolamento (padrão decrescente e irregular)" }
        ],
        correct: "fluting"
      },
      {
        id: "causa_raiz",
        label: "Qual é a causa raiz mais provável, dado que o motor foi recentemente convertido para acionamento por inversor (VFD)?",
        type: "mc",
        options: [
          { id: "correntes_eixo", text: "Correntes de eixo (shaft currents) por ausência de aterramento/anel de aterramento adequado" },
          { id: "desalinhamento", text: "Desalinhamento mecânico introduzido durante a conversão" }
        ],
        correct: "correntes_eixo"
      }
    ],
    hint: "Dica: reveja o Módulo 21 (Erosão Elétrica) — motores acionados por inversor de frequência podem desenvolver tensões de modo comum que se descarregam através do rolamento na forma de pequenas faíscas, criando sulcos regulares (fluting) na pista. O padrão de harmônicos igualmente espaçados e sem decaimento forte é a assinatura característica desse mecanismo, bem diferente da fadiga mecânica comum vista no Módulo 20.",
    explanation: "O rolamento foi substituído recentemente, o que já reduz a probabilidade de fadiga clássica por fim de vida útil. O padrão observado — múltiplos harmônicos igualmente espaçados e de amplitude semelhante, sem o decaimento gradual característico de uma fadiga mecânica progressiva — é a assinatura típica de erosão elétrica (fluting) causada por correntes de eixo. A coincidência temporal com a conversão para acionamento por inversor de frequência é a pista central: inversores modernos geram tensões de modo comum de alta frequência que, sem um caminho de aterramento adequado (anel de aterramento do eixo, rolamento isolado no lado oposto ao acoplamento, etc.), descarregam repetidamente através da película de graxa do rolamento, formando os sulcos regulares responsáveis pelo padrão espectral observado.",
    action: "Ação recomendada: instalar um anel de aterramento de eixo (shaft grounding ring) ou rolamento isolado eletricamente no lado oposto ao acoplamento, verificar a qualidade do aterramento geral do sistema motor-inversor, e programar a inspeção/substituição do rolamento afetado — sem essa correção elétrica, qualquer rolamento novo tende a repetir o mesmo padrão de falha em poucos meses."
  },
  {
    id: "c26",
    num: 26,
    level: "avançado",
    title: "Compressor de parafuso isento de óleo com desgaste nas engrenagens de sincronismo",
    briefing: [
      "Compressor de parafuso isento de óleo (oil-free) de uma linha de ar comprimido para processo farmacêutico, onde os rotores macho e fêmea giram sincronizados por um par de engrenagens de sincronismo (timing gears) de alta precisão — sem qualquer contato direto ou lubrificação entre os próprios rotores.",
      "A equipe de manutenção relata um ruído metálico crescente nas últimas semanas, acompanhado de um leve aumento na temperatura de descarga do compressor.",
      "Diferente de um compressor de parafuso lubrificado (onde um filme de óleo entre os rotores absorve pequenas variações de folga), neste equipamento os rotores não podem se tocar em hipótese alguma."
    ],
    readings: { temp: 96, vel: 5.2, accel: 2.4, envelope: 1.0 },
    spectrum: {
      mode: "freq",
      xmax: 65,
      unit: "Ordens (x RPM do rotor macho)",
      peaks: [
        { order: 1, amp: 0.12 },
        { order: 60, amp: 3.2 },
        { order: 59, amp: 1.0 },
        { order: 61, amp: 0.95 }
      ],
      noise: 0.3
    },
    trend: {
      unit: "mm/s RMS",
      months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      values: [1.8, 2.3, 2.9, 3.6, 4.4, 5.2],
      alertLimit: 3.5,
      dangerLimit: 5.0
    },
    diagnosisOptions: [
      { id: "a", text: "Desgaste ou folga excessiva nas engrenagens de sincronismo (timing gears)" },
      { id: "b", text: "Desbalanceamento do rotor macho" },
      { id: "c", text: "Defeito de rolamento no mancal do rotor fêmea" },
      { id: "d", text: "Pulsação normal de vazão, sem defeito real" }
    ],
    correctDiagnosis: "a",
    checks: [
      {
        id: "funcao_timing",
        label: "Qual é a função das engrenagens de sincronismo (timing gears) num compressor de parafuso ISENTO DE ÓLEO?",
        type: "mc",
        options: [
          { id: "evitar_contato", text: "Manter a folga sem contato entre os rotores macho e fêmea, já que não há óleo lubrificando essa interface" },
          { id: "reduzir_ruido", text: "Apenas reduzir o ruído do compressor, sem função de segurança do processo" }
        ],
        correct: "evitar_contato"
      },
      {
        id: "risco",
        label: "Qual é o risco principal de ignorar este sintoma num compressor oil-free, em comparação com um compressor lubrificado?",
        type: "mc",
        options: [
          { id: "contato_metal", text: "Contato metal-metal entre os rotores, com risco de falha catastrófica" },
          { id: "apenas_ruido", text: "Apenas incômodo de ruído, sem risco real ao equipamento" }
        ],
        correct: "contato_metal"
      }
    ],
    hint: "Dica: em compressores de parafuso LUBRIFICADOS, um pequeno desgaste nas engrenagens de sincronismo costuma ser tolerável, pois o filme de óleo entre os rotores absorve alguma variação de folga. Em compressores ISENTOS DE ÓLEO, essa margem de segurança não existe — os rotores nunca podem se tocar. Por isso, o monitoramento do GMF das timing gears (aqui na ordem 60, com bandas laterais em 1x RPM) é ainda mais crítico neste tipo de máquina.",
    explanation: "O pico dominante na ordem 60 (número de dentes das engrenagens de sincronismo), com bandas laterais espaçadas em 1x RPM do rotor macho, indica desgaste ou folga crescente no par de engrenagens de sincronismo — não um desbalanceamento (que apareceria isoladamente em 1x RPM) nem um defeito de rolamento (que produziria ordens não-inteiras características de BPFO/BPFI). O leve aumento na temperatura de descarga reforça o diagnóstico: folgas maiores entre os rotores permitem algum vazamento interno (recirculação de ar comprimido), que se manifesta como perda de eficiência e aquecimento adicional.",
    action: "Ação recomendada: programar a inspeção da folga entre os rotores e das engrenagens de sincronismo no próximo overhaul (não postergar, dado o risco de contato metal-metal), acompanhar a temperatura de descarga como indicador secundário entre inspeções, e tratar este caso com prioridade mais alta do que um sintoma equivalente num compressor lubrificado, exatamente pela ausência de margem de segurança entre os rotores."
  },
  {
    id: "c27",
    num: 27,
    level: "intermediário",
    title: "Compressor de parafuso isento de óleo com defeito de rolamento agravado por temperatura elevada",
    briefing: [
      "Compressor de ar isento de óleo (oil-free) dedicado a uma linha de processo farmacêutico que exige ar 100% livre de óleo — por projeto, esses compressores operam com temperaturas de descarga mais altas que os equivalentes lubrificados, já que não há óleo circulando para ajudar a resfriar a etapa de compressão.",
      "O rolamento do lado de acionamento do rotor macho vem registrando temperatura de mancal consistentemente mais alta que os demais pontos monitorados no mesmo compressor.",
      "O registro de manutenção mostra que o intervalo de relubrificação (graxa) desse mancal específico foi estendido além do recomendado pelo fabricante, numa tentativa de reduzir custos de parada."
    ],
    readings: { temp: 79, vel: 3.1, accel: 1.5, envelope: 2.2 },
    spectrum: {
      mode: "freq",
      xmax: 12,
      unit: "Ordens (x RPM) — espectro de envelope (gE)",
      peaks: [
        { order: 1, amp: 0.15 },
        { order: 3.8, amp: 0.6 },
        { order: 7.6, amp: 0.4 }
      ],
      noise: 0.2
    },
    trend: {
      unit: "gE Pk-Pk",
      months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      values: [0.7, 1.0, 1.4, 1.8, 2.0, 2.2],
      alertLimit: 1.8,
      dangerLimit: 2.6
    },
    diagnosisOptions: [
      { id: "a", text: "Defeito de rolamento agravado pela temperatura de operação elevada, típica de compressores oil-free" },
      { id: "b", text: "Problema de sincronismo entre os rotores macho e fêmea" },
      { id: "c", text: "Cavitação — não se aplica a compressores de ar" },
      { id: "d", text: "Folga mecânica na fixação da base do compressor" }
    ],
    correctDiagnosis: "a",
    checks: [
      {
        id: "bpfo_order",
        label: "Em qual ordem (x RPM) aparece o pico compatível com BPFO neste mancal?",
        type: "numeric",
        correct: 3.8,
        tolerance: 0.3
      },
      {
        id: "fator_termico",
        label: "Por que compressores oil-free tendem a operar com temperaturas mais altas nos mancais, favorecendo desgaste acelerado quando a relubrificação é adiada?",
        type: "mc",
        options: [
          { id: "sem_oleo_resfriar", text: "Não há óleo circulando para ajudar a resfriar/lubrificar a etapa de compressão e os mancais próximos" },
          { id: "sempre_mais_frio", text: "Na verdade, compressores oil-free operam mais frios que os lubrificados" }
        ],
        correct: "sem_oleo_resfriar"
      }
    ],
    hint: "Dica: \"isento de óleo\" (oil-free) se refere à câmara de compressão, não necessariamente aos mancais — que normalmente ainda usam graxa e seguem um intervalo de relubrificação próprio. Como esses compressores já operam em temperaturas de descarga mais altas por projeto, atrasar a relubrificação reduz ainda mais a vida da graxa e acelera o desgaste do rolamento, criando exatamente o quadro combinado de temperatura elevada + pico crescente em ordem compatível com BPFO observado aqui.",
    explanation: "O pico na ordem 3,8x RPM, com um segundo harmônico em 7,6x RPM, é compatível com um defeito de pista externa (BPFO) em estágio já perceptível na análise de envelope. A temperatura do mancal consistentemente mais alta que os demais pontos do compressor, somada ao histórico de relubrificação estendida além do recomendado, aponta para uma causa raiz combinada: a temperatura de operação naturalmente mais alta de um compressor oil-free reduz a vida útil da graxa mais rapidamente que em equipamentos convencionais, e o adiamento da relubrificação acelerou esse processo, levando ao desgaste prematuro da pista.",
    action: "Ação recomendada: corrigir imediatamente o intervalo de relubrificação para o valor especificado pelo fabricante (ou menor, dada a temperatura de operação), programar a substituição do rolamento na próxima parada disponível, e revisar se a graxa utilizada tem especificação térmica adequada para a faixa de temperatura observada nesse compressor."
  }
];
