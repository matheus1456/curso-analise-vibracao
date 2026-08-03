const { H1, H2, H3, P, Bullet, Quote, Img, simpleTable, exerciseBlock } = require("./build_docx.js");

// ============================================================
// MÓDULO 14 — BALANCEAMENTO DE CAMPO
// ============================================================
let m14b = [];
m14b.push(H1("Módulo 14 — Balanceamento de Campo em Um Plano"));
m14b.push(P("Diagnosticar desbalanceamento (Módulo 6) é apenas metade do trabalho — o Engenheiro de Confiabilidade avançado também sabe executar a correção. Este módulo apresenta o método do vetor de influência (também chamado método dos três vetores ou método do peso de teste), a técnica mais usada para balanceamento de campo em um único plano."));

m14b.push(H2("14.1 Princípio do método"));
m14b.push(P("A vibração em 1X RPM, medida em amplitude e fase, pode ser representada como um vetor (um número complexo, ou uma seta em um diagrama polar). O método consiste em:"));
m14b.push(Bullet("1. Medir o vetor de vibração original O (amplitude e fase) com o rotor em sua condição atual."));
m14b.push(Bullet("2. Instalar um peso de teste conhecido (massa e posição angular conhecidas) em um raio determinado."));
m14b.push(Bullet("3. Medir novamente o vetor de vibração, agora chamado O+T (o efeito combinado do desbalanceamento original mais o peso de teste)."));
m14b.push(Bullet("4. Calcular o vetor de efeito do peso de teste T = (O+T) − O (subtração vetorial, não escalar)."));
m14b.push(Bullet("5. Determinar a massa e a posição do peso de correção que anularia o vetor original O, usando a relação de proporcionalidade entre o peso de teste e seu efeito medido."));

m14b.push(...Img("23_vetor_balanceamento.png", 420, "Figura 14.1 — Diagrama vetorial: O (original), O+T (com peso de teste) e T (efeito do peso de teste, obtido pela diferença vetorial)."));

m14b.push(H2("14.2 Exemplo numérico completo"));
m14b.push(P("Um ventilador gira a 1200 rpm (20 Hz). A vibração original medida em 1X é O = 3,2 mm/s a 40°. Um peso de teste de 15 g é instalado a 0° (referência) no raio de correção. A nova leitura é O+T = 4,6 mm/s a 92°."));
m14b.push(H3("Passo 1 — Representar os vetores em coordenadas retangulares"));
m14b.push(Quote("O = 3,2∠40° = 3,2·cos40° + j·3,2·sen40° = 2,45 + j2,06\nO+T = 4,6∠92° = 4,6·cos92° + j·4,6·sen92° = −0,16 + j4,60"));
m14b.push(H3("Passo 2 — Calcular o vetor de efeito do peso de teste"));
m14b.push(Quote("T = (O+T) − O = (−0,16 − 2,45) + j(4,60 − 2,06) = −2,61 + j2,54\n|T| = √(2,61² + 2,54²) ≈ 3,64 mm/s        ângulo de T = atan2(2,54, −2,61) ≈ 135,7°"));
m14b.push(H3("Passo 3 — Calcular a massa de correção"));
m14b.push(P("A massa de correção necessária é proporcional à razão entre a amplitude do vetor original e a amplitude do efeito do peso de teste:"));
m14b.push(Quote("Massa de correção = massa de teste × (|O| / |T|) = 15 g × (3,2 / 3,64) ≈ 13,2 g"));
m14b.push(H3("Passo 4 — Calcular o ângulo de instalação do peso de correção"));
m14b.push(P("O peso de correção deve ser instalado de forma a criar um vetor de efeito oposto (180°) ao vetor original O. Como o peso de teste (instalado a 0°) produziu um efeito com ângulo de 135,7°, o ângulo de instalação do peso de correção, medido a partir da posição do peso de teste, na mesma direção de rotação, é:"));
m14b.push(Quote("Ângulo de correção = ângulo de O (invertido, +180°) − ângulo de T, referenciado à posição do peso de teste\nÂngulo de correção ≈ (40° + 180°) − 135,7° = 84,3° a partir da posição do peso de teste,\nno mesmo sentido de rotação do rotor"));
m14b.push(P("Resultado prático: instalar uma massa de aproximadamente 13,2 g a 84,3° da posição onde o peso de teste foi colocado (medidos no sentido de rotação do eixo), no mesmo raio usado para o peso de teste. Após a instalação, uma nova medição de verificação deve confirmar que a vibração em 1X caiu para um valor consistente com a Zona A/B da norma aplicável (Módulo 4)."));

