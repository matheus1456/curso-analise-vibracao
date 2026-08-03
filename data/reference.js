// Gerado manualmente — conteúdo da página "Consulta Rápida" (referência de bolso
// para o Engenheiro de Confiabilidade no dia a dia). Consolida os principais
// padrões espectrais, fórmulas de rolamento e limites da ISO 10816 já cobertos
// nos módulos do curso, num formato de consulta rápida e imprimível (PDF).
const REFERENCE = {
  "sections": [
    {
      "title": "1. Diagnóstico rápido por ordem do espectro (x RPM)",
      "intro": "Antes de qualquer coisa, identifique em que ordem (múltiplo da rotação) está o pico dominante — isso já reduz bastante as hipóteses.",
      "table": {
        "header": [
          "Ordem dominante",
          "Padrão típico",
          "Defeito mais provável",
          "Módulo"
        ],
        "rows": [
          [
            "1X",
            "Único pico dominante, direção radial, fase estável",
            "Desbalanceamento de massa",
            "6.1"
          ],
          [
            "2X",
            "Domina sobre 1X, forte na direção axial, fase ~180° através do acoplamento",
            "Desalinhamento angular",
            "6.2"
          ],
          [
            "2X",
            "Radial, forte em ambas as direções, sem componente axial relevante",
            "Desalinhamento paralelo",
            "6.2"
          ],
          [
            "1X, 2X, 3X... (série completa) + sub-harmônicos (0,5X, 1,5X...)",
            "Muitos harmônicos, forma de onda truncada, fase instável",
            "Folga mecânica",
            "6.3"
          ],
          [
            "1X (alta amplitude axial e radial)",
            "Amplitude cresce com o cubo da rotação",
            "Eixo empenado (bent shaft)",
            "6.4"
          ],
          [
            "1X",
            "Direção radial dominante, semelhante a desbalanceamento, mas de origem geométrica",
            "Rotor excêntrico",
            "6.5"
          ],
          [
            "Coincide com frequência natural medida em teste de impacto",
            "Amplificação de uma frequência de excitação normal (1X, BPF, GMF...)",
            "Ressonância",
            "6.6"
          ],
          [
            "Não síncrona (não é múltiplo inteiro de 1X)",
            "Pico instável, pulsando com a rotação do equipamento acionado",
            "Correia gasta/frouxa/desigual",
            "9"
          ],
          [
            "Número de dentes do pinhão (GMF) e harmônicos",
            "Bandas laterais espaçadas na rotação do eixo modulador",
            "Desgaste/folga/desalinhamento de engrenamento",
            "8"
          ],
          [
            "Ranhuras do rotor (nº de barras × RPM)",
            "Pico discreto de alta ordem, envelope normal, temperatura elevada",
            "Defeito elétrico (barras/ranhuras do rotor)",
            "10"
          ],
          [
            "Nº de pás × RPM (BPF)",
            "Amplitude anormal, pode coincidir com frequência natural",
            "BPF elevado / ressonância estrutural",
            "11.1"
          ],
          [
            "Banda larga aleatória sobreposta ao BPF",
            "Ruído tipo 'pedregulhos', varia com nível de sucção",
            "Cavitação (NPSH insuficiente)",
            "11.2"
          ]
        ]
      }
    },
    {
      "title": "2. Bandas laterais (sidebands) — como interpretar o espaçamento",
      "intro": "Bandas laterais são picos simétricos ao redor de uma frequência central (GMF, BPFO, 1X...). O espaçamento entre elas é sempre igual à frequência de modulação — é isso que revela a causa.",
      "table": {
        "header": [
          "Frequência central modulada",
          "Espaçamento das bandas",
          "Causa da modulação",
          "Módulo"
        ],
        "rows": [
          [
            "GMF (frequência de engrenamento)",
            "1X do eixo do pinhão",
            "Excentricidade/folga associada ao pinhão",
            "8.2"
          ],
          [
            "GMF (frequência de engrenamento)",
            "1X do eixo da coroa",
            "Excentricidade/folga associada à coroa",
            "8.2"
          ],
          [
            "1X (rotação do motor)",
            "2× a frequência de polo (2×fp)",
            "Barras de rotor quebradas (motor de indução)",
            "10"
          ],
          [
            "BPFO / BPFI (frequência de defeito de rolamento)",
            "1X do eixo",
            "Defeito de rolamento carregado pela rotação do eixo (Estágio 3)",
            "7.4"
          ],
          [
            "Qualquer pico de alta frequência",
            "Frequência de escorregamento ou de operação instável",
            "Modulação por variação de carga/velocidade",
            "5.2"
          ]
        ]
      }
    },
    {
      "title": "3. Frequências características de defeito de rolamento",
      "intro": "Fórmulas padrão (n = número de elementos rolantes, Bd = diâmetro do elemento, Pd = diâmetro primitivo, φ = ângulo de contato, RPM = rotação do eixo em Hz). A maioria dos fabricantes (inclusive SKF) fornece essas frequências prontas para o rolamento específico.",
      "table": {
        "header": [
          "Sigla",
          "Nome",
          "Fórmula (aproximada)",
          "Indica defeito em"
        ],
        "rows": [
          [
            "BPFO",
            "Ball Pass Frequency Outer race",
            "(n/2) × RPM × [1 − (Bd/Pd)·cos φ]",
            "Pista externa"
          ],
          [
            "BPFI",
            "Ball Pass Frequency Inner race",
            "(n/2) × RPM × [1 + (Bd/Pd)·cos φ]",
            "Pista interna"
          ],
          [
            "BSF",
            "Ball Spin Frequency",
            "(Pd/2Bd) × RPM × [1 − (Bd/Pd)²·cos²φ]",
            "Elemento rolante (esfera/rolo)"
          ],
          [
            "FTF",
            "Fundamental Train Frequency",
            "(RPM/2) × [1 − (Bd/Pd)·cos φ]",
            "Gaiola (cage)"
          ]
        ]
      }
    },
    {
      "title": "4. Os quatro estágios de evolução da falha de rolamento",
      "intro": "A técnica de envelope de aceleração existe justamente para detectar o Estágio 1, muito antes de qualquer alteração em velocidade ou aceleração pura.",
      "table": {
        "header": [
          "Estágio",
          "O que aparece",
          "Velocidade (mm/s)",
          "Envelope (gE)",
          "Ação recomendada"
        ],
        "rows": [
          [
            "1 — Submicroscópico",
            "Só o envelope de aceleração reage",
            "Normal",
            "Levemente elevado",
            "Aumentar frequência de monitoramento"
          ],
          [
            "2 — Início na pista",
            "Picos discretos começam a aparecer em BPFO/BPFI",
            "Normal a levemente elevada",
            "Elevado",
            "Planejar substituição, sem urgência"
          ],
          [
            "3 — Estabelecido",
            "Harmônicos de BPFO/BPFI com bandas laterais em 1X",
            "Elevada",
            "Muito elevado",
            "Planejar parada em curto/médio prazo"
          ],
          [
            "4 — Falha iminente",
            "Ruído de banda larga, harmônicos desaparecem, temperatura sobe",
            "Muito elevada / errática",
            "Pode cair (defeito grande demais)",
            "Parar e substituir imediatamente"
          ]
        ]
      }
    },
    {
      "title": "5. Zonas de severidade — ISO 10816 (resumo por parte da norma)",
      "intro": "Cada parte da família ISO 10816 define limites diferentes conforme o tipo/porte da máquina. Os valores abaixo são uma referência resumida — sempre consulte a parte específica da norma (10816-2/3/4/5/7) para o caso real.",
      "table": {
        "header": [
          "Parte da norma",
          "Aplicação",
          "Zona B/C (mm/s RMS, aprox.)",
          "Zona C/D (mm/s RMS, aprox.)"
        ],
        "rows": [
          [
            "ISO 10816-2",
            "Turbinas a vapor e geradores de grande porte",
            "3,8",
            "9,3"
          ],
          [
            "ISO 10816-3 (Grupo 1)",
            "Máquinas grandes (>300 kW), suporte rígido",
            "4,5",
            "7,1"
          ],
          [
            "ISO 10816-3 (Grupo 2)",
            "Máquinas médias (15–300 kW)",
            "2,8",
            "7,1"
          ],
          [
            "ISO 10816-4",
            "Turbinas a gás",
            "4,5",
            "9,3"
          ],
          [
            "ISO 10816-5",
            "Máquinas hidráulicas (turbinas/bombas de armazenamento)",
            "4,5",
            "7,1"
          ],
          [
            "ISO 10816-7",
            "Bombas centrífugas (rotodinâmicas)",
            "3,5",
            "6,3"
          ]
        ]
      }
    },
    {
      "title": "6. Leitura combinada do coletor (padrão SKF) — o que cada valor indica",
      "intro": "Um bom diagnóstico de campo sempre olha as quatro leituras juntas, não isoladamente — o padrão de qual delas está alterada é o que direciona a hipótese.",
      "table": {
        "header": [
          "Leitura",
          "Unidade",
          "Sensível a...",
          "Sobe sozinha quando..."
        ],
        "rows": [
          [
            "Temperatura",
            "°C",
            "Atrito, lubrificação, carga elétrica",
            "Lubrificação deficiente, defeito elétrico, sobrecarga"
          ],
          [
            "Velocidade de vibração",
            "mm/s RMS",
            "Desbalanceamento, desalinhamento, folga (energia em baixa/média frequência)",
            "Defeitos mecânicos já estabelecidos (Estágio 3+ de rolamento)"
          ],
          [
            "Aceleração pura",
            "g",
            "Impactos e defeitos de alta frequência (engrenagens, rolamentos avançados)",
            "Desgaste de engrenagem, rolamento em estágio avançado"
          ],
          [
            "Envelope de aceleração",
            "gE Pk-Pk",
            "Impactos de altíssima frequência (defeito de rolamento incipiente)",
            "Rolamento em Estágio 1 — antes de qualquer outra leitura reagir"
          ]
        ]
      }
    },
    {
      "title": "7. Conversões e unidades rápidas",
      "intro": "Conversões úteis para quando o coletor ou o relatório do fabricante usa uma unidade diferente da que você está acostumado.",
      "table": {
        "header": [
          "De",
          "Para",
          "Fórmula / fator"
        ],
        "rows": [
          [
            "Hz",
            "CPM (ciclos por minuto)",
            "CPM = Hz × 60"
          ],
          [
            "CPM",
            "Ordens (x RPM)",
            "Ordem = CPM da linha ÷ RPM da máquina"
          ],
          [
            "Velocidade de pico (mm/s pk)",
            "Velocidade RMS (mm/s RMS)",
            "RMS = pico ÷ √2 (para onda senoidal pura)"
          ],
          [
            "Aceleração (g)",
            "Velocidade equivalente (mm/s) numa frequência f (Hz)",
            "v [mm/s] ≈ (a [g] × 9806) ÷ (2π × f)"
          ],
          [
            "dB",
            "Razão de amplitude",
            "dB = 20 × log₁₀(amplitude/referência)"
          ]
        ]
      }
    }
  ]
};
