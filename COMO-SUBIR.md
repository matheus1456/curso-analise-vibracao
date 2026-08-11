# Como subir a Rodada M no GitHub

Repositório: **https://github.com/matheus1456/curso-analise-vibracao**

Esta pasta tem **apenas os 42 arquivos desta rodada**, já na estrutura de pastas correta.
Total: 48 MB, nenhum arquivo acima do limite de 25 MB do GitHub.

> A pasta `ATUALIZAR-GITHUB` (sem sufixo) é da rodada anterior, que você já subiu no commit
> `ee54652`. Ignore aquela e use **esta**.

## Passo a passo

1. Abra **https://github.com/matheus1456/curso-analise-vibracao/upload/main**
2. Abra esta pasta no Explorador de Arquivos, selecione tudo com `Ctrl+A` e arraste para a
   área de upload da página. O GitHub preserva a estrutura das pastas.
3. Cole a mensagem de commit abaixo e clique em **Commit changes**:

```
Rodada M: tabela de diagnostico em texto nativo com busca, bloco de Referencias nos 37 modulos e nova pagina Biblioteca
```

## Conferência depois do commit

Recarregue o site com `Ctrl+Shift+R` e verifique:

- O botão **📊 Diagnóstico** abre a tabela em texto, com campo de busca e chips coloridos por
  categoria. Amplie com `Ctrl +`: o texto continua nítido.
- Aparece **📚 Biblioteca** no menu lateral, com 19 fichas e as capas dos PDFs.
- Qualquer módulo, ao final, mostra o bloco **📚 Referências deste módulo**.

## Um ponto importante sobre 8 arquivos

Oito PDFs do acervo **não** estão nesta pasta e não vão para o repositório:

| Arquivo | Motivo |
|---|---|
| `iso-10816-1.pdf` a `iso-10816-7.pdf` (6 normas) | Normas BS ISO são vendidas pela BSI/ISO sob licença individual |
| `mle-engenheiro-lubrificacao.pdf` | Livro comercial da Noria |
| `noria-lubricacion-nivel-i.pdf` | Livro comercial da Noria |

O livro da Noria traz impresso, em cada página, o aviso de que a reprodução ou distribuição
total ou parcial sem autorização por escrito é proibida. Como o repositório é **público**,
preferi não empacotar esses oito arquivos para publicação.

Eles continuam **funcionando normalmente na sua cópia local** (pasta `curso-vibracao-site` e no
`.zip`): a Biblioteca abre e baixa os oito sem restrição. Na versão publicada, essas fichas
aparecem com um aviso e um link para o site do editor.

Se você preferir publicá-los assim mesmo, é só copiar os oito arquivos de
`curso-vibracao-site\assets\pdf\` para dentro desta pasta antes de arrastar — a decisão é sua.

## Alternativa por linha de comando

Se preferir git, use a pasta completa `curso-vibracao-site` e veja `PUBLICAR-NO-GITHUB.md`.
Nesse caso, decida antes se quer ou não incluir os oito arquivos acima.
