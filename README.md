# Engenharia de Confiabilidade — Curso Interativo

Site estático (sem servidor/back-end necessário) para o curso **"Engenharia de Confiabilidade — Análise de Vibração, Falhas em Rolamentos e Lubrificação"**, com 34 módulos do nível básico ao avançado organizados em três trilhas — **Análise de Vibração I, II e III** (18 módulos), **Análise de Falhas - Rolamentos** (4 módulos, base SKF) e **Engenheiro de Lubrificação** (12 módulos, base ICML/Noria/Lubrin) —, todos os 98 quizzes do curso em formato de **múltipla escolha com correção instantânea**, tabelas de normas ISO 10816, mais de 50 diagramas/gráficos ilustrativos + 18 fotos reais de falhas de rolamentos, vídeo-aulas por módulo geradas por IA (NotebookLM), uma página de prática de diagnóstico com 27 casos de espectro + 18 casos de identificação por foto real + 19 casos de análise de óleo (incluindo **laudos de análise de óleo completos**, estilo LUBRIN/PURILUB, e exercícios visuais de ferrografia analítica), percentual de conclusão por trilha no menu lateral, tooltips explicativos ao passar o mouse em siglas técnicas (BPFO, GMF, RMS etc.) em todo o site, modo claro/escuro e um chat com IA (ChatGPT/OpenAI) para tirar dúvidas.

## Como abrir

Basta abrir `index.html` diretamente no navegador (duplo clique). Não é necessário instalar nada nem rodar servidor — todos os dados (`data/content.js`) são carregados como um script comum, e as imagens/vídeos são arquivos locais referenciados por caminho relativo.

## Estrutura de pastas

```
curso-vibracao/
├── index.html              # Shell da aplicação (sidebar + área de conteúdo)
├── assets/
│   ├── css/
│   │   ├── style.css       # Visual principal: layout, cores (com variáveis de tema), animações
│   │   ├── practice.css    # Estilos da página de Prática de Diagnóstico (espectro + tendência)
│   │   └── chat.css        # Estilos da página de Chat com IA
│   ├── js/
│   │   ├── acronyms.js     # Dicionário de siglas técnicas (BPFO, GMF, RMS...) + tooltip ao passar o mouse
│   │   ├── app.js          # Lógica principal: navegação, render de módulos, quiz, progresso, grupos colapsáveis
│   │   ├── practice.js     # Página de prática: espectro dinâmico (SVG) + gráfico de tendência histórica (SVG)
│   │   ├── chat.js         # Página de Chat com IA (chamadas diretas à API da OpenAI/ChatGPT)
│   │   └── effects.js      # Efeitos visuais: onda animada, scroll-reveal, confete, tema claro/escuro
│   ├── img/                # 34 gráficos/diagramas + 18 fotos reais de falhas (PNG/JPG), usados nos módulos e na prática
│   └── video/              # Vídeo-aulas por módulo (MP4), geradas via NotebookLM
├── data/
│   ├── content.js          # Conteúdo estruturado dos 22 módulos (gerado automaticamente)
│   ├── cases.js            # 27 casos práticos de espectro (tendência histórica + diagnóstico)
│   ├── bearing_failure_cases.js  # 18 casos de identificação por foto real (Análise de Falhas - Rolamentos)
│   ├── video_manifest.json # Mapeamento módulo → arquivo de vídeo
│   └── video_scripts.json  # Roteiros de narração usados para gerar os vídeos
├── scripts/                # Pipeline de geração de conteúdo (fonte da verdade)
│   ├── build_docx*.js      # Conteúdo textual do curso (mesma fonte usada no .docx)
│   ├── fake_docx.js        # Stub que permite reaproveitar build_docx*.js sem gerar Word
│   ├── extract_content.js  # Converte o conteúdo para data/content.js
│   ├── build_site.js       # Monta data/content.js a partir do conteúdo extraído
│   └── gen_spectra*.py     # Geração dos 25 gráficos de espectro (matplotlib)
└── README.md
```

## Como o conteúdo é gerado (para quem for editar)

O texto do curso vive nos arquivos `scripts/build_docx*.js` — a mesma fonte usada para gerar a apostila em Word. Isso evita ter o conteúdo duplicado em dois formatos diferentes. Para regenerar `data/content.js` depois de editar o texto:

```bash
cd scripts
node extract_content.js   # lê build_docx*.js e escreve o JSON intermediário de módulos
node build_site.js        # converte o JSON em data/content.js
node inject_charts.js     # reinsere os gráficos dinâmicos nos módulos (obrigatório)
node inject_summaries.js  # reinsere o resumo de cada módulo (obrigatório)
node add_module18.js      # reinsere o Módulo 18 (Galeria de Falhas) (obrigatório)
node add_bearing_modules.js  # reinsere os Módulos 19-21 (Análise de Falhas em Rolamentos, base SKF) (obrigatório)
```

Os gráficos de espectro são gerados por `scripts/gen_spectra.py` e `gen_spectra2.py` (Python + matplotlib) e salvos em `assets/img/`. Os diagramas esquemáticos dos Módulos 19-21 (zonas de carga, modos de falha ISO 15243) são gerados por `scripts/gen_failure_diagrams.py`, no mesmo estilo visual.

## Funcionalidades do site

