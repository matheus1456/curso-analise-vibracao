const { H1, H2, H3, P, PB, Bullet, Quote, Img, simpleTable, exerciseBlock } = require("./build_docx.js");

// ============================================================
// MÓDULO 6 — CATÁLOGO DE FALHAS POR ESPECTRO (parte 1)
// ============================================================
let m6 = [];
m6.push(H1("Módulo 6 — Catálogo de Falhas por Espectro: Desbalanceamento, Desalinhamento, Folga, Eixo Empenado, Excentricidade, Ressonância e Batimento"));
m6.push(P("Este é o módulo central do curso: aqui a teoria dos módulos anteriores é aplicada à leitura de espectros reais. Cada defeito é apresentado com sua causa física, o espectro característico (exemplo ilustrativo), o comportamento de fase e as ações corretivas típicas."));

m6.push(H2("6.1 Desbalanceamento de massa"));
m6.push(P("É o defeito mais comum e mais simples de diagnosticar. Ocorre quando o centro de massa do rotor não coincide com seu centro geométrico de rotação, gerando uma força centrífuga que gira junto com o eixo."));
m6.push(...Img("01_desbalanceamento.png", 520, "Figura 6.1 — Espectro típico de desbalanceamento: pico dominante em 1X RPM, com harmônicos praticamente ausentes."));
m6.push(Bullet("Assinatura espectral: 1X RPM domina o espectro; 2X e demais harmônicos aparecem em amplitude muito menor."));
m6.push(Bullet("Fase: estável e repetível; a força gira em fase com o eixo. Em desbalanceamento de acoplamento (estático), há aproximadamente 180° de diferença de fase entre os dois lados do eixo."));
m6.push(Bullet("Comportamento com a velocidade: a força de desbalanceamento cresce com o quadrado da velocidade — triplicar a rotação multiplica a força por nove."));
m6.push(Bullet("Direção dominante: geralmente radial (horizontal e vertical), podendo gerar vibração axial elevada em rotores em balanço (overhung)."));
m6.push(Bullet("Correção: balanceamento de campo, adicionando massa de correção no(s) plano(s) apropriado(s), guiado por medições de amplitude e fase em 1X. O procedimento completo, com exemplo numérico, é apresentado no Módulo 14."));

m6.push(H3("Três subtipos de desbalanceamento — nem todos se corrigem da mesma forma"));
m6.push(...Img("18_desbal_acoplamento.png", 480, "Figura 6.1b — Desbalanceamento de acoplamento (par de forças/momento): 1X elevado tanto em radial quanto em axial."));
m6.push(Bullet("Desbalanceamento de força (estático): massa desigual concentrada, gera 1X em fase e de mesma amplitude nos dois mancais. Corrige-se com um único plano de balanceamento."));
m6.push(Bullet("Desbalanceamento de acoplamento (momento/par binário): duas massas iguais e opostas em planos diferentes do rotor; gera 1X elevado tanto na direção radial quanto na axial, com diferença de fase de aproximadamente 180° entre os dois lados do rotor. Exige correção em pelo menos dois planos."));
m6.push(...Img("19_rotor_balanco.png", 480, "Figura 6.1c — Rotor em balanço (overhung): 1X elevado tanto em axial quanto em radial, fase axial tende a ser estável e coerente."));
m6.push(Bullet("Rotor em balanço (overhung, como ventiladores em cantiléver): frequentemente combina desbalanceamento de força e de acoplamento simultaneamente, com 1X elevado em axial e radial. Cada componente deve ser corrigido — corrigir apenas um plano tende a deixar resíduo perceptível no outro."));
m6.push(H3("Exemplo numérico — separando desbalanceamento de outras causas pela lei do quadrado da velocidade"));
m6.push(P("Uma bomba apresenta 3,0 mm/s RMS em 1X a 1200 rpm. Ao aumentar a rotação para 1800 rpm (1,5× a velocidade original), a vibração em 1X sobe para 6,7 mm/s. Isso é consistente com desbalanceamento puro?"));
m6.push(Quote("Se a causa fosse puramente desbalanceamento, a amplitude deveria crescer com o quadrado da razão de velocidades:\n(1800/1200)² = 1,5² = 2,25 → amplitude esperada = 3,0 × 2,25 = 6,75 mm/s"));
m6.push(P("O valor medido (6,7 mm/s) está muito próximo do esperado (6,75 mm/s) — a hipótese de desbalanceamento é consistente com o comportamento observado. Se o valor medido tivesse sido, por exemplo, 12 mm/s (muito acima do esperado pela lei do quadrado), seria sinal de que outro fenômeno está contribuindo, como aproximação de uma frequência natural (ressonância, ver 6.6) sendo excitada pela nova velocidade."));

m6.push(H2("6.2 Desalinhamento"));
m6.push(P("O desalinhamento ocorre quando os eixos de duas máquinas acopladas não compartilham a mesma linha de centro. Existem dois tipos principais, frequentemente combinados na prática."));
m6.push(H3("Desalinhamento angular"));
m6.push(...Img("02_desalinhamento_angular.png", 520, "Figura 6.2 — Espectro típico de desalinhamento angular: 1X e 2X elevados, com forte componente axial."));
m6.push(Bullet("Assinatura espectral: alta vibração axial em 1X e 2X (2X frequentemente comparável ou maior que 1X, dependendo do tipo de acoplamento)."));
m6.push(Bullet("Fase: aproximadamente 180° fora de fase, medida axialmente através do acoplamento."));
m6.push(H3("Desalinhamento paralelo (radial)"));
m6.push(...Img("03_desalinhamento_paralelo.png", 520, "Figura 6.3 — Espectro típico de desalinhamento paralelo: 2X radial dominante, superior a 1X."));
m6.push(Bullet("Assinatura espectral: vibração radial elevada, com 2X frequentemente maior que 1X; em casos severos, aparecem harmônicos de ordem mais alta (4X–8X) similares aos de folga mecânica."));
m6.push(Bullet("Fase: próxima de 180° fora de fase, medida radialmente nos dois lados do acoplamento."));
m6.push(Bullet("Correção: realinhamento do eixo por método de relógios comparativos ou, mais comumente hoje, por alinhamento a laser."));

