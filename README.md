# Site Full Propaganda

HTML, CSS e JavaScript puro, sem build obrigatório. Para publicar, envie tudo **menos** a pasta `_build/` para qualquer hospedagem estática.

```
index.html   styles.css   main.js   cases.js   favicon.ico
assets/cases/   WebP dos cases (gerados)
assets/logo/    os 4 SVGs do logo
fonts/          Glancyr Neue Expanded (Thin, ExtraLight, Bold) em WOFF2
_build/         originais das imagens e o script que gera os WebP (não publicar)
```

## Para o desenvolvedor

- **Rodar local:** `python3 -m http.server 8000` na pasta e abrir `http://localhost:8000`. Precisa ser por servidor: aberto direto como arquivo, o navegador bloqueia partes do JS.
- **Sem dependências:** não há npm, framework nem build. O que está na pasta é o que vai para o ar.
- **Versão de apresentação:** https://tavarescarolys.github.io/full-propaganda/ (repositório github.com/tavarescarolys/full-propaganda).

### Checklist para ir ao ar no domínio da Full

1. **Limpar a hospedagem antiga.** O site atual foi invadido (tem um link escondido de spam, "link gacor", apontando para kubancoffeeroasters.com). Apague todos os arquivos antigos do servidor antes de subir este, não mescle. Se o site antigo era WordPress, remova também o banco e os plugins.
2. **Trocar as senhas** de FTP/painel da hospedagem e do domínio, já que a invasão pode ter vindo por elas.
3. **Remover a linha `noindex`** do `index.html` (marcada com REVISAR), senão o Google não indexa o site.
4. **Formulário:** criar a conta no serviço escolhido e preencher `FORM_ENDPOINT` no `main.js`. Testar um envio de verdade.
5. **HTTPS ativo** e redirecionamento de `www` para o domínio principal (ou o contrário). As tags `og:url` e `og:image` apontam para `https://fullpropaganda.com.br/`.
6. **Subir tudo menos `_build/`, `.git/` e `README.md`.**
7. **Depois de publicar:** testar o link no WhatsApp (imagem de compartilhamento), o formulário e um case aberto por endereço, por exemplo `/#case-nova-sede-alego`.

## Como mexer nos cases

- **Incluir, remover ou reordenar:** edite `cases.js`. A ordem do arquivo é a ordem da parede.
- **Tile 2×2:** `destaque: true`. Com 3 destaques e 27 cases, a parede fecha sem buracos em 6, 4, 3 e 2 colunas. Se mudar a quantidade, mantenha `cases + 3 × destaques` divisível por 12 para a parede continuar cheia.
- **Vídeo:** preencha `video` com a URL do YouTube ou Vimeo.
- **Imagens novas:** coloque o quadrado em `_build/originais/thumbs/thumb-<id>.jpg` e a peça completa em `_build/originais/pecas/image-<id>.jpg`, registre o id e o slug no topo de `_build/build-images.py` e rode `python3 _build/build-images.py` (precisa de Pillow).

## Formulário

Em `main.js`, preencha `FORM_ENDPOINT` com a URL do serviço (ex.: Formspree). Enquanto estiver vazio, o envio mostra a mensagem de erro.

## Conteúdo pendente (REVISAR)

1. **Resolução das imagens.** No site antigo, 25 das 27 miniaturas quadradas têm só 250 px; só os cases 1 e 15 estão em alta. Em tela retina os tiles ficam suaves, e o destaque do case 11 (Prefeitura de Goiânia, 88 anos) fica visivelmente borrado. O case 5 usa um recorte da peça grande. Peça à Full os quadrados originais de 1654 px e rode o script.
2. **Case 2:** o título diz Goiânia e a descrição diz Aparecida de Goiânia (mantido como no ar, com comentário em `cases.js`).
3. **PROMO:** "estratégicas" ou "estratégias" (mantido, com comentário no HTML).
4. **Formulário:** definir o serviço e preencher `FORM_ENDPOINT`.
5. **Case 11:** URL do vídeo.
6. **Instagram:** a grade usa prints dos 6 posts mais recentes (nov/2026), em `assets/instagram/`. Para atualizar, troque as imagens (480×640) e os links no `index.html`. Para um feed automático, crie um feed JSON no behold.so com o login do Instagram da Full e cole a URL em `INSTAGRAM_FEED_URL`, no `main.js`.
7. **Licença da Glancyr Neue:** confirmar se a licença comprada cobre uso como webfont.
8. **Versão de apresentação:** o `index.html` tem `<meta name="robots" content="noindex, nofollow">` para o link temporário não aparecer no Google. Remover antes de publicar no domínio da Full.
9. **Compliance:** a seção tem um texto provisório entre colchetes. Substituir pelo conteúdo enviado pela Full.
