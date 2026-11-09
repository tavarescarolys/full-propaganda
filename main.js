/* Full Propaganda */
(function () {
  "use strict";

  // URL do serviço que recebe o formulário (Formspree ou similar).
  // Ex.: "https://formspree.io/f/xxxxxxx". Vazio: o envio mostra a mensagem de erro.
  var FORM_ENDPOINT = "";

  // Feed JSON do Instagram (Behold.so ou serviço com o mesmo formato).
  // Ex.: "https://feeds.behold.so/xxxxxxxx". Vazio: a grade mostra as imagens provisórias do HTML.
  var INSTAGRAM_FEED_URL = "";

  var CASES = window.CASES || [];
  var raiz = document.documentElement;
  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Parede de cases ---------- */

  var parede = document.getElementById("parede");
  var DOBRA = 8; // tiles carregados sem lazy

  function caminho(c, tamanho) {
    return "assets/cases/" + c.imagem + "-" + tamanho + ".webp";
  }

  function montarParede() {
    var html = CASES.map(function (c, i) {
      var sizes = c.destaque
        ? "(min-width: 1440px) 33.4vw, (min-width: 1024px) 50vw, (min-width: 768px) 66.7vw, 100vw"
        : "(min-width: 1440px) 16.7vw, (min-width: 1024px) 25vw, (min-width: 768px) 33.4vw, 50vw";
      var carga = i < DOBRA ? 'loading="eager"' + (i === 0 ? ' fetchpriority="high"' : "") : 'loading="lazy"';
      return (
        '<li class="tile' + (c.destaque ? " tile--destaque" : "") + '">' +
          '<a class="tile__link" href="#case-' + c.slug + '" data-indice="' + i + '">' +
            '<span class="tile__midia">' +
              '<img src="' + caminho(c, 480) + '" srcset="' +
                caminho(c, 480) + " 480w, " + caminho(c, 960) + " 960w, " + caminho(c, 1654) + ' 1654w" ' +
                'sizes="' + sizes + '" width="480" height="480" alt="' + atributo(c.titulo) + '" ' + carga + ' decoding="async">' +
            "</span>" +
            '<span class="tile__info" aria-hidden="true">' +
              '<svg class="tile__seta"><use href="#seta-listrada"/></svg>' +
              '<span class="tile__titulo">' + texto(c.titulo) + "</span>" +
              '<span class="tile__descricao">' + texto(c.descricao) + "</span>" +
            "</span>" +
            '<span class="tile__faixa" aria-hidden="true"><span>' + texto(c.titulo) + "</span></span>" +
          "</a>" +
        "</li>"
      );
    }).join("");
    parede.innerHTML = html;
  }

  // A parede "se enche": linha a linha, da esquerda para a direita, em ~1,2 s.
  function encherParede() {
    if (reduzido.matches) return;
    var tiles = parede.children;
    if (!tiles.length) return;
    var celula = tiles[0].offsetWidth || 1;
    var maior = 0;
    for (var i = 0; i < tiles.length; i++) {
      var linha = Math.round(tiles[i].offsetTop / celula);
      var coluna = Math.round(tiles[i].offsetLeft / celula);
      var atraso = Math.min(linha, 6) * 85 + Math.min(coluna, 6) * 22;
      tiles[i].querySelector(".tile__midia").style.setProperty("--atraso", atraso + "ms");
      maior = Math.max(maior, atraso);
    }
    parede.classList.add("is-enchendo");
    window.setTimeout(function () { parede.classList.remove("is-enchendo"); }, maior + 700);
  }

  parede.addEventListener("click", function (e) {
    var link = e.target.closest(".tile__link");
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    abrirVisor(Number(link.dataset.indice), link);
  });

  /* ---------- Assinatura: ocupa a largura toda ---------- */

  var frase = document.querySelector(".assinatura__frase");
  var largo = window.matchMedia("(min-width: 768px)");

  function ajustarAssinatura() {
    if (!largo.matches) { frase.style.fontSize = ""; return; }
    frase.style.fontSize = "100px";
    var itens = Array.prototype.filter.call(frase.querySelectorAll(".assinatura__linha > *"), function (el) {
      return el.offsetWidth > 0;
    });
    var soma = itens.reduce(function (t, el) { return t + el.getBoundingClientRect().width; }, 0);
    var respiro = (itens.length - 1) * 0.3 * 100; // vão mínimo entre as palavras: 0.3em
    var disponivel = frase.clientWidth;
    var tamanho = (disponivel / (soma + respiro)) * 100;
    // Limite de altura: a faixa não passa de ~40% da tela
    tamanho = Math.min(tamanho, window.innerHeight * 0.14);
    frase.style.fontSize = Math.floor(tamanho * 10) / 10 + "px";
  }

  /* ---------- Topo: fundo ao rolar, seção ativa e menu do celular ---------- */

  var topo = document.getElementById("topo");
  var links = Array.prototype.slice.call(document.querySelectorAll(".menu__link"));
  var secoes = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });

  function marcarAtivo(id) {
    links.forEach(function (a) {
      var ativo = a.getAttribute("href") === "#" + id;
      a.classList.toggle("is-ativo", ativo);
      if (ativo) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  function aoRolar() {
    topo.classList.toggle("is-rolado", window.scrollY > 8);
    if (window.scrollY < 40) { marcarAtivo("home"); return; }
    var meio = window.innerHeight * 0.4;
    var atual = secoes[0];
    secoes.forEach(function (s) {
      if (s && s.getBoundingClientRect().top <= meio) atual = s;
    });
    // No fim da página, Contato fica ativo mesmo que não alcance o meio da tela
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) atual = secoes[secoes.length - 1];
    marcarAtivo(atual.id);
  }

  var rolagemAgendada = false;
  window.addEventListener("scroll", function () {
    if (rolagemAgendada) return;
    rolagemAgendada = true;
    window.requestAnimationFrame(function () { rolagemAgendada = false; aoRolar(); });
  }, { passive: true });

  var botaoMenu = document.querySelector(".topo__abrir");
  var textoMenu = botaoMenu.querySelector(".topo__abrir-texto");
  var fora = [document.querySelector("main"), document.querySelector("footer")];

  function menu(abrir) {
    raiz.classList.toggle("menu-aberto", abrir);
    botaoMenu.setAttribute("aria-expanded", String(abrir));
    textoMenu.textContent = abrir ? "Fechar" : "Menu";
    fora.forEach(function (el) { el.inert = abrir; });
    if (abrir) links[0].focus();
  }

  botaoMenu.addEventListener("click", function () {
    menu(!raiz.classList.contains("menu-aberto"));
  });
  document.getElementById("menu").addEventListener("click", function (e) {
    if (e.target.closest("a") && raiz.classList.contains("menu-aberto")) menu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && raiz.classList.contains("menu-aberto")) { menu(false); botaoMenu.focus(); }
  });
  window.matchMedia("(min-width: 960px)").addEventListener("change", function (m) {
    if (m.matches && raiz.classList.contains("menu-aberto")) menu(false);
  });

  /* ---------- Visualizador ---------- */

  var visor = document.getElementById("visor");
  var palco = document.getElementById("visor-palco");
  var contador = document.getElementById("visor-contador");
  var titulo = document.getElementById("visor-titulo");
  var descricao = document.getElementById("visor-descricao");
  var atual = -1;
  var origem = null;

  function embed(url) {
    var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) return "https://www.youtube-nocookie.com/embed/" + yt[1] + "?autoplay=1&rel=0";
    var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return "https://player.vimeo.com/video/" + vm[1] + "?autoplay=1";
    return url;
  }

  function mostrar(i) {
    var n = CASES.length;
    atual = (i + n) % n;
    var c = CASES[atual];

    if (c.video) {
      palco.innerHTML = '<iframe src="' + atributo(embed(c.video)) + '" title="' + atributo(c.titulo) +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    } else {
      palco.innerHTML = '<img src="' + caminho(c, "peca-1200") + '" srcset="' +
        caminho(c, "peca-1200") + " 1200w, " + caminho(c, "peca-2000") + ' 2000w" ' +
        'sizes="(min-width: 900px) 74vw, 100vw" alt="' + atributo(c.titulo) + '">';
    }
    contador.textContent = (atual + 1) + " / " + n;
    titulo.textContent = c.titulo;
    descricao.textContent = c.descricao;
    history.replaceState(null, "", "#case-" + c.slug);

    // Deixa os vizinhos prontos para a navegação
    [atual - 1, atual + 1].forEach(function (j) {
      var v = CASES[(j + n) % n];
      if (!v.video) new Image().src = caminho(v, "peca-1200");
    });
  }

  function abrirVisor(i, de) {
    origem = de || null;
    mostrar(i);
    if (!visor.open) {
      raiz.classList.add("visor-aberto");
      visor.showModal();
      document.getElementById("visor-fechar").focus();
    }
  }

  visor.addEventListener("close", function () {
    raiz.classList.remove("visor-aberto");
    palco.innerHTML = "";
    history.replaceState(null, "", location.pathname + location.search);
    var volta = origem || parede.querySelector('[data-indice="' + atual + '"]');
    if (volta) volta.focus({ preventScroll: !!origem });
    origem = null;
  });

  document.getElementById("visor-fechar").addEventListener("click", function () { visor.close(); });

  visor.querySelectorAll("[data-ir]").forEach(function (b) {
    b.addEventListener("click", function () { mostrar(atual + Number(b.dataset.ir)); });
  });

  // Clique fora da imagem fecha
  visor.addEventListener("click", function (e) {
    if (e.target === palco || e.target === visor) visor.close();
  });

  visor.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); mostrar(atual - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); mostrar(atual + 1); }
  });

  var toqueX = null, toqueY = null;
  palco.addEventListener("touchstart", function (e) {
    toqueX = e.touches[0].clientX; toqueY = e.touches[0].clientY;
  }, { passive: true });
  palco.addEventListener("touchend", function (e) {
    if (toqueX === null) return;
    var dx = e.changedTouches[0].clientX - toqueX;
    var dy = e.changedTouches[0].clientY - toqueY;
    toqueX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) mostrar(atual + (dx < 0 ? 1 : -1));
  });

  function abrirPeloEndereco() {
    var m = location.hash.match(/^#case-(.+)$/);
    if (!m) return;
    var i = CASES.findIndex(function (c) { return c.slug === decodeURIComponent(m[1]); });
    if (i < 0) return;
    if (visor.open) mostrar(i);
    else abrirVisor(i, null);
  }
  window.addEventListener("hashchange", abrirPeloEndereco);

  /* ---------- Padrão de setas (Agência) ---------- */

  // Fileiras de setas que vão de contorno fino a sólido, da esquerda para a direita.
  function montarPadrao() {
    var alvo = document.getElementById("padrao");
    if (!alvo) return;
    var colunas = 7, linhas = 5, passo = 116;
    var seta = "0,0 100,0 100,100 72,100 72,48 20,100 0,100 0,80 52,28 0,28";
    var defs = '<clipPath id="seta-recorte"><polygon points="' + seta + '"/></clipPath>';
    for (var c = 0; c < colunas; c++) {
      var solida = c === colunas - 1;
      // Espessura visível do contorno, em progressão até preencher (a haste tem ~7 de meia-largura)
      var espessura = 1.6 * Math.pow(15 / 1.6, c / (colunas - 1));
      defs += '<symbol id="seta-p' + c + '" viewBox="0 0 100 100" overflow="visible">' +
        (solida
          ? '<polygon points="' + seta + '"/>'
          : '<polygon points="' + seta + '" fill="none" stroke="currentColor" stroke-width="' +
            (espessura * 2).toFixed(2) + '" clip-path="url(#seta-recorte)"/>') +
        "</symbol>";
    }
    var usos = "";
    for (var l = 0; l < linhas; l++) {
      for (var k = 0; k < colunas; k++) {
        usos += '<use href="#seta-p' + k + '" x="' + k * passo + '" y="' + l * passo + '" width="100" height="100"/>';
      }
    }
    alvo.innerHTML = '<svg viewBox="0 0 ' + ((colunas - 1) * passo + 100) + " " + ((linhas - 1) * passo + 100) +
      '" fill="currentColor" style="color: var(--full-lima)"><defs>' + defs + "</defs>" + usos + "</svg>";
  }

  /* ---------- Formulário ---------- */

  var form = document.getElementById("form-contato");
  var status = document.getElementById("form-status");
  var MSG_OK = "Mensagem enviada. Retornamos em breve.";
  var MSG_ERRO = "Não foi possível enviar. Tente de novo ou escreva para site@fullpropaganda.com.br";

  function avisar(msg, tipo) {
    status.textContent = msg;
    status.className = "form__status" + (tipo ? " is-" + tipo : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var invalidos = Array.prototype.filter.call(form.elements, function (el) {
      if (!el.willValidate) return false;
      var ok = el.checkValidity() && el.value.trim() !== "";
      el.setAttribute("aria-invalid", String(!ok));
      return !ok;
    });
    if (invalidos.length) {
      avisar("Preencha nome, um e-mail válido e a mensagem.", "erro");
      invalidos[0].focus();
      return;
    }
    if (!FORM_ENDPOINT) {
      console.warn("FORM_ENDPOINT não configurado em main.js");
      avisar(MSG_ERRO, "erro");
      return;
    }
    var botao = form.querySelector("button[type=submit]");
    botao.disabled = true;
    avisar("Enviando…");
    fetch(FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        avisar(MSG_OK, "ok");
      })
      .catch(function () { avisar(MSG_ERRO, "erro"); })
      .then(function () { botao.disabled = false; });
  });

  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity()) {
      e.target.setAttribute("aria-invalid", "false");
    }
  });

  /* ---------- Utilidades ---------- */

  /* ---------- Instagram ---------- */

  function carregarInstagram() {
    var grade = document.getElementById("instagram-grade");
    if (!INSTAGRAM_FEED_URL || !grade) return;
    fetch(INSTAGRAM_FEED_URL)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (dados) {
        var posts = (Array.isArray(dados) ? dados : dados.posts || []).slice(0, 6);
        if (!posts.length) return;
        grade.innerHTML = posts.map(function (p) {
          var tam = p.sizes && p.sizes.medium;
          var img = (tam && tam.mediaUrl) || (p.mediaType === "VIDEO" ? p.thumbnailUrl : p.mediaUrl);
          var legenda = (p.prunedCaption || p.caption || "").slice(0, 120);
          return (
            '<li><a href="' + atributo(p.permalink) + '" target="_blank" rel="noopener">' +
              '<img src="' + atributo(img) + '" alt="' + atributo(legenda || "Publicação da Full Propaganda no Instagram") +
              '" loading="lazy" width="480" height="640"></a></li>'
          );
        }).join("");
      })
      .catch(function (e) { console.warn("Instagram: feed indisponível, mantendo as imagens do HTML.", e); });
  }

  function texto(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function atributo(s) {
    return texto(s).replace(/"/g, "&quot;");
  }

  /* ---------- Início ---------- */

  document.getElementById("ano").textContent = new Date().getFullYear();
  montarParede();
  montarPadrao();
  ajustarAssinatura();
  aoRolar();
  encherParede();
  abrirPeloEndereco();
  carregarInstagram();

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustarAssinatura);
  var redimensionar;
  window.addEventListener("resize", function () {
    window.clearTimeout(redimensionar);
    redimensionar = window.setTimeout(ajustarAssinatura, 100);
  });
})();
