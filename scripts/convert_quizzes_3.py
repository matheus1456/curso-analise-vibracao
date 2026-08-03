#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rodada J — conversão de quizzes para múltipla escolha, parte 3 (mlub1 a mlub8,
data/lube_content.js). mlub9-12 já estão no schema novo, não precisam conversão.
"""
import json

def opt(i, t): return {"id": i, "text": t}
def Q(text, options, correct, explanation):
    return {"text": text, "options": options, "correct": correct, "explanation": explanation}

CONVERTED = {}

CONVERTED["mlub1"] = [
    Q("Um mancal de deslizamento bem projetado, em regime estável de rotação, normalmente opera em qual regime de lubrificação, e por que isso resulta em desgaste próximo de zero?",
      [opt("a","Regime hidrodinâmico — o movimento relativo das superfícies gera, por efeito de cunha, um filme de óleo espesso e contínuo que separa completamente as superfícies, sem contato metal-metal."),
       opt("b","Regime limítrofe (boundary) — os aditivos EP formam uma camada sólida permanente que substitui o filme de óleo."),
       opt("c","Regime misto — o contato metal-metal ocorre parcialmente, mas é compensado pela baixa velocidade de rotação."),
       opt("d","Regime elastohidrodinâmico — típico de mancais de deslizamento, nunca de rolamentos de elementos rolantes.")],
      "a",
      "No regime hidrodinâmico, o próprio movimento relativo das superfícies gera, por efeito de cunha, um filme de óleo espesso e contínuo que separa completamente as duas superfícies — sem contato metal-metal, o desgaste em operação estável tende a zero."),
    Q("Por que a lubrificação limítrofe (boundary) é considerada o regime mais crítico do ponto de vista de desgaste?",
      [opt("a","Porque o filme fluido praticamente não existe, e a proteção contra contato direto entre asperezas depende quase inteiramente de filmes químicos de aditivos (antidesgaste/EP)."),
       opt("b","Porque é o único regime em que a viscosidade do óleo não tem nenhuma influência sobre o desgaste."),
       opt("c","Porque ocorre exclusivamente em altíssimas velocidades de rotação, fora do alcance de qualquer aditivo."),
       opt("d","Porque nesse regime o óleo é sempre substituído instantaneamente por graxa, tornando o aditivo irrelevante.")],
      "a",
      "Nesse regime o filme fluido praticamente não existe, e a proteção contra o contato direto entre asperezas metálicas depende quase inteiramente de filmes químicos de aditivos (antidesgaste/EP) — se o pacote de aditivos estiver esgotado ou for inadequado, o desgaste metal-metal ocorre diretamente."),
    Q("Além de reduzir o atrito, quais são outras funções de um lubrificante?",
      [opt("a","Dissipar calor, selar contra contaminantes, transportar partículas de desgaste para fora da zona de contato e proteger contra corrosão."),
       opt("b","Aumentar permanentemente a dureza superficial dos componentes metálicos em contato."),
       opt("c","Substituir a necessidade de vedações (selos) em qualquer mancal ou rolamento."),
       opt("d","Eliminar completamente a necessidade de monitoramento de vibração da máquina.")],
      "a",
      "Além de reduzir o atrito, um lubrificante dissipa calor, sela contra contaminantes, transporta partículas de desgaste para fora da zona de contato e protege contra corrosão."),
]

CONVERTED["mlub2"] = [
    Q("Um óleo de engrenagens industriais precisa de proteção contra soldagem a frio das asperezas sob cargas de choque muito altas. Qual classe de aditivo é a mais indicada?",
      [opt("a","Aditivos de extrema pressão (EP) — reagem quimicamente com a superfície metálica sob pressão/temperatura extremas, formando uma camada de sacrifício que evita a solda a frio entre asperezas."),
       opt("b","Antioxidantes fenólicos — retardam a oxidação do óleo base, sem relação com proteção mecânica sob choque de carga."),
       opt("c","Detergentes/dispersantes — mantêm partículas em suspensão, sem função de proteção contra solda a frio."),
       opt("d","Depressores de ponto de fluidez — melhoram o comportamento em baixa temperatura, sem relação com cargas de choque.")],
      "a",
      "Os aditivos de extrema pressão (EP) reagem quimicamente com a superfície metálica sob pressão e temperatura extremas, formando uma camada de sacrifício que evita a solda a frio entre as asperezas, típica de engrenagens sob choque de carga."),
    Q("O TAN (número de acidez total) de um óleo em uso vem subindo de forma consistente nas últimas 3 análises. O que isso indica, e que ação um analista de óleo deveria considerar?",
      [opt("a","Degradação oxidativa progressiva do óleo — investigar a causa (temperatura elevada, contaminação catalítica, tempo de uso excessivo) e avaliar troca ou reforço de antioxidante antes que a viscosidade e o verniz se agravem."),
       opt("b","Contaminação por água apenas — basta trocar o filtro de ar do reservatório para reverter o TAN."),
       opt("c","Excesso de aditivo antidesgaste — recomenda-se diluir o óleo com óleo novo em qualquer proporção."),
       opt("d","É uma variação normal sem significado técnico, já que o TAN nunca se relaciona à vida útil do óleo.")],
      "a",
      "TAN em alta e consistente é sinal de degradação oxidativa progressiva do óleo base — o analista deve investigar a causa (temperatura elevada, contaminação catalítica, tempo de uso excessivo) e avaliar troca ou reforço de aditivo antioxidante antes que a viscosidade e a formação de verniz se agravem."),
    Q("Por que um óleo sintético PAO costuma ser preferido a um mineral do Grupo I em compressores operando em temperaturas extremas?",
      [opt("a","O PAO tem estabilidade térmica e oxidativa muito superior, além de excelente comportamento em baixa temperatura (menor ponto de fluidez, melhor fluidez a frio)."),
       opt("b","O PAO é sempre mais barato que o mineral do Grupo I, o que justifica a preferência exclusivamente por custo."),
       opt("c","O mineral do Grupo I não pode, por lei, ser utilizado em compressores industriais."),
       opt("d","O PAO elimina totalmente a necessidade de qualquer pacote de aditivos no óleo formulado.")],
      "a",
      "O PAO tem estabilidade térmica e oxidativa muito superior ao mineral do Grupo I, além de excelente comportamento em baixa temperatura (menor ponto de fluidez, melhor fluidez a frio) — características essenciais quando a faixa de temperatura de operação é extrema."),
]

CONVERTED["mlub3"] = [
    Q("Um técnico substitui a graxa de lítio comum de um motor elétrico por uma graxa de poliureia sem purgar completamente a graxa antiga. Qual é o risco principal dessa prática?",
      [opt("a","Incompatibilidade de espessantes — misturar lítio comum com poliureia pode amolecer drasticamente a graxa resultante, comprometendo a retenção de óleo na zona de contato."),
       opt("b","Nenhum risco relevante, pois todos os tipos de espessante de graxa são sempre quimicamente compatíveis entre si."),
       opt("c","Risco exclusivamente de mudança de cor da graxa, sem qualquer efeito sobre a lubrificação."),
       opt("d","Risco de reação explosiva imediata entre os dois espessantes ao entrarem em contato.")],
      "a",
      "Misturar lítio comum com poliureia pode amolecer drasticamente a graxa resultante, comprometendo sua capacidade de reter o óleo na zona de contato e acelerando o desgaste — o correto é purgar/limpar ao máximo antes de trocar de tipo de espessante."),
    Q("Um rolamento aquece anormalmente logo após a relubrificação manual de rotina. Qual é a causa mais provável, e por quê?",
      [opt("a","Excesso de graxa aplicada — o excedente precisa ser mecanicamente \"trabalhado\" pelos elementos rolantes até ser expelido, gerando atrito e calor adicionais."),
       opt("b","Graxa insuficiente — qualquer quantidade abaixo do reservatório total do rolamento gera atrito e calor."),
       opt("c","Troca do tipo de graxa para uma de menor viscosidade base, o que sempre reduz o atrito interno."),
       opt("d","Contaminação por poeira introduzida durante a relubrificação, independentemente da quantidade aplicada.")],
      "a",
      "A causa mais comum de superaquecimento logo após a relubrificação é o excesso de graxa: o excedente precisa ser mecanicamente \"trabalhado\" pelos elementos rolantes até ser expelido, gerando atrito e calor adicionais."),
    Q("Por que a graxa à base de cálcio-sulfonato complexo é frequentemente escolhida para ambientes com alta exposição à água, mesmo sem aditivo EP adicional?",
      [opt("a","Porque tem excelente resistência inerente à água e já possui proteção antidesgaste/EP como característica própria do espessante, sem depender de aditivo adicional que poderia ser lixiviado pela água."),
       opt("b","Porque o cálcio-sulfonato complexo é sempre o espessante mais barato disponível no mercado."),
       opt("c","Porque essa graxa se dissolve completamente em água, facilitando a limpeza do mancal."),
       opt("d","Porque é a única graxa compatível com rolamentos de esferas, nunca com rolamentos de rolos.")],
      "a",
      "O cálcio-sulfonato complexo tem excelente resistência inerente à água (não se degrada/emulsiona facilmente na presença de umidade) e já possui proteção antidesgaste/EP como característica própria do espessante, sem depender de um pacote de aditivos EP adicional que poderia ser lixiviado pela água."),
]

CONVERTED["mlub4"] = [
    Q("Um redutor de baixa rotação e alta carga foi especificado para óleo ISO VG 220, mas o estoque só tem ISO VG 46 disponível. Que risco isso traz, e por quê?",
      [opt("a","Risco de ruptura do filme lubrificante sob carga — um óleo muito menos viscoso pode não sustentar a espessura de filme necessária nas condições de baixa velocidade/alta carga, levando a desgaste acelerado."),
       opt("b","Nenhum risco relevante, já que a viscosidade especificada é apenas uma recomendação opcional do fabricante."),
       opt("c","Risco exclusivamente de vazamento pelas vedações, sem qualquer efeito sobre o desgaste das engrenagens."),
       opt("d","Risco de excesso de espuma, mas sem qualquer impacto sobre a espessura do filme lubrificante.")],
      "a",
      "Um óleo muito menos viscoso que o especificado pode não sustentar a espessura de filme necessária nas condições de baixa velocidade/alta carga desse redutor, levando a desgaste acelerado e possível falha prematura das engrenagens."),
    Q("Por que engrenagens do tipo sem-fim (worm gear) frequentemente usam lubrificante sintético à base de poliglicol (PAG) em vez de óleo mineral?",
      [opt("a","O engrenamento sem-fim tem alto deslizamento, e o PAG oferece coeficiente de atrito significativamente menor que o óleo mineral nesse tipo de contato, reduzindo calor e melhorando eficiência e vida útil."),
       opt("b","Porque o PAG é sempre mais barato que qualquer óleo mineral disponível no mercado."),
       opt("c","Porque engrenagens sem-fim não podem, por norma técnica, usar nenhum tipo de óleo mineral."),
       opt("d","Porque o PAG elimina totalmente a necessidade de troca periódica do lubrificante.")],
      "a",
      "O engrenamento sem-fim tem alto deslizamento (atrito de deslizamento predominante, não de rolamento), e o PAG oferece coeficiente de atrito significativamente menor que o óleo mineral nesse tipo de contato, reduzindo o calor gerado e melhorando a eficiência e a vida do engrenamento."),
    Q("Quais são benefícios concretos de um programa de consolidação de lubrificantes numa planta industrial?",
      [opt("a","Menos erros de aplicação do lubrificante errado, menor volume de estoque parado e capital imobilizado, melhor poder de negociação de compra e treinamento mais simples e padronizado da equipe."),
       opt("b","Eliminação total da necessidade de qualquer análise de óleo periódica."),
       opt("c","Garantia de que nenhuma máquina jamais sofrerá falha relacionada à lubrificação."),
       opt("d","Redução automática do consumo de energia elétrica de todas as máquinas rotativas da planta.")],
      "a",
      "A consolidação de lubrificantes traz menos erros de aplicação de lubrificante errado (menos tipos para confundir), menor volume de estoque parado e capital imobilizado, melhor poder de negociação de compra por volume e treinamento da equipe mais simples e padronizado."),
]

CONVERTED["mlub5"] = [
    Q("Por que filtrar óleo novo, ainda lacrado de fábrica, antes do primeiro abastecimento de um sistema hidráulico de precisão é considerada boa prática, e não exagero?",
      [opt("a","Óleo lacrado de fábrica ainda pode conter partículas acima do exigido por aplicações de precisão; filtrar antes do primeiro uso evita introduzir essa contaminação residual diretamente no sistema."),
       opt("b","Porque óleo lacrado de fábrica sempre vem contaminado com água em quantidade acima do limite aceitável."),
       opt("c","Porque a filtração antes do abastecimento substitui integralmente a necessidade de filtros em linha no sistema."),
       opt("d","Porque a viscosidade do óleo lacrado é sempre diferente da especificada, exigindo correção por filtragem.")],
      "a",
      "Óleo lacrado de fábrica ainda pode conter partículas em nível acima do exigido por aplicações de precisão (servoválvulas, bombas de pistão) — filtrar antes do primeiro uso evita introduzir essa contaminação residual diretamente no sistema, prevenindo desgaste prematuro de componentes sensíveis."),
    Q("Um tambor de óleo é armazenado na vertical, ao ar livre, com a tampa voltada para cima. Que risco isso traz e como mitigá-lo?",
      [opt("a","Risco de água de chuva se acumular sobre a tampa e ser puxada para dentro pela respiração térmica através de pequenas folgas na vedação; mitiga-se armazenando na horizontal ou na vertical com a tampa lateral (3h/9h)."),
       opt("b","Risco exclusivo de evaporação acelerada do óleo, sem qualquer relação com entrada de água."),
       opt("c","Nenhum risco relevante, desde que o tambor seja armazenado sob um telhado qualquer."),
       opt("d","Risco de o tambor tombar sozinho devido ao peso do óleo deslocado para a tampa.")],
      "a",
      "Há risco de água da chuva se acumular sobre a tampa e ser puxada para dentro do tambor pela respiração térmica (expansão/contração do ar interno com a variação de temperatura) através de pequenas folgas na vedação — mitiga-se armazenando o tambor na horizontal, ou na vertical com a tampa na posição lateral (3h/9h), nunca voltada para cima."),
    Q("Um rolamento que operava a 60°C passa a operar rotineiramente a 90°C após uma mudança de processo. O que se espera que aconteça com o intervalo de relubrificação recomendado, e por quê?",
      [opt("a","Espera-se que o intervalo diminua significativamente — a cada 15°C acima da faixa normal, o intervalo de relubrificação recomendado tende a cair pela metade, pois a temperatura mais alta acelera a degradação térmica da graxa."),
       opt("b","Espera-se que o intervalo permaneça exatamente igual, já que a temperatura não afeta a vida útil da graxa."),
       opt("c","Espera-se que o intervalo aumente, pois temperaturas mais altas reduzem a viscosidade e facilitam a lubrificação."),
       opt("d","Espera-se que a graxa deixe de ser necessária, sendo substituída por lubrificação a óleo automaticamente.")],
      "a",
      "Espera-se que o intervalo de relubrificação recomendado diminua significativamente — como regra prática da indústria, cada 15°C acima da faixa normal de operação tende a reduzir o intervalo pela metade, pois a temperatura mais alta acelera a degradação térmica da graxa/óleo na zona de contato."),
]

CONVERTED["mlub6"] = [
    Q("Um óleo hidráulico apresenta código ISO 4406 de 22/20/17, e o sistema exige 18/16/13. O que essa diferença significa, e qual ação é indicada?",
      [opt("a","O código medido indica contaminação por partículas mais alta do que o exigido; deve-se reforçar/corrigir a filtração (filtro de maior eficiência, filtração offline dedicada) até atingir o código-alvo."),
       opt("b","O código medido indica que o óleo está mais limpo do que o necessário, permitindo reduzir a filtração instalada."),
       opt("c","A diferença não tem significado prático, pois o código ISO 4406 mede apenas viscosidade, não contaminação."),
       opt("d","Deve-se trocar imediatamente todo o óleo do sistema, sem necessidade de ajustar a filtração.")],
      "a",
      "O código medido (22/20/17) indica um nível de contaminação por partículas mais alto do que o exigido pelos componentes do sistema (18/16/13) — ação indicada é reforçar/corrigir a filtração até atingir o código-alvo, protegendo componentes de precisão contra desgaste abrasivo acelerado."),
    Q("Água aparece no óleo em três estados de coexistência possíveis. Qual dos três é o mais danoso, e por quê?",
      [opt("a","Água livre — deposita-se no fundo do reservatório formando bolsas que promovem corrosão direta e pode ser arrastada em golfadas para a zona de lubrificação, causando perda abrupta de filme."),
       opt("b","Água dissolvida — é sempre a forma mais danosa, mesmo em baixíssima concentração."),
       opt("c","Água emulsionada — é sempre mais perigosa que a água livre, por se espalhar por todo o volume do óleo."),
       opt("d","Nenhuma das três formas de água representa risco relevante para o sistema.")],
      "a",
      "A água livre é a mais danosa: deposita-se no fundo do reservatório formando bolsas que promovem corrosão direta e pode ser arrastada em golfadas para a zona de lubrificação, causando perda abrupta de filme — mais perigosa que a água dissolvida (geralmente inofensiva em baixa concentração) e mais concentrada localmente que a emulsionada."),
    Q("Como se explica, na prática, o significado de um filtro com Beta ratio (β₁₀) igual a 200?",
      [opt("a","Para partículas de 10 µm, o filtro remove 199 em cada 200 partículas que passam por ele em um ciclo de teste — eficiência de captura de aproximadamente 99,5% para aquele tamanho."),
       opt("b","O filtro captura exatamente 200 partículas por minuto de operação, independentemente do tamanho."),
       opt("c","O filtro reduz a viscosidade do óleo em 200 vezes ao longo de sua vida útil."),
       opt("d","O filtro deve ser trocado a cada 200 horas de operação, independentemente da contagem de partículas.")],
      "a",
      "Significa que, para partículas do tamanho de referência (10 µm), o filtro remove 199 em cada 200 partículas que passam por ele em um único ciclo de teste — uma eficiência de captura de aproximadamente 99,5% para aquele tamanho de partícula."),
]

CONVERTED["mlub7"] = [
    Q("Por que o ponto de coleta de amostra deve ser sempre o mesmo, medição após medição, no mesmo sistema?",
      [opt("a","Para que a comparação entre amostras sucessivas (tendência) seja válida — mudar o ponto faz a amostra refletir uma zona diferente do sistema, invalidando a comparação histórica."),
       opt("b","Porque a norma exige que o ponto de coleta seja trocado a cada nova amostra, para evitar viés."),
       opt("c","Porque o ponto de coleta não tem qualquer influência sobre o resultado da análise laboratorial."),
       opt("d","Porque apenas o primeiro ponto de coleta de cada máquina é juridicamente válido para laudos.")],
      "a",
      "A comparação entre amostras sucessivas (tendência) só é válida se o ponto de coleta permanecer o mesmo — se ele muda, a amostra passa a refletir uma zona diferente do sistema, invalidando a comparação histórica e podendo mascarar ou simular falsamente uma tendência de degradação/contaminação."),
    Q("Um relatório de óleo mostra viscosidade caindo de forma consistente nas últimas três amostras de um motor a diesel. Que hipóteses de causa raiz devem ser investigadas?",
      [opt("a","Diluição por combustível (problema de injeção/combustão incompleta) e cisalhamento mecânico do melhorador de índice de viscosidade — confirmáveis por FTIR e histórico de uso."),
       opt("b","Exclusivamente excesso de aditivo antidesgaste, sem qualquer relação com combustível ou cisalhamento."),
       opt("c","Exclusivamente contaminação por poeira ambiental, que sempre reduz a viscosidade do óleo."),
       opt("d","A queda de viscosidade é sempre um artefato de calibração do viscosímetro, sem causa real na máquina.")],
      "a",
      "Diluição por combustível (problema de injeção/combustão incompleta) e cisalhamento mecânico do melhorador de índice de viscosidade (VI improver) são as duas hipóteses mais prováveis para queda consistente de viscosidade em motor a diesel — ambas confirmáveis por FTIR (diluição por combustível) e histórico de uso/severidade de operação."),
    Q("Por que a espectroscopia de emissão atômica de rotina, isoladamente, pode não detectar um desgaste severo em andamento?",
      [opt("a","Ela tem limitação de tamanho de partícula — partículas de desgaste maiores (acima de ~5-10 µm), comuns em modos de desgaste mais severos, não são bem representadas, exigindo ferrografia analítica como complemento."),
       opt("b","Porque a espectroscopia de emissão atômica só detecta contaminação por água, nunca partículas metálicas."),
       opt("c","Porque esse método exige que a máquina esteja parada há mais de 30 dias para funcionar corretamente."),
       opt("d","Porque a espectroscopia de emissão atômica foi descontinuada e substituída integralmente pela ferrografia.")],
      "a",
      "A espectroscopia de emissão atômica de rotina tem limitação de tamanho de partícula — partículas de desgaste maiores (tipicamente acima de ~5-10 µm), que costumam surgir justamente em modos de desgaste mais severos, não são bem representadas nesse método, exigindo ferrografia analítica como complemento."),
]

CONVERTED["mlub8"] = [
    Q("Uma ferrografia revela partículas laminares em quantidade crescente ao longo de análises sucessivas de um redutor. O que isso indica, e qual a urgência da ação recomendada?",
      [opt("a","Fadiga superficial em estágio avançado (lascamento/spalling já ativo); diferente de partículas esféricas (fadiga inicial), a presença crescente de laminares exige ação corretiva com urgência."),
       opt("b","Contaminação por poeira externa, sem urgência, bastando trocar o filtro de ar do respiro."),
       opt("c","Condição normal de amaciamento (running-in) do redutor, sem necessidade de qualquer ação."),
       opt("d","Excesso de aditivo antidesgaste, corrigível apenas com troca completa do óleo, sem urgência.")],
      "a",
      "Partículas laminares indicam fadiga superficial em estágio avançado — lascamento (spalling) já ativo na superfície das engrenagens. Diferente de partículas esféricas (fadiga inicial, ainda subsuperficial), a presença crescente de laminares é sinal de deterioração já em progresso e requer ação corretiva com urgência."),
    Q("Por que a definição de limites de alarme estatísticos (média ± desvio-padrão do próprio ativo) costuma ser mais sensível do que usar apenas limites fixos genéricos da indústria?",
      [opt("a","Porque são calculados a partir do histórico daquele ativo específico, capturando sua faixa normal particular; mudanças sutis mas reais podem ficar mascaradas por um limite fixo genérico calibrado para a média da indústria."),
       opt("b","Porque limites estatísticos são sempre numericamente mais altos que limites fixos, tornando-os mais fáceis de não ultrapassar."),
       opt("c","Porque limites fixos genéricos não podem, por definição, ser aplicados a nenhum tipo de máquina rotativa."),
       opt("d","Não há diferença prática de sensibilidade entre os dois tipos de limite de alarme.")],
      "a",
      "Os limites estatísticos são calculados a partir do próprio histórico daquele ativo específico, capturando sua faixa normal de operação particular — mudanças sutis, mas reais, que se desviam do comportamento histórico daquela máquina específica podem ficar mascaradas por um limite fixo genérico, calibrado para a média de toda a indústria."),
    Q("Qual certificação ICML tem maior peso relativo em amostragem no seu exame, e por que isso faz sentido dado o foco daquele nível?",
      [opt("a","MLA II, cuja Body of Knowledge dedica cerca de 29% do exame a amostragem — o nível II aprofunda a competência prática de coletar amostras corretamente, fundamento sem o qual a análise laboratorial perde confiabilidade."),
       opt("b","MLA I, pois esse nível trata exclusivamente de coleta de amostras, sem nenhum outro tópico no exame."),
       opt("c","MLT I, pois técnicos de laboratório nunca lidam com amostragem em campo."),
       opt("d","Todas as certificações ICML dão exatamente o mesmo peso percentual à amostragem.")],
      "a",
      "MLA II, cuja Body of Knowledge dedica cerca de 29% do exame a amostragem — o nível II do MLA aprofunda justamente a competência prática de coletar amostras corretamente (por tipo de sistema, gerenciamento de interferências, processo de amostragem), fundamento sem o qual toda a análise laboratorial posterior perde confiabilidade."),
]

with open("/tmp/_quiz_conversion_3.json", "w", encoding="utf-8") as f:
    json.dump(CONVERTED, f, ensure_ascii=False)
print("OK — módulos convertidos:", list(CONVERTED.keys()))
total = sum(len(v) for v in CONVERTED.values())
print("total perguntas convertidas nesta parte:", total)