m6.push(H2("6.3 Folga mecânica"));
m6.push(...Img("04_folga_mecanica.png", 520, "Figura 6.4 — Espectro típico de folga mecânica: série de harmônicos inteiros e sub-harmônicos em 0,5X, 1,5X, 2,5X..."));
m6.push(P("A folga mecânica se manifesta em três padrões espectrais reconhecidos:"));
m6.push(Bullet("Tipo A — folga estrutural (pés da máquina, base, fundação frouxa ou deteriorada): diferença de fase de cerca de 180° entre medições verticais no pé da máquina e na base."));
m6.push(Bullet("Tipo B — parafusos soltos na base, trincas no pedestal ou no skid."));
m6.push(Bullet("Tipo C — ajuste impróprio entre componentes rotativos e seus assentos (folga excessiva em bucha, mancal de rolamento frouxo no eixo ou na carcaça): causa truncamento da forma de onda no tempo e é a que gera a série mais completa de harmônicos e sub-harmônicos (0,5X, 1,5X, 2,5X...). A fase costuma ser instável, variando de uma medição para outra."));
m6.push(Bullet("Correção: reaperto e verificação de pé-manco (soft foot), reparo estrutural, ajuste ou substituição de componentes com folga excessiva."));
m6.push(...Img("20_folga_A_vs_C.png", 560, "Figura 6.4b — Comparação prática: folga Tipo A (poucos harmônicos, 1X dominante) versus Tipo C (série completa de harmônicos e sub-harmônicos)."));
m6.push(P("Repare como o Tipo A produz um espectro relativamente \"limpo\" — pouco diferente, à primeira vista, de um desbalanceamento simples — enquanto o Tipo C é inconfundível pela quantidade de picos regularmente espaçados, inclusive nas posições fracionárias (0,5X, 1,5X, 2,5X...). Na prática de campo, o Tipo A costuma ser confirmado com a máquina em operação: um técnico apalpando a base ou os parafusos de fixação sente o movimento, ou usa um estroboscópio sincronizado para observar visualmente o afrouxamento a cada volta."));

m6.push(H2("6.4 Eixo empenado (bent shaft)"));
m6.push(...Img("05_eixo_empenado.png", 520, "Figura 6.5 — Espectro típico de eixo empenado: alta vibração axial em 1X (curvatura próxima do centro) ou 2X (curvatura próxima do acoplamento)."));
m6.push(Bullet("Assinatura espectral: vibração axial elevada, dominante em 1X quando a curvatura está próxima do centro do eixo, ou em 2X quando está próxima do acoplamento."));
m6.push(Bullet("Fase: diferença próxima de 180° entre medições axiais em pontos opostos ao longo do eixo."));
m6.push(Bullet("Cuidado prático: ao medir fase axial em pontos diferentes, é preciso manter a mesma orientação do transdutor, para não confundir uma inversão de montagem com uma inversão real de fase."));

m6.push(H2("6.5 Rotor excêntrico"));
m6.push(P("Ocorre quando o centro de rotação está deslocado do centro geométrico de um componente — uma polia, engrenagem, mancal ou armadura de motor. A maior vibração ocorre em 1X RPM do componente excêntrico, na direção da linha que une os centros dos dois rotores. Uma armadilha comum: tentar \"balancear\" um rotor excêntrico costuma reduzir a vibração em uma direção radial e aumentá-la na direção perpendicular — o problema não é massa mal distribuída, é geometria, e a solução correta é reparo ou substituição do componente excêntrico."));

m6.push(H2("6.6 Ressonância"));
m6.push(...Img("16_ressonancia.png", 520, "Figura 6.6 — Curva de amplificação dinâmica: amplitude cresce fortemente quando a rotação se aproxima da frequência natural (Fn) do sistema."));
m6.push(P("Ressonância ocorre quando uma frequência de excitação (por exemplo, 1X RPM, ou a frequência de passagem de pás) coincide com uma frequência natural da máquina, da fundação, da caixa de engrenagens ou até de correias de transmissão. O resultado é uma amplificação dinâmica que pode levar a falha prematura ou catastrófica."));
m6.push(Bullet("Identificação: a frequência natural não muda com a velocidade de operação — diferentemente das ordens (1X, 2X...), que se deslocam junto com a rotação. Um teste de impacto (bump test) na máquina parada revela diretamente as frequências naturais da estrutura."));
m6.push(Bullet("Fase: em ressonância, a fase varia cerca de 90°; ao cruzar a ressonância, a variação total de fase é próxima de 180°, o que torna o balanceamento extremamente difícil quando o rotor opera próximo de uma frequência natural."));
m6.push(Bullet("Correção: normalmente exige alterar a rigidez ou a massa do sistema para deslocar a frequência natural para fora da faixa de excitação, ou reduzir a excitação (por exemplo, corrigindo o desbalanceamento que a alimenta)."));

m6.push(H2("6.7 Vibração de batimento (beat)"));
m6.push(...Img("15_batimento.png", 520, "Figura 6.7 — Duas frequências muito próximas (F1 e F2); a diferença F1−F2 aparece como pulsação de amplitude no domínio do tempo."));
m6.push(P("O batimento resulta da interação entre duas fontes de frequência muito próxima entrando e saindo de sincronismo — por exemplo, dois motores próximos operando em velocidades quase idênticas. No domínio do tempo, aparece como um pico de amplitude que pulsa (\"respira\") periodicamente; no espectro de banda larga, essa pulsação pode aparecer como um único pico oscilando em amplitude, mas com resolução suficiente revela-se como dois picos muito próximos. É importante não confundir batimento com ressonância: o batimento é transitório e pouco destrutivo; a ressonância é permanente enquanto a condição de excitação persistir e pode ser altamente destrutiva."));

