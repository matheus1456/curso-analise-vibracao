const { H1, H2, H3, P, PB, Bullet, Quote, Img, simpleTable, exerciseBlock } = require("./build_docx.js");

let m0 = [];
m0.push(H1("Módulo 0 — Nível Básico: Antes de Começar"));
m0.push(P("Este módulo é o ponto de partida para quem nunca teve contato com análise de vibração. Se você já tem experiência com osciloscópios, decibéis e RMS, pode avançar direto ao Módulo 1 — mas recomendamos uma leitura rápida, porque as analogias aqui construídas serão usadas ao longo de todo o curso."));

m0.push(H2("0.1 Uma analogia simples: o carro com pneu desbalanceado"));
m0.push(P("Quase todo mundo já sentiu vibração em um carro com um pneu desbalanceado: em certa velocidade, o volante treme. Esse tremor tem três características que são exatamente as mesmas que usamos para descrever a vibração de uma máquina industrial:"));
m0.push(Bullet("Quão forte é o tremor (amplitude) — o quanto o volante realmente se move."));
m0.push(Bullet("Quantas vezes por segundo ele treme (frequência) — no carro, isso está diretamente ligado à rotação da roda: quanto mais rápido o carro anda, mais rápido o pneu gira, e mais rápido o tremor se repete."));
m0.push(Bullet("Em que ponto do giro da roda o tremor é mais forte (fase) — se você marcasse a roda com giz, notaria que o tremor máximo acontece sempre no mesmo ponto da volta."));
m0.push(P("Uma máquina rotativa (motor, bomba, ventilador, compressor) se comporta da mesma forma: qualquer coisa fora de equilíbrio girando gera uma força que se repete a cada volta do eixo. O trabalho do analista de vibração é, essencialmente, \"sentir esse tremor\" com sensores muito mais sensíveis que a mão humana, e traduzir o que ele sente em um diagnóstico preciso: é peso mal distribuído (como o pneu)? É um eixo torto? É uma peça solta? É um rolamento gasto?"));

m0.push(H2("0.2 Amplitude: pico, pico a pico e RMS"));
m0.push(P("Quando falamos em \"quão forte é o tremor\", precisamos definir precisamente o que estamos medindo, porque a vibração é um sinal que varia continuamente no tempo, para cima e para baixo. Existem três formas usuais de expressar essa amplitude:"));
m0.push(Bullet("Pico (0-p) — a distância entre o ponto de repouso e o ponto mais alto (ou mais baixo) que o sinal atinge."));
m0.push(Bullet("Pico a pico (p-p) — a distância entre o ponto mais alto e o ponto mais baixo do sinal. Para uma onda senoidal simétrica, pico a pico = 2 × pico."));
m0.push(Bullet("RMS (root mean square, valor eficaz) — uma média especial que pondera a energia contida no sinal ao longo do tempo, e não apenas seu valor máximo instantâneo. Para uma senoide pura, RMS = pico ÷ √2 ≈ 0,707 × pico."));
m0.push(P("Por que o RMS é a grandeza preferida em normas como a família ISO 10816? Porque ele representa melhor a energia média transmitida à estrutura ao longo do tempo — e é a energia (não apenas o valor de pico instantâneo) que está mais associada ao desgaste e à fadiga dos componentes."));
m0.push(H3("Exemplo numérico"));
m0.push(P("Um sensor mede uma vibração predominantemente senoidal com valor de pico de 7,0 mm/s. Qual é o valor RMS equivalente, e o valor pico a pico?"));
m0.push(Quote("RMS = 7,0 ÷ √2 = 7,0 ÷ 1,414 ≈ 4,95 mm/s        Pico a pico = 2 × 7,0 = 14,0 mm/s"));
m0.push(P("Esse é exatamente o tipo de conversão que você fará sempre que precisar comparar uma leitura de campo (que pode vir em pico, em pico a pico ou em RMS, dependendo do instrumento) contra um limite normativo, que na família ISO 10816 é sempre expresso em RMS."));

