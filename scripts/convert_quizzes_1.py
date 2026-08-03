#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rodada J — conversão de quizzes para múltipla escolha (todos os módulos de
Análise de Vibração + Análise de Falhas - Rolamentos, ou seja, data/content.js).
Schema novo: question = {text, options:[{id,text}], correct, explanation}.
Este arquivo cobre m0 a m11. convert_quizzes_2.py cobre m12 a m21.
"""
import json

def opt(i, t): return {"id": i, "text": t}
def Q(text, options, correct, explanation):
    return {"text": text, "options": options, "correct": correct, "explanation": explanation}

# chave = module id -> lista de perguntas convertidas (na mesma ordem do quiz original)
CONVERTED = {}

CONVERTED["m0"] = [
    Q("Um sensor indica 10 mm/s de pico. Qual é o valor RMS equivalente (assumindo sinal senoidal puro)?",
      [opt("a","≈ 7,07 mm/s (10 ÷ √2)"), opt("b","≈ 10,00 mm/s (RMS = pico para qualquer sinal)"),
       opt("c","≈ 14,14 mm/s (10 × √2)"), opt("d","≈ 5,00 mm/s (10 ÷ 2)")],
      "a",
      "RMS = pico ÷ √2 para um sinal senoidal puro: 10 ÷ 1,414 ≈ 7,07 mm/s."),
    Q("Uma máquina gira a 3600 rpm. Um pico aparece em 240 Hz no espectro. A que ordem (xRPM) ele corresponde?",
      [opt("a","4X RPM"), opt("b","2X RPM"), opt("c","6X RPM"), opt("d","1X RPM")],
      "a",
      "1X = 3600 ÷ 60 = 60 Hz. Ordem = 240 ÷ 60 = 4X RPM."),
    Q("Por que a família de normas ISO 10816 usa o valor RMS de velocidade, e não o valor de pico, como referência de severidade?",
      [opt("a","Porque o RMS representa melhor a energia média do sinal ao longo do tempo, mais associada ao desgaste e à fadiga do que um valor de pico instantâneo."),
       opt("b","Porque o valor de pico é sempre menor que o RMS e subestimaria a severidade real."),
       opt("c","Porque instrumentos antigos só conseguiam medir RMS, e a norma manteve a tradição."),
       opt("d","Porque o RMS elimina automaticamente o ruído elétrico do sensor.")],
      "a",
      "O RMS representa a energia média contínua do sinal, grandeza mais diretamente ligada ao desgaste e à fadiga dos componentes do que um pico instantâneo, que pode não ser representativo da energia transmitida à estrutura."),
]

CONVERTED["m1"] = [
    Q("Cite as três estratégias clássicas de manutenção e a principal desvantagem de cada uma.",
      [opt("a","Corretiva (alto custo/risco ao operar até quebrar), Preventiva (troca peças com vida útil restante, risco de falha na intervenção) e Preditiva (exige instrumentação/capacitação, mas é a mais econômica e segura)."),
       opt("b","Corretiva, Preventiva e Autônoma — todas com o mesmo custo e risco."),
       opt("c","Preditiva, Detectiva e Corretiva — a Preditiva é sempre a mais cara das três."),
       opt("d","Preventiva, Proativa e Reativa — a Proativa é a única sem desvantagens.")],
      "a",
      "As três estratégias clássicas são corretiva (operar até quebrar), preventiva (intervenção por calendário) e preditiva (intervenção pela condição real) — cada uma com a desvantagem específica descrita na opção correta."),
    Q("Por que a análise de vibração costuma ser a técnica preditiva de melhor custo-benefício para máquinas rotativas?",
      [opt("a","Porque a vibração é sintoma precoce da quase totalidade dos defeitos mecânicos de máquinas rotativas, permitindo diagnóstico de causa raiz com um único conjunto de medições."),
       opt("b","Porque os sensores de vibração são os mais baratos entre todas as técnicas preditivas disponíveis."),
       opt("c","Porque a vibração só detecta desbalanceamento, o defeito mais comum na indústria."),
       opt("d","Porque não exige nenhum treinamento técnico da equipe de manutenção.")],
      "a",
      "A vibração é sintoma precoce e presente na quase totalidade dos defeitos mecânicos de máquinas rotativas (desbalanceamento, desalinhamento, folgas, rolamentos, engrenagens, elétrico, hidráulico/aerodinâmico), permitindo diagnóstico de causa raiz com um único conjunto de medições."),
    Q("Cite três competências que um Engenheiro de Confiabilidade deve ter além de \"ler o espectro\".",
      [opt("a","Planejar rotas de medição, aplicar critérios normativos de severidade (ISO 10816) e recomendar/priorizar ações corretivas."),
       opt("b","Programar CLPs, projetar circuitos elétricos e operar guindastes."),
       opt("c","Apenas trocar rolamentos e lubrificar máquinas manualmente."),
       opt("d","Nenhuma — ler o espectro corretamente já é suficiente para o cargo.")],
      "a",
      "Além de interpretar espectros, o Engenheiro de Confiabilidade deve planejar rotas e pontos de medição, selecionar/configurar instrumentação, aplicar critérios normativos de severidade, diagnosticar causa raiz, recomendar/priorizar ações corretivas e comunicar o diagnóstico com clareza."),
]

CONVERTED["m2"] = [
    Q("Uma máquina de 3000 RPM apresenta pico dominante em 50 Hz. A que ordem de rotação (xRPM) isso corresponde e o que isso sugere preliminarmente?",
      [opt("a","1X exatamente (3000 RPM = 50 Hz), sugerindo desbalanceamento como hipótese inicial."),
       opt("b","2X (3000 RPM = 25 Hz), sugerindo desalinhamento angular."),
       opt("c","0,5X (subharmônico), sugerindo folga mecânica severa."),
       opt("d","3X, sugerindo defeito de engrenamento.")],
      "a",
      "3000 RPM = 50 Hz de rotação (1X). Logo, o pico em 50 Hz é exatamente 1X, sugerindo desbalanceamento como hipótese inicial (a confirmar por fase e demais evidências)."),
    Q("Por que a aceleração é preferida para detectar defeitos de rolamento, e a velocidade é preferida para severidade geral em banda larga?",
      [opt("a","Defeitos de rolamento geram impactos de alta frequência que a aceleração amplifica (A = 2πf·V); a severidade geral está bem correlacionada com energia vibratória, bem representada pela velocidade RMS (base da ISO 10816)."),
       opt("b","A aceleração é sempre mais precisa que a velocidade em qualquer faixa de frequência."),
       opt("c","A velocidade só pode ser medida em máquinas de baixa rotação, e a aceleração em máquinas de alta rotação."),
       opt("d","Não há diferença real — a escolha é apenas uma convenção histórica sem base física.")],
      "a",
      "Defeitos de rolamento geram impactos de curtíssima duração cujo conteúdo de energia está concentrado em altas frequências — a aceleração amplifica esses componentes. A severidade geral é bem representada pela velocidade RMS, base das normas ISO 10816."),
    Q("O que é \"leakage\" (vazamento espectral) e qual recurso de aquisição é usado para reduzi-lo?",
      [opt("a","Distorção espectral quando o sinal capturado não é um número inteiro de ciclos na janela de aquisição; reduzido por uma função de janelamento (ex.: Hanning)."),
       opt("b","Perda de sinal por cabo do sensor mal conectado; reduzido trocando o cabo do acelerômetro."),
       opt("c","Vazamento de óleo do mancal que afeta a leitura de vibração; reduzido com vedação adequada."),
       opt("d","Ruído elétrico de 60 Hz da rede; reduzido com filtro notch na frequência da rede.")],
      "a",
      "Leakage é a distorção espectral que ocorre quando o sinal capturado não é um número inteiro de ciclos dentro da janela de aquisição, espalhando energia ao redor da frequência real — reduzido aplicando uma função de janelamento, sendo a Hanning a mais comum em monitoramento de rotina."),
]

CONVERTED["m3"] = [
    Q("Para monitorar uma turbina a vapor de grande porte com mancais de filme de óleo, qual sensor é o mais indicado para acompanhar o movimento relativo do eixo, e por quê?",
      [opt("a","Sensor de proximidade (eddy current), pois mede diretamente o deslocamento relativo entre o eixo e a carcaça do mancal."),
       opt("b","Acelerômetro piezoelétrico de base magnética, por sua simplicidade de instalação."),
       opt("c","Sensor de velocidade eletrodinâmico, por ter a maior faixa de frequência útil."),
       opt("d","Microfone industrial, por captar diretamente o ruído do mancal.")],
      "a",
      "O sensor de proximidade (eddy current) mede diretamente o deslocamento relativo entre eixo e carcaça — grandeza fisicamente relevante quando o eixo se move dentro da folga de um mancal de filme de óleo, situação em que a vibração absoluta da carcaça pode não representar bem o estado do rotor."),
    Q("Por que a fixação do acelerômetro por base magnética não é recomendada para diagnóstico fino de defeitos incipientes de rolamento?",
      [opt("a","Porque a base magnética reduz a frequência natural de montagem do sensor, limitando a faixa de frequência útil da medição."),
       opt("b","Porque bases magnéticas se desmagnetizam rapidamente em ambientes industriais."),
       opt("c","Porque o campo magnético da base interfere no sinal elétrico do próprio acelerômetro."),
       opt("d","Porque bases magnéticas só funcionam em superfícies pintadas.")],
      "a",
      "A base magnética reduz a frequência natural de montagem do sensor, limitando a faixa de frequência útil — defeitos incipientes de rolamento geram energia em frequências altas que exigem fixação rígida (rosca/stud) para serem captados com fidelidade."),
    Q("Cite as três direções de medição recomendadas pela ISO 10816-1 e diga em qual delas normalmente se detecta melhor o desalinhamento angular.",
      [opt("a","Horizontal, vertical e axial — o desalinhamento angular é caracteristicamente identificado pela alta vibração axial no acoplamento."),
       opt("b","Radial interna, radial externa e tangencial — melhor detectado na radial interna."),
       opt("c","Horizontal, vertical e axial — melhor detectado na vertical, por causa do peso do rotor."),
       opt("d","Apenas axial é recomendada pela norma, nas três posições ao longo do eixo.")],
      "a",
      "As três direções recomendadas são horizontal, vertical e axial. O desalinhamento angular é caracteristicamente identificado pela alta vibração axial no acoplamento."),
]

CONVERTED["m4"] = [
    Q("Um motor elétrico de 200 kW (Grupo 2, suporte rígido) apresenta 3,1 mm/s RMS de vibração no mancal. Em que zona ele se encontra segundo a ISO 10816-3?",
      [opt("a","Zona C — operação aceitável apenas por tempo limitado, com necessidade de planejamento de intervenção."),
       opt("b","Zona A — condição de máquina nova, sem restrições."),
       opt("c","Zona B — operação aceitável para longo prazo sem restrições."),
       opt("d","Zona D — vibração de severidade suficiente para causar dano à máquina, parada imediata recomendada.")],
      "a",
      "Para Grupo 2 rígido: A/B = 1,4; B/C = 2,8; C/D = 4,5 mm/s. Com 3,1 mm/s, o valor está entre B/C (2,8) e C/D (4,5), portanto na Zona C."),
    Q("Explique a diferença entre o Critério I e o Critério II da ISO 10816-1.",
      [opt("a","Critério I avalia o valor absoluto da vibração contra zonas fixas; Critério II avalia a variação da magnitude ao longo do tempo em relação a uma referência (baseline)."),
       opt("b","Critério I se aplica a motores elétricos; Critério II se aplica exclusivamente a turbinas a vapor."),
       opt("c","Critério I usa velocidade; Critério II usa exclusivamente aceleração."),
       opt("d","Critério I é usado só na instalação da máquina; Critério II nunca mais é aplicado depois disso.")],
      "a",
      "O Critério I avalia o valor absoluto (magnitude) da vibração contra zonas fixas de severidade. O Critério II avalia a variação da magnitude ao longo do tempo em relação a uma referência (baseline) — uma mudança significativa pode indicar problema em desenvolvimento mesmo em zona aceitável."),
    Q("Por que os valores numéricos das zonas de severidade não devem ser usados diretamente como especificação contratual de aceitação, segundo a própria norma?",
      [opt("a","Porque os limites foram estabelecidos a partir de experiência internacional geral e não consideram particularidades de projeto de cada máquina; a especificação definitiva deve ser acordada entre fabricante e cliente."),
       opt("b","Porque os valores da norma já estão desatualizados e nenhum fabricante os utiliza mais."),
       opt("c","Porque a norma exige que cada contrato defina seus próprios valores, sem qualquer referência aos limites publicados."),
       opt("d","Porque os valores mudam anualmente e um contrato fixo ficaria desatualizado rapidamente.")],
      "a",
      "Os limites de zona foram estabelecidos a partir de experiência internacional geral, para evitar exigências grosseiramente inadequadas — não consideram particularidades de projeto de cada máquina. A especificação de aceitação definitiva deve ser acordada entre fabricante e cliente."),
]

CONVERTED["m5"] = [
    Q("O que diferencia um harmônico de uma banda lateral, em termos de origem física?",
      [opt("a","Harmônico é múltiplo inteiro da frequência fundamental (distorção de um único fenômeno periódico); banda lateral surge de modulação de amplitude entre duas frequências distintas, aparecendo simétrica ao redor de uma portadora."),
       opt("b","Harmônico só ocorre em engrenagens; banda lateral só ocorre em rolamentos."),
       opt("c","Harmônico é sempre de amplitude maior que a banda lateral, por definição."),
       opt("d","Não há diferença física real — são dois nomes para o mesmo fenômeno.")],
      "a",
      "O harmônico é um múltiplo inteiro da própria frequência fundamental, originado por distorção da forma de onda. A banda lateral surge de modulação de amplitude entre duas frequências distintas, aparecendo como picos simétricos ao redor de uma portadora, espaçados pela frequência moduladora."),
    Q("Um espectro mostra um pico grande na frequência de engrenamento (GMF), com dois picos menores simétricos ao seu redor, espaçados de 24 Hz (rotação do pinhão). O que esse padrão sugere?",
      [opt("a","Modulação da GMF pela rotação do pinhão — indicativo típico de excentricidade, desgaste ou folga associada ao pinhão."),
       opt("b","Ressonância estrutural da carcaça do redutor, sem relação com o pinhão."),
       opt("c","Desbalanceamento do próprio pinhão, sem qualquer problema de engrenamento."),
       opt("d","Erro de calibração do sensor, já que bandas laterais são sempre artefato de medição.")],
      "a",
      "O espaçamento das bandas laterais em 24 Hz aponta exatamente para o eixo do pinhão como fonte da modulação — indicativo típico de excentricidade, desgaste ou folga associada a esse eixo."),
    Q("Por que a comparação de fase é útil para diferenciar desbalanceamento de desalinhamento, mesmo quando ambos produzem picos em 1X e 2X?",
      [opt("a","Porque desbalanceamento tende a produzir vibração em fase, enquanto desalinhamento angular tende a produzir diferença de fase próxima de 180° através do acoplamento."),
       opt("b","Porque a fase só pode ser medida em desbalanceamento, nunca em desalinhamento."),
       opt("c","Porque a amplitude do desbalanceamento é sempre maior que a do desalinhamento, tornando a fase irrelevante."),
       opt("d","Porque desalinhamento nunca produz picos em 1X, apenas em 2X.")],
      "a",
      "A relação de fase entre pontos de medição revela o padrão de movimento da máquina: desbalanceamento tende a produzir vibração em fase, enquanto desalinhamento angular tende a produzir diferença de fase próxima de 180° através do acoplamento."),
]

CONVERTED["m6"] = [
    Q("Uma bomba apresenta pico dominante em 2X RPM na direção axial (maior que 1X), com diferença de fase de ~180° entre os dois lados do acoplamento na direção axial. Qual é o diagnóstico e a ação corretiva recomendada?",
      [opt("a","Desalinhamento (angular, dado o forte componente axial) — realinhamento do eixo, de preferência a laser, verificando soft foot antes do alinhamento final."),
       opt("b","Desbalanceamento do rotor — balanceamento de campo em um ou dois planos."),
       opt("c","Folga mecânica no mancal — reaperto dos parafusos de fixação."),
       opt("d","Ressonância estrutural — reforço da base da bomba.")],
      "a",
      "O padrão (2X axial dominante, ~180° de diferença de fase através do acoplamento) é característico de desalinhamento angular. Ação recomendada: realinhamento a laser, verificando soft foot antes do alinhamento final."),
    Q("Um motor apresenta série completa de harmônicos (1X a 6X) mais sub-harmônicos em 0,5X, 1,5X e 2,5X, com fase instável entre medições sucessivas. Que tipo de defeito é esse e qual subtipo é mais consistente com a fase instável?",
      [opt("a","Folga mecânica; Tipo C (ajuste impróprio entre componentes rotativos e seus assentos), que tende a mudar de posição a cada partida."),
       opt("b","Desbalanceamento severo; Tipo A, sempre com fase estável entre partidas."),
       opt("c","Defeito de rolamento em Estágio 4; sempre com fase perfeitamente repetível."),
       opt("d","Ressonância estrutural; Tipo B, com fase que varia suavemente com a temperatura.")],
      "a",
      "É um padrão de folga mecânica; a fase instável e variável de uma medição para outra é mais consistente com o Tipo C (ajuste impróprio entre componentes rotativos e seus assentos, como folga em bucha ou mancal frouxo)."),
    Q("Como distinguir, na prática, um pico de ressonância de um pico de desbalanceamento em 1X, ambos na mesma faixa de frequência?",
      [opt("a","Variando a rotação (partida/parada) ou fazendo um teste de impacto: a frequência de ressonância não muda com a velocidade, enquanto o pico de 1X se desloca proporcionalmente à rotação."),
       opt("b","Medindo apenas a amplitude: ressonância é sempre menor que desbalanceamento."),
       opt("c","Ressonância só ocorre em máquinas elétricas; desbalanceamento só em máquinas mecânicas."),
       opt("d","Não é possível diferenciar sem parar definitivamente a máquina para inspeção interna.")],
      "a",
      "Variando a rotação (partida/parada) ou com teste de impacto: a frequência de ressonância permanece fixa independentemente da velocidade, enquanto o pico de desbalanceamento (1X) se desloca proporcionalmente à rotação. Em ressonância, a fase também varia cerca de 90° ao redor da frequência natural."),
]

CONVERTED["m7"] = [
    Q("Por que a técnica de envelope é mais sensível do que o espectro de vibração convencional para detectar um defeito incipiente de rolamento?",
      [opt("a","Porque isola a modulação de amplitude causada pelos impactos do defeito, demodulando uma banda de alta frequência onde a relação sinal-ruído é maior, sem interferência de componentes de baixa frequência."),
       opt("b","Porque o envelope sempre mede em uma faixa de frequência mais ampla que o espectro convencional."),
       opt("c","Porque o envelope substitui completamente a necessidade de medir velocidade ou aceleração."),
       opt("d","Porque o envelope é menos sensível a ruído elétrico do cabo do sensor.")],
      "a",
      "O envelope isola a modulação de amplitude causada pelos impactos do defeito, demodulando uma banda de alta frequência (onde a relação sinal-ruído para o defeito é maior) e trazendo a frequência de repetição do impacto para um espectro limpo — revelando o defeito antes que apareça no espectro convencional."),
    Q("Um espectro mostra picos em 3,5X, 7X e 10,5X RPM (BPFO = 3,5X), cada um cercado por bandas laterais em 1X RPM. Em que estágio de falha a máquina está, e o que as bandas laterais sugerem?",
      [opt("a","Estágio 3 (defeito estabelecido) — as bandas em 1X indicam que o defeito está sendo modulado pela rotação do eixo, reforçando a confiança no diagnóstico."),
       opt("b","Estágio 1 (submicroscópico) — as bandas indicam apenas ruído elétrico da rede."),
       opt("c","Estágio 2 (início na pista) — as bandas indicam falha iminente do motor elétrico."),
       opt("d","Estágio 4 (iminente) — as bandas indicam que o rolamento já falhou completamente.")],
      "a",
      "Os picos em 1×, 2× e 3× BPFO caracterizam o Estágio 3 (defeito estabelecido). As bandas laterais em 1X RPM indicam que o defeito está sendo modulado pela rotação do próprio eixo, o que é esperado e reforça a confiança no diagnóstico."),
    Q("Cite os quatro estágios de evolução de falha de rolamento e o parâmetro mais indicado para detectar cada um.",
      [opt("a","1: Spike Energy/HFD (ultrassônico); 2: bandas laterais via envelope; 3: picos discretos de BPFO/BPFI/BSF/FTF no espectro; 4: piso de ruído elevado, Spike Energy dispara imediatamente antes da falha."),
       opt("b","Os quatro estágios são detectados igualmente bem por qualquer um dos parâmetros — não há diferença prática entre eles."),
       opt("c","1: temperatura do mancal; 2: cor do óleo; 3: ruído audível; 4: parada total da máquina."),
       opt("d","Os estágios só podem ser diferenciados por análise de óleo, nunca por vibração.")],
      "a",
      "Estágio 1 (submicroscópico): Spike Energy/HFD/Shock Pulse. Estágio 2 (início na pista): bandas laterais via envelope/demodulação. Estágio 3 (estabelecido): picos discretos de BPFO/BPFI/BSF/FTF no espectro convencional. Estágio 4 (iminente): piso de ruído elevado; Spike Energy dispara imediatamente antes da falha."),
]

CONVERTED["m8"] = [
    Q("Um redutor apresenta GMF com bandas laterais regulares e de alta amplitude, espaçadas na rotação do pinhão. A amplitude de GMF diminui quando a carga aumenta. Qual é o diagnóstico mais provável?",
      [opt("a","Folga no engrenamento — a queda de amplitude de GMF com aumento de carga é assinatura típica de folga, não de desgaste progressivo."),
       opt("b","Desgaste progressivo do dente, que sempre aumenta de amplitude com o aumento de carga."),
       opt("c","Ressonância da carcaça do redutor, sem relação com o engrenamento."),
       opt("d","Desbalanceamento do pinhão, sem qualquer problema de engrenamento.")],
      "a",
      "O espaçamento das bandas laterais aponta o pinhão como fonte da modulação, e a queda de amplitude de GMF com o aumento de carga é assinatura típica de folga no engrenamento — não de desgaste progressivo."),
    Q("Por que o dente trincado é mais bem confirmado na forma de onda no tempo do que no espectro?",
      [opt("a","Porque o impacto é um evento discreto e breve que aparece nítido na forma de onda como pico isolado a cada volta do eixo danificado; no espectro essa energia se distribui e fica mais difusa."),
       opt("b","Porque o espectro não consegue medir frequências acima de 1X."),
       opt("c","Porque a forma de onda no tempo tem resolução de frequência maior que o espectro."),
       opt("d","Porque dentes trincados só geram vibração em direção axial, nunca radial.")],
      "a",
      "O impacto do dente trincado é um evento discreto e breve, que aparece nítido na forma de onda como pico isolado a cada volta do eixo danificado — no espectro, essa energia se distribui entre 1X e a frequência natural excitada com bandas laterais, tornando o sinal mais difuso."),
    Q("Em que situação é necessário aumentar o Fmax da medição para diagnosticar corretamente um problema de engrenagem?",
      [opt("a","Quando há suspeita de desalinhamento do engrenamento, que excita predominantemente o segundo harmônico de GMF (2×GMF) ou superior."),
       opt("b","Sempre, independentemente do tipo de defeito suspeito."),
       opt("c","Apenas quando a engrenagem é do tipo helicoidal, nunca em engrenagens retas."),
       opt("d","Nunca — o Fmax padrão de fábrica é sempre suficiente para qualquer defeito de engrenagem.")],
      "a",
      "Quando o desalinhamento do engrenamento é a suspeita, pois esse defeito costuma excitar predominantemente o segundo harmônico de GMF (2×GMF) ou superior, exigindo Fmax suficiente para capturar pelo menos essa faixa."),
]

CONVERTED["m9"] = [
    Q("Um ventilador acionado por correias em V apresenta pico dominante em 2× a frequência da correia, com amplitude instável, pulsando com a rotação do motor. O que isso indica e qual a ação recomendada?",
      [opt("a","Correia gasta, frouxa ou desigual — inspeção visual, verificação de tensão e substituição se houver desgaste/trinca visível."),
       opt("b","Desalinhamento das polias — realinhamento a laser das polias motora e movida."),
       opt("c","Desbalanceamento do motor — balanceamento de campo do rotor."),
       opt("d","Defeito de rolamento do motor — troca do rolamento.")],
      "a",
      "Indica correia gasta, frouxa ou desigual (defeito característico da própria correia). Ação recomendada: inspeção visual, verificação de tensão e substituição se houver desgaste ou trinca visível."),
    Q("Como diferenciar, na prática, uma ressonância de correia de um desalinhamento de polias?",
      [opt("a","A ressonância de correia responde a mudanças de tensão/comprimento livre (a frequência natural se desloca); o desalinhamento se manifesta como vibração axial em 1X que não muda com a tensão, só com o realinhamento."),
       opt("b","Ambos respondem exatamente da mesma forma à tensão da correia, sendo indistinguíveis em campo."),
       opt("c","A ressonância de correia só ocorre em correias novas; o desalinhamento só em correias antigas."),
       opt("d","O desalinhamento de polias nunca produz vibração axial, apenas radial.")],
      "a",
      "A ressonância de correia responde a mudanças de tensão e comprimento livre da correia (a frequência natural se desloca ao tensionar/destensionar), enquanto o desalinhamento de polias se manifesta como vibração axial em 1X RPM que muda com a correção do alinhamento, não com a tensão da correia."),
]

CONVERTED["m10"] = [
    Q("Um motor de 60 Hz apresenta pico elevado exatamente em 120 Hz, que desaparece assim que o motor é desligado. Qual é o diagnóstico e qual parâmetro de projeto deve ser verificado?",
      [opt("a","Problema no estator (entreferro desigual/excentricidade do estator) — verificar o entreferro diferencial, que não deve exceder cerca de 5% em motores de indução."),
       opt("b","Defeito de rolamento em Estágio 4 — verificar a folga radial interna do rolamento."),
       opt("c","Desbalanceamento do rotor — verificar a massa de correção necessária."),
       opt("d","Folga mecânica na base do motor — verificar o torque dos parafusos de fixação.")],
      "a",
      "Diagnóstico: problema no estator, tipicamente entreferro desigual entre rotor e estator (excentricidade do estator). Deve-se verificar o entreferro diferencial, que não deve exceder cerca de 5% em motores de indução."),
    Q("Por que o teste de \"desligar e observar\" é tão útil para separar causas elétricas de causas mecânicas?",
      [opt("a","Vibrações eletromagnéticas cessam no instante em que a corrente é cortada; vibrações mecânicas persistem por alguns segundos, decaindo gradualmente com a máquina em roda livre."),
       opt("b","Porque vibrações mecânicas cessam instantaneamente e as elétricas persistem por minutos."),
       opt("c","Porque esse teste só funciona em motores de corrente contínua, não em motores de indução."),
       opt("d","Porque desligar o motor sempre elimina qualquer vibração remanescente, seja qual for a causa.")],
      "a",
      "Vibrações de origem eletromagnética dependem da energização do motor e desaparecem no instante em que a corrente é cortada, enquanto vibrações de origem mecânica (desbalanceamento, desalinhamento, rolamento) persistem por alguns segundos após o desligamento, decaindo gradualmente."),
]

CONVERTED["m11"] = [
    Q("Uma bomba centrífuga com 6 pás, girando a 1800 rpm, apresenta pico anômalo em 180 Hz. A que fenômeno isso corresponde e o que deve ser investigado?",
      [opt("a","Frequência de passagem de pás (BPF = 6 × 30 Hz); investigar folga pás/difusores, coincidência com frequência natural, desgaste do impelidor ou obstrução no fluxo."),
       opt("b","4ª ordem de rotação (4X); investigar exclusivamente desbalanceamento do impelidor."),
       opt("c","Frequência de engrenamento de um redutor interno; investigar desgaste de dentes."),
       opt("d","Ressonância elétrica da rede de alimentação; investigar o painel elétrico do motor.")],
      "a",
      "1800 rpm = 30 Hz de rotação; BPF = 6 pás × 30 Hz = 180 Hz. Deve-se investigar folga entre pás e difusores, possível coincidência com frequência natural do sistema, desgaste do impelidor ou obstrução no fluxo."),
    Q("Como diferenciar, no espectro e em campo, cavitação de um simples aumento de amplitude de BPF por desgaste do impelidor?",
      [opt("a","Cavitação aparece como energia aleatória de banda larga sobreposta aos harmônicos de BPF, com ruído de \"pedras\" e baixa pressão de sucção; desgaste do impelidor eleva picos discretos e estreitos, sem piso de ruído aleatório."),
       opt("b","Cavitação só ocorre em bombas novas; desgaste do impelidor só em bombas com mais de 10 anos de uso."),
       opt("c","Ambas produzem exatamente o mesmo padrão espectral, sendo indistinguíveis sem abrir a bomba."),
       opt("d","Cavitação eleva apenas a temperatura da bomba, sem qualquer assinatura vibratória.")],
      "a",
      "A cavitação se manifesta como energia aleatória de banda larga (não um pico discreto), tipicamente sobreposta aos harmônicos de BPF, com ruído característico de \"pedras\" e frequentemente correlacionada com NPSH insuficiente. O desgaste do impelidor aparece como elevação de amplitude em picos discretos e estreitos, sem o piso de ruído aleatório."),
]

with open("/tmp/_quiz_conversion_1.json", "w", encoding="utf-8") as f:
    json.dump(CONVERTED, f, ensure_ascii=False)
print("OK — módulos convertidos:", list(CONVERTED.keys()))
total = sum(len(v) for v in CONVERTED.values())
print("total perguntas convertidas nesta parte:", total)
