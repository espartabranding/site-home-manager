/* =========================================================
   Home Manager — comportamento
   Discreto por princípio: sem JS a página continua inteira.
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- entrada do hero ---------- */
  var hero = $('[data-hero]');
  if (hero) requestAnimationFrame(function () { hero.classList.add('in'); });

  /* ---------- títulos que se compõem palavra a palavra ----------
     Percorre os nos filhos em vez de mexer no innerHTML: assim o <br>
     e o <strong> continuam de pe e so o texto vira <span>.          */
  (function palavras() {
    var n = 0;

    function quebra(el) {
      Array.prototype.slice.call(el.childNodes).forEach(function (no) {
        if (no.nodeType === 3) {
          var frag = document.createDocumentFragment();
          no.textContent.split(/(\s+)/).forEach(function (parte) {
            if (!parte) return;
            if (/^\s+$/.test(parte)) { frag.appendChild(document.createTextNode(parte)); return; }
            var sp = document.createElement('span');
            sp.className = 'pal';
            sp.textContent = parte;
            sp.style.setProperty('--d', (n++ * 85) + 'ms');
            frag.appendChild(sp);
          });
          el.replaceChild(frag, no);
        } else if (no.nodeType === 1 && no.tagName !== 'BR') {
          quebra(no);
        }
      });
    }

    $$('[data-palavras]').forEach(function (el) { n = 0; quebra(el); });
  })();

  /* ---------- fundos do hero, trocados pela silhueta da casa ---------- */
  (function fundoHero() {
    var caixa = $('[data-herobg]');
    if (!caixa) return;
    var cenas = $$('img', caixa);
    if (cenas.length < 2) return;

    /* ABRE tem que casar com a transicao de opacidade do CSS: promover
       antes do fim faria a cena velha sumir com a nova ainda translucida */
    var i = 0, ABRE = 2800, PARADA = 8200, relogio;

    function troca() {
      var n = (i + 1) % cenas.length;
      var entra = cenas[n], sai = cenas[i];
      entra.classList.add('is-entrando');
      setTimeout(function () {
        /* so agora a nova vira a de baixo: trocar antes faria a antiga
           sumir enquanto a casa ainda estava pequena */
        entra.classList.add('is-on');
        entra.classList.remove('is-entrando');
        sai.classList.remove('is-on');
        i = n;
      }, ABRE);
    }

    function liga(v) {
      clearInterval(relogio);
      if (v && !reduced) relogio = setInterval(troca, PARADA);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { liga(es[0].isIntersecting); },
                               { threshold: .15 }).observe(caixa);
    } else { liga(true); }
    document.addEventListener('visibilitychange', function () { liga(!document.hidden); });
  })();

  /* ---------- revelação no scroll ---------- */
  var revealables = $$('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealables.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- cabeçalho: claro ao sair da foto do hero ---------- */
  var ticking = false;

  function onFrame() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var limite = hero ? hero.offsetHeight - 90 : 80;
    document.body.classList.toggle('hdr-light', y > limite);
  }
  function requestFrame() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onFrame);
  }
  window.addEventListener('scroll', requestFrame, { passive: true });
  onFrame();

  /* ---------- menu mobile ---------- */
  var burger = $('[data-burger]');
  var drawer = $('[data-drawer]');

  function closeMenu() {
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    if (burger) {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
    }
  }

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) closeMenu();
    });
  }

  /* ---------- showroom ---------- */
  (function showroom() {
    var root = $('[data-show]');
    if (!root) return;

    var frames  = $$('.show__frames img', root);
    var buttons = $$('.show__list button', root);
    var panels  = $$('.show__panel', root);
    var idx     = $('[data-show-idx]', root);
    var nameOut = $('[data-show-name]', root);

    function select(i) {
      frames.forEach(function (f) { f.classList.toggle('is-on', +f.dataset.i === i); });
      panels.forEach(function (p) { p.classList.toggle('is-on', +p.dataset.i === i); });
      buttons.forEach(function (b) {
        var on = +b.dataset.i === i;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on && nameOut) nameOut.textContent = $('.show__name', b).textContent;
      });
      if (idx) idx.textContent = ('0' + (i + 1)).slice(-2);
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () { select(+b.dataset.i); });
    });
  })();

  /* ---------- telas do aplicativo ----------
     Sem botoes: as telas passam sozinhas, cada uma com sua legenda.
     So conta o tempo enquanto a secao esta na tela.                 */
  (function shots() {
    var palco = $('[data-shots]');
    var prog  = $('[data-prog]');
    if (!palco) return;

    var telas  = $$('.shot', palco);
    var barras = prog ? $$('span', prog) : [];
    var GIRO = 5200, i = 0, relogio;

    if (prog) prog.style.setProperty('--giro', GIRO + 'ms');

    function vai(n) {
      i = (n + telas.length) % telas.length;
      telas.forEach(function (t, k) { t.classList.toggle('is-on', k === i); });
      barras.forEach(function (b, k) {
        b.classList.remove('is-on');
        if (k === i) { void b.offsetWidth; b.classList.add('is-on'); }
      });
    }

    function liga(v) {
      clearInterval(relogio);
      if (v && !reduced) relogio = setInterval(function () { vai(i + 1); }, GIRO);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { liga(es[0].isIntersecting); },
                               { threshold: .25 }).observe(palco);
    } else { liga(true); }

    /* pausa quando a aba sai de foco: senao volta com o ciclo adiantado */
    document.addEventListener('visibilitychange', function () {
      liga(!document.hidden);
    });
  })();

  /* ---------- produtos: destaque em cima, fileira do segmento embaixo ----------
     Clicar numa miniatura traz o produto para o destaque e abre as
     caracteristicas, que vem das paginas oficiais da Home Manager.      */
  (function produtos() {
    var raiz = $('[data-comp]');
    var abas = $('[data-filters]');
    if (!raiz || !abas) return;

    var linha = $('[data-row]', raiz);
    var pods = $$('.pod', raiz);
    var palco = $('[data-heroprod]', raiz);
    var imgHero = $('[data-hero-img]', raiz);
    var info = $('[data-info]', raiz);
    var elNome = $('[data-info-nome]', raiz);
    var elSub = $('[data-info-sub]', raiz);
    var elDesc = $('[data-info-desc]', raiz);
    var elFeats = $('[data-info-feats]', raiz);
    var lista = $('[data-feats-list]', raiz);
    var elLink = $('[data-info-link]', raiz);

    var ROTULO = {};
    $$('button', abas).forEach(function (b) { ROTULO[b.dataset.filter] = b.textContent.trim(); });

    var vazio = document.createElement('p');
    vazio.className = 'comp__empty';
    vazio.hidden = true;
    vazio.textContent = 'Nenhum produto neste segmento.';
    linha.appendChild(vazio);

    var cat = 'smart-center';
    var ativo = null;

    /* as caracteristicas viram pilulas a direita do produto */
    function montaFeats(el) {
      lista.innerHTML = '';
      var feats = (el.dataset.feats || '').split('|').filter(Boolean);
      feats.slice(0, 6).forEach(function (txt, i) {
        var li = document.createElement('li');
        li.textContent = txt;
        li.style.setProperty('--d', (220 + i * 85) + 'ms');
        lista.appendChild(li);
      });
    }

    /* na fileira rolante do celular, o produto escolhido vem para o centro */
    function mostraPod(el) {
      if (linha.scrollWidth <= linha.clientWidth) return;
      var alvo = el.offsetLeft - (linha.clientWidth - el.offsetWidth) / 2;
      linha.scrollTo({ left: Math.max(0, alvo), behavior: reduced ? 'auto' : 'smooth' });
    }

    function destaca(el) {
      if (!el) return;
      ativo = el;
      mostraPod(el);
      pods.forEach(function (p) {
        var on = p === el;
        p.classList.toggle('is-active', on);
        p.setAttribute('aria-selected', on ? 'true' : 'false');
      });

      palco.classList.add('is-swap');
      info.classList.add('is-swap');

      setTimeout(function () {
        imgHero.src = $('img', el).src;
        /* o destaque herda o fator de proporcao do produto */
        palco.style.setProperty('--k', el.style.getPropertyValue('--k') || '1');
        imgHero.alt = el.dataset.nome;
        elNome.textContent = el.dataset.nome;
        elSub.textContent = ROTULO[cat] || '';
        elDesc.textContent = el.dataset.desc || '';
        elLink.href = 'https://homemanager.com.br/produtos/' + el.dataset.slug + '/';
        elFeats.innerHTML = '';
        (el.dataset.feats || '').split('|').filter(Boolean).forEach(function (f) {
          var li = document.createElement('li');
          li.textContent = f;
          elFeats.appendChild(li);
        });
        palco.classList.remove('is-swap');
        info.classList.remove('is-swap');
        /* reinicia a moldura: sem o reflow no meio, trocar de produto
           duas vezes seguidas nao redispara a animacao */
        palco.classList.remove('is-montando');
        void palco.offsetWidth;
        palco.classList.add('is-montando');
        montaFeats(el);
      }, 200);
    }

    function trocaSegmento(nova) {
      cat = nova;
      linha.classList.toggle('is-all', cat === 'all');

      var dentro = [];
      pods.forEach(function (p) {
        var ok = cat === 'all' || (p.dataset.cat || '').split(/\s+/).indexOf(cat) !== -1;
        p.classList.toggle('is-out', !ok);
        p.classList.remove('is-in');
        if (ok) {
          dentro.push(p);
          if (!reduced) {
            void p.offsetWidth; // reinicia a animação de entrada
            p.classList.add('is-in');
            p.style.animationDelay = (Math.min(dentro.length, 14) * 24) + 'ms';
          }
        }
      });

      vazio.hidden = dentro.length > 0;
      /* com um produto so no segmento nao ha o que escolher: a fileira e a
         linha que a separa do destaque saem, para nao sobrar uma miniatura
         solta repetindo a peça que ja esta grande logo acima */
      raiz.classList.toggle('is-unico', dentro.length === 1);
      destaca(dentro[0]);
    }

    /* o dropdown do celular e a fileira do desktop mexem no mesmo estado:
       trocar por um tem que refletir no outro */
    var seletor = $('[data-filtro-sel]');

    function marca(filtro) {
      $$('button', abas).forEach(function (o) {
        o.setAttribute('aria-pressed', o.dataset.filter === filtro ? 'true' : 'false');
      });
      if (seletor && seletor.value !== filtro) seletor.value = filtro;
    }

    abas.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-filter]');
      if (!b) return;
      marca(b.dataset.filter);
      trocaSegmento(b.dataset.filter);
    });

    if (seletor) {
      seletor.addEventListener('change', function () {
        marca(seletor.value);
        trocaSegmento(seletor.value);
      });
    }

    linha.addEventListener('click', function (e) {
      var el = e.target.closest('.pod');
      if (el && el !== ativo) destaca(el);
    });

    marca('smart-center');
    trocaSegmento('smart-center');
  })();

  /* ---------- palco dos ambientes ---------- */
  (function () {
    var palco = $('[data-palco]');
    if (!palco) return;

    var fotos  = $$('.palco__fotos img', palco);
    var thumbs = $$('.tmb', palco);
    var grupos = $$('.pins', palco);
    var nome   = $('[data-palco-nome]', palco);
    var frase  = $('[data-palco-frase]', palco);
    var atual  = 0;
    var timer;

    /* cada palavra vira um <span> com seu proprio atraso: e o CSS que
       tira o blur, entao a frase se compoe da esquerda para a direita */
    function escreve(el, txt) {
      el.textContent = '';
      txt.split(/\s+/).forEach(function (palavra, i) {
        var sp = document.createElement('span');
        sp.textContent = palavra;
        sp.style.setProperty('--d', (i * 75) + 'ms');
        el.appendChild(sp);
        el.appendChild(document.createTextNode(' '));
      });
    }

    escreve(frase, frase.textContent.trim());

    function mostra(i) {
      if (i === atual || !fotos[i]) return;
      atual = i;

      fotos.forEach(function (img, n) { img.classList.toggle('is-on', n === i); });
      grupos.forEach(function (g, n) { g.classList.toggle('is-on', n === i); });
      thumbs.forEach(function (b, n) {
        b.classList.toggle('is-on', n === i);
        b.setAttribute('aria-selected', n === i ? 'true' : 'false');
      });

      // a legenda sai, troca e volta: sem isso o texto pisca no meio da foto
      palco.classList.add('is-swap');
      clearTimeout(timer);
      timer = setTimeout(function () {
        /* tira o is-swap antes de escrever: assim os <span> novos ja
           nascem com a animacao de entrada, nao com a de saida */
        palco.classList.remove('is-swap');
        nome.textContent = thumbs[i].dataset.nome;
        escreve(frase, thumbs[i].dataset.frase);
      }, reduced ? 0 : 340);

      // mantem a miniatura escolhida visivel quando a fileira esta rolada
      var t = thumbs[i], fila = t.parentNode;
      var dx = t.offsetLeft - fila.scrollLeft;
      if (dx < 0 || dx + t.offsetWidth > fila.clientWidth) {
        fila.scrollTo({ left: t.offsetLeft - 16, behavior: reduced ? 'auto' : 'smooth' });
      }
    }

    palco.addEventListener('click', function (e) {
      var b = e.target.closest('.tmb');
      if (b) mostra(thumbs.indexOf(b));
    });

    // setas do teclado percorrem os ambientes, como uma lista de abas
    palco.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (!e.target.closest('.tmb')) return;
      e.preventDefault();
      /* pula as miniaturas escondidas pelo CSS no celular */
      var passo = e.key === 'ArrowRight' ? 1 : -1, i = atual;
      for (var n = 0; n < thumbs.length; n++) {
        i = (i + passo + thumbs.length) % thumbs.length;
        if (thumbs[i].offsetParent) break;
      }
      mostra(i);
      thumbs[i].focus();
    });
  })();

  /* ---------- malha de fundo da seção de produtos ----------
     O reticulado nao muda: e pintado uma vez num canvas de apoio e so
     copiado a cada quadro. Por quadro desenha-se apenas o que se mexe,
     que sao os pulsos e os nos acesos.                                  */
  (function malha() {
    var cv = $('[data-malha]');
    if (!cv || reduced) return;

    var ctx = cv.getContext('2d');
    var base = document.createElement('canvas');
    var bctx = base.getContext('2d');
    var PASSO = 78, L = 0, A = 0, dpr = 1;
    var acesos = [], pulsos = [], rodando = false, t0 = 0;

    function monta() {
      L = cv.clientWidth; A = cv.clientHeight;
      if (!L || !A) return false;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      [cv, base].forEach(function (c) { c.width = L * dpr; c.height = A * dpr; });
      [ctx, bctx].forEach(function (c) { c.setTransform(dpr, 0, 0, dpr, 0, 0); });

      var colunas = Math.ceil(L / PASSO), linhas = Math.ceil(A / PASSO);
      var mx = (L - colunas * PASSO) / 2, my = (A - linhas * PASSO) / 2;

      bctx.clearRect(0, 0, L, A);
      bctx.strokeStyle = 'rgba(0,60,96,.15)';
      bctx.lineWidth = 1;
      bctx.beginPath();
      for (var c = 0; c <= colunas; c++) {
        var x = Math.round(mx + c * PASSO) + .5;
        bctx.moveTo(x, 0); bctx.lineTo(x, A);
      }
      for (var l = 0; l <= linhas; l++) {
        var y = Math.round(my + l * PASSO) + .5;
        bctx.moveTo(0, y); bctx.lineTo(L, y);
      }
      bctx.stroke();

      bctx.fillStyle = 'rgba(0,60,96,.3)';
      acesos = [];
      for (var i = 0; i <= colunas; i++) {
        for (var j = 0; j <= linhas; j++) {
          var px = mx + i * PASSO, py = my + j * PASSO;
          bctx.fillRect(px - 1, py - 1, 2, 2);
          if (Math.random() < .12) acesos.push({ x: px, y: py, f: Math.random() * 6.28 });
        }
      }

      pulsos = [];
      for (var k = 0; k < 11; k++) pulsos.push(novoPulso(mx, my, colunas, linhas, true));
      return true;
    }

    function novoPulso(mx, my, colunas, linhas, inicio) {
      var vertical = Math.random() < .42;
      return {
        vertical: vertical,
        /* trilho: uma linha inteira do reticulado, escolhida ao acaso */
        fixo: vertical ? mx + Math.round(Math.random() * colunas) * PASSO
                       : my + Math.round(Math.random() * linhas) * PASSO,
        p: inicio ? Math.random() : 0,
        v: (.045 + Math.random() * .055) / 60,
        volta: Math.random() < .5
      };
    }

    function quadro(t) {
      if (!rodando) return;
      if (!t0) t0 = t;
      var seg = (t - t0) / 1000;

      ctx.clearRect(0, 0, L, A);
      ctx.drawImage(base, 0, 0, L, A);

      /* nos que respiram */
      for (var i = 0; i < acesos.length; i++) {
        var n = acesos[i];
        var a = .26 + .48 * (Math.sin(seg * 1.1 + n.f) * .5 + .5);
        ctx.fillStyle = 'rgba(0,60,96,' + a.toFixed(3) + ')';
        ctx.fillRect(n.x - 2, n.y - 2, 4, 4);
      }

      /* pulsos correndo pelos trilhos, com rastro */
      for (var k = 0; k < pulsos.length; k++) {
        var s = pulsos[k];
        s.p += s.v;
        if (s.p > 1.2) { pulsos[k] = novoPulso(0, 0, 0, 0, false); continue; }
        var d = s.volta ? 1 - s.p : s.p;
        var x = s.vertical ? s.fixo : d * L;
        var y = s.vertical ? d * A : s.fixo;
        var rastro = 120 * (s.volta ? 1 : -1);
        var g = s.vertical
          ? ctx.createLinearGradient(x, y + rastro, x, y)
          : ctx.createLinearGradient(x + rastro, y, x, y);
        g.addColorStop(0, 'rgba(84,168,216,0)');
        g.addColorStop(1, 'rgba(84,168,216,.85)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.8;
        ctx.beginPath();
        if (s.vertical) { ctx.moveTo(x, y + rastro); ctx.lineTo(x, y); }
        else            { ctx.moveTo(x + rastro, y); ctx.lineTo(x, y); }
        ctx.stroke();
        ctx.fillStyle = 'rgba(84,168,216,1)';
        ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 6.2832); ctx.fill();
      }
      requestAnimationFrame(quadro);
    }

    function liga(v) {
      if (v === rodando) return;
      rodando = v;
      if (v) { t0 = 0; requestAnimationFrame(quadro); }
    }

    if (!monta()) return;

    /* so gasta quadro enquanto a secao esta na tela */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { liga(es[0].isIntersecting); },
                               { rootMargin: '120px' }).observe(cv);
    } else { liga(true); }

    var espera;
    window.addEventListener('resize', function () {
      clearTimeout(espera);
      espera = setTimeout(monta, 220);
    }, { passive: true });
  })();

  /* ---------- blocos que se revezam no celular ----------
     Mesma mecanica para os argumentos do "por que" e para os
     depoimentos: no desktop os itens aparecem lado a lado e nao ha o
     que girar; abaixo de 720px so um fica visivel por vez.          */
  function rodizio(grade, seletorItem, prog, giro) {
    if (!grade) return;
    var itens  = $$(seletorItem, grade);
    var barras = prog ? $$('span', prog) : [];
    if (itens.length < 2) return;

    var i = 0, relogio, naTela = false;
    var estreito = window.matchMedia('(max-width:719px)');
    if (prog) prog.style.setProperty('--giro', giro + 'ms');

    function vai(n) {
      i = (n + itens.length) % itens.length;
      itens.forEach(function (p, k) { p.classList.toggle('is-on', k === i); });
      barras.forEach(function (b, k) {
        b.classList.remove('is-on');
        if (k === i) { void b.offsetWidth; b.classList.add('is-on'); }
      });
    }

    function liga() {
      clearInterval(relogio);
      if (naTela && estreito.matches && !reduced) {
        relogio = setInterval(function () { vai(i + 1); }, giro);
      }
    }

    vai(0);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        naTela = es[0].isIntersecting; liga();
      }, { threshold: .2 }).observe(grade);
    } else { naTela = true; liga(); }

    estreito.addEventListener('change', function () { vai(0); liga(); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(relogio); else liga();
    });
  }

  rodizio($('.pillars'), '.pillar', $('[data-pilprog]'), 5200);
  /* depoimento e texto longo: precisa de mais tempo de leitura */
  rodizio($('.quotes'),  '.quote',  $('[data-quoprog]'), 8000);

  /* ---------- ano do rodapé ---------- */
  var ano = $('[data-ano]');
  if (ano) ano.textContent = String(new Date().getFullYear());
})();
