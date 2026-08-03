#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rodada J (item 3): adiciona 9 novos casos (lc11-lc19) à seção "Engenheiro de
Lubrificação" da Prática de Diagnóstico:
  - 4 no formato "laudo de análise de óleo" completo (estrutura inspirada em
    laboratórios reais como LUBRIN/PURILUB: cabeçalho de amostra, físico-química,
    metais de desgaste, aditivos, contagem de partículas, parecer técnico);
  - 5 exercícios visuais de ferrografia analítica / tribologia (identificação de
    mecanismo de desgaste a partir de diagrama de morfologia de partícula, e
    leitura do código LIS numa etiqueta).
"""
import json, re

def opt(i, text, solution):
    return {"id": i, "text": text, "solution": solution}

CASES = []

# ------------------------------------------------------------------
# lc11 - LAUDO LUBRIN - compressor de parafuso - verniz / RULER / MPC
# ------------------------------------------------------------------
CASES.append({
  "id": "lc11", "num": 11, "level": "avançado",
  "relatedModule": "mlub10", "relatedModuleLabel": "Módulo L10 — Verniz, RULER e RPVOT",
  "title": "Compressor de parafuso com histórico de travamento de válvulas",
  "briefing": [
    "Compressor de parafuso rotativo lubrificado a óleo mineral, operação contínua 24/7 há 3 anos com o mesmo óleo (troca prevista apenas em parada programada anual).",
    "Manutenção relata dificuldade crescente de movimentação da válvula de admissão e depósitos amarronzados no visor de nível.",
    "Óleo não trocado nos últimos 14 meses (acima do intervalo de 12 meses recomendado pelo fabricante)."
  ],
  "laudo": {
    "lab": "LUBRIN — Laboratório de Análise de Lubrificantes", "numero": "LB-24-08841",
    "sample": {"equipamento": "Compressor de parafuso #2", "ponto": "Cárter, após separador de óleo",
               "lubrificante": "Mineral ISO VG 68 (grupo II)", "dataColeta": "22/07/2026",
               "dataAnalise": "25/07/2026", "horasOleo": "≈ 10.200 h (14 meses)"},
    "physChem": [
      {"param": "Viscosidade a 40 °C", "result": "74,8 cSt", "ref": "68,0 cSt", "status": "warn"},
      {"param": "TAN (número de acidez total)", "result": "1,8 mg KOH/g", "ref": "0,25 mg KOH/g", "status": "crit"},
      {"param": "MPC (Membrane Patch Colorimetry, ΔE)", "result": "58", "ref": "< 20 (limite de alerta)", "status": "crit"},
      {"param": "RULER — % de antioxidante remanescente", "result": "12%", "ref": "> 25% (alerta abaixo disso)", "status": "crit"},
      {"param": "Água (Karl Fischer)", "result": "145 ppm", "ref": "< 200 ppm", "status": "ok"},
    ],
    "wearMetals": [
      {"param": "Fe (ferro)", "result": "18 ppm", "ref": "< 10 ppm", "status": "warn"},
      {"param": "Cu (cobre)", "result": "6 ppm", "ref": "< 5 ppm", "status": "warn"},
    ],
    "additives": [
      {"param": "Zn (zinco, antidesgaste)", "result": "410 ppm", "ref": "480 ppm", "status": "warn"},
      {"param": "Ca (cálcio, detergente)", "result": "890 ppm", "ref": "950 ppm", "status": "ok"},
    ],
    "particleCount": [{"param": "ISO 4406", "result": "19/17/14", "ref": "18/16/13", "status": "warn"}],
    "opinion": "Óleo em estágio avançado de degradação oxidativa: TAN muito elevado, MPC muito acima do limite de alerta (formação de verniz confirmada) e RULER indicando depleção severa do pacote de antioxidantes (12% remanescente). Recomenda-se troca imediata do óleo e limpeza do sistema (flush) para remoção de depósitos de verniz já formados nas válvulas, revisão do intervalo de troca para esse regime de operação contínua."
  },
  "diagnosisOptions": [
    opt("a", "Formação de verniz por degradação oxidativa, com depleção do pacote de antioxidantes",
        "Correto — o conjunto TAN alto + MPC muito elevado (ΔE=58) + RULER baixo (12% de antioxidante remanescente) é a assinatura clássica de formação de verniz por oxidação avançada do óleo, consistente com uso muito além do intervalo recomendado."),
    opt("b", "Contaminação por água livre",
        "Incorreto neste caso — o teor de água (145 ppm) está dentro da faixa normal (abaixo de 200 ppm); não há evidência de água livre ou emulsionada."),
    opt("c", "Desgaste abrasivo severo por partículas externas",
        "Incorreto como causa primária — o ISO 4406 está apenas levemente acima do alvo (19/17/14 vs. 18/16/13) e os metais de desgaste (Fe, Cu) estão só discretamente elevados; o padrão dominante nos resultados é de degradação química do óleo, não abrasão."),
    opt("d", "Diluição do óleo por combustível ou solvente",
        "Incorreto — a viscosidade está mais ALTA que a referência (74,8 vs. 68,0 cSt), o oposto do que se esperaria de diluição por combustível (que reduziria a viscosidade); o aumento de viscosidade é consistente com espessamento por produtos de oxidação."),
  ],
  "correctDiagnosis": "a",
  "hint": "Observe três testes específicos juntos: TAN, MPC e RULER — todos apontando na mesma direção sobre a saúde química do óleo, não sobre contaminação externa.",
  "explanation": "O TAN muito elevado (1,8 vs. 0,25 mg KOH/g) indica degradação oxidativa avançada. O MPC de 58 (bem acima do limite de alerta de ~20) confirma formação de verniz — produtos de oxidação insolúveis já presentes em quantidade significativa. O RULER de apenas 12% de antioxidante remanescente mostra que o pacote de proteção contra oxidação está quase esgotado, o que acelera ainda mais a degradação a partir daqui. O uso do óleo por 14 meses (acima do intervalo de 12 recomendado) em operação contínua 24/7 é a causa raiz mais provável.",
  "cause": "Uso do óleo além do intervalo de troca recomendado (14 vs. 12 meses) em regime de operação contínua e alta temperatura, levando ao esgotamento do pacote de antioxidantes e à oxidação avançada com formação de verniz.",
  "action": "Trocar o óleo imediatamente; realizar limpeza (flush) do sistema para remover depósitos de verniz já formados, com atenção especial à válvula de admissão; revisar o intervalo de troca para esse regime de operação, considerando monitoramento por RULER/MPC a cada troca futura.",
  "checks": []
})

# ------------------------------------------------------------------
# lc12 - LAUDO PURILUB - redutor industrial - ferrografia com Fe/Cr elevado
# ------------------------------------------------------------------
CASES.append({
  "id": "lc12", "num": 12, "level": "avançado",
  "relatedModule": "mlub8", "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
  "title": "Redutor de esteira transportadora com tendência crescente de metais de desgaste",
  "briefing": [
    "Redutor de engrenagens helicoidais de uma esteira transportadora de minério, monitorado trimestralmente há 2 anos.",
    "As últimas 3 análises mostram Fe e Cr subindo de forma consistente, sem mudança de carga ou processo reportada.",
    "Ferrografia analítica solicitada como complemento à espectroscopia de rotina, dado o padrão de tendência."
  ],
  "laudo": {
    "lab": "PURILUB — Laboratório de Análise de Óleo", "numero": "PL-26-01523",
    "sample": {"equipamento": "Redutor esteira TR-04", "ponto": "Bujão de dreno inferior",
               "lubrificante": "Óleo de engrenagens ISO VG 320", "dataColeta": "18/07/2026",
               "dataAnalise": "21/07/2026", "horasOleo": "≈ 2.100 h"},
    "physChem": [
      {"param": "Viscosidade a 40 °C", "result": "318 cSt", "ref": "320 cSt", "status": "ok"},
      {"param": "TAN", "result": "0,6 mg KOH/g", "ref": "0,4 mg KOH/g", "status": "ok"},
      {"param": "Água (Karl Fischer)", "result": "95 ppm", "ref": "< 300 ppm", "status": "ok"},
    ],
    "wearMetals": [
      {"param": "Fe (ferro) — tendência 3 análises", "result": "42 → 68 → 105 ppm", "ref": "< 30 ppm", "status": "crit"},
      {"param": "Cr (cromo) — tendência 3 análises", "result": "3 → 6 → 11 ppm", "ref": "< 3 ppm", "status": "crit"},
      {"param": "Cu (cobre)", "result": "4 ppm", "ref": "< 8 ppm", "status": "ok"},
    ],
    "additives": [{"param": "Zn/P (pacote EP)", "result": "estável nas 3 análises", "ref": "estável", "status": "ok"}],
    "particleCount": [{"param": "Ferrografia analítica — índice de severidade (Is)", "result": "elevado, com predominância de partículas laminares", "ref": "baixo, predomínio de esferas/óxidos finos", "status": "crit"}],
    "opinion": "Tendência consistente e crescente de Fe e Cr ao longo de 3 análises sucessivas, sem alteração significativa de viscosidade, TAN ou pacote de aditivos — quadro compatível com desgaste mecânico progressivo (não com degradação química do óleo). A ferrografia analítica confirmando predominância de partículas laminares reforça a hipótese de fadiga superficial em estágio avançado no engrenamento. Recomenda-se inspeção física do redutor e planejamento de reparo/substituição em prazo curto."
  },
  "photo": "assets/img/ferro_B_laminar.png",
  "photoCaption": "Ferrografia analítica da amostra: partículas predominantemente laminares — diagrama esquemático ilustrativo.",
  "diagnosisOptions": [
    opt("a", "Fadiga superficial avançada (lascamento) no engrenamento",
        "Correto — a tendência crescente e consistente de Fe e Cr (sem qualquer sinal de degradação química do óleo) combinada com a predominância de partículas laminares na ferrografia é a assinatura clássica de fadiga superficial já em estágio avançado (spalling)."),
    opt("b", "Contaminação por partículas externas (poeira/areia)",
        "Incorreto — não há elevação de silício (Si) reportada, e o padrão de partículas (laminares, não angulares/silicosas) não é o esperado para contaminação abrasiva externa."),
    opt("c", "Degradação oxidativa do óleo",
        "Incorreto — TAN e viscosidade estão estáveis e dentro da referência; o padrão de degradação química não está presente neste laudo."),
    opt("d", "Esgotamento do pacote de aditivos EP",
        "Incorreto — o próprio laudo indica que o pacote Zn/P permaneceu estável ao longo das 3 análises, descartando essa hipótese como causa do desgaste observado."),
  ],
  "correctDiagnosis": "a",
  "hint": "Compare a tendência de Fe/Cr entre as 3 análises com o resultado da ferrografia — os dois contam a mesma história sobre o TIPO de desgaste, não apenas sobre a quantidade.",
  "explanation": "A tendência crescente e consistente de Fe (42→68→105 ppm) e Cr (3→6→11 ppm), sem qualquer alteração relevante de viscosidade, TAN ou pacote de aditivos, indica que a causa é mecânica (desgaste), não química. A ferrografia confirmando predominância de partículas laminares (e não esféricas, que indicariam fadiga inicial ainda subsuperficial) mostra que o processo de fadiga já está em estágio avançado, com lascamento (spalling) ativo na superfície dos dentes.",
  "cause": "Fadiga superficial progressiva no engrenamento, provavelmente iniciada por sobrecarga cíclica ou desalinhamento, evoluindo de fadiga subsuperficial para lascamento ativo (spalling) na superfície de contato dos dentes.",
  "action": "Programar inspeção física do redutor (boroscopia ou abertura) com urgência para confirmar extensão do dano; planejar reparo ou substituição das engrenagens afetadas em prazo curto; investigar causa raiz (alinhamento, carga, ciclo de operação) para evitar recorrência após o reparo.",
  "checks": []
})

# ------------------------------------------------------------------
# lc13 - LAUDO LUBRIN - motor a diesel de gerador - TAN alto + diluição combustível
# ------------------------------------------------------------------
CASES.append({
  "id": "lc13", "num": 13, "level": "intermediário",
  "relatedModule": "mlub7", "relatedModuleLabel": "Módulo L7 — Amostragem e Análise de Óleo",
  "title": "Grupo gerador a diesel com viscosidade em queda progressiva",
  "briefing": [
    "Motor a diesel de grupo gerador de emergência, testado semanalmente em vazio por 15 minutos e ocasionalmente sob carga em falhas de energia.",
    "As últimas 3 análises trimestrais mostram viscosidade caindo de forma consistente.",
    "Operador relata que o motor às vezes demora mais que o normal para atingir temperatura de operação nos testes semanais."
  ],
  "laudo": {
    "lab": "LUBRIN — Laboratório de Análise de Lubrificantes", "numero": "LB-26-03390",
    "sample": {"equipamento": "Motor diesel gerador GE-01", "ponto": "Vareta de nível / cárter",
               "lubrificante": "Óleo para motor diesel 15W-40", "dataColeta": "10/07/2026",
               "dataAnalise": "13/07/2026", "horasOleo": "≈ 180 h"},
    "physChem": [
      {"param": "Viscosidade a 100 °C — tendência 3 análises", "result": "14,1 → 12,8 → 10,9 cSt", "ref": "14,5 cSt (novo)", "status": "crit"},
      {"param": "Ponto de fulgor", "result": "178 °C", "ref": "> 200 °C (óleo novo)", "status": "crit"},
      {"param": "FTIR — combustível (diluição)", "result": "3,8% em volume", "ref": "< 2,5%", "status": "crit"},
      {"param": "TBN (número de basicidade total)", "result": "6,2 mg KOH/g", "ref": "9,5 mg KOH/g (novo)", "status": "warn"},
    ],
    "wearMetals": [{"param": "Fe (ferro)", "result": "22 ppm", "ref": "< 40 ppm (180h)", "status": "ok"}],
    "additives": [{"param": "Ca (cálcio, detergente/dispersante)", "result": "1780 ppm", "ref": "1900 ppm", "status": "ok"}],
    "particleCount": [],
    "opinion": "Queda progressiva de viscosidade nas 3 últimas análises, ponto de fulgor bem abaixo do esperado para óleo novo e FTIR confirmando diluição por combustível acima do limite de alerta — quadro típico de combustão incompleta / ciclos de operação muito curtos (partida-parada frequente sem atingir temperatura plena), consistente com o regime de testes semanais em vazio relatado. TBN em queda também merece acompanhamento, mas de forma secundária à diluição por combustível."
  },
  "diagnosisOptions": [
    opt("a", "Diluição do óleo por combustível, provavelmente associada aos ciclos curtos de operação em vazio",
        "Correto — a queda de viscosidade, o ponto de fulgor reduzido e o FTIR confirmando 3,8% de combustível (acima do limite de 2,5%) formam um quadro conclusivo de diluição por combustível, coerente com o regime de testes semanais curtos que não permitem o motor atingir temperatura plena (favorecendo combustão incompleta)."),
    opt("b", "Cisalhamento mecânico do melhorador de índice de viscosidade (VI improver)",
        "Incorreto como causa principal — embora seja uma hipótese válida para queda de viscosidade em geral, o FTIR já identifica diretamente a diluição por combustível como o mecanismo presente neste caso; o cisalhamento de VI improver não é confirmado por nenhum teste específico no laudo."),
    opt("c", "Contaminação por água de resfriamento (falha de junta de cabeçote)",
        "Incorreto — não há teste de água (Karl Fischer ou crackle) reportado como elevado neste laudo; o padrão de evidências aponta para combustível, não para água."),
    opt("d", "Desgaste anormal de camisas e anéis",
        "Incorreto como causa raiz — o Fe está dentro da faixa esperada para as horas de uso (22 ppm, abaixo de 40 ppm); não há evidência de desgaste anormal neste laudo."),
  ],
  "correctDiagnosis": "a",
  "hint": "Três resultados devem ser lidos em conjunto: viscosidade caindo, ponto de fulgor baixo e o teste que aponta diretamente a causa química (FTIR).",
  "explanation": "A queda progressiva de viscosidade (14,1→12,8→10,9 cSt) combinada com ponto de fulgor bem abaixo do esperado para óleo novo (178 vs. >200 °C) e FTIR confirmando 3,8% de combustível no óleo (acima do limite de alerta de 2,5%) são evidências convergentes de diluição por combustível. O regime de operação relatado (testes semanais curtos em vazio) favorece combustão incompleta e recondensação de combustível não queimado no cárter, mecanismo clássico de diluição em geradores de emergência testados dessa forma.",
  "cause": "Ciclos de teste semanais curtos e em vazio, que não permitem ao motor atingir temperatura plena de operação, favorecendo combustão incompleta e diluição progressiva do óleo por combustível não queimado.",
  "action": "Revisar o protocolo de teste semanal para incluir um período sob carga e tempo suficiente para atingir temperatura plena de operação; trocar o óleo diluído; monitorar viscosidade e FTIR na próxima amostra para confirmar reversão do quadro.",
  "checks": []
})

# ------------------------------------------------------------------
# lc14 - VISUAL - ferrografia - partículas de corte (cutting wear)
# ------------------------------------------------------------------
CASES.append({
  "id": "lc14", "num": 14, "level": "básico",
  "relatedModule": "mlub8", "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
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
    opt("a", "Desgaste por corte (cutting wear) — partículas em forma de lasca/espiral, semelhantes a cavacos de usinagem",
        "Correto — partículas alongadas e enroladas em espiral, parecidas com pequenos cavacos de usinagem, são a assinatura clássica de desgaste por corte: uma aspereza dura ou partícula abrasiva atuando como uma microferramenta de corte contra a superfície mais macia."),
    opt("b", "Fadiga superficial avançada (partículas laminares)",
        "Incorreto — partículas de fadiga avançada são placas finas e irregulares (like escamas), não lascas espiraladas em forma de cavaco."),
    opt("c", "Fadiga subsuperficial inicial (partículas esféricas)",
        "Incorreto — partículas de fadiga inicial são pequenas esferas metálicas lisas, com forma muito diferente das lascas alongadas mostradas aqui."),
    opt("d", "Corrosão (partículas de óxido)",
        "Incorreto — partículas de corrosão têm formato irregular e anguloso, cor avermelhada/amarronzada, e não a forma de lasca metálica brilhante mostrada aqui."),
  ],
  "correctDiagnosis": "a",
  "hint": "Pense em uma microferramenta de corte: que tipo de resíduo uma ferramenta de usinagem produz quando corta metal?",
  "explanation": "Partículas de desgaste por corte (cutting wear) têm formato característico de lasca ou cavaco, muitas vezes enrolado em espiral — resultado de uma aspereza dura, partícula abrasiva presa entre superfícies, ou desalinhamento severo atuando como uma microferramenta de corte contra a superfície oposta, mais macia. É diferente de fadiga (esférica ou laminar, dependendo do estágio) e de corrosão (irregular, avermelhada).",
  "cause": "Presença de uma aspereza dura, partícula abrasiva de terceiro corpo, ou desalinhamento severo entre superfícies, gerando corte ativo do material mais macio.",
  "action": "Investigar a origem da partícula dura/abrasiva (filtração, contaminação externa) ou o alinhamento/folga do componente; reforçar filtração se a causa for partícula de terceiro corpo; inspecionar a superfície fisicamente para confirmar a extensão do corte.",
  "checks": []
})

# ------------------------------------------------------------------
# lc15 - VISUAL - ferrografia - partículas laminares (fadiga avançada)
# ------------------------------------------------------------------
CASES.append({
  "id": "lc15", "num": 15, "level": "intermediário",
  "relatedModule": "mlub8", "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
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
    opt("a", "Fadiga superficial avançada (lascamento / spalling), com partículas laminares",
        "Correto — placas finas, planas e irregulares (partículas laminares) indicam que o processo de fadiga já evoluiu para lascamento ativo na superfície (spalling), um estágio mais avançado do que as partículas esféricas de fadiga subsuperficial inicial."),
    opt("b", "Fadiga subsuperficial inicial (partículas esféricas)",
        "Incorreto — o estágio inicial de fadiga produz pequenas esferas metálicas, não placas finas e planas como as mostradas aqui."),
    opt("c", "Desgaste por corte (cutting wear)",
        "Incorreto — partículas de corte têm formato de lasca alongada/espiralada, como um cavaco de usinagem, não placas finas e planas."),
    opt("d", "Desgaste adesivo severo (scuffing/scoring)",
        "Incorreto — embora também seja um modo de desgaste severo, o scuffing tipicamente produz partículas maiores e mais irregulares, associadas a transferência de material entre superfícies, com aparência diferente das placas lisas e finas mostradas."),
  ],
  "correctDiagnosis": "a",
  "hint": "Pense na evolução do dano: esferas pequenas aparecem primeiro (fadiga subsuperficial); o que aparece quando o material começa a se desprender em placas da superfície?",
  "explanation": "Partículas laminares — placas finas, planas e de bordas irregulares — indicam fadiga superficial em estágio avançado, com lascamento (spalling) já ativo na superfície de rolamento ou engrenamento. É a evolução natural do processo de fadiga: inicia-se subsuperficialmente (gerando partículas esféricas na fase inicial) e, ao se propagar até a superfície, passa a liberar essas placas laminares características de dano já estabelecido.",
  "cause": "Fadiga de contato de rolamento progredindo de trincas subsuperficiais para lascamento ativo na superfície, geralmente associada a sobrecarga cíclica prolongada ou lubrificação inadequada ao longo do tempo.",
  "action": "Tratar como defeito em estágio avançado: planejar inspeção física e reparo/substituição em prazo curto, não apenas continuar o monitoramento de rotina; investigar causa raiz (carga, lubrificação, alinhamento) para evitar recorrência.",
  "checks": []
})

# ------------------------------------------------------------------
# lc16 - VISUAL - ferrografia - partículas esféricas (fadiga inicial)
# ------------------------------------------------------------------
CASES.append({
  "id": "lc16", "num": 16, "level": "básico",
  "relatedModule": "mlub8", "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
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
    opt("a", "Fadiga subsuperficial inicial — partículas esféricas",
        "Correto — pequenas esferas metálicas lisas são a assinatura clássica do estágio inicial de fadiga de contato de rolamento: formam-se quando uma trinca subsuperficial se propaga e, ao encontrar outra trinca ou a superfície, libera material fundido/arredondado pela pressão de contato."),
    opt("b", "Fadiga superficial avançada — partículas laminares",
        "Incorreto — esse estágio mais avançado produz placas finas e irregulares, não esferas."),
    opt("c", "Desgaste por corte — partículas em lasca",
        "Incorreto — partículas de corte têm formato alongado, como pequenos cavacos, bem diferente das esferas lisas mostradas."),
    opt("d", "Corrosão — partículas de óxido",
        "Incorreto — partículas de óxido têm formato irregular e anguloso, tipicamente de cor avermelhada, não esferas metálicas lisas."),
  ],
  "correctDiagnosis": "a",
  "hint": "Pense no formato mais simples e mais \"limpo\" que uma partícula de desgaste pode ter — geometricamente, qual é essa forma?",
  "explanation": "As partículas esféricas são o sinal ferrográfico mais precoce de fadiga de contato de rolamento: originam-se de trincas subsuperficiais que se propagam paralelamente à superfície e, ao se encontrarem, liberam pequenas esferas de material sob a alta pressão de contato. É um sinal de alerta precoce, mas ainda não indica dano superficial visível — o acompanhamento é recomendado, mas geralmente sem necessidade de parada imediata.",
  "cause": "Início do processo natural de fadiga de contato de rolamento — trincas subsuperficiais formando-se sob tensão cíclica de cisalhamento, ainda em estágio inicial.",
  "action": "Aumentar a frequência de monitoramento (ferrografia e vibração) para acompanhar a evolução; não é necessário parar a máquina neste estágio, mas o acompanhamento próximo é essencial para detectar a transição para partículas laminares (estágio mais avançado).",
  "checks": []
})

# ------------------------------------------------------------------
# lc17 - VISUAL - leitura de etiqueta LIS (tribologia / identificação de lubrificante)
# ------------------------------------------------------------------
CASES.append({
  "id": "lc17", "num": 17, "level": "básico",
  "relatedModule": "mlub9", "relatedModuleLabel": "Módulo L9 — LIS — Identificação de Lubrificantes",
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
    opt("a", "A cor indica a faixa de viscosidade de referência, e a forma geométrica indica o tipo de lubrificante/espessante",
        "Correto — no sistema LIS, a cor de fundo é associada a uma faixa de viscosidade de referência, e a forma geométrica (círculo, triângulo, quadrado, etc.) identifica o tipo de lubrificante ou de espessante de graxa — juntas, permitem identificação visual rápida e independente da marca comercial."),
    opt("b", "A cor indica o fabricante do lubrificante, e a forma indica o preço do produto",
        "Incorreto — o sistema LIS é deliberadamente independente de marca/fabricante; seu objetivo é justamente evitar a dependência de rótulos comerciais específicos."),
    opt("c", "A cor e a forma servem apenas como decoração, sem função técnica",
        "Incorreto — cor e forma são elementos centrais e funcionais do sistema, permitindo identificação visual rápida no ponto de lubrificação, mesmo à distância."),
    opt("d", "A cor indica a data da última troca, e a forma indica o técnico responsável",
        "Incorreto — essas informações não fazem parte do código visual do sistema LIS, que se concentra na identificação técnica do lubrificante correto para aquele ponto."),
  ],
  "correctDiagnosis": "a",
  "hint": "Pense no principal objetivo do sistema LIS: evitar erros de aplicação do lubrificante errado, independentemente de qual marca está disponível no estoque.",
  "explanation": "O sistema LIS combina cor (associada a uma faixa de viscosidade de referência) e forma geométrica (associada ao tipo de lubrificante/espessante) para permitir identificação visual rápida e inequívoca do lubrificante correto em cada ponto de lubrificação — sem depender do nome comercial ou marca disponível no momento. Isso reduz drasticamente o risco de erro de aplicação (lubrificante errado), um dos problemas mais comuns e custosos em plantas industriais.",
  "cause": "Não aplicável — este é um exercício de leitura/interpretação de um sistema de identificação visual, não um diagnóstico de falha.",
  "action": "Ao implementar o sistema LIS numa planta, garantir que a etiqueta de cada ponto de lubrificação corresponda exatamente ao lubrificante especificado no plano de lubrificação, e treinar a equipe para reconhecer cor+forma antes de aplicar qualquer lubrificante.",
  "checks": []
})

# ------------------------------------------------------------------
# lc18 - LAUDO PURILUB - turbina a vapor - água livre
# ------------------------------------------------------------------
CASES.append({
  "id": "lc18", "num": 18, "level": "avançado",
  "relatedModule": "mlub6", "relatedModuleLabel": "Módulo L6 — Contaminação e Filtração",
  "title": "Turbina a vapor com aparência turva no óleo de mancais",
  "briefing": [
    "Turbina a vapor de contrapressão, sistema de óleo de mancais com reservatório de grande volume e trocador de calor água/óleo integrado.",
    "Operador reporta aparência turva/leitosa do óleo no visor de nível do reservatório desde a última parada para manutenção do trocador de calor.",
    "Vazamento no trocador de calor água/óleo é suspeita levantada pela equipe de manutenção, mas ainda não confirmada fisicamente."
  ],
  "laudo": {
    "lab": "PURILUB — Laboratório de Análise de Óleo", "numero": "PL-26-02207",
    "sample": {"equipamento": "Turbina a vapor TG-01 — mancais", "ponto": "Reservatório de óleo, antes do filtro",
               "lubrificante": "Óleo para turbinas ISO VG 32", "dataColeta": "27/07/2026",
               "dataAnalise": "29/07/2026", "horasOleo": "≈ 6.500 h (óleo de longa duração)"},
    "physChem": [
      {"param": "Aparência", "result": "Turva/leitosa", "ref": "Límpida e brilhante", "status": "crit"},
      {"param": "Água — crackle test", "result": "Crepitação forte e imediata", "ref": "Sem crepitação", "status": "crit"},
      {"param": "Água (Karl Fischer)", "result": "2.400 ppm", "ref": "< 300 ppm", "status": "crit"},
      {"param": "Viscosidade a 40 °C", "result": "31,5 cSt", "ref": "32,0 cSt", "status": "ok"},
      {"param": "Rigidez dielétrica (relevante p/ turbinas)", "result": "reduzida", "ref": "normal", "status": "warn"},
    ],
    "wearMetals": [{"param": "Fe (ferro)", "result": "7 ppm", "ref": "< 10 ppm", "status": "ok"}],
    "additives": [{"param": "Pacote antiferrugem/antioxidante", "result": "dentro da faixa", "ref": "estável", "status": "ok"}],
    "particleCount": [],
    "opinion": "Água livre em quantidade significativa (2.400 ppm, muito acima do limite de 300 ppm), confirmada pelo crackle test com crepitação forte e imediata e pela aparência turva/leitosa característica de emulsão. Não há evidência de desgaste metálico elevado, o que descarta dano mecânico já estabelecido nos mancais neste momento. A origem mais provável, dado o contexto operacional, é vazamento no trocador de calor água/óleo do sistema de mancais. Recomenda-se ação imediata de remoção de água (centrífuga ou coalescedor) e inspeção do trocador de calor."
  },
  "diagnosisOptions": [
    opt("a", "Contaminação por água livre, provavelmente por vazamento no trocador de calor água/óleo",
        "Correto — o crackle test com crepitação forte e imediata, o Karl Fischer muito elevado (2.400 ppm) e a aparência turva/leitosa confirmam água livre em quantidade significativa; dado o contexto (trocador de calor água/óleo no mesmo sistema), essa é a origem mais provável, coerente com a suspeita já levantada pela manutenção."),
    opt("b", "Degradação oxidativa do óleo com formação de verniz",
        "Incorreto — a viscosidade está estável e não há TAN elevado reportado; o padrão de evidências (crackle test, Karl Fischer, aparência) aponta diretamente para água, não para oxidação."),
    opt("c", "Desgaste avançado dos mancais de filme de óleo",
        "Incorreto — o Fe está dentro da faixa normal (7 ppm), sem elevação que indicasse desgaste metálico significativo neste momento."),
    opt("d", "Contaminação por partículas sólidas externas",
        "Incorreto — não há elevação de código ISO 4406 ou de silício reportada; a aparência turva descrita é característica de emulsão de água, não de partículas sólidas."),
  ],
  "correctDiagnosis": "a",
  "hint": "O crackle test é um teste de campo simples e rápido — o que uma crepitação forte e imediata revela sobre a forma física da água presente no óleo?",
  "explanation": "O crackle test com crepitação forte e imediata indica água livre (não apenas dissolvida) presente em quantidade significativa. O Karl Fischer confirma numericamente (2.400 ppm, 8 vezes acima do limite de 300 ppm), e a aparência turva/leitosa é a manifestação visual clássica de emulsão água-óleo. Como o sistema tem um trocador de calor água/óleo integrado e o sintoma começou após a manutenção desse componente, o vazamento no trocador é a causa raiz mais provável — reforçando a importância de investigar essa hipótese fisicamente (teste de pressão do trocador).",
  "cause": "Provável vazamento interno no trocador de calor água/óleo do sistema de mancais, permitindo a entrada de água de resfriamento no circuito de óleo lubrificante.",
  "action": "Remover a água do óleo com urgência (centrífuga ou coalescedor — ou troca do óleo, se a contaminação for muito severa); realizar teste de pressão/estanqueidade no trocador de calor para localizar e reparar o vazamento; verificar a rigidez dielétrica antes de retornar a turbina à operação plena.",
  "checks": []
})

# ------------------------------------------------------------------
# lc19 - VISUAL - ferrografia - partículas de óxido/corrosão
# ------------------------------------------------------------------
CASES.append({
  "id": "lc19", "num": 19, "level": "intermediário",
  "relatedModule": "mlub8", "relatedModuleLabel": "Módulo L8 — Ferrografia e Gestão do Programa",
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
    opt("a", "Corrosão — partículas de óxido de ferro (ferrugem)",
        "Correto — a cor avermelhada/alaranjada característica, combinada com o formato irregular e anguloso (não metálico brilhante), é a assinatura da corrosão: óxido de ferro formado pela reação do metal com água/umidade e oxigênio, geralmente durante paradas prolongadas sem proteção adequada."),
    opt("b", "Desgaste por corte (partículas em lasca metálica)",
        "Incorreto — partículas de corte são metálicas, brilhantes e alongadas/espiraladas, sem a coloração avermelhada mostrada aqui."),
    opt("c", "Fadiga subsuperficial inicial (partículas esféricas)",
        "Incorreto — partículas de fadiga inicial são esferas metálicas lisas e brilhantes, com cor e formato completamente diferentes das partículas irregulares e avermelhadas mostradas."),
    opt("d", "Fadiga superficial avançada (partículas laminares)",
        "Incorreto — partículas laminares são placas finas e metálicas, sem a coloração de óxido característica desta amostra."),
  ],
  "correctDiagnosis": "a",
  "hint": "Entre os quatro mecanismos estudados no Módulo L8, apenas um produz partículas com essa coloração avermelhada/alaranjada — pense na reação química envolvida.",
  "explanation": "A cor avermelhada/alaranjada é a característica mais diagnóstica de partículas de corrosão (óxido de ferro) — nenhum outro mecanismo de desgaste mecânico (corte, fadiga inicial ou avançada) produz essa coloração, pois todos eles geram partículas metálicas (cinza/prateadas). O contexto (parada prolongada de 3 meses) reforça o diagnóstico: superfícies metálicas desprotegidas expostas à umidade do ar durante longas paradas são um cenário clássico para o início de corrosão antes mesmo do retorno à operação.",
  "cause": "Exposição de superfícies metálicas internas à umidade do ar durante parada prolongada (3 meses) sem proteção anticorrosiva adequada (óleo com inibidor de corrosão insuficiente, ou ausência de desumidificação/preservação durante a parada).",
  "action": "Inspecionar fisicamente as superfícies internas para avaliar a extensão da corrosão; revisar o procedimento de preservação para paradas prolongadas futuras (óleo com inibidor de corrosão reforçado, desumidificação do ambiente, ou rotação periódica do eixo); acompanhar a tendência de Fe nas próximas análises para confirmar que o processo não está mais ativo.",
  "checks": []
})

# ------------------------------------------------------------------
# merge into data/lube_cases.js
# ------------------------------------------------------------------
with open("data/lube_cases.js", encoding="utf-8") as f:
    src = f.read()
m = re.search(r"const LUBE_CASES = (\[[\s\S]*\]);\s*$", src)
header_end = m.start()
existing = json.loads(m.group(1))
existing_ids = {c["id"] for c in existing}
for c in CASES:
    if c["id"] in existing_ids:
        raise ValueError("duplicate id: " + c["id"])
merged = existing + CASES
new_json = json.dumps(merged, ensure_ascii=False, indent=1)
new_src = src[:header_end] + "const LUBE_CASES = " + new_json + ";\n"
with open("data/lube_cases.js", "w", encoding="utf-8") as f:
    f.write(new_src)
print("Casos adicionados:", [c["id"] for c in CASES])
print("Total de casos de lubrificação agora:", len(merged))
