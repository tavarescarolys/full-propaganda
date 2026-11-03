# Site Full Propaganda

HTML, CSS e JavaScript puro, sem build obrigatório. Para publicar, envie tudo **menos** a pasta `_build/` para qualquer hospedagem estática.

```
index.html   styles.css   main.js   cases.js   favicon.ico
assets/cases/   WebP dos cases (gerados)
assets/logo/    os 4 SVGs do logo
fonts/          Glancyr Neue Expanded (Thin, ExtraLight, Bold) em WOFF2
_build/         originais das imagens e o script que gera os WebP (não publicar)
```

## Como mexer nos cases

- **Incluir, remover ou reordenar:** edite `cases.js`. A ordem do arquivo é a ordem da parede.
- **Tile 2×2:** `destaque: true`. Com 3 destaques e 27 cases, a parede fecha sem buracos em 6, 4, 3 e 2 colunas. Se mudar a quantidade, mantenha `cases + 3 × destaques` divisível por 12 para a parede continuar cheia.
- **Vídeo:** preencha `video` com a URL do YouTube ou Vimeo.
- **Imagens novas:** coloque o quadrado em `_build/originais/thumbs/thumb-<id>.jpg` e a peça completa em `_build/originais/pecas/image-<id>.jpg`, registre o id e o slug no topo de `_build/build-images.py` e rode `python3 _build/build-images.py` (precisa de Pillow).

## Formulário

Em `main.js`, preencha `FORM_ENDPOINT` com a URL do serviço (ex.: Formspree). Enquanto estiver vazio, o envio mostra a mensagem de erro.

## Pendências (REVISAR)

1. **Resolução das imagens.** No site antigo, 25 das 27 miniaturas quadradas têm só 250 px; só os cases 1 e 15 estão em alta. Em tela retina os tiles ficam suaves, e o destaque do case 11 (Prefeitura de Goiânia, 88 anos) fica visivelmente borrado. O case 5 usa um recorte da peça grande. Peça à Full os quadrados originais de 1654 px e rode o script.
2. **Case 2:** o título diz Goiânia e a descrição diz Aparecida de Goiânia (mantido como no ar, com comentário em `cases.js`).
3. **PROMO:** "estratégicas" ou "estratégias" (mantido, com comentário no HTML).
4. **Formulário:** definir o serviço e preencher `FORM_ENDPOINT`.
5. **Case 11:** URL do vídeo.
6. **Instagram:** o site já sabe mostrar as 6 últimas publicações. Falta conectar a conta: criar um feed em behold.so com o login do Instagram da Full e colar a URL do feed JSON em `INSTAGRAM_FEED_URL`, no `main.js`. Enquanto estiver vazio, aparecem imagens de cases.
7. **Licença da Glancyr Neue:** confirmar se a licença comprada cobre uso como webfont.
8. **Versão de apresentação:** o `index.html` tem `<meta name="robots" content="noindex, nofollow">` para o link temporário não aparecer no Google. Remover antes de publicar no domínio da Full.
9. **Compliance:** a seção tem um texto provisório entre colchetes. Substituir pelo conteúdo enviado pela Full.