m6.push(...exerciseBlock("Módulo 6",
  [
    "Uma bomba apresenta espectro com pico dominante em 2X RPM na direção axial, maior que o pico em 1X. A fase axial nos dois lados do acoplamento está a aproximadamente 180°. Qual é o diagnóstico mais provável e qual ação corretiva você recomendaria?",
    "Um motor apresenta série completa de harmônicos (1X a 6X) mais sub-harmônicos em 0,5X, 1,5X e 2,5X, com fase instável entre medições sucessivas. Que tipo de defeito é esse e qual subtipo (A, B ou C) é mais consistente com a fase instável?",
    "Como você distingue, na prática, um pico de ressonância de um pico de desbalanceamento em 1X, ambos aparecendo na mesma faixa de frequência?"
  ],
  [
    "O padrão (2X axial dominante, ~180° de diferença de fase através do acoplamento) é característico de desalinhamento (angular, dado o forte componente axial). Ação recomendada: realinhamento do eixo, de preferência por método a laser, verificando também soft foot antes do alinhamento final.",
    "É um padrão de folga mecânica; a fase instável e variável de uma medição para outra é mais consistente com o Tipo C (ajuste impróprio entre componentes rotativos e seus assentos, como folga em bucha ou mancal frouxo), que tende a mudar de posição a cada partida.",
    "Fazendo a rotação variar (partida/parada) ou realizando um teste de impacto (bump test) com a máquina parada: a frequência de ressonância permanece fixa independentemente da velocidade de operação, enquanto o pico de desbalanceamento (1X) se desloca proporcionalmente à rotação. Além disso, em ressonância a fase varia cerca de 90° ao redor da frequência natural, o que dificulta um balanceamento estável."
  ]));

// ============================================================
// MÓDULO 7 — ROLAMENTOS
// ============================================================
let m7 = [];
m7.push(H1("Módulo 7 — Rolamentos: Frequências de Defeito e Técnica de Envelope"));
m7.push(P("Defeitos em rolamentos de elementos rolantes são a causa de falha mais comum em máquinas rotativas industriais e, felizmente, também uma das mais bem caracterizadas pela análise de vibração — desde que se use a técnica correta, pois o defeito de rolamento se manifesta primeiro em frequências muito mais altas do que as tratadas no Módulo 6."));

m7.push(H2("7.1 Origem física do sinal de defeito"));
m7.push(P("Quando um elemento rolante passa sobre um defeito localizado (uma pequena descontinuidade na pista interna, externa, em uma esfera/rolo ou na gaiola), ocorre um impacto de curtíssima duração. Esse impacto excita as frequências de ressonância do próprio rolamento e da estrutura ao redor — de forma análoga a uma badalada de sino: o impacto é breve, mas o \"toque\" resultante (a resposta ressonante) se prolonga por mais tempo, decaindo aos poucos. Como esses impactos se repetem periodicamente a cada passagem do elemento defeituoso, o resultado no domínio do tempo é uma modulação de amplitude: uma frequência de ressonância de alta frequência (a portadora) tendo sua amplitude modulada pela frequência de repetição do impacto (a moduladora, que é a frequência de defeito do rolamento)."));

m7.push(H2("7.2 Frequências características de defeito"));
m7.push(P("As quatro frequências de defeito são calculadas a partir da geometria do rolamento (número de elementos N, diâmetro do elemento d, diâmetro primitivo p, ângulo de contato β) e das velocidades relativas dos anéis interno e externo:"));
m7.push(simpleTable(
  ["Sigla", "Defeito", "Fórmula (Hz)"],
  [
    ["BPFO", "Pista externa (ball/roller pass frequency, outer)", "N/2 · (fri − fre) · [1 − (d/p)·cosβ]"],
    ["BPFI", "Pista interna (ball/roller pass frequency, inner)", "N/2 · (fri − fre) · [1 + (d/p)·cosβ]"],
    ["BSF", "Elemento rolante (ball spin frequency)", "(p/2d) · (fri − fre) · [1 − (d²/p²)·cos²β]"],
    ["FTF", "Gaiola (fundamental train frequency)", "1/2 · { fri·[1−(d/p)cosβ] + fre·[1+(d/p)cosβ] }"],
  ], [1400, 4600, 4000]));
m7.push(P("Na prática, o analista raramente calcula essas frequências manualmente: o software de análise as calcula a partir dos dados geométricos do rolamento (disponíveis no catálogo do fabricante) e sobrepõe marcadores no espectro. O trabalho do analista é verificar se picos reais no espectro coincidem com esses marcadores — e em que harmônico."));

m7.push(H2("7.3 Exemplo numérico: calculando BPFO e BPFI"));
m7.push(P("Um rolamento tem N = 9 esferas, diâmetro de esfera d = 12 mm, diâmetro primitivo p = 60 mm, ângulo de contato β = 0° (rolamento radial puro), montado em um eixo que gira a 1770 rpm (fre = 0, pista externa fixa; fri = 1770/60 = 29,5 Hz)."));
m7.push(Quote("BPFO = N/2 · (fri − fre) · [1 − (d/p)cosβ] = 9/2 · 29,5 · [1 − (12/60)·1] = 4,5 · 29,5 · 0,8 = 106,3 Hz\nBPFI = N/2 · (fri − fre) · [1 + (d/p)cosβ] = 4,5 · 29,5 · 1,2 = 159,3 Hz"));
m7.push(P("Convertendo para ordens de rotação (dividindo por 29,5 Hz): BPFO ≈ 3,6X RPM e BPFI ≈ 5,4X RPM — não coincidentemente, os mesmos valores do Exemplo 3 do Módulo 2 e do estudo de caso do Módulo 16. Uma regra prática útil para conferência rápida de campo: para a maioria dos rolamentos radiais comuns, BPFO ≈ 0,4 × N × RPM e BPFI ≈ 0,6 × N × RPM (aproximação, não substitui o cálculo completo quando o ângulo de contato é significativo, como em rolamentos de esferas de contato angular ou rolos cônicos)."));

m7.push(H2("7.4 Os quatro estágios de evolução da falha"));
m7.push(P("Uma das contribuições mais importantes da metodologia SKF/Preditiva para o diagnóstico de rolamentos é o reconhecimento de que o defeito evolui em quatro estágios bem definidos, cada um com uma assinatura espectral própria — o que permite estimar a urgência da intervenção, e não apenas detectar que \"há um problema\"."));