- **Navegação lateral** por 18 módulos, agrupados em quatro trilhas: básico, intermediário, avançado e referência.
- **Progresso salvo no navegador** (`localStorage`) — marque um módulo como concluído e ele fica registrado mesmo depois de fechar a página.
- **Exercícios interativos**: cada módulo termina com perguntas e um botão "Ver gabarito comentado" por questão.
- **Vídeo-aula por módulo**: quando o vídeo ainda não foi gerado, aparece um cartão avisando que está em produção; quando pronto, o player de vídeo aparece automaticamente (basta preencher `data/video_manifest.json` e rodar `build_site.js` novamente).
- **Efeitos visuais**: onda animada no topo da barra lateral (tema vibração), transições suaves entre módulos, revelação progressiva do conteúdo ao rolar a página (scroll-reveal), micro-interações em botões e cartões, e uma pequena animação de confete ao concluir um módulo.
- **Responsivo**: em telas pequenas, a barra lateral vira um menu retrátil.

## Modo claro/escuro

O botão no canto superior direito (🌙/☀️) alterna entre tema claro e escuro. A preferência fica salva em `localStorage` (`vibcourse_theme`) e é aplicada antes da primeira renderização da página, evitando o "flash" de tema errado.

## Menu lateral com grupos colapsáveis

Os cabeçalhos de nível (Básico, Intermediário, Avançado, Referência) na barra lateral são clicáveis e recolhem/expandem a lista de módulos daquele grupo. O estado de cada grupo (aberto/fechado) fica salvo em `localStorage` (`vibcourse_sidebar_groups_v1`).

## Prática de Diagnóstico: espectro + tendência

Cada um dos casos práticos com espectro mostra, além do espectro dinâmico (FFT ou forma de onda), um **gráfico de tendência histórica** com as últimas 6 medições e faixas de alerta/perigo baseadas na ISO 10816 — simulando um sistema de monitoramento de vibração real, em vez de uma foto única do espectro.

## Chat com IA

A página "Chat com IA" permite tirar dúvidas sobre o conteúdo do curso conversando diretamente com o ChatGPT (OpenAI), com o contexto de vibração/confiabilidade já embutido no prompt do sistema. Funciona com a **chave de API do próprio usuário**:

- A chave é salva apenas no `localStorage` do navegador (`vibcourse_openai_api_key`, compartilhada com a leitura de voz de IA) e usada só para chamar `https://api.openai.com/v1/chat/completions` diretamente do navegador — nenhum servidor deste projeto vê ou armazena a chave.
- O uso da API é cobrado na conta OpenAI do próprio usuário (não há custo para quem publica o site).
- É possível trocar ou remover a chave salva a qualquer momento pelo botão "Trocar/remover chave" na própria página de chat.

## Exercícios práticos expandidos (15 casos, com aceleração e envelope)

A página de Prática de Diagnóstico agora tem 15 casos (antes 10), ordenados corretamente por
nível (Básico → Intermediário → Avançado) e com chips agrupados por nível na barra de navegação.
Cada caso traz:

- Um painel de "leitura do coletor" no mesmo padrão de um coletor SKF: temperatura (°C),
  velocidade de vibração (mm/s RMS), aceleração pura (g) e envelope de aceleração (gE Pk-Pk).
- Novos casos focados em aceleração e envelope: rolamento em Estágio 1 (detectável só pelo
  envelope), lubrificação deficiente, desgaste de engrenagem via aceleração, progressão de
  estágio de rolamento e defeito elétrico via aceleração de alta frequência.
- Um botão "💡 Dica" que revela uma pista sem entregar a resposta.

## Mais casos práticos: centrífugas, bombas, redutores, motores e compressores (27 casos)

A trilha de "Casos com Espectro" ganhou 6 novos casos (c16-c21), focados em equipamentos e
falhas ainda não cobertos: uma centrífuga industrial com queixa genérica de "vibração" que
precisa ser traduzida corretamente para desbalanceamento (Módulo 6.1) via leitura de fase e
amplitude — não basta aceitar o sintoma do operador como diagnóstico — e uma segunda centrífuga
com defeito de rolamento em estágio inicial, só visível no envelope de aceleração; uma bomba
centrífuga com cavitação por vórtice de sucção (variante da cavitação por NPSH do caso c7) e
outra com defeito de rolamento dedicado; um caso de **golpe de aríete** interferindo na leitura
de vibração de uma bomba centrífuga, ensinando a reconhecer um evento transitório de processo
(inconsistente entre medições, correlacionado com o fechamento de uma válvula) e não confundi-lo
com um defeito mecânico real; e uma bomba de vácuo de anel líquido com defeito de rolamento por
contaminação de processo.

Mais 6 casos (c22-c27) cobrem redutores, motores elétricos e compressores de parafuso isento de
óleo: desgaste avançado nas engrenagens de um redutor (GMF elevado com bandas laterais) e um
defeito de rolamento em estágio inicial no eixo de saída de baixíssima rotação (45 rpm), onde só
o envelope detecta o problema antes do RMS global se alterar; um motor elétrico com suspeita de
barra de rotor quebrada (bandas laterais ao redor de 1x RPM na frequência de escorregamento,
confirmada por MCSA) e outro motor, agora acionado por inversor de frequência, com defeito de
rolamento por correntes de eixo (erosão elétrica / fluting — reforça o Módulo 21); e dois casos de
compressor de parafuso isento de óleo — desgaste nas engrenagens de sincronismo (risco de contato
metal-metal entre os rotores, inexistente em compressores lubrificados) e um defeito de rolamento
agravado pela temperatura de operação naturalmente mais alta desse tipo de compressor.

