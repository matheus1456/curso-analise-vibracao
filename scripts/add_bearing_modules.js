// Script para inserir os 3 novos módulos de Análise de Falhas em Rolamentos (SKF)
// no data/content.js do projeto, entre m18 (Galeria de Falhas) e m17 (Glossário),
// seguindo o mesmo padrão usado para inserir m18 anteriormente.
//
// v2: inclui fotos reais extraídas dos dois PDFs da SKF (correlacionadas com o texto),
// conteúdo expandido (fórmula de vida nominal, tabela de descoloração térmica,
// tabelas de referência rápida ISO 15243, estudos de caso em prosa completa,
// menção a investigações destrutivas de laboratório).
const fs = require("fs");
const PROJ = "/tmp/project/curso-vibracao";
const CONTENT_PATH = PROJ + "/data/content.js";

const p = (text) => ({ type: "p", text });
const h2 = (text) => ({ type: "h2", text });
const h3 = (text) => ({ type: "h3", text });
const bullet = (text) => ({ type: "bullet", text });
const quote = (text) => ({ type: "quote", text });
const image = (src, caption) => ({ type: "image", src: "assets/img/" + src, caption });
const table = (header, rows) => ({ type: "table", header, rows });

// ============================================================
// MÓDULO 19 — Causas, vida útil e zonas de carga
// ============================================================
const m19 = {
  id: "m19",
  title: "Módulo 19 — Falhas em Rolamentos I: Causas, Vida Útil e Zonas de Carga",
  body: [
    p("Este módulo abre uma sequência de três aulas dedicadas exclusivamente à análise de falhas físicas em rolamentos, com base em dois materiais técnicos da SKF: o treinamento \"Bearing Failure Analysis\" e a publicação \"Bearing Damage and Failure Analysis\". Enquanto os Módulos 7 e 18 tratam de como o defeito aparece no espectro de vibração, esta sequência foca no lado complementar: como examinar o rolamento fisicamente (ou uma peça já removida) para confirmar a causa raiz, usando a mesma lógica de perícia que um analista de falhas profissional aplicaria — sempre com fotos reais de rolamentos danificados ao lado da explicação, para que o padrão visual fique gravado."),
    h2("19.1 A maioria dos rolamentos não falha — mas alguns falham antes da hora"),
    p("A vida calculada de um rolamento (vida nominal SKF) parte de quatro premissas: lubrificação adequada e sempre disponível, montagem sem danos, dimensões corretas do eixo e do mancal, e ausência de defeitos inerentes ao material. Mesmo quando essas quatro condições são atendidas, o rolamento eventualmente falha por fadiga do material — é um processo natural e esperado no longo prazo. O problema real da manutenção é a falha prematura, muito antes da vida calculada."),
    quote("Vida nominal SKF:  L_nm = a1 · a_SKF · (C / P)^p\n\nL_nm = vida nominal SKF (a 100 − n1 % de confiabilidade), em milhões de revoluções\na1 = fator de ajuste de vida para confiabilidade\na_SKF = fator de modificação de vida SKF (considera lubrificação, contaminação e limite de fadiga do material)\nC = capacidade de carga dinâmica básica [kN]\nP = carga dinâmica equivalente do rolamento [kN]\np = expoente da equação de vida (3 para rolamentos de esferas; 10/3 para rolamentos de rolos)"),
    p("Esse cálculo não considera apenas a carga: ele também incorpora confiabilidade, condições de lubrificação, contaminação e o limite de fadiga do material — por isso dois rolamentos idênticos, na mesma aplicação, podem ter vidas calculadas bem diferentes conforme a limpeza do lubrificante e a precisão da montagem. Estatisticamente, a grande maioria dos rolamentos (cerca de 90%) sobrevive à própria máquina em que foram instalados. Uma parcela (cerca de 9,5%) é substituída de forma preventiva, por segurança, antes de qualquer sinal de dano. Apenas uma fração pequena (por volta de 0,5%) chega a falhar ou é substituída por dano real — e é justamente essa fração que consome a maior parte do tempo de um analista de vibração e de confiabilidade."),
    bullet("Cerca de um terço das falhas está ligado a problemas de lubrificação (lubrificante errado, quantidade errada, intervalo de relubrificação errado)."),
    bullet("Cerca de um terço está ligado à contaminação (vedação ineficaz, sujeira interna, práticas de manutenção deficientes)."),
    bullet("Cerca de um quarto está ligado à aplicação e à montagem (carga excessiva, montagem incorreta)."),
    bullet("O restante se divide entre diversas outras causas — desde defeitos de fabricação até manuseio e transporte inadequados."),
    p("Além dessas categorias amplas, a experiência de campo da SKF aponta causas específicas recorrentes: assentos defeituosos no eixo ou no mancal, desalinhamento, prática de montagem incorreta, ajustes incorretos entre eixo/mancal e rolamento, lubrificação inadequada, vedação ineficaz, vibração com a máquina parada, passagem de corrente elétrica pelo rolamento, e danos de transporte, armazenamento e manuseio. A qualidade do rolamento, a adequação da aplicação, a técnica de montagem, a lubrificação correta, a solução de vedação e o armazenamento adequado (sistema \"primeiro que entra, primeiro que sai\", especialmente importante para rolamentos com vedação de fábrica, cuja graxa tem prazo de validade) são os seis fatores que, juntos, determinam se a vida real vai se aproximar da vida calculada. Praticamente todo o restante deste módulo detalha como cada causa deixa uma marca característica e reconhecível no rolamento — e por isso cada seção a seguir vem acompanhada de uma foto real de rolamento danificado."),
    h2("19.2 Zonas de carga e padrões de pista: a impressão digital do rolamento"),
    p("Um rolamento novo tem superfícies de pista com acabamento espelhado e dimensões controladas a frações de mícron — as áreas retificadas (pistas dos anéis, elementos rolantes) são bem brilhantes, enquanto áreas não retificadas (chanfros, encostos) podem ter coloração desigual por causa do tratamento térmico. Depois de operar por algum tempo, mesmo em condições normais, surge um padrão de desgaste sutil na pista — chamado de padrão de pista (path pattern). Esse padrão não é, por si só, um defeito: é a impressão da distribuição de carga dentro do rolamento, e examiná-lo é o primeiro passo de qualquer perícia, exatamente como examinar pegadas numa cena."),
    image("35_foto_pista_normal.jpg", "Foto 19.1 — Pista de rolamento com padrão de desgaste normal: faixa central uniforme, bordas nítidas, sem lascamento nem descoloração. É a referência visual de \"o que é saudável\" antes de comparar com os padrões anormais a seguir. (SKF — Bearing Damage and Failure Analysis)"),
    image("26_zonas_carga_normais.png", "Figura 19.1 — Zona de carga normal (~150° de arco): ela sempre se fixa no anel ESTACIONÁRIO, seja o interno ou o externo, e acompanha toda a circunferência do anel GIRANTE com largura uniforme."),
    p("Quando a carga radial é constante e unidirecional, o anel que gira (interno ou externo, dependendo da máquina) desenvolve um padrão de pista uniforme ao redor de toda a circunferência, porque cada ponto da pista passa pela zona de carga a cada volta. Já o anel estacionário concentra o padrão numa faixa fixa, com largura máxima na direção da carga e afunilando nas bordas — tipicamente por um arco de 150°, considerando a folga radial normal de operação. Sob carga axial pura, o padrão desloca-se lateralmente na pista (a elipse de contato migra em direção à borda do sulco, um fenômeno chamado truncamento da elipse quando a carga axial é excessiva ou há desalinhamento, gerando concentração de tensão prejudicial à vida à fadiga); sob carga combinada (radial + axial) e em rolamentos de duas carreiras, cada carreira pode receber uma fração diferente da carga axial, a ponto de uma carreira ficar completamente descarregada."),
    h3("19.2.1 Quando o padrão de pista denuncia um problema"),
    image("27_zonas_carga_anormais.png", "Figura 19.2 — Padrões de pista \"desenrolados\" (a pista imaginada em linha reta, mostrando toda a volta de 360°): cada condição anormal de operação deixa uma marca característica diferente da faixa normal."),
    p("Desvios do padrão normal apontam quase diretamente para a causa: um desalinhamento faz a faixa de contato migrar de um lado da pista para o outro ao longo da circunferência, alargando-se para até 360°; um mancal ovalizado (por um mancal bipartido mal ajustado, uma base não plana, ou um alojamento fora de círculo) produz duas zonas de carga diametralmente opostas em vez de uma só; e um ajuste excessivamente justo entre eixo/mancal e rolamento — ou uma diferença de temperatura grande entre eixo e mancal — pré-carrega o rolamento internamente, alargando a faixa de contato sem deslocá-la de posição."),
    table(
      ["Padrão observado na pista", "Causa mais provável", "O que verificar"],
      [
        ["Faixa larga que migra de um lado ao outro (150° a 360°)", "Desalinhamento entre eixo e mancal", "Perpendicularidade dos encostos, empenamento do eixo, alinhamento geral da máquina"],
        ["Duas zonas de carga opostas, bem definidas", "Mancal ovalizado ou fora de círculo", "Planicidade da base, ajuste das duas metades do mancal bipartido, erro de usinagem do alojamento"],
        ["Faixa centrada, porém mais larga que o esperado", "Pré-carga (ajuste justo demais ou diferença térmica eixo/mancal)", "Interferência de ajuste, diferença de temperatura em operação, folga interna especificada"],
        ["Padrão que muda de posição a cada partida", "Desbalanceamento ou carga excêntrica girando em fase com um dos anéis", "Balanceamento do rotor, excentricidade de montagem"],
      ]
    ),
    h2("19.3 Inspeção e monitoramento: detectar o problema cedo"),
    p("A SKF descreve o avanço de um dano típico de rolamento em seis estágios, do início imperceptível até a falha catastrófica — e cada tecnologia de monitoramento só consegue enxergar o problema a partir de um certo estágio. Quanto mais cedo a tecnologia detecta, maior o tempo de pré-aviso disponível para planejar a intervenção."),
    bullet("Estágio 1 — desgaste abrasivo incipiente: nenhuma tecnologia de campo detecta ainda."),
    bullet("Estágio 2 — primeiro lascamento (spall), detectável apenas por envelope de aceleração (a tecnologia com maior tempo de pré-aviso)."),
    bullet("Estágio 3 — lascamento evoluído o suficiente para ser detectado por monitoramento de vibração padrão (velocidade/aceleração)."),
    bullet("Estágio 4 — lascamento avançado: vibração e ruído altos, temperatura de operação sobe."),
    bullet("Estágio 5 — dano severo: fratura por fadiga do anel interno."),
    bullet("Estágio 6 — falha catastrófica, com dano secundário a outros componentes da máquina."),
    p("Por isso a técnica de envelope de aceleração (já apresentada no Módulo 7) é tão valorizada: ela antecipa a detecção em relação à vibração convencional, e ambas antecipam em relação a \"ouvir e sentir\" a máquina — método de inspeção humana que só percebe o problema quando o dano já está avançado. Complementarmente, a inspeção física durante uma parada programada segue um roteiro específico: remover a graxa ao redor do rolamento com um raspador não metálico, limpar com solvente à base de petróleo enquanto gira o eixo lentamente, inspecionar pistas/gaiola/elementos rolantes em busca de lascamentos, marcas, riscos, descoloração e áreas espelhadas, medir a folga radial interna para verificar se ainda está dentro da especificação, e — se tudo estiver satisfatório — relubrificar e fechar; se houver dano evidente, desmontar e proteger contra corrosão antes de uma análise completa. Vale também inspecionar as contrafaces de vedação (superfície onde o lábio de vedação desliza): se estiverem desgastadas ou corroídas, a vedação perde eficácia mesmo com o rolamento em bom estado."),
    p("Softwares de apoio, como o SKF Bearing Analysis Reporting Tool (BART) — uma ferramenta web na nuvem com um recurso de inteligência artificial chamado Augmented Failure Analysis — ajudam o inspetor a montar um relatório profissional de inspeção e a classificar o modo de falha observado, orientando o usuário durante a coleta de evidências."),
    h2("19.4 Sintomas comuns e roteiro de diagnóstico"),
    p("Na prática de campo, o problema quase sempre se anuncia por um entre cinco sintomas: calor excessivo, ruído excessivo, vibração excessiva, movimento excessivo do eixo, ou torque de atrito elevado ao girar o eixo. Cada sintoma tem uma família reduzida de causas prováveis, o que torna o diagnóstico inicial rápido mesmo sem instrumentação sofisticada — a SKF documenta essa lógica em detalhe num guia de solução de problemas com 44 causas possíveis codificadas e mais de 40 soluções práticas específicas; a tabela abaixo condensa essa lógica nas causas mais frequentes de cada sintoma."),
    image("34_fluxograma_diagnostico.png", "Figura 19.3 — Roteiro rápido de diagnóstico: do sintoma observado à causa provável, antes da confirmação por inspeção física e análise espectral."),
    table(
      ["Sintoma", "Causas mais prováveis", "Ação inicial recomendada"],
      [
        ["Calor excessivo", "Lubrificação incorreta (falta, excesso ou tipo errado), vedação muito apertada, folga interna incorreta, pré-carga, diferença de temperatura entre eixo e mancal", "Verificar nível/tipo de lubrificante e folga de vedação; medir temperatura em regime"],
        ["Ruído excessivo", "Contato metal-metal por falta de lubrificante, contaminação (partículas), ajuste frouxo (anel girando no assento), múltiplas vedações gerando atrito extra", "Ouvir o padrão do ruído; verificar ajuste dos anéis e presença de contaminantes"],
        ["Vibração excessiva", "Deslizamento de elementos rolantes, indentações, lascamentos (spalls) já formados, ajuste frouxo, ondulação (waviness) por vibração externa", "Coletar espectro de vibração e comparar com o catálogo de modos de falha"],
        ["Movimento excessivo do eixo", "Anéis soltos no assento, folga interna incorreta, lascamentos avançados", "Verificar folga radial/axial e o torque de fixação dos componentes"],
        ["Torque de atrito elevado", "Pré-carga, vedação arrastando, lascamentos, fluting elétrico, encostos fora de esquadro", "Desmontar parcialmente e inspecionar vedações e pistas visualmente"],
      ]
    ),
    h2("19.5 Coletando evidências para uma análise confiável"),
    p("Uma boa análise de falha começa antes de o rolamento ser removido. Registrar o contexto operacional evita que informações importantes se percam — e um rolamento mal manuseado após a remoção pode apagar justamente a evidência que explicaria a causa raiz."),
    bullet("Reunir dados de operação e de monitoramento de condição já coletados antes da parada."),
    bullet("Coletar amostras do lubrificante para análise (contaminação, degradação) e comparar a graxa retirada de diferentes pontos do rolamento com uma amostra de graxa nova, guardando uma amostra representativa para análise posterior."),
    bullet("Avaliar o rolamento ainda montado, antes de desmontar — muita evidência de alinhamento e folga se perde na desmontagem."),
    bullet("Marcar a posição de montagem (relação entre anéis, gaiola e carcaça) antes de remover."),
    bullet("Fotografar cada etapa da inspeção — pista, gaiola, elementos rolantes e vedações — documentando a condição do rolamento, do lubrificante e da máquina em geral."),
    bullet("Remover, identificar e embalar o rolamento e as peças associadas separadamente."),
    bullet("Verificar os assentos do eixo e do mancal em busca de marcas de fretting, ovalização ou desgaste."),
    bullet("Para rolamentos grandes ou médios em bom estado estrutural, considerar a remanufatura (recondicionamento) como alternativa à substituição total, conforme o manual de manutenção SKF."),
    p("Com essas evidências em mãos, o próximo passo é comparar o padrão de dano observado com o catálogo de modos de falha da norma ISO 15243 — o assunto dos dois próximos módulos, que cobrem fadiga, desgaste, corrosão, erosão elétrica, deformação plástica e fratura, cada um com sua marca visual característica e fotos reais de rolamentos danificados para consulta rápida."),
  ],
  quizzes: [
    {
      title: "Fixação — Causas, Vida Útil e Zonas de Carga",
      questions: [
        "Por que a zona de carga de um rolamento sob carga radial constante sempre se concentra no anel ESTACIONÁRIO, e não no anel que gira?",
        "Um padrão de pista alarga-se e passa a ocupar quase toda a circunferência da pista, migrando de um lado para o outro. Qual é a causa mais provável, e o que deve ser verificado?",
        "Cite duas razões pelas quais a técnica de envelope de aceleração oferece um tempo de pré-aviso maior do que a inspeção por \"ouvir e sentir\" a máquina.",
      ],
      answers: [
        "Porque cada ponto do anel girante passa pela zona de carga a cada volta (distribuindo o desgaste por toda a circunferência com largura uniforme), enquanto o anel estacionário recebe sempre a carga na mesma posição, concentrando o desgaste numa faixa fixa e mais estreita.",
        "É o padrão típico de desalinhamento entre eixo e mancal. Deve-se verificar a perpendicularidade dos encostos (abutments), o empenamento do eixo e o alinhamento geral do acoplamento.",
        "O envelope de aceleração demodula impactos de alta frequência liberados por microlascamentos ainda submicroscópicos, detectando o Estágio 2 de dano — muito antes de haver ruído ou vibração perceptível ao ouvido humano ou alteração perceptível ao tato (que só ocorrem em estágios avançados, 3 ou 4).",
      ],
    },
  ],
  summary: [
    "Apenas uma fração pequena dos rolamentos falha de fato (~0,5%) — a maioria sobrevive à máquina ou é trocada preventivamente; lubrificação e contaminação respondem por cerca de dois terços das falhas reais.",
    "O padrão de pista (path pattern) é a impressão digital da distribuição de carga no rolamento: padrões normais são previsíveis (faixa centrada no anel estacionário); desvios (faixa larga migrando, duas zonas opostas, faixa alargada no lugar) apontam causas específicas.",
    "O dano evolui em estágios previsíveis, e cada tecnologia de monitoramento só enxerga a partir de um certo estágio — o envelope de aceleração antecipa a detecção; ouvir/sentir a máquina só percebe o problema quando o dano já está avançado.",
  ],
  meta: { num: "19", short: "Falhas em Rolamentos I: Causas e Zonas de Carga", level: "avançado" },
  videoUrl: null,
};

