// Gerado automaticamente por scripts/build_site.js + scripts/practice_cases.js + scripts/extra_cases_data.js + scripts/extra_cases_data_2.js — não editar manualmente.
// c1-c15: casos originais. c16-c21: centrífugas industriais, variantes de bomba centrífuga
// (vórtice de sucção, golpe de aríete) e bomba de vácuo. c22-c27: redutores (engrenagens),
// motores elétricos (barra de rotor quebrada, correntes de eixo por VFD) e compressores de
// parafuso isento de óleo (timing gears, rolamento agravado por temperatura).
const CASES = [
  {
    "id": "c1",
    "num": 1,
    "level": "básico",
    "title": "Bomba centrífuga com vibração radial elevada",
    "briefing": [
      "Motor-bomba acoplado, 1780 rpm, medição radial no mancal do lado acoplado.",
      "Vibração medida: 5,8 mm/s RMS, estável ao longo do tempo, mesma amplitude nas duas direções radiais (horizontal e vertical).",
      "Fase: estável e repetível entre medições sucessivas."
    ],
    "readings": {
      "temp": 42,
      "vel": 5.8,
      "accel": 0.6,
      "envelope": 0.12
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 5,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 1,
          "amp": 1
        },
        {
          "order": 2,
          "amp": 0.08
        },
        {
          "order": 3,
          "amp": 0.05
        }
      ]
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        3.2,
        3.6,
        4.1,
        4.6,
        5.2,
        5.8
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desbalanceamento de massa",
        "solution": "Balancear o rotor em campo (1 plano), corrigindo amplitude e fase em 1x RPM (Módulo 14)."
      },
      {
        "id": "b",
        "text": "Desalinhamento angular",
        "solution": "Realinhar o conjunto a laser, verificando soft foot antes do alinhamento final (Módulo 15)."
      },
      {
        "id": "c",
        "text": "Folga mecânica",
        "solution": "Inspecionar a fixação/folgas dos parafusos e do mancal, reapertando ou recondicionando as superfícies de encosto."
      },
      {
        "id": "d",
        "text": "Defeito de rolamento",
        "solution": "Confirmar via BPFO/BPFI no espectro e programar a substituição do rolamento na próxima janela de manutenção."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "order",
        "label": "Ordem do pico dominante (xRPM)",
        "type": "numeric",
        "correct": 1,
        "tolerance": 0.15
      },
      {
        "id": "dir",
        "label": "Direção mais afetada",
        "type": "mc",
        "options": [
          {
            "id": "radial",
            "text": "Radial"
          },
          {
            "id": "axial",
            "text": "Axial"
          }
        ],
        "correct": "radial"
      }
    ],
    "hint": "Dica: compare a amplitude do pico dominante nas duas direções radiais (horizontal x vertical) — elas são parecidas ou uma domina muito sobre a outra? E o envelope de aceleração está dentro da faixa normal (baixo) ou elevado?",
    "explanation": "1X domina o espectro, com amplitude praticamente igual em ambas as direções radiais e fase estável — assinatura clássica de desbalanceamento de massa (Módulo 6.1). Temperatura, aceleração e envelope normais confirmam que não há defeito de rolamento associado.",
    "action": "Ação recomendada: balanceamento de campo em um plano (Módulo 14), guiado por amplitude e fase em 1X.",
    "relatedModule": "m6",
    "relatedModuleLabel": "Módulo 6 — Catálogo de Falhas por Espectro: Desbalanceamento, Desalinhamento, Folga, Eixo Empenado, Excentricidade, Ressonância e Batimento"
  },
  {
    "id": "c2",
    "num": 2,
    "level": "básico",
    "title": "Motor-bomba com vibração axial dominante",
    "briefing": [
      "Motor de indução acoplado por luva flexível a uma bomba centrífuga, 3000 rpm.",
      "Vibração axial no acoplamento: pico em 2X maior que o pico em 1X.",
      "Fase axial entre motor e bomba, através do acoplamento, próxima de 180°."
    ],
    "readings": {
      "temp": 48,
      "vel": 6.3,
      "accel": 0.9,
      "envelope": 0.15
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 6,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.5
        },
        {
          "order": 2,
          "amp": 0.9
        },
        {
          "order": 3,
          "amp": 0.2
        }
      ]
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2.1,
        2.3,
        2.9,
        4,
        5.5,
        6.3
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desbalanceamento de massa",
        "solution": "Balancear o rotor em campo, corrigindo amplitude e fase em 1x RPM (Módulo 14)."
      },
      {
        "id": "b",
        "text": "Desalinhamento angular",
        "solution": "Realinhamento a laser do conjunto motor-bomba, verificando soft foot antes do alinhamento final (Módulo 15)."
      },
      {
        "id": "c",
        "text": "Excentricidade de polia",
        "solution": "Substituir a polia excêntrica ou corrigir sua usinagem/montagem no eixo."
      },
      {
        "id": "d",
        "text": "Ressonância",
        "solution": "Alterar a rigidez/massa da estrutura, ou a rotação de operação, para afastar a frequência natural da excitação."
      }
    ],
    "correctDiagnosis": "b",
    "checks": [
      {
        "id": "order",
        "label": "Ordem do pico dominante (xRPM)",
        "type": "numeric",
        "correct": 2,
        "tolerance": 0.15
      },
      {
        "id": "dir",
        "label": "Direção mais afetada",
        "type": "mc",
        "options": [
          {
            "id": "radial",
            "text": "Radial"
          },
          {
            "id": "axial",
            "text": "Axial"
          }
        ],
        "correct": "axial"
      }
    ],
    "hint": "Dica: quando o pico dominante é axial e vem acompanhado de uma diferença de fase de quase 180° entre os dois lados do acoplamento, pense em qual defeito 'empurra' os eixos em direções opostas.",
    "explanation": "2X axial dominante com ~180° de diferença de fase através do acoplamento é a assinatura de desalinhamento angular (Módulo 6.2). A temperatura ligeiramente elevada é coerente com o atrito extra no acoplamento; envelope normal descarta rolamento.",
    "action": "Ação recomendada: realinhamento a laser do conjunto motor-bomba, verificando soft foot antes do alinhamento final (Módulo 15).",
    "relatedModule": "m6",
    "relatedModuleLabel": "Módulo 6 — Catálogo de Falhas por Espectro: Desbalanceamento, Desalinhamento, Folga, Eixo Empenado, Excentricidade, Ressonância e Batimento"
  },
  {
    "id": "c11",
    "num": 3,
    "level": "básico",
    "title": "Rolamento em Estágio 1 — só aparece no envelope de aceleração",
    "briefing": [
      "Ventilador de exaustão, 1770 rpm, rolamentos rígidos de esferas, medição mensal de rotina.",
      "Velocidade de vibração global e aceleração pura seguem dentro da faixa normal, sem mudança perceptível em relação ao histórico.",
      "O envelope de aceleração (gE), no entanto, subiu de ~0,12 gE (baseline saudável) para 0,35 gE neste mês, com um pico discreto no espectro de envelope próximo à frequência de defeito de pista externa (BPFO) calculada."
    ],
    "readings": {
      "temp": 39,
      "vel": 2,
      "accel": 0.4,
      "envelope": 0.35
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 6,
      "unit": "Ordens (x RPM) — espectro de envelope (gE)",
      "peaks": [
        {
          "order": 3.2,
          "amp": 0.6
        },
        {
          "order": 1,
          "amp": 0.1
        }
      ],
      "noise": 0.05
    },
    "trend": {
      "unit": "gE Pk-Pk",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        0.11,
        0.12,
        0.13,
        0.18,
        0.24,
        0.35
      ],
      "alertLimit": 0.3,
      "dangerLimit": 0.6
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Rolamento em estágio inicial (Estágio 1)",
        "solution": "Não é necessário parar a máquina agora — aumentar a frequência de coleta e planejar a substituição na próxima parada programada."
      },
      {
        "id": "b",
        "text": "Máquina normal, sem defeito",
        "solution": "Nenhuma ação corretiva — manter o monitoramento de condição de rotina."
      },
      {
        "id": "c",
        "text": "Desbalanceamento leve",
        "solution": "Reavaliar a necessidade de balanceamento de campo apenas se a amplitude em 1x RPM também estiver elevada."
      },
      {
        "id": "d",
        "text": "Sensor com mau contato",
        "solution": "Verificar a fixação do acelerômetro (torque, superfície, cabo) e refazer a medição antes de qualquer outra ação."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "qual",
        "label": "Qual leitura já ultrapassou o limite de alerta?",
        "type": "mc",
        "options": [
          {
            "id": "vel",
            "text": "Velocidade (mm/s)"
          },
          {
            "id": "env",
            "text": "Envelope de aceleração (gE)"
          }
        ],
        "correct": "env"
      },
      {
        "id": "acao",
        "label": "Urgência de intervenção neste estágio",
        "type": "mc",
        "options": [
          {
            "id": "parar",
            "text": "Parar a máquina imediatamente"
          },
          {
            "id": "planejar",
            "text": "Aumentar frequência de monitoramento e planejar substituição"
          }
        ],
        "correct": "planejar"
      }
    ],
    "hint": "Dica: este é o motivo pelo qual coletores modernos (como os da linha SKF) sempre trazem uma quarta leitura além de temperatura, velocidade e aceleração — o envelope é sensível a impactos de altíssima frequência que ainda não aparecem nas outras três.",
    "explanation": "Velocidade e aceleração pura ainda estão normais porque, no Estágio 1, a energia liberada pelo defeito é muito pequena e de frequência muito alta para aparecer nessas duas leituras. O envelope de aceleração demodula justamente essa energia de impacto, revelando o defeito de rolamento muito antes (Módulo 7.4) — é a mesma lógica usada no software de coletores SKF, que reporta as quatro leituras (temperatura, velocidade, aceleração e envelope) lado a lado.",
    "action": "Ação recomendada: não é necessário parar a máquina agora — aumentar a frequência de coleta desse ponto e planejar a substituição do rolamento na próxima janela de manutenção, acompanhando a tendência do envelope.",
    "relatedModule": "m7",
    "relatedModuleLabel": "Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"
  },
  {
    "id": "c3",
    "num": 4,
    "level": "intermediário",
    "title": "Compressor com série completa de harmônicos",
    "briefing": [
      "Motor-compressor acoplado, 900 rpm, suspeita de problema no mancal do motor.",
      "Espectro com harmônicos de 1X a 7X e sub-harmônicos em 0,5X, 1,5X e 2,5X.",
      "Fase instável, variando a cada nova partida da máquina. Forma de onda no tempo mostra truncamento evidente."
    ],
    "readings": {
      "temp": 40,
      "vel": 6.1,
      "accel": 1.4,
      "envelope": 0.4
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 6.5,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 0.5,
          "amp": 0.25
        },
        {
          "order": 1,
          "amp": 0.7
        },
        {
          "order": 1.5,
          "amp": 0.3
        },
        {
          "order": 2,
          "amp": 0.55
        },
        {
          "order": 2.5,
          "amp": 0.2
        },
        {
          "order": 3,
          "amp": 0.4
        },
        {
          "order": 4,
          "amp": 0.3
        },
        {
          "order": 5,
          "amp": 0.22
        }
      ]
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        3,
        4.2,
        3.5,
        5,
        4.6,
        6.1
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desbalanceamento de acoplamento",
        "solution": "Balancear o conjunto em campo, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "b",
        "text": "Defeito de engrenagem",
        "solution": "Inspecionar os dentes de engrenagem via boroscopia e acompanhar a tendência do GMF."
      },
      {
        "id": "c",
        "text": "Folga mecânica (Tipo C)",
        "solution": "Inspeção interna do mancal, medição da folga real contra a folga de projeto, e substituição do componente com desgaste excessivo."
      },
      {
        "id": "d",
        "text": "Problema elétrico no estator",
        "solution": "Confirmar com análise de corrente do motor (MCSA) e inspeção elétrica do estator."
      }
    ],
    "correctDiagnosis": "c",
    "checks": [
      {
        "id": "subh",
        "label": "Menor sub-harmônico observado (xRPM)",
        "type": "numeric",
        "correct": 0.5,
        "tolerance": 0.1
      },
      {
        "id": "fase",
        "label": "Comportamento da fase entre medições",
        "type": "mc",
        "options": [
          {
            "id": "estavel",
            "text": "Estável e repetível"
          },
          {
            "id": "instavel",
            "text": "Instável, muda a cada partida"
          }
        ],
        "correct": "instavel"
      }
    ],
    "hint": "Dica: sub-harmônicos regulares em 0,5X, 1,5X, 2,5X (metades exatas de 1X) combinados com fase que muda a cada partida é uma combinação que só um tipo de defeito costuma produzir.",
    "explanation": "Série completa de harmônicos e sub-harmônicos (0,5X, 1,5X, 2,5X), fase instável e truncamento na forma de onda: assinatura clássica de folga mecânica Tipo C (Módulo 6.3). O envelope moderadamente elevado é coerente com os pequenos impactos gerados pela folga, mas sem o padrão discreto de BPFO/BPFI que indicaria rolamento.",
    "action": "Ação recomendada: inspeção interna do mancal, medição da folga real contra a folga de projeto, substituição do componente com desgaste excessivo.",
    "relatedModule": "m6",
    "relatedModuleLabel": "Módulo 6 — Catálogo de Falhas por Espectro: Desbalanceamento, Desalinhamento, Folga, Eixo Empenado, Excentricidade, Ressonância e Batimento"
  },
  {
    "id": "c4",
    "num": 5,
    "level": "intermediário",
    "title": "Ventilador acionado por correias com pico instável",
    "briefing": [
      "Ventilador industrial de tiragem, acionado por 4 correias em V.",
      "Pico dominante em uma frequência não síncrona, correspondente a 2× a frequência calculada da correia.",
      "Amplitude instável ao longo da coleta, pulsando com a rotação do equipamento acionado."
    ],
    "readings": {
      "temp": 38,
      "vel": 4.8,
      "accel": 0.5,
      "envelope": 0.1
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 3,
      "unit": "Ordens do eixo do motor (x RPM)",
      "peaks": [
        {
          "order": 0.3,
          "amp": 0.2
        },
        {
          "order": 0.6,
          "amp": 0.5
        },
        {
          "order": 0.9,
          "amp": 0.3
        },
        {
          "order": 1,
          "amp": 0.35
        },
        {
          "order": 1.2,
          "amp": 0.15
        }
      ]
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2.5,
        4,
        2.8,
        4.5,
        3,
        4.8
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Correia gasta, frouxa ou desigual",
        "solution": "Inspeção visual do jogo de correias, verificação de tensão, e substituição do jogo completo (nunca uma correia isolada)."
      },
      {
        "id": "b",
        "text": "Desalinhamento de polias",
        "solution": "Realinhar as polias (paralelismo e coplanaridade) usando régua ou laser."
      },
      {
        "id": "c",
        "text": "Ressonância da correia",
        "solution": "Ajustar o vão livre/tensão da correia para afastar sua frequência natural da rotação de operação."
      },
      {
        "id": "d",
        "text": "Desbalanceamento da polia",
        "solution": "Balancear a polia, corrigindo amplitude e fase em 1x RPM."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "estab",
        "label": "Amplitude estável ou instável ao longo do tempo?",
        "type": "mc",
        "options": [
          {
            "id": "estavel",
            "text": "Estável"
          },
          {
            "id": "instavel",
            "text": "Instável"
          }
        ],
        "correct": "instavel"
      },
      {
        "id": "dom",
        "label": "O pico dominante é múltiplo inteiro da rotação do motor?",
        "type": "mc",
        "options": [
          {
            "id": "sim",
            "text": "Sim"
          },
          {
            "id": "nao",
            "text": "Não"
          }
        ],
        "correct": "nao"
      }
    ],
    "hint": "Dica: se o pico não for um múltiplo inteiro exato da rotação do motor, ele provavelmente está ligado à frequência da própria correia, não do eixo.",
    "explanation": "Pico não síncrono (não é múltiplo inteiro de 1X do motor) em 2× a frequência da correia, com amplitude instável pulsando com a rotação do acionado: assinatura de correia gasta, frouxa ou desigual (Módulo 9). Temperatura, aceleração e envelope normais confirmam que não há componente rotativo (rolamento) envolvido.",
    "action": "Ação recomendada: inspeção visual do jogo de correias, verificação de tensão, substituição do jogo completo (nunca uma correia isolada).",
    "relatedModule": "m9",
    "relatedModuleLabel": "Módulo 9 — Correias e Transmissões"
  },
  {
    "id": "c7",
    "num": 6,
    "level": "intermediário",
    "title": "Bomba com ruído de banda larga na sucção",
    "briefing": [
      "Bomba centrífuga alimentando sistema com nível de reservatório de sucção variável.",
      "Ruído audível de 'pedregulhos' na sucção. Espectro mostra elevação de ruído aleatório de banda larga, sobreposto aos harmônicos de BPF.",
      "O ruído aumenta e diminui ao longo do dia, acompanhando o nível do reservatório."
    ],
    "readings": {
      "temp": 41,
      "vel": 5.3,
      "accel": 1.8,
      "envelope": 0.5
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 20,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 6,
          "amp": 0.9
        },
        {
          "order": 12,
          "amp": 0.3
        }
      ],
      "noise": 0.35
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2,
        5,
        2.5,
        4.8,
        2.2,
        5.3
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desgaste do impelidor",
        "solution": "Inspecionar/substituir o impelidor desgastado na próxima parada."
      },
      {
        "id": "b",
        "text": "Cavitação por baixa pressão de sucção",
        "solution": "Investigar a causa raiz da sucção insuficiente (nível de reservatório, perda de carga, filtro obstruído) antes de qualquer intervenção na bomba."
      },
      {
        "id": "c",
        "text": "Ressonância estrutural",
        "solution": "Reforçar a estrutura ou alterar a rotação para afastar a frequência natural."
      },
      {
        "id": "d",
        "text": "Desalinhamento",
        "solution": "Realinhar o conjunto motor-bomba a laser."
      }
    ],
    "correctDiagnosis": "b",
    "checks": [
      {
        "id": "causa",
        "label": "Causa raiz mais provável",
        "type": "mc",
        "options": [
          {
            "id": "npsh",
            "text": "NPSH insuficiente (baixa pressão de sucção)"
          },
          {
            "id": "geom",
            "text": "Defeito geométrico do impelidor"
          }
        ],
        "correct": "npsh"
      },
      {
        "id": "acao",
        "label": "Ação correta prioritária",
        "type": "mc",
        "options": [
          {
            "id": "trocar",
            "text": "Trocar o impelidor"
          },
          {
            "id": "investigar",
            "text": "Investigar a condição de sucção"
          }
        ],
        "correct": "investigar"
      }
    ],
    "hint": "Dica: repare que o ruído de banda larga (tanto no espectro quanto no envelope) acompanha o nível do reservatório ao longo do dia — um defeito mecânico fixo não se comportaria assim.",
    "explanation": "Ruído aleatório de banda larga sobreposto ao BPF, correlacionado com o nível de sucção: assinatura clássica de cavitação por NPSH insuficiente (Módulo 11.2 / Estudo de Caso 9), não um defeito mecânico fixo. A aceleração e o envelope elevados vêm do ruído de banda larga das bolhas implodindo, não de um padrão discreto de rolamento.",
    "action": "Ação recomendada: investigar a causa raiz da sucção insuficiente (nível de reservatório, perda de carga, filtro obstruído) antes de qualquer intervenção na bomba.",
    "relatedModule": "m11",
    "relatedModuleLabel": "Módulo 11 — Bombas, Ventiladores e Compressores"
  },
  {
    "id": "c9",
    "num": 7,
    "level": "intermediário",
    "title": "Rolamento com harmônicos de BPFO",
    "briefing": [
      "Rolamento com BPFO calculado em 3,5X RPM.",
      "Espectro mostra picos em 3,5X, 7X e 10,5X RPM, cada um cercado por bandas laterais espaçadas em 1X RPM."
    ],
    "readings": {
      "temp": 61,
      "vel": 7.8,
      "accel": 3.5,
      "envelope": 1.8
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 12,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 2.5,
          "amp": 0.25
        },
        {
          "order": 3.5,
          "amp": 0.7
        },
        {
          "order": 4.5,
          "amp": 0.25
        },
        {
          "order": 6,
          "amp": 0.2
        },
        {
          "order": 7,
          "amp": 0.55
        },
        {
          "order": 8,
          "amp": 0.2
        },
        {
          "order": 9.5,
          "amp": 0.15
        },
        {
          "order": 10.5,
          "amp": 0.4
        },
        {
          "order": 11.5,
          "amp": 0.15
        }
      ]
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        1.5,
        2,
        3,
        4.5,
        6,
        7.8
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Defeito de rolamento — Estágio 1 (submicroscópico)",
        "solution": "Apenas aumentar a frequência de monitoramento por envelope; ainda não há urgência de troca."
      },
      {
        "id": "b",
        "text": "Defeito de rolamento — Estágio 3 (estabelecido)",
        "solution": "Planejar a substituição do rolamento na próxima janela de manutenção disponível."
      },
      {
        "id": "c",
        "text": "Folga mecânica",
        "solution": "Inspecionar a fixação/folgas do mancal e reapertar conforme necessário."
      },
      {
        "id": "d",
        "text": "Desbalanceamento",
        "solution": "Balancear o conjunto em campo, corrigindo amplitude e fase em 1x RPM."
      }
    ],
    "correctDiagnosis": "b",
    "checks": [
      {
        "id": "harm",
        "label": "Qual harmônico da BPFO é o segundo pico observado?",
        "type": "numeric",
        "correct": 2,
        "tolerance": 0.1
      },
      {
        "id": "estagio",
        "label": "Estágio de falha mais consistente",
        "type": "mc",
        "options": [
          {
            "id": "e2",
            "text": "Estágio 2"
          },
          {
            "id": "e3",
            "text": "Estágio 3"
          }
        ],
        "correct": "e3"
      }
    ],
    "hint": "Dica: compare este caso com o do rolamento em Estágio 1 (mais cedo na trilha básica) — aqui, além do envelope, a temperatura, a velocidade e a aceleração TAMBÉM já estão fora da faixa normal. Isso diz algo sobre o estágio de evolução do defeito.",
    "explanation": "Picos discretos em 1×, 2× e 3× BPFO com bandas laterais em 1X RPM: assinatura de Estágio 3 (defeito estabelecido) — Módulo 7.4. Diferente do Estágio 1 (onde só o envelope está alterado), aqui temperatura, velocidade, aceleração e envelope já estão todos elevados — sinal de defeito avançado, não mais incipiente.",
    "action": "Ação recomendada: planejar a substituição do rolamento na próxima janela de manutenção disponível.",
    "relatedModule": "m7",
    "relatedModuleLabel": "Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"
  },
  {
    "id": "c12",
    "num": 8,
    "level": "intermediário",
    "title": "Mancal superaquecido por lubrificação deficiente",
    "briefing": [
      "Redutor de esteira transportadora, mancal de rolamento, reclamação de ruído de atrito metal-metal.",
      "Temperatura do mancal 71 °C (bem acima da média histórica de ~45 °C nesse ponto).",
      "Aceleração pura elevada, com ruído de banda larga em alta frequência, sem picos discretos organizados em harmônicos de BPFO/BPFI."
    ],
    "readings": {
      "temp": 71,
      "vel": 3,
      "accel": 3.8,
      "envelope": 0.9
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 15,
      "unit": "Ordens (x RPM) — espectro de aceleração (g)",
      "peaks": [
        {
          "order": 4,
          "amp": 0.4
        },
        {
          "order": 9,
          "amp": 0.35
        }
      ],
      "noise": 0.55
    },
    "trend": {
      "unit": "°C",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        44,
        45,
        47,
        53,
        62,
        71
      ],
      "alertLimit": 60,
      "dangerLimit": 80
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Lubrificação deficiente (atrito metal-metal)",
        "solution": "Relubrificar o mancal seguindo o plano do fabricante, e reinspecionar temperatura/envelope em 24-48h para confirmar a melhora."
      },
      {
        "id": "b",
        "text": "Defeito de rolamento — Estágio 3 (estabelecido)",
        "solution": "Planejar a substituição do rolamento na próxima parada."
      },
      {
        "id": "c",
        "text": "Desbalanceamento",
        "solution": "Balancear o conjunto, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "d",
        "text": "Cavitação",
        "solution": "Investigar a causa raiz da sucção insuficiente antes de qualquer intervenção mecânica."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "padrao",
        "label": "O ruído de alta frequência forma harmônicos discretos e regulares de BPFO/BPFI?",
        "type": "mc",
        "options": [
          {
            "id": "sim",
            "text": "Sim, harmônicos bem definidos"
          },
          {
            "id": "nao",
            "text": "Não, é ruído de banda larga sem padrão"
          }
        ],
        "correct": "nao"
      },
      {
        "id": "vel",
        "label": "Velocidade de vibração (mm/s) — dentro ou fora da faixa normal?",
        "type": "mc",
        "options": [
          {
            "id": "normal",
            "text": "Dentro da faixa normal"
          },
          {
            "id": "fora",
            "text": "Muito acima da faixa normal"
          }
        ],
        "correct": "normal"
      }
    ],
    "hint": "Dica: o gráfico de tendência deste caso mostra a temperatura, não a vibração — repare como ela sobe de forma constante nos últimos meses. Isso é coerente com desgaste progressivo de lubrificação, não com um defeito de rolamento já formado (que também elevaria bastante o envelope com picos discretos).",
    "explanation": "Temperatura muito acima do histórico, aceleração elevada em ruído de banda larga sem os harmônicos discretos característicos de BPFO/BPFI, e velocidade ainda dentro da faixa normal: esse conjunto aponta para atrito metal-metal por lubrificação deficiente, não para um defeito de rolamento já estabelecido (Módulo 7 / SKF — leitura combinada de temperatura + aceleração + envelope).",
    "action": "Ação recomendada: relubrificar o mancal seguindo o plano de lubrificação do fabricante, e reinspecionar a temperatura e o envelope em 24-48h para confirmar a normalização.",
    "relatedModule": "m7",
    "relatedModuleLabel": "Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"
  },
  {
    "id": "c13",
    "num": 9,
    "level": "intermediário",
    "title": "Engrenagem com desgaste identificado pela aceleração no GMF",
    "briefing": [
      "Redutor de esteira: pinhão de 22 dentes a 1200 rpm (20 Hz).",
      "Velocidade de vibração global ainda dentro da faixa normal.",
      "Espectro de aceleração mostra pico elevado exatamente na ordem 22 (GMF) e no seu segundo harmônico (44ª ordem), com bandas laterais discretas."
    ],
    "readings": {
      "temp": 52,
      "vel": 2.8,
      "accel": 5.5,
      "envelope": 0.25
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 26,
      "unit": "Ordens (x RPM do pinhão) — espectro de aceleração (g)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.1
        },
        {
          "order": 21,
          "amp": 0.2
        },
        {
          "order": 22,
          "amp": 1
        },
        {
          "order": 23,
          "amp": 0.2
        }
      ]
    },
    "trend": {
      "unit": "g RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        1.8,
        2.2,
        2.9,
        3.8,
        4.6,
        5.5
      ],
      "alertLimit": 4,
      "dangerLimit": 7
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desgaste/pitting nos dentes da engrenagem",
        "solution": "Inspeção boroscópica dos dentes na próxima parada programada e acompanhamento mensal da tendência de aceleração no GMF."
      },
      {
        "id": "b",
        "text": "Defeito de rolamento do pinhão",
        "solution": "Confirmar via BPFO/BPFI e planejar a substituição do rolamento do pinhão."
      },
      {
        "id": "c",
        "text": "Desbalanceamento do pinhão",
        "solution": "Balancear o pinhão, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "d",
        "text": "Ressonância estrutural do redutor",
        "solution": "Reforçar/enrijecer a estrutura de fixação do redutor."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "ordem",
        "label": "Ordem (xRPM do pinhão) onde está o pico principal de aceleração",
        "type": "numeric",
        "correct": 22,
        "tolerance": 0.5
      },
      {
        "id": "envelope",
        "label": "O envelope de aceleração está elevado ou normal?",
        "type": "mc",
        "options": [
          {
            "id": "elevado",
            "text": "Elevado"
          },
          {
            "id": "normal",
            "text": "Normal"
          }
        ],
        "correct": "normal"
      }
    ],
    "hint": "Dica: a ordem do pico principal é exatamente igual ao número de dentes do pinhão — isso é a definição da frequência de engrenamento (GMF). Repare também que o envelope segue normal, o que ajuda a descartar um dos diagnósticos da lista.",
    "explanation": "O pico dominante na ordem 22 (número de dentes do pinhão) e seu 2º harmônico na aceleração, com velocidade global ainda normal, é a assinatura de desgaste progressivo na superfície dos dentes (GMF elevada) — Módulo 8. O envelope normal ajuda a descartar defeito de rolamento, que produziria picos em BPFO/BPFI, não na ordem do número de dentes.",
    "action": "Ação recomendada: inspeção boroscópica dos dentes na próxima parada programada e acompanhamento mensal da tendência de aceleração no GMF.",
    "relatedModule": "m8",
    "relatedModuleLabel": "Módulo 8 — Engrenagens"
  },
  {
    "id": "c5",
    "num": 10,
    "level": "avançado",
    "title": "Redutor com bandas laterais ao redor da GMF",
    "briefing": [
      "Redutor de esteira: pinhão de 22 dentes a 1200 rpm (20 Hz); coroa de 88 dentes a 300 rpm (5 Hz).",
      "GMF calculada = 22 × 20 Hz = 440 Hz.",
      "Bandas laterais regulares e de alta amplitude ao redor da GMF, espaçadas em 20 Hz. Amplitude da GMF cai quando a carga aumenta."
    ],
    "readings": {
      "temp": 55,
      "vel": 3.4,
      "accel": 2.2,
      "envelope": 0.3
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 18,
      "unit": "Ordens (x RPM do pinhão)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.15
        },
        {
          "order": 2,
          "amp": 0.08
        },
        {
          "order": 7,
          "amp": 0.25
        },
        {
          "order": 8,
          "amp": 0.9
        },
        {
          "order": 9,
          "amp": 0.25
        },
        {
          "order": 16,
          "amp": 0.15
        }
      ]
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        1.8,
        2,
        2.3,
        2.6,
        3,
        3.4
      ],
      "alertLimit": 7.1,
      "dangerLimit": 11
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Dente trincado no pinhão",
        "solution": "Programar parada para inspeção boroscópica e troca do pinhão trincado o quanto antes."
      },
      {
        "id": "b",
        "text": "Folga excessiva associada ao pinhão",
        "solution": "Inspeção interna do redutor na próxima parada, com atenção ao pinhão e seus mancais."
      },
      {
        "id": "c",
        "text": "Desalinhamento do engrenamento",
        "solution": "Corrigir o alinhamento entre os eixos de entrada e saída do redutor."
      },
      {
        "id": "d",
        "text": "Excentricidade da coroa",
        "solution": "Inspecionar e, se necessário, substituir a coroa excêntrica."
      }
    ],
    "correctDiagnosis": "b",
    "checks": [
      {
        "id": "eixo",
        "label": "Qual eixo está modulando a GMF?",
        "type": "mc",
        "options": [
          {
            "id": "pinhao",
            "text": "Pinhão"
          },
          {
            "id": "coroa",
            "text": "Coroa"
          }
        ],
        "correct": "pinhao"
      },
      {
        "id": "carga",
        "label": "Amplitude de GMF com aumento de carga",
        "type": "mc",
        "options": [
          {
            "id": "sobe",
            "text": "Sobe"
          },
          {
            "id": "desce",
            "text": "Desce"
          }
        ],
        "correct": "desce"
      }
    ],
    "hint": "Dica: o espaçamento das bandas laterais (20 Hz) é igual à rotação de qual dos dois eixos? Isso indica de onde vem a modulação.",
    "explanation": "O espaçamento das bandas laterais (20 Hz) coincide com a rotação do pinhão, e a queda de amplitude de GMF com o aumento de carga é assinatura típica de folga no engrenamento associada ao pinhão (Módulo 8.2 / Estudo de Caso 3).",
    "action": "Ação recomendada: inspeção interna do redutor na próxima parada, com atenção ao pinhão e seus mancais.",
    "relatedModule": "m8",
    "relatedModuleLabel": "Módulo 8 — Engrenagens"
  },
  {
    "id": "c6",
    "num": 11,
    "level": "avançado",
    "title": "Motor de indução com bandas estreitas ao redor de 1X",
    "briefing": [
      "Motor de indução de 4 polos, 60 Hz, 220 kW, operando a 1764 rpm sob carga nominal.",
      "Espectro de banda larga aparentemente normal. Análise de banda estreita ao redor de 1X (29,4 Hz) revela bandas laterais simétricas em 19,8 Hz e 39,0 Hz."
    ],
    "readings": {
      "temp": 68,
      "vel": 3.8,
      "accel": 0.7,
      "envelope": 0.13
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 1.6,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 0.673,
          "amp": 0.25
        },
        {
          "order": 1,
          "amp": 1
        },
        {
          "order": 1.327,
          "amp": 0.25
        }
      ]
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2,
        2.2,
        2.5,
        2.9,
        3.3,
        3.8
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desbalanceamento residual",
        "solution": "Balancear o rotor do motor, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "b",
        "text": "Barras de rotor quebradas",
        "solution": "Confirmar com MCSA e planejar a remoção do rotor para inspeção/reparo na próxima parada programada."
      },
      {
        "id": "c",
        "text": "Problema no estator (entreferro)",
        "solution": "Inspecionar o entreferro/estator eletricamente e com termografia."
      },
      {
        "id": "d",
        "text": "Folga mecânica",
        "solution": "Inspecionar a fixação e as folgas dos mancais do motor."
      }
    ],
    "correctDiagnosis": "b",
    "checks": [
      {
        "id": "fp",
        "label": "Frequência de polo (2×fp) calculada, em Hz — escorregamento s=(1800-1764)/1800",
        "type": "numeric",
        "correct": 9.6,
        "tolerance": 0.5
      },
      {
        "id": "conf",
        "label": "Método de confirmação complementar recomendado",
        "type": "mc",
        "options": [
          {
            "id": "mcsa",
            "text": "Análise de corrente do motor (MCSA)"
          },
          {
            "id": "envelope",
            "text": "Técnica de envelope"
          }
        ],
        "correct": "mcsa"
      }
    ],
    "hint": "Dica: este defeito é elétrico, não mecânico — repare que a aceleração e o envelope de aceleração estão normais, mesmo com a temperatura elevada. Pense em qual técnica complementar (fora da análise de vibração pura) confirma defeitos elétricos do rotor.",
    "explanation": "Escorregamento s = 0,02; fs = 1,2 Hz; fp = 4×1,2 = 4,8 Hz; espaçamento esperado = 2×fp = 9,6 Hz — coincide com as bandas observadas (19,8 e 39,0 Hz ao redor de 29,4 Hz). Assinatura de barras de rotor quebradas (Módulo 10). Note que a aceleração e o envelope permanecem normais — reforçando que a origem é elétrica, não mecânica.",
    "action": "Ação recomendada: confirmar com análise de corrente do motor (MCSA) e planejar remoção do rotor para inspeção/reparo na próxima parada programada.",
    "relatedModule": "m10",
    "relatedModuleLabel": "Módulo 10 — Máquinas Elétricas"
  },
  {
    "id": "c8",
    "num": 12,
    "level": "avançado",
    "title": "Ventilador com BPF anormalmente alto",
    "briefing": [
      "Ventilador centrífugo, 8 pás, 1180 rpm, montado sobre base metálica elevada.",
      "BPF calculado = 8 × (1180/60) = 157,3 Hz. Vibração de 9,5 mm/s nessa frequência.",
      "Teste de impacto na base, com o ventilador parado, revelou frequência natural de 156 Hz."
    ],
    "readings": {
      "temp": 44,
      "vel": 9.5,
      "accel": 1,
      "envelope": 0.14
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 10,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.2
        },
        {
          "order": 8,
          "amp": 1
        }
      ]
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2.5,
        2.6,
        2.4,
        8.5,
        9,
        9.5
      ],
      "alertLimit": 7.1,
      "dangerLimit": 11
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desbalanceamento do rotor do ventilador",
        "solution": "Balancear o rotor do ventilador, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "b",
        "text": "Ressonância estrutural da base",
        "solution": "Reforçar estruturalmente a base ou adicionar massa para deslocar a frequência natural para fora da faixa de excitação."
      },
      {
        "id": "c",
        "text": "Defeito de rolamento",
        "solution": "Confirmar via BPFO/BPFI e planejar a substituição do rolamento."
      },
      {
        "id": "d",
        "text": "Cavitação",
        "solution": "Não se aplica a ventiladores de ar — investigar outras causas de ruído de banda larga antes."
      }
    ],
    "correctDiagnosis": "b",
    "checks": [
      {
        "id": "dif",
        "label": "Diferença percentual entre BPF e frequência natural",
        "type": "numeric",
        "correct": 0.8,
        "tolerance": 0.5
      },
      {
        "id": "acao",
        "label": "Ação correta",
        "type": "mc",
        "options": [
          {
            "id": "balancear",
            "text": "Balancear o ventilador"
          },
          {
            "id": "reforcar",
            "text": "Reforçar/alterar a rigidez da base"
          }
        ],
        "correct": "reforcar"
      }
    ],
    "hint": "Dica: compare o BPF calculado com a frequência natural medida no teste de impacto — quando duas frequências ficam essa perto uma da outra, o que costuma acontecer com a amplitude?",
    "explanation": "BPF (157,3 Hz) e frequência natural da base (156 Hz) praticamente coincidem (diferença < 1%) — ressonância estrutural amplificando o BPF normal do ventilador (Módulo 11, Estudo de Caso 6). Aceleração e envelope normais confirmam que a origem não é um defeito de rolamento.",
    "action": "Ação recomendada: reforçar estruturalmente a base ou adicionar massa para deslocar a frequência natural para fora da faixa de excitação.",
    "relatedModule": "m11",
    "relatedModuleLabel": "Módulo 11 — Bombas, Ventiladores e Compressores"
  },
  {
    "id": "c10",
    "num": 13,
    "level": "avançado",
    "title": "Redutor com impacto periódico na forma de onda",
    "briefing": [
      "Redutor de esteira, eixo de saída a 300 rpm (5 Hz).",
      "Espectro mostra amplitude elevada em 1X do eixo de saída e excitação da frequência natural da engrenagem, com bandas laterais na rotação do eixo de saída.",
      "Na forma de onda no tempo, um pico de impacto nítido se repete a cada 200 ms."
    ],
    "readings": {
      "temp": 58,
      "vel": 8.2,
      "accel": 4,
      "envelope": 2.1
    },
    "spectrum": {
      "mode": "time",
      "xmax": 0.6,
      "unit": "Tempo (s)",
      "peaks": [
        {
          "order": 0,
          "amp": 0.9
        },
        {
          "order": 0.2,
          "amp": 0.9
        },
        {
          "order": 0.4,
          "amp": 0.9
        },
        {
          "order": 0.6,
          "amp": 0.9
        }
      ],
      "width": 0.006
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2,
        2.2,
        2.8,
        4,
        6.5,
        8.2
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Dente trincado no eixo de entrada",
        "solution": "Programar inspeção/troca do pinhão de entrada."
      },
      {
        "id": "b",
        "text": "Dente trincado no eixo de saída",
        "solution": "Reduzir carga/rotação se possível até a próxima parada, e programar abertura do redutor para inspeção do conjunto de engrenagens do eixo de saída."
      },
      {
        "id": "c",
        "text": "Folga mecânica generalizada",
        "solution": "Inspecionar fixações e folgas em todo o conjunto do redutor."
      },
      {
        "id": "d",
        "text": "Desbalanceamento do eixo de saída",
        "solution": "Balancear o eixo de saída, corrigindo amplitude e fase em 1x RPM."
      }
    ],
    "correctDiagnosis": "b",
    "checks": [
      {
        "id": "freq",
        "label": "Rotação do eixo de saída calculada a partir do período (1/0,2 s), em Hz",
        "type": "numeric",
        "correct": 5,
        "tolerance": 0.2
      },
      {
        "id": "dominio",
        "label": "Domínio mais adequado para confirmar este defeito",
        "type": "mc",
        "options": [
          {
            "id": "tempo",
            "text": "Forma de onda no tempo"
          },
          {
            "id": "freq",
            "text": "Espectro (FFT)"
          }
        ],
        "correct": "tempo"
      }
    ],
    "hint": "Dica: o período entre impactos na forma de onda no tempo corresponde a 1 volta de qual eixo? Isso aponta diretamente para onde está o dente danificado.",
    "explanation": "O período entre impactos (200 ms) corresponde exatamente a 1/5 Hz — a rotação do eixo de saída — confirmando que o dente danificado está nesse eixo, não no de entrada (Módulo 8.2 / Estudo de Caso 10). Aceleração e envelope muito elevados são coerentes com o impacto mecânico já bem desenvolvido.",
    "action": "Ação recomendada: reduzir carga/rotação se possível até a próxima parada, programar abertura do redutor para inspeção do conjunto de engrenagens do eixo de saída.",
    "relatedModule": "m12",
    "relatedModuleLabel": "Módulo 12 — Forma de Onda no Tempo, Fase e Órbitas: Ferramentas de Confirmação Diagnóstica"
  },
  {
    "id": "c14",
    "num": 14,
    "level": "avançado",
    "title": "Rolamento avançando de Estágio 2 para Estágio 3 — leitura combinada",
    "briefing": [
      "Motor de bomba de processo, rolamento do lado do acoplamento, monitoramento quinzenal.",
      "Nos últimos meses, a velocidade de vibração começou a subir de forma mais acentuada — sinal de que o defeito já não é mais incipiente.",
      "Aceleração pura e envelope de aceleração seguem subindo juntos e de forma acelerada, já bem acima dos limites de alerta."
    ],
    "readings": {
      "temp": 58,
      "vel": 4.2,
      "accel": 6.8,
      "envelope": 3.2
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 12,
      "unit": "Ordens (x RPM) — espectro de envelope (gE)",
      "peaks": [
        {
          "order": 3.5,
          "amp": 0.9
        },
        {
          "order": 7,
          "amp": 0.6
        },
        {
          "order": 10.5,
          "amp": 0.35
        }
      ],
      "noise": 0.08
    },
    "trend": {
      "unit": "gE Pk-Pk",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        0.4,
        0.7,
        1.2,
        1.9,
        2.6,
        3.2
      ],
      "alertLimit": 1.5,
      "dangerLimit": 3
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Rolamento em Estágio 1 (submicroscópico)",
        "solution": "Apenas intensificar o monitoramento por envelope; ainda não há urgência."
      },
      {
        "id": "b",
        "text": "Rolamento em Estágio 3-4 (avançado, risco de falha iminente)",
        "solution": "Programar a substituição do rolamento com prioridade alta (curto prazo), evitando operar até o Estágio 4 (risco de dano ao eixo/mancal)."
      },
      {
        "id": "c",
        "text": "Folga mecânica leve",
        "solution": "Inspecionar fixações e reapertar conforme necessário, sem urgência de parada."
      },
      {
        "id": "d",
        "text": "Máquina normal",
        "solution": "Nenhuma ação corretiva necessária."
      }
    ],
    "correctDiagnosis": "b",
    "checks": [
      {
        "id": "cresce",
        "label": "Aceleração e envelope estão subindo juntos ou só um dos dois?",
        "type": "mc",
        "options": [
          {
            "id": "juntos",
            "text": "Os dois sobem juntos"
          },
          {
            "id": "so_env",
            "text": "Só o envelope sobe"
          }
        ],
        "correct": "juntos"
      },
      {
        "id": "prazo",
        "label": "Urgência de intervenção neste estágio",
        "type": "mc",
        "options": [
          {
            "id": "curto",
            "text": "Curto prazo — planejar parada em breve"
          },
          {
            "id": "longo",
            "text": "Longo prazo — apenas monitorar"
          }
        ],
        "correct": "curto"
      }
    ],
    "hint": "Dica: no Estágio 1, só o envelope se altera. Aqui, velocidade, aceleração E envelope já estão todos subindo juntos e de forma acelerada — isso é característico de qual fase da curva P-F (Módulo 7)?",
    "explanation": "Quando velocidade, aceleração e envelope sobem juntos e de forma acelerada, o defeito de rolamento já avançou da fase inicial (onde só o envelope reagia) para um estágio estabelecido (Estágio 3) com sinais de estar caminhando para o Estágio 4 (Módulo 7.4) — a curva P-F (Potencial-Falha) está próxima do ponto de falha funcional, exigindo ação em curto prazo.",
    "action": "Ação recomendada: programar a substituição do rolamento com prioridade alta (curto prazo), evitando operar até o Estágio 4 (risco de dano ao eixo/mancal).",
    "relatedModule": "m7",
    "relatedModuleLabel": "Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"
  },
  {
    "id": "c15",
    "num": 15,
    "level": "avançado",
    "title": "Defeito elétrico confirmado por aceleração de alta frequência",
    "briefing": [
      "Motor de indução de 36 ranhuras no rotor, acoplado a um compressor, operando continuamente.",
      "Temperatura do motor 76 °C, acima do normal para a carga aplicada.",
      "Espectro de aceleração mostra pico elevado numa ordem alta, coerente com a frequência de passagem das ranhuras do rotor (36× a rotação), sem sinais equivalentes no envelope de aceleração."
    ],
    "readings": {
      "temp": 76,
      "vel": 3.1,
      "accel": 4.5,
      "envelope": 0.2
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 40,
      "unit": "Ordens (x RPM) — espectro de aceleração (g)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.15
        },
        {
          "order": 35,
          "amp": 0.25
        },
        {
          "order": 36,
          "amp": 1
        },
        {
          "order": 37,
          "amp": 0.25
        }
      ]
    },
    "trend": {
      "unit": "°C",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        52,
        55,
        60,
        66,
        71,
        76
      ],
      "alertLimit": 65,
      "dangerLimit": 85
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Defeito elétrico (ranhuras/barras do rotor)",
        "solution": "Confirmar com MCSA e termografia, e programar inspeção elétrica do rotor na próxima parada."
      },
      {
        "id": "b",
        "text": "Defeito de rolamento",
        "solution": "Confirmar via BPFO/BPFI e planejar a substituição do rolamento."
      },
      {
        "id": "c",
        "text": "Desalinhamento",
        "solution": "Realinhar o conjunto a laser."
      },
      {
        "id": "d",
        "text": "Desbalanceamento",
        "solution": "Balancear o rotor, corrigindo amplitude e fase em 1x RPM."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "ordem",
        "label": "Ordem (xRPM) onde está o pico principal de aceleração",
        "type": "numeric",
        "correct": 36,
        "tolerance": 0.5
      },
      {
        "id": "envelope",
        "label": "O envelope de aceleração confirma um defeito mecânico de rolamento?",
        "type": "mc",
        "options": [
          {
            "id": "sim",
            "text": "Sim, está elevado"
          },
          {
            "id": "nao",
            "text": "Não, está normal"
          }
        ],
        "correct": "nao"
      }
    ],
    "hint": "Dica: a ordem do pico principal (36) é exatamente igual ao número de ranhuras do rotor — isso não é coincidência. Some a isso o envelope normal (que descarta rolamento) e a temperatura em alta.",
    "explanation": "O pico de aceleração exatamente na ordem correspondente ao número de ranhuras do rotor (36×), combinado com temperatura elevada e envelope de aceleração normal (descartando defeito de rolamento), é a assinatura de um defeito elétrico relacionado às ranhuras/barras do rotor (Módulo 10) — o mesmo tipo de defeito do caso das bandas laterais em 1X, mas aqui identificado diretamente na frequência de passagem das ranhuras em vez de bandas laterais.",
    "action": "Ação recomendada: confirmar com análise de corrente do motor (MCSA) e termografia, e programar inspeção elétrica do rotor na próxima parada.",
    "relatedModule": "m10",
    "relatedModuleLabel": "Módulo 10 — Máquinas Elétricas"
  },
  {
    "id": "c16",
    "num": 16,
    "level": "intermediário",
    "title": "Centrífuga industrial: \"está vibrando muito\" — mas é mesmo desbalanceamento?",
    "briefing": [
      "Centrífuga de cesto para desidratação de polpa de celulose, 1180 rpm, mancais de rolamento nas duas extremidades do eixo.",
      "O operador reportou apenas: \"a centrífuga está vibrando muito, principalmente depois que carregamos um lote novo\" — sem mais detalhes técnicos.",
      "Medição radial no mancal superior: pico dominante em 1X RPM, com amplitude quase idêntica nas direções horizontal e vertical, e fase estável e repetível entre partidas sucessivas."
    ],
    "readings": {
      "temp": 44,
      "vel": 6.9,
      "accel": 0.7,
      "envelope": 0.14
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 5,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 1,
          "amp": 1
        },
        {
          "order": 2,
          "amp": 0.1
        },
        {
          "order": 3,
          "amp": 0.06
        }
      ]
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2.8,
        3.1,
        3.9,
        4.8,
        5.9,
        6.9
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desbalanceamento de massa (provavelmente o cesto com carga distribuída de forma desigual)",
        "solution": "Balanceamento de campo em um plano (Módulo 14) e revisão do procedimento de carregamento do cesto para distribuir o lote de forma mais uniforme."
      },
      {
        "id": "b",
        "text": "Defeito de rolamento em estágio avançado",
        "solution": "Confirmar via BPFO/BPFI/envelope e planejar a substituição do rolamento."
      },
      {
        "id": "c",
        "text": "Folga mecânica na fixação do mancal",
        "solution": "Inspecionar e reapertar a fixação do mancal."
      },
      {
        "id": "d",
        "text": "Ressonância estrutural da base",
        "solution": "Reforçar a base ou afastar a rotação de operação da frequência natural."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "order",
        "label": "Ordem do pico dominante (xRPM)",
        "type": "numeric",
        "correct": 1,
        "tolerance": 0.15
      },
      {
        "id": "env",
        "label": "O envelope de aceleração está elevado (indicando defeito de rolamento associado)?",
        "type": "mc",
        "options": [
          {
            "id": "sim",
            "text": "Sim, bem acima do normal"
          },
          {
            "id": "nao",
            "text": "Não, dentro da faixa normal"
          }
        ],
        "correct": "nao"
      }
    ],
    "hint": "Dica: a queixa do operador (\"vibrando muito\") é apenas um SINTOMA, não um diagnóstico — o comentário sobre \"depois que carregamos um lote novo\" é a pista mais forte. Verifique se o pico dominante é 1X, com amplitude parecida nas duas direções radiais e fase estável — e se o envelope de aceleração (que apontaria defeito de rolamento) está normal ou elevado.",
    "explanation": "\"Vibrando muito\" é a queixa do operador, não o diagnóstico — o trabalho do analista é traduzir esse sintoma num espectro. Aqui, 1X domina com amplitude semelhante nas duas direções radiais e fase estável entre partidas: assinatura clássica de desbalanceamento de massa (Módulo 6.1), plausivelmente por uma distribuição desigual do lote de celulose no cesto. O envelope de aceleração normal descarta um defeito de rolamento como causa — importante não pular direto para \"deve ser o rolamento\" só porque o mancal é o ponto de medição.",
    "action": "Ação recomendada: balanceamento de campo em um plano (Módulo 14) e revisão do procedimento de carregamento do cesto para distribuir o lote de forma mais uniforme.",
    "relatedModule": "m6",
    "relatedModuleLabel": "Módulo 6 — Catálogo de Falhas por Espectro: Desbalanceamento, Desalinhamento, Folga, Eixo Empenado, Excentricidade, Ressonância e Batimento"
  },
  {
    "id": "c17",
    "num": 17,
    "level": "avançado",
    "title": "Centrífuga industrial com defeito de rolamento em estágio inicial",
    "briefing": [
      "Centrífuga decantadora de uma estação de tratamento de efluentes, 3550 rpm, rolamentos de rolos cônicos.",
      "Vibração global (velocidade RMS) ainda dentro da faixa normal, sem queixa perceptível do operador.",
      "O envelope de aceleração, monitorado mensalmente, subiu de forma consistente nos últimos três meses, com um pico discreto no espectro de envelope próximo à frequência de defeito de pista interna (BPFI) calculada."
    ],
    "readings": {
      "temp": 47,
      "vel": 2.4,
      "accel": 0.5,
      "envelope": 0.42
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 6,
      "unit": "Ordens (x RPM) — espectro de envelope (gE)",
      "peaks": [
        {
          "order": 4.1,
          "amp": 0.65
        },
        {
          "order": 1,
          "amp": 0.12
        }
      ],
      "noise": 0.05
    },
    "trend": {
      "unit": "gE Pk-Pk",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        0.13,
        0.14,
        0.19,
        0.26,
        0.33,
        0.42
      ],
      "alertLimit": 0.3,
      "dangerLimit": 0.6
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Defeito de rolamento em estágio inicial (Estágio 1-2)",
        "solution": "Aumentar a frequência de monitoramento por envelope, programar a substituição do rolamento na próxima janela de manutenção, e evitar postergar além do necessário."
      },
      {
        "id": "b",
        "text": "Desbalanceamento de massa",
        "solution": "Balancear o rotor, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "c",
        "text": "Máquina normal, sem defeito",
        "solution": "Nenhuma ação corretiva necessária."
      },
      {
        "id": "d",
        "text": "Cavitação no processo",
        "solution": "Investigar a causa raiz da sucção/processo antes de intervir mecanicamente."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "qual",
        "label": "Qual leitura já ultrapassou o limite de alerta?",
        "type": "mc",
        "options": [
          {
            "id": "vel",
            "text": "Velocidade (mm/s)"
          },
          {
            "id": "env",
            "text": "Envelope de aceleração (gE)"
          }
        ],
        "correct": "env"
      },
      {
        "id": "acao",
        "label": "Urgência de intervenção neste estágio",
        "type": "mc",
        "options": [
          {
            "id": "parar",
            "text": "Parar a máquina imediatamente"
          },
          {
            "id": "planejar",
            "text": "Aumentar frequência de monitoramento e planejar substituição"
          }
        ],
        "correct": "planejar"
      }
    ],
    "hint": "Dica: repare que a velocidade global ainda está normal — se você olhasse só para ela, diria que a máquina está saudável. É exatamente por isso que o envelope de aceleração existe: ele antecipa a detecção antes que o defeito apareça em velocidade (Módulo 7 e Módulo 19.3).",
    "explanation": "Velocidade de vibração normal, mas envelope de aceleração em tendência de alta consistente, com pico discreto próximo à BPFI calculada: assinatura de defeito de rolamento em estágio inicial (Estágios 1-2 do Módulo 19.3) — o tipo de achado que só aparece porque a planta monitora envelope de aceleração, não apenas velocidade global.",
    "action": "Ação recomendada: aumentar a frequência de monitoramento por envelope, programar a substituição do rolamento na próxima janela de manutenção, e evitar aguardar o defeito evoluir para os estágios 3-4.",
    "relatedModule": "m7",
    "relatedModuleLabel": "Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"
  },
  {
    "id": "c18",
    "num": 18,
    "level": "intermediário",
    "title": "Bomba centrífuga com vórtice de sucção por baixa submergência",
    "briefing": [
      "Bomba centrífuga alimentando um poço de sucção com nível de líquido variável, associado à demanda do processo a jusante.",
      "Ruído de banda larga sobreposto ao espectro, mais intenso quando o nível do poço fica abaixo de um determinado ponto — a equipe de operação confirma que, nesses períodos, é possível ver um vórtice de ar se formando na superfície do poço, próximo à tomada de sucção.",
      "Aceleração e envelope de aceleração elevados, mas sem os harmônicos discretos e regulares característicos de um defeito de rolamento."
    ],
    "readings": {
      "temp": 46,
      "vel": 4.2,
      "accel": 2.6,
      "envelope": 1.1
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 10,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.3
        },
        {
          "order": 2,
          "amp": 0.15
        }
      ],
      "noise": 0.7
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2,
        2.3,
        2.9,
        3.4,
        3.8,
        4.2
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Cavitação por vórtice de sucção (baixa submergência)",
        "solution": "Revisar o nível mínimo operacional do poço de sucção, considerar um defletor ou dispositivo antivórtice, e evitar operar abaixo do nível mínimo."
      },
      {
        "id": "b",
        "text": "Defeito de rolamento",
        "solution": "Confirmar via BPFO/BPFI e planejar a substituição do rolamento."
      },
      {
        "id": "c",
        "text": "Desbalanceamento de massa",
        "solution": "Balancear o rotor da bomba, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "d",
        "text": "Desalinhamento angular",
        "solution": "Realinhar o conjunto motor-bomba a laser."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "correlacao",
        "label": "O ruído de banda larga está correlacionado com o quê?",
        "type": "mc",
        "options": [
          {
            "id": "nivel",
            "text": "Nível do poço de sucção"
          },
          {
            "id": "temp",
            "text": "Temperatura ambiente"
          }
        ],
        "correct": "nivel"
      },
      {
        "id": "padrao",
        "label": "O ruído forma harmônicos discretos e regulares (como um defeito de rolamento)?",
        "type": "mc",
        "options": [
          {
            "id": "sim",
            "text": "Sim"
          },
          {
            "id": "nao",
            "text": "Não, é ruído de banda larga sem padrão fixo"
          }
        ],
        "correct": "nao"
      }
    ],
    "hint": "Dica: assim como na cavitação por NPSH insuficiente (Módulo 11.2), o ruído de banda larga aqui também está ligado a bolhas de ar/vapor implodindo — mas repare na causa raiz específica mencionada no briefing: um vórtice visível na superfície do poço, e não a pressão de sucção do sistema.",
    "explanation": "Ruído de banda larga que varia com o nível do poço de sucção, sem os harmônicos discretos característicos de rolamento, é a assinatura de cavitação por vórtice de sucção: quando a submergência da tomada de sucção é insuficiente, um vórtice de ar se forma e é arrastado para dentro da bomba, colapsando (implodindo) de forma semelhante às bolhas de vapor da cavitação por NPSH — mas aqui a causa raiz é o nível operacional do poço, não a pressão de sucção do sistema em si (Módulo 11.2).",
    "action": "Ação recomendada: revisar o nível mínimo operacional do poço de sucção, considerar instalar um defletor ou dispositivo antivórtice, e evitar operar abaixo da submergência mínima especificada pelo fabricante da bomba.",
    "relatedModule": "m11",
    "relatedModuleLabel": "Módulo 11 — Bombas, Ventiladores e Compressores"
  },
  {
    "id": "c19",
    "num": 19,
    "level": "avançado",
    "title": "Bomba centrífuga: golpe de aríete interferindo na leitura de vibração",
    "briefing": [
      "Bomba centrífuga de uma linha de recalque com uma válvula de bloqueio de fechamento rápido logo a jusante, operada em ciclos automáticos pelo sistema de controle.",
      "A leitura pontual de vibração, feita logo após um fechamento da válvula, mostrou um pico de amplitude muito alto e inconsistente — a medição seguinte, poucos minutos depois, voltou a valores normais sem nenhuma intervenção de manutenção.",
      "O padrão não se repete de forma consistente entre medições sucessivas, e os horários dos picos coincidem com os registros de fechamento da válvula no sistema de controle (SCADA)."
    ],
    "readings": {
      "temp": 41,
      "vel": 9.5,
      "accel": 1.2,
      "envelope": 0.2
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 8,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.25
        },
        {
          "order": 2.3,
          "amp": 0.2
        },
        {
          "order": 5.7,
          "amp": 0.3
        }
      ],
      "noise": 0.9
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2.6,
        8.9,
        2.4,
        9.1,
        2.5,
        9.5
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Golpe de aríete (evento transitório de processo, não defeito mecânico)",
        "solution": "Revisar a lógica de fechamento da válvula (fechamento mais gradual), avaliar um dispositivo de alívio, e não tratar como defeito mecânico da bomba."
      },
      {
        "id": "b",
        "text": "Defeito de rolamento em estágio avançado",
        "solution": "Confirmar via BPFO/BPFI de forma consistente entre medições antes de planejar a substituição."
      },
      {
        "id": "c",
        "text": "Desbalanceamento severo",
        "solution": "Balancear o rotor, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "d",
        "text": "Folga mecânica estrutural",
        "solution": "Inspecionar fixações e folgas da bomba e da base."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "repete",
        "label": "O padrão se repete de forma consistente entre medições sucessivas?",
        "type": "mc",
        "options": [
          {
            "id": "sim",
            "text": "Sim, sempre no mesmo nível"
          },
          {
            "id": "nao",
            "text": "Não, varia muito entre medições"
          }
        ],
        "correct": "nao"
      },
      {
        "id": "correlacao",
        "label": "Os picos de vibração coincidem com quê, segundo o SCADA?",
        "type": "mc",
        "options": [
          {
            "id": "valvula",
            "text": "Horários de fechamento da válvula de bloqueio"
          },
          {
            "id": "temp",
            "text": "Horários de troca de turno"
          }
        ],
        "correct": "valvula"
      }
    ],
    "hint": "Dica: compare este caso com o do rolamento em estágio avançado (Módulo 19) — lá, o padrão é ESTÁVEL e se repete a cada medição, com uma tendência de piora consistente ao longo do tempo. Aqui, os valores oscilam bruscamente entre medições consecutivas (2,6 → 8,9 → 2,4 → 9,1...), sem uma tendência real de piora — e coincidem com um evento externo do processo.",
    "explanation": "O ponto-chave deste caso é a INCONSISTÊNCIA: um defeito mecânico real (rolamento, desbalanceamento, folga) produz um padrão estável e repetível, com tendência de piora ao longo do tempo. Aqui, os valores oscilam bruscamente entre medições sem tendência real, e coincidem exatamente com os horários de fechamento da válvula de bloqueio registrados no SCADA — a assinatura de um evento transitório de processo (golpe de aríete), não de um defeito mecânico na bomba ou no rolamento. Tratar isso como defeito de rolamento levaria a uma troca desnecessária, sem resolver o problema real.",
    "action": "Ação recomendada: revisar a lógica de fechamento da válvula (tempo de fechamento mais gradual), avaliar a instalação de um dispositivo de alívio (válvula de alívio ou tanque hidropneumático) na linha, e não tratar como defeito mecânico da bomba antes de descartar a causa de processo.",
    "relatedModule": "m11",
    "relatedModuleLabel": "Módulo 11 — Bombas, Ventiladores e Compressores"
  },
  {
    "id": "c20",
    "num": 20,
    "level": "intermediário",
    "title": "Bomba centrífuga com defeito de rolamento no lado do acoplamento",
    "briefing": [
      "Bomba centrífuga de processo, 2960 rpm, rolamento rígido de esferas no lado acoplado ao motor.",
      "BPFO calculado para este rolamento: 4,7X RPM.",
      "Espectro de envelope de aceleração mostra pico discreto bem definido em 4,7X RPM, com bandas laterais espaçadas em 1X RPM ao redor."
    ],
    "readings": {
      "temp": 58,
      "vel": 5.1,
      "accel": 2.2,
      "envelope": 1.3
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 10,
      "unit": "Ordens (x RPM) — espectro de envelope (gE)",
      "peaks": [
        {
          "order": 3.7,
          "amp": 0.2
        },
        {
          "order": 4.7,
          "amp": 0.75
        },
        {
          "order": 5.7,
          "amp": 0.2
        },
        {
          "order": 9.4,
          "amp": 0.3
        }
      ],
      "noise": 0.08
    },
    "trend": {
      "unit": "gE Pk-Pk",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        0.2,
        0.3,
        0.45,
        0.7,
        1,
        1.3
      ],
      "alertLimit": 0.3,
      "dangerLimit": 0.6
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Defeito de rolamento — pista externa (BPFO), estágio estabelecido",
        "solution": "Planejar a substituição do rolamento do lado acoplado na próxima janela de manutenção, e verificar a lubrificação para descartar causa combinada."
      },
      {
        "id": "b",
        "text": "Cavitação",
        "solution": "Investigar a causa raiz da sucção insuficiente antes de intervir no rolamento."
      },
      {
        "id": "c",
        "text": "Desalinhamento angular",
        "solution": "Realinhar o conjunto motor-bomba a laser."
      },
      {
        "id": "d",
        "text": "Golpe de aríete",
        "solution": "Correlacionar os picos com eventos de válvula/processo antes de tratar como defeito mecânico."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "order",
        "label": "Ordem do pico dominante no envelope (xRPM)",
        "type": "numeric",
        "correct": 4.7,
        "tolerance": 0.2
      },
      {
        "id": "banda",
        "label": "As bandas laterais ao redor do pico principal estão espaçadas em quê?",
        "type": "mc",
        "options": [
          {
            "id": "1x",
            "text": "1X RPM do eixo"
          },
          {
            "id": "2x",
            "text": "2X RPM do eixo"
          }
        ],
        "correct": "1x"
      }
    ],
    "hint": "Dica: o valor calculado da BPFO (4,7X) bate exatamente com a ordem do pico dominante no envelope — e o envelope já ultrapassou bastante o limite de alerta, com tendência de piora consistente ao longo de seis meses (não uma oscilação abrupta como no golpe de aríete).",
    "explanation": "Pico discreto em 4,7X RPM (a BPFO calculada para este rolamento), cercado por bandas laterais em 1X RPM, com envelope de aceleração em tendência de alta consistente e já bem acima do limite de alerta: assinatura clara de defeito de pista externa (BPFO) já em estágio estabelecido (Módulo 7.4). Diferente do golpe de aríete (Estudo de Caso c19), aqui a tendência é estável e consistentemente crescente, não uma oscilação abrupta.",
    "action": "Ação recomendada: planejar a substituição do rolamento do lado acoplado na próxima janela de manutenção disponível, e verificar a lubrificação para descartar contribuição adicional.",
    "relatedModule": "m7",
    "relatedModuleLabel": "Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"
  },
  {
    "id": "c21",
    "num": 21,
    "level": "avançado",
    "title": "Bomba de vácuo com defeito de rolamento por contaminação de processo",
    "briefing": [
      "Bomba de vácuo de anel líquido, usada numa linha de embalagem a vácuo de uma planta de alimentos, 1750 rpm.",
      "Processo tem histórico de arraste de partículas finas do produto para dentro do sistema de vácuo, apesar do filtro de linha instalado.",
      "Envelope de aceleração elevado, com pico discreto próximo à frequência de defeito de pista interna (BPFI) calculada, e leve aumento de temperatura em relação ao histórico."
    ],
    "readings": {
      "temp": 52,
      "vel": 3.8,
      "accel": 1.6,
      "envelope": 0.85
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 8,
      "unit": "Ordens (x RPM) — espectro de envelope (gE)",
      "peaks": [
        {
          "order": 5.2,
          "amp": 0.6
        },
        {
          "order": 1,
          "amp": 0.15
        },
        {
          "order": 6.2,
          "amp": 0.2
        }
      ],
      "noise": 0.1
    },
    "trend": {
      "unit": "gE Pk-Pk",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        0.18,
        0.22,
        0.31,
        0.48,
        0.65,
        0.85
      ],
      "alertLimit": 0.3,
      "dangerLimit": 0.6
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Defeito de rolamento — pista interna (BPFI), provavelmente por contaminação",
        "solution": "Revisar a eficácia do filtro de linha e da vedação do rolamento contra o ambiente de processo, e programar a substituição do rolamento."
      },
      {
        "id": "b",
        "text": "Cavitação no anel líquido",
        "solution": "Verificar a vazão e o nível do líquido de selagem do anel líquido."
      },
      {
        "id": "c",
        "text": "Desbalanceamento do rotor",
        "solution": "Balancear o rotor, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "d",
        "text": "Golpe de aríete na linha de vácuo",
        "solution": "Correlacionar os picos com eventos de válvula/processo antes de tratar como defeito mecânico."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "order",
        "label": "Ordem do pico dominante no envelope (xRPM)",
        "type": "numeric",
        "correct": 5.2,
        "tolerance": 0.2
      },
      {
        "id": "causa",
        "label": "Causa raiz mais provável, dado o histórico do processo",
        "type": "mc",
        "options": [
          {
            "id": "contam",
            "text": "Contaminação por partículas finas do produto"
          },
          {
            "id": "eletrico",
            "text": "Problema elétrico no motor de acionamento"
          }
        ],
        "correct": "contam"
      }
    ],
    "hint": "Dica: o histórico do processo (arraste de partículas finas, apesar do filtro) é a pista mais forte sobre a causa raiz — pense em qual modo de falha do Módulo 20 está associado a partículas sólidas contaminando o rolamento.",
    "explanation": "Pico discreto na BPFI calculada, com envelope de aceleração em tendência de alta consistente e leve aumento de temperatura: defeito de rolamento (pista interna) em evolução. Dado o histórico de arraste de partículas finas do produto para o sistema de vácuo, a causa raiz mais provável é contaminação do lubrificante por partículas sólidas — o mesmo mecanismo de indentação por partículas detalhado no Módulo 21.2.2, que inicia fadiga prematura a partir de uma indentação na pista.",
    "action": "Ação recomendada: revisar a eficácia do filtro de linha e da vedação do rolamento contra o ambiente de processo, e programar a substituição do rolamento antes que o defeito evolua para estágios mais avançados.",
    "relatedModule": "m7",
    "relatedModuleLabel": "Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"
  },
  {
    "id": "c22",
    "num": 22,
    "level": "intermediário",
    "title": "Redutor industrial com desgaste avançado nas engrenagens (GMF elevado)",
    "briefing": [
      "Redutor de dois estágios que aciona uma esteira transportadora de minério de ferro, operando em ambiente abrasivo e com trocas de óleo frequentemente atrasadas pela equipe de manutenção.",
      "Operadores relatam um \"chiado\" metálico crescente ao longo dos últimos meses, que muda de intensidade conforme a carga na esteira aumenta ou diminui.",
      "A última troca de óleo mostrou partículas metálicas finas e brilhantes no fundo do dreno, em quantidade maior que o normal."
    ],
    "readings": {
      "temp": 58,
      "vel": 6.8,
      "accel": 2.1,
      "envelope": 1.1
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 40,
      "unit": "Ordens (x RPM do eixo de entrada)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.18
        },
        {
          "order": 33,
          "amp": 2.9
        },
        {
          "order": 32,
          "amp": 0.95
        },
        {
          "order": 34,
          "amp": 0.9
        }
      ],
      "noise": 0.35
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2,
        2.6,
        3.4,
        4.3,
        5.6,
        6.8
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desgaste avançado nos dentes de engrenagem (GMF elevado com bandas laterais)",
        "solution": "Inspeção boroscópica do conjunto de engrenagens no próximo desligamento programado, ferrografia do óleo, e correção da periodicidade de troca de óleo."
      },
      {
        "id": "b",
        "text": "Defeito de rolamento no eixo de saída do redutor",
        "solution": "Confirmar via BPFO/BPFI e planejar a substituição do rolamento."
      },
      {
        "id": "c",
        "text": "Desalinhamento entre o motor e o redutor",
        "solution": "Realinhar o conjunto motor-redutor a laser."
      },
      {
        "id": "d",
        "text": "Folga mecânica na fixação da base do redutor",
        "solution": "Inspecionar e reapertar a fixação da base do redutor."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "gmf_order",
        "label": "Em qual ordem (x RPM do eixo de entrada) aparece o pico de engrenamento (GMF), correspondente ao número de dentes do pinhão?",
        "type": "numeric",
        "correct": 33,
        "tolerance": 1
      },
      {
        "id": "sidebands",
        "label": "O que indicam as bandas laterais (sidebands) observadas ao redor do GMF, espaçadas em 1x RPM?",
        "type": "mc",
        "options": [
          {
            "id": "desgaste",
            "text": "Modulação de amplitude causada por desgaste ou excentricidade nos dentes"
          },
          {
            "id": "normal",
            "text": "Comportamento normal do engrenamento, sem significado diagnóstico"
          }
        ],
        "correct": "desgaste"
      }
    ],
    "hint": "Dica: engrenagens saudáveis também produzem um pico no GMF (número de dentes × RPM do eixo), mas de amplitude baixa e sem bandas laterais relevantes. Bandas espaçadas em 1x RPM ao redor do GMF indicam modulação de amplitude — sinal típico de desgaste distribuído, excentricidade do eixo do pinhão ou, em casos mais avançados, um dente lascado.",
    "explanation": "O pico dominante na ordem 33 (número de dentes do pinhão de entrada) com amplitude elevada, cercado por bandas laterais espaçadas em 1x RPM, é a assinatura clássica de desgaste avançado no engrenamento — não de um defeito de rolamento (que apareceria em ordens não-inteiras como BPFO/BPFI) nem de desalinhamento (que se manifestaria predominantemente em 1x e 2x RPM). A presença de partículas metálicas finas no óleo confirma a origem: material sendo removido da superfície dos dentes por desgaste abrasivo, agravado pelas trocas de óleo atrasadas.",
    "action": "Ação recomendada: inspeção boroscópica do conjunto de engrenagens no próximo desligamento programado, análise de partículas de desgaste no óleo (ferrografia) para confirmar a origem e a taxa de progressão, correção imediata da periodicidade de troca de óleo, e acompanhamento semanal da tendência do pico de GMF até a intervenção.",
    "relatedModule": "m8",
    "relatedModuleLabel": "Módulo 8 — Engrenagens"
  },
  {
    "id": "c23",
    "num": 23,
    "level": "avançado",
    "title": "Redutor: defeito de rolamento em estágio inicial no eixo de saída de baixíssima rotação",
    "briefing": [
      "Redutor de alta relação de redução cujo eixo de saída aciona um agitador de tanque de processo a apenas 45 rpm — uma rotação muito baixa para os padrões usuais de monitoramento.",
      "A equipe de confiabilidade reporta que a velocidade RMS global permanece dentro da faixa normal, sem nenhuma variação perceptível nas últimas semanas.",
      "O programa de monitoramento também acompanha o parâmetro de envelope (HFD), que vem subindo de forma consistente mês a mês nesse mesmo período."
    ],
    "readings": {
      "temp": 38,
      "vel": 1.8,
      "accel": 0.4,
      "envelope": 1.6
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 10,
      "unit": "Ordens (x RPM do eixo de saída) — espectro de envelope (gE)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.08
        },
        {
          "order": 3.2,
          "amp": 0.5
        },
        {
          "order": 6.4,
          "amp": 0.35
        }
      ],
      "noise": 0.05
    },
    "trend": {
      "unit": "gE Pk-Pk",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        0.4,
        0.6,
        0.9,
        1.2,
        1.6,
        2
      ],
      "alertLimit": 1.5,
      "dangerLimit": 2.5
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Defeito de rolamento em estágio inicial no eixo de saída (rotação muito baixa)",
        "solution": "Manter o monitoramento por envelope com frequência aumentada (semanal), e programar a substituição do rolamento na próxima janela de parada planejada."
      },
      {
        "id": "b",
        "text": "Desbalanceamento do eixo de saída",
        "solution": "Balancear o eixo de saída, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "c",
        "text": "Problema de lubrificação generalizado, sem defeito localizado",
        "solution": "Revisar o plano de lubrificação de todo o conjunto, sem foco num ponto localizado."
      },
      {
        "id": "d",
        "text": "Ressonância estrutural do agitador",
        "solution": "Reforçar a estrutura do agitador ou afastar a rotação da frequência natural."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "bpfo_order",
        "label": "Em qual ordem (x RPM do eixo de saída) aparece o pico compatível com BPFO neste caso?",
        "type": "numeric",
        "correct": 3.2,
        "tolerance": 0.3
      },
      {
        "id": "indicador",
        "label": "Qual parâmetro está mais sensível neste estágio inicial, dada a baixíssima rotação do eixo de saída (45 rpm)?",
        "type": "mc",
        "options": [
          {
            "id": "rms",
            "text": "Velocidade RMS global"
          },
          {
            "id": "envelope",
            "text": "Envelope / HFD (demodulação de alta frequência)"
          }
        ],
        "correct": "envelope"
      }
    ],
    "hint": "Dica: em eixos de rotação muito baixa (abaixo de ~100 rpm), a energia de impacto de um defeito de rolamento é fraca e se dilui dentro do espectro de velocidade convencional. O envelope (demodulação de alta frequência) amplifica seletivamente esses impactos e costuma ser o primeiro parâmetro a indicar o problema — muitas vezes semanas ou meses antes de qualquer alteração perceptível no RMS global.",
    "explanation": "Este caso ilustra uma limitação importante da velocidade RMS global em máquinas de baixíssima rotação: a energia liberada por um impacto localizado (como uma falha inicial de pista) é proporcional à velocidade de rotação, então em 45 rpm esses impactos são fracos demais para alterar de forma perceptível o RMS, mesmo que o defeito já esteja presente. O envelope, por demodular especificamente a energia de alta frequência gerada pelos impactos, revela a falha muito antes — como confirma o pico crescente na ordem 3,2x RPM (compatível com BPFO) e a tendência de subida consistente do parâmetro de envelope ao longo de seis meses.",
    "action": "Ação recomendada: manter o monitoramento por envelope com frequência aumentada (semanal), programar a substituição do rolamento na próxima janela de parada planejada (o estágio ainda é inicial, sem urgência de parada não programada), e evitar decisões baseadas apenas na velocidade RMS global em ativos de rotação muito baixa.",
    "relatedModule": "m7",
    "relatedModuleLabel": "Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"
  },
  {
    "id": "c24",
    "num": 24,
    "level": "avançado",
    "title": "Motor elétrico de indução com suspeita de barra de rotor quebrada",
    "briefing": [
      "Motor de indução trifásico de 200 cv acionando um exaustor de grande porte em operação contínua, sem variação recente de carga ou processo.",
      "Uma análise preliminar de assinatura de corrente do motor (MCSA), feita pela equipe elétrica, já havia levantado suspeita de um problema no circuito do rotor, mas sem confirmação mecânica.",
      "No espectro de vibração de alta resolução (zoom FFT), aparecem duas bandas laterais bem próximas de cada lado do pico de 1x RPM — só visíveis com uma resolução de frequência bem mais fina que a análise de rotina padrão."
    ],
    "readings": {
      "temp": 61,
      "vel": 3.4,
      "accel": 0.6,
      "envelope": 0.3
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 3,
      "unit": "Ordens (x RPM)",
      "peaks": [
        {
          "order": 1,
          "amp": 1.8
        },
        {
          "order": 0.94,
          "amp": 0.6
        },
        {
          "order": 1.06,
          "amp": 0.55
        }
      ],
      "noise": 0.15
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        2.2,
        2.5,
        2.8,
        3,
        3.2,
        3.4
      ],
      "alertLimit": 4.5,
      "dangerLimit": 7.1
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Barra de rotor quebrada (bandas laterais ao redor de 1x RPM espaçadas pela frequência de escorregamento)",
        "solution": "Confirmar com MCSA completa e formal, avaliar a severidade pelo número de barras afetadas, e planejar reparo/rebobinamento do rotor."
      },
      {
        "id": "b",
        "text": "Desbalanceamento residual do rotor",
        "solution": "Balancear o rotor do motor, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "c",
        "text": "Excentricidade estática do entreferro",
        "solution": "Verificar o entreferro do motor e a concentricidade da montagem do estator/rotor."
      },
      {
        "id": "d",
        "text": "Empeno do eixo do motor",
        "solution": "Verificar o batimento radial (TIR) do eixo e corrigir ou substituir se empenado."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "origem_banda",
        "label": "O que causa as bandas laterais observadas ao redor de 1x RPM neste caso?",
        "type": "mc",
        "options": [
          {
            "id": "escorregamento",
            "text": "Modulação pela frequência de escorregamento do motor — assinatura de barra de rotor quebrada"
          },
          {
            "id": "desbalance",
            "text": "Simplesmente desbalanceamento — não indica nenhum problema elétrico"
          }
        ],
        "correct": "escorregamento"
      },
      {
        "id": "metodo",
        "label": "Qual exame complementar confirma este diagnóstico de forma mais direta?",
        "type": "mc",
        "options": [
          {
            "id": "mcsa",
            "text": "MCSA — análise da assinatura de corrente do motor"
          },
          {
            "id": "termografia",
            "text": "Termografia da carcaça externa do motor"
          }
        ],
        "correct": "mcsa"
      }
    ],
    "hint": "Dica: barras de rotor quebradas produzem bandas laterais ao redor de 1x RPM espaçadas pela frequência de escorregamento (slip), que costuma ser muito pequena — por isso, na prática, essas bandas só aparecem com FFT de altíssima resolução (zoom FFT), diferente do espaçamento bem mais largo típico de folga mecânica ou desbalanceamento. A confirmação definitiva vem da análise de corrente elétrica (MCSA), que enxerga o mesmo fenômeno pelo lado elétrico.",
    "explanation": "O padrão observado — duas bandas laterais simétricas e muito próximas do pico de 1x RPM, visíveis apenas com resolução espectral elevada — é a assinatura vibratória clássica de uma ou mais barras de rotor quebradas ou trincadas em motores de indução. O rotor danificado cria uma assimetria magnética que se manifesta como uma modulação de amplitude na frequência de escorregamento (a diferença entre a rotação síncrona e a rotação real do rotor), distinta de um desbalanceamento comum (que não produz esse par de bandas) ou de uma excentricidade estática (que tende a gerar componentes em múltiplos da frequência de linha, não bandas ao redor de 1x RPM). A suspeita prévia levantada pelo MCSA reforça a origem elétrica do problema.",
    "action": "Ação recomendada: confirmar com uma análise MCSA completa e formal (não apenas preliminar), avaliar a severidade pelo número de barras afetadas, planejar a parada para reparo ou rebobinamento do rotor na primeira janela de manutenção disponível, e evitar partidas a plena carga até a intervenção, já que o esforço de partida agrava a propagação de trincas em barras já comprometidas.",
    "relatedModule": "m10",
    "relatedModuleLabel": "Módulo 10 — Máquinas Elétricas"
  },
  {
    "id": "c25",
    "num": 25,
    "level": "avançado",
    "title": "Motor elétrico acionado por inversor de frequência com defeito de rolamento por correntes de eixo",
    "briefing": [
      "Motor elétrico de 75 cv recentemente convertido de partida direta para acionamento por inversor de frequência (VFD), como parte de um projeto de eficiência energética.",
      "Poucos meses após a conversão, o rolamento do lado oposto ao acoplamento (que havia sido substituído por um novo há pouco tempo) passou a apresentar um ruído agudo intermitente.",
      "O espectro de envelope mostra uma série de harmônicos regularmente espaçados, com amplitudes semelhantes entre si — sem o decaimento gradual normalmente esperado num defeito mecânico comum."
    ],
    "readings": {
      "temp": 44,
      "vel": 2.6,
      "accel": 1.8,
      "envelope": 3.4
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 18,
      "unit": "Ordens (x RPM) — espectro de envelope (gE)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.1
        },
        {
          "order": 3.5,
          "amp": 0.4
        },
        {
          "order": 7,
          "amp": 0.5
        },
        {
          "order": 10.5,
          "amp": 0.45
        },
        {
          "order": 14,
          "amp": 0.4
        }
      ],
      "noise": 0.1
    },
    "trend": {
      "unit": "gE Pk-Pk",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        0.6,
        1.1,
        1.8,
        2.4,
        3,
        3.4
      ],
      "alertLimit": 2,
      "dangerLimit": 3
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Erosão elétrica (fluting) por correntes de eixo induzidas pelo inversor de frequência",
        "solution": "Instalar anel de aterramento de eixo ou rolamento isolado eletricamente no lado oposto ao acoplamento, e verificar o aterramento geral do sistema motor-inversor."
      },
      {
        "id": "b",
        "text": "Defeito de rolamento por fadiga mecânica clássica, sem relação com o acionamento",
        "solution": "Planejar a substituição normal do rolamento por fim de vida útil, sem necessidade de intervenção elétrica."
      },
      {
        "id": "c",
        "text": "Desalinhamento entre o motor e a carga acionada",
        "solution": "Realinhar o conjunto motor-carga a laser."
      },
      {
        "id": "d",
        "text": "Lubrificação inadequada (graxa incompatível)",
        "solution": "Corrigir o tipo/quantidade de graxa conforme especificação do fabricante do rolamento."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "padrao_harmonicos",
        "label": "O que é característico do padrão de harmônicos observado (vários harmônicos de amplitude semelhante, sem o decaimento típico)?",
        "type": "mc",
        "options": [
          {
            "id": "fluting",
            "text": "Erosão elétrica (fluting) — sulcos regulares na pista causados por descargas de corrente"
          },
          {
            "id": "fadiga",
            "text": "Fadiga mecânica clássica de rolamento (padrão decrescente e irregular)"
          }
        ],
        "correct": "fluting"
      },
      {
        "id": "causa_raiz",
        "label": "Qual é a causa raiz mais provável, dado que o motor foi recentemente convertido para acionamento por inversor (VFD)?",
        "type": "mc",
        "options": [
          {
            "id": "correntes_eixo",
            "text": "Correntes de eixo (shaft currents) por ausência de aterramento/anel de aterramento adequado"
          },
          {
            "id": "desalinhamento",
            "text": "Desalinhamento mecânico introduzido durante a conversão"
          }
        ],
        "correct": "correntes_eixo"
      }
    ],
    "hint": "Dica: reveja o Módulo 21 (Erosão Elétrica) — motores acionados por inversor de frequência podem desenvolver tensões de modo comum que se descarregam através do rolamento na forma de pequenas faíscas, criando sulcos regulares (fluting) na pista. O padrão de harmônicos igualmente espaçados e sem decaimento forte é a assinatura característica desse mecanismo, bem diferente da fadiga mecânica comum vista no Módulo 20.",
    "explanation": "O rolamento foi substituído recentemente, o que já reduz a probabilidade de fadiga clássica por fim de vida útil. O padrão observado — múltiplos harmônicos igualmente espaçados e de amplitude semelhante, sem o decaimento gradual característico de uma fadiga mecânica progressiva — é a assinatura típica de erosão elétrica (fluting) causada por correntes de eixo. A coincidência temporal com a conversão para acionamento por inversor de frequência é a pista central: inversores modernos geram tensões de modo comum de alta frequência que, sem um caminho de aterramento adequado (anel de aterramento do eixo, rolamento isolado no lado oposto ao acoplamento, etc.), descarregam repetidamente através da película de graxa do rolamento, formando os sulcos regulares responsáveis pelo padrão espectral observado.",
    "action": "Ação recomendada: instalar um anel de aterramento de eixo (shaft grounding ring) ou rolamento isolado eletricamente no lado oposto ao acoplamento, verificar a qualidade do aterramento geral do sistema motor-inversor, e programar a inspeção/substituição do rolamento afetado — sem essa correção elétrica, qualquer rolamento novo tende a repetir o mesmo padrão de falha em poucos meses.",
    "relatedModule": "m21",
    "relatedModuleLabel": "Módulo 21 — Falhas em Rolamentos III: Erosão Elétrica, Deformação Plástica, Fratura e Estudos de Caso"
  },
  {
    "id": "c26",
    "num": 26,
    "level": "avançado",
    "title": "Compressor de parafuso isento de óleo com desgaste nas engrenagens de sincronismo",
    "briefing": [
      "Compressor de parafuso isento de óleo (oil-free) de uma linha de ar comprimido para processo farmacêutico, onde os rotores macho e fêmea giram sincronizados por um par de engrenagens de sincronismo (timing gears) de alta precisão — sem qualquer contato direto ou lubrificação entre os próprios rotores.",
      "A equipe de manutenção relata um ruído metálico crescente nas últimas semanas, acompanhado de um leve aumento na temperatura de descarga do compressor.",
      "Diferente de um compressor de parafuso lubrificado (onde um filme de óleo entre os rotores absorve pequenas variações de folga), neste equipamento os rotores não podem se tocar em hipótese alguma."
    ],
    "readings": {
      "temp": 96,
      "vel": 5.2,
      "accel": 2.4,
      "envelope": 1
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 65,
      "unit": "Ordens (x RPM do rotor macho)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.12
        },
        {
          "order": 60,
          "amp": 3.2
        },
        {
          "order": 59,
          "amp": 1
        },
        {
          "order": 61,
          "amp": 0.95
        }
      ],
      "noise": 0.3
    },
    "trend": {
      "unit": "mm/s RMS",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        1.8,
        2.3,
        2.9,
        3.6,
        4.4,
        5.2
      ],
      "alertLimit": 3.5,
      "dangerLimit": 5
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Desgaste ou folga excessiva nas engrenagens de sincronismo (timing gears)",
        "solution": "Programar inspeção da folga entre os rotores e das engrenagens de sincronismo no próximo overhaul (não postergar, dado o risco de contato metal-metal)."
      },
      {
        "id": "b",
        "text": "Desbalanceamento do rotor macho",
        "solution": "Balancear o rotor, corrigindo amplitude e fase em 1x RPM."
      },
      {
        "id": "c",
        "text": "Defeito de rolamento no mancal do rotor fêmea",
        "solution": "Confirmar via BPFO/BPFI e planejar a substituição do rolamento."
      },
      {
        "id": "d",
        "text": "Pulsação normal de vazão, sem defeito real",
        "solution": "Nenhuma ação corretiva necessária além do monitoramento de rotina."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "funcao_timing",
        "label": "Qual é a função das engrenagens de sincronismo (timing gears) num compressor de parafuso ISENTO DE ÓLEO?",
        "type": "mc",
        "options": [
          {
            "id": "evitar_contato",
            "text": "Manter a folga sem contato entre os rotores macho e fêmea, já que não há óleo lubrificando essa interface"
          },
          {
            "id": "reduzir_ruido",
            "text": "Apenas reduzir o ruído do compressor, sem função de segurança do processo"
          }
        ],
        "correct": "evitar_contato"
      },
      {
        "id": "risco",
        "label": "Qual é o risco principal de ignorar este sintoma num compressor oil-free, em comparação com um compressor lubrificado?",
        "type": "mc",
        "options": [
          {
            "id": "contato_metal",
            "text": "Contato metal-metal entre os rotores, com risco de falha catastrófica"
          },
          {
            "id": "apenas_ruido",
            "text": "Apenas incômodo de ruído, sem risco real ao equipamento"
          }
        ],
        "correct": "contato_metal"
      }
    ],
    "hint": "Dica: em compressores de parafuso LUBRIFICADOS, um pequeno desgaste nas engrenagens de sincronismo costuma ser tolerável, pois o filme de óleo entre os rotores absorve alguma variação de folga. Em compressores ISENTOS DE ÓLEO, essa margem de segurança não existe — os rotores nunca podem se tocar. Por isso, o monitoramento do GMF das timing gears (aqui na ordem 60, com bandas laterais em 1x RPM) é ainda mais crítico neste tipo de máquina.",
    "explanation": "O pico dominante na ordem 60 (número de dentes das engrenagens de sincronismo), com bandas laterais espaçadas em 1x RPM do rotor macho, indica desgaste ou folga crescente no par de engrenagens de sincronismo — não um desbalanceamento (que apareceria isoladamente em 1x RPM) nem um defeito de rolamento (que produziria ordens não-inteiras características de BPFO/BPFI). O leve aumento na temperatura de descarga reforça o diagnóstico: folgas maiores entre os rotores permitem algum vazamento interno (recirculação de ar comprimido), que se manifesta como perda de eficiência e aquecimento adicional.",
    "action": "Ação recomendada: programar a inspeção da folga entre os rotores e das engrenagens de sincronismo no próximo overhaul (não postergar, dado o risco de contato metal-metal), acompanhar a temperatura de descarga como indicador secundário entre inspeções, e tratar este caso com prioridade mais alta do que um sintoma equivalente num compressor lubrificado, exatamente pela ausência de margem de segurança entre os rotores.",
    "relatedModule": "m8",
    "relatedModuleLabel": "Módulo 8 — Engrenagens"
  },
  {
    "id": "c27",
    "num": 27,
    "level": "intermediário",
    "title": "Compressor de parafuso isento de óleo com defeito de rolamento agravado por temperatura elevada",
    "briefing": [
      "Compressor de ar isento de óleo (oil-free) dedicado a uma linha de processo farmacêutico que exige ar 100% livre de óleo — por projeto, esses compressores operam com temperaturas de descarga mais altas que os equivalentes lubrificados, já que não há óleo circulando para ajudar a resfriar a etapa de compressão.",
      "O rolamento do lado de acionamento do rotor macho vem registrando temperatura de mancal consistentemente mais alta que os demais pontos monitorados no mesmo compressor.",
      "O registro de manutenção mostra que o intervalo de relubrificação (graxa) desse mancal específico foi estendido além do recomendado pelo fabricante, numa tentativa de reduzir custos de parada."
    ],
    "readings": {
      "temp": 79,
      "vel": 3.1,
      "accel": 1.5,
      "envelope": 2.2
    },
    "spectrum": {
      "mode": "freq",
      "xmax": 12,
      "unit": "Ordens (x RPM) — espectro de envelope (gE)",
      "peaks": [
        {
          "order": 1,
          "amp": 0.15
        },
        {
          "order": 3.8,
          "amp": 0.6
        },
        {
          "order": 7.6,
          "amp": 0.4
        }
      ],
      "noise": 0.2
    },
    "trend": {
      "unit": "gE Pk-Pk",
      "months": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun"
      ],
      "values": [
        0.7,
        1,
        1.4,
        1.8,
        2,
        2.2
      ],
      "alertLimit": 1.8,
      "dangerLimit": 2.6
    },
    "diagnosisOptions": [
      {
        "id": "a",
        "text": "Defeito de rolamento agravado pela temperatura de operação elevada, típica de compressores oil-free",
        "solution": "Corrigir imediatamente o intervalo de relubrificação para o valor especificado pelo fabricante, programar a substituição do rolamento, e revisar a especificação térmica da graxa."
      },
      {
        "id": "b",
        "text": "Problema de sincronismo entre os rotores macho e fêmea",
        "solution": "Inspecionar a folga e as engrenagens de sincronismo entre os rotores."
      },
      {
        "id": "c",
        "text": "Cavitação — não se aplica a compressores de ar",
        "solution": "Não se aplica a compressores de ar — investigar outras causas antes."
      },
      {
        "id": "d",
        "text": "Folga mecânica na fixação da base do compressor",
        "solution": "Inspecionar e reapertar a fixação da base do compressor."
      }
    ],
    "correctDiagnosis": "a",
    "checks": [
      {
        "id": "bpfo_order",
        "label": "Em qual ordem (x RPM) aparece o pico compatível com BPFO neste mancal?",
        "type": "numeric",
        "correct": 3.8,
        "tolerance": 0.3
      },
      {
        "id": "fator_termico",
        "label": "Por que compressores oil-free tendem a operar com temperaturas mais altas nos mancais, favorecendo desgaste acelerado quando a relubrificação é adiada?",
        "type": "mc",
        "options": [
          {
            "id": "sem_oleo_resfriar",
            "text": "Não há óleo circulando para ajudar a resfriar/lubrificar a etapa de compressão e os mancais próximos"
          },
          {
            "id": "sempre_mais_frio",
            "text": "Na verdade, compressores oil-free operam mais frios que os lubrificados"
          }
        ],
        "correct": "sem_oleo_resfriar"
      }
    ],
    "hint": "Dica: \"isento de óleo\" (oil-free) se refere à câmara de compressão, não necessariamente aos mancais — que normalmente ainda usam graxa e seguem um intervalo de relubrificação próprio. Como esses compressores já operam em temperaturas de descarga mais altas por projeto, atrasar a relubrificação reduz ainda mais a vida da graxa e acelera o desgaste do rolamento, criando exatamente o quadro combinado de temperatura elevada + pico crescente em ordem compatível com BPFO observado aqui.",
    "explanation": "O pico na ordem 3,8x RPM, com um segundo harmônico em 7,6x RPM, é compatível com um defeito de pista externa (BPFO) em estágio já perceptível na análise de envelope. A temperatura do mancal consistentemente mais alta que os demais pontos do compressor, somada ao histórico de relubrificação estendida além do recomendado, aponta para uma causa raiz combinada: a temperatura de operação naturalmente mais alta de um compressor oil-free reduz a vida útil da graxa mais rapidamente que em equipamentos convencionais, e o adiamento da relubrificação acelerou esse processo, levando ao desgaste prematuro da pista.",
    "action": "Ação recomendada: corrigir imediatamente o intervalo de relubrificação para o valor especificado pelo fabricante (ou menor, dada a temperatura de operação), programar a substituição do rolamento na próxima parada disponível, e revisar se a graxa utilizada tem especificação térmica adequada para a faixa de temperatura observada nesse compressor.",
    "relatedModule": "m7",
    "relatedModuleLabel": "Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"
  }
];
