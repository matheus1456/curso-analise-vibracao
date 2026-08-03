// Gerado automaticamente por scripts/build_lube_cases_file.js — não editar manualmente.
// Seção "Engenheiro de Lubrificação" da Prática de Diagnóstico: casos reais de
// interpretação de relatório de análise de óleo, baseados no Body of Knowledge
// ICML (MLA I/II/III) e nas práticas descritas no catálogo de treinamento Noria.
const LUBE_CASES = [
 {
  "id": "lc1",
  "num": 1,
  "level": "básico",
  "relatedModule": "mlub6",
  "relatedModuleLabel": "Módulo L6 — Contaminação e Filtração",
  "title": "Servoválvula travando em sistema hidráulico de precisão",
  "briefing": [
   "Prensa hidráulica de precisão com servoválvula proporcional; operadores reportam movimentos erráticos e travamentos intermitentes há duas semanas.",
   "Última troca de filtro de retorno foi há 8 meses (acima do intervalo recomendado de 6 meses para este sistema).",
   "Reservatório com respiro simples (sem elemento dessecante/filtrante)."
  ],
  "readings": [
   {
    "label": "Código de limpeza ISO 4406",
    "value": "22/20/17 (alvo do sistema: 16/14/11)"
   },
   {
    "label": "Viscosidade a 40 °C",
    "value": "46,3 cSt (especificado: 46 cSt) — normal"
   },
   {
    "label": "Água (Karl Fischer)",
    "value": "180 ppm — normal para o tipo de óleo"
   },
   {
    "label": "Fe (ferro) por ICP",
    "value": "9 ppm — levemente elevado"
   },
   {
    "label": "Si (silício) por ICP",
    "value": "22 ppm — elevado"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Contaminação por partículas acima do nível exigido pelo sistema",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: reforçar a filtração (troca imediata do elemento de retorno, avaliar filtração offline/kidney-loop dedicada) até atingir o código-alvo 16/14/11, e revisar o respiro para um modelo dessecante/filtrante."
   },
   {
    "id": "b",
    "text": "Diluição do óleo por outro fluido (lubrificante errado)",
    "solution": "Incorreto neste caso — a viscosidade medida (46,3 cSt) está praticamente idêntica à especificada (46 cSt), o que descarta diluição relevante por outro fluido. Se fosse essa a hipótese, a ação seria isolar e trocar completamente a carga de óleo."
   },
   {
    "id": "c",
    "text": "Contaminação por água livre",
    "solution": "Incorreto neste caso — o teor de água (180 ppm) está dentro da faixa normal para este tipo de óleo, sem sinal de água livre ou emulsionada. Se fosse essa a hipótese, a ação seria investigar vedações/respiro e usar centrífuga ou coalescedor."
   },
   {
    "id": "d",
    "text": "Esgotamento do pacote de aditivos antidesgaste",
    "solution": "Incorreto neste caso — não há teste de aditivos (ex.: fósforo/zinco por ICP) indicando queda; o padrão observado (ISO 4406 alto + Si elevado) aponta diretamente para partículas, não para depleção de aditivo. Se fosse essa a hipótese, seria necessário acompanhar Zn/P por ICP ao longo do tempo."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Compare o código ISO 4406 medido com o alvo do sistema, e observe o elemento Si (silício) — ele é a \"impressão digital\" clássica de contaminação por poeira/areia (sílica) no óleo.",
  "explanation": "O código ISO 4406 medido (22/20/17) está muito acima do alvo do sistema (16/14/11), e o silício elevado (22 ppm) é a assinatura clássica de contaminação por partículas externas (poeira/areia). O filtro de retorno vencido (8 meses, acima do intervalo recomendado de 6) e o respiro sem elemento filtrante/dessecante são as duas causas raiz mais prováveis, permitindo entrada contínua de partículas no sistema.",
  "cause": "Filtro de retorno além do intervalo recomendado + respiro sem elemento filtrante, permitindo entrada contínua de partículas externas no reservatório.",
  "action": "Trocar imediatamente o elemento filtrante de retorno, avaliar filtração offline (kidney-loop) até restaurar o código-alvo, e substituir o respiro por um modelo dessecante/filtrante para prevenir reincidência.",
  "checks": []
 },
 {
  "id": "lc2",
  "num": 2,
  "level": "básico",
  "relatedModule": "mlub6",
  "relatedModuleLabel": "Módulo L6 — Contaminação e Filtração",
  "title": "Óleo com aparência leitosa em redutor de moenda",
  "briefing": [
   "Redutor de engrenagens de uma moenda em planta de processamento, exposto a lavagem frequente com mangueira de alta pressão.",
   "Operador reporta óleo com aspecto leitoso/turvo na última inspeção visual do visor de nível.",
   "Rolamento de saída do redutor já apresentou troca por corrosão há 8 meses."
  ],
  "readings": [
   {
    "label": "Aspecto visual",
    "value": "Turvo, leitoso"
   },
   {
    "label": "Água (Karl Fischer)",
    "value": "2.400 ppm (0,24%) — muito elevado"
   },
   {
    "label": "Viscosidade a 40 °C",
    "value": "148 cSt (especificado: 150 cSt) — normal"
   },
   {
    "label": "TAN (número de acidez)",
    "value": "0,6 mg KOH/g — normal"
   },
   {
    "label": "Demulsibilidade (D1401)",
    "value": "Separação lenta, com camada emulsionada persistente"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Contaminação por água, provavelmente emulsionada/livre",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: identificar e vedar o ponto de entrada de água (provavelmente durante a lavagem com mangueira), drenar a água livre do fundo do reservatório e considerar troca do óleo se a demulsibilidade não se recuperar."
   },
   {
    "id": "b",
    "text": "Oxidação avançada do óleo base",
    "solution": "Incorreto neste caso — o TAN está normal (0,6), o que descarta oxidação avançada como causa do aspecto leitoso. Se fosse essa a hipótese, o TAN estaria elevado e em tendência de subida."
   },
   {
    "id": "c",
    "text": "Contaminação por partículas sólidas (poeira)",
    "solution": "Incorreto neste caso — partículas sólidas normalmente escurecem o óleo ou o deixam com aspecto granulado, não leitoso; o aspecto leitoso característico é assinatura de água emulsionada, não de partículas."
   },
   {
    "id": "d",
    "text": "Lubrificante errado aplicado no último reabastecimento",
    "solution": "Incorreto neste caso — a viscosidade medida (148 cSt) está muito próxima da especificada (150 cSt), o que descarta lubrificante errado/diluição relevante como causa principal."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Aspecto leitoso/turvo do óleo é quase sempre sinal visual direto de água emulsionada — some com o histórico de corrosão prévia no rolamento de saída.",
  "explanation": "O aspecto leitoso, combinado com teor de água muito elevado (2.400 ppm) e demulsibilidade comprometida (separação lenta), confirma contaminação por água emulsionada/livre. O ambiente de lavagem frequente com mangueira de alta pressão é a causa raiz mais provável, e o histórico de corrosão no rolamento de saída é consistente com exposição prolongada à água.",
  "cause": "Entrada de água durante a lavagem de rotina do equipamento, provavelmente por vedações/respiro inadequados para o ambiente de lavagem.",
  "action": "Vedar o ponto de entrada de água, drenar a água livre do fundo do reservatório, avaliar troca do óleo se a demulsibilidade não se recuperar após a correção, e considerar respiro/vedação apropriados para ambiente de lavagem frequente.",
  "checks": []
 },
 {
  "id": "lc3",
  "num": 3,
  "level": "básico",
  "relatedModule": "mlub3",
  "relatedModuleLabel": "Módulo L3 — Graxas Lubrificantes",
  "title": "Motor elétrico esquenta logo após a relubrificação de rotina",
  "briefing": [
   "Motor elétrico de 75 cv, relubrificado manualmente pela rota de lubrificação a cada 2.000 horas conforme procedimento padrão.",
   "Duas horas após a relubrificação de rotina, a temperatura da carcaça do lado do acoplamento subiu de 58 °C para 79 °C.",
   "Técnico relata ter aplicado \"um pouco mais\" de graxa do que a quantidade especificada, \"para garantir\"."
  ],
  "readings": [
   {
    "label": "Temperatura antes da relubrificação",
    "value": "58 °C"
   },
   {
    "label": "Temperatura 2h após a relubrificação",
    "value": "79 °C"
   },
   {
    "label": "Quantidade aplicada",
    "value": "Acima da especificada (~1,5x)"
   },
   {
    "label": "Ruído/vibração",
    "value": "Sem alteração perceptível"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Excesso de graxa aplicada, gerando atrito e calor até ser expelida",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: nenhuma intervenção mecânica é necessária; monitorar a temperatura, que deve retornar ao normal em algumas horas conforme o excesso é expelido, e reforçar o treinamento da equipe quanto à quantidade correta de graxa."
   },
   {
    "id": "b",
    "text": "Incompatibilidade entre graxas de tipos diferentes",
    "solution": "Incorreto neste caso (não descartável sem mais dados, mas menos provável) — o cenário não menciona troca do tipo de graxa, apenas quantidade excessiva do mesmo produto; incompatibilidade normalmente também causaria amolecimento visível e vazamento pela vedação, não relatado aqui."
   },
   {
    "id": "c",
    "text": "Falha iminente do rolamento por fadiga",
    "solution": "Incorreto neste caso — não há aumento de vibração ou ruído reportado, e o padrão temporal (aquecimento logo após a relubrificação, associado a quantidade excessiva) é característico de excesso de graxa, não de fadiga em progresso."
   },
   {
    "id": "d",
    "text": "Superaquecimento elétrico do motor, não relacionado à lubrificação",
    "solution": "Incorreto neste caso — a coincidência temporal exata entre a relubrificação com quantidade excessiva e o início do aquecimento aponta fortemente para causa mecânica/lubrificação, não elétrica."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Repare na coincidência temporal exata entre a relubrificação e o início do aquecimento, e no fato de que o próprio técnico relata ter aplicado mais graxa do que o especificado.",
  "explanation": "O aumento de temperatura ocorreu logo após a relubrificação com quantidade acima da especificada — padrão clássico de excesso de graxa: o excedente precisa ser mecanicamente \"trabalhado\" pelos elementos rolantes até ser expelido, gerando atrito e calor adicionais temporários.",
  "cause": "Aplicação de quantidade de graxa acima da especificada pelo fabricante do motor/rolamento.",
  "action": "Monitorar a temperatura — deve normalizar em algumas horas conforme o excesso é expelido. Reforçar o treinamento da rota de lubrificação quanto à quantidade correta (ver fórmula do Módulo L5) para evitar recorrência.",
  "checks": []
 },
 {
  "id": "lc4",
  "num": 4,
  "level": "intermediário",
  "relatedModule": "mlub6",
  "relatedModuleLabel": "Módulo L6 — Contaminação e Filtração",
  "title": "Viscosidade em queda em motor diesel estacionário",
  "briefing": [
   "Gerador diesel estacionário de backup, testado semanalmente sob carga por 30 minutos.",
   "Três análises consecutivas de óleo (mensal) mostram viscosidade em queda progressiva.",
   "Operador relata leve cheiro de combustível ao verificar o nível de óleo na última inspeção."
  ],
  "readings": [
   {
    "label": "Viscosidade a 40 °C — 3 meses atrás",
    "value": "14,8 cSt (grau 15W-40, normal)"
   },
   {
    "label": "Viscosidade a 40 °C — 2 meses atrás",
    "value": "13,1 cSt"
   },
   {
    "label": "Viscosidade a 40 °C — mês atual",
    "value": "10,9 cSt — queda significativa"
   },
   {
    "label": "FTIR — combustível",
    "value": "Banda de diluição por combustível detectada, em tendência de alta"
   },
   {
    "label": "TBN",
    "value": "8,2 mg KOH/g (ainda dentro da faixa aceitável)"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Diluição do óleo por combustível não queimado",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: investigar o sistema de injeção/combustão (bicos injetores, tempo de partida a frio, ciclos de teste muito curtos que não atingem temperatura de operação) e trocar o óleo imediatamente, já que a viscosidade está bem abaixo do especificado."
   },
   {
    "id": "b",
    "text": "Cisalhamento mecânico do melhorador de índice de viscosidade (VI improver)",
    "solution": "Incorreto neste caso — o cisalhamento do VI improver também reduz viscosidade, mas não explicaria o cheiro de combustível relatado nem a banda de diluição por combustível confirmada por FTIR; ambas as pistas apontam para combustível, não para cisalhamento do aditivo."
   },
   {
    "id": "c",
    "text": "Uso de lubrificante de grau de viscosidade errado desde o início",
    "solution": "Incorreto neste caso — a primeira leitura (14,8 cSt) estava normal para o grau especificado; a queda é progressiva ao longo de 3 meses, não um desvio já presente desde o início, o que descarta erro de especificação original."
   },
   {
    "id": "d",
    "text": "Contaminação por água emulsionada",
    "solution": "Incorreto neste caso — água emulsionada tipicamente não reduz a viscosidade medida por D445 de forma tão acentuada nem produz cheiro de combustível; o padrão de evidências (cheiro + FTIR de combustível + queda de viscosidade) aponta para diluição por combustível."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "O cheiro de combustível relatado pelo operador é uma pista de campo importante — combine-o com o que o FTIR está mostrando.",
  "explanation": "A combinação de queda progressiva e acentuada de viscosidade, banda de diluição por combustível confirmada por FTIR em tendência de alta, e o cheiro de combustível relatado em campo confirmam diluição por combustível não queimado. Ciclos de teste curtos sob carga (30 minutos semanais) podem não permitir que o motor atinja a temperatura de operação necessária para evaporar o combustível residual da partida a frio, uma causa raiz comum nesse padrão de uso.",
  "cause": "Combustão incompleta / partida a frio recorrente sem tempo suficiente sob carga para o motor atingir a temperatura de operação, permitindo acúmulo de combustível não queimado no óleo.",
  "action": "Trocar o óleo imediatamente (viscosidade já abaixo do aceitável), inspecionar o sistema de injeção, e avaliar estender o tempo de cada teste sob carga para permitir que o motor atinja temperatura de operação plena.",
  "checks": []
 },
 {
  "id": "lc5",
  "num": 5,
  "level": "intermediário",
  "relatedModule": "mlub6",
  "relatedModuleLabel": "Módulo L6 — Contaminação e Filtração",
  "title": "Corrosão inesperada em redutor com trocador de calor",
  "briefing": [
   "Redutor de esteira transportadora equipado com trocador de calor óleo/água de arrefecimento para controle de temperatura.",
   "Inspeção de rotina encontra início de corrosão em componentes internos, sem histórico de entrada de água por vedação externa.",
   "Óleo aparenta cor e viscosidade normais a olho nu."
  ],
  "readings": [
   {
    "label": "Teste colorimétrico de glicol",
    "value": "Positivo"
   },
   {
    "label": "Na (sódio) por ICP",
    "value": "45 ppm — elevado"
   },
   {
    "label": "K (potássio) por ICP",
    "value": "18 ppm — elevado"
   },
   {
    "label": "Viscosidade a 40 °C",
    "value": "218 cSt (especificado: 220 cSt) — normal"
   },
   {
    "label": "Água (Karl Fischer)",
    "value": "310 ppm — levemente elevado"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Vazamento interno no trocador de calor, com entrada de líquido de arrefecimento (glicol)",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: isolar e inspecionar o trocador de calor em busca de vazamento interno (teste de pressão), trocar o óleo contaminado e monitorar a corrosão já formada para decidir sobre reparo/troca dos componentes afetados."
   },
   {
    "id": "b",
    "text": "Entrada de água de chuva por vedação externa danificada",
    "solution": "Incorreto neste caso — o teste colorimétrico de glicol positivo e os níveis elevados de sódio/potássio (aditivos típicos de líquido de arrefecimento) apontam para o líquido de arrefecimento do trocador de calor, não para água de chuva comum, que não conteria esses elementos."
   },
   {
    "id": "c",
    "text": "Contaminação por partículas abrasivas causando corrosão por atrito",
    "solution": "Incorreto neste caso — não há elevação de contagem de partículas ou de elementos típicos de desgaste abrasivo relatada; o padrão de evidências (glicol positivo + Na/K elevados) aponta especificamente para líquido de arrefecimento, não para partículas abrasivas."
   },
   {
    "id": "d",
    "text": "Óleo com aditivo anticorrosivo esgotado por tempo de uso",
    "solution": "Incorreto como causa primária neste caso — mesmo que o aditivo anticorrosivo estivesse parcialmente consumido, isso não explicaria o teste de glicol positivo nem os elementos sódio/potássio elevados, que são a evidência direta da fonte real de contaminação."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Um teste de glicol positivo, combinado com sódio e potássio elevados, é a assinatura quase inequívoca de uma única fonte possível neste equipamento — pense no que há de diferente neste redutor.",
  "explanation": "O teste colorimétrico de glicol positivo, somado a sódio e potássio elevados (aditivos típicos de líquidos de arrefecimento comerciais), confirma contaminação por glicol — a fonte mais provável, dado o histórico do equipamento, é um vazamento interno no trocador de calor óleo/água usado para controle de temperatura do redutor.",
  "cause": "Vazamento interno no trocador de calor óleo/água de arrefecimento, permitindo mistura de líquido de arrefecimento com o óleo do redutor.",
  "action": "Isolar e testar o trocador de calor sob pressão para localizar e reparar o vazamento interno, trocar completamente o óleo contaminado e inspecionar os componentes já corroídos para decidir sobre reparo ou substituição.",
  "checks": []
 },
 {
  "id": "lc6",
  "num": 6,
  "level": "intermediário",
  "relatedModule": "mlub2",
  "relatedModuleLabel": "Módulo L2 — Óleos Base e Aditivos",
  "title": "Verniz e depósitos em turbina a vapor industrial",
  "briefing": [
   "Turbina a vapor de planta de cogeração, óleo em uso contínuo há mais de 4 anos sem troca completa (apenas reposições parciais).",
   "Inspeção encontra depósitos de verniz em válvulas de controle, causando resposta lenta em algumas manobras.",
   "Temperatura de operação do óleo tem se mantido de 5 a 8 °C acima do projeto nos últimos meses, devido a um resfriador parcialmente sujo."
  ],
  "readings": [
   {
    "label": "TAN (número de acidez)",
    "value": "0,42 mg KOH/g, subindo de forma consistente"
   },
   {
    "label": "RPVOT (vida oxidativa remanescente)",
    "value": "18% da vida original — crítico"
   },
   {
    "label": "Viscosidade a 40 °C",
    "value": "Levemente acima do especificado, em leve tendência de alta"
   },
   {
    "label": "FTIR — oxidação",
    "value": "Banda de oxidação em tendência de alta"
   },
   {
    "label": "Teste de verniz (MPC)",
    "value": "Classificação alta — tendência de formação de depósitos confirmada"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Degradação oxidativa avançada do óleo, acelerada pela temperatura elevada",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: planejar a troca completa do óleo (o RPVOT crítico indica que a reserva de antioxidante está praticamente esgotada), limpar o resfriador para restaurar a temperatura de projeto, e considerar um processo de remoção de verniz (ex.: filtração com resina) antes da troca definitiva."
   },
   {
    "id": "b",
    "text": "Contaminação por partículas sólidas",
    "solution": "Incorreto neste caso — não há elevação de contagem de partículas ou de código ISO 4406 mencionada; todo o padrão de evidências (TAN subindo, RPVOT baixo, FTIR de oxidação, verniz) aponta para degradação oxidativa do próprio óleo, não para partículas externas."
   },
   {
    "id": "c",
    "text": "Diluição por água de processo",
    "solution": "Incorreto neste caso — não há teor de água elevado relatado; verniz e depósitos com TAN em alta e RPVOT baixo são assinatura de oxidação térmica prolongada, não de contaminação por água."
   },
   {
    "id": "d",
    "text": "Uso do grau de viscosidade errado desde a última reposição",
    "solution": "Incorreto neste caso — a viscosidade está apenas levemente acima do especificado, consistente com o próprio processo de oxidação (que tende a aumentar viscosidade), e não indica um erro de especificação de produto."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Olhe para o RPVOT (vida oxidativa remanescente) e para o histórico de temperatura de operação acima do projeto — a combinação conta uma história de anos.",
  "explanation": "TAN em alta consistente, RPVOT crítico (apenas 18% da vida oxidativa original) e FTIR indicando oxidação em tendência de alta confirmam degradação oxidativa avançada do óleo — um processo acelerado pela temperatura de operação persistentemente acima do projeto (resfriador parcialmente sujo) ao longo de mais de 4 anos sem troca completa. O verniz encontrado nas válvulas é a consequência física direta dessa oxidação prolongada.",
  "cause": "Uso prolongado do óleo (mais de 4 anos sem troca completa) combinado com temperatura de operação cronicamente elevada (resfriador sujo), acelerando a oxidação além da capacidade do pacote de antioxidante.",
  "action": "Planejar a troca completa do óleo diante do RPVOT crítico, limpar/restaurar o resfriador para a temperatura de projeto, e avaliar um processo de remoção de verniz (filtração com meio de resina, por exemplo) antes ou durante a troca.",
  "checks": []
 },
 {
  "id": "lc7",
  "num": 7,
  "level": "intermediário",
  "relatedModule": "mlub3",
  "relatedModuleLabel": "Módulo L3 — Graxas Lubrificantes",
  "title": "Graxa amolecida e vazando em mancal de ventilador industrial",
  "briefing": [
   "Mancal de ventilador industrial de grande porte, normalmente lubrificado com graxa de lítio-complexo NLGI 2.",
   "Devido à falta de estoque, a última relubrificação foi feita com uma graxa de poliureia disponível no almoxarifado, sem verificação prévia de compatibilidade.",
   "Duas semanas depois, observa-se vazamento de graxa amolecida pela vedação do mancal."
  ],
  "readings": [
   {
    "label": "Consistência observada (penetração)",
    "value": "Muito mais mole que o NLGI 2 especificado"
   },
   {
    "label": "Aspecto",
    "value": "Graxa separando óleo (bleeding) visivelmente na carcaça"
   },
   {
    "label": "Temperatura do mancal",
    "value": "Levemente acima do normal, mas sem alarme crítico"
   },
   {
    "label": "Elementos do espessante (análise elementar)",
    "value": "Mistura de assinaturas de dois espessantes diferentes"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Incompatibilidade entre os espessantes das duas graxas misturadas",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: purgar completamente a graxa incompatível (relubrificar em excesso para expulsar a mistura, ou desmontar se necessário), padronizar novamente com a graxa de lítio-complexo original, e implementar controle de estoque para evitar substituições não verificadas."
   },
   {
    "id": "b",
    "text": "Excesso de graxa aplicada na última relubrificação",
    "solution": "Incorreto como causa principal neste caso — o problema não é a quantidade aplicada, mas a mistura de dois espessantes incompatíveis (lítio-complexo com poliureia), que amolece a graxa independentemente da quantidade usada."
   },
   {
    "id": "c",
    "text": "Superaquecimento do mancal por falha do rolamento",
    "solution": "Incorreto neste caso — a temperatura está apenas levemente elevada, sem sinais de falha iminente do rolamento; o padrão de evidências (vazamento + amolecimento + mistura de assinaturas de espessante) aponta para incompatibilidade química da graxa, não para falha mecânica do rolamento."
   },
   {
    "id": "d",
    "text": "Graxa vencida além da vida de prateleira",
    "solution": "Incorreto neste caso — o cenário não indica graxa antiga em estoque; o problema descrito é a mistura recente de dois tipos de espessante diferentes, não o envelhecimento natural do produto."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Lembre-se da tabela de compatibilidade de espessantes do Módulo L3 — poliureia e lítio comum/complexo não se misturam bem.",
  "explanation": "A mistura de graxa de poliureia com a graxa de lítio-complexo originalmente usada é quimicamente incompatível — o resultado típico é o amolecimento acentuado da graxa e a separação de óleo (bleeding), exatamente o que foi observado (consistência muito abaixo do NLGI 2 especificado e vazamento pela vedação).",
  "cause": "Substituição não verificada da graxa especificada por outro tipo de espessante quimicamente incompatível, por falta de estoque do produto correto.",
  "action": "Purgar completamente a graxa misturada (relubrificação em excesso para expulsão, ou desmontagem se necessário), retornar à graxa de lítio-complexo especificada, e implementar controle de estoque/aprovação de substitutos para evitar recorrência.",
  "checks": []
 },
 {
  "id": "lc8",
  "num": 8,
  "level": "avançado",
  "relatedModule": "mlub8",
  "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
  "title": "Ferro em ascensão e partículas laminares em redutor crítico",
  "briefing": [
   "Redutor de engrenagens de um moinho de bolas, ativo crítico de produção, com programa de análise de óleo trimestral.",
   "Últimas três análises mostram ferro (Fe) por ICP em tendência clara de alta, mas ainda dentro do limite de alarme fixo genérico da indústria.",
   "Ferrografia analítica foi solicitada como teste complementar diante da tendência."
  ],
  "readings": [
   {
    "label": "Fe (ferro) por ICP — 3 análises",
    "value": "22 → 38 → 61 ppm (tendência de alta)"
   },
   {
    "label": "Limite de alarme fixo (genérico)",
    "value": "80 ppm — ainda não atingido"
   },
   {
    "label": "Limite estatístico (histórico deste ativo)",
    "value": "Média 15 ppm ± desvio 8 ppm → alarme em ~39 ppm — já ultrapassado"
   },
   {
    "label": "Ferrografia — morfologia predominante",
    "value": "Partículas laminares em quantidade crescente"
   },
   {
    "label": "Contagem de partículas (ISO 4406)",
    "value": "Dentro do padrão aceitável"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Fadiga superficial em estágio avançado (spalling ativo) num componente de aço do redutor",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: programar inspeção física urgente (boroscopia ou abertura) do redutor para localizar o componente com fadiga em progresso, e planejar reparo/substituição antes de uma falha catastrófica — o limite estatístico do próprio ativo já foi ultrapassado, mesmo com o limite genérico ainda não atingido."
   },
   {
    "id": "b",
    "text": "Contaminação por partículas abrasivas externas",
    "solution": "Incorreto neste caso — a contagem de partículas por ISO 4406 está dentro do padrão aceitável, o que descarta contaminação abrasiva externa como causa do ferro em ascensão; a ferrografia aponta para partículas laminares (fadiga), não partículas de corte (abrasão)."
   },
   {
    "id": "c",
    "text": "Situação normal, dentro do limite de alarme, sem necessidade de ação imediata",
    "solution": "Incorreto — embora o limite de alarme FIXO genérico ainda não tenha sido atingido, o limite ESTATÍSTICO calculado a partir do histórico deste ativo específico já foi ultrapassado, e a ferrografia confirma partículas laminares (fadiga avançada) em quantidade crescente — ignorar esse sinal arrisca uma falha não detectada a tempo."
   },
   {
    "id": "d",
    "text": "Erro de laboratório — resultado deve ser desconsiderado",
    "solution": "Incorreto — a tendência consistente ao longo de três análises sucessivas, corroborada por um teste complementar independente (ferrografia mostrando partículas laminares crescentes), é evidência forte demais para ser atribuída a erro de laboratório; a hipótese correta é investigar a máquina fisicamente."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Compare os dois tipos de limite de alarme (fixo genérico vs. estatístico do próprio ativo) — o Módulo L8 explica por que essa diferença importa muito num ativo crítico.",
  "explanation": "Embora o ferro ainda esteja abaixo do limite de alarme fixo genérico da indústria (80 ppm), ele já ultrapassou o limite estatístico calculado a partir do próprio histórico deste ativo (~39 ppm) — evidenciando um desvio real e específico daquela máquina. A ferrografia confirma partículas laminares em quantidade crescente, assinatura de fadiga superficial em estágio avançado (spalling ativo), não de contaminação externa.",
  "cause": "Fadiga superficial em progresso em um componente interno do redutor (provavelmente um dente de engrenagem ou pista de rolamento), ainda não confirmada visualmente.",
  "action": "Programar inspeção física urgente (boroscopia ou abertura programada) para localizar e avaliar o componente afetado, e planejar reparo ou substituição antes que a fadiga evolua para falha catastrófica — mesmo o ativo crítico ainda não tendo atingido o limite de alarme genérico.",
  "checks": []
 },
 {
  "id": "lc9",
  "num": 9,
  "level": "avançado",
  "relatedModule": "mlub8",
  "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
  "title": "Partículas irregulares e ruído característico em bomba centrífuga",
  "briefing": [
   "Bomba centrífuga de água de processo, alimentando de um reservatório em nível baixo, com tubulação de sucção relativamente longa.",
   "Operadores relatam ruído característico de \"pedras rolando\" na carcaça, mais intenso em determinadas condições de vazão.",
   "Análise de óleo do mancal da bomba mostra partículas metálicas com morfologia incomum."
  ],
  "readings": [
   {
    "label": "Ruído reportado",
    "value": "\"Pedras rolando\", intermitente, ligado à vazão"
   },
   {
    "label": "Ferrografia — morfologia",
    "value": "Partículas irregulares, superfície tipicamente craterizada/corroída"
   },
   {
    "label": "Fe (ferro) por ICP",
    "value": "Elevado, em tendência de alta"
   },
   {
    "label": "NPSH disponível estimado",
    "value": "Próximo do limite mínimo do fabricante para a condição atual"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Desgaste por cavitação, associado a NPSH insuficiente na sucção",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: revisar as condições de sucção (elevar o nível do reservatório, reduzir perdas de carga na tubulação de sucção, avaliar reduzir a vazão de operação) para restaurar a margem de NPSH, e inspecionar o rotor/carcaça em busca de erosão já instalada."
   },
   {
    "id": "b",
    "text": "Desgaste abrasivo por partículas sólidas na água de processo",
    "solution": "Incorreto neste caso — desgaste abrasivo tipicamente produz partículas de corte ou riscos lineares nas superfícies, não a morfologia craterizada/corroída típica de cavitação; o ruído característico de \"pedras rolando\" ligado à vazão é a assinatura clássica de cavitação, não de abrasão."
   },
   {
    "id": "c",
    "text": "Desalinhamento do acoplamento entre motor e bomba",
    "solution": "Incorreto neste caso — desalinhamento se manifesta predominantemente como vibração elevada em 1x/2x a rotação (ver Módulo 15 do curso de vibração), não como ruído de \"pedras rolando\" ligado à vazão nem como partículas com morfologia de cavitação na análise de óleo."
   },
   {
    "id": "d",
    "text": "Corrosão química generalizada por água agressiva",
    "solution": "Incorreto neste caso — corrosão química generalizada tende a ser mais uniforme e não produziria o ruído característico ligado à vazão nem a relação direta com a condição de NPSH próxima do limite, que aponta especificamente para cavitação."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "O ruído de \"pedras rolando\", ligado à vazão de operação, é uma das assinaturas de campo mais conhecidas para este mecanismo de desgaste — combine com a condição de NPSH.",
  "explanation": "O ruído característico de \"pedras rolando\" ligado à vazão, combinado com NPSH disponível próximo do limite mínimo e partículas de morfologia irregular/craterizada na ferrografia, confirma desgaste por cavitação: o colapso de bolhas de vapor formadas por pressão de sucção insuficiente gera microjatos de altíssima energia que erodem as superfícies do rotor/carcaça.",
  "cause": "NPSH disponível insuficiente na condição atual de operação (nível baixo no reservatório de sucção somado a perdas de carga na tubulação), causando formação e colapso de bolhas de vapor (cavitação) dentro da bomba.",
  "action": "Restaurar a margem de NPSH (elevar nível do reservatório, reduzir perdas de carga na sucção, ou reduzir a vazão de operação) e inspecionar fisicamente o rotor/carcaça para avaliar a extensão da erosão já causada.",
  "checks": []
 },
 {
  "id": "lc10",
  "num": 10,
  "level": "avançado",
  "relatedModule": "mlub6",
  "relatedModuleLabel": "Módulo L6 — Contaminação e Filtração",
  "title": "Operação errática de válvulas em sistema hidráulico de grande porte",
  "briefing": [
   "Sistema hidráulico de grande porte (prensa industrial), reservatório com nível historicamente baixo em relação ao recomendado pelo fabricante.",
   "Retorno de óleo ao reservatório projetado com tubo terminando acima do nível de óleo (sem submersão), gerando respingo visível.",
   "Válvulas direcionais apresentam operação \"esponjosa\"/errática, especialmente após períodos de operação contínua."
  ],
  "readings": [
   {
    "label": "Aspecto do óleo no reservatório",
    "value": "Espuma visível na superfície, aspecto \"leitoso\" quando agitado"
   },
   {
    "label": "Liberação de ar (ASTM D3427)",
    "value": "Tempo de liberação de ar acima do normal — piora"
   },
   {
    "label": "Estabilidade de espuma (ASTM D892)",
    "value": "Volume de espuma elevado, colapso lento"
   },
   {
    "label": "Água (Karl Fischer)",
    "value": "Normal"
   },
   {
    "label": "Viscosidade a 40 °C",
    "value": "Normal"
   }
  ],
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Aeração/entranhamento de ar, agravada pelo projeto do retorno e nível baixo do reservatório",
    "solution": "Correto — é exatamente esse o diagnóstico. Ação: corrigir o projeto do retorno (submergir a saída do tubo abaixo do nível de óleo, direcionar o fluxo para reduzir turbulência), elevar o nível do reservatório ao recomendado pelo fabricante, e verificar vazamentos de sucção que possam estar introduzindo ar adicional."
   },
   {
    "id": "b",
    "text": "Contaminação por água emulsionada",
    "solution": "Incorreto neste caso — o teor de água medido está normal; o aspecto leitoso aqui é causado por bolhas de ar finamente dispersas (aeração), não por água, o que é confirmado pelos testes específicos de liberação de ar e estabilidade de espuma alterados."
   },
   {
    "id": "c",
    "text": "Diluição do óleo por fluido incompatível",
    "solution": "Incorreto neste caso — a viscosidade está normal, o que descarta diluição relevante por outro fluido como causa da operação errática das válvulas."
   },
   {
    "id": "d",
    "text": "Desgaste interno das válvulas direcionais por partículas abrasivas",
    "solution": "Incorreto como causa primária neste caso — o padrão de evidências (espuma visível, liberação de ar comprometida, projeto de retorno sem submersão, nível baixo) aponta diretamente para aeração; não há elevação de contagem de partículas ou de elementos de desgaste mencionada."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Repare em dois detalhes de projeto mencionados no cenário — nível do reservatório e a posição da saída do tubo de retorno — ambos são causas raiz clássicas do mesmo problema.",
  "explanation": "O ar entranhado/dissolvido no óleo compromete a rigidez do filme lubrificante (o ar é compressível) e causa exatamente a operação \"esponjosa\"/errática relatada nas válvulas. O projeto do retorno sem submersão (gerando respingo e turbulência na superfície do reservatório) e o nível de óleo cronicamente baixo são causas raiz clássicas de aeração, confirmadas pelos testes de liberação de ar e estabilidade de espuma alterados.",
  "cause": "Projeto inadequado do retorno de óleo ao reservatório (sem submersão da saída) combinado com nível de óleo abaixo do recomendado, favorecendo a incorporação de ar na superfície turbulenta do reservatório.",
  "action": "Corrigir o projeto do retorno (submergir a saída, reduzir turbulência), elevar o nível do reservatório ao recomendado pelo fabricante, e inspecionar a linha de sucção em busca de vazamentos que possam estar introduzindo ar adicional ao sistema.",
  "checks": []
 },
 {
  "id": "lc11",
  "num": 11,
  "level": "avançado",
  "relatedModule": "mlub10",
  "relatedModuleLabel": "Módulo L10 — Verniz, RULER e RPVOT",
  "title": "Compressor de parafuso com histórico de travamento de válvulas",
  "briefing": [
   "Compressor de parafuso rotativo lubrificado a óleo mineral, operação contínua 24/7 há 3 anos com o mesmo óleo (troca prevista apenas em parada programada anual).",
   "Manutenção relata dificuldade crescente de movimentação da válvula de admissão e depósitos amarronzados no visor de nível.",
   "Óleo não trocado nos últimos 14 meses (acima do intervalo de 12 meses recomendado pelo fabricante)."
  ],
  "laudo": {
   "lab": "LUBRIN — Laboratório de Análise de Lubrificantes",
   "numero": "LB-24-08841",
   "sample": {
    "equipamento": "Compressor de parafuso #2",
    "ponto": "Cárter, após separador de óleo",
    "lubrificante": "Mineral ISO VG 68 (grupo II)",
    "dataColeta": "22/07/2026",
    "dataAnalise": "25/07/2026",
    "horasOleo": "≈ 10.200 h (14 meses)"
   },
   "physChem": [
    {
     "param": "Viscosidade a 40 °C",
     "result": "74,8 cSt",
     "ref": "68,0 cSt",
     "status": "warn"
    },
    {
     "param": "TAN (número de acidez total)",
     "result": "1,8 mg KOH/g",
     "ref": "0,25 mg KOH/g",
     "status": "crit"
    },
    {
     "param": "MPC (Membrane Patch Colorimetry, ΔE)",
     "result": "58",
     "ref": "< 20 (limite de alerta)",
     "status": "crit"
    },
    {
     "param": "RULER — % de antioxidante remanescente",
     "result": "12%",
     "ref": "> 25% (alerta abaixo disso)",
     "status": "crit"
    },
    {
     "param": "Água (Karl Fischer)",
     "result": "145 ppm",
     "ref": "< 200 ppm",
     "status": "ok"
    }
   ],
   "wearMetals": [
    {
     "param": "Fe (ferro)",
     "result": "18 ppm",
     "ref": "< 10 ppm",
     "status": "warn"
    },
    {
     "param": "Cu (cobre)",
     "result": "6 ppm",
     "ref": "< 5 ppm",
     "status": "warn"
    }
   ],
   "additives": [
    {
     "param": "Zn (zinco, antidesgaste)",
     "result": "410 ppm",
     "ref": "480 ppm",
     "status": "warn"
    },
    {
     "param": "Ca (cálcio, detergente)",
     "result": "890 ppm",
     "ref": "950 ppm",
     "status": "ok"
    }
   ],
   "particleCount": [
    {
     "param": "ISO 4406",
     "result": "19/17/14",
     "ref": "18/16/13",
     "status": "warn"
    }
   ],
   "opinion": "Óleo em estágio avançado de degradação oxidativa: TAN muito elevado, MPC muito acima do limite de alerta (formação de verniz confirmada) e RULER indicando depleção severa do pacote de antioxidantes (12% remanescente). Recomenda-se troca imediata do óleo e limpeza do sistema (flush) para remoção de depósitos de verniz já formados nas válvulas, revisão do intervalo de troca para esse regime de operação contínua."
  },
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Formação de verniz por degradação oxidativa, com depleção do pacote de antioxidantes",
    "solution": "Correto — o conjunto TAN alto + MPC muito elevado (ΔE=58) + RULER baixo (12% de antioxidante remanescente) é a assinatura clássica de formação de verniz por oxidação avançada do óleo, consistente com uso muito além do intervalo recomendado."
   },
   {
    "id": "b",
    "text": "Contaminação por água livre",
    "solution": "Incorreto neste caso — o teor de água (145 ppm) está dentro da faixa normal (abaixo de 200 ppm); não há evidência de água livre ou emulsionada."
   },
   {
    "id": "c",
    "text": "Desgaste abrasivo severo por partículas externas",
    "solution": "Incorreto como causa primária — o ISO 4406 está apenas levemente acima do alvo (19/17/14 vs. 18/16/13) e os metais de desgaste (Fe, Cu) estão só discretamente elevados; o padrão dominante nos resultados é de degradação química do óleo, não abrasão."
   },
   {
    "id": "d",
    "text": "Diluição do óleo por combustível ou solvente",
    "solution": "Incorreto — a viscosidade está mais ALTA que a referência (74,8 vs. 68,0 cSt), o oposto do que se esperaria de diluição por combustível (que reduziria a viscosidade); o aumento de viscosidade é consistente com espessamento por produtos de oxidação."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Observe três testes específicos juntos: TAN, MPC e RULER — todos apontando na mesma direção sobre a saúde química do óleo, não sobre contaminação externa.",
  "explanation": "O TAN muito elevado (1,8 vs. 0,25 mg KOH/g) indica degradação oxidativa avançada. O MPC de 58 (bem acima do limite de alerta de ~20) confirma formação de verniz — produtos de oxidação insolúveis já presentes em quantidade significativa. O RULER de apenas 12% de antioxidante remanescente mostra que o pacote de proteção contra oxidação está quase esgotado, o que acelera ainda mais a degradação a partir daqui. O uso do óleo por 14 meses (acima do intervalo de 12 recomendado) em operação contínua 24/7 é a causa raiz mais provável.",
  "cause": "Uso do óleo além do intervalo de troca recomendado (14 vs. 12 meses) em regime de operação contínua e alta temperatura, levando ao esgotamento do pacote de antioxidantes e à oxidação avançada com formação de verniz.",
  "action": "Trocar o óleo imediatamente; realizar limpeza (flush) do sistema para remover depósitos de verniz já formados, com atenção especial à válvula de admissão; revisar o intervalo de troca para esse regime de operação, considerando monitoramento por RULER/MPC a cada troca futura.",
  "checks": []
 },
 {
  "id": "lc12",
  "num": 12,
  "level": "avançado",
  "relatedModule": "mlub8",
  "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
  "title": "Redutor de esteira transportadora com tendência crescente de metais de desgaste",
  "briefing": [
   "Redutor de engrenagens helicoidais de uma esteira transportadora de minério, monitorado trimestralmente há 2 anos.",
   "As últimas 3 análises mostram Fe e Cr subindo de forma consistente, sem mudança de carga ou processo reportada.",
   "Ferrografia analítica solicitada como complemento à espectroscopia de rotina, dado o padrão de tendência."
  ],
  "laudo": {
   "lab": "PURILUB — Laboratório de Análise de Óleo",
   "numero": "PL-26-01523",
   "sample": {
    "equipamento": "Redutor esteira TR-04",
    "ponto": "Bujão de dreno inferior",
    "lubrificante": "Óleo de engrenagens ISO VG 320",
    "dataColeta": "18/07/2026",
    "dataAnalise": "21/07/2026",
    "horasOleo": "≈ 2.100 h"
   },
   "physChem": [
    {
     "param": "Viscosidade a 40 °C",
     "result": "318 cSt",
     "ref": "320 cSt",
     "status": "ok"
    },
    {
     "param": "TAN",
     "result": "0,6 mg KOH/g",
     "ref": "0,4 mg KOH/g",
     "status": "ok"
    },
    {
     "param": "Água (Karl Fischer)",
     "result": "95 ppm",
     "ref": "< 300 ppm",
     "status": "ok"
    }
   ],
   "wearMetals": [
    {
     "param": "Fe (ferro) — tendência 3 análises",
     "result": "42 → 68 → 105 ppm",
     "ref": "< 30 ppm",
     "status": "crit"
    },
    {
     "param": "Cr (cromo) — tendência 3 análises",
     "result": "3 → 6 → 11 ppm",
     "ref": "< 3 ppm",
     "status": "crit"
    },
    {
     "param": "Cu (cobre)",
     "result": "4 ppm",
     "ref": "< 8 ppm",
     "status": "ok"
    }
   ],
   "additives": [
    {
     "param": "Zn/P (pacote EP)",
     "result": "estável nas 3 análises",
     "ref": "estável",
     "status": "ok"
    }
   ],
   "particleCount": [
    {
     "param": "Ferrografia analítica — índice de severidade (Is)",
     "result": "elevado, com predominância de partículas laminares",
     "ref": "baixo, predomínio de esferas/óxidos finos",
     "status": "crit"
    }
   ],
   "opinion": "Tendência consistente e crescente de Fe e Cr ao longo de 3 análises sucessivas, sem alteração significativa de viscosidade, TAN ou pacote de aditivos — quadro compatível com desgaste mecânico progressivo (não com degradação química do óleo). A ferrografia analítica confirmando predominância de partículas laminares reforça a hipótese de fadiga superficial em estágio avançado no engrenamento. Recomenda-se inspeção física do redutor e planejamento de reparo/substituição em prazo curto."
  },
  "photo": "assets/img/ferro_B_laminar.png",
  "photoCaption": "Ferrografia analítica da amostra: partículas predominantemente laminares — diagrama esquemático ilustrativo.",
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Fadiga superficial avançada (lascamento) no engrenamento",
    "solution": "Correto — a tendência crescente e consistente de Fe e Cr (sem qualquer sinal de degradação química do óleo) combinada com a predominância de partículas laminares na ferrografia é a assinatura clássica de fadiga superficial já em estágio avançado (spalling)."
   },
   {
    "id": "b",
    "text": "Contaminação por partículas externas (poeira/areia)",
    "solution": "Incorreto — não há elevação de silício (Si) reportada, e o padrão de partículas (laminares, não angulares/silicosas) não é o esperado para contaminação abrasiva externa."
   },
   {
    "id": "c",
    "text": "Degradação oxidativa do óleo",
    "solution": "Incorreto — TAN e viscosidade estão estáveis e dentro da referência; o padrão de degradação química não está presente neste laudo."
   },
   {
    "id": "d",
    "text": "Esgotamento do pacote de aditivos EP",
    "solution": "Incorreto — o próprio laudo indica que o pacote Zn/P permaneceu estável ao longo das 3 análises, descartando essa hipótese como causa do desgaste observado."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Compare a tendência de Fe/Cr entre as 3 análises com o resultado da ferrografia — os dois contam a mesma história sobre o TIPO de desgaste, não apenas sobre a quantidade.",
  "explanation": "A tendência crescente e consistente de Fe (42→68→105 ppm) e Cr (3→6→11 ppm), sem qualquer alteração relevante de viscosidade, TAN ou pacote de aditivos, indica que a causa é mecânica (desgaste), não química. A ferrografia confirmando predominância de partículas laminares (e não esféricas, que indicariam fadiga inicial ainda subsuperficial) mostra que o processo de fadiga já está em estágio avançado, com lascamento (spalling) ativo na superfície dos dentes.",
  "cause": "Fadiga superficial progressiva no engrenamento, provavelmente iniciada por sobrecarga cíclica ou desalinhamento, evoluindo de fadiga subsuperficial para lascamento ativo (spalling) na superfície de contato dos dentes.",
  "action": "Programar inspeção física do redutor (boroscopia ou abertura) com urgência para confirmar extensão do dano; planejar reparo ou substituição das engrenagens afetadas em prazo curto; investigar causa raiz (alinhamento, carga, ciclo de operação) para evitar recorrência após o reparo.",
  "checks": []
 },
 {
  "id": "lc13",
  "num": 13,
  "level": "intermediário",
  "relatedModule": "mlub7",
  "relatedModuleLabel": "Módulo L7 — Amostragem e Análise de Óleo",
  "title": "Grupo gerador a diesel com viscosidade em queda progressiva",
  "briefing": [
   "Motor a diesel de grupo gerador de emergência, testado semanalmente em vazio por 15 minutos e ocasionalmente sob carga em falhas de energia.",
   "As últimas 3 análises trimestrais mostram viscosidade caindo de forma consistente.",
   "Operador relata que o motor às vezes demora mais que o normal para atingir temperatura de operação nos testes semanais."
  ],
  "laudo": {
   "lab": "LUBRIN — Laboratório de Análise de Lubrificantes",
   "numero": "LB-26-03390",
   "sample": {
    "equipamento": "Motor diesel gerador GE-01",
    "ponto": "Vareta de nível / cárter",
    "lubrificante": "Óleo para motor diesel 15W-40",
    "dataColeta": "10/07/2026",
    "dataAnalise": "13/07/2026",
    "horasOleo": "≈ 180 h"
   },
   "physChem": [
    {
     "param": "Viscosidade a 100 °C — tendência 3 análises",
     "result": "14,1 → 12,8 → 10,9 cSt",
     "ref": "14,5 cSt (novo)",
     "status": "crit"
    },
    {
     "param": "Ponto de fulgor",
     "result": "178 °C",
     "ref": "> 200 °C (óleo novo)",
     "status": "crit"
    },
    {
     "param": "FTIR — combustível (diluição)",
     "result": "3,8% em volume",
     "ref": "< 2,5%",
     "status": "crit"
    },
    {
     "param": "TBN (número de basicidade total)",
     "result": "6,2 mg KOH/g",
     "ref": "9,5 mg KOH/g (novo)",
     "status": "warn"
    }
   ],
   "wearMetals": [
    {
     "param": "Fe (ferro)",
     "result": "22 ppm",
     "ref": "< 40 ppm (180h)",
     "status": "ok"
    }
   ],
   "additives": [
    {
     "param": "Ca (cálcio, detergente/dispersante)",
     "result": "1780 ppm",
     "ref": "1900 ppm",
     "status": "ok"
    }
   ],
   "particleCount": [],
   "opinion": "Queda progressiva de viscosidade nas 3 últimas análises, ponto de fulgor bem abaixo do esperado para óleo novo e FTIR confirmando diluição por combustível acima do limite de alerta — quadro típico de combustão incompleta / ciclos de operação muito curtos (partida-parada frequente sem atingir temperatura plena), consistente com o regime de testes semanais em vazio relatado. TBN em queda também merece acompanhamento, mas de forma secundária à diluição por combustível."
  },
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Diluição do óleo por combustível, provavelmente associada aos ciclos curtos de operação em vazio",
    "solution": "Correto — a queda de viscosidade, o ponto de fulgor reduzido e o FTIR confirmando 3,8% de combustível (acima do limite de 2,5%) formam um quadro conclusivo de diluição por combustível, coerente com o regime de testes semanais curtos que não permitem o motor atingir temperatura plena (favorecendo combustão incompleta)."
   },
   {
    "id": "b",
    "text": "Cisalhamento mecânico do melhorador de índice de viscosidade (VI improver)",
    "solution": "Incorreto como causa principal — embora seja uma hipótese válida para queda de viscosidade em geral, o FTIR já identifica diretamente a diluição por combustível como o mecanismo presente neste caso; o cisalhamento de VI improver não é confirmado por nenhum teste específico no laudo."
   },
   {
    "id": "c",
    "text": "Contaminação por água de resfriamento (falha de junta de cabeçote)",
    "solution": "Incorreto — não há teste de água (Karl Fischer ou crackle) reportado como elevado neste laudo; o padrão de evidências aponta para combustível, não para água."
   },
   {
    "id": "d",
    "text": "Desgaste anormal de camisas e anéis",
    "solution": "Incorreto como causa raiz — o Fe está dentro da faixa esperada para as horas de uso (22 ppm, abaixo de 40 ppm); não há evidência de desgaste anormal neste laudo."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Três resultados devem ser lidos em conjunto: viscosidade caindo, ponto de fulgor baixo e o teste que aponta diretamente a causa química (FTIR).",
  "explanation": "A queda progressiva de viscosidade (14,1→12,8→10,9 cSt) combinada com ponto de fulgor bem abaixo do esperado para óleo novo (178 vs. >200 °C) e FTIR confirmando 3,8% de combustível no óleo (acima do limite de alerta de 2,5%) são evidências convergentes de diluição por combustível. O regime de operação relatado (testes semanais curtos em vazio) favorece combustão incompleta e recondensação de combustível não queimado no cárter, mecanismo clássico de diluição em geradores de emergência testados dessa forma.",
  "cause": "Ciclos de teste semanais curtos e em vazio, que não permitem ao motor atingir temperatura plena de operação, favorecendo combustão incompleta e diluição progressiva do óleo por combustível não queimado.",
  "action": "Revisar o protocolo de teste semanal para incluir um período sob carga e tempo suficiente para atingir temperatura plena de operação; trocar o óleo diluído; monitorar viscosidade e FTIR na próxima amostra para confirmar reversão do quadro.",
  "checks": []
 },
 {
  "id": "lc14",
  "num": 14,
  "level": "básico",
  "relatedModule": "mlub8",
  "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
  "title": "Exercício visual de ferrografia — Amostra A",
  "questionLabel": "Qual mecanismo de desgaste esse diagrama de morfologia de partículas representa?",
  "briefing": [
   "Exercício de identificação visual: a imagem abaixo é um diagrama esquemático (ilustrativo, não uma foto real de microscopia) representando a morfologia típica das partículas encontradas numa análise de ferrografia.",
   "Observe a forma das partículas: alongadas e enroladas em espiral, como lascas curvas.",
   "Compare com os quatro mecanismos de desgaste estudados no Módulo L8 antes de escolher sua resposta."
  ],
  "photo": "assets/img/ferro_A_corte.png",
  "photoCaption": "Diagrama esquemático ilustrativo de morfologia de partícula (Amostra A) — não é foto real de microscopia.",
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Desgaste por corte (cutting wear) — partículas em forma de lasca/espiral, semelhantes a cavacos de usinagem",
    "solution": "Correto — partículas alongadas e enroladas em espiral, parecidas com pequenos cavacos de usinagem, são a assinatura clássica de desgaste por corte: uma aspereza dura ou partícula abrasiva atuando como uma microferramenta de corte contra a superfície mais macia."
   },
   {
    "id": "b",
    "text": "Fadiga superficial avançada (partículas laminares)",
    "solution": "Incorreto — partículas de fadiga avançada são placas finas e irregulares (como escamas), não lascas espiraladas em forma de cavaco."
   },
   {
    "id": "c",
    "text": "Fadiga subsuperficial inicial (partículas esféricas)",
    "solution": "Incorreto — partículas de fadiga inicial são pequenas esferas metálicas lisas, com forma muito diferente das lascas alongadas mostradas aqui."
   },
   {
    "id": "d",
    "text": "Corrosão (partículas de óxido)",
    "solution": "Incorreto — partículas de corrosão têm formato irregular e anguloso, cor avermelhada/amarronzada, e não a forma de lasca metálica brilhante mostrada aqui."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Pense em uma microferramenta de corte: que tipo de resíduo uma ferramenta de usinagem produz quando corta metal?",
  "explanation": "Partículas de desgaste por corte (cutting wear) têm formato característico de lasca ou cavaco, muitas vezes enrolado em espiral — resultado de uma aspereza dura, partícula abrasiva presa entre superfícies, ou desalinhamento severo atuando como uma microferramenta de corte contra a superfície oposta, mais macia. É diferente de fadiga (esférica ou laminar, dependendo do estágio) e de corrosão (irregular, avermelhada).",
  "cause": "Presença de uma aspereza dura, partícula abrasiva de terceiro corpo, ou desalinhamento severo entre superfícies, gerando corte ativo do material mais macio.",
  "action": "Investigar a origem da partícula dura/abrasiva (filtração, contaminação externa) ou o alinhamento/folga do componente; reforçar filtração se a causa for partícula de terceiro corpo; inspecionar a superfície fisicamente para confirmar a extensão do corte.",
  "checks": []
 },
 {
  "id": "lc15",
  "num": 15,
  "level": "intermediário",
  "relatedModule": "mlub8",
  "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
  "title": "Exercício visual de ferrografia — Amostra B",
  "questionLabel": "Qual mecanismo de desgaste esse diagrama de morfologia de partículas representa?",
  "briefing": [
   "Exercício de identificação visual: diagrama esquemático (ilustrativo) da morfologia de partículas de uma segunda amostra, coletada num redutor de engrenagens.",
   "Observe a forma das partículas: placas finas, planas e irregulares, com bordas angulosas.",
   "Este padrão está associado a um estágio mais avançado de um mesmo mecanismo cujo estágio inicial produz partículas esféricas."
  ],
  "photo": "assets/img/ferro_B_laminar.png",
  "photoCaption": "Diagrama esquemático ilustrativo de morfologia de partícula (Amostra B) — não é foto real de microscopia.",
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Fadiga superficial avançada (lascamento / spalling), com partículas laminares",
    "solution": "Correto — placas finas, planas e irregulares (partículas laminares) indicam que o processo de fadiga já evoluiu para lascamento ativo na superfície (spalling), um estágio mais avançado do que as partículas esféricas de fadiga subsuperficial inicial."
   },
   {
    "id": "b",
    "text": "Fadiga subsuperficial inicial (partículas esféricas)",
    "solution": "Incorreto — o estágio inicial de fadiga produz pequenas esferas metálicas, não placas finas e planas como as mostradas aqui."
   },
   {
    "id": "c",
    "text": "Desgaste por corte (cutting wear)",
    "solution": "Incorreto — partículas de corte têm formato de lasca alongada/espiralada, como um cavaco de usinagem, não placas finas e planas."
   },
   {
    "id": "d",
    "text": "Desgaste adesivo severo (scuffing/scoring)",
    "solution": "Incorreto — embora também seja um modo de desgaste severo, o scuffing tipicamente produz partículas maiores e mais irregulares, associadas a transferência de material entre superfícies, com aparência diferente das placas lisas e finas mostradas."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Pense na evolução do dano: esferas pequenas aparecem primeiro (fadiga subsuperficial); o que aparece quando o material começa a se desprender em placas da superfície?",
  "explanation": "Partículas laminares — placas finas, planas e de bordas irregulares — indicam fadiga superficial em estágio avançado, com lascamento (spalling) já ativo na superfície de rolamento ou engrenamento. É a evolução natural do processo de fadiga: inicia-se subsuperficialmente (gerando partículas esféricas na fase inicial) e, ao se propagar até a superfície, passa a liberar essas placas laminares características de dano já estabelecido.",
  "cause": "Fadiga de contato de rolamento progredindo de trincas subsuperficiais para lascamento ativo na superfície, geralmente associada a sobrecarga cíclica prolongada ou lubrificação inadequada ao longo do tempo.",
  "action": "Tratar como defeito em estágio avançado: planejar inspeção física e reparo/substituição em prazo curto, não apenas continuar o monitoramento de rotina; investigar causa raiz (carga, lubrificação, alinhamento) para evitar recorrência.",
  "checks": []
 },
 {
  "id": "lc16",
  "num": 16,
  "level": "básico",
  "relatedModule": "mlub8",
  "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
  "title": "Exercício visual de ferrografia — Amostra C",
  "questionLabel": "Qual mecanismo de desgaste esse diagrama de morfologia de partículas representa?",
  "briefing": [
   "Exercício de identificação visual: diagrama esquemático (ilustrativo) de uma terceira amostra, coletada num rolamento de um motor elétrico crítico.",
   "Observe a forma das partículas: pequenas esferas metálicas lisas e brilhantes, de tamanhos variados.",
   "Este é tipicamente o primeiro sinal ferrográfico de um processo de dano que, se não tratado, evolui para partículas laminares."
  ],
  "photo": "assets/img/ferro_C_esferica.png",
  "photoCaption": "Diagrama esquemático ilustrativo de morfologia de partícula (Amostra C) — não é foto real de microscopia.",
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Fadiga subsuperficial inicial — partículas esféricas",
    "solution": "Correto — pequenas esferas metálicas lisas são a assinatura clássica do estágio inicial de fadiga de contato de rolamento: formam-se quando uma trinca subsuperficial se propaga e, ao encontrar outra trinca ou a superfície, libera material fundido/arredondado pela pressão de contato."
   },
   {
    "id": "b",
    "text": "Fadiga superficial avançada — partículas laminares",
    "solution": "Incorreto — esse estágio mais avançado produz placas finas e irregulares, não esferas."
   },
   {
    "id": "c",
    "text": "Desgaste por corte — partículas em lasca",
    "solution": "Incorreto — partículas de corte têm formato alongado, como pequenos cavacos, bem diferente das esferas lisas mostradas."
   },
   {
    "id": "d",
    "text": "Corrosão — partículas de óxido",
    "solution": "Incorreto — partículas de óxido têm formato irregular e anguloso, tipicamente de cor avermelhada, não esferas metálicas lisas."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Pense no formato mais simples e mais \"limpo\" que uma partícula de desgaste pode ter — geometricamente, qual é essa forma?",
  "explanation": "As partículas esféricas são o sinal ferrográfico mais precoce de fadiga de contato de rolamento: originam-se de trincas subsuperficiais que se propagam paralelamente à superfície e, ao se encontrarem, liberam pequenas esferas de material sob a alta pressão de contato. É um sinal de alerta precoce, mas ainda não indica dano superficial visível — o acompanhamento é recomendado, mas geralmente sem necessidade de parada imediata.",
  "cause": "Início do processo natural de fadiga de contato de rolamento — trincas subsuperficiais formando-se sob tensão cíclica de cisalhamento, ainda em estágio inicial.",
  "action": "Aumentar a frequência de monitoramento (ferrografia e vibração) para acompanhar a evolução; não é necessário parar a máquina neste estágio, mas o acompanhamento próximo é essencial para detectar a transição para partículas laminares (estágio mais avançado).",
  "checks": []
 },
 {
  "id": "lc17",
  "num": 17,
  "level": "básico",
  "relatedModule": "mlub9",
  "relatedModuleLabel": "Módulo L9 — LIS — Identificação de Lubrificantes",
  "title": "Exercício visual — leitura de etiqueta do código LIS",
  "questionLabel": "O que a combinação de cor + forma geométrica na etiqueta LIS identifica principalmente?",
  "briefing": [
   "Exercício de identificação visual: a imagem abaixo mostra o modelo de uma etiqueta no padrão LIS (Lubricant Identification System), afixada diretamente no ponto de lubrificação de uma máquina.",
   "O sistema LIS (usado pela Noria e adotado pela Lubrin no Brasil) combina cor, forma geométrica, classificação ISO 6743 e grau de viscosidade ISO/SAE num único código visual.",
   "O objetivo do sistema é permitir a identificação correta do lubrificante independentemente da marca comercial usada."
  ],
  "photo": "assets/img/lub_13_etiqueta_lis.png",
  "photoCaption": "Modelo esquemático de etiqueta no padrão LIS — cor, forma geométrica e código alfanumérico identificam o lubrificante correto para aquele ponto.",
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "A cor indica a faixa de viscosidade de referência, e a forma geométrica indica o tipo de lubrificante/espessante",
    "solution": "Correto — no sistema LIS, a cor de fundo é associada a uma faixa de viscosidade de referência, e a forma geométrica (círculo, triângulo, quadrado, etc.) identifica o tipo de lubrificante ou de espessante de graxa — juntas, permitem identificação visual rápida e independente da marca comercial."
   },
   {
    "id": "b",
    "text": "A cor indica o fabricante do lubrificante, e a forma indica o preço do produto",
    "solution": "Incorreto — o sistema LIS é deliberadamente independente de marca/fabricante; seu objetivo é justamente evitar a dependência de rótulos comerciais específicos."
   },
   {
    "id": "c",
    "text": "A cor e a forma servem apenas como decoração, sem função técnica",
    "solution": "Incorreto — cor e forma são elementos centrais e funcionais do sistema, permitindo identificação visual rápida no ponto de lubrificação, mesmo à distância."
   },
   {
    "id": "d",
    "text": "A cor indica a data da última troca, e a forma indica o técnico responsável",
    "solution": "Incorreto — essas informações não fazem parte do código visual do sistema LIS, que se concentra na identificação técnica do lubrificante correto para aquele ponto."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Pense no principal objetivo do sistema LIS: evitar erros de aplicação do lubrificante errado, independentemente de qual marca está disponível no estoque.",
  "explanation": "O sistema LIS combina cor (associada a uma faixa de viscosidade de referência) e forma geométrica (associada ao tipo de lubrificante/espessante) para permitir identificação visual rápida e inequívoca do lubrificante correto em cada ponto de lubrificação — sem depender do nome comercial ou marca disponível no momento. Isso reduz drasticamente o risco de erro de aplicação (lubrificante errado), um dos problemas mais comuns e custosos em plantas industriais.",
  "cause": "Não aplicável — este é um exercício de leitura/interpretação de um sistema de identificação visual, não um diagnóstico de falha.",
  "action": "Ao implementar o sistema LIS numa planta, garantir que a etiqueta de cada ponto de lubrificação corresponda exatamente ao lubrificante especificado no plano de lubrificação, e treinar a equipe para reconhecer cor+forma antes de aplicar qualquer lubrificante.",
  "checks": []
 },
 {
  "id": "lc18",
  "num": 18,
  "level": "avançado",
  "relatedModule": "mlub6",
  "relatedModuleLabel": "Módulo L6 — Contaminação e Filtração",
  "title": "Turbina a vapor com aparência turva no óleo de mancais",
  "briefing": [
   "Turbina a vapor de contrapressão, sistema de óleo de mancais com reservatório de grande volume e trocador de calor água/óleo integrado.",
   "Operador reporta aparência turva/leitosa do óleo no visor de nível do reservatório desde a última parada para manutenção do trocador de calor.",
   "Vazamento no trocador de calor água/óleo é suspeita levantada pela equipe de manutenção, mas ainda não confirmada fisicamente."
  ],
  "laudo": {
   "lab": "PURILUB — Laboratório de Análise de Óleo",
   "numero": "PL-26-02207",
   "sample": {
    "equipamento": "Turbina a vapor TG-01 — mancais",
    "ponto": "Reservatório de óleo, antes do filtro",
    "lubrificante": "Óleo para turbinas ISO VG 32",
    "dataColeta": "27/07/2026",
    "dataAnalise": "29/07/2026",
    "horasOleo": "≈ 6.500 h (óleo de longa duração)"
   },
   "physChem": [
    {
     "param": "Aparência",
     "result": "Turva/leitosa",
     "ref": "Límpida e brilhante",
     "status": "crit"
    },
    {
     "param": "Água — crackle test",
     "result": "Crepitação forte e imediata",
     "ref": "Sem crepitação",
     "status": "crit"
    },
    {
     "param": "Água (Karl Fischer)",
     "result": "2.400 ppm",
     "ref": "< 300 ppm",
     "status": "crit"
    },
    {
     "param": "Viscosidade a 40 °C",
     "result": "31,5 cSt",
     "ref": "32,0 cSt",
     "status": "ok"
    },
    {
     "param": "Rigidez dielétrica (relevante p/ turbinas)",
     "result": "reduzida",
     "ref": "normal",
     "status": "warn"
    }
   ],
   "wearMetals": [
    {
     "param": "Fe (ferro)",
     "result": "7 ppm",
     "ref": "< 10 ppm",
     "status": "ok"
    }
   ],
   "additives": [
    {
     "param": "Pacote antiferrugem/antioxidante",
     "result": "dentro da faixa",
     "ref": "estável",
     "status": "ok"
    }
   ],
   "particleCount": [],
   "opinion": "Água livre em quantidade significativa (2.400 ppm, muito acima do limite de 300 ppm), confirmada pelo crackle test com crepitação forte e imediata e pela aparência turva/leitosa característica de emulsão. Não há evidência de desgaste metálico elevado, o que descarta dano mecânico já estabelecido nos mancais neste momento. A origem mais provável, dado o contexto operacional, é vazamento no trocador de calor água/óleo do sistema de mancais. Recomenda-se ação imediata de remoção de água (centrífuga ou coalescedor) e inspeção do trocador de calor."
  },
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Contaminação por água livre, provavelmente por vazamento no trocador de calor água/óleo",
    "solution": "Correto — o crackle test com crepitação forte e imediata, o Karl Fischer muito elevado (2.400 ppm) e a aparência turva/leitosa confirmam água livre em quantidade significativa; dado o contexto (trocador de calor água/óleo no mesmo sistema), essa é a origem mais provável, coerente com a suspeita já levantada pela manutenção."
   },
   {
    "id": "b",
    "text": "Degradação oxidativa do óleo com formação de verniz",
    "solution": "Incorreto — a viscosidade está estável e não há TAN elevado reportado; o padrão de evidências (crackle test, Karl Fischer, aparência) aponta diretamente para água, não para oxidação."
   },
   {
    "id": "c",
    "text": "Desgaste avançado dos mancais de filme de óleo",
    "solution": "Incorreto — o Fe está dentro da faixa normal (7 ppm), sem elevação que indicasse desgaste metálico significativo neste momento."
   },
   {
    "id": "d",
    "text": "Contaminação por partículas sólidas externas",
    "solution": "Incorreto — não há elevação de código ISO 4406 ou de silício reportada; a aparência turva descrita é característica de emulsão de água, não de partículas sólidas."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "O crackle test é um teste de campo simples e rápido — o que uma crepitação forte e imediata revela sobre a forma física da água presente no óleo?",
  "explanation": "O crackle test com crepitação forte e imediata indica água livre (não apenas dissolvida) presente em quantidade significativa. O Karl Fischer confirma numericamente (2.400 ppm, 8 vezes acima do limite de 300 ppm), e a aparência turva/leitosa é a manifestação visual clássica de emulsão água-óleo. Como o sistema tem um trocador de calor água/óleo integrado e o sintoma começou após a manutenção desse componente, o vazamento no trocador é a causa raiz mais provável — reforçando a importância de investigar essa hipótese fisicamente (teste de pressão do trocador).",
  "cause": "Provável vazamento interno no trocador de calor água/óleo do sistema de mancais, permitindo a entrada de água de resfriamento no circuito de óleo lubrificante.",
  "action": "Remover a água do óleo com urgência (centrífuga ou coalescedor — ou troca do óleo, se a contaminação for muito severa); realizar teste de pressão/estanqueidade no trocador de calor para localizar e reparar o vazamento; verificar a rigidez dielétrica antes de retornar a turbina à operação plena.",
  "checks": []
 },
 {
  "id": "lc19",
  "num": 19,
  "level": "intermediário",
  "relatedModule": "mlub8",
  "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
  "title": "Exercício visual de ferrografia — Amostra D",
  "questionLabel": "Qual mecanismo de desgaste/dano esse diagrama de morfologia de partículas representa?",
  "briefing": [
   "Exercício de identificação visual: diagrama esquemático (ilustrativo) de uma quarta amostra, coletada num redutor que ficou parado por 3 meses antes de voltar à operação.",
   "Observe a forma e a cor das partículas: contornos irregulares e angulosos, em tons de vermelho/marrom-alaranjado.",
   "A cor é a pista mais importante para identificar este mecanismo — nenhum dos outros três mecanismos estudados produz partículas dessa cor."
  ],
  "photo": "assets/img/ferro_D_oxido.png",
  "photoCaption": "Diagrama esquemático ilustrativo de morfologia de partícula (Amostra D) — não é foto real de microscopia.",
  "diagnosisOptions": [
   {
    "id": "a",
    "text": "Corrosão — partículas de óxido de ferro (ferrugem)",
    "solution": "Correto — a cor avermelhada/alaranjada característica, combinada com o formato irregular e anguloso (não metálico brilhante), é a assinatura da corrosão: óxido de ferro formado pela reação do metal com água/umidade e oxigênio, geralmente durante paradas prolongadas sem proteção adequada."
   },
   {
    "id": "b",
    "text": "Desgaste por corte (partículas em lasca metálica)",
    "solution": "Incorreto — partículas de corte são metálicas, brilhantes e alongadas/espiraladas, sem a coloração avermelhada mostrada aqui."
   },
   {
    "id": "c",
    "text": "Fadiga subsuperficial inicial (partículas esféricas)",
    "solution": "Incorreto — partículas de fadiga inicial são esferas metálicas lisas e brilhantes, com cor e formato completamente diferentes das partículas irregulares e avermelhadas mostradas."
   },
   {
    "id": "d",
    "text": "Fadiga superficial avançada (partículas laminares)",
    "solution": "Incorreto — partículas laminares são placas finas e metálicas, sem a coloração de óxido característica desta amostra."
   }
  ],
  "correctDiagnosis": "a",
  "hint": "Entre os quatro mecanismos estudados no Módulo L8, apenas um produz partículas com essa coloração avermelhada/alaranjada — pense na reação química envolvida.",
  "explanation": "A cor avermelhada/alaranjada é a característica mais diagnóstica de partículas de corrosão (óxido de ferro) — nenhum outro mecanismo de desgaste mecânico (corte, fadiga inicial ou avançada) produz essa coloração, pois todos eles geram partículas metálicas (cinza/prateadas). O contexto (parada prolongada de 3 meses) reforça o diagnóstico: superfícies metálicas desprotegidas expostas à umidade do ar durante longas paradas são um cenário clássico para o início de corrosão antes mesmo do retorno à operação.",
  "cause": "Exposição de superfícies metálicas internas à umidade do ar durante parada prolongada (3 meses) sem proteção anticorrosiva adequada (óleo com inibidor de corrosão insuficiente, ou ausência de desumidificação/preservação durante a parada).",
  "action": "Inspecionar fisicamente as superfícies internas para avaliar a extensão da corrosão; revisar o procedimento de preservação para paradas prolongadas futuras (óleo com inibidor de corrosão reforçado, desumidificação do ambiente, ou rotação periódica do eixo); acompanhar a tendência de Fe nas próximas análises para confirmar que o processo não está mais ativo.",
  "checks": []
 }
];