m14b.push(H2("14.3 Cuidados práticos"));
m14b.push(Bullet("O peso de teste deve ser grande o suficiente para produzir uma mudança clara e mensurável na amplitude e/ou fase (como referência inicial, um efeito de pelo menos 20–30% de variação em relação ao vetor original), mas não tão grande que coloque o rotor em risco."));
m14b.push(Bullet("Sempre remover o peso de teste antes de instalar o peso de correção definitivo, a menos que o cálculo já considere sua permanência (nesse caso, a massa final instalada na posição do peso de teste é a soma vetorial das duas)."));
m14b.push(Bullet("Balanceamento só é confiável quando o rotor não está em ressonância (Módulo 6.6) — próximo de uma frequência natural, a fase varia bruscamente e o vetor medido perde estabilidade e repetibilidade."));
m14b.push(Bullet("Rotores em balanço (overhung) e rotores flexíveis de grande porte frequentemente exigem balanceamento em dois ou mais planos, um procedimento mais avançado (fora do escopo deste módulo introdutório) que usa os mesmos princípios vetoriais, mas resolvendo um sistema de equações com coeficientes de influência cruzada entre planos."));

m14b.push(...exerciseBlock("Módulo 14",
  [
    "Por que é necessário subtrair vetorialmente O de O+T, em vez de simplesmente subtrair as amplitudes (números escalares)?",
    "Em um balanceamento, a fase da vibração varia de forma instável e não repetível entre medições sucessivas. O que isso sugere sobre a validade do balanceamento nessa condição, e o que deve ser verificado antes de prosseguir?",
    "Um peso de teste de 10 g produziu um efeito |T| de apenas 0,3 mm/s, muito pequeno para calcular com confiança o ângulo de correção. O que deve ser feito?"
  ],
  [
    "Porque a vibração é uma grandeza vetorial (tem amplitude e fase/direção); o efeito isolado do peso de teste só pode ser isolado corretamente subtraindo os dois vetores completos (parte real e parte imaginária, ou amplitude e ângulo), pois a soma vetorial de O e do efeito do peso de teste é o que gera a leitura combinada O+T — uma subtração puramente escalar ignoraria a fase e levaria a um cálculo de massa e ângulo de correção incorretos.",
    "Fase instável e não repetível é sinal de possível ressonância próxima ou de outra não linearidade (por exemplo, folga mecânica, Módulo 6.3) mascarando o sinal de desbalanceamento. Antes de prosseguir, deve-se verificar se a rotação de balanceamento está próxima de uma frequência natural (por exemplo, com um teste de impacto) e descartar ou corrigir outras causas de instabilidade de fase, já que o balanceamento não é confiável nessas condições.",
    "Deve-se aumentar a massa do peso de teste (dentro de limites seguros para o rotor) e repetir a medição, de forma a obter um efeito |T| suficientemente grande (e portanto uma fase suficientemente bem definida) para que o cálculo do ângulo e da massa de correção seja confiável — usar um efeito muito pequeno amplifica o erro relativo de medição."
  ]));

// ============================================================
// MÓDULO 15 — ALINHAMENTO DE EIXOS
// ============================================================
let m15 = [];
m15.push(H1("Módulo 15 — Alinhamento de Eixos"));
m15.push(P("O desalinhamento (Módulo 6.2) é, ao lado do desbalanceamento, a causa mais comum de vibração excessiva em máquinas acopladas. Este módulo apresenta os fundamentos do alinhamento de eixos e um exemplo numérico de cálculo de correção."));

m15.push(H2("15.1 Offset paralelo e desvio angular"));
m15.push(...Img("24_alinhamento_diagrama.png", 500, "Figura 15.1 — As duas componentes do desalinhamento: offset paralelo (deslocamento lateral entre as linhas de centro) e desvio angular (inclinação relativa entre os eixos)."));
m15.push(P("Todo desalinhamento real é uma combinação dessas duas componentes, medidas de forma independente em dois planos (vertical e horizontal). O objetivo do alinhamento é trazer ambas para dentro da tolerância especificada — tipicamente pelo fabricante do acoplamento, ou por tabelas de tolerância padronizadas por velocidade de rotação (quanto maior a rotação, mais apertada a tolerância exigida)."));

m15.push(H2("15.2 Métodos de medição"));
m15.push(Bullet("Relógios comparativos (rim-and-face ou reverse dial indicator): método tradicional, ainda usado em campo, que mede diretamente o desvio radial e axial em pontos ao redor do acoplamento durante a rotação conjunta ou alternada dos dois eixos."));
m15.push(Bullet("Alinhamento a laser: método atual padrão da indústria, com sensores óticos montados nos dois eixos que medem automaticamente offset e angularidade com alta precisão e calculam diretamente a correção necessária em cada pé da máquina móvel."));