m0.push(H2("0.3 Frequência: Hz, CPM e ordens — três formas de dizer a mesma coisa"));
m0.push(P("A frequência pode ser expressa em Hz (ciclos por segundo), em CPM (ciclos por minuto) ou em ordens (múltiplos da rotação do eixo, \"xRPM\"). As conversões são diretas:"));
m0.push(Quote("Hz = CPM ÷ 60          CPM = Hz × 60          Ordem (xRPM) = frequência (Hz) ÷ [RPM da máquina ÷ 60]"));
m0.push(H3("Exemplo numérico"));
m0.push(P("Uma máquina gira a 1780 rpm. No espectro, aparece um pico em 148,3 Hz. A que ordem de rotação esse pico corresponde?"));
m0.push(Quote("Rotação em Hz = 1780 ÷ 60 = 29,67 Hz (isto é, 1X = 29,67 Hz)\nOrdem = 148,3 ÷ 29,67 ≈ 5,0 → o pico está em 5X RPM"));
m0.push(P("Esse tipo de cálculo — converter um pico do espectro, dado em Hz, para uma ordem de rotação — é o primeiro passo de praticamente qualquer diagnóstico, porque é a ordem (1X, 2X, 3,5X BPFO, etc.) que carrega o significado físico do defeito, não o valor absoluto em Hz (que muda se a rotação da máquina mudar)."));

m0.push(H2("0.4 Decibéis (dB): quando você vai encontrar essa escala"));
m0.push(P("Alguns parâmetros de rolamento (como Shock Pulse) são expressos em decibéis, uma escala logarítmica usada para representar grandezas com faixas dinâmicas muito amplas de forma compacta. Não é necessário dominar a matemática de logaritmos para este curso — basta saber que um aumento de 6 dB corresponde aproximadamente à duplicação da amplitude do sinal, e que pequenas variações em dB podem representar mudanças proporcionalmente grandes na condição real do rolamento."));

m0.push(H2("0.5 Glossário mínimo para começar"));
m0.push(simpleTable(
  ["Termo", "Significado resumido"],
  [
    ["1X RPM", "Frequência de rotação do eixo; referência para todas as demais frequências."],
    ["Espectro (FFT)", "Gráfico de amplitude versus frequência, obtido a partir da forma de onda no tempo."],
    ["Forma de onda no tempo", "Registro bruto da vibração, amplitude versus tempo, sem transformação."],
    ["Fase", "Defasagem temporal entre um ponto de referência (1 pulso/volta) e o pico de vibração."],
    ["Severidade", "Classificação da vibração (Zonas A a D) segundo uma norma, como a ISO 10816."],
    ["Baseline", "Valor de referência estabelecido em condição normal de operação, usado para detectar mudanças."],
  ], [2500, 7000]));

m0.push(...exerciseBlock("Módulo 0",
  [
    "Um sensor indica 10 mm/s de pico. Qual é o valor RMS equivalente (assumindo sinal senoidal puro)?",
    "Uma máquina gira a 3600 rpm. Um pico aparece em 240 Hz no espectro. A que ordem (xRPM) ele corresponde?",
    "Por que a família de normas ISO 10816 usa o valor RMS de velocidade, e não o valor de pico, como referência de severidade?"
  ],
  [
    "RMS = 10 ÷ √2 ≈ 7,07 mm/s.",
    "1X = 3600 ÷ 60 = 60 Hz. Ordem = 240 ÷ 60 = 4X RPM.",
    "Porque o RMS representa melhor a energia média do sinal ao longo do tempo, grandeza mais diretamente associada ao desgaste e à fadiga dos componentes do que um valor de pico instantâneo, que pode ser pontual e não representativo da energia contínua transmitida à estrutura."
  ]));

module.exports = { m0 };