// ============================================================
// MÓDULO 20 — ISO 15243: Fadiga, Desgaste e Corrosão
// ============================================================
const m20 = {
  id: "m20",
  title: "Módulo 20 — Falhas em Rolamentos II: Fadiga, Desgaste e Corrosão (ISO 15243)",
  body: [
    p("Em 1995, um grupo de trabalho da ISO reuniu fabricantes de rolamentos para criar uma classificação e terminologia comuns para os danos de rolamentos — publicada em 2004 como a norma ISO 15243. A classificação da SKF é idêntica à da norma. Ela organiza todo dano de rolamento em 6 modos principais e 14 sub-modos, com base em características visíveis, observáveis por meios não destrutivos (inclusive com o auxílio de lupa ou microscópio óptico)."),
    table(
      ["Modo principal (ISO 15243)", "Sub-modos"],
      [
        ["5.1 Fadiga de contato de rolamento", "Subsuperficial · Superficial"],
        ["5.2 Desgaste", "Abrasivo · Adesivo"],
        ["5.3 Corrosão", "Por umidade · Por atrito (fretting / false brinelling)"],
        ["5.4 Erosão elétrica", "Corrente excessiva · Corrente de fuga"],
        ["5.5 Deformação plástica", "Sobrecarga · Indentação por partículas"],
        ["5.6 Trincas e fratura", "Fratura forçada · Fratura por fadiga · Trinca térmica"],
      ]
    ),
    p("Este módulo cobre os três primeiros grupos — fadiga, desgaste e corrosão — sempre com uma foto real de rolamento danificado ao lado da explicação de cada sub-modo. O Módulo 21 cobre os três restantes, além de estudos de caso reais documentados pela SKF."),
    h2("20.1 Fadiga de contato de rolamento"),
    h3("20.1.1 Fadiga subsuperficial"),
    p("Toda vez que um ponto da pista passa pela zona de carga, ocorrem tensões cíclicas de compressão e cisalhamento logo abaixo da superfície. Com o tempo, essas tensões repetidas alteram a estrutura do material na região de tensão de cisalhamento máxima — tipicamente entre 0,1 e 0,5 mm de profundidade, dependendo da carga, do material, da limpeza, da temperatura e da microestrutura do aço. Nessa região formam-se microtrincas subsuperficiais que crescem lentamente até atingir a superfície, quando finalmente ocorre o lascamento (spalling)."),
    image("28_fadiga_subsuperficial.png", "Figura 20.1 — Progressão esquemática da fadiga subsuperficial: de uma partícula soterrada na pista até o lascamento visível, passando pela iniciação e propagação da trinca abaixo da superfície."),
    image("36_foto_fadiga_subsuperficial.jpg", "Foto 20.1 — Lascamento (spall) inicial por fadiga subsuperficial na pista de um rolamento real — note a área fosca e irregular já destacada em relação ao acabamento espelhado ao redor. (SKF — Bearing Damage and Failure Analysis)"),
    p("O rolamento já está danificado assim que o primeiro lascamento aparece, mas isso não significa que precise ser parado imediatamente — o lascamento cresce de forma gradual, gerando ruído e vibração crescentes, e a máquina deve ser parada e reparada antes que o dano evolua para uma falha maior. Em casos de fadiga prematura (por exemplo, abaixo de 5 a 10% da vida nominal calculada), é comum encontrar redes de trincas subsuperficiais do tipo \"white etching crack\" (WEC) — associadas a fragilização por hidrogênio, corrente de fuga, contaminação por água ou reações tribo-químicas agressivas, e não apenas à fadiga clássica por carga."),
    h3("20.1.2 Fadiga superficial (surface distress)"),
    p("Diferente da fadiga subsuperficial, a fadiga superficial nasce diretamente na superfície de contato, geralmente por lubrificação inadequada: se o filme de óleo não separa completamente as superfícies em contato, as asperezas superficiais entram em contato direto sob deslizamento (microslip), gerando um acabamento \"bruñido\" ou \"vitrificado\" (burnishing/glazing). Sobre esse acabamento surgem microtrincas de aspereza, que evoluem para microlascamentos de poucos mícrons — visíveis apenas ao microscópio, ainda que a olho nu a superfície já pareça fosca e acinzentada."),
    image("37_foto_fadiga_superficial.jpg", "Foto 20.2 — Progressão do lascamento por fadiga superficial na pista de um rolamento de esferas: a área danificada já ocupa boa parte da largura da pista, um estágio mais avançado do que a Foto 20.1. (SKF — Bearing Damage and Failure Analysis)"),
    bullet("Estágio 1 — desgaste inicial: superfície ainda uniforme, apenas mais fosca."),
    bullet("Estágio 2 — lascamento localizado: primeiros pontos de spall isolados."),
    bullet("Estágio 3 — lascamento avançado: spalls coalescem em áreas maiores."),
    bullet("Estágio 4 — lascamento generalizado: toda a pista comprometida."),
    h2("20.2 Desgaste (wear)"),
    image("29_desgaste_abrasivo_adesivo.png", "Figura 20.2 — Esquema do desgaste abrasivo (superfície fosca e opaca, por remoção progressiva de material) comparado ao desgaste adesivo/smearing (transferência de material entre superfícies deslizantes, com aquecimento localizado)."),
    h3("20.2.1 Desgaste abrasivo"),
    p("É a remoção progressiva de material, geralmente por lubrificação inadequada ou ingresso de partículas sólidas contaminantes. Começa como um leve desgaste na fase de amaciamento (running-in) e, se não controlado, torna-se um processo degenerativo: as próprias partículas de desgaste reduzem ainda mais a eficácia do lubrificante, acelerando o próprio desgaste num ciclo vicioso."),
    image("39_foto_desgaste_abrasivo_gaiola.jpg", "Foto 20.3 — Desgaste abrasivo severo numa gaiola de latão: as barras da gaiola, normalmente lisas e douradas, mostram sulcos e perda de material nos bolsões de contato com os elementos rolantes. (SKF — Bearing Damage and Failure Analysis)"),
    p("Uma variante notável é o desgaste por polimento (polishing wear): partículas abrasivas muito finas, combinadas com um filme de óleo fino demais, deixam a pista com aparência de espelho — mas essa aparência \"bonita\" na verdade indica perda de geometria da pista, não uma condição saudável."),
    image("38_foto_desgaste_polimento.jpg", "Foto 20.4 — Desgaste por polimento (polishing wear): pista com brilho espelhado incomum, resultado de partículas abrasivas finíssimas associadas a um filme de óleo insuficiente — o oposto de uma pista saudável, apesar da aparência enganosa. (SKF — Bearing Damage and Failure Analysis)"),
    h3("20.2.2 Desgaste adesivo (smearing / esfolamento / galling)"),
    p("Ocorre quando duas superfícies deslizam uma sobre a outra com aceleração ou velocidade relativa suficiente para gerar calor de atrito localizado, a ponto de soldar pontos de contato metal-metal e depois arrancá-los — transferindo material de uma superfície para a outra. É comum em rolamentos de alta velocidade quando os elementos rolantes são bruscamente acelerados ao reentrar na zona de carga (fora da zona de carga, eles giram mais devagar por não serem impulsionados pelos anéis), e também em cargas leves demais para a velocidade de rotação. O calor gerado tempera e reendurece o material, criando concentrações de tensão que favorecem trincas a 90° da direção de deslizamento."),
    image("40_foto_desgaste_adesivo_smearing.jpg", "Foto 20.5 — Marcas de esfolamento (smearing) na pista de um rolamento: manchas escuras e ásperas na entrada da zona de carga, onde ocorreu transferência de material por atrito. (SKF — Bearing Damage and Failure Analysis)"),
    bullet("Formas de reduzir o risco de esfolamento: aumentar a carga aplicada, reduzir a folga interna do rolamento, usar rolamentos menores, usar rolamentos híbridos (elementos rolantes cerâmicos, mais leves), aplicar revestimentos de proteção, revisar a seleção de óleo/graxa."),
    h3("20.2.3 Descoloração térmica: um termômetro visual"),
    p("Tanto o desgaste adesivo quanto outros modos de falha geram calor de atrito, e o aço do rolamento reage a esse calor mudando de cor de forma bastante previsível — uma pista de inspeção rápida e sem instrumentos para estimar a temperatura máxima já atingida. A SKF recomenda o uso de rolamentos a até 125°C em operação contínua; perder apenas 2 a 4 pontos de dureza Rockwell (por superaquecimento) já reduz a vida do rolamento pela metade."),
    table(
      ["Faixa de temperatura atingida", "O que esperar do material"],
      [
        ["150°C – 177°C (300°F – 350°F)", "Início de perda de dureza do aço — ainda discreta"],
        ["177°C – 205°C (350°F – 400°F)", "Perda de dureza mais perceptível; risco de redução de vida já relevante"],
        ["205°C – 260°C (400°F – 500°F)", "Perda de dureza significativa; material sensivelmente amolecido"],
        ["Acima de 260°C (500°F)", "Dano térmico severo — resistência mecânica comprometida"],
        ["Acima de 540°C (1000°F)", "Alterações metalúrgicas graves — material efetivamente inutilizado"],
      ]
    ),
    h2("20.3 Corrosão"),
    image("30_corrosao.png", "Figura 20.3 — Esquema da corrosão por umidade (pites de oxidação espalhados pela pista) comparada à corrosão por atrito/false brinelling (sulcos paralelos no espaçamento dos elementos rolantes, por micromovimento sob vibração)."),
    h3("20.3.1 Corrosão por umidade"),
    p("Surge quando água ou agentes corrosivos entram no rolamento (por vedação ineficaz, lavagem da máquina, ou processo industrial) em quantidade maior do que o lubrificante consegue neutralizar. O ferro oxida e forma ferrugem — que pode aparecer avermelhada (hematita, em ambientes com mais oxigênio) ou enegrecida (magnetita, com menos oxigênio). Com a máquina parada, água livre no lubrificante tende a se acumular no fundo do rolamento e a se infiltrar no contato entre elemento rolante e pista, causando um ataque químico mais profundo chamado etching — que costuma evoluir para lascamento prematuro e extenso."),
    image("41_foto_corrosao_umidade.jpg", "Foto 20.6 — Corrosão por umidade num rolamento removido de serviço: pites de ferrugem escura espalhados por toda a pista e pelo elemento rolante em primeiro plano. (SKF — Bearing Damage and Failure Analysis)"),
    h3("20.3.2 Corrosão por atrito: fretting e false brinelling"),
    p("O fretting corrosion ocorre no assento do rolamento (furo do anel interno no eixo, ou diâmetro externo do anel externo no mancal) quando há micromovimento relativo por ajuste frouxo demais ou erro de forma. Partículas de material se soltam e oxidam rapidamente em contato com o ar, formando óxido de ferro — que ocupa mais volume que o metal original, podendo desnivelar o apoio do anel e criar concentrações de tensão que favorecem fratura."),
    image("42_foto_corrosao_fretting.jpg", "Foto 20.7 — Fretting corrosion no furo do anel interno: manchas avermelhadas de óxido de ferro na região de assento com o eixo, resultado de micromovimento por ajuste inadequado. (SKF — Bearing Damage and Failure Analysis)"),
    p("Já o false brinelling ocorre dentro do próprio contato de rolamento (entre elemento rolante e pista), tipicamente com a máquina parada e sujeita a vibração externa — do transporte, de uma máquina vizinha, ou de vibração residual da própria linha. O micromovimento oscilatório combina corrosão e desgaste, formando depressões brilhantes ou avermelhadas espaçadas exatamente na distância entre elementos rolantes: depressões esféricas para esferas, sulcos longitudinais (\"flutes\") para rolos. É visualmente parecido com a erosão elétrica por corrente de fuga (Módulo 21), mas a causa é puramente mecânica — vibração parada, não corrente elétrica."),
    p("Para reduzir fretting e false brinelling: ajustar as tolerâncias de encaixe, aplicar pasta ou revestimento antifretting, e — sempre que possível — eliminar a fonte de vibração durante paradas prolongadas (por exemplo, girando periodicamente o eixo ou isolando a máquina de vibração externa)."),
    h2("20.4 Referência rápida: fadiga, desgaste e corrosão"),
    table(
      ["Modo (ISO 15243)", "Aparência típica", "Causa mais comum", "Ação corretiva típica"],
      [
        ["Fadiga subsuperficial", "Lascamento (spall) com bordas irregulares, origina-se abaixo da superfície", "Fadiga natural do material sob carga cíclica (ou prematura por WEC)", "Monitorar por envelope de aceleração; investigar hidrogênio/corrente de fuga se prematura"],
        ["Fadiga superficial", "Superfície fosca/acinzentada evoluindo para microlascamentos", "Lubrificação inadequada, filme de óleo insuficiente", "Corrigir viscosidade/quantidade de lubrificante; verificar contaminação"],
        ["Desgaste abrasivo", "Superfície fosca e opaca, ou polida como espelho (polishing wear)", "Partículas abrasivas + lubrificação inadequada", "Melhorar filtragem/vedação; revisar viscosidade do lubrificante"],
        ["Desgaste adesivo (smearing)", "Manchas ásperas com transferência de material, na entrada da zona de carga", "Deslizamento por aceleração súbita ou carga leve demais", "Aumentar carga mínima, reduzir folga, considerar rolamento híbrido"],
        ["Corrosão por umidade", "Pites de ferrugem (vermelha ou preta) espalhados pela pista", "Água/agentes corrosivos vencendo o lubrificante", "Melhorar vedação; usar lubrificante com inibidor de corrosão"],
        ["Fretting / false brinelling", "Sulcos ou depressões no espaçamento dos elementos rolantes ou no assento", "Micromovimento por ajuste frouxo (fretting) ou vibração parada (false brinelling)", "Corrigir ajuste/tolerância; eliminar vibração externa em paradas longas"],
      ]
    ),
  ],
  quizzes: [
    {
      title: "Fixação — Fadiga, Desgaste e Corrosão",
      questions: [
        "Qual é a diferença fundamental entre fadiga subsuperficial e fadiga superficial, tanto na origem da trinca quanto na causa mais comum?",
        "Por que o desgaste por polimento (polishing wear), que deixa a pista com aparência de espelho, é enganoso para quem não conhece o fenômeno?",
        "Como diferenciar, na inspeção visual, false brinelling de erosão elétrica por corrente de fuga, já que ambos produzem sulcos/depressões no espaçamento dos elementos rolantes?",
      ],
      answers: [
        "A fadiga subsuperficial nasce abaixo da superfície (tipicamente 0,1–0,5 mm), por tensão cíclica de cisalhamento, mesmo com lubrificação adequada — é o modo de falha \"natural\" que define a vida calculada. A fadiga superficial nasce diretamente na superfície, causada por lubrificação inadequada que permite contato direto entre asperezas (microslip), e pode ocorrer bem antes da vida calculada.",
        "Porque a aparência de espelho parece indicar uma superfície \"bem-acabada\" ou saudável, quando na verdade resulta de partículas abrasivas finas combinadas com um filme de óleo fino demais, alterando (e destruindo lentamente) a geometria original da pista — o oposto de uma condição saudável.",
        "A diferença está na causa e no contexto: false brinelling ocorre com a máquina PARADA e exposta a vibração externa (fonte puramente mecânica); a erosão por corrente de fuga ocorre com a máquina em operação e está associada a problemas elétricos (aterramento, isolação, conversor de frequência). A confirmação definitiva costuma exigir verificar o sistema elétrico da máquina e o histórico de operação, já que a aparência pode ser semelhante.",
      ],
    },
  ],
  summary: [
    "A ISO 15243 (idêntica à classificação SKF) organiza todo dano de rolamento em 6 modos principais e 14 sub-modos, com base em características visíveis — uma linguagem comum entre analista, fabricante e laboratório.",
    "Fadiga subsuperficial (natural, ~0,1-0,5 mm de profundidade) e fadiga superficial (por lubrificação inadequada) são os dois lados da fadiga de contato de rolamento; desgaste abrasivo (fosco ou, no caso do polimento, espelhado) e adesivo/smearing (transferência de material) são os dois lados do desgaste.",
    "Corrosão por umidade (pites de ferrugem espalhados) e corrosão por atrito — fretting no assento do anel, false brinelling dentro do próprio contato de rolamento — completam o trio de modos cobertos neste módulo; a descoloração térmica funciona como um \"termômetro visual\" da temperatura máxima já atingida. O Módulo 21 conclui com erosão elétrica, deformação plástica e fratura.",
  ],
  meta: { num: "20", short: "Falhas em Rolamentos II: Fadiga, Desgaste e Corrosão", level: "avançado" },
  videoUrl: null,
};

