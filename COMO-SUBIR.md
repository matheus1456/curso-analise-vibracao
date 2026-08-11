# Como subir esta atualização no GitHub (2 minutos, sem git)

Esta pasta contém **apenas os 25 arquivos que mudaram** desde o último envio ao
repositório — já organizados na estrutura de pastas correta.

Repositório: https://github.com/matheus1456/curso-analise-vibracao

## Passo a passo

1. Abra: **https://github.com/matheus1456/curso-analise-vibracao/upload/main**
   (você já está logado como `matheus1456`)

2. Abra esta pasta (`ATUALIZAR-GITHUB`) no Explorador de Arquivos.

3. Selecione **tudo que está dentro dela** (`Ctrl+A`) — os arquivos soltos e as
   pastas `assets`, `data` e `scripts` — e **arraste para a área de upload** da
   página do GitHub.

   > O GitHub preserva a estrutura de pastas ao arrastar. Os arquivos vão cair
   > automaticamente em `assets/video/`, `data/`, etc. Não é preciso repetir o
   > processo pasta por pasta.

4. Aguarde a barra de progresso terminar (são 37 MB, quase tudo vídeo).

5. Em **Commit changes**, cole a mensagem abaixo e clique em **Commit changes**:

```
Rodada L: Módulo 24, pé manco e tolerâncias no M15, desalinhamento de polias no M9, tabelas SKF no M22, 5 casos novos e vídeos dos módulos 6-10
```

## Conferência depois do commit

- Abra `assets/video/` no repositório: devem aparecer **m0 a m10** (antes só ia até m5).
- No site publicado, abra qualquer módulo de 6 a 10 e recarregue com `Ctrl+F5`:
  o player de vídeo deve aparecer no lugar do cartão "em produção".

## O que mudou nestes 25 arquivos

| Arquivo | O que mudou |
|---|---|
| `data/content.js` | Módulo 24 novo, seções novas nos Módulos 9, 15 e 22, numeração corrigida |
| `data/cases.js` | 5 casos novos na Prática de Diagnóstico (c28–c32) |
| `data/video_manifest.json` | Vídeos dos Módulos 6 a 10 registrados |
| `assets/video/m6…m10.mp4` | Vídeo-aulas novas, recomprimidas para caber no limite do GitHub |
| `assets/img/skf_01…05.png` | 5 diagramas novos (pé manco, correias, designação, tolerâncias, montagem) |
| `assets/img/tabela_diagnostico_skf.jpeg` | Tabela de diagnóstico usada no botão flutuante |
| `index.html`, `assets/css/style.css`, `assets/js/app.js` | Botão flutuante "📊 Diagnóstico" + modal com zoom |
| `README.md`, `assets/video/LEIA-ME.txt` | Documentação atualizada |
| `test_*.js` | Testes atualizados e correção de caminho fixo |
| `scripts/gen_skf_manual_diagrams.py` | Script que gera os 5 diagramas novos |

## Alternativa por linha de comando

Se preferir usar git, veja `PUBLICAR-NO-GITHUB.md` — mas aí use a pasta
`curso-vibracao-site` (completa), não esta.