m7.push(H3("Estágio 1 — Defeito submicroscópico"));
m7.push(...Img("06_rolamento_estagio1.png", 480, "Figura 7.1 — Estágio 1: nenhum pico discreto visível; apenas leve elevação do nível de energia em frequências ultrassônicas (20–80 kHz)."));
m7.push(Bullet("Só é detectável por parâmetros de altíssima frequência: Spike Energy (gSE), HFD (High Frequency Detection) ou Shock Pulse (dB). Não aparece ainda no espectro de vibração convencional."));

m7.push(H3("Estágio 2 — Início de defeito na pista"));
m7.push(...Img("07_rolamento_estagio2.png", 480, "Figura 7.2 — Estágio 2: bandas laterais começam a se formar ao redor da frequência natural (Fn) do componente do rolamento (tipicamente 30 a 120 kCPM)."));
m7.push(Bullet("O nível de Spike Energy continua a crescer. Ainda não há picos discretos de BPFO/BPFI no espectro de velocidade convencional — é preciso técnica de envelope (ver 7.5) para antecipar o diagnóstico neste estágio."));

m7.push(H3("Estágio 3 — Defeito estabelecido"));
m7.push(...Img("08_rolamento_estagio3.png", 480, "Figura 7.3 — Estágio 3: picos discretos de BPFO (ou BPFI/BSF, conforme o elemento afetado) e seus harmônicos, cercados por bandas laterais em 1X RPM."));
m7.push(Bullet("As frequências de defeito e seus harmônicos tornam-se visíveis no espectro convencional. Quanto mais harmônicos e bandas laterais aparecem, mais avançado é o desgaste. Recomendação: planejar a substituição do rolamento."));

m7.push(H3("Estágio 4 — Falha iminente"));
m7.push(...Img("09_rolamento_estagio4.png", 480, "Figura 7.4 — Estágio 4: piso de ruído de banda larga elevado, picos discretos começam a \"desaparecer\" no ruído, e até 1X RPM é afetado."));
m7.push(Bullet("Paradoxalmente, a amplitude do ruído de alta frequência e mesmo do Spike Energy pode cair um pouco neste estágio (o defeito já não é mais uma descontinuidade discreta, e sim um dano generalizado) — mas imediatamente antes da falha, o Spike Energy costuma disparar para valores muito altos. Ação: substituição imediata / parada programada de emergência."));

m7.push(H2("7.5 Técnica de envelope (demodulação de amplitude)"));
m7.push(...Img("17_forma_onda_envelope.png", 480, "Figura 7.5 — Forma de onda no tempo: impactos periódicos do defeito modulando a resposta de alta frequência (ressonância) da estrutura."));
m7.push(P("O desafio prático dos estágios 1 e 2 é que as frequências de defeito de rolamento são relativamente baixas (da ordem da rotação do eixo) e ficam \"escondidas\" no meio de componentes de baixa frequência de maior amplitude, como desbalanceamento e desalinhamento — que se propagam sem atenuação e mascaram o defeito incipiente."));
m7.push(P("A técnica de envelope resolve isso explorando exatamente o fenômeno de modulação descrito em 7.1: filtra-se o sinal em uma banda estreita ao redor de uma frequência de ressonância de alta frequência (a portadora, normalmente identificada empiricamente ou por especificação do sensor/estrutura), e então se demodula esse sinal filtrado para extrair apenas a envoltória de amplitude — que contém, de forma isolada e amplificada, a frequência de repetição do impacto (a moduladora, ou seja, BPFO/BPFI/BSF/FTF). O espectro dessa envoltória (\"espectro de envelope\") revela o defeito de rolamento muito antes que ele seja visível no espectro de vibração convencional, sendo a ferramenta padrão da indústria para detecção precoce de defeitos em rolamentos e engrenagens."));

m7.push(...exerciseBlock("Módulo 7",
  [
    "Por que a técnica de envelope é mais sensível do que o espectro de vibração convencional para detectar um defeito incipiente de rolamento?",
    "Um espectro mostra picos em 3,5X, 7X e 10,5X RPM, cada um cercado por bandas laterais espaçadas em 1X RPM. Sabendo que o BPFO calculado para o rolamento é 3,5X RPM, em que estágio de falha a máquina provavelmente está e o que as bandas laterais em 1X sugerem?",
    "Cite os quatro estágios de evolução de falha de rolamento e o parâmetro mais indicado para detectar cada um."
  ],
  [
    "Porque ela isola a modulação de amplitude causada pelos impactos do defeito, demodulando uma banda de alta frequência (onde a relação sinal-ruído para o defeito é maior e não há interferência de componentes de baixa frequência como desbalanceamento/desalinhamento) e trazendo a frequência de repetição do impacto para um espectro limpo — revelando o defeito antes que ele seja forte o suficiente para aparecer no espectro de vibração convencional.",
    "Os picos em 1×, 2× e 3× BPFO (3,5X, 7X, 10,5X) caracterizam o Estágio 3 (defeito estabelecido) de falha na pista externa. As bandas laterais em 1X RPM ao redor desses harmônicos indicam que o defeito está sendo modulado pela rotação do próprio eixo, o que é esperado e reforça a confiança no diagnóstico — a recomendação é planejar a substituição do rolamento.",
    "Estágio 1 (submicroscópico): Spike Energy / HFD / Shock Pulse (ultrassônico, 20–80 kHz). Estágio 2 (início na pista): bandas laterais ao redor da frequência natural do componente — melhor detectado por envelope/demodulação. Estágio 3 (estabelecido): picos discretos de BPFO/BPFI/BSF/FTF e harmônicos no espectro convencional. Estágio 4 (iminente): piso de ruído elevado e contaminação de 1X RPM e seus harmônicos — Spike Energy tende a disparar imediatamente antes da falha."
  ]));

// ============================================================
// MÓDULO 8 — ENGRENAGENS
// ============================================================
let m8 = [];
m8.push(H1("Módulo 8 — Engrenagens"));
m8.push(P("O engrenamento gera, por natureza, uma frequência característica chamada frequência de engrenamento (GMF — Gear Mesh Frequency), calculada como o número de dentes da engrenagem multiplicado pela sua velocidade de rotação (que é igual ao número de dentes do pinhão multiplicado pela velocidade do pinhão, já que ambos engrenam na mesma taxa)."));

