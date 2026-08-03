const { H1, H2, H3, P, Bullet, Quote, Img, simpleTable, exerciseBlock } = require("./build_docx.js");

let m14 = [];
m14.push(H1("Módulo 16 — Estudos de Caso Integrados"));
m14.push(P("Para consolidar a formação, este módulo apresenta dez estudos de caso completos, no formato que o Engenheiro de Confiabilidade encontrará no dia a dia: dados da máquina, espectro observado, raciocínio diagnóstico passo a passo (do nível básico ao avançado) e a ação recomendada. Os primeiros casos revisitam diagnósticos mais diretos; os últimos exigem cruzar várias evidências (espectro, fase, forma de onda, comportamento com carga) — exatamente como ocorre na prática real."));

m14.push(H2("Caso 1 — Motor-bomba centrífuga, 3000 rpm"));
m14.push(P("Dados da máquina: motor de indução, 75 kW, altura de eixo 250 mm (Grupo 2, ISO 10816-3), acoplado por luva flexível a uma bomba centrífuga de 6 pás. Suporte rígido."));
m14.push(P("Observações de campo: vibração radial no mancal do lado acoplado de 4,2 mm/s RMS. Espectro dominado por um pico em 2X RPM (maior que 1X), com componente axial elevada. Fase axial entre motor e bomba, através do acoplamento, próxima de 180°."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("Severidade (Critério I): para Grupo 2, suporte rígido, C/D = 4,5 mm/s. Com 4,2 mm/s, a máquina está na Zona C (operação limitada) — próxima do limite C/D, exigindo ação em prazo curto."));
m14.push(Bullet("Padrão espectral (2X dominante, axial elevada) e fase (~180° através do acoplamento): consistente com desalinhamento angular (Módulo 6.2)."));
m14.push(Bullet("Diagnóstico: desalinhamento do acoplamento motor-bomba."));
m14.push(Bullet("Ação recomendada: parada programada de curto prazo para realinhamento a laser; reverificar soft foot antes do alinhamento final; medir novamente após a correção para confirmar retorno à Zona A/B."));

m14.push(H2("Caso 2 — Ventilador industrial de tiragem, acionado por correias"));
m14.push(P("Dados da máquina: ventilador centrífugo, motor de 45 kW a 1780 rpm, acionamento por 4 correias em V para um rotor de ventilador a 890 rpm."));
m14.push(P("Observações de campo: pico dominante em uma frequência não síncrona, correspondente a 2× a frequência calculada da correia, com amplitude instável ao longo da coleta (variando de forma cíclica junto com a rotação do ventilador)."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("A frequência não é múltiplo nem do motor nem do ventilador isoladamente, mas corresponde a 2× a frequência de correia — assinatura típica de correia gasta, frouxa ou desigual (Módulo 9)."));
m14.push(Bullet("A instabilidade da amplitude, pulsando com a rotação do acionado, reforça o diagnóstico (e descarta desbalanceamento puro, que produziria amplitude estável em 1X)."));
m14.push(Bullet("Ação recomendada: inspeção visual das correias (desgaste, trincas, diferença de comprimento entre o jogo de correias), verificação e ajuste de tensão, substituição do jogo completo de correias (nunca substituir apenas uma correia isoladamente em um conjunto multi-correias)."));

m14.push(H2("Caso 3 — Redutor de engrenagens de uma esteira transportadora"));
m14.push(P("Dados da máquina: redutor de engrenagens retas, pinhão de 22 dentes a 1200 rpm (20 Hz), engrenagem de 88 dentes na saída (300 rpm, 5 Hz). GMF calculada = 22 × 20 Hz = 440 Hz."));
m14.push(P("Observações de campo: pico dominante em 440 Hz (GMF), cercado por bandas laterais espaçadas exatamente em 20 Hz (rotação do pinhão). Amplitude da GMF cai quando a carga da esteira aumenta."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("Bandas laterais espaçadas na rotação do pinhão apontam o pinhão (não a coroa) como fonte da modulação (Módulo 8.2)."));
m14.push(Bullet("A queda de amplitude de GMF com o aumento de carga é assinatura característica de folga no engrenamento (não de desgaste progressivo, que tende a não ter essa relação inversa)."));
m14.push(Bullet("Diagnóstico: folga excessiva associada ao pinhão (possivelmente desgaste do rasgo de chaveta, folga axial ou radial no mancal do pinhão)."));
m14.push(Bullet("Ação recomendada: inspeção interna do redutor na próxima parada programada, com atenção especial ao pinhão e seus mancais; não é uma emergência (sem excitação de frequência natural nem harmônicos altos de GMF), mas deve ser monitorada com maior frequência até a intervenção."));

m14.push(H2("Caso 4 — Motor elétrico com suspeita de defeito de rolamento"));
m14.push(P("Dados da máquina: motor de indução, 30 kW, 1780 rpm (29,7 Hz), rolamento no lado não acionado com BPFO calculado de 107 Hz (3,6× RPM)."));
m14.push(P("Observações de campo: espectro de velocidade convencional aparentemente normal (1X dominante, baixa amplitude, sem picos discretos em 107 Hz). Espectro de envelope, no entanto, mostra picos claros em 107 Hz, 214 Hz e 321 Hz (1×, 2× e 3× BPFO), cada um com pequenas bandas laterais em 29,7 Hz."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("O espectro de vibração convencional não mostra o defeito — mas o espectro de envelope revela exatamente o padrão esperado de defeito na pista externa (Módulo 7.3–7.4)."));
m14.push(Bullet("A presença de três harmônicos de BPFO com bandas laterais em 1X RPM indica Estágio 3 (defeito estabelecido), ainda que o espectro convencional pareça \"limpo\" — isso ilustra por que depender apenas do espectro de velocidade em banda larga pode atrasar a detecção."));
m14.push(Bullet("Ação recomendada: planejar a substituição do rolamento na próxima janela de manutenção disponível, sem necessidade de parada de emergência (o defeito ainda não afetou 1X RPM nem elevou o piso de ruído — Estágio 4 ainda não foi atingido), mas com acompanhamento mais frequente do espectro de envelope até a intervenção."));

m14.push(H2("Caso 5 — Turbogerador a vapor, avaliação por norma (nível básico)"));
m14.push(P("Dados da máquina: turbogerador a vapor, 3000 rpm, avaliado pela ISO 10816-2 (Módulo 4.3)."));
m14.push(P("Observações de campo: vibração RMS de 6,8 mm/s no mancal dianteiro, estável ao longo de três meses de monitoramento."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("Limites ISO 10816-2 a 3000/3600 rpm: A/B = 3,8; B/C = 7,5; C/D = 11,8 mm/s."));
m14.push(Bullet("Com 6,8 mm/s, a máquina está na Zona B (operação de longo prazo aceitável), próxima do limite superior."));
m14.push(Bullet("Ação recomendada: nenhuma intervenção corretiva imediata; estabelecer baseline em 6,8 mm/s e configurar alarme em baseline + 25% do limite B/C = 6,8 + 0,25×7,5 ≈ 8,7 mm/s, monitorando a tendência (Critério II, Módulo 4.1) para detectar qualquer mudança futura."));

m14.push(H2("Caso 6 — Ventilador industrial com ressonância estrutural (nível intermediário)"));
m14.push(P("Dados da máquina: ventilador centrífugo, 8 pás, 1180 rpm, montado sobre base metálica elevada."));
m14.push(P("Observações de campo: BPF calculado = 8 × (1180/60) = 157,3 Hz. Vibração de 9,5 mm/s nessa frequência — muito acima do esperado para BPF em condição normal. Um teste de impacto na base, com o ventilador parado, revelou frequência natural de 156 Hz."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("BPF (157,3 Hz) e frequência natural da base (156 Hz) praticamente coincidem — diferença de menos de 1% (Módulo 11, exemplo numérico 11.1)."));
m14.push(Bullet("Diagnóstico: ressonância estrutural da base, amplificando o BPF normal do ventilador a níveis de severidade."));
m14.push(Bullet("Ação recomendada: reforçar estruturalmente a base (aumentar rigidez) ou adicionar massa para deslocar a frequência natural para fora da faixa de excitação; alternativamente, avaliar viabilidade de pequena alteração de rotação, se o processo permitir, para afastar o BPF da ressonância."));

m14.push(H2("Caso 7 — Compressor alternativo com folga em mancal (nível intermediário)"));
m14.push(P("Dados da máquina: motor-compressor acoplado, 900 rpm, suspeita de folga em mancal do motor."));
m14.push(P("Observações de campo: espectro com série completa de harmônicos (1X a 7X) e sub-harmônicos em 0,5X, 1,5X e 2,5X. Fase instável, variando a cada nova partida da máquina. Forma de onda no tempo mostra truncamento evidente de um lado do sinal."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("Série completa de harmônicos e sub-harmônicos, combinada com fase instável e truncamento na forma de onda: assinatura clássica de folga mecânica Tipo C (Módulo 6.3, Figura 6.4b)."));
m14.push(Bullet("Diagnóstico: folga excessiva no ajuste entre o mancal e seu alojamento, ou entre o mancal e o eixo."));
m14.push(Bullet("Ação recomendada: inspeção interna do mancal na próxima parada, medição da folga real com micrômetro/relógio comparativo contra a folga de projeto, e substituição do componente com desgaste excessivo."));

m14.push(H2("Caso 8 — Motor de indução com barras de rotor quebradas (nível avançado)"));
m14.push(P("Dados da máquina: motor de indução de 4 polos, 60 Hz, 220 kW, operando a 1764 rpm sob carga nominal."));
m14.push(P("Observações de campo: espectro de banda larga aparentemente normal à primeira vista. Uma análise de banda estreita ao redor de 1X (29,4 Hz) revelou bandas laterais simétricas em aproximadamente 19,8 Hz e 39,0 Hz."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("Escorregamento: s = (1800−1764)/1800 = 0,02; frequência de escorregamento fs = 0,02×60 = 1,2 Hz; frequência de polo fp = 4×1,2 = 4,8 Hz; espaçamento esperado das bandas = 2×fp = 9,6 Hz (Módulo 10, exemplo numérico)."));
m14.push(Bullet("29,4 − 9,6 = 19,8 Hz e 29,4 + 9,6 = 39,0 Hz — coincide exatamente com as bandas observadas."));
m14.push(Bullet("Diagnóstico: barras de rotor quebradas ou trincadas."));
m14.push(Bullet("Ação recomendada: confirmar com análise de corrente do motor (MCSA — Motor Current Signature Analysis, técnica complementar à vibração) e planejar remoção do rotor para inspeção e reparo/rebobinamento na próxima parada programada — o defeito tende a evoluir e pode levar a falha catastrófica do rotor se ignorado."));

m14.push(H2("Caso 9 — Bomba com cavitação por baixa pressão de sucção (nível intermediário)"));
m14.push(P("Dados da máquina: bomba centrífuga alimentando um sistema com nível de reservatório de sucção variável."));
m14.push(P("Observações de campo: ruído audível de \"pedregulhos\" na sucção da bomba. Espectro mostra elevação de ruído aleatório de banda larga, sobreposto aos harmônicos de BPF, que aumenta e diminui ao longo do dia acompanhando o nível do reservatório."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("Ruído de banda larga aleatório sobreposto a BPF, com correlação direta com o nível de sucção (e portanto com o NPSH disponível): assinatura clássica de cavitação (Módulo 11.2), não de um defeito mecânico fixo como desgaste de impelidor."));
m14.push(Bullet("Ação recomendada: investigar a causa raiz do NPSH insuficiente (nível de reservatório baixo, perda de carga excessiva na tubulação de sucção, filtro obstruído) em vez de intervir na bomba diretamente; a cavitação prolongada pode erodir as palhetas do rotor, tornando a correção da causa raiz uma prioridade antes de dano permanente."));

m14.push(H2("Caso 10 — Redutor com dente de engrenagem trincado (nível avançado)"));
m14.push(P("Dados da máquina: redutor de esteira, eixo de saída a 300 rpm (5 Hz)."));
m14.push(P("Observações de campo: espectro mostra amplitude elevada em 1X do eixo de saída e excitação da frequência natural da engrenagem, com bandas laterais na rotação do eixo de saída. Na forma de onda no tempo, um pico de impacto nítido se repete a cada 200 ms."));
m14.push(H3("Raciocínio"));
m14.push(Bullet("Período de rotação do eixo de saída: 1/5 Hz = 200 ms — coincide exatamente com o intervalo entre impactos observado na forma de onda (Módulo 8.2, exemplo numérico)."));
m14.push(Bullet("Diagnóstico: dente trincado ou quebrado na engrenagem do eixo de saída (e não no eixo de entrada, cujo período seria diferente)."));
m14.push(Bullet("Ação recomendada: reduzir carga/rotação se operacionalmente possível até a próxima parada, e programar abertura do redutor para inspeção boroscópica ou substituição do conjunto de engrenagens — o risco de propagação da trinca e falha catastrófica do dente aumenta com o tempo de operação continuada."));

m14.push(...exerciseBlock("Módulo 16 (síntese do curso)",
  [
    "No Caso 1, por que a fase (e não apenas a amplitude do espectro) foi decisiva para diferenciar desalinhamento de desbalanceamento?",
    "No Caso 3, explique por que a amplitude de GMF, isoladamente, seria uma métrica enganosa para acompanhar a evolução desse defeito ao longo do tempo.",
    "No Caso 4, por que confiar apenas no espectro de velocidade em banda larga poderia atrasar a decisão de trocar o rolamento, e qual foi a técnica que antecipou o diagnóstico?"
  ],
  [
    "Porque tanto o desalinhamento quanto certas formas de desbalanceamento podem gerar picos em 1X e 2X; a diferença de fase próxima de 180° através do acoplamento, medida axialmente, é a evidência que discrimina desalinhamento (Módulo 6.2/12.2) de outras hipóteses com espectro superficialmente parecido.",
    "Porque, sendo um problema de folga, a amplitude de GMF diminui com o aumento de carga (o jogo se \"absorve\" quando as superfícies são pressionadas uma contra a outra sob carga) — comparar leituras tomadas em condições de carga diferentes levaria a concluir, erroneamente, que o defeito está melhorando, quando na verdade não há relação causal com o tempo, apenas com a carga instantânea.",
    "Porque no Estágio 3 os picos de defeito já existem fisicamente, mas ainda podem ter amplitude relativamente baixa no espectro de velocidade em banda larga, especialmente se mascarados por outras fontes de vibração de baixa frequência — esperar que o defeito \"apareça\" nesse espectro pode significar aguardar até o Estágio 4 (falha iminente). A técnica de envelope (demodulação de amplitude em torno de uma frequência de ressonância) antecipou o diagnóstico ao isolar a modulação causada pelos impactos do defeito."
  ]));

m14.push(...exerciseBlock("Casos 5 a 10 (aprofundamento)",
  [
    "No Caso 6, por que a solução não foi \"balancear o ventilador\" ou \"trocar o rolamento\", mesmo com vibração severa em BPF?",
    "No Caso 8, por que a análise de banda estreita ao redor de 1X foi necessária, já que o espectro de banda larga parecia normal?",
    "No Caso 9, por que intervir mecanicamente na bomba (por exemplo, trocar o impelidor) seria uma ação corretiva equivocada?",
    "Compare os Casos 3 e 10: ambos envolvem engrenagens e ambos usam o espaçamento/período de um sinal para identificar qual eixo tem o problema. Qual é a diferença fundamental entre os dois diagnósticos?"
  ],
  [
    "Porque o diagnóstico (coincidência entre BPF e a frequência natural da base — ressonância estrutural) aponta a causa raiz na estrutura de suporte, não em um defeito interno do ventilador. Balancear ou trocar rolamento não mudaria a proximidade entre a frequência de excitação (BPF) e a frequência natural, e a vibração severa retornaria.",
    "Porque, no Estágio inicial de um problema de barras de rotor, as bandas laterais são estreitas e de baixa amplitude, facilmente \"escondidas\" dentro do lóbulo principal do pico de 1X quando a resolução do espectro de banda larga é insuficiente (Módulo 5.4) — apenas uma análise de banda estreita, com resolução fina ao redor de 1X, consegue separar essas bandas e confirmar o diagnóstico.",
    "Porque a causa raiz identificada foi hidráulica (NPSH insuficiente por baixa pressão de sucção), não um defeito geométrico ou de desgaste do impelidor. Trocar o impelidor não eliminaria a cavitação, que voltaria a ocorrer assim que a condição de sucção insuficiente se repetisse — o impelidor só deveria ser trocado se a inspeção revelasse erosão real causada pela cavitação já ocorrida.",
    "No Caso 3, o raciocínio usa o espaçamento das bandas laterais no espectro (frequência) para identificar o pinhão como fonte de modulação por folga — um defeito distribuído e dependente de carga. No Caso 10, o raciocínio usa o período entre impactos na forma de onda no tempo (não no espectro) para identificar o eixo de saída como portador de um dente trincado — um defeito discreto e localizado, mais bem revelado no domínio do tempo do que no domínio da frequência (Módulo 12.1)."
  ]));

// ============================================================
// MÓDULO 17 — GLOSSÁRIO TÉCNICO
// ============================================================
let m17 = [];
m17.push(H1("Módulo 17 — Glossário Técnico"));
m17.push(P("Referência rápida dos principais termos usados ao longo do curso, para consulta durante a prática profissional."));
m17.push(simpleTable(
  ["Termo", "Definição"],
  [
    ["Aliasing", "Distorção do espectro causada por taxa de amostragem insuficiente em relação à frequência máxima do sinal real; produz picos falsos em frequências incorretas."],
    ["ALARME", "Nível de vibração pré-definido que, quando atingido, indica necessidade de investigação, mas não exige parada imediata da máquina."],
    ["Baseline", "Valor de referência de vibração estabelecido em condição normal e estável de operação de uma máquina específica."],
    ["BPFO / BPFI", "Frequências de defeito de rolamento na pista externa e interna, respectivamente (ball/roller pass frequency, outer/inner)."],
    ["BSF", "Frequência de defeito no elemento rolante (ball spin frequency)."],
    ["Envelope (demodulação)", "Técnica de processamento de sinal que extrai a envoltória de amplitude de uma banda de alta frequência, revelando frequências de impacto de baixa frequência (defeitos de rolamento/engrenagem) antes que apareçam no espectro convencional."],
    ["Fase", "Defasagem temporal entre um evento de referência (1 pulso por volta) e o pico de vibração em uma dada frequência, expressa em graus."],
    ["Fmax", "Frequência máxima analisada em um espectro."],
    ["FTF", "Frequência fundamental da gaiola do rolamento (fundamental train frequency)."],
    ["GMF", "Frequência de engrenamento (gear mesh frequency) = número de dentes × rotação do respectivo eixo."],
    ["Harmônico", "Componente de frequência em múltiplo inteiro de uma frequência fundamental (2X, 3X...)."],
    ["Janelamento (windowing)", "Aplicação de uma função matemática ao sinal antes da FFT, para reduzir o vazamento espectral (leakage)."],
    ["Leakage (vazamento espectral)", "Distorção espectral causada quando o sinal capturado não completa um número inteiro de ciclos dentro da janela de aquisição."],
    ["Ordem (xRPM)", "Frequência expressa como múltiplo da rotação do eixo (1X, 2X, 0,5X...), independente da velocidade absoluta da máquina."],
    ["Órbita", "Trajetória do centro do eixo dentro da folga do mancal, construída a partir de dois sensores de proximidade em quadratura."],
    ["Ressonância", "Amplificação dinâmica da vibração quando uma frequência de excitação coincide com uma frequência natural do sistema."],
    ["RMS (valor eficaz)", "Medida de amplitude que pondera a energia do sinal ao longo do tempo; para uma senoide pura, RMS = pico ÷ √2."],
    ["Severidade de vibração", "Classificação do nível de vibração de uma máquina segundo zonas (A a D) definidas por norma, geralmente a família ISO 10816."],
    ["Spike Energy (gSE)", "Parâmetro de altíssima frequência usado para detectar estágios iniciais de defeito em rolamentos, antes do aparecimento de picos discretos no espectro."],
    ["TRIP", "Nível de vibração que, se ultrapassado, exige parada imediata da máquina para evitar dano."],
    ["Vazio/entreferro (air gap)", "Espaço entre rotor e estator em máquinas elétricas; desigualdade excessiva gera vibração em 2× a frequência de linha."],
    ["Zona A/B/C/D", "As quatro faixas de severidade de vibração definidas pela família ISO 10816 (A = excelente; D = risco de dano)."],
  ], [2600, 6900]));

module.exports = { m14, m17 };