// ============================================================
// MÓDULO 21 — Erosão Elétrica, Deformação Plástica, Fratura + Casos
// ============================================================
const m21 = {
  id: "m21",
  title: "Módulo 21 — Falhas em Rolamentos III: Erosão Elétrica, Deformação Plástica, Fratura e Estudos de Caso",
  body: [
    p("Este módulo conclui a sequência de análise de falhas em rolamentos, cobrindo os três modos ISO 15243 restantes — erosão elétrica, deformação plástica e trincas/fratura — e fechando com estudos de caso reais documentados pela SKF, que mostram como todo o raciocínio dos Módulos 19 e 20 se aplica na prática."),
    h2("21.1 Erosão elétrica"),
    p("Ocorre quando corrente elétrica passa de um anel ao outro através dos elementos rolantes — situação comum em motores e geradores acionados por conversores de frequência (que induzem tensões de eixo), em máquinas com aterramento inadequado, ou em aplicações com passagem de corrente estática. Divide-se em dois sub-modos com aparências bem distintas."),
    image("31_erosao_eletrica.png", "Figura 21.1 — Esquema da erosão por corrente excessiva (crateras grandes, até cerca de 0,5 mm, com borda de material fundido) comparada à erosão por corrente de fuga (crateras pequenas e próximas que evoluem para sulcos paralelos — fluting)."),
    h3("21.1.1 Corrente excessiva"),
    p("Quando a corrente é alta, o processo lembra uma solda a arco elétrico em miniatura: alta densidade de corrente numa área de contato pequena aquece o material a temperaturas que vão de têmpera a fusão. O material fundido se solidifica e acaba se soltando com a rotação do elemento rolante, deixando crateras que podem chegar a cerca de 0,5 mm, por vezes com queimaduras em ziguezague visíveis nas pistas de rolamentos de esferas. Em geral, é um evento único e pontual, não uma passagem contínua de corrente."),
    image("43_foto_erosao_corrente_excessiva.jpg", "Foto 21.1 — Crateras de erosão por corrente excessiva vistas ao microscópio (barra de escala: 500 µm) — o tamanho das crateras nessa ampliação já denuncia a passagem de uma corrente elétrica intensa e pontual. (SKF — Bearing Damage and Failure Analysis)"),
    h3("21.1.2 Corrente de fuga"),
    p("Com corrente de intensidade mais baixa, porém mais contínua, formam-se inicialmente crateras rasas e muito próximas entre si, que evoluem para um padrão de sulcos paralelos (fluting) nas pistas — e também nos rolos, em rolamentos de rolos. Um corte transversal da região afetada mostra uma camada branca reendurecida (tipicamente 66 a 68 HRC, muito dura e frágil) sobre uma camada escura recozida pelo calor (56 a 57 HRC, mais mole que o material original). A graxa nas proximidades tende a carbonizar, perdendo a capacidade de formar película lubrificante — o que acelera ainda mais a fadiga superficial, podendo evoluir para o agarramento (seizure) do rolamento."),
    image("44_foto_erosao_corrente_fuga.jpg", "Foto 21.2 — Fluting por corrente de fuga: sulcos paralelos finos e regulares na pista, formados pela evolução de crateras pequenas e próximas ao longo do tempo. (SKF — Bearing Damage and Failure Analysis)"),
    p("Soluções típicas incluem rolamentos isolados eletricamente (como a linha Insocoat da SKF, com revestimento cerâmico no anel) ou rolamentos híbridos (elementos rolantes cerâmicos, que não conduzem corrente), além de escovas de aterramento no eixo e correção da causa elétrica de origem (aterramento, isolação do conversor de frequência)."),
    h2("21.2 Deformação plástica"),
    image("32_deformacao_plastica.png", "Figura 21.2 — Esquema da indentação por sobrecarga/manuseio (depressões espaçadas no passo dos elementos rolantes) comparada à indentação por partícula, onde o lascamento nasce em forma de V na borda de saída da marca original."),
    h3("21.2.1 Deformação por sobrecarga (overload)"),
    p("Cargas estáticas ou de choque — ou manuseio inadequado — podem marcar permanentemente pistas, elementos rolantes e até deformar a gaiola. Um golpe direto na gaiola durante o transporte, por exemplo, já é suficiente para gerar ruído e vibração elevados assim que o rolamento entrar em operação. Quando a força de montagem é aplicada através dos elementos rolantes (em vez de através do anel correto), surgem indentações espaçadas exatamente na distância entre elementos — um padrão facilmente confundido com dano de operação, mas que na verdade já nasceu na montagem."),
    image("45_foto_deformacao_sobrecarga.jpg", "Foto 21.3 — Gaiola de latão de um rolamento de esferas de contato angular, deformada por manuseio inadequado — a marca escura entre os elementos rolantes é o ponto de impacto. (SKF — Bearing Damage and Failure Analysis)"),
    h3("21.2.2 Indentação por partículas"),
    p("Contaminantes sólidos — não precisam ser duros, bastam ser grandes o suficiente — ficam presos entre elemento rolante e pista e são sobre-rolados (over-rolled), deixando uma indentação com uma rebarba de material elevado ao redor. Essa rebarba concentra tensão e, sob o rolamento cíclico normal, inicia fadiga por trás da indentação — o lascamento resultante nasce em formato de V, característico, apontando na direção oposta ao sentido de rotação."),
    image("46_foto_indentacao_particula.jpg", "Foto 21.4 — Lascamento (spall) em formato de V, visto ao microscópio, nascendo a partir de uma indentação por partícula na pista — o formato característico aponta a direção de sobre-rolamento. (SKF — Bearing Damage and Failure Analysis)"),
    p("É por isso que a limpeza do lubrificante e o cuidado no manuseio durante a montagem são tão determinantes para a vida do rolamento: boa parte da fadiga \"prematura\" observada em campo, na verdade, começou como uma simples indentação por partícula."),
    h2("21.3 Trincas e fratura"),
    image("33_fratura.png", "Figura 21.3 — Esquema dos três tipos de trinca/fratura: fratura forçada (irregular, por impacto), fratura por fadiga (marcas de praia concêntricas, por flexão cíclica) e trinca térmica (paralelas, em ângulo reto ao deslizamento)."),
    h3("21.3.1 Fratura forçada"),
    p("Acontece quando a concentração de tensão excede a resistência à tração do material — tipicamente por manuseio brusco (martelo e talhadeira na montagem a frio) ou por excesso de \"drive-up\" num assento cônico, que gera tensões de aro (hoop stresses) altas o suficiente para trincar o anel em serviço."),
    h3("21.3.2 Fratura por fadiga"),
    p("Ocorre quando a resistência à fadiga do material é superada sob flexão cíclica repetida: uma trinca fina se propaga progressivamente até o anel ou a gaiola desenvolver uma trinca passante. É frequentemente um dano secundário, iniciado a partir de uma concentração de tensão preexistente — como um lascamento por fadiga na pista ou uma corrosão por fretting no assento do anel."),
    image("47_foto_fratura_fadiga.jpg", "Foto 21.5 — Superfície de fratura por fadiga: as \"marcas de praia\" concêntricas em torno de um ponto de origem central são a assinatura clássica da propagação lenta e cíclica da trinca. (SKF — Bearing Damage and Failure Analysis)"),
    h3("21.3.3 Trinca térmica"),
    p("Duas superfícies deslizando uma contra a outra geram calor de atrito; se o deslizamento é considerável (por exemplo, um anel interno com ajuste frouxo no eixo, sob carga axial, sujeito a fluência/creep), esse calor pode gerar trincas transversais, em ângulo reto à direção do deslizamento, que eventualmente atravessam o anel por completo."),
    image("48_foto_trinca_termica.jpg", "Foto 21.6 — Trincas térmicas transversais na face de um anel, em ângulo reto à direção de deslizamento — resultado de atrito e calor excessivos sob ajuste frouxo. (SKF — Bearing Damage and Failure Analysis)"),
    h2("21.4 Referência rápida: erosão elétrica, deformação plástica e fratura"),
    table(
      ["Modo (ISO 15243)", "Aparência típica", "Causa mais comum", "Ação corretiva típica"],
      [
        ["Erosão por corrente excessiva", "Crateras grandes (até ~0,5 mm) com borda de material fundido, queimaduras em zigue-zague", "Evento elétrico único de alta intensidade (curto, descarga)", "Verificar aterramento e isolação elétrica da máquina"],
        ["Erosão por corrente de fuga", "Fluting: sulcos paralelos finos, camada branca reendurecida em corte transversal", "Corrente de fuga contínua (conversor de frequência, aterramento deficiente)", "Rolamentos isolados (Insocoat) ou híbridos; corrigir aterramento"],
        ["Deformação por sobrecarga", "Depressões espaçadas no passo dos elementos rolantes, gaiola deformada", "Choque, manuseio brusco, montagem pela via errada", "Usar ferramentas e métodos de montagem corretos"],
        ["Indentação por partículas", "Indentação com rebarba elevada; lascamento em V na borda de saída", "Contaminação sólida no lubrificante", "Melhorar filtragem/vedação; manuseio limpo na montagem"],
        ["Fratura forçada", "Trinca única e irregular, sem padrão repetitivo", "Impacto ou sobretensão pontual (manuseio, drive-up excessivo)", "Revisar procedimento de montagem"],
        ["Fratura por fadiga", "\"Marcas de praia\" concêntricas a partir de um ponto de origem", "Flexão cíclica repetida, muitas vezes dano secundário", "Investigar causa raiz do dano primário (spall, fretting)"],
        ["Trinca térmica", "Trincas paralelas em ângulo reto ao deslizamento", "Deslizamento com calor de atrito (ajuste frouxo + carga axial)", "Corrigir ajuste do anel interno no eixo"],
      ]
    ),
    h2("21.5 Estudos de caso reais (SKF)"),
    p("Nada consolida melhor o raciocínio de análise de falhas do que casos documentados. Os quatro exemplos a seguir, investigados pela equipe de laboratório da SKF, mostram como a combinação de inspeção física, contexto operacional e classificação ISO 15243 leva à causa raiz — mesmo quando o sintoma inicial é enganoso."),
    h3("21.5.1 Descarrilamento de trem de carga"),
    bullet("Aplicação: caixas de eixo SKF para vagões de carga, carga de 20 toneladas por eixo, dois rolamentos por caixa."),
    bullet("Sintoma inicial: um detector de \"hot box\" na via não indicou nada de anormal — mas 35 km depois o trem descarrilou por fratura do eixo de um rodeiro."),
    image("49_foto_caso_trem.jpg", "Foto 21.7 — Restos da caixa de eixo (cortada) apresentados para a análise de falha do caso do descarrilamento. (SKF — Bearing Damage and Failure Analysis)"),
    p("A inspeção revelou deformação severa no anel externo do rolamento interno, compatível com temperaturas acima de 800°C — muito além de um simples \"hot runner\". Investigando o histórico de manutenção, descobriu-se que, num reparo anterior, foi instalado um espaçador mais curto (14 mm) do que o especificado para essa versão da caixa de eixo (35 mm) — uma peça de uma versão posterior do produto, projetada para uma carga de eixo maior (22,5 t) com um eixo mais curto e resistente. Com o espaçador errado, os anéis internos não ficaram devidamente presos axialmente, permitindo maior flexão do eixo; os anéis externos também não ficaram bem posicionados na carcaça, gerando contato axial nos labirintos de vedação — o que elevou drasticamente o atrito, causou o agarramento (seizure) do rolamento, a fratura do eixo e, por fim, o descarrilamento."),
    p("Causa raiz: uso de um componente de reposição incompatível durante um reparo. Ação corretiva: revisão completa das instruções de manutenção para eliminar qualquer ambiguidade na escolha de peças de reposição — o custo de uma peça errada, nesse caso, incluiu danos à via, à catenária, horas de interrupção do tráfego e seis vagões enviados à sucata."),
    h3("21.5.2 Motor elétrico de velocidade variável"),
    bullet("Aplicação: motor elétrico de velocidade variável (1.000 a 1.500 rpm) na seção de rebobinamento de uma máquina de papel tissue, alimentado por conversor de frequência 400 VAC."),
    bullet("Rolamentos: um rolamento de rolos cilíndricos (não localizador) e um rolamento de esferas (localizador), ambos eletricamente isolados; lubrificação manual com graxa SKF LGEP 2."),
    bullet("Sintoma inicial: vida útil média de apenas 1 a 2 meses — muito abaixo do esperado."),
    image("50_foto_caso_motor.jpg", "Foto 21.8 — Layout típico de um rolo Jumbo (bobinador) na seção investigada do caso do motor elétrico de velocidade variável. (SKF — Bearing Damage and Failure Analysis)"),
    p("A inspeção visual inicial só revelou um padrão irregular de ondulação, parecido com desgaste por vibração — o rolamento de esferas não foi afetado, só o de rolos cilíndricos. Isso, por si só, não permitia decidir entre duas hipóteses: vibração excessiva ou passagem de corrente elétrica — afinal, os rolamentos eram isolados, e a bancada tinha amortecimento de borracha contra vibração. A peça foi levada ao laboratório e cortada para exame ao microscópio, revelando uma grande quantidade de microcrateras na superfície da pista, com uma fina camada clara reendurecida por calor visível em corte transversal a 500x de ampliação — a assinatura inconfundível de corrente de fuga, evoluindo para fluting."),
    p("Causa raiz: corrente de fuga por aterramento inadequado — a inspeção do sistema elétrico revelou que o cabo de aterramento havia sido desconectado (e não reconectado) num reparo anterior do motor, contornando por completo a proteção da isolação dos rolamentos. Ação corretiva: reconexão do aterramento e substituição do conjunto isolado; o problema não voltou a ocorrer."),
    h3("21.5.3 Moinho de argila (fábrica de tijolos)"),
    bullet("Aplicação: moinho de argila em fábrica de tijolos, rolamento localizador girando abaixo de 100 rpm, com cargas pesadas e choques; lubrificação com graxa SKF LGEP 2, relubrificação de 30 g a cada 30 horas."),
    bullet("Sintoma inicial: falha prematura aos 1,5 ano de operação, quando se esperava uma vida bem mais longa."),
    image("51_foto_caso_moinho_argila.jpg", "Foto 21.9 — Anel externo do rolamento do moinho de argila, mostrando desgaste abrasivo severo e marcas de esfolamento por desmontagem. (SKF — Bearing Damage and Failure Analysis)"),
    p("Ao desmontar, a folga radial interna medida foi de 0,900 mm — bem acima da faixa de um rolamento novo (0,250 a 0,320 mm), um sinal claro de desgaste acumulado severo. As pistas mostravam forte desgaste abrasivo, foscas e acinzentadas; o anel externo apresentava corrosão por fretting na superfície externa (resultado de movimento de fluência do anel sob carga pesada e apoio irregular), e as gaiolas tinham desgaste substancial nos bolsões, a ponto de os elementos rolantes caírem dos bolsões ao balançar o anel interno."),
    p("Causa raiz: vedação inadequada, permitindo contaminação e agravando o desgaste abrasivo, combinada com o movimento de fluência do anel por ajuste/apoio inadequado. Ação corretiva: melhoria do sistema de vedação e revisão do plano de relubrificação e do assentamento do anel externo no mancal."),
    h3("21.5.4 Britador de mandíbulas (mineração)"),
    bullet("Aplicação: britador de mandíbulas de duplo alavanca, rolamento principal do eixo, cargas pesadas com choques."),
    bullet("Sintoma inicial: rolamentos que antes duravam cerca de 5 anos passaram a falhar a cada 2 anos, após uma revisão geral."),
    image("52_foto_caso_britador.jpg", "Foto 21.10 — Anel externo do rolamento do britador de mandíbulas, com desgaste abrasivo e corrosão por fretting combinados na zona de carga. (SKF — Bearing Damage and Failure Analysis)"),
    p("A inspeção encontrou desgaste abrasivo pesado nas pistas do anel interno e externo e na gaiola (provavelmente causado por lubrificação inadequada), além de fretting corrosion na superfície externa do anel externo, na região correspondente à zona de carga — um modo de falha adicional, provavelmente agravado por um assento de mancal inadequado. Ondulação (waviness) nas pistas e desgaste severo da gaiola indicavam também um problema sério de vibração durante a operação. A investigação mecânica revelou que o material não estava sendo descarregado adequadamente, fazendo o britador atuar como um \"compactador\" — gerando vibração excessiva e cargas externas pesadas, que aceleraram tanto a fretting corrosion quanto a ondulação nas pistas."),
    p("Causa raiz: descarga inadequada do material (problema mecânico/operacional), agravando a lubrificação insuficiente já presente. Ação corretiva: correção do sistema de descarga, reparo do assento do mancal, e implantação de um sistema automático de lubrificação com a graxa SKF LGEP 2."),
    h2("21.6 Investigações avançadas de laboratório"),
    p("Quando a inspeção visual não é suficiente para identificar a causa raiz — especialmente em falhas catastróficas por agarramento (seizure), onde grande parte da evidência original se perde — a SKF recorre a investigações destrutivas de laboratório em três áreas de especialidade: metalurgia (microscopia eletrônica de varredura, ensaios de dureza, difração de raios-X para medir austenita retida, análise de microestrutura), química (análise de lubrificantes, contagem de partículas e avaliação de limpeza/contaminação, análise elementar de materiais) e análise de falhas e desempenho (ensaios em bancada, investigação de componentes de campo). Essas técnicas complementam — mas não substituem — a análise visual não destrutiva que é o foco destes três módulos."),
    h2("21.7 Fechando o ciclo: do espectro de vibração à causa raiz confirmada"),
    p("A vibração (Módulos 6, 7 e 18) responde à pergunta \"o que está acontecendo, e há quanto tempo?\" — ela detecta e acompanha a evolução do dano, muitas vezes com meses de antecedência via envelope de aceleração. A análise de falha física (Módulos 19 a 21) responde à pergunta seguinte, igualmente essencial: \"por que isso aconteceu, e o que fazer para não se repetir?\". Um bom analista de confiabilidade domina as duas pontas: detecta cedo pela vibração, e confirma e corrige pela análise do padrão de dano físico — fechando o ciclo de causa raiz que evita a reincidência da falha."),
  ],
  quizzes: [
    {
      title: "Fixação — Erosão Elétrica, Fratura e Estudos de Caso",
      questions: [
        "Um rolamento apresenta sulcos paralelos (fluting) na pista, muito parecidos visualmente com false brinelling. Que evidência de corte transversal confirmaria tratar-se de erosão elétrica por corrente de fuga, e não de false brinelling?",
        "Qual é a diferença de aparência entre fratura por fadiga e fratura forçada, e por que essa diferença importa para a investigação?",
        "No caso do moinho de argila, cite duas evidências físicas (além do sintoma inicial de falha prematura) que confirmaram desgaste e movimento anormais no rolamento.",
      ],
      answers: [
        "Um corte transversal mostrando uma camada branca reendurecida (66-68 HRC) sobre uma camada escura recozida (56-57 HRC) é assinatura térmica de passagem de corrente elétrica — false brinelling, sendo puramente mecânico (micromovimento sob vibração), não produz essa alteração de dureza por calor.",
        "A fratura por fadiga mostra \"marcas de praia\" concêntricas, resultado da propagação lenta e progressiva de uma trinca sob flexão cíclica repetida; a fratura forçada é irregular e única, resultado de um evento único de sobtensão além do limite de resistência do material (impacto, manuseio brusco). A diferença importa porque aponta causas completamente distintas: fratura por fadiga sugere um problema recorrente de projeto/carga ou dano secundário pré-existente; fratura forçada sugere um evento isolado de manuseio ou montagem.",
        "A folga radial interna medida (0,900 mm) estava muito acima da faixa de um rolamento novo (0,250–0,320 mm), confirmando desgaste acumulado severo; e o desgaste nos bolsões da gaiola era tão grande que os elementos rolantes caíam dos bolsões ao simplesmente balançar o anel interno — ambas evidências físicas diretas, além da corrosão por fretting no anel externo.",
      ],
    },
  ],
  summary: [
    "Erosão elétrica se divide em corrente excessiva (crateras grandes, tipo solda a arco, evento único) e corrente de fuga (crateras pequenas e contínuas evoluindo para fluting, com camada branca reendurecida visível em corte transversal).",
    "Deformação plástica (sobrecarga e indentação por partículas) e fratura (forçada, por fadiga com marcas de praia, e térmica) fecham a classificação ISO 15243 de 6 modos e 14 sub-modos apresentada no Módulo 20.",
    "Os quatro estudos de caso reais da SKF (trem, motor elétrico, moinho de argila, britador) mostram o mesmo padrão de investigação: sintoma inicial enganoso → inspeção física detalhada → classificação ISO 15243 → causa raiz → ação corretiva específica — o mesmo roteiro que um analista de vibração deve seguir ao investigar qualquer falha prematura. Quando a inspeção visual não basta, laboratórios especializados recorrem a metalurgia, química e ensaios destrutivos para fechar o caso.",
  ],
  meta: { num: "21", short: "Falhas em Rolamentos III: Erosão, Fratura e Casos", level: "avançado" },
  videoUrl: null,
};