m8.push(H2("8.1 Espectro normal de um engrenamento saudável"));
m8.push(...Img("10_engrenagens.png", 520, "Figura 8.1 — Espectro típico de engrenamento com desgaste: GMF dominante, cercada por bandas laterais espaçadas em 1X RPM."));
m8.push(P("Em uma engrenagem saudável, o espectro mostra 1X e 2X de baixa amplitude, junto com a GMF — também de amplitude relativamente baixa e, idealmente, sem bandas laterais significativas nem excitação da frequência natural da engrenagem."));

m8.push(H2("8.2 Diagnósticos característicos"));
m8.push(Bullet("Desgaste de dente: aparecem bandas laterais ao redor da frequência natural da engrenagem (Fn), espaçadas na velocidade de rotação da engrenagem desgastada — muitas vezes mais reveladoras do desgaste do que a própria amplitude de GMF."));
m8.push(Bullet("Excentricidade / folga / eixos não paralelos: bandas laterais de alta amplitude e regulares ao redor de GMF; o espaçamento das bandas indica qual das duas engrenagens (pinhão ou coroa) é a fonte do problema. Se causado por folga, a amplitude de GMF tende a cair com o aumento de carga."));
m8.push(Bullet("Desalinhamento do engrenamento: excita predominantemente harmônicos de segunda ordem ou superiores de GMF (2×GMF, 3×GMF), com bandas laterais na rotação — muitas vezes com 1×GMF de baixa amplitude, o que exige aumentar o Fmax da medição para capturar ao menos o segundo harmônico."));
m8.push(Bullet("Dente trincado ou quebrado: gera alta amplitude em 1X RPM da engrenagem afetada e excita a frequência natural da engrenagem com bandas laterais na sua rotação. É mais bem confirmado na forma de onda no tempo, onde aparece um pico de impacto nítido a cada volta do eixo com o dente danificado — com amplitude no domínio do tempo frequentemente muito maior do que a de 1X no espectro."));
m8.push(...Img("22_dente_quebrado_fo.png", 500, "Figura 8.2 — Forma de onda no tempo de um dente de engrenagem quebrado: impacto nítido e repetitivo, um por volta do eixo com o dente danificado."));
m8.push(P("Exemplo numérico: se o eixo com o dente danificado gira a 600 rpm (10 Hz), o intervalo entre impactos na forma de onda deve ser de 1/10 = 0,1 s = 100 ms — exatamente o período de rotação daquele eixo. Medir esse intervalo diretamente na forma de onda (em vez de apenas observar o espectro) é a forma mais direta e inequívoca de confirmar qual dos dois eixos do par de engrenagens tem o dente danificado."));
m8.push(P("Um cuidado essencial: a amplitude de GMF é sensível à carga. Sempre que possível, a análise comparativa entre inspeções deve ser feita com a máquina na mesma condição de carga, sob pena de interpretar uma simples variação de carga como evolução de um defeito (ou vice-versa)."));

m8.push(...exerciseBlock("Módulo 8",
  [
    "Um redutor apresenta GMF com bandas laterais regulares e de alta amplitude, cujo espaçamento coincide com a rotação do pinhão. A amplitude de GMF diminui quando a carga aumenta. Qual é o diagnóstico mais provável?",
    "Por que o dente trincado é mais bem confirmado na forma de onda no tempo do que no espectro?",
    "Em que situação é necessário aumentar o Fmax da medição para diagnosticar corretamente um problema de engrenagem?"
  ],
  [
    "O espaçamento das bandas laterais aponta o pinhão como fonte da modulação, e a queda de amplitude de GMF com o aumento de carga é assinatura típica de folga no engrenamento — não de desgaste progressivo (que tende a não ter essa relação inversa com carga).",
    "Porque o impacto do dente trincado é um evento discreto e breve, que aparece de forma muito nítida na forma de onda como um pico isolado a cada volta do eixo com o dente danificado — no espectro, essa energia se distribui entre 1X e a frequência natural excitada com suas bandas laterais, tornando o sinal mais difuso e de identificação menos direta.",
    "Quando o desalinhamento do engrenamento é a suspeita, pois esse defeito costuma excitar predominantemente o segundo harmônico de GMF (2×GMF) ou superior, exigindo Fmax suficiente para capturar pelo menos essa faixa."
  ]));

// ============================================================
// MÓDULO 9 — CORREIAS
// ============================================================
let m9 = [];
m9.push(H1("Módulo 9 — Correias e Transmissões"));
m9.push(...Img("11_correias.png", 500, "Figura 9.1 — Espectro típico de problema em correia: múltiplos da frequência da correia, frequentemente com 2× dominante."));
m9.push(P("A frequência da correia é sempre menor que a rotação do motor e do equipamento acionado (é uma função da razão de diâmetros das polias e do comprimento da correia)."));
m9.push(Bullet("Correia gasta, frouxa ou desigual: gera múltiplos (tipicamente de 3 a 4 ordens) da frequência da própria correia, muitas vezes com 2× a frequência da correia como pico dominante. As amplitudes costumam ser instáveis, pulsando com a rotação do motor ou do acionado."));
m9.push(Bullet("Desalinhamento de polias: alta vibração em 1X RPM, predominantemente axial; a relação entre a amplitude no motor e no acionado depende de onde se mede e da rigidez relativa das estruturas."));
m9.push(Bullet("Polias excêntricas ou desbalanceadas: alta vibração em 1X RPM da polia, mais elevada na direção da linha das correias; tentativas de balanceamento por adição de massa podem reduzir a vibração, mas a excentricidade continuará gerando fadiga cíclica na correia."));
m9.push(Bullet("Ressonância da correia: amplitude elevada quando a frequência natural da correia coincide com a rotação do motor ou da polia acionada; pode ser diagnosticada variando a tensão da correia enquanto se mede a resposta — a frequência natural muda com a tensão e o comprimento livre da correia."));
m9.push(Bullet("Correias dentadas (síncronas): desgaste ou desalinhamento de polia aparece como alta amplitude na frequência de passagem dos dentes da correia."));
m9.push(H3("Exemplo numérico: calculando a frequência da correia"));
m9.push(P("Um motor gira a 1760 rpm (29,3 Hz) acionando, por correia, uma polia de diâmetro 200 mm montada no eixo do motor e uma polia de 500 mm no equipamento acionado, com comprimento de correia de 1400 mm. A frequência da correia é aproximada por:"));
m9.push(Quote("Fcorreia ≈ (RPM motor ÷ 60) × (π × diâmetro da polia motora) ÷ comprimento da correia\nFcorreia ≈ 29,3 × (π × 200) ÷ 1400 ≈ 29,3 × 0,449 ≈ 13,2 Hz"));
m9.push(P("Se o espectro mostrar um pico anômalo dominante em aproximadamente 26,4 Hz (2× esse valor), a hipótese mais provável — antes mesmo de abrir a caixa de correias — é correia gasta, frouxa ou desigual, já que 2× a frequência da correia é tipicamente o pico dominante nesse defeito."));

