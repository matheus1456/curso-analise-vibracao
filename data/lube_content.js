// Gerado automaticamente por scripts/add_lube_track.js + scripts/write_lube_content_v2.js — não editar manualmente.
// Trilha "Engenheiro de Lubrificação" (mlub1-mlub12), baseada no Body of Knowledge
// ICML (MLT I/II, MLA I/II/III), no catálogo de treinamento Noria e em artigos
// técnicos da Noria/Machinery Lubrication (RULER, MPC/verniz, ASCEND/ORS) e da
// Lubrin (LIS — Sistema de Identificação de Lubrificantes).
const LUBE_COURSE = [
  {
    "id": "mlub1",
    "title": "Módulo L1 — Fundamentos de Tribologia e Lubrificação",
    "body": [
      {
        "type": "p",
        "text": "A tribologia é a ciência do atrito, desgaste e lubrificação entre superfícies em movimento relativo. Para o Engenheiro de Confiabilidade, entender tribologia é entender por que máquinas falham — e por que a lubrificação correta é, isoladamente, uma das formas mais custo-efetivas de evitar falhas prematuras."
      },
      {
        "type": "h2",
        "text": "L1.1 Por que as máquinas falham"
      },
      {
        "type": "p",
        "text": "Falhas de máquinas raramente são \"aleatórias\": a grande maioria tem causa raiz identificável e evitável. Entre as causas mais recorrentes documentadas pela indústria (ICML, Noria) estão a lubrificação inadequada (lubrificante errado, quantidade errada ou contaminado), a falta de alinhamento/balanceamento, a instalação incorreta e a ausência de um programa estruturado de manutenção."
      },
      {
        "type": "bullet",
        "text": "Estudos da indústria atribuem entre 40% e 50% das falhas prematuras de máquinas rotativas a problemas relacionados à lubrificação — seja lubrificante errado, degradado ou contaminado."
      },
      {
        "type": "bullet",
        "text": "O impacto financeiro vai além do reparo: inclui perda de produção, retrabalho, custo de energia extra (atrito mal controlado consome mais energia) e risco de falhas catastróficas secundárias."
      },
      {
        "type": "bullet",
        "text": "O papel da lubrificação eficaz na prevenção de falhas é reduzir o atrito e o desgaste a níveis desprezíveis, ao mesmo tempo em que resfria, veda contra contaminantes e, no caso de óleos, transporta partículas de desgaste para fora da zona de contato."
      },
      {
        "type": "h2",
        "text": "L1.2 Regimes de lubrificação"
      },
      {
        "type": "image",
        "src": "assets/img/lub_01_stribeck.png",
        "caption": "Curva de Stribeck: os 3 regimes de lubrificação em função do parâmetro viscosidade×velocidade/carga."
      },
      {
        "type": "p",
        "text": "Entre duas superfícies em movimento relativo, a forma como o lubrificante realmente separa (ou não) essas superfícies define o regime de lubrificação — e cada regime tem uma relação diferente entre desgaste, atrito e vida útil do componente."
      },
      {
        "type": "bullet",
        "text": "Lubrificação hidrodinâmica (atrito de deslizamento): um filme de óleo espesso e contínuo, gerado pelo próprio movimento relativo das superfícies (efeito de cunha), separa completamente as superfícies. É o regime típico de mancais de deslizamento (bearings journal) bem projetados e lubrificados — desgaste praticamente nulo em operação normal."
      },
      {
        "type": "bullet",
        "text": "Lubrificação elasto-hidrodinâmica — EHD (atrito de rolamento): ocorre em contatos concentrados de rolamento (rolamentos de elementos rolantes, engrenagens), onde a pressão de contato é alta o suficiente para deformar elasticamente as superfícies e aumentar temporariamente a viscosidade do óleo na zona de contato, formando um filme fino porém eficaz."
      },
      {
        "type": "bullet",
        "text": "Lubrificação de filme misto: ocorre quando o filme de óleo é fino o suficiente para que asperezas das superfícies ocasionalmente se toquem — comum em partidas, paradas, baixa velocidade ou cargas muito altas. Gera desgaste mensurável, mesmo que pequeno, a cada ciclo."
      },
      {
        "type": "bullet",
        "text": "Lubrificação limítrofe (boundary): o filme fluido praticamente não existe; a proteção contra desgaste depende quase inteiramente de filmes químicos formados pelos aditivos (antidesgaste/extrema-pressão) reagindo com a superfície metálica. É o regime mais crítico e o que mais desgasta as superfícies."
      },
      {
        "type": "h2",
        "text": "L1.3 Funções de um lubrificante"
      },
      {
        "type": "bullet",
        "text": "Reduzir o atrito e o desgaste entre superfícies em movimento."
      },
      {
        "type": "bullet",
        "text": "Dissipar calor gerado pelo atrito e por processos do próprio equipamento."
      },
      {
        "type": "bullet",
        "text": "Selar contra a entrada de contaminantes (poeira, umidade) e, em motores, contra gases de combustão."
      },
      {
        "type": "bullet",
        "text": "Transportar partículas de desgaste e contaminantes para fora da zona de contato, até um filtro ou dreno."
      },
      {
        "type": "bullet",
        "text": "Proteger contra corrosão, formando uma película protetora sobre superfícies metálicas."
      },
      {
        "type": "bullet",
        "text": "Em alguns projetos, transmitir potência (sistemas hidráulicos) ou amortecer vibração/choque."
      },
      {
        "type": "h2",
        "text": "L1.4 O ciclo custo–benefício da lubrificação de precisão"
      },
      {
        "type": "p",
        "text": "Um programa de lubrificação de precisão (o lubrificante certo, na quantidade certa, no ponto certo, na frequência certa, limpo e seco) tem custo de implementação relativamente baixo comparado ao custo de uma falha evitável — e é justamente esse argumento que sustenta o Módulo 13 (Programa de Monitoramento) do curso de vibração: lubrificação e monitoramento de condição são disciplinas complementares, não concorrentes."
      },
      {
        "type": "quote",
        "text": "\"A certificação é a marca do profissional: cria uma estrutura formal de conhecimento, eleva o perfil de quem atua na área e garante aos gestores um padrão mínimo de competência.\" — adaptado do escopo do ICML (International Council for Machinery Lubrication)."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L1",
        "questions": [
          {
            "text": "Um mancal de deslizamento bem projetado, em regime estável de rotação, normalmente opera em qual regime de lubrificação, e por que isso resulta em desgaste próximo de zero?",
            "options": [
              {
                "id": "a",
                "text": "Regime hidrodinâmico — o movimento relativo das superfícies gera, por efeito de cunha, um filme de óleo espesso e contínuo que separa completamente as superfícies, sem contato metal-metal."
              },
              {
                "id": "b",
                "text": "Regime limítrofe (boundary) — os aditivos EP formam uma camada sólida permanente que substitui o filme de óleo."
              },
              {
                "id": "c",
                "text": "Regime misto — o contato metal-metal ocorre parcialmente, mas é compensado pela baixa velocidade de rotação."
              },
              {
                "id": "d",
                "text": "Regime elastohidrodinâmico — típico de mancais de deslizamento, nunca de rolamentos de elementos rolantes."
              }
            ],
            "correct": "a",
            "explanation": "No regime hidrodinâmico, o próprio movimento relativo das superfícies gera, por efeito de cunha, um filme de óleo espesso e contínuo que separa completamente as duas superfícies — sem contato metal-metal, o desgaste em operação estável tende a zero."
          },
          {
            "text": "Por que a lubrificação limítrofe (boundary) é considerada o regime mais crítico do ponto de vista de desgaste?",
            "options": [
              {
                "id": "a",
                "text": "Porque o filme fluido praticamente não existe, e a proteção contra contato direto entre asperezas depende quase inteiramente de filmes químicos de aditivos (antidesgaste/EP)."
              },
              {
                "id": "b",
                "text": "Porque é o único regime em que a viscosidade do óleo não tem nenhuma influência sobre o desgaste."
              },
              {
                "id": "c",
                "text": "Porque ocorre exclusivamente em altíssimas velocidades de rotação, fora do alcance de qualquer aditivo."
              },
              {
                "id": "d",
                "text": "Porque nesse regime o óleo é sempre substituído instantaneamente por graxa, tornando o aditivo irrelevante."
              }
            ],
            "correct": "a",
            "explanation": "Nesse regime o filme fluido praticamente não existe, e a proteção contra o contato direto entre asperezas metálicas depende quase inteiramente de filmes químicos de aditivos (antidesgaste/EP) — se o pacote de aditivos estiver esgotado ou for inadequado, o desgaste metal-metal ocorre diretamente."
          },
          {
            "text": "Além de reduzir o atrito, quais são outras funções de um lubrificante?",
            "options": [
              {
                "id": "a",
                "text": "Dissipar calor, selar contra contaminantes, transportar partículas de desgaste para fora da zona de contato e proteger contra corrosão."
              },
              {
                "id": "b",
                "text": "Aumentar permanentemente a dureza superficial dos componentes metálicos em contato."
              },
              {
                "id": "c",
                "text": "Substituir a necessidade de vedações (selos) em qualquer mancal ou rolamento."
              },
              {
                "id": "d",
                "text": "Eliminar completamente a necessidade de monitoramento de vibração da máquina."
              }
            ],
            "correct": "a",
            "explanation": "Além de reduzir o atrito, um lubrificante dissipa calor, sela contra contaminantes, transporta partículas de desgaste para fora da zona de contato e protege contra corrosão."
          }
        ]
      }
    ],
    "meta": {
      "num": "L1",
      "short": "Fundamentos de Tribologia",
      "level": "básico",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "A maioria das falhas de máquinas tem causa raiz evitável, e a lubrificação inadequada responde por parcela significativa delas.",
      "Os quatro regimes de lubrificação — hidrodinâmico, elasto-hidrodinâmico (EHD), filme misto e limítrofe (boundary) — determinam o quanto o lubrificante realmente separa as superfícies e, consequentemente, o desgaste esperado.",
      "Um lubrificante cumpre várias funções simultâneas: reduzir atrito, resfriar, selar contra contaminantes, transportar partículas de desgaste e proteger contra corrosão."
    ]
  },
  {
    "id": "mlub2",
    "title": "Módulo L2 — Óleos Base, Aditivos e Propriedades do Lubrificante",
    "body": [
      {
        "type": "p",
        "text": "Todo óleo lubrificante é formado por um óleo base (a maior parte do volume) mais um pacote de aditivos que corrige deficiências do óleo base ou adiciona propriedades que ele não possui naturalmente."
      },
      {
        "type": "h2",
        "text": "L2.1 Óleos base minerais"
      },
      {
        "type": "image",
        "src": "assets/img/lub_02_composicao_oleo.png",
        "caption": "Composição típica de um óleo lubrificante industrial: predominantemente óleo base, com um pacote de aditivos minoritário porém essencial."
      },
      {
        "type": "bullet",
        "text": "Parafínicos: alto índice de viscosidade natural, boa estabilidade à oxidação — os mais comuns em óleos industriais de uso geral."
      },
      {
        "type": "bullet",
        "text": "Nafténicos: melhor solvência e comportamento a baixa temperatura, porém menor índice de viscosidade — usados em aplicações específicas (óleos de processo, alguns fluidos de corte)."
      },
      {
        "type": "bullet",
        "text": "Classificação API (Grupos I a V): Grupo I (solvent-refined, menos refinado), Grupo II e III (hidrotratados/hidrocraqueados, maior pureza e desempenho), Grupo IV (PAO — polialfaolefinas, sintéticos), Grupo V (todos os demais sintéticos: ésteres, PAG, silicones etc.)."
      },
      {
        "type": "h2",
        "text": "L2.2 Óleos base sintéticos"
      },
      {
        "type": "bullet",
        "text": "PAO (polialfaolefinas): excelente estabilidade térmica e oxidativa, ótimo comportamento em baixa temperatura — amplamente usado em óleos industriais e de compressores premium."
      },
      {
        "type": "bullet",
        "text": "Ésteres (diéster, poliol-éster): boa lubricidade e biodegradabilidade, comuns em óleos de turbina a gás e lubrificantes de alto desempenho."
      },
      {
        "type": "bullet",
        "text": "Poliglicóis (PAG): não miscíveis com óleo mineral, muito usados em engrenagens de parafuso sem-fim (worm gears) por baixo coeficiente de atrito."
      },
      {
        "type": "bullet",
        "text": "Motivos típicos para escolher sintético: temperatura de operação extrema (muito alta ou muito baixa), necessidade de maior intervalo de troca, exigência de menor volatilidade/consumo, ou compatibilidade com aplicações de grau alimentício."
      },
      {
        "type": "h2",
        "text": "L2.3 Funções dos aditivos"
      },
      {
        "type": "table",
        "header": [
          "Aditivo",
          "Função"
        ],
        "rows": [
          [
            "Antioxidante",
            "Retarda a oxidação do óleo base, prolongando a vida útil do lubrificante."
          ],
          [
            "Antidesgaste (AW)",
            "Forma filme químico protetor em condições de filme misto/limítrofe (ex.: ZDDP)."
          ],
          [
            "Extrema pressão (EP)",
            "Reage quimicamente sob pressão/temperatura extremas, evitando solda a frio entre asperezas (comum em óleos de engrenagem)."
          ],
          [
            "Melhorador de índice de viscosidade (VI improver)",
            "Reduz a variação da viscosidade com a temperatura, permitindo óleos multigrau."
          ],
          [
            "Detergente / Dispersante",
            "Mantém partículas e produtos de oxidação em suspensão, evitando depósitos e verniz."
          ],
          [
            "Inibidor de corrosão / ferrugem",
            "Forma película protetora sobre superfícies metálicas contra umidade e ácidos."
          ],
          [
            "Antiespumante",
            "Reduz a formação de espuma, que compromete a lubrificação e acelera a oxidação."
          ],
          [
            "Depressor de ponto de fluidez",
            "Mantém o óleo fluido em baixas temperaturas."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "L2.4 Propriedades físico-químicas usadas para especificar e monitorar o lubrificante"
      },
      {
        "type": "image",
        "src": "assets/img/lub_03_viscosidade_temperatura.png",
        "caption": "Efeito do Índice de Viscosidade (VI): quanto maior o VI, mais estável a viscosidade permanece ao longo da faixa de temperatura de operação."
      },
      {
        "type": "bullet",
        "text": "Viscosidade cinemática (ASTM D445, em cSt a 40 °C ou 100 °C): a propriedade mais importante do óleo — determina a espessura do filme lubrificante em cada regime."
      },
      {
        "type": "bullet",
        "text": "Índice de viscosidade — VI (ASTM D2270): mede o quanto a viscosidade varia com a temperatura; quanto maior o VI, mais estável o óleo é ao longo de uma faixa ampla de temperatura de operação."
      },
      {
        "type": "bullet",
        "text": "Número de acidez total — TAN/AN (ASTM D974/D664): indica o nível de produtos ácidos de oxidação acumulados; tendência de subida ao longo do tempo é sinal de degradação oxidativa."
      },
      {
        "type": "bullet",
        "text": "Número de basicidade total — TBN/BN (ASTM D974/D2896): mede a reserva alcalina disponível para neutralizar ácidos (crítico em óleos de motor); queda ao longo do tempo indica esgotamento da reserva alcalina."
      },
      {
        "type": "bullet",
        "text": "Ponto de fulgor (flash point) e ponto de fluidez (pour point): limites de segurança térmica e de bombeabilidade a frio, respectivamente."
      },
      {
        "type": "h2",
        "text": "L2.5 Lubrificantes de grau alimentício e ambientalmente amigáveis"
      },
      {
        "type": "p",
        "text": "Lubrificantes de grau alimentício (classificação NSF H1/H2/H3, antiga USDA) são exigidos sempre que houver possibilidade de contato incidental com alimentos — obrigatório em muitas plantas de processamento de alimentos sob a legislação FSMA (Food Safety Modernization Act). Lubrificantes biodegradáveis/ambientalmente amigáveis (muitas vezes à base de éster) são exigidos em aplicações com risco de vazamento em ambientes sensíveis (ex.: equipamentos florestais, marítimos, hidrelétricas)."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L2",
        "questions": [
          {
            "text": "Um óleo de engrenagens industriais precisa de proteção contra soldagem a frio das asperezas sob cargas de choque muito altas. Qual classe de aditivo é a mais indicada?",
            "options": [
              {
                "id": "a",
                "text": "Aditivos de extrema pressão (EP) — reagem quimicamente com a superfície metálica sob pressão/temperatura extremas, formando uma camada de sacrifício que evita a solda a frio entre asperezas."
              },
              {
                "id": "b",
                "text": "Antioxidantes fenólicos — retardam a oxidação do óleo base, sem relação com proteção mecânica sob choque de carga."
              },
              {
                "id": "c",
                "text": "Detergentes/dispersantes — mantêm partículas em suspensão, sem função de proteção contra solda a frio."
              },
              {
                "id": "d",
                "text": "Depressores de ponto de fluidez — melhoram o comportamento em baixa temperatura, sem relação com cargas de choque."
              }
            ],
            "correct": "a",
            "explanation": "Os aditivos de extrema pressão (EP) reagem quimicamente com a superfície metálica sob pressão e temperatura extremas, formando uma camada de sacrifício que evita a solda a frio entre as asperezas, típica de engrenagens sob choque de carga."
          },
          {
            "text": "O TAN (número de acidez total) de um óleo em uso vem subindo de forma consistente nas últimas 3 análises. O que isso indica, e que ação um analista de óleo deveria considerar?",
            "options": [
              {
                "id": "a",
                "text": "Degradação oxidativa progressiva do óleo — investigar a causa (temperatura elevada, contaminação catalítica, tempo de uso excessivo) e avaliar troca ou reforço de antioxidante antes que a viscosidade e o verniz se agravem."
              },
              {
                "id": "b",
                "text": "Contaminação por água apenas — basta trocar o filtro de ar do reservatório para reverter o TAN."
              },
              {
                "id": "c",
                "text": "Excesso de aditivo antidesgaste — recomenda-se diluir o óleo com óleo novo em qualquer proporção."
              },
              {
                "id": "d",
                "text": "É uma variação normal sem significado técnico, já que o TAN nunca se relaciona à vida útil do óleo."
              }
            ],
            "correct": "a",
            "explanation": "TAN em alta e consistente é sinal de degradação oxidativa progressiva do óleo base — o analista deve investigar a causa (temperatura elevada, contaminação catalítica, tempo de uso excessivo) e avaliar troca ou reforço de aditivo antioxidante antes que a viscosidade e a formação de verniz se agravem."
          },
          {
            "text": "Por que um óleo sintético PAO costuma ser preferido a um mineral do Grupo I em compressores operando em temperaturas extremas?",
            "options": [
              {
                "id": "a",
                "text": "O PAO tem estabilidade térmica e oxidativa muito superior, além de excelente comportamento em baixa temperatura (menor ponto de fluidez, melhor fluidez a frio)."
              },
              {
                "id": "b",
                "text": "O PAO é sempre mais barato que o mineral do Grupo I, o que justifica a preferência exclusivamente por custo."
              },
              {
                "id": "c",
                "text": "O mineral do Grupo I não pode, por lei, ser utilizado em compressores industriais."
              },
              {
                "id": "d",
                "text": "O PAO elimina totalmente a necessidade de qualquer pacote de aditivos no óleo formulado."
              }
            ],
            "correct": "a",
            "explanation": "O PAO tem estabilidade térmica e oxidativa muito superior ao mineral do Grupo I, além de excelente comportamento em baixa temperatura (menor ponto de fluidez, melhor fluidez a frio) — características essenciais quando a faixa de temperatura de operação é extrema."
          }
        ]
      }
    ],
    "meta": {
      "num": "L2",
      "short": "Óleos Base e Aditivos",
      "level": "básico",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "Um óleo lubrificante é o óleo base (mineral parafínico/nafténico ou sintético como PAO, éster, PAG) mais um pacote de aditivos que corrige deficiências ou adiciona propriedades.",
      "Cada classe de aditivo cumpre uma função específica: antioxidante, antidesgaste (AW), extrema pressão (EP), melhorador de VI, detergente/dispersante, inibidor de corrosão, antiespumante.",
      "Viscosidade, índice de viscosidade (VI), TAN e TBN são as propriedades mais usadas tanto para especificar quanto para monitorar a saúde de um lubrificante em uso."
    ]
  },
  {
    "id": "mlub3",
    "title": "Módulo L3 — Graxas Lubrificantes",
    "body": [
      {
        "type": "p",
        "text": "Graxa é, essencialmente, óleo lubrificante disperso em um espessante (thickener) — uma estrutura semi-sólida que retém o óleo e o libera lentamente na zona de contato. É a escolha natural sempre que o ponto de lubrificação não pode ou não deve reter um lubrificante fluido (selos simples, posição vertical, baixa rotação, difícil acesso para relubrificação frequente)."
      },
      {
        "type": "h2",
        "text": "L3.1 Como a graxa é feita"
      },
      {
        "type": "image",
        "src": "assets/img/lub_04_estrutura_graxa.png",
        "caption": "Estrutura da graxa: uma rede de fibras do espessante retém o óleo lubrificante por capilaridade."
      },
      {
        "type": "p",
        "text": "Uma graxa é composta por três elementos: óleo base (60% a 95% do volume — determina o desempenho em temperatura e carga, igual a um óleo lubrificante comum), espessante (a estrutura que retém o óleo, tipicamente um sabão metálico) e aditivos (antidesgaste, EP, antioxidante, inibidor de corrosão — mesmas famílias usadas em óleos)."
      },
      {
        "type": "h2",
        "text": "L3.2 Tipos de espessante e compatibilidade"
      },
      {
        "type": "table",
        "header": [
          "Espessante",
          "Características principais"
        ],
        "rows": [
          [
            "Lítio / Lítio-complexo",
            "O mais usado na indústria em geral; bom equilíbrio de propriedades; lítio-complexo suporta temperaturas mais altas."
          ],
          [
            "Cálcio-sulfonato (complexo)",
            "Excelente resistência à água e proteção EP inerente (sem necessidade de aditivo EP adicional); alto desempenho, mais cara."
          ],
          [
            "Poliureia (polyurea)",
            "Muito usada em motores elétricos seláveis por vida; boa estabilidade térmica e ao cisalhamento; NÃO compatível com muitas graxas de lítio."
          ],
          [
            "Argila (bentonita)",
            "Não derrete (não tem ponto de gota definido); usada em aplicações de altíssima temperatura."
          ],
          [
            "Alumínio-complexo",
            "Boa resistência à água e adesividade; comum em ambientes úmidos/marítimos."
          ]
        ]
      },
      {
        "type": "bullet",
        "text": "Compatibilidade de espessantes é crítica: misturar graxas de espessantes incompatíveis (ex.: poliureia com lítio comum) pode amolecer drasticamente a graxa resultante, destruindo sua capacidade de reter óleo na zona de contato — sempre verificar a tabela de compatibilidade do fabricante antes de trocar de marca/tipo em um ponto de lubrificação."
      },
      {
        "type": "h2",
        "text": "L3.3 Consistência (NLGI) e ponto de gota"
      },
      {
        "type": "image",
        "src": "assets/img/lub_05_escala_nlgi.png",
        "caption": "Escala de consistência NLGI — o grau 2 é o mais usado em aplicações gerais de mancais e rolamentos."
      },
      {
        "type": "p",
        "text": "A consistência de uma graxa é medida em graus NLGI (National Lubricating Grease Institute), de 000 (quase fluida) a 6 (muito dura). A escolha do grau depende da temperatura de operação, da velocidade do componente e do método de aplicação (graxeira manual, sistema automático)."
      },
      {
        "type": "table",
        "header": [
          "Grau NLGI",
          "Consistência típica / uso comum"
        ],
        "rows": [
          [
            "000 – 00",
            "Semifluida — engrenagens fechadas, sistemas centralizados de baixa temperatura."
          ],
          [
            "1",
            "Macia — sistemas automáticos, baixa temperatura, bombeamento fácil."
          ],
          [
            "2",
            "Uso geral mais comum — mancais e rolamentos em condições normais."
          ],
          [
            "3",
            "Firme — rolamentos verticais, temperaturas mais altas, menor tendência a vazar."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "L3.4 Boas práticas de aplicação (Reliability Skills Series — Noria)"
      },
      {
        "type": "bullet",
        "text": "Usar sempre a graxa especificada e a graxeira correta e limpa — contaminação por sujeira na ponteira da graxeira é uma das principais fontes de partículas abrasivas introduzidas no rolamento."
      },
      {
        "type": "bullet",
        "text": "Relubrificar na quantidade e frequência corretas: excesso de graxa gera superaquecimento (a graxa em excesso precisa ser \"trabalhada\" mecanicamente, gerando calor) e pode até danificar vedações; falta de graxa acelera o desgaste por filme insuficiente."
      },
      {
        "type": "bullet",
        "text": "Purgar a graxa velha/excesso por um dreno ou orifício de alívio sempre que o rolamento tiver esse recurso, para não pressurizar as vedações."
      },
      {
        "type": "bullet",
        "text": "Monitorar a temperatura da carcaça durante a relubrificação manual — um aumento anormal de temperatura após engraxar é sinal de excesso ou de incompatibilidade de graxa."
      },
      {
        "type": "h2",
        "text": "L3.5 Causas comuns de separação de óleo (bleeding) na graxa"
      },
      {
        "type": "bullet",
        "text": "Armazenamento prolongado ou em condições de temperatura muito alta, que acelera a migração natural do óleo para fora do espessante."
      },
      {
        "type": "bullet",
        "text": "Agitação mecânica excessiva ou vibração prolongada do recipiente de armazenamento."
      },
      {
        "type": "bullet",
        "text": "Envelhecimento além da vida de prateleira recomendada pelo fabricante."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L3",
        "questions": [
          {
            "text": "Um técnico substitui a graxa de lítio comum de um motor elétrico por uma graxa de poliureia sem purgar completamente a graxa antiga. Qual é o risco principal dessa prática?",
            "options": [
              {
                "id": "a",
                "text": "Incompatibilidade de espessantes — misturar lítio comum com poliureia pode amolecer drasticamente a graxa resultante, comprometendo a retenção de óleo na zona de contato."
              },
              {
                "id": "b",
                "text": "Nenhum risco relevante, pois todos os tipos de espessante de graxa são sempre quimicamente compatíveis entre si."
              },
              {
                "id": "c",
                "text": "Risco exclusivamente de mudança de cor da graxa, sem qualquer efeito sobre a lubrificação."
              },
              {
                "id": "d",
                "text": "Risco de reação explosiva imediata entre os dois espessantes ao entrarem em contato."
              }
            ],
            "correct": "a",
            "explanation": "Misturar lítio comum com poliureia pode amolecer drasticamente a graxa resultante, comprometendo sua capacidade de reter o óleo na zona de contato e acelerando o desgaste — o correto é purgar/limpar ao máximo antes de trocar de tipo de espessante."
          },
          {
            "text": "Um rolamento aquece anormalmente logo após a relubrificação manual de rotina. Qual é a causa mais provável, e por quê?",
            "options": [
              {
                "id": "a",
                "text": "Excesso de graxa aplicada — o excedente precisa ser mecanicamente \"trabalhado\" pelos elementos rolantes até ser expelido, gerando atrito e calor adicionais."
              },
              {
                "id": "b",
                "text": "Graxa insuficiente — qualquer quantidade abaixo do reservatório total do rolamento gera atrito e calor."
              },
              {
                "id": "c",
                "text": "Troca do tipo de graxa para uma de menor viscosidade base, o que sempre reduz o atrito interno."
              },
              {
                "id": "d",
                "text": "Contaminação por poeira introduzida durante a relubrificação, independentemente da quantidade aplicada."
              }
            ],
            "correct": "a",
            "explanation": "A causa mais comum de superaquecimento logo após a relubrificação é o excesso de graxa: o excedente precisa ser mecanicamente \"trabalhado\" pelos elementos rolantes até ser expelido, gerando atrito e calor adicionais."
          },
          {
            "text": "Por que a graxa à base de cálcio-sulfonato complexo é frequentemente escolhida para ambientes com alta exposição à água, mesmo sem aditivo EP adicional?",
            "options": [
              {
                "id": "a",
                "text": "Porque tem excelente resistência inerente à água e já possui proteção antidesgaste/EP como característica própria do espessante, sem depender de aditivo adicional que poderia ser lixiviado pela água."
              },
              {
                "id": "b",
                "text": "Porque o cálcio-sulfonato complexo é sempre o espessante mais barato disponível no mercado."
              },
              {
                "id": "c",
                "text": "Porque essa graxa se dissolve completamente em água, facilitando a limpeza do mancal."
              },
              {
                "id": "d",
                "text": "Porque é a única graxa compatível com rolamentos de esferas, nunca com rolamentos de rolos."
              }
            ],
            "correct": "a",
            "explanation": "O cálcio-sulfonato complexo tem excelente resistência inerente à água (não se degrada/emulsiona facilmente na presença de umidade) e já possui proteção antidesgaste/EP como característica própria do espessante, sem depender de um pacote de aditivos EP adicional que poderia ser lixiviado pela água."
          }
        ]
      }
    ],
    "meta": {
      "num": "L3",
      "short": "Graxas Lubrificantes",
      "level": "básico",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "Graxa é óleo base retido por um espessante (sabão metálico ou não-sabão) mais aditivos — a escolha certa quando o ponto de lubrificação não comporta um fluido.",
      "Espessantes diferentes (lítio, lítio-complexo, cálcio-sulfonato, poliureia, argila) têm compatibilidade limitada entre si — misturar tipos incompatíveis pode amolecer a graxa e destruir sua função.",
      "Excesso de graxa é uma causa comum e evitável de superaquecimento de rolamentos — respeitar a quantidade e a frequência de relubrificação especificadas é tão importante quanto usar o produto certo."
    ]
  },
  {
    "id": "mlub4",
    "title": "Módulo L4 — Seleção de Lubrificantes por Aplicação",
    "body": [
      {
        "type": "p",
        "text": "Selecionar o lubrificante certo para cada máquina é uma decisão técnica baseada em viscosidade, tipo de óleo base, pacote de aditivos e condições ambientais — não uma escolha genérica de \"óleo industrial\" para toda a planta."
      },
      {
        "type": "h2",
        "text": "L4.1 Seleção de viscosidade"
      },
      {
        "type": "image",
        "src": "assets/img/lub_06_selecao_isovg.png",
        "caption": "Faixas típicas de viscosidade ISO VG por tipo de aplicação — referência rápida para especificação."
      },
      {
        "type": "p",
        "text": "A viscosidade é selecionada principalmente em função da temperatura de operação do componente, da velocidade (rotação) e da carga. Regra geral: quanto maior a carga e menor a velocidade, maior a viscosidade necessária para manter um filme adequado; quanto maior a temperatura de operação, maior a viscosidade de partida precisa ser para garantir viscosidade suficiente na temperatura de trabalho."
      },
      {
        "type": "table",
        "header": [
          "Grau ISO VG (referência)",
          "Aplicação típica"
        ],
        "rows": [
          [
            "32 – 46",
            "Sistemas hidráulicos industriais de uso geral, mancais de rolamento em alta rotação."
          ],
          [
            "68 – 100",
            "Redutores de engrenagens de uso geral, mancais de deslizamento de média carga."
          ],
          [
            "150 – 220",
            "Redutores industriais pesados, engrenagens de baixa rotação e alta carga."
          ],
          [
            "320 – 460+",
            "Engrenagens abertas, aplicações de altíssima carga/baixíssima velocidade."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "L4.2 Seleção por tipo de componente"
      },
      {
        "type": "bullet",
        "text": "Mancais de rolamento (rolling element bearings): viscosidade selecionada pela velocidade e temperatura, priorizando regime EHD estável; graxa é a escolha mais comum quando o ponto permite."
      },
      {
        "type": "bullet",
        "text": "Mancais de deslizamento (journal bearings): dependem de regime hidrodinâmico estável — viscosidade insuficiente rompe o filme sob carga; viscosidade excessiva gera atrito viscoso e superaquecimento desnecessário."
      },
      {
        "type": "bullet",
        "text": "Engrenagens (gearing/gearboxes): exigem aditivação EP proporcional à carga e ao tipo de engrenamento (helicoidal, cônico, sem-fim); sem-fim (worm gear) frequentemente usa lubrificante sintético PAG por seu baixo coeficiente de atrito."
      },
      {
        "type": "bullet",
        "text": "Sistemas hidráulicos: além da viscosidade adequada à bomba, exigem excelente controle de contaminação — partículas e água degradam rapidamente componentes de precisão (servoválvulas, bombas de pistão)."
      },
      {
        "type": "bullet",
        "text": "Turbinas a vapor/gás: exigem óleos de altíssima estabilidade à oxidação (longos intervalos de operação contínua) e excelente separação de água/ar."
      },
      {
        "type": "bullet",
        "text": "Motores de combustão (reciprocating engines): exigem TBN adequado à qualidade do combustível/enxofre, e viscosidade multigrau apropriada ao clima de operação."
      },
      {
        "type": "h2",
        "text": "L4.3 Ajustes por ambiente e aplicação"
      },
      {
        "type": "bullet",
        "text": "Ambientes com poeira/partículas: priorizar viscosidade que favoreça boa filtrabilidade e reforçar o intervalo de troca de filtro; considerar respiro dessecante."
      },
      {
        "type": "bullet",
        "text": "Ambientes úmidos ou com lavagem frequente: priorizar aditivação anticorrosiva reforçada e boa demulsibilidade (separação rápida da água)."
      },
      {
        "type": "bullet",
        "text": "Aplicações de grau alimentício (NSF H1): restringem quais aditivos e óleos base podem ser usados — sempre exigem certificação específica do fornecedor, conforme discutido no Módulo L2."
      },
      {
        "type": "h2",
        "text": "L4.4 Consolidação de lubrificantes"
      },
      {
        "type": "p",
        "text": "Consolidação é o processo de reduzir o número de lubrificantes distintos usados em uma planta para o menor conjunto tecnicamente aceitável, sem comprometer o desempenho de nenhum equipamento. Os benefícios documentados pela indústria (Noria) incluem: menos erros de aplicação/lubrificante errado, menor estoque parado, negociação de compra mais favorável e treinamento mais simples da equipe de lubrificação."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L4",
        "questions": [
          {
            "text": "Um redutor de baixa rotação e alta carga foi especificado para óleo ISO VG 220, mas o estoque só tem ISO VG 46 disponível. Que risco isso traz, e por quê?",
            "options": [
              {
                "id": "a",
                "text": "Risco de ruptura do filme lubrificante sob carga — um óleo muito menos viscoso pode não sustentar a espessura de filme necessária nas condições de baixa velocidade/alta carga, levando a desgaste acelerado."
              },
              {
                "id": "b",
                "text": "Nenhum risco relevante, já que a viscosidade especificada é apenas uma recomendação opcional do fabricante."
              },
              {
                "id": "c",
                "text": "Risco exclusivamente de vazamento pelas vedações, sem qualquer efeito sobre o desgaste das engrenagens."
              },
              {
                "id": "d",
                "text": "Risco de excesso de espuma, mas sem qualquer impacto sobre a espessura do filme lubrificante."
              }
            ],
            "correct": "a",
            "explanation": "Um óleo muito menos viscoso que o especificado pode não sustentar a espessura de filme necessária nas condições de baixa velocidade/alta carga desse redutor, levando a desgaste acelerado e possível falha prematura das engrenagens."
          },
          {
            "text": "Por que engrenagens do tipo sem-fim (worm gear) frequentemente usam lubrificante sintético à base de poliglicol (PAG) em vez de óleo mineral?",
            "options": [
              {
                "id": "a",
                "text": "O engrenamento sem-fim tem alto deslizamento, e o PAG oferece coeficiente de atrito significativamente menor que o óleo mineral nesse tipo de contato, reduzindo calor e melhorando eficiência e vida útil."
              },
              {
                "id": "b",
                "text": "Porque o PAG é sempre mais barato que qualquer óleo mineral disponível no mercado."
              },
              {
                "id": "c",
                "text": "Porque engrenagens sem-fim não podem, por norma técnica, usar nenhum tipo de óleo mineral."
              },
              {
                "id": "d",
                "text": "Porque o PAG elimina totalmente a necessidade de troca periódica do lubrificante."
              }
            ],
            "correct": "a",
            "explanation": "O engrenamento sem-fim tem alto deslizamento (atrito de deslizamento predominante, não de rolamento), e o PAG oferece coeficiente de atrito significativamente menor que o óleo mineral nesse tipo de contato, reduzindo o calor gerado e melhorando a eficiência e a vida do engrenamento."
          },
          {
            "text": "Quais são benefícios concretos de um programa de consolidação de lubrificantes numa planta industrial?",
            "options": [
              {
                "id": "a",
                "text": "Menos erros de aplicação do lubrificante errado, menor volume de estoque parado e capital imobilizado, melhor poder de negociação de compra e treinamento mais simples e padronizado da equipe."
              },
              {
                "id": "b",
                "text": "Eliminação total da necessidade de qualquer análise de óleo periódica."
              },
              {
                "id": "c",
                "text": "Garantia de que nenhuma máquina jamais sofrerá falha relacionada à lubrificação."
              },
              {
                "id": "d",
                "text": "Redução automática do consumo de energia elétrica de todas as máquinas rotativas da planta."
              }
            ],
            "correct": "a",
            "explanation": "A consolidação de lubrificantes traz menos erros de aplicação de lubrificante errado (menos tipos para confundir), menor volume de estoque parado e capital imobilizado, melhor poder de negociação de compra por volume e treinamento da equipe mais simples e padronizado."
          }
        ]
      }
    ],
    "meta": {
      "num": "L4",
      "short": "Seleção de Lubrificantes",
      "level": "intermediário",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "Viscosidade é selecionada em função de carga, velocidade e temperatura de operação — regra geral: mais carga/menos velocidade pede maior viscosidade.",
      "Cada tipo de componente (rolamento, mancal de deslizamento, engrenagem, sistema hidráulico, turbina, motor) tem critérios próprios de seleção de viscosidade e aditivação.",
      "Consolidar o número de lubrificantes distintos usados na planta reduz erros de aplicação, estoque parado e custo de treinamento, sem sacrificar desempenho técnico."
    ]
  },
  {
    "id": "mlub5",
    "title": "Módulo L5 — Armazenamento, Manuseio e Aplicação de Lubrificantes",
    "body": [
      {
        "type": "p",
        "text": "Grande parte da contaminação que degrada um lubrificante entra ANTES mesmo dele chegar à máquina — no recebimento, no armazenamento ou no transporte até o ponto de aplicação. Um programa de lubrificação de precisão começa pela sala de lubrificantes, não pela máquina."
      },
      {
        "type": "h2",
        "text": "L5.1 Recebimento e armazenamento"
      },
      {
        "type": "image",
        "src": "assets/img/lub_07_armazenamento_tambor.png",
        "caption": "Orientação correta de armazenamento de tambores: deitado (ou tampa lateral), nunca com a tampa voltada para cima."
      },
      {
        "type": "bullet",
        "text": "Inspecionar lubrificantes novos no recebimento: mesmo produto lacrado de fábrica pode conter partículas acima do necessário para aplicações de precisão — filtrar antes do primeiro uso é prática recomendada, não exagero."
      },
      {
        "type": "bullet",
        "text": "Armazenar tambores na horizontal (ou com tampas na posição de \"3h/9h\" se na vertical) para evitar acúmulo de água sobre a tampa, que pode ser puxada para dentro pela respiração térmica do tambor."
      },
      {
        "type": "bullet",
        "text": "Manter a sala de lubrificantes limpa, identificada (etiquetas com código de cores por tipo de lubrificante) e com controle de estoque (giro FIFO — o mais antigo sai primeiro)."
      },
      {
        "type": "bullet",
        "text": "Respeitar o prazo de validade/vida de prateleira informado pelo fabricante, especialmente para graxas (risco de separação de óleo) e para óleos com aditivos sensíveis à oxidação."
      },
      {
        "type": "h2",
        "text": "L5.2 Remoção de contaminantes de óleo novo"
      },
      {
        "type": "p",
        "text": "Usar carrinho de filtração (filter cart) dedicado, com elementos de filtração adequados ao nível de limpeza exigido pela aplicação de destino, para tratar óleo novo antes do primeiro abastecimento — principalmente em sistemas hidráulicos de precisão e turbinas."
      },
      {
        "type": "h2",
        "text": "L5.3 Transporte e aplicação"
      },
      {
        "type": "bullet",
        "text": "Usar recipientes de top-up (reabastecimento) dedicados e identificados por tipo de lubrificante — nunca compartilhar o mesmo recipiente entre lubrificantes diferentes sem limpeza completa, sob risco de contaminação cruzada."
      },
      {
        "type": "bullet",
        "text": "Manter os recipientes de transporte tampados sempre que não estiverem em uso ativo."
      },
      {
        "type": "bullet",
        "text": "Padronizar pontos de lubrificação com conectores rápidos e válvulas de nível externas sempre que possível, reduzindo a necessidade de abrir a máquina (e expô-la à contaminação) a cada inspeção/reabastecimento."
      },
      {
        "type": "h2",
        "text": "L5.4 Sistemas automáticos de lubrificação"
      },
      {
        "type": "bullet",
        "text": "Lubrificadores de ponto único (single-point) e sistemas automáticos de graxa: garantem quantidade e frequência consistentes, reduzindo o erro humano — indicados especialmente para pontos de difícil acesso ou de alta criticidade."
      },
      {
        "type": "bullet",
        "text": "Sistemas de névoa de óleo (oil mist): usados em conjuntos de bombas/mancais em grandes plantas de processo, fornecendo lubrificação contínua e levemente pressurizada, o que também ajuda a excluir contaminantes externos."
      },
      {
        "type": "bullet",
        "text": "Lubrificadores por gotejamento e por pavio (drip and wick): soluções simples e de baixo custo para pontos de baixa criticidade, mas com controle de vazão menos preciso."
      },
      {
        "type": "bullet",
        "text": "A decisão de automatizar um ponto de lubrificação deve considerar criticidade do ativo, acessibilidade, consequência de erro humano e custo do sistema frente ao risco evitado."
      },
      {
        "type": "h2",
        "text": "L5.5 Cálculos básicos de aplicação"
      },
      {
        "type": "image",
        "src": "assets/img/lub_08_intervalo_relube_temperatura.png",
        "caption": "Regra prática: a cada 15°C acima da faixa normal de operação, o intervalo de relubrificação recomendado cai pela metade."
      },
      {
        "type": "p",
        "text": "Duas contas fundamentais no dia a dia da lubrificação: o volume necessário de graxa por relubrificação (função do diâmetro e largura do rolamento) e a frequência de relubrificação (função da velocidade, temperatura e severidade do ambiente). Fórmulas simplificadas de referência amplamente usadas na indústria:"
      },
      {
        "type": "bullet",
        "text": "Quantidade de graxa (g) ≈ 0,005 × D × B, onde D é o diâmetro externo do rolamento (mm) e B é a largura do rolamento (mm) — valor aproximado por relubrificação de manutenção."
      },
      {
        "type": "bullet",
        "text": "Intervalo de relubrificação: decresce fortemente com o aumento da velocidade (fator de velocidade n×dm) e da temperatura de operação — como regra prática, cada 15 °C acima da faixa normal de operação tende a reduzir o intervalo de relubrificação pela metade."
      },
      {
        "type": "h2",
        "text": "L5.6 Registros e rotas de lubrificação"
      },
      {
        "type": "p",
        "text": "Toda atividade de lubrificação deve ser registrada (o que foi aplicado, quando, quanto) e organizada em rotas (lube routes) com frequência definida por criticidade do ativo — essa é a base sobre a qual todo o programa de manutenção preventiva de lubrificação se sustenta."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L5",
        "questions": [
          {
            "text": "Por que filtrar óleo novo, ainda lacrado de fábrica, antes do primeiro abastecimento de um sistema hidráulico de precisão é considerada boa prática, e não exagero?",
            "options": [
              {
                "id": "a",
                "text": "Óleo lacrado de fábrica ainda pode conter partículas acima do exigido por aplicações de precisão; filtrar antes do primeiro uso evita introduzir essa contaminação residual diretamente no sistema."
              },
              {
                "id": "b",
                "text": "Porque óleo lacrado de fábrica sempre vem contaminado com água em quantidade acima do limite aceitável."
              },
              {
                "id": "c",
                "text": "Porque a filtração antes do abastecimento substitui integralmente a necessidade de filtros em linha no sistema."
              },
              {
                "id": "d",
                "text": "Porque a viscosidade do óleo lacrado é sempre diferente da especificada, exigindo correção por filtragem."
              }
            ],
            "correct": "a",
            "explanation": "Óleo lacrado de fábrica ainda pode conter partículas em nível acima do exigido por aplicações de precisão (servoválvulas, bombas de pistão) — filtrar antes do primeiro uso evita introduzir essa contaminação residual diretamente no sistema, prevenindo desgaste prematuro de componentes sensíveis."
          },
          {
            "text": "Um tambor de óleo é armazenado na vertical, ao ar livre, com a tampa voltada para cima. Que risco isso traz e como mitigá-lo?",
            "options": [
              {
                "id": "a",
                "text": "Risco de água de chuva se acumular sobre a tampa e ser puxada para dentro pela respiração térmica através de pequenas folgas na vedação; mitiga-se armazenando na horizontal ou na vertical com a tampa lateral (3h/9h)."
              },
              {
                "id": "b",
                "text": "Risco exclusivo de evaporação acelerada do óleo, sem qualquer relação com entrada de água."
              },
              {
                "id": "c",
                "text": "Nenhum risco relevante, desde que o tambor seja armazenado sob um telhado qualquer."
              },
              {
                "id": "d",
                "text": "Risco de o tambor tombar sozinho devido ao peso do óleo deslocado para a tampa."
              }
            ],
            "correct": "a",
            "explanation": "Há risco de água da chuva se acumular sobre a tampa e ser puxada para dentro do tambor pela respiração térmica (expansão/contração do ar interno com a variação de temperatura) através de pequenas folgas na vedação — mitiga-se armazenando o tambor na horizontal, ou na vertical com a tampa na posição lateral (3h/9h), nunca voltada para cima."
          },
          {
            "text": "Um rolamento que operava a 60°C passa a operar rotineiramente a 90°C após uma mudança de processo. O que se espera que aconteça com o intervalo de relubrificação recomendado, e por quê?",
            "options": [
              {
                "id": "a",
                "text": "Espera-se que o intervalo diminua significativamente — a cada 15°C acima da faixa normal, o intervalo de relubrificação recomendado tende a cair pela metade, pois a temperatura mais alta acelera a degradação térmica da graxa."
              },
              {
                "id": "b",
                "text": "Espera-se que o intervalo permaneça exatamente igual, já que a temperatura não afeta a vida útil da graxa."
              },
              {
                "id": "c",
                "text": "Espera-se que o intervalo aumente, pois temperaturas mais altas reduzem a viscosidade e facilitam a lubrificação."
              },
              {
                "id": "d",
                "text": "Espera-se que a graxa deixe de ser necessária, sendo substituída por lubrificação a óleo automaticamente."
              }
            ],
            "correct": "a",
            "explanation": "Espera-se que o intervalo de relubrificação recomendado diminua significativamente — como regra prática da indústria, cada 15°C acima da faixa normal de operação tende a reduzir o intervalo pela metade, pois a temperatura mais alta acelera a degradação térmica da graxa/óleo na zona de contato."
          }
        ]
      }
    ],
    "meta": {
      "num": "L5",
      "short": "Armazenamento e Aplicação",
      "level": "intermediário",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "Boa parte da contaminação que degrada um lubrificante entra antes de chegar à máquina — no recebimento, armazenamento ou transporte.",
      "Sistemas automáticos de lubrificação (ponto único, névoa de óleo, gotejamento) reduzem o erro humano e são indicados para pontos críticos ou de difícil acesso.",
      "Temperatura de operação tem forte impacto no intervalo de relubrificação recomendado: cada 15 °C acima do normal tende a reduzir o intervalo pela metade."
    ]
  },
  {
    "id": "mlub6",
    "title": "Módulo L6 — Contaminação e Filtração",
    "body": [
      {
        "type": "p",
        "text": "O controle de contaminação é, segundo o próprio Body of Knowledge do ICML, um dos blocos de maior peso nos exames de certificação MLA — e não por acaso: a esmagadora maioria das falhas por lubrificação tem contaminação (partículas, água ou fluido errado) como causa raiz ou fator agravante."
      },
      {
        "type": "h2",
        "text": "L6.1 Contaminação por partículas"
      },
      {
        "type": "image",
        "src": "assets/img/lub_09_iso4406.png",
        "caption": "Código ISO 4406: contagem de partículas por faixa de tamanho (≥4, ≥6 e ≥14 µm/mL) — quanto maior o código, mais contaminado o óleo."
      },
      {
        "type": "bullet",
        "text": "Efeito na máquina: desgaste abrasivo direto nas superfícies em contato (dois ou três corpos), acelerado exponencialmente com o tamanho e a dureza da partícula em relação à espessura do filme lubrificante."
      },
      {
        "type": "bullet",
        "text": "Efeito no lubrificante: partículas catalisam reações de oxidação e podem obstruir orifícios de lubrificação de precisão."
      },
      {
        "type": "bullet",
        "text": "Medição: contagem de partículas por tamanho, reportada como código de limpeza ISO 4406 — três números que representam a contagem de partículas ≥4 µm, ≥6 µm e ≥14 µm por mililitro de óleo."
      },
      {
        "type": "table",
        "header": [
          "Código ISO 4406 (exemplo)",
          "Significado prático"
        ],
        "rows": [
          [
            "13/11/8",
            "Nível de limpeza típico para sistemas hidráulicos de precisão/servoválvulas — muito limpo."
          ],
          [
            "18/16/13",
            "Nível aceitável para lubrificação de engrenagens/mancais de uso geral."
          ],
          [
            "22/20/17",
            "Nível tipicamente encontrado em óleo sem controle de contaminação — inadequado para a maioria das aplicações críticas."
          ]
        ]
      },
      {
        "type": "bullet",
        "text": "Controle: filtração adequada, respiros dessecantes/filtrantes, vedações de qualidade e boas práticas de manuseio (Módulo L5)."
      },
      {
        "type": "h2",
        "text": "L6.2 Contaminação por água (umidade)"
      },
      {
        "type": "bullet",
        "text": "Estados de coexistência da água no óleo: dissolvida (abaixo do ponto de saturação, geralmente inofensiva), emulsionada (visível, turva o óleo) e livre (se deposita no fundo, forma bolsas de água livre — a mais danosa)."
      },
      {
        "type": "bullet",
        "text": "Efeitos: acelera a oxidação do óleo, promove corrosão e ferrugem, reduz drasticamente a vida de fadiga de rolamentos (mesmo em concentrações relativamente baixas) e pode causar falha catastrófica por perda de filme em sistemas hidráulicos."
      },
      {
        "type": "bullet",
        "text": "Medição: método de Karl Fischer (ppm de água), teste de crackle (qualitativo, rápido, em campo) e demulsibilidade (ASTM D1401 — velocidade de separação óleo/água)."
      },
      {
        "type": "bullet",
        "text": "Controle: respiros dessecantes, centrífugas ou coalescedores de água, headspace purge (purga com nitrogênio/ar seco em reservatórios críticos), e correção de causas raiz (vazamento de trocador de calor, condensação por respiração térmica)."
      },
      {
        "type": "h2",
        "text": "L6.3 Contaminação por glicol (líquido de arrefecimento)"
      },
      {
        "type": "bullet",
        "text": "Geralmente sinal de vazamento interno em um trocador de calor camisa d'água/óleo — efeito grave, pois o glicol pode formar géis e depósitos que obstruem galerias de óleo e reduzem drasticamente a lubricidade."
      },
      {
        "type": "bullet",
        "text": "Detectado por testes específicos de glicol (colorimétrico) e confirmado por análise elementar (presença de sódio/potássio, típicos de aditivos de líquido de arrefecimento)."
      },
      {
        "type": "h2",
        "text": "L6.4 Contaminação por fuligem (soot) e por combustível"
      },
      {
        "type": "bullet",
        "text": "Fuligem: típica de motores diesel — partículas de carbono muito finas que aumentam a viscosidade aparente do óleo e promovem desgaste abrasivo fino; medida por FTIR."
      },
      {
        "type": "bullet",
        "text": "Diluição por combustível: reduz a viscosidade do óleo (risco de perda de filme) — comum em motores com problemas de injeção/combustão incompleta; também detectada por FTIR e por queda inesperada de viscosidade."
      },
      {
        "type": "h2",
        "text": "L6.5 Contaminação por ar (aeração e espuma)"
      },
      {
        "type": "bullet",
        "text": "Ar dissolvido/entranhado reduz a rigidez do filme lubrificante (compressibilidade), acelera a oxidação (mais superfície de contato ar-óleo) e, em sistemas hidráulicos, causa operação errática (\"esponjosidade\") e cavitação em bombas."
      },
      {
        "type": "bullet",
        "text": "Medido por características de liberação de ar (ASTM D3427) e estabilidade de espuma (ASTM D892); controlado por bom projeto de retorno de reservatório, antiespumantes e eliminação de vazamentos de sucção."
      },
      {
        "type": "h2",
        "text": "L6.6 Filtração"
      },
      {
        "type": "image",
        "src": "assets/img/lub_10_beta_ratio.png",
        "caption": "Beta ratio (ISO 16889): quanto maior o β para o tamanho de partícula-alvo, maior a eficiência de captura do filtro."
      },
      {
        "type": "bullet",
        "text": "Rating do filtro (Beta ratio, ISO 16889): um filtro com βₓ = 200 para 10 µm remove 199 em cada 200 partículas ≥10 µm (eficiência de 99,5%) — quanto maior o β para o tamanho-alvo, mais eficiente e mais fino o corte do filtro."
      },
      {
        "type": "bullet",
        "text": "O projeto do sistema de filtração (filtro de retorno, filtro em linha de pressão, kidney-loop/filtração offline dedicada) deve ser escolhido de acordo com o código de limpeza-alvo definido para cada aplicação — não existe \"filtro universal\" correto para toda a planta."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L6",
        "questions": [
          {
            "text": "Um óleo hidráulico apresenta código ISO 4406 de 22/20/17, e o sistema exige 18/16/13. O que essa diferença significa, e qual ação é indicada?",
            "options": [
              {
                "id": "a",
                "text": "O código medido indica contaminação por partículas mais alta do que o exigido; deve-se reforçar/corrigir a filtração (filtro de maior eficiência, filtração offline dedicada) até atingir o código-alvo."
              },
              {
                "id": "b",
                "text": "O código medido indica que o óleo está mais limpo do que o necessário, permitindo reduzir a filtração instalada."
              },
              {
                "id": "c",
                "text": "A diferença não tem significado prático, pois o código ISO 4406 mede apenas viscosidade, não contaminação."
              },
              {
                "id": "d",
                "text": "Deve-se trocar imediatamente todo o óleo do sistema, sem necessidade de ajustar a filtração."
              }
            ],
            "correct": "a",
            "explanation": "O código medido (22/20/17) indica um nível de contaminação por partículas mais alto do que o exigido pelos componentes do sistema (18/16/13) — ação indicada é reforçar/corrigir a filtração até atingir o código-alvo, protegendo componentes de precisão contra desgaste abrasivo acelerado."
          },
          {
            "text": "Água aparece no óleo em três estados de coexistência possíveis. Qual dos três é o mais danoso, e por quê?",
            "options": [
              {
                "id": "a",
                "text": "Água livre — deposita-se no fundo do reservatório formando bolsas que promovem corrosão direta e pode ser arrastada em golfadas para a zona de lubrificação, causando perda abrupta de filme."
              },
              {
                "id": "b",
                "text": "Água dissolvida — é sempre a forma mais danosa, mesmo em baixíssima concentração."
              },
              {
                "id": "c",
                "text": "Água emulsionada — é sempre mais perigosa que a água livre, por se espalhar por todo o volume do óleo."
              },
              {
                "id": "d",
                "text": "Nenhuma das três formas de água representa risco relevante para o sistema."
              }
            ],
            "correct": "a",
            "explanation": "A água livre é a mais danosa: deposita-se no fundo do reservatório formando bolsas que promovem corrosão direta e pode ser arrastada em golfadas para a zona de lubrificação, causando perda abrupta de filme — mais perigosa que a água dissolvida (geralmente inofensiva em baixa concentração) e mais concentrada localmente que a emulsionada."
          },
          {
            "text": "Como se explica, na prática, o significado de um filtro com Beta ratio (β₁₀) igual a 200?",
            "options": [
              {
                "id": "a",
                "text": "Para partículas de 10 µm, o filtro remove 199 em cada 200 partículas que passam por ele em um ciclo de teste — eficiência de captura de aproximadamente 99,5% para aquele tamanho."
              },
              {
                "id": "b",
                "text": "O filtro captura exatamente 200 partículas por minuto de operação, independentemente do tamanho."
              },
              {
                "id": "c",
                "text": "O filtro reduz a viscosidade do óleo em 200 vezes ao longo de sua vida útil."
              },
              {
                "id": "d",
                "text": "O filtro deve ser trocado a cada 200 horas de operação, independentemente da contagem de partículas."
              }
            ],
            "correct": "a",
            "explanation": "Significa que, para partículas do tamanho de referência (10 µm), o filtro remove 199 em cada 200 partículas que passam por ele em um único ciclo de teste — uma eficiência de captura de aproximadamente 99,5% para aquele tamanho de partícula."
          }
        ]
      }
    ],
    "meta": {
      "num": "L6",
      "short": "Contaminação e Filtração",
      "level": "intermediário",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "Contaminação por partículas é medida pelo código ISO 4406 (três números para partículas ≥4, ≥6 e ≥14 µm/mL) e controlada por filtração e boas práticas de manuseio.",
      "Água contaminante existe em três estados — dissolvida, emulsionada e livre — sendo a água livre a mais danosa por se acumular e promover corrosão/perda de filme.",
      "Glicol, fuligem e combustível são contaminantes com causas raiz e testes de detecção específicos (glicol → vazamento em trocador de calor; fuligem/combustível → problemas de combustão em motores).",
      "O Beta ratio (ISO 16889) quantifica a eficiência de captura de um filtro para um tamanho de partícula específico — quanto maior o β para o tamanho-alvo, mais fino e eficiente o corte."
    ]
  },
  {
    "id": "mlub7",
    "title": "Módulo L7 — Amostragem e Análise de Óleo",
    "body": [
      {
        "type": "p",
        "text": "A análise de óleo só é tão boa quanto a amostra coletada. Um erro de amostragem (ponto errado, procedimento inconsistente, contaminação da própria coleta) invalida qualquer interpretação posterior, por mais sofisticada que seja — por isso o ICML dedica cerca de 30% da prova de certificação MLA II inteiramente a amostragem."
      },
      {
        "type": "h2",
        "text": "L7.1 Objetivos da amostragem de óleo"
      },
      {
        "type": "bullet",
        "text": "Detectar contaminação (partículas, água, glicol, combustível, ar) antes que cause dano."
      },
      {
        "type": "bullet",
        "text": "Monitorar a saúde do próprio lubrificante (degradação por oxidação, esgotamento de aditivos)."
      },
      {
        "type": "bullet",
        "text": "Detectar desgaste anormal de componentes internos através de partículas metálicas (análise elementar e de partículas de desgaste)."
      },
      {
        "type": "h2",
        "text": "L7.2 Onde e como amostrar"
      },
      {
        "type": "image",
        "src": "assets/img/lub_11_ponto_amostragem.png",
        "caption": "Ponto de amostragem correto: zona de turbulência ativa, a jusante do componente de interesse e a montante do filtro de retorno, sempre no mesmo local entre coletas."
      },
      {
        "type": "bullet",
        "text": "Ponto de amostragem ideal: zona de turbulência ativa (não em bolsões mortos), a jusante do componente de interesse e a montante do filtro de retorno — de forma consistente, sempre no mesmo ponto entre coletas."
      },
      {
        "type": "bullet",
        "text": "Sistemas pressurizados: usar válvula de amostragem dedicada, sempre descartando um volume inicial de purga (flushing) antes de coletar a amostra válida."
      },
      {
        "type": "bullet",
        "text": "Sistemas não pressurizados (reservatórios): usar bomba de vácuo com mangueira/tubo limpo e dedicado por ponto — nunca reutilizar tubo entre pontos diferentes sem descarte, sob risco de contaminação cruzada."
      },
      {
        "type": "bullet",
        "text": "Gerenciar interferências: limpeza e gerenciamento do frasco de coleta, flushing adequado da linha/válvula, e coletar apenas em condições de operação representativas (máquina em regime, não logo após uma troca de óleo)."
      },
      {
        "type": "h2",
        "text": "L7.3 Principais testes de laboratório e o que cada um revela"
      },
      {
        "type": "table",
        "header": [
          "Teste / Norma",
          "O que revela"
        ],
        "rows": [
          [
            "Viscosidade cinemática (ASTM D445)",
            "Espessamento (oxidação, contaminação por fuligem) ou afinamento (diluição por combustível, cisalhamento de VI improver, lubrificante errado)."
          ],
          [
            "TAN / Número de acidez (ASTM D974)",
            "Progresso da oxidação do óleo base."
          ],
          [
            "TBN / Número de basicidade (ASTM D974/D2896)",
            "Reserva alcalina restante para neutralizar ácidos (crítico em motores)."
          ],
          [
            "FTIR (espectroscopia infravermelha)",
            "Oxidação, nitração, sulfatação, fuligem, presença de água e de glicol — um teste \"multiuso\" de triagem rápida."
          ],
          [
            "Espectroscopia de emissão atômica (ICP)",
            "Concentração elementar (ppm) de metais de desgaste (Fe, Cu, Pb...), de aditivos (Zn, P, Ca, Mg) e de contaminantes (Si, Na, K)."
          ],
          [
            "Contagem de partículas (ISO 4406)",
            "Nível de limpeza/contaminação por partículas sólidas."
          ],
          [
            "RPVOT (ASTM D2272)",
            "Vida útil oxidativa remanescente do óleo (tempo até o antioxidante se esgotar sob condições aceleradas)."
          ],
          [
            "Karl Fischer / Crackle test",
            "Teor de água (ppm) ou presença qualitativa rápida de água em campo."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "L7.4 Interpretando relatórios de análise de óleo"
      },
      {
        "type": "bullet",
        "text": "Análise de tendência (trending) é mais valiosa do que um único resultado isolado: o que importa é a taxa de variação de cada propriedade ao longo do tempo, não apenas o valor absoluto de uma única amostra."
      },
      {
        "type": "bullet",
        "text": "Limites de alerta e de perigo (alarm limits) devem ser definidos por tipo de máquina/aplicação — tanto por limites fixos baseados em experiência quanto por limites estatísticos (média ± desvio-padrão do histórico daquele ativo específico)."
      },
      {
        "type": "bullet",
        "text": "A espectroscopia elementar de rotina tem limitação de tamanho de partícula (normalmente não detecta bem partículas acima de ~5-10 µm) — por isso, quando há suspeita de desgaste severo, a análise de ferrografia (Módulo L8) complementa a espectroscopia."
      },
      {
        "type": "h2",
        "text": "L7.5 Testes rápidos em campo (instrument-free)"
      },
      {
        "type": "p",
        "text": "Testes de campo (crackle test para água, inspeção visual de cor/turbidez, teste de mancha em papel-filtro para partículas grosseiras) não substituem a análise laboratorial completa, mas permitem uma triagem rápida entre coletas programadas — especialmente úteis para confirmar uma suspeita antes de aguardar o resultado do laboratório."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L7",
        "questions": [
          {
            "text": "Por que o ponto de coleta de amostra deve ser sempre o mesmo, medição após medição, no mesmo sistema?",
            "options": [
              {
                "id": "a",
                "text": "Para que a comparação entre amostras sucessivas (tendência) seja válida — mudar o ponto faz a amostra refletir uma zona diferente do sistema, invalidando a comparação histórica."
              },
              {
                "id": "b",
                "text": "Porque a norma exige que o ponto de coleta seja trocado a cada nova amostra, para evitar viés."
              },
              {
                "id": "c",
                "text": "Porque o ponto de coleta não tem qualquer influência sobre o resultado da análise laboratorial."
              },
              {
                "id": "d",
                "text": "Porque apenas o primeiro ponto de coleta de cada máquina é juridicamente válido para laudos."
              }
            ],
            "correct": "a",
            "explanation": "A comparação entre amostras sucessivas (tendência) só é válida se o ponto de coleta permanecer o mesmo — se ele muda, a amostra passa a refletir uma zona diferente do sistema, invalidando a comparação histórica e podendo mascarar ou simular falsamente uma tendência de degradação/contaminação."
          },
          {
            "text": "Um relatório de óleo mostra viscosidade caindo de forma consistente nas últimas três amostras de um motor a diesel. Que hipóteses de causa raiz devem ser investigadas?",
            "options": [
              {
                "id": "a",
                "text": "Diluição por combustível (problema de injeção/combustão incompleta) e cisalhamento mecânico do melhorador de índice de viscosidade — confirmáveis por FTIR e histórico de uso."
              },
              {
                "id": "b",
                "text": "Exclusivamente excesso de aditivo antidesgaste, sem qualquer relação com combustível ou cisalhamento."
              },
              {
                "id": "c",
                "text": "Exclusivamente contaminação por poeira ambiental, que sempre reduz a viscosidade do óleo."
              },
              {
                "id": "d",
                "text": "A queda de viscosidade é sempre um artefato de calibração do viscosímetro, sem causa real na máquina."
              }
            ],
            "correct": "a",
            "explanation": "Diluição por combustível (problema de injeção/combustão incompleta) e cisalhamento mecânico do melhorador de índice de viscosidade (VI improver) são as duas hipóteses mais prováveis para queda consistente de viscosidade em motor a diesel — ambas confirmáveis por FTIR (diluição por combustível) e histórico de uso/severidade de operação."
          },
          {
            "text": "Por que a espectroscopia de emissão atômica de rotina, isoladamente, pode não detectar um desgaste severo em andamento?",
            "options": [
              {
                "id": "a",
                "text": "Ela tem limitação de tamanho de partícula — partículas de desgaste maiores (acima de ~5-10 µm), comuns em modos de desgaste mais severos, não são bem representadas, exigindo ferrografia analítica como complemento."
              },
              {
                "id": "b",
                "text": "Porque a espectroscopia de emissão atômica só detecta contaminação por água, nunca partículas metálicas."
              },
              {
                "id": "c",
                "text": "Porque esse método exige que a máquina esteja parada há mais de 30 dias para funcionar corretamente."
              },
              {
                "id": "d",
                "text": "Porque a espectroscopia de emissão atômica foi descontinuada e substituída integralmente pela ferrografia."
              }
            ],
            "correct": "a",
            "explanation": "A espectroscopia de emissão atômica de rotina tem limitação de tamanho de partícula — partículas de desgaste maiores (tipicamente acima de ~5-10 µm), que costumam surgir justamente em modos de desgaste mais severos, não são bem representadas nesse método, exigindo ferrografia analítica como complemento."
          }
        ]
      }
    ],
    "meta": {
      "num": "L7",
      "short": "Amostragem e Análise de Óleo",
      "level": "avançado",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "Um erro de amostragem invalida qualquer interpretação posterior — ponto, procedimento e frasco devem ser consistentes entre coletas.",
      "Cada teste de laboratório revela um aspecto específico: viscosidade e FTIR indicam degradação/contaminação; TAN/TBN indicam saúde química; ICP indica desgaste e aditivos; contagem de partículas indica limpeza; RPVOT indica vida oxidativa remanescente.",
      "Tendência ao longo do tempo, comparada a limites de alerta/perigo definidos por ativo, é mais reveladora do que um resultado isolado."
    ]
  },
  {
    "id": "mlub8",
    "title": "Módulo L8 — Análise de Desgaste, Ferrografia e Gestão do Programa de Lubrificação",
    "body": [
      {
        "type": "p",
        "text": "Quando a espectroscopia elementar não é suficiente para caracterizar um desgaste (partículas grandes demais, ou necessidade de identificar o mecanismo exato de desgaste), a análise de partículas de desgaste — ferrografia — permite literalmente \"ver\" o que está acontecendo dentro da máquina."
      },
      {
        "type": "h2",
        "text": "L8.1 Mecanismos comuns de desgaste de máquina"
      },
      {
        "type": "table",
        "header": [
          "Mecanismo",
          "Descrição"
        ],
        "rows": [
          [
            "Desgaste abrasivo",
            "Partículas duras (contaminação externa ou debris interno) riscam/removem material da superfície — pode ser de dois corpos (partícula presa em uma superfície) ou três corpos (partícula livre rolando entre as superfícies)."
          ],
          [
            "Fadiga superficial (contato)",
            "Ciclos repetidos de tensão de contato geram trincas subsuperficiais que evoluem até o lascamento (spalling) — típico de rolamentos e engrenagens."
          ],
          [
            "Desgaste adesivo",
            "Micro-soldagem e arrancamento de material entre superfícies em contato direto, geralmente por falha de filme lubrificante."
          ],
          [
            "Desgaste corrosivo",
            "Ataque químico (ácidos de oxidação, água, contaminantes) à superfície metálica, muitas vezes combinado com desgaste mecânico."
          ],
          [
            "Desgaste por cavitação",
            "Colapso de bolhas de vapor/gás gera microjatos de altíssima energia que erodem a superfície — comum em bombas com sucção deficiente."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "L8.2 Ferrografia analítica"
      },
      {
        "type": "image",
        "src": "assets/img/lub_12_morfologia_particulas.png",
        "caption": "Morfologia de partículas de desgaste: a forma e a cor revelam o mecanismo de desgaste em ação (diagrama ilustrativo, não fotos reais de microscopia)."
      },
      {
        "type": "bullet",
        "text": "Ferrograma: lâmina preparada a partir da amostra de óleo sob um campo magnético, que separa e organiza partículas ferrosas por tamanho ao longo da lâmina para exame microscópico."
      },
      {
        "type": "bullet",
        "text": "Técnicas de exame: efeitos de luz (transmitida/refletida), efeitos de magnetismo, tratamento térmico (aquecimento controlado da lâmina revela cores de oxidação características de diferentes ligas) e morfologia (forma da partícula indica o mecanismo de origem)."
      },
      {
        "type": "table",
        "header": [
          "Tipo de partícula",
          "Mecanismo/causa provável indicada"
        ],
        "rows": [
          [
            "Partículas de corte (cutting)",
            "Desgaste abrasivo severo — uma aresta dura está literalmente cortando o material como uma ferramenta."
          ],
          [
            "Partículas esféricas",
            "Fadiga subsuperficial em estágio inicial (formação de trincas de fadiga antes do lascamento visível)."
          ],
          [
            "Partículas laminares",
            "Fadiga em estágio avançado — lascamento (spalling) ativo da superfície."
          ],
          [
            "Partículas de óxido vermelho/preto",
            "Corrosão — vermelho indica óxido de ferro hidratado (ferrugem/presença de água); preto indica óxido em condição de alta temperatura/baixa disponibilidade de oxigênio."
          ],
          [
            "Polímeros de fricção",
            "Produtos de reação de aditivos EP/AW sob condições de filme misto/limítrofe — em quantidade moderada, esperado; em excesso, sinal de sobrecarga do filme."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "L8.3 Desenvolvimento e gestão de um programa de análise de óleo"
      },
      {
        "type": "bullet",
        "text": "Seleção do test slate (conjunto de testes) por tipo de máquina: nem toda máquina precisa de todos os testes disponíveis — o conjunto certo depende do modo de falha mais provável daquele ativo específico."
      },
      {
        "type": "bullet",
        "text": "Definição da frequência de análise: baseada na criticidade do ativo, no histórico de falhas e no tempo de reação necessário entre a detecção e a ação corretiva."
      },
      {
        "type": "bullet",
        "text": "Definição de limites de alarme: por limites fixos (baseados em experiência da indústria) e por limites estatísticos (média e desvio-padrão calculados a partir do histórico daquele ativo — mais sensíveis a mudanças sutis e específicas daquela máquina)."
      },
      {
        "type": "bullet",
        "text": "Análise de custo-benefício: comparar o custo do programa de análise de óleo (testes, mão de obra, treinamento) com os benefícios estimados (falhas evitadas, aumento de intervalo de troca, redução de retrabalho) para justificar e dimensionar o investimento."
      },
      {
        "type": "h2",
        "text": "L8.4 Trilha de certificação profissional (ICML)"
      },
      {
        "type": "p",
        "text": "O International Council for Machinery Lubrication (ICML) é o órgão certificador vendor-neutral de referência mundial para lubrificação e análise de óleo, com exames alinhados à norma ISO 18436-4. As certificações mais relevantes para quem atua na área — e o caminho de treinamento que a Noria e outras organizações de treinamento oferecem para prepará-las — estão resumidas a seguir."
      },
      {
        "type": "table",
        "header": [
          "Certificação ICML",
          "Foco / pré-requisito"
        ],
        "rows": [
          [
            "MLT I (Machine Lubrication Technician I)",
            "Fundamentos de lubrificação, seleção, aplicação, armazenamento — nível técnico de execução."
          ],
          [
            "MLT II",
            "Aprofunda formulação, seleção e testes de lubrificantes — exige MLT I."
          ],
          [
            "MLA I (Machine Lubricant Analyst I)",
            "Fundamentos + introdução a amostragem e monitoramento da saúde do lubrificante."
          ],
          [
            "MLA II",
            "Aprofunda amostragem (maior peso do exame), contaminação e análise de desgaste — exige MLA I ou experiência equivalente."
          ],
          [
            "MLA III",
            "Nível mais avançado: análise de degradação do lubrificante, ferrografia detalhada e gestão de programa de análise de óleo — exige MLA I certificado."
          ]
        ]
      },
      {
        "type": "bullet",
        "text": "Cada nível exige uma combinação de experiência prática documentada (meses de atuação na área), horas de treinamento formal alinhadas ao Body of Knowledge do exame, e aprovação em prova de múltipla escolha (100 questões, nota mínima de 70%)."
      },
      {
        "type": "p",
        "text": "Assim como discutido para as certificações de análise de vibração (ver Consulta Rápida), este curso não substitui a certificação formal do ICML — ele constrói a base conceitual necessária para quem pretende buscá-la, cobrindo o Body of Knowledge de MLT I/II e MLA I/II/III."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L8",
        "questions": [
          {
            "text": "Uma ferrografia revela partículas laminares em quantidade crescente ao longo de análises sucessivas de um redutor. O que isso indica, e qual a urgência da ação recomendada?",
            "options": [
              {
                "id": "a",
                "text": "Fadiga superficial em estágio avançado (lascamento/spalling já ativo); diferente de partículas esféricas (fadiga inicial), a presença crescente de laminares exige ação corretiva com urgência."
              },
              {
                "id": "b",
                "text": "Contaminação por poeira externa, sem urgência, bastando trocar o filtro de ar do respiro."
              },
              {
                "id": "c",
                "text": "Condição normal de amaciamento (running-in) do redutor, sem necessidade de qualquer ação."
              },
              {
                "id": "d",
                "text": "Excesso de aditivo antidesgaste, corrigível apenas com troca completa do óleo, sem urgência."
              }
            ],
            "correct": "a",
            "explanation": "Partículas laminares indicam fadiga superficial em estágio avançado — lascamento (spalling) já ativo na superfície das engrenagens. Diferente de partículas esféricas (fadiga inicial, ainda subsuperficial), a presença crescente de laminares é sinal de deterioração já em progresso e requer ação corretiva com urgência."
          },
          {
            "text": "Por que a definição de limites de alarme estatísticos (média ± desvio-padrão do próprio ativo) costuma ser mais sensível do que usar apenas limites fixos genéricos da indústria?",
            "options": [
              {
                "id": "a",
                "text": "Porque são calculados a partir do histórico daquele ativo específico, capturando sua faixa normal particular; mudanças sutis mas reais podem ficar mascaradas por um limite fixo genérico calibrado para a média da indústria."
              },
              {
                "id": "b",
                "text": "Porque limites estatísticos são sempre numericamente mais altos que limites fixos, tornando-os mais fáceis de não ultrapassar."
              },
              {
                "id": "c",
                "text": "Porque limites fixos genéricos não podem, por definição, ser aplicados a nenhum tipo de máquina rotativa."
              },
              {
                "id": "d",
                "text": "Não há diferença prática de sensibilidade entre os dois tipos de limite de alarme."
              }
            ],
            "correct": "a",
            "explanation": "Os limites estatísticos são calculados a partir do próprio histórico daquele ativo específico, capturando sua faixa normal de operação particular — mudanças sutis, mas reais, que se desviam do comportamento histórico daquela máquina específica podem ficar mascaradas por um limite fixo genérico, calibrado para a média de toda a indústria."
          },
          {
            "text": "Qual certificação ICML tem maior peso relativo em amostragem no seu exame, e por que isso faz sentido dado o foco daquele nível?",
            "options": [
              {
                "id": "a",
                "text": "MLA II, cuja Body of Knowledge dedica cerca de 29% do exame a amostragem — o nível II aprofunda a competência prática de coletar amostras corretamente, fundamento sem o qual a análise laboratorial perde confiabilidade."
              },
              {
                "id": "b",
                "text": "MLA I, pois esse nível trata exclusivamente de coleta de amostras, sem nenhum outro tópico no exame."
              },
              {
                "id": "c",
                "text": "MLT I, pois técnicos de laboratório nunca lidam com amostragem em campo."
              },
              {
                "id": "d",
                "text": "Todas as certificações ICML dão exatamente o mesmo peso percentual à amostragem."
              }
            ],
            "correct": "a",
            "explanation": "MLA II, cuja Body of Knowledge dedica cerca de 29% do exame a amostragem — o nível II do MLA aprofunda justamente a competência prática de coletar amostras corretamente (por tipo de sistema, gerenciamento de interferências, processo de amostragem), fundamento sem o qual toda a análise laboratorial posterior perde confiabilidade."
          }
        ]
      }
    ],
    "meta": {
      "num": "L8",
      "short": "Ferrografia e Gestão do Programa",
      "level": "avançado",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "Mecanismos de desgaste (abrasivo, fadiga, adesivo, corrosivo, cavitação) deixam \"assinaturas\" reconhecíveis em partículas de desgaste — a ferrografia analítica permite identificar o mecanismo pela forma, cor e comportamento magnético das partículas.",
      "Um programa de análise de óleo maduro escolhe o test slate por tipo de máquina, define frequência por criticidade e usa limites de alarme (fixos e estatísticos) calibrados ao histórico do ativo.",
      "A trilha de certificação ICML (MLT I/II, MLA I/II/III, alinhada à ISO 18436-4) é o caminho reconhecido internacionalmente para formalizar a competência em lubrificação e análise de óleo — este módulo cobre a base conceitual dos cinco níveis."
    ]
  },
  {
    "id": "mlub9",
    "title": "Módulo L9 — LIS: Sistema de Identificação de Lubrificantes",
    "body": [
      {
        "type": "p",
        "text": "Um dos erros mais caros e mais evitáveis em lubrificação industrial é simples: aplicar o lubrificante errado no ponto certo, ou o lubrificante certo no ponto errado. O LIS (Lubricant Identification System — Sistema de Identificação de Lubrificantes), desenvolvido pela Noria Corporation e amplamente adotado no Brasil por empresas de consultoria em lubrificação como a Lubrin, existe justamente para eliminar esse tipo de erro."
      },
      {
        "type": "h2",
        "text": "L9.1 O problema que o LIS resolve"
      },
      {
        "type": "p",
        "text": "Numa planta industrial típica, uma sala de lubrificantes pode ter dezenas de produtos diferentes (óleos hidráulicos, de engrenagens, de compressores, graxas de diferentes espessantes), e centenas de pontos de aplicação espalhados pela fábrica. Sem um sistema padronizado, a identificação depende inteiramente do rótulo original do fabricante — que muda sempre que a empresa troca de marca ou fornecedor, e que raramente está presente no próprio ponto de lubrificação (mancal, redutor, motor), apenas no tambor de origem."
      },
      {
        "type": "bullet",
        "text": "Consequência típica: um lubrificador experiente sabe de cor qual óleo vai em qual máquina; um lubrificador novo, ou um substituto em um dia de folga, corre risco real de aplicar o produto errado."
      },
      {
        "type": "bullet",
        "text": "Contaminação cruzada por lubrificante errado é uma das causas de falha mais difíceis de rastrear depois do fato, porque não deixa \"pista\" óbvia — o óleo parece visualmente normal até o dano já estar feito."
      },
      {
        "type": "h2",
        "text": "L9.2 Como o LIS funciona"
      },
      {
        "type": "p",
        "text": "O LIS combina, numa única etiqueta afixada diretamente no ponto de lubrificação (não apenas no recipiente de origem), um conjunto de elementos visuais e um código alfanumérico, seguindo a classificação internacional ISO 6743 como base técnica."
      },
      {
        "type": "image",
        "src": "assets/img/lub_13_etiqueta_lis.png",
        "caption": "Elementos-chave de uma etiqueta LIS: forma geométrica (tipo de lubrificante/espessante), cor de referência, classificação ISO 6743, grau de viscosidade e código alfanumérico único."
      },
      {
        "type": "h3",
        "text": "Para lubrificantes líquidos (óleos) — 5 seções de classificação:"
      },
      {
        "type": "bullet",
        "text": "Propriedade específica da aplicação."
      },
      {
        "type": "bullet",
        "text": "Cor de referência para a faixa de viscosidade."
      },
      {
        "type": "bullet",
        "text": "Forma geométrica indicando o tipo de lubrificante."
      },
      {
        "type": "bullet",
        "text": "Classificação segundo a norma ISO 6743 (ex.: L-HM para óleo hidráulico com aditivos antidesgaste)."
      },
      {
        "type": "bullet",
        "text": "Grau de viscosidade ISO VG ou SAE, mais um código alfanumérico único do ponto."
      },
      {
        "type": "h3",
        "text": "Para graxas — 7 seções de classificação:"
      },
      {
        "type": "bullet",
        "text": "Tipo de espessante (lítio, lítio-complexo, poliureia, cálcio-sulfonato etc.)."
      },
      {
        "type": "bullet",
        "text": "Forma geométrica indicando o tipo de lubrificante."
      },
      {
        "type": "bullet",
        "text": "Propriedades específicas da aplicação."
      },
      {
        "type": "bullet",
        "text": "Código alfanumérico único."
      },
      {
        "type": "bullet",
        "text": "Grau de viscosidade ISO do óleo base e consistência NLGI."
      },
      {
        "type": "bullet",
        "text": "Cor de referência para o tipo de espessante."
      },
      {
        "type": "h2",
        "text": "L9.3 Por que o código é independente de marca/fornecedor"
      },
      {
        "type": "p",
        "text": "Um dos benefícios centrais do LIS é a independência comercial: a etiqueta no ponto de lubrificação continua válida mesmo que a empresa troque de fornecedor ou o produto mude de nome comercial, desde que a nova especificação técnica (viscosidade, tipo, aditivação) permaneça equivalente. Isso evita a necessidade de reetiquetar toda a planta a cada negociação de compra — o código descreve a especificação técnica, não a marca."
      },
      {
        "type": "h2",
        "text": "L9.4 Benefícios documentados do LIS"
      },
      {
        "type": "table",
        "header": [
          "Benefício",
          "Como o LIS entrega"
        ],
        "rows": [
          [
            "Zero confusão",
            "Cores e formas geométricas eliminam trocas acidentais, mesmo com múltiplos produtos na mesma área."
          ],
          [
            "Acessível a qualquer nível de experiência",
            "Até um lubrificador iniciante consegue aplicar o produto correto sem depender de memorização."
          ],
          [
            "Rastreabilidade",
            "Etiquetas em TODOS os dispositivos que tocam o lubrificante (graxeiras, funis, recipientes de top-up), não apenas no equipamento principal."
          ],
          [
            "Integração tecnológica",
            "Compatível com leitura por código de barras/handheld para gestão ágil de ordens de serviço."
          ],
          [
            "Padronização internacional",
            "Base na norma ISO 6743, garantindo uniformidade entre plantas e entre fornecedores."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "L9.5 Implementação na prática"
      },
      {
        "type": "p",
        "text": "Implementar o LIS numa planta segue tipicamente estas etapas: levantar e consolidar a lista de lubrificantes realmente necessários (ver Módulo L4 — consolidação de lubrificantes), atribuir um código único a cada um seguindo a lógica ISO 6743 + cor + forma, etiquetar cada ponto de aplicação e cada recipiente/dispositivo de transferência com o código correspondente, e treinar a equipe de lubrificação para reconhecer o sistema antes de qualquer relubrificação."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L9",
        "questions": [
          {
            "text": "Por que a etiqueta LIS é afixada diretamente no ponto de lubrificação (mancal, redutor, motor), e não apenas no tambor de origem do lubrificante?",
            "options": [
              {
                "id": "a",
                "text": "Porque o rótulo do tambor de origem muda sempre que a empresa troca de marca/fornecedor, e nem sempre está disponível no momento da relubrificação no campo."
              },
              {
                "id": "b",
                "text": "Porque é uma exigência da norma ISO 9001 para rastreabilidade de compras."
              },
              {
                "id": "c",
                "text": "Porque o tambor de origem não tem espaço físico para uma etiqueta."
              },
              {
                "id": "d",
                "text": "Porque a cor da etiqueta desbota mais rápido dentro do almoxarifado do que no ponto de aplicação."
              }
            ],
            "correct": "a",
            "explanation": "O objetivo central do LIS é garantir que, no momento e no local exatos da relubrificação, a identificação do produto correto seja imediata e não dependa de memória ou de qual tambor está disponível naquele dia — por isso a etiqueta fica no próprio ponto de aplicação, e não apenas na origem."
          },
          {
            "text": "Uma planta troca de fornecedor de óleo hidráulico, mas a nova especificação técnica (ISO VG, tipo, aditivação) é equivalente à anterior. O que acontece com as etiquetas LIS já instaladas na planta?",
            "options": [
              {
                "id": "a",
                "text": "Continuam válidas, pois o código LIS descreve a especificação técnica do lubrificante, não a marca ou o fornecedor."
              },
              {
                "id": "b",
                "text": "Precisam ser todas trocadas imediatamente, pois o código é vinculado ao nome comercial do produto."
              },
              {
                "id": "c",
                "text": "Deixam de ter qualquer utilidade e o sistema precisa ser reiniciado do zero."
              },
              {
                "id": "d",
                "text": "Só continuam válidas se o novo fornecedor também usar o sistema LIS internamente."
              }
            ],
            "correct": "a",
            "explanation": "Um dos benefícios centrais do LIS é a independência comercial: como o código descreve a especificação técnica (tipo, viscosidade, classificação ISO 6743), ele permanece válido mesmo com troca de marca/fornecedor, desde que a equivalência técnica seja mantida — evitando reetiquetar toda a planta a cada negociação de compra."
          },
          {
            "text": "Na etiqueta LIS de uma graxa, a forma geométrica indica qual característica do produto?",
            "options": [
              {
                "id": "a",
                "text": "O tipo de espessante da graxa (ex.: lítio-complexo, poliureia, cálcio-sulfonato)."
              },
              {
                "id": "b",
                "text": "A data de fabricação do lote."
              },
              {
                "id": "c",
                "text": "O grau NLGI de consistência."
              },
              {
                "id": "d",
                "text": "A temperatura máxima de operação recomendada."
              }
            ],
            "correct": "a",
            "explanation": "Nas 7 seções de classificação usadas para graxas no LIS, a forma geométrica é o elemento visual que indica o tipo de lubrificante/espessante — permitindo identificação rápida à distância, antes mesmo de ler o código alfanumérico completo."
          }
        ]
      }
    ],
    "meta": {
      "num": "L9",
      "short": "LIS — Identificação de Lubrificantes",
      "level": "intermediário",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "O LIS (Sistema de Identificação de Lubrificantes), da Noria Corporation, combina cor, forma geométrica, classificação ISO 6743 e código alfanumérico numa etiqueta afixada diretamente no ponto de lubrificação.",
      "O código é independente de marca/fornecedor — descreve a especificação técnica, não o nome comercial, evitando reetiquetar a planta a cada troca de fornecedor.",
      "Lubrificantes líquidos usam 5 seções de classificação; graxas usam 7 seções, incluindo o tipo de espessante indicado pela forma geométrica."
    ]
  },
  {
    "id": "mlub10",
    "title": "Módulo L10 — Verniz e Testes de Vida Útil Remanescente (MPC, RULER, RPVOT)",
    "body": [
      {
        "type": "p",
        "text": "A formação de verniz é considerada, segundo a literatura técnica de análise de óleo (Machinery Lubrication/Noria), a principal causa raiz de paradas não programadas e perda de confiabilidade em turbinas e outros sistemas de óleo circulante de alta severidade térmica. Diferente de uma falha por contaminação óbvia, o verniz se forma silenciosamente — e os testes tradicionais de rotina (viscosidade, TAN) frequentemente não o detectam a tempo."
      },
      {
        "type": "h2",
        "text": "L10.1 O que é verniz e por que ele se forma"
      },
      {
        "type": "p",
        "text": "Verniz é o produto final da oxidação e degradação térmica do óleo: moléculas de óleo degradado se aglomeram em partículas submicrônicas (insolúveis, mas pequenas demais para os filtros convencionais capturarem) que se depositam nas superfícies mais quentes e de menor fluxo do sistema — folgas de servoválvulas, superfícies de mancais, trocadores de calor — comprometendo sua função sem necessariamente alterar a viscosidade ou o TAN de forma detectável pelos testes tradicionais."
      },
      {
        "type": "bullet",
        "text": "Sintomas típicos de verniz: válvulas de controle com resposta lenta ou travamento intermitente, superaquecimento localizado, degradação progressiva do desempenho sem uma causa óbvia identificada pelos testes de rotina."
      },
      {
        "type": "h2",
        "text": "L10.2 MPC — Membrane Patch Colorimetry"
      },
      {
        "type": "p",
        "text": "O teste MPC (Colorimetria de Membrana) extrai os insolúveis de uma amostra de óleo usado através de uma membrana filtrante padronizada, e mede a cor resultante por espectrofotometria, expressa como ΔE (diferença de cor em relação a uma membrana de referência limpa). Quanto maior o ΔE, maior o potencial de verniz."
      },
      {
        "type": "image",
        "src": "assets/img/lub_14_mpc_ruler_rpvot.png",
        "caption": "Escala de cor MPC (potencial de verniz, ΔE crescente da esquerda para a direita) e tendência comparativa entre RULER (antioxidantes) e RPVOT (vida oxidativa) ao longo do tempo de uso."
      },
      {
        "type": "h2",
        "text": "L10.3 RULER — Remaining Useful Life Evaluation Routine"
      },
      {
        "type": "p",
        "text": "O RULER usa voltametria de varredura linear para medir, de forma direta e específica, a concentração de antioxidantes fenólicos e aminas aromáticas restantes no óleo — os mesmos aditivos que retardam a oxidação (ver Módulo L2). Por medir o antioxidante diretamente, o RULER detecta o esgotamento da proteção antioxidante ANTES que qualquer outro teste tradicional (viscosidade, TAN, FTIR) mostre alteração perceptível."
      },
      {
        "type": "h2",
        "text": "L10.4 RPVOT — Rotating Pressure Vessel Oxidation Test"
      },
      {
        "type": "p",
        "text": "O RPVOT (ASTM D2272, já mencionado nos Módulos L2 e L7) submete a amostra a oxigênio pressurizado e alta temperatura, medindo o tempo até uma queda abrupta de pressão — que indica o esgotamento do sistema antioxidante sob condições aceleradas. É um teste \"destrutivo\" (a amostra é consumida no processo) e mais demorado que o RULER, mas amplamente estabelecido como referência para vida oxidativa remanescente."
      },
      {
        "type": "h2",
        "text": "L10.5 Comparando as três abordagens"
      },
      {
        "type": "table",
        "header": [
          "Teste",
          "O que mede",
          "Quando usar"
        ],
        "rows": [
          [
            "MPC",
            "Potencial de formação de verniz (insolúveis já formados)",
            "Suspeita de verniz — válvulas lentas, superaquecimento sem causa óbvia."
          ],
          [
            "RULER",
            "Concentração de antioxidante restante (direto, rápido)",
            "Monitoramento de rotina de sistemas críticos (turbinas), detecção precoce antes de qualquer sintoma."
          ],
          [
            "RPVOT",
            "Tempo até esgotamento do sistema antioxidante (indireto, sob condições aceleradas)",
            "Confirmação/referência de vida oxidativa remanescente, decisão de troca vs. reforço de aditivo."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "L10.6 Uma lição real da indústria de turbinas a vapor"
      },
      {
        "type": "p",
        "text": "Casos documentados de lubrificação de turbinas a vapor mostram óleos que, após 10 anos de uso, ainda preservavam cerca de 90% das propriedades originais (potencial de vida útil de dezenas de anos) — mas que, na prática, costumam ser trocados a cada 5 anos simplesmente por não haver análise de óleo regular nem procedimentos de manutenção proativa. Esse é um exemplo direto de como monitoramento adequado (RULER/RPVOT/MPC) pode evitar tanto a falha prematura por verniz quanto o desperdício de trocar um óleo que ainda tem vida útil significativa."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L10",
        "questions": [
          {
            "text": "Uma válvula de controle de uma turbina passa a responder de forma lenta e intermitente, mas a viscosidade e o TAN do óleo continuam normais nas análises de rotina. Qual é a hipótese mais provável, e qual teste a confirmaria diretamente?",
            "options": [
              {
                "id": "a",
                "text": "Formação de verniz — confirmada pelo teste MPC (Membrane Patch Colorimetry), que detecta insolúveis submicrônicos não capturados pelos testes tradicionais."
              },
              {
                "id": "b",
                "text": "Contaminação por água — confirmada por Karl Fischer."
              },
              {
                "id": "c",
                "text": "Diluição por combustível — confirmada por FTIR."
              },
              {
                "id": "d",
                "text": "Desgaste de engrenagens — confirmado por ferrografia."
              }
            ],
            "correct": "a",
            "explanation": "Resposta lenta de válvulas sem alteração de viscosidade/TAN é o padrão clássico de verniz: as partículas de verniz são pequenas demais para os testes tradicionais capturarem, mas grandes o suficiente para prejudicar folgas de precisão. O MPC é o teste específico para quantificar esse potencial."
          },
          {
            "text": "Por que o RULER consegue detectar o esgotamento da proteção antioxidante ANTES de testes como viscosidade ou TAN mostrarem qualquer alteração?",
            "options": [
              {
                "id": "a",
                "text": "Porque o RULER mede diretamente a concentração do antioxidante restante, enquanto viscosidade/TAN só mudam DEPOIS que a oxidação do próprio óleo base já começou a acontecer."
              },
              {
                "id": "b",
                "text": "Porque o RULER é um teste mais barato e por isso é feito com maior frequência."
              },
              {
                "id": "c",
                "text": "Porque o RULER usa uma amostra maior de óleo do que os outros testes."
              },
              {
                "id": "d",
                "text": "Porque o RULER só funciona em óleos sintéticos, que degradam mais rápido."
              }
            ],
            "correct": "a",
            "explanation": "O antioxidante é consumido primeiro, como uma camada de proteção — enquanto ele ainda está presente em quantidade suficiente, a oxidação do óleo base fica retardada e viscosidade/TAN permanecem estáveis. Só depois que o antioxidante se esgota é que a oxidação do óleo base acelera e passa a alterar viscosidade e TAN. Por medir o antioxidante diretamente, o RULER enxerga o problema um passo antes."
          },
          {
            "text": "O que o resultado do RPVOT efetivamente mede?",
            "options": [
              {
                "id": "a",
                "text": "O tempo até uma queda abrupta de pressão de oxigênio, sob condições aceleradas de temperatura/pressão, indicando o esgotamento do sistema antioxidante."
              },
              {
                "id": "b",
                "text": "A viscosidade do óleo em diferentes temperaturas."
              },
              {
                "id": "c",
                "text": "O teor de água livre e emulsionada na amostra."
              },
              {
                "id": "d",
                "text": "A quantidade de partículas metálicas de desgaste em suspensão."
              }
            ],
            "correct": "a",
            "explanation": "O RPVOT (ASTM D2272) submete a amostra a oxigênio pressurizado e alta temperatura; o tempo decorrido até a pressão cair abruptamente (sinal de que o antioxidante se esgotou e a oxidação acelerou) é o resultado do teste — quanto maior esse tempo, maior a vida oxidativa remanescente estimada."
          }
        ]
      }
    ],
    "meta": {
      "num": "L10",
      "short": "Verniz, RULER e RPVOT",
      "level": "avançado",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "Verniz é o produto final da oxidação/degradação térmica do óleo — deposita-se silenciosamente em folgas de precisão, sem necessariamente alterar viscosidade ou TAN detectavelmente.",
      "MPC mede o potencial de verniz já formado (insolúveis); RULER mede diretamente o antioxidante restante (detecção mais precoce); RPVOT mede o tempo até o esgotamento do sistema antioxidante sob condições aceleradas.",
      "Monitorar RULER/RPVOT evita tanto a falha prematura por verniz quanto o desperdício de trocar um óleo que ainda tem vida útil significativa."
    ]
  },
  {
    "id": "mlub11",
    "title": "Módulo L11 — Programa de Lubrificação de Classe Mundial (ASCEND e ORS)",
    "body": [
      {
        "type": "p",
        "text": "Os módulos anteriores (L1-L10) tratam de tópicos técnicos individuais — óleos, graxas, contaminação, análise. Este módulo conecta tudo isso num framework de gestão: como a Noria Corporation estrutura, na prática, um programa de lubrificação de classe mundial capaz de sustentar ganhos de confiabilidade ao longo do tempo, e não apenas em projetos pontuais."
      },
      {
        "type": "h2",
        "text": "L11.1 O conceito de Estado de Referência Ótimo (ORS)"
      },
      {
        "type": "p",
        "text": "O Optimum Reference State — ORS (Estado de Referência Ótimo) é definido como a condição prescrita de configuração de máquina, condições de operação e atividades de manutenção necessárias para atingir e sustentar objetivos específicos de confiabilidade. Em outras palavras: antes de definir QUALQUER meta de lubrificação, é preciso definir explicitamente qual é o estado-alvo que a máquina precisa atingir — e então trabalhar de trás para frente para chegar lá."
      },
      {
        "type": "bullet",
        "text": "Sem um ORS definido, esforços de lubrificação tendem a virar uma lista de boas intenções dispersas, sem prioridade clara nem forma de medir progresso real."
      },
      {
        "type": "h2",
        "text": "L11.2 ASCEND — os 6 pilares"
      },
      {
        "type": "image",
        "src": "assets/img/lub_15_ascend.png",
        "caption": "ASCEND: os 6 pilares (áreas de avaliação) de um programa de lubrificação de classe mundial segundo a metodologia da Noria Corporation."
      },
      {
        "type": "table",
        "header": [
          "Pilar",
          "Foco"
        ],
        "rows": [
          [
            "Seleção do lubrificante",
            "Escolha tecnicamente correta de viscosidade, tipo de óleo base e pacote de aditivos para cada aplicação (ver Módulos L2 e L4)."
          ],
          [
            "Recebimento e armazenamento",
            "Prevenção de contaminação desde a chegada do produto até o ponto de aplicação (ver Módulo L5)."
          ],
          [
            "Manuseio e aplicação",
            "Sistemas de entrega (manuais e automáticos), quantidade e frequência corretas (ver Módulo L5)."
          ],
          [
            "Controle de contaminação",
            "Filtração, respiros, ISO 4406, gestão de água e outros contaminantes (ver Módulo L6)."
          ],
          [
            "Análise e monitoramento",
            "Amostragem, testes de laboratório, ferrografia, tendência (ver Módulos L7, L8 e L10)."
          ],
          [
            "Descarte ambiental",
            "Gestão responsável do óleo usado, conformidade regulatória (ver Módulo L12)."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "L11.3 Atributos habilitadores da confiabilidade"
      },
      {
        "type": "p",
        "text": "Além dos 6 pilares operacionais, a Noria destaca atributos organizacionais que precisam existir para que o programa seja sustentável a longo prazo, não apenas um projeto pontual:"
      },
      {
        "type": "bullet",
        "text": "Preparo das pessoas (People Preparedness): equipe treinada segundo padrões modernos de habilidade em lubrificação, com competências certificadas — exatamente o papel das certificações ICML discutidas no Módulo L8."
      },
      {
        "type": "bullet",
        "text": "Preparo da máquina (Machine Preparedness): os equipamentos têm os acessórios necessários para inspeção de qualidade, lubrificação, controle de contaminação e amostragem de óleo (visores de nível, pontos de amostragem dedicados, respiros adequados)."
      },
      {
        "type": "bullet",
        "text": "Lubrificantes de precisão (Precision Lubricants): lubrificantes corretamente selecionados em todas as propriedades físicas, químicas e de desempenho relevantes — não apenas \"o óleo certo\", mas o óleo certo em cada propriedade que importa para aquela aplicação específica."
      },
      {
        "type": "h2",
        "text": "L11.4 Por que isso importa para o Engenheiro de Confiabilidade"
      },
      {
        "type": "p",
        "text": "Um programa de lubrificação de classe mundial não é uma lista de tarefas isoladas — é um sistema onde cada pilar reforça os demais. Selecionar o lubrificante certo (pilar 1) não adianta se o armazenamento o contamina antes do uso (pilar 2); monitorar a saúde do óleo (pilar 5) só gera valor se as ações corretivas identificadas forem de fato executadas (pilares 2-4). O papel do Engenheiro de Confiabilidade é justamente enxergar esse sistema como um todo, priorizando investimentos onde o ORS de cada ativo crítico exige."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L11",
        "questions": [
          {
            "text": "Uma planta define metas de lubrificação (trocar filtros, fazer análise de óleo trimestral) sem antes definir o que cada ativo crítico precisa atingir em termos de confiabilidade. Qual conceito da metodologia Noria está faltando nesse planejamento?",
            "options": [
              {
                "id": "a",
                "text": "O ORS (Estado de Referência Ótimo) — a condição-alvo de confiabilidade que deveria orientar, de trás para frente, quais atividades de lubrificação realmente importam para cada ativo."
              },
              {
                "id": "b",
                "text": "O código LIS de identificação de lubrificantes."
              },
              {
                "id": "c",
                "text": "O teste RPVOT de vida oxidativa remanescente."
              },
              {
                "id": "d",
                "text": "A classificação ISO 6743 dos lubrificantes usados."
              }
            ],
            "correct": "a",
            "explanation": "Sem um ORS definido (o estado-alvo de confiabilidade de cada ativo), as atividades de lubrificação tendem a virar uma lista de boas intenções dispersas — o ORS é justamente o que permite trabalhar de trás para frente, priorizando o que realmente sustenta a confiabilidade daquele ativo específico."
          },
          {
            "text": "Dos 6 pilares do ASCEND, qual deles trata especificamente da prevenção de contaminação entre o recebimento do lubrificante e o momento em que ele chega ao ponto de aplicação?",
            "options": [
              {
                "id": "a",
                "text": "Recebimento e armazenamento."
              },
              {
                "id": "b",
                "text": "Análise e monitoramento."
              },
              {
                "id": "c",
                "text": "Descarte ambiental."
              },
              {
                "id": "d",
                "text": "Seleção do lubrificante."
              }
            ],
            "correct": "a",
            "explanation": "O pilar \"Recebimento e armazenamento\" cobre exatamente esse trecho da cadeia — desde a chegada do produto na planta até o armazenamento adequado, prevenindo contaminação antes mesmo de o lubrificante ser aplicado (ver Módulo L5)."
          },
          {
            "text": "Por que o atributo \"Preparo das pessoas\" (People Preparedness) é considerado um habilitador tão importante quanto os 6 pilares operacionais do ASCEND?",
            "options": [
              {
                "id": "a",
                "text": "Porque mesmo o melhor programa técnico falha se a equipe não tiver as competências e o treinamento necessários para executá-lo corretamente no dia a dia."
              },
              {
                "id": "b",
                "text": "Porque certificações ICML são exigidas por lei em todas as plantas industriais."
              },
              {
                "id": "c",
                "text": "Porque o preparo das pessoas substitui a necessidade de controle de contaminação."
              },
              {
                "id": "d",
                "text": "Porque apenas engenheiros certificados podem trocar filtros de óleo."
              }
            ],
            "correct": "a",
            "explanation": "Um programa tecnicamente bem desenhado (lubrificante certo, armazenamento correto, monitoramento adequado) só gera valor real se a equipe que o executa no dia a dia tiver as habilidades certificadas para isso — por isso o preparo das pessoas é tratado como atributo habilitador, tão essencial quanto os pilares técnicos."
          }
        ]
      }
    ],
    "meta": {
      "num": "L11",
      "short": "Programa de Classe Mundial (ASCEND)",
      "level": "avançado",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "O ORS (Estado de Referência Ótimo) define a condição-alvo de confiabilidade de cada ativo, orientando de trás para frente quais atividades de lubrificação realmente importam.",
      "O ASCEND organiza um programa de lubrificação de classe mundial em 6 pilares: seleção do lubrificante, recebimento/armazenamento, manuseio/aplicação, controle de contaminação, análise/monitoramento e descarte ambiental.",
      "Atributos habilitadores (preparo das pessoas, preparo da máquina, lubrificantes de precisão) sustentam os 6 pilares — sem eles, mesmo um programa tecnicamente bem desenhado tende a falhar na execução contínua."
    ]
  },
  {
    "id": "mlub12",
    "title": "Módulo L12 — Descarte de Óleo Usado, Segurança e Meio Ambiente",
    "body": [
      {
        "type": "p",
        "text": "O sexto pilar do ASCEND (Módulo L11) — descarte ambiental — costuma ser o mais negligenciado num programa de lubrificação, apesar de envolver responsabilidade legal direta do Engenheiro de Confiabilidade e da empresa. Este módulo cobre os fundamentos de gestão responsável do óleo usado e de segurança pessoal no manuseio de lubrificantes."
      },
      {
        "type": "h2",
        "text": "L12.1 Óleo usado não é lixo comum"
      },
      {
        "type": "p",
        "text": "Óleo lubrificante usado é classificado como resíduo perigoso na maioria das legislações (incluindo a brasileira, sob a Política Nacional de Resíduos Sólidos e resoluções específicas do CONAMA), devido à presença de metais de desgaste, aditivos degradados e possíveis contaminantes. Descarte inadequado (queima não controlada, despejo em solo/água, mistura com resíduos comuns) constitui infração ambiental grave, com responsabilidade que recai diretamente sobre o gerador do resíduo — a empresa e, em geral, também o profissional responsável tecnicamente pela operação."
      },
      {
        "type": "h2",
        "text": "L12.2 Hierarquia de gestão do óleo usado"
      },
      {
        "type": "image",
        "src": "assets/img/lub_16_hierarquia_descarte.png",
        "caption": "Hierarquia de prioridades na gestão do óleo lubrificante usado: reduzir sempre vem antes de reutilizar, que vem antes de reciclar, que vem antes de descartar."
      },
      {
        "type": "bullet",
        "text": "Reduzir: a melhor forma de gerenciar óleo usado é gerar menos dele — consolidação de lubrificantes (Módulo L4), lubrificação de precisão e monitoramento por análise de óleo (Módulos L7-L10) estendem a vida útil do lubrificante em uso, adiando a geração do resíduo."
      },
      {
        "type": "bullet",
        "text": "Reutilizar: reprocessamento/reclamação do óleo (remoção de contaminantes e restauração de propriedades, sem alterar sua composição química de base) permite reaproveitá-lo na mesma aplicação ou em aplicações menos exigentes."
      },
      {
        "type": "bullet",
        "text": "Reciclar: re-refino (processamento industrial que transforma óleo usado de volta em óleo base) ou uso como combustível alternativo em processos industriais controlados (coprocessamento), sempre por empresas licenciadas."
      },
      {
        "type": "bullet",
        "text": "Descartar: opção de último recurso, e apenas através de um coletor/destinador licenciado pelo órgão ambiental competente, com emissão de Certificado de Destinação Final (ou documento equivalente) que comprova a destinação correta — documento que a empresa geradora deve arquivar como comprovação legal."
      },
      {
        "type": "h2",
        "text": "L12.3 Armazenamento de óleo usado antes da coleta"
      },
      {
        "type": "bullet",
        "text": "Usar tambores/tanques dedicados exclusivamente a óleo usado, identificados e vedados, nunca misturando diferentes tipos de óleo usado sem necessidade (a mistura pode inviabilizar opções de reciclagem mais nobres, como o re-refino)."
      },
      {
        "type": "bullet",
        "text": "Evitar contaminação cruzada do óleo usado com água, solventes ou outros resíduos, que também pode inviabilizar sua reciclagem."
      },
      {
        "type": "bullet",
        "text": "Manter a área de armazenamento com contenção secundária (bacias de contenção) para evitar que um vazamento do tambor de óleo usado atinja o solo ou sistemas de drenagem."
      },
      {
        "type": "h2",
        "text": "L12.4 Segurança pessoal no manuseio de lubrificantes"
      },
      {
        "type": "bullet",
        "text": "Consultar sempre a FISPQ (Ficha de Informações de Segurança de Produtos Químicos) do lubrificante antes de manuseá-lo, especialmente para produtos com aditivos EP/AW à base de compostos de cloro, enxofre ou fósforo."
      },
      {
        "type": "bullet",
        "text": "Usar EPIs adequados (luvas resistentes a óleo, óculos de proteção) durante amostragem, troca de óleo e manuseio de graxa — contato repetido e prolongado com óleo mineral pode causar dermatite e, em casos raros, tem sido associado a outros riscos à saúde em exposições ocupacionais prolongadas sem proteção."
      },
      {
        "type": "bullet",
        "text": "Nunca usar ar comprimido para limpar respingos de óleo da pele ou roupas — risco de injeção subcutânea acidental de partículas/fluido sob pressão, uma lesão grave e por vezes subestimada."
      },
      {
        "type": "bullet",
        "text": "Sinalizar e conter imediatamente qualquer vazamento de óleo no piso — além do risco ambiental, é um risco imediato de escorregamento."
      },
      {
        "type": "h2",
        "text": "L12.5 Conformidade e o papel do Engenheiro de Confiabilidade"
      },
      {
        "type": "p",
        "text": "Manter registros de destinação do óleo usado (notas de coleta, certificados de destinação final, licenças do destinador) não é apenas boa prática — é evidência documental em caso de fiscalização ambiental. O Engenheiro de Confiabilidade que estrutura um programa de lubrificação de classe mundial (Módulo L11) deve tratar a conformidade ambiental com o mesmo rigor técnico dado à seleção de lubrificantes ou à análise de óleo — é parte integrante, não um apêndice, do programa."
      }
    ],
    "quizzes": [
      {
        "title": "Exercícios de fixação — Módulo L12",
        "questions": [
          {
            "text": "Por que consolidar lubrificantes (Módulo L4) e adotar lubrificação de precisão são consideradas ações de gestão de óleo usado, mesmo ocorrendo antes de o óleo virar resíduo?",
            "options": [
              {
                "id": "a",
                "text": "Porque se encaixam no topo da hierarquia de gestão — \"reduzir\" —, já que estendem a vida útil do lubrificante em uso e adiam ou diminuem a geração do resíduo."
              },
              {
                "id": "b",
                "text": "Porque eliminam totalmente a necessidade de descarte de óleo usado em qualquer circunstância."
              },
              {
                "id": "c",
                "text": "Porque substituem a exigência legal de usar um destinador licenciado."
              },
              {
                "id": "d",
                "text": "Porque são exigidas apenas em plantas certificadas ISO 14001."
              }
            ],
            "correct": "a",
            "explanation": "A hierarquia de gestão do óleo usado prioriza reduzir antes de reutilizar, reciclar ou descartar — e reduzir a geração do resíduo na origem (usando o lubrificante certo, de forma precisa, e monitorando sua saúde) é sempre a opção mais eficaz e de maior prioridade, mesmo ocorrendo antes de o óleo se tornar resíduo propriamente dito."
          },
          {
            "text": "Um técnico usa ar comprimido para remover respingos de óleo hidráulico da própria mão. Qual é o risco específico dessa prática, além da simples irritação da pele?",
            "options": [
              {
                "id": "a",
                "text": "Risco de injeção subcutânea acidental de fluido/partículas sob pressão — uma lesão grave, por vezes subestimada."
              },
              {
                "id": "b",
                "text": "Risco de o óleo reagir quimicamente com o ar comprimido, gerando vapores tóxicos."
              },
              {
                "id": "c",
                "text": "Risco de contaminação do óleo hidráulico do próprio sistema."
              },
              {
                "id": "d",
                "text": "Nenhum risco adicional, é uma prática segura e recomendada."
              }
            ],
            "correct": "a",
            "explanation": "Usar ar comprimido para limpar a pele pode injetar fluido/partículas sob a pele através de pequenas rupturas ou poros, causando uma lesão de injeção subcutânea — um risco sério, frequentemente subestimado por parecer uma prática inofensiva do dia a dia."
          },
          {
            "text": "Por que misturar diferentes tipos de óleo usado no mesmo tambor de armazenamento pode ser prejudicial, mesmo antes da coleta pelo destinador licenciado?",
            "options": [
              {
                "id": "a",
                "text": "Porque pode inviabilizar opções de reciclagem mais nobres, como o re-refino, que dependem de uma composição mais homogênea do óleo usado coletado."
              },
              {
                "id": "b",
                "text": "Porque é proibido por lei armazenar mais de um tambor de óleo usado por planta."
              },
              {
                "id": "c",
                "text": "Porque a mistura sempre gera reação exotérmica perigosa entre óleos diferentes."
              },
              {
                "id": "d",
                "text": "Porque reduz o volume total de óleo usado gerado pela planta."
              }
            ],
            "correct": "a",
            "explanation": "Misturar tipos diferentes de óleo usado sem necessidade compromete a possibilidade de reciclagem mais nobre (como o re-refino, que exige uma matéria-prima mais homogênea), empurrando o destino do material para opções de menor valor na hierarquia de gestão — por isso o armazenamento em tambores dedicados e identificados é recomendado."
          }
        ]
      }
    ],
    "meta": {
      "num": "L12",
      "short": "Descarte, Segurança e Meio Ambiente",
      "level": "avançado",
      "track": "lubrificacao"
    },
    "videoUrl": null,
    "summary": [
      "Óleo lubrificante usado é resíduo perigoso na legislação brasileira — descarte inadequado é infração ambiental grave, com responsabilidade direta do gerador.",
      "A hierarquia de gestão prioriza reduzir (consolidação, precisão) antes de reutilizar (reprocessar), reciclar (re-refino) e, por último, descartar — sempre com destinador licenciado e certificado de destinação final.",
      "Segurança pessoal no manuseio de lubrificantes inclui consultar a FISPQ, usar EPIs adequados e nunca usar ar comprimido para limpar a pele (risco de injeção subcutânea)."
    ]
  }
];