// ============================================================
// Integração no content.js
// ============================================================
const src = fs.readFileSync(CONTENT_PATH, "utf-8");
const COURSE = new Function(src + "; return COURSE;")();

const idx18 = COURSE.findIndex((m) => m.id === "m18");
const idx17 = COURSE.findIndex((m) => m.id === "m17");
if (idx18 === -1 || idx17 === -1) {
  throw new Error("m18 ou m17 não encontrados em COURSE — abortando para não corromper o conteúdo.");
}

// bump Glossário (m17) num de "18" para "22" (mantendo o padrão já usado: ele
// sempre fica por último, como referência)
const glossario = COURSE.find((m) => m.id === "m17");
glossario.meta.num = "22";

// insere m19, m20, m21 logo após m18 (Galeria de Falhas) e antes do Glossário
const newCourse = COURSE.filter((m) => m.id !== "m17");
const insertPos = newCourse.findIndex((m) => m.id === "m18") + 1;
newCourse.splice(insertPos, 0, m19, m20, m21);
newCourse.push(glossario);

const header = "// Gerado automaticamente por scripts/build_site.js + scripts/inject_charts.js + scripts/inject_summaries.js + scripts/add_module18.js + add_bearing_modules.js — não editar manualmente.\n";
fs.writeFileSync(CONTENT_PATH, header + "const COURSE = " + JSON.stringify(newCourse) + ";\n");

console.log("OK — módulos inseridos. Total de módulos agora:", newCourse.length);
newCourse.forEach((m) => console.log(m.id, "| num:", m.meta.num, "|", m.title));