## Análise de Falhas - Rolamentos: identificação por foto real (18 casos)

Nova seção dentro da Prática de Diagnóstico, acessível por uma aba própria ("🔩 Análise de Falhas
— Rolamentos") ao lado da aba de espectro. Cada caso apresenta uma **foto real** de rolamento
danificado (extraída do material técnico SKF — `assets/img/35_foto_pista_normal.jpg` até
`52_foto_caso_britador.jpg`), dentro de um cenário de aplicação industrial real (fábrica de
papel, mineração, alimentos, ferrovia, motores de velocidade variável etc.), pedindo para
identificar o modo de falha (classificação ISO 15243) antes de revelar a explicação, a causa raiz
e a ação corretiva — mesmo formato de dica/feedback/progresso da trilha de espectro, mas com
progresso salvo separadamente (`vibcourse_bearing_practice_progress_v1`). Os 14 primeiros casos
cobrem cada sub-modo ISO 15243 individualmente (fadiga, desgaste, corrosão, erosão elétrica,
deformação plástica, fratura); os 4 últimos reaproveitam os estudos de caso reais do Módulo 21.5
(trem, motor elétrico, moinho de argila, britador) como cenários "integrados" mais avançados.
Dados em `data/bearing_failure_cases.js` (variável global `BEARING_FAILURE_CASES`), lógica em
`assets/js/practice.js` (`renderBfChips`, `renderBfCaseDetail`, `window.selectBearingCase`,
`window.checkBearingCase`).

## Tooltips de siglas técnicas (BPFO, GMF, RMS, FMAX etc.)

Toda sigla técnica conhecida (BPFO, BPFI, BSF, FTF, GMF, RMS, FMAX, FFT, ISO, NPSH, MCSA, WEC,
HRC, SCADA, XRD, RPM, VFD, MCC, OEM etc. — mais de 20 termos mapeados) que aparece em qualquer
texto do site — módulos, prática de diagnóstico (espectro e fotos reais), consulta rápida — passa
a exibir uma caixa explicativa com o significado completo ao passar o mouse (ou ao focar via
teclado, com Tab). O dicionário e a função de decoração ficam isolados em `assets/js/acronyms.js`
(`window.decorateAcronyms`), carregado antes dos demais scripts. Cada arquivo que renderiza texto
(`app.js`, `practice.js`, `refpage.js`) usa uma pequena função `decorate()` no lugar do
`escapeHtml()` original sempre que o texto é exibido como prosa (títulos, parágrafos, bullets,
tabelas, perguntas de quiz, dicas, explicações etc.) — nunca dentro de atributos HTML (como
`alt="..."`) nem dentro do SVG dos gráficos, para não corromper a marcação. O estilo visual
(sublinhado pontilhado + caixa de tooltip) está em `assets/css/style.css`.

## Reorganização da Prática de Diagnóstico (nível + módulo, painéis consolidados, mini-guia de soluções)

Três ajustes de usabilidade na página de Prática de Diagnóstico, a partir do feedback de que a página estava
fragmentada e misturava níveis de dificuldade:

- **Casos com Espectro (27 casos) — painéis consolidados e vínculo com o módulo teórico**: os antigos 3 cartões
  separados por caso (dados de campo, espectro, tendência histórica) foram unificados num único painel com
  divisores internos (`.case-data-panel`), reduzindo a fragmentação visual. Cada caso agora exibe também um selo
  clicável "🎓 Módulo X — ..." na barra superior, levando direto ao módulo do curso onde a teoria daquele tipo de
  falha é explicada (`c.relatedModule` / `c.relatedModuleLabel` em `data/cases.js`, botão que chama `goTo()`).
  Os chips de seleção de caso (tanto nos casos de espectro quanto nos de rolamentos) passaram a ser agrupados e
  ordenados por nível (Básico → Intermediário → Avançado) de forma consistente, mesmo quando o arquivo de dados
  não está nessa ordem internamente.
- **Análise de Falhas - Rolamentos (18 casos) — reordenados por nível**: os chips desta seção estavam misturando
  níveis básico/avançado sem padrão (ex.: básico, avançado, avançado, intermediário...); agora são reordenados e
  agrupados visualmente por nível, exatamente como na trilha de espectro, preservando o número original de cada
  caso para não confundir quem já memorizou "caso 5", etc.
- **Mini-guia "O que fazer em cada hipótese de diagnóstico"**: ao verificar a resposta de qualquer um dos 27
  casos de espectro, além da ação recomendada para o diagnóstico correto, agora aparece uma lista com TODAS as
  opções de diagnóstico apresentadas no caso, cada uma com a ação que se tomaria SE aquela fosse a causa raiz
  real — destacando visualmente qual é a correta (✓ verde) e qual foi a resposta escolhida pelo usuário quando
  incorreta (laranja). Isso funciona como um mini-guia de decisão comparativo, não só uma explicação da resposta
  certa. Implementado via um novo campo `solution` em cada opção de `diagnosisOptions` (`data/cases.js`) e uma
  nova seção `.solution-guide` renderizada por `checkCase()` (`assets/js/practice.js`).

## Gráficos dinâmicos dentro dos módulos

Além da página de prática, 19 gráficos de espectro/forma de onda interativos (mesmo componente
SVG, com tooltip ao passar o mouse) foram inseridos diretamente no conteúdo de 7 módulos
(Módulos 6, 7, 8, 9, 10, 11 e os 9 estudos de caso do Módulo 16), tornando os exemplos visuais
e não apenas texto. A lógica de renderização foi centralizada em `assets/js/charts.js`,
compartilhada entre os módulos e a página de prática. A inserção desses gráficos no conteúdo é
feita pelo script `scripts/inject_charts.js` (ver seção "Como o conteúdo é gerado" abaixo).

## Leitura em áudio das aulas

Cada módulo tem um botão "🔊 Ouvir aula" que lê o conteúdo em voz alta usando a Web Speech API
nativa do navegador (nenhum serviço externo, funciona offline), em português do Brasil, com
play/pausar/parar. Implementado em `assets/js/audio.js`.

## Página de Consulta Rápida (com exportação em PDF)

Uma página de referência de bolso para o Engenheiro de Confiabilidade, com as tabelas mais
consultadas no dia a dia: diagnóstico rápido por ordem do espectro, padrões de bandas laterais,
fórmulas de BPFO/BPFI/BSF/FTF, os quatro estágios de falha de rolamento, zonas de severidade da
família ISO 10816, leitura combinada do coletor (padrão SKF) e conversões de unidades. O botão
"📄 Baixar como PDF" usa a função de impressão nativa do navegador (Ctrl+P → Salvar como PDF),
com uma folha de estilo dedicada (`assets/css/refpage.css`) que oculta a navegação e formata
a página para impressão — sem depender de nenhuma biblioteca externa.

## Módulo 18 — Galeria de Falhas: Rolamentos e Redutores em Detalhe

Um módulo dedicado a reunir, lado a lado, a evolução visual e espectral das falhas mais comuns em rolamentos (os
quatro estágios) e redutores de engrenagens (desgaste, folga, dente trincado). Cada defeito combina uma imagem
ilustrativa com um gráfico dinâmico simulando um cenário real, e o módulo termina com uma tabela-resumo comparando
rolamento × engrenagem × defeito elétrico pelos critérios mais úteis para diferenciá-los em campo.

## Módulos 19-21 — Análise de Falhas em Rolamentos (base SKF)

Sequência de três módulos avançados, criada a partir de dois materiais técnicos da SKF fornecidos pelo usuário
("Bearing Failure Analysis" e "Bearing Damage and Failure Analysis"), complementando os Módulos 7 e 18 (que tratam
do lado espectral/vibratório) com o lado físico da perícia de falhas: como examinar um rolamento danificado e
identificar a causa raiz pelo padrão visual do dano.

- **Módulo 19 — Causas, Vida Útil e Zonas de Carga**: estatísticas de falha (90% sobrevive à máquina, ~0,5% falha
  de fato), lista de causas mais comuns, padrões de pista normais e anormais (com diagramas esquemáticos),
  estágios de evolução do dano, tabela de sintomas comuns (calor/ruído/vibração/folga) e roteiro de coleta de
  evidências.
- **Módulo 20 — Fadiga, Desgaste e Corrosão (ISO 15243)**: introduz a classificação ISO 15243 (6 modos principais,
  14 sub-modos, idêntica à classificação SKF) e detalha fadiga subsuperficial/superficial, desgaste
  abrasivo/adesivo e corrosão por umidade/atrito (fretting e false brinelling), cada um com diagrama esquemático
  próprio.
- **Módulo 21 — Erosão Elétrica, Deformação Plástica, Fratura e Estudos de Caso**: conclui a classificação ISO 15243
  (corrente excessiva/corrente de fuga, sobrecarga/indentação por partículas, fratura forçada/por fadiga/térmica)
  e traz quatro estudos de caso reais documentados pela SKF (descarrilamento de trem, motor elétrico, moinho de
  argila, britador de mandíbulas), cada um com causa raiz e ação corretiva.

Os diagramas usados nesses três módulos (zonas de carga, padrões de pista, cada modo de falha) são esquemas originais
gerados por `scripts/gen_failure_diagrams.py`, no mesmo estilo visual dos demais gráficos do curso — não são
reproduções das imagens/fotos dos materiais SKF originais.

## Resumo por módulo

Todos os 22 módulos têm uma caixa "📌 Resumo do módulo" com os principais pontos da aula, posicionada logo
antes dos exercícios de fixação — útil para revisão rápida antes de responder ao quiz.

## Prática de Diagnóstico: gráficos maiores + ponto de medição

Os gráficos de espectro na página de prática agora ocupam a largura total da tela (antes divididos em duas colunas) e,
além do hover com tooltip, um clique no gráfico fixa um "ponto de medição" — um marcador vermelho persistente com a
leitura exata de ordem/tempo e amplitude, como se o aluno estivesse manualmente posicionando o cursor de um analisador
de vibração real sobre um pico específico.

## Correções desta rodada

- **Modo escuro**: variáveis de cor de texto (`--heading`) e de botões (`--btn-strong`) foram separadas da cor de
  fundo da barra lateral, corrigindo textos e botões que ficavam quase pretos (ilegíveis) no tema escuro.
- **Vídeos**: o player agora detecta automaticamente quando o arquivo de vídeo referenciado no manifest não existe ou
  falha ao carregar, e volta ao cartão "em produção" em vez de mostrar um player quebrado.
- **Menu suspenso de navegação**: novo botão "☰ Menu" no canto superior esquerdo, com acesso rápido a Início, Prática,
  Chat, Consulta Rápida e alternância de tema — útil em qualquer página, especialmente no celular.
- **Responsividade**: tabelas agora rolam horizontalmente em telas pequenas em vez de quebrar o layout; diversos
  ajustes de espaçamento/quebra de linha para celular (topbar, botões de áudio, painel de diagnóstico, chat, consulta
  rápida).
- **Leitura em áudio mais natural**: o texto agora é lido frase a frase (com pequena pausa entre elas, como uma
  respiração) em vez de uma leitura corrida, e a voz é escolhida priorizando as opções de melhor qualidade disponíveis
  no navegador (Google/Microsoft/Natural), evitando vozes robóticas "compactas" quando há alternativa melhor.
- **Conteúdo revisado**: um erro de unidade na tabela da ISO 10816-5 (Módulo 4) foi corrigido — os limites de
  deslocamento pico a pico são em micrômetros (µm), não milímetros, conforme a norma original.

## Roteiros de narração dos vídeos

Os roteiros de narração de cada módulo estão em `data/video_scripts.json`, usados como referência de conteúdo/estrutura para os vídeos (estética inspirada no **Telecurso 2000** — professor/apresentador explicando de forma direta, com slides de apoio para fórmulas e espectros). Os vídeos em si são gerados via NotebookLM (ver seção "Vídeo-aulas via NotebookLM" abaixo).

## Melhorias — Rodada C

- **Navegação por teclado no marcador de gráficos**: depois de clicar e fixar um ponto de medição num gráfico
  dinâmico, as setas ← e → do teclado deslocam esse ponto pela curva, atualizando ao vivo os valores mostrados
  (`assets/js/charts.js`, `renderSpectrumSVG` → `placeMarkerByIdx`). O elemento de captura de clique recebeu
  `tabindex="0"` e ganha foco visual (`.hover-capture:focus`) ao ser clicado.
- **Leitura em áudio com voz de IA (opcional)**: a leitura das aulas agora tem dois motores. Se o aluno já configurou
  uma chave de API da OpenAI (na página Chat com IA), a leitura usa a voz neural da OpenAI (`/v1/audio/speech`,
  modelo `gpt-4o-mini-tts`), muito mais natural que a voz do navegador. Sem chave configurada, ou se a chamada falhar
  (CORS, rede, chave inválida), a leitura cai automaticamente para o motor de voz do navegador (Web Speech API) já
  existente, sem travar o botão. Um selo (`#audio-engine-badge`) indica qual motor está em uso a cada momento
  (`assets/js/audio.js`).
- **Menu suspenso reposicionado**: o botão "☰ Menu" de navegação rápida foi movido do canto superior esquerdo para o
  canto superior direito, ao lado do botão de alternância de tema (`#quick-nav` agora usa `right` em vez de `left`
  no CSS).
- **Botão "🧪 Laboratório" em todos os módulos e na página de Prática de Diagnóstico**: abre um modal com quatro
  abas — calculadora (com teclado numérico funcional: aceita digitação real, incluindo +, -, *, /, Enter e Esc),
  conversores/fórmulas (ver abaixo), anotações do aluno (texto, salvo por módulo/página) e rascunho livre tipo
  caneta (canvas com cores/espessura, salvo por módulo/página). Tudo persistido no localStorage, por id de módulo
  ou `"practice"` para a página de prática (`assets/js/lab.js`, `assets/css/lab.css`).
- **Aba "Conversores" redesenhada — seletor de tipo + campos bidirecionais**: em vez de uma lista fixa de linhas
  de conversão de mão única, agora existe um único seletor (`<select>`) para escolher o tipo de conversão/cálculo
  desejado, com os campos correspondentes aparecendo logo abaixo. Nas conversões de unidade (RPM↔Hz,
  deslocamento↔velocidade↔aceleração numa frequência f, pico↔RMS↔pico-a-pico com fator de crista, dB↔razão de
  amplitude, °C↔°F), digitar em QUALQUER um dos campos ligados recalcula os outros automaticamente — "e
  vice-versa", exatamente como pedido. Além disso, foram adicionadas três novas calculadoras de **fórmulas do
  curso**, que exigem múltiplas variáveis de entrada: frequências de defeito de rolamento (BPFO/BPFI/BSF/FTF,
  Módulo 7 — validado contra o exemplo numérico do próprio módulo), frequência de engrenamento (GMF, Módulo 8) e
  vida nominal do rolamento (L10/Lnm, Módulo 19, com conversão automática para horas e anos de operação). Se
  faltar algum valor para completar um cálculo, o campo/resultado simplesmente fica em branco ou mostra um
  travessão "—" (nunca "NaN" ou lixo), pronto para o usuário completar a digitação.
- **Chat com IA migrado de Anthropic/Claude para OpenAI/ChatGPT**: o chat agora usa a API de chat completions da
  OpenAI (`gpt-4o-mini`) em vez da API da Anthropic, com a chave do próprio aluno salva localmente
  (`vibcourse_openai_api_key`, compartilhada com a leitura de voz de IA). A lógica de chamada HTTP foi extraída para
  um helper compartilhado (`assets/js/openai.js`). **Ressalva técnica importante**: como este site é 100% estático
  (sem servidor), a chamada à API da OpenAI é feita direto do navegador. Diferente da Anthropic — que tem um cabeçalho
  oficial para permitir chamadas diretas do navegador —, a OpenAI não garante esse mesmo suporte, então é possível que
  a chamada seja bloqueada por CORS dependendo da política vigente da conta/API no momento do uso. Se isso acontecer,
  uma mensagem de erro clara aparece na tela (o site não trava); a única solução definitiva seria um pequeno
  backend/proxy próprio, fora do escopo de um site estático.

**Nota sobre o Módulo de Galeria de Falhas**: o módulo dedicado às principais falhas de rolamentos e redutores
(imagens ilustrativas + gráficos dinâmicos simulando cenários reais) já havia sido criado na rodada anterior — é o
Módulo 18 ("Galeria de Falhas: Rolamentos e Redutores em Detalhe"), penúltimo item da trilha avançada, logo antes do
Glossário Técnico. Se ele não apareceu no material revisado, vale conferir se o arquivo mais recente do site foi
aberto (esta rodada substitui o pacote anterior).

## Vídeo-aulas via NotebookLM (nova abordagem, substitui a tentativa HeyGen)

A tentativa anterior de gerar vídeo-aulas usava o HeyGen HyperFrames via MCP, mas esbarrava num bloqueio de rede do
sandbox do assistente que impedia baixar os arquivos renderizados. Nesta rodada, a geração passou a ser feita pelo
**NotebookLM** (notebooklm.google.com), controlado através do navegador real do usuário — o que contorna o problema,
já que o download acontece no computador do próprio usuário.

Processo: um notebook dedicado por módulo, com o texto do módulo como fonte, gerando um "Resumo em Vídeo" (formato
"Vídeo explicativo", em português) com um foco didático voltado a engenheiros de manutenção/confiabilidade.

Prontos e já vinculados: **Módulos 0, 1 e 2** (`assets/video/m0.mp4`, `m1.mp4`, `m2.mp4`, referenciados em
`data/video_manifest.json` e no campo `videoUrl` de cada módulo em `data/content.js`).

Pendentes: **Módulos 3 a 18** — o NotebookLM tem um limite diário de gerações de vídeo (esgotado nesta sessão após 3
vídeos). Instruções completas para retomar o processo (incluindo os notebooks já criados, prontos para reaproveitar)
estão em `assets/video/LEIA-ME.txt`.

## Trilha "Engenheiro de Lubrificação" + menu em 3 categorias + prática com casos reais de óleo (Rodada I)

A partir de 4 documentos de referência enviados pelo usuário (`Livro - MLE - Engenheiro Lubrificação de Máquina.pdf`,
`Requerimento Certificacao - ICML-MLA-MLT.pdf`, `Catalogo - Noria-Training.pdf`, `Livro - Lubricacion-Noria-Nivel-I.pdf`),
o curso ganhou uma terceira especialização completa, voltada à lubrificação industrial.

**Extração de conteúdo dos PDFs**: os dois livros-texto maiores (`Lubricacion-Noria-Nivel-I`, 264 páginas, e `MLE`, 267
páginas) são PDFs escaneados/baseados em imagem — a extração de texto (`pdfplumber`) não retornou conteúdo utilizável,
e o ambiente de sandbox não tem pacote de idioma português instalado para o `tesseract` (OCR), apenas inglês. Os outros
dois documentos (`Requerimento Certificacao - ICML-MLA-MLT.pdf` e `Catalogo - Noria-Training.pdf`) extraíram texto
perfeitamente e serviram como base primária: o primeiro é o **Body of Knowledge oficial do ICML** (International
Council for Machinery Lubrication) para as certificações MLT I/II e MLA I/II/III, com o percentual de peso de cada
tópico no exame; o segundo é o **catálogo de treinamento da Noria**, descrevendo o conteúdo de seus 5 cursos
(Industrial Lubrication Fundamentals, Machinery Lubrication I/II, Oil Analysis Report Interpretation Workshop, Oil
Analysis II/III). Os 8 novos módulos foram redigidos com base nesses dois documentos.

**8 novos módulos (`data/lube_content.js`, IDs `mlub1`-`mlub8`)**:

1. **L1 — Fundamentos de Tribologia e Lubrificação** (básico): por que as máquinas falham, regimes de lubrificação (hidrodinâmico, EHD, filme misto, limítrofe), funções do lubrificante.
2. **L2 — Óleos Base, Aditivos e Propriedades** (básico): minerais x sintéticos, funções de cada aditivo, viscosidade/VI/TAN/TBN, lubrificantes de grau alimentício.
3. **L3 — Graxas Lubrificantes** (básico): como a graxa é feita, tipos de espessante e compatibilidade, consistência NLGI, boas práticas de aplicação.
4. **L4 — Seleção de Lubrificantes por Aplicação** (intermediário): seleção de viscosidade, critérios por tipo de componente, consolidação de lubrificantes.
5. **L5 — Armazenamento, Manuseio e Aplicação** (intermediário): recebimento/armazenamento, sistemas automáticos de lubrificação, cálculos básicos, rotas de lubrificação.
6. **L6 — Contaminação e Filtração** (intermediário): partículas (ISO 4406), água, glicol, fuligem, combustível, ar/espuma, rating de filtro (Beta ratio).
7. **L7 — Amostragem e Análise de Óleo** (avançado): onde/como amostrar, principais testes de laboratório e o que cada um revela, interpretação de relatórios.
8. **L8 — Análise de Desgaste, Ferrografia e Gestão do Programa** (avançado): mecanismos de desgaste, ferrografia analítica, gestão do programa de análise de óleo, trilha de certificação ICML (MLT I/II, MLA I/II/III).

Cada módulo segue exatamente o mesmo schema dos módulos já existentes (`body`, `quizzes`, `summary`, `meta`), incluindo
tabelas de referência (tipos de espessante, graus NLGI, faixas ISO VG, tipos de contaminação, testes ASTM, níveis de
certificação ICML) no mesmo formato usado pelos demais módulos do curso.

**Nova seção "Engenheiro de Lubrificação" na Prática de Diagnóstico** (`data/lube_cases.js`, 10 casos, IDs `lc1`-`lc10`):
casos reais de interpretação de relatório de análise de óleo — contaminação por partículas, água, glicol, combustível
e ar; degradação oxidativa/térmica; lubrificante errado (incompatibilidade de graxas); desgaste por fadiga (detectado
por ferrografia) e por cavitação — cobrindo os principais tipos de contaminação e degradação do Body of Knowledge
ICML MLA. A seção reaproveita **exatamente a mesma estrutura** já usada nas duas seções anteriores: chips agrupados
por nível (básico/intermediário/avançado), painel de dados de campo + leituras (aqui, leituras de laboratório em vez
de vibração), opções de diagnóstico com botão "Verificar diagnóstico", dica opcional, e o mini-guia "O que fazer em
cada hipótese de diagnóstico" (mostrando a solução de cada opção, não só a correta) introduzido na rodada anterior.
Cada caso também tem o badge de módulo relacionado ("🎓 Módulo L6 — ...") que leva direto à teoria correspondente.

**Menu lateral reorganizado em 3 categorias temáticas** (`assets/js/app.js`): a barra lateral agora agrupa os 30
módulos em três trilhas — **Análise de Vibração I, II e III** (18 módulos: os antigos m0-m17, exceto os de
rolamentos), **Análise de Falhas - Rolamentos** (4 módulos: m18-m21) e **Engenheiro de Lubrificação** (8 módulos:
mlub1-mlub8) — e, **dentro de cada trilha, os módulos continuam agrupados por nível** (básico/intermediário/avançado),
exatamente como antes. Cada grupo de nível dentro de cada trilha pode ser recolhido/expandido de forma independente
(chave composta `trilha|nível` no `localStorage`, já que o mesmo nível — ex.: "avançado" — agora existe em mais de uma
trilha). O cartão de capa do curso também foi atualizado para mostrar um cartão por trilha, com os módulos listados
por nível dentro de cada um. A categorização vive no novo campo `meta.track` de cada módulo (`"vibracao"`,
`"rolamentos"` ou `"lubrificacao"`), e os dois arrays de módulos (`COURSE` de `data/content.js` e `LUBE_COURSE` de
`data/lube_content.js`) são combinados internamente por `app.js` (`ALL_MODULES`) para toda a navegação/progresso.

Testado via `test_site_v3.js` (sidebar com as 3 categorias e os 8 módulos de lubrificação, navegação para `mlub1`) e
`test_practice.js` (3ª aba na Prática de Diagnóstico, painel de leituras de óleo, diagnóstico certo/errado, mini-guia
de solução, progresso salvo, e os 10 casos sem nenhum problema de renderização).

## Quizzes de múltipla escolha em todos os 30 módulos + 4 novos módulos de Lubrificação (L9-L12) + percentual por trilha (Rodada J)

Rodada de melhorias pedida pelo usuário após a entrega da Rodada I, com 6 pontos: mais exemplos visuais na trilha de
Lubrificação, mais conteúdo baseado nos livros/site da Noria, mais exercícios na seção de Lubrificação da Prática de
Diagnóstico (incluindo exercícios visuais de tribologia, ferrografia analítica e um "laudo de análise de óleo" no
estilo LUBRIN/PURILUB), conteúdo sobre o código LIS de lubrificantes (grafado "LINS" pelo usuário — confirmado via
pesquisa como o **LIS, Lubricant Identification System**, da Noria, adotado no Brasil pela Lubrin), opções de
resposta com correção de acerto nos exercícios, e percentual de conclusão por trilha no menu lateral.

**16 novos diagramas ilustrativos para a trilha de Lubrificação** (`assets/img/lub_01_stribeck.png` a
`lub_16_hierarquia_descarte.png`, gerados por `scripts/gen_lube_diagrams.py` com matplotlib): curva de Stribeck,
composição do óleo, viscosidade × temperatura (efeito do VI), estrutura da graxa, escala NLGI, seleção de ISO VG,
armazenamento correto de tambores, intervalo de relubrificação × temperatura, código ISO 4406, beta ratio de
filtros, ponto de amostragem correto, morfologia de partículas de desgaste, etiqueta do sistema LIS, MPC/RULER/RPVOT,
roda ASCEND e hierarquia de descarte — inseridos diretamente no corpo dos 8 módulos L1-L8 já existentes (entre 1 e 2
imagens por módulo), que antes eram só texto.

**4 novos módulos de Lubrificação** (`data/lube_content.js`, IDs `mlub9`-`mlub12`, elevando a trilha para 12 módulos):

9. **L9 — LIS: Identificação de Lubrificantes** (intermediário): o sistema LIS (Noria/Lubrin) — código por cor
   (faixa de viscosidade), forma geométrica (tipo de lubrificante/espessante), classificação ISO 6743 e grau de
   viscosidade ISO/SAE, permitindo identificação do lubrificante correto independentemente da marca comercial.
10. **L10 — Verniz, RULER e RPVOT** (avançado): formação de verniz por oxidação, MPC (Membrane Patch Colorimetry),
    RULER (voltametria de varredura linear para antioxidantes) e RPVOT — três testes que se complementam para
    monitorar a saúde química do óleo antes que o desempenho seja afetado.
11. **L11 — Programa de Classe Mundial (ASCEND)** (avançado): o framework ASCEND da Noria (seleção, recebimento e
    armazenamento, manuseio e aplicação, controle de contaminação, análise e monitoramento de condição, descarte
    ambiental) e o conceito de ORS (Optimum Reference State).
12. **L12 — Descarte, Segurança e Meio Ambiente** (intermediário): descarte responsável de óleo usado, EPIs,
    riscos químicos e ergonômicos da lubrificação industrial, hierarquia de gestão de resíduos.

**Quizzes de múltipla escolha em todos os 30 módulos (98 perguntas)**: o formato antigo de quiz (pergunta em texto
livre + botão "Ver gabarito comentado") foi substituído, em **todos** os módulos do curso — os 22 módulos clássicos
de `data/content.js`, os 8 módulos originais de Lubrificação (`mlub1`-`mlub8`) e os 4 novos (`mlub9`-`mlub12`, que já
nasceram no formato novo) —, por perguntas de múltipla escolha com 4 alternativas, correção instantânea (certo/errado
destacado visualmente assim que uma opção é escolhida) e explicação da resposta. Novo schema de cada pergunta:
`{text, options:[{id,text}], correct, explanation}`, substituindo o antigo `quiz.questions`/`quiz.answers` em
arrays paralelos. `assets/js/app.js` ganhou uma nova `renderQuiz()` (options com `<input type="radio">`, um
`name` de grupo único por pergunta — `quiz-<moduloId>-<índiceDoQuiz>-<índiceDaPergunta>` — para não colidir entre
os múltiplos blocos de quiz de um mesmo módulo, como o Módulo 16) e uma nova função global `checkQuizAnswer()`
(destaca a opção correta em verde, a errada escolhida em vermelho, mostra o feedback e revela a explicação,
desabilitando as opções após a resposta). O conteúdo original de cada pergunta (extraído das 62 perguntas dos
módulos clássicos e das 24 dos módulos L1-L8) foi preservado como a resposta correta e a explicação; três
alternativas incorretas plausíveis foram escritas para cada uma.

**Percentual de conclusão por trilha no menu lateral** (`assets/js/app.js`, `renderSidebar()`): cada cabeçalho de
trilha (Análise de Vibração I/II/III, Análise de Falhas - Rolamentos, Engenheiro de Lubrificação) agora mostra, ao
lado do nome, um badge com o percentual de módulos concluídos daquela trilha especificamente (`.track-heading-pct`
em `assets/css/style.css`), calculado a partir do mesmo `localStorage` de progresso já existente — antes só havia
progresso agregado no topo da página de prática, sem visibilidade por trilha na navegação.

**"Laudo de análise de óleo" + exercícios visuais de ferrografia (9 novos casos, `lc11`-`lc19`, total de 19 na
seção de Lubrificação)**: novo componente `renderLaudo()` (`assets/js/practice.js` + `.laudo-report` em
`assets/css/practice.css`) que renderiza um relatório laboratorial completo — cabeçalho com dados da amostra,
tabela de físico-química, tabela de metais de desgaste (ICP), tabela de aditivos (ICP), contagem de partículas e
parecer técnico — com estrutura inspirada na organização típica de laudos reais de laboratórios como **LUBRIN** e
**PURILUB** (sem reproduzir logotipo, marca ou layout proprietário de nenhum dos dois). Usado em 4 novos casos
avançados/intermediários (compressor de parafuso com verniz/RULER/MPC, redutor com tendência de Fe/Cr e ferrografia,
motor a diesel com diluição por combustível, turbina a vapor com água livre no óleo). Mais 5 novos exercícios
visuais reaproveitam o campo `photo` já usado na seção de Análise de Falhas - Rolamentos: 4 diagramas inéditos de
morfologia de partícula (`assets/img/ferro_A_corte.png` a `ferro_D_oxido.png`, gerados por
`scripts/gen_ferrography_cards.py`) para exercícios de ferrografia analítica pedindo a identificação do mecanismo
de desgaste (corte, fadiga inicial/esférica, fadiga avançada/laminar, corrosão/óxido) a partir só da morfologia, e
1 exercício de leitura da etiqueta do sistema LIS (reaproveitando `lub_13_etiqueta_lis.png` do Módulo L9). Cada
caso de laudo/foto usa os mesmos componentes de diagnóstico, dica e mini-guia de solução já existentes; um novo
campo opcional `questionLabel` permite personalizar o título da pergunta quando o caso não é um diagnóstico de
causa raiz tradicional (ex.: "Qual mecanismo de desgaste esse diagrama representa?").

Testado via `test_site_v3.js` (todas as 98 perguntas de todos os módulos validadas no novo schema MC — 4 opções,
`correct` válido, `explanation` presente —, HTML do quiz contém as opções e não contém mais o botão antigo
"Ver gabarito comentado", `checkQuizAnswer()` executa sem erro) e `test_practice.js` (as 19 leituras de casos de
Lubrificação renderizam sem `undefined`/`[object Object]`, o caso de laudo mostra a tabela de físico-química e o
parecer técnico sem duplicar o painel antigo de leituras, e o caso de ferrografia visual mostra a foto e o
`questionLabel` customizado).
