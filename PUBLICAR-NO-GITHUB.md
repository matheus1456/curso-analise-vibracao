# Como publicar esta versão no GitHub

Repositório: **https://github.com/matheus1456/curso-analise-vibracao**

> Nota: o assistente que gerou esta versão não tem credenciais de push nem acesso de rede ao GitHub
> a partir do ambiente onde roda, então o envio precisa ser feito por você. Os passos abaixo são
> diretos e levam menos de um minuto.

## Situação desta pasta

Esta pasta (`curso-vibracao-site`) já está pronta para publicação:

- Todos os arquivos do curso na versão mais recente (37 módulos, 107 exercícios, 32 casos de espectro).
- **Os onze vídeos (Módulos 0 a 10) já estão em `assets/video/`**, todos recodificados para caber no
  limite de 25 MB por arquivo do GitHub (o maior tem 13 MB). Este era o motivo de os vídeos dos
  Módulos 6 a 10 não aparecerem no site publicado.
- Tamanho total: aproximadamente 99 MB.

## Opção 1 — Você já tem o repositório clonado no computador

```bash
# 1. Vá até a pasta do seu clone local
cd caminho/para/curso-analise-vibracao

# 2. Copie o conteúdo desta pasta por cima (Windows PowerShell)
robocopy "C:\Users\mathe\Downloads\curso-vibracao-site" . /E /XD .git

#    (macOS/Linux)
# rsync -a --exclude '.git' ~/Downloads/curso-vibracao-site/ .

# 3. Confira, faça o commit e envie
git status
git add -A
git commit -m "Rodada L: Módulo 24, pé manco e tolerâncias no M15, desalinhamento de polias no M9, tabelas SKF no M22, 5 casos novos e vídeos dos módulos 6-10"
git push
```

## Opção 2 — Você ainda não tem o repositório clonado

```bash
git clone https://github.com/matheus1456/curso-analise-vibracao.git
cd curso-analise-vibracao

# copie o conteúdo desta pasta por cima (ver comandos da Opção 1, passo 2)

git add -A
git commit -m "Rodada L: revisão do Manual SKF, novos módulos/exercícios e vídeos dos módulos 6-10"
git push
```

## Depois do push

Se o site estiver publicado via GitHub Pages, aguarde um ou dois minutos e recarregue a página com
`Ctrl+F5` (recarregamento forçado) — o navegador costuma manter em cache o `data/content.js` e os
vídeos antigos.

Para conferir se deu certo, abra qualquer módulo de 6 a 10: o player de vídeo deve aparecer no lugar
do cartão "em produção".

## Observação sobre os arquivos de vídeo

Os vídeos em `assets/video/` são versões comprimidas (960×540). As versões em resolução cheia
(1280×720, de 30 a 44 MB cada) ficam no pacote `.zip` completo entregue junto com esta pasta.
Elas não vão para o GitHub porque excedem o limite de 25 MB por arquivo.