m9.push(...exerciseBlock("Módulo 9",
  [
    "Um ventilador acionado por correias em V apresenta pico dominante em 2× a frequência da correia, com amplitude instável, pulsando com a rotação do motor. O que isso indica e qual a ação recomendada?",
    "Como diferenciar, na prática, uma ressonância de correia de um desalinhamento de polias?"
  ],
  [
    "Indica correia gasta, frouxa ou desigual (defeito característico da própria correia). Ação recomendada: inspeção visual da correia, verificação de tensão e substituição se houver desgaste ou trinca visível.",
    "A ressonância de correia responde a mudanças de tensão e comprimento livre da correia (a frequência natural se desloca ao tensionar/destensionar), enquanto o desalinhamento de polias se manifesta como vibração axial em 1X RPM que não muda significativamente com a tensão da correia, mas sim com a correção do alinhamento das polias."
  ]));

// ============================================================
// MÓDULO 10 — MÁQUINAS ELÉTRICAS
// ============================================================
let m10 = [];
m10.push(H1("Módulo 10 — Máquinas Elétricas"));
m10.push(...Img("12_eletrico.png", 500, "Figura 10.1 — Espectro típico de problema no estator: pico dominante em 2× a frequência de linha (2FL = 120 Hz em sistemas de 60 Hz)."));
m10.push(P("Motores e geradores de indução podem apresentar vibração de origem puramente elétrica (eletromagnética), que desaparece assim que a alimentação elétrica é desligada — um teste de diagnóstico simples e definitivo é comparar a vibração com o motor energizado e logo após o desligamento: se o pico característico some instantaneamente, a origem é elétrica."));
m10.push(Bullet("Problema no estator (entreferro desigual): gera vibração bem definida em 2× a frequência de linha (2FL = 120 Hz em redes de 60 Hz, ou 100 Hz em redes de 50 Hz). O entreferro diferencial não deve exceder cerca de 5% em motores de indução e 10% em motores síncronos. Pé frouxo ou base isolada podem causar excentricidade do estator."));
m10.push(Bullet("Barras de rotor quebradas ou trincadas (motores de indução): geram bandas laterais ao redor de 1X RPM espaçadas na frequência de escorregamento multiplicada pelo número de polos — um padrão que deve ser buscado especificamente quando há suspeita de problema no rotor, pois pode ser sutil no espectro de banda larga convencional."));
m10.push(...Img("21_barras_rotor.png", 500, "Figura 10.2 — Barras de rotor quebradas: bandas laterais estreitas ao redor de 1X, espaçadas em 2 × frequência de polo (2·fp)."));
m10.push(H3("Exemplo numérico: frequência de polo e escorregamento"));
m10.push(P("Um motor de indução de 4 polos, 60 Hz, tem velocidade síncrona de 1800 rpm mas opera a 1764 rpm (escorregamento sob carga). Calculando a frequência de escorregamento e de polo:"));
m10.push(Quote("Escorregamento (s) = (1800 − 1764) / 1800 = 0,02 (2%)\nFrequência de escorregamento (fs) = s × f_linha = 0,02 × 60 = 1,2 Hz\nFrequência de polo (fp) = número de polos × fs = 4 × 1,2 = 4,8 Hz"));
m10.push(P("Se houver barras de rotor quebradas, espera-se ver, ao redor de 1X RPM (1764/60 = 29,4 Hz), bandas laterais espaçadas em 2×fp = 9,6 Hz — ou seja, picos adicionais em aproximadamente 19,8 Hz e 39,0 Hz. Encontrar esse padrão específico, e não apenas \"alguma banda lateral\", é o que confirma o diagnóstico de barra de rotor quebrada em vez de outra causa de modulação."));
m10.push(Bullet("Excentricidade do rotor (entreferro estático ou dinâmico desigual): gera picos em 1X RPM e em frequências relacionadas às ranhuras do rotor (frequência de passagem de ranhuras), muitas vezes cercadas por bandas laterais na frequência de linha."));

m10.push(...exerciseBlock("Módulo 10",
  [
    "Um motor de 60 Hz apresenta pico elevado exatamente em 120 Hz, que desaparece assim que o motor é desligado. Qual é o diagnóstico e qual parâmetro de projeto deve ser verificado?",
    "Por que o teste de \"desligar e observar\" é tão útil para separar causas elétricas de causas mecânicas?"
  ],
  [
    "Diagnóstico: problema no estator, tipicamente entreferro desigual entre rotor e estator (excentricidade do estator). Deve-se verificar o entreferro diferencial, que não deve exceder cerca de 5% em motores de indução.",
    "Porque vibrações de origem eletromagnética dependem da energização do motor e desaparecem no instante em que a corrente é cortada (a inércia mecânica ainda gira, mas a força de origem elétrica cessa imediatamente), enquanto vibrações de origem mecânica (desbalanceamento, desalinhamento, rolamento) persistem por alguns segundos após o desligamento, decaindo gradualmente com a rotação da máquina em roda livre."
  ]));