m15.push(H2("15.3 Exemplo numérico: calculando a correção em calços (shims)"));
m15.push(P("Um motor será alinhado a uma bomba. As distâncias entre os pés do motor e o acoplamento são: pé dianteiro (mais próximo do acoplamento) a 250 mm do plano de medição; pé traseiro a 850 mm. A medição no acoplamento revelou:"));
m15.push(Bullet("Offset vertical no plano de acoplamento: motor 0,30 mm mais alto que a bomba."));
m15.push(Bullet("Desvio angular vertical: a face do motor está inclinada de forma que, projetando a diferença ao longo do eixo, ela aumentaria em 0,20 mm a cada 100 mm de distância axial adicional."));
m15.push(H3("Cálculo da correção necessária em cada pé"));
m15.push(P("A correção em cada pé combina o offset (igual para os dois pés) com a contribuição da angularidade (proporcional à distância de cada pé até o plano de medição):"));
m15.push(Quote("Correção no pé dianteiro = offset + (inclinação × distância do pé dianteiro / 100)\n= 0,30 + (0,20 × 250/100) = 0,30 + 0,50 = 0,80 mm (retirar calço, pois o motor está alto)\n\nCorreção no pé traseiro = 0,30 + (0,20 × 850/100) = 0,30 + 1,70 = 2,00 mm (retirar calço)"));
m15.push(P("Resultado prático: para corrigir o desalinhamento vertical, deve-se retirar aproximadamente 0,80 mm de calço do pé dianteiro do motor e 2,00 mm de calço do pé traseiro. Como os dois valores são de retirada (e não um de adição e outro de retirada), o desalinhamento predominante é angular (a diferença entre 2,00 mm e 0,80 mm reflete a inclinação), combinado com um offset de base uniforme."));
m15.push(P("O mesmo procedimento deve ser repetido para o plano horizontal (movendo a máquina lateralmente, em vez de adicionar/remover calços), e o processo é iterativo: após cada ajuste, uma nova medição confirma se offset e angularidade estão dentro da tolerância especificada, tanto na direção vertical quanto na horizontal."));

m15.push(H2("15.4 Erros comuns"));
m15.push(Bullet("Não verificar e corrigir o pé-manco (soft foot) antes do alinhamento — um pé frouxo invalida qualquer medição de alinhamento subsequente, pois a máquina se deforma de maneira diferente a cada vez que os parafusos são apertados."));
m15.push(Bullet("Não considerar o crescimento térmico (thermal growth) esperado da máquina em operação — muitas máquinas (especialmente turbinas e compressores) são intencionalmente alinhadas \"fora do esquadro\" a frio, na direção oposta ao crescimento térmico esperado, para ficarem alinhadas quando atingem a temperatura de operação."));
m15.push(Bullet("Confundir offset e angularidade — corrigir apenas um sem checar o outro deixa o segundo componente sem solução e pode inclusive mascarar sua real magnitude nas medições seguintes."));

m15.push(...exerciseBlock("Módulo 15",
  [
    "Por que o pé-manco (soft foot) deve ser sempre verificado e corrigido antes de iniciar o alinhamento de um eixo?",
    "Um redutor apresenta correção necessária de +0,40 mm no pé dianteiro e +0,42 mm no pé traseiro (mesmo sinal, valores próximos). Isso é mais consistente com um problema predominantemente de offset paralelo ou de desvio angular?",
    "Por que algumas máquinas de alta temperatura são deliberadamente alinhadas \"fora da tolerância\" a frio?"
  ],
  [
    "Porque um pé frouxo faz com que a carcaça da máquina se deforme de maneira diferente cada vez que os parafusos de fixação são apertados — qualquer medição de alinhamento feita sobre essa base instável não é repetível e pode indicar uma correção que, na prática, muda assim que os parafusos são reapertados de forma diferente.",
    "Correções de mesmo sinal e magnitude semelhante nos dois pés indicam um deslocamento praticamente uniforme ao longo do eixo — ou seja, predominantemente offset paralelo, com pouca contribuição angular (que produziria uma diferença proporcional à distância entre os pés, como no exemplo numérico do módulo).",
    "Porque, em operação, componentes de alta temperatura (carcaças, mancais, tubulações) se expandem termicamente e mudam de posição em relação à condição fria de montagem. Alinhar intencionalmente \"fora do esquadro\" a frio, na direção oposta ao crescimento térmico esperado, compensa esse efeito, de forma que o alinhamento fique dentro da tolerância exatamente quando a máquina atinge sua temperatura normal de operação."
  ]));

module.exports = { m14b, m15 };