// ============================================================
// MÓDULO 11 — BOMBAS, VENTILADORES E COMPRESSORES
// ============================================================
let m11 = [];
m11.push(H1("Módulo 11 — Bombas, Ventiladores e Compressores"));
m11.push(H2("11.1 Frequência de passagem de pás (BPF)"));
m11.push(...Img("13_bomba_bpf.png", 520, "Figura 11.1 — Espectro típico de bomba centrífuga: BPF (nº de pás × RPM) e seu segundo harmônico."));
m11.push(P("A frequência de passagem de pás (BPF = número de pás/palhetas × RPM) é inerente ao funcionamento de bombas, ventiladores e compressores e, em amplitude moderada, não constitui um problema — é o \"ruído de fundo\" esperado da máquina. Torna-se preocupante quando sua amplitude é anormalmente alta, o que pode ocorrer por:"));
m11.push(Bullet("Folga desigual entre as pás rotativas e os difusores estacionários (deveria ser uniforme em toda a volta)."));
m11.push(Bullet("Coincidência entre BPF (ou seus harmônicos) e uma frequência natural do sistema — uma condição de ressonância que amplifica dramaticamente a vibração."));
m11.push(Bullet("Desgaste do impelidor, quebra de travas de difusores, obstrução de fluxo ou rotor descentralizado dentro da carcaça."));

m11.push(H3("Exemplo numérico: verificando coincidência de BPF com frequência natural"));
m11.push(P("Uma bomba de 5 pás gira a 3560 rpm. O BPF calculado é 5 × (3560/60) = 296,7 Hz. Um teste de impacto (bump test) na tubulação de descarga, com a bomba parada, revelou uma frequência natural estrutural em 292 Hz. A diferença entre BPF e a frequência natural é de apenas 1,6%, dentro da margem geralmente considerada de risco de ressonância (tipicamente, diferenças inferiores a 10% já merecem atenção)."));
m11.push(P("Diagnóstico: mesmo sem nenhum defeito na bomba em si, a proximidade entre BPF e a frequência natural da tubulação é suficiente para amplificar dramaticamente a vibração em BPF. A correção não está na bomba, e sim em alterar a rigidez ou o suporte da tubulação (adicionar um suporte, um contraventamento) para afastar a frequência natural de 296,7 Hz — ilustrando por que o diagnóstico de vibração muitas vezes aponta para a estrutura ao redor da máquina, não apenas para a máquina isoladamente."));

m11.push(H2("11.2 Turbulência e cavitação"));
m11.push(...Img("14_cavitacao.png", 520, "Figura 11.2 — Cavitação: ruído aleatório de banda larga, sobreposto a harmônicos de BPF."));
m11.push(Bullet("Turbulência: comum em ventiladores/sopradores, causa vibração aleatória de baixa frequência devido a variações de pressão e velocidade do ar no sistema de dutos."));
m11.push(Bullet("Cavitação: gera energia aleatória de banda larga e frequência mais alta, muitas vezes sobreposta a harmônicos de BPF; indica tipicamente pressão de sucção insuficiente (NPSH inadequado). É potencialmente destrutiva — pode erodir as palhetas do rotor — e costuma ser reconhecida no campo pelo som característico, como se \"pedras\" estivessem passando pela bomba."));

m11.push(...exerciseBlock("Módulo 11",
  [
    "Uma bomba centrífuga com 6 pás, girando a 1800 rpm, apresenta pico anômalo em 180 Hz. A que ordem/fenômeno isso corresponde e o que deve ser investigado?",
    "Como diferenciar, no espectro e pelo comportamento observado em campo, cavitação de um simples aumento de amplitude de BPF por desgaste do impelidor?"
  ],
  [
    "1800 rpm = 30 Hz de rotação; BPF = 6 × 30 Hz = 180 Hz. O pico corresponde à frequência de passagem de pás. Deve-se investigar folga entre pás e difusores, possível coincidência com frequência natural do sistema, desgaste do impelidor ou obstrução no fluxo.",
    "A cavitação se manifesta como energia aleatória de banda larga (não como um pico discreto e estreito), tipicamente sobreposta aos harmônicos de BPF, acompanhada de ruído característico de \"pedras\" na bomba e frequentemente correlacionada com baixa pressão de sucção (NPSH insuficiente). O aumento simples de BPF por desgaste do impelidor aparece como elevação de amplitude em picos discretos e estreitos (BPF e harmônicos), sem o piso de ruído aleatório característico da cavitação."
  ]));

// ============================================================
// MÓDULO 12 — FORMA DE ONDA, FASE E ÓRBITAS
// ============================================================
let m12 = [];
m12.push(H1("Módulo 12 — Forma de Onda no Tempo, Fase e Órbitas: Ferramentas de Confirmação Diagnóstica"));
m12.push(P("O espectro (FFT) é a ferramenta primária de triagem, mas um analista de nível avançado (equivalente à Categoria II da ISO 18436-2) sabe que certos defeitos só podem ser confirmados com segurança recorrendo a três ferramentas complementares."));

m12.push(H2("12.1 Forma de onda no tempo"));
m12.push(P("Enquanto o espectro mostra \"quais frequências estão presentes e com que amplitude\", a forma de onda no tempo mostra exatamente como o sinal se comporta a cada instante — essencial para identificar:"));
m12.push(Bullet("Impactos (impulsos curtos e de alta amplitude) — típicos de dente de engrenagem quebrado ou defeito severo de rolamento; o tempo entre impactos sucessivos corresponde exatamente ao período do componente com defeito (por exemplo, 1/rotação da engrenagem danificada)."));
m12.push(Bullet("Truncamento da forma de onda — sinal \"achatado\" de um lado, característico de folga mecânica tipo C."));
m12.push(Bullet("Sinais transitórios e não estacionários — partidas, paradas, variações de carga — que o espectro médio pode diluir ou mascarar."));

m12.push(H2("12.2 Análise de fase"));
m12.push(P("A fase mede a defasagem temporal entre um ponto de referência (geralmente um pulso por volta, obtido com um tacômetro óptico ou de proximidade) e o pico de vibração em uma frequência de interesse. É a ferramenta que distingue definitivamente entre hipóteses que produzem espectros parecidos:"));
m12.push(Bullet("Desbalanceamento: fase estável, repetível a cada medição, coerente entre as direções horizontal e vertical (diferença próxima de 90°, como esperado para um movimento circular/elíptico simples)."));
m12.push(Bullet("Desalinhamento: diferença de fase próxima de 180° através do acoplamento (axial para angular, radial para paralelo)."));
m12.push(Bullet("Eixo empenado: diferença de fase próxima de 180° entre pontos axiais ao longo do eixo."));
m12.push(Bullet("Folga: fase instável, variando de forma não repetível entre medições sucessivas."));
m12.push(Bullet("Ressonância: variação rápida de fase (cerca de 90° na frequência natural, 180° ao atravessá-la) — sinal de alerta de que o balanceamento nessa condição será instável."));

m12.push(H2("12.3 Órbitas"));
m12.push(P("Construída a partir de dois sensores de proximidade montados em quadratura (90° entre si) no mesmo plano do mancal, a órbita mostra o caminho real que o centro do eixo percorre dentro da folga do mancal, ciclo a ciclo. É a ferramenta mais poderosa para diagnosticar problemas típicos de máquinas com mancais de filme de óleo — como instabilidade por turbilhonamento (oil whirl) e chicoteamento de óleo (oil whip), citados no Módulo 6 no contexto de mancais de bucha —, permitindo observar diretamente a forma e a direção de precessão do movimento do eixo, informação que nem o espectro nem a forma de onda isolada conseguem transmitir com a mesma clareza."));

m12.push(...exerciseBlock("Módulo 12",
  [
    "Por que a forma de onda no tempo é mais adequada do que o espectro para confirmar um dente de engrenagem trincado?",
    "Um rotor apresenta 1X RPM elevado, com fase estável e repetível entre medições sucessivas, e diferença de fase de aproximadamente 90° entre as direções horizontal e vertical no mesmo mancal. Isso é mais consistente com desbalanceamento ou com folga? Justifique."
  ],
  [
    "Porque o impacto de um dente trincado é um evento discreto e breve no tempo; na forma de onda ele aparece como um pico isolado e nítido, com o tempo entre impactos revelando diretamente qual eixo/engrenagem está com problema. No espectro, essa mesma energia se espalha em 1X RPM, na frequência natural excitada e em suas bandas laterais, tornando o diagnóstico mais indireto.",
    "É mais consistente com desbalanceamento: a fase estável e repetível indica um fenômeno síncrono e coerente com a rotação (característica de força centrífuga girando junto ao eixo), e a diferença de aproximadamente 90° entre horizontal e vertical é o padrão esperado para o movimento circular/elíptico gerado por essa força. A folga mecânica, em contraste, produziria fase instável e não repetível entre medições."
  ]));

// ============================================================
// MÓDULO 13 — PROGRAMA DE MONITORAMENTO
// ============================================================
let m13 = [];
m13.push(H1("Módulo 13 — Programa de Monitoramento de Condição"));
m13.push(P("Um bom diagnóstico depende de dados coletados de forma consistente e comparável ao longo do tempo. Este módulo trata do planejamento do programa de monitoramento de condição, responsabilidade típica do Engenheiro de Confiabilidade."));

m13.push(H2("13.1 Padronização"));
m13.push(Bullet("Definir criteriosamente quais máquinas entram no programa, priorizando por criticidade (impacto de uma falha na produção, segurança e custo de reparo)."));
m13.push(Bullet("Padronizar pontos de medição, direções, unidades (mm/s RMS, g, µm) e parâmetros de aquisição (Fmax, resolução, janela) por classe de máquina, de forma que medições sucessivas sejam diretamente comparáveis."));
m13.push(Bullet("Registrar em uma folha de dados (ficha técnica) as informações da máquina: potência, rotação nominal, tipo de mancal, número de pás/dentes/elementos rolantes, geometria de rolamentos e engrenagens — dados indispensáveis para calcular BPFO/BPFI/BSF/FTF e GMF durante o diagnóstico."));

m13.push(H2("13.2 Rotas e periodicidade"));
m13.push(P("A frequência de coleta deve refletir a criticidade da máquina e a velocidade típica de evolução de suas falhas: máquinas críticas ou com histórico de problemas podem justificar monitoramento contínuo (online); a maioria das máquinas industriais é bem atendida por rotas periódicas manuais (mensais ou quinzenais), complementadas por medições extras sempre que um alarme é disparado ou uma condição de operação muda significativamente."));

m13.push(H2("13.3 Estabelecendo o baseline e os alarmes"));
m13.push(P("Como visto no Módulo 4, a prática recomendada é não usar apenas os limites genéricos da norma, mas construir um baseline específico da máquina após um período de operação estável, e then definir o alarme como o baseline mais uma margem (tipicamente 25% do limite superior da zona B). Isso reduz falsos alarmes em máquinas que operam naturalmente com vibração mais baixa que o limite genérico, sem perder sensibilidade a mudanças reais."));

m13.push(H2("13.4 Relatórios e comunicação"));
m13.push(P("O valor do trabalho do analista só se realiza quando o diagnóstico é comunicado de forma clara e acionável. Um bom relatório de análise de vibração deve conter: identificação da máquina e ponto de medição; data e condição operacional; classificação de severidade segundo a norma aplicável; diagnóstico da causa provável, com as evidências que o sustentam (espectro, fase, forma de onda); recomendação de ação e prazo sugerido; e, sempre que possível, o histórico/tendência que mostra a evolução do problema."));

m13.push(...exerciseBlock("Módulo 13",
  [
    "Por que dados geométricos de rolamentos e engrenagens devem ser registrados na ficha técnica da máquina antes mesmo de ocorrer qualquer problema?",
    "Cite três elementos que não podem faltar em um bom relatório de diagnóstico de vibração."
  ],
  [
    "Porque o cálculo das frequências de defeito (BPFO, BPFI, BSF, FTF) e da frequência de engrenamento (GMF) depende de dados geométricos específicos (número de elementos, diâmetros, ângulo de contato, número de dentes) que são muito mais difíceis de obter durante uma emergência de falha do que durante o cadastro planejado da máquina no programa de monitoramento.",
    "Identificação da máquina/ponto e condição operacional no momento da medição; classificação de severidade segundo a norma aplicável (ISO 10816); diagnóstico da causa provável com as evidências que o sustentam (espectro, fase, forma de onda) e a recomendação de ação com prazo sugerido."
  ]));

module.exports = { m6, m7, m8, m9, m10, m11, m12, m13 };
