/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/library.js — página Biblioteca

   Renderiza o acervo de referências técnicas (data/library.js) como uma
   grade visual de capas, com filtro por categoria, busca por texto e,
   para cada item, os botões de visualizar (abre o PDF no navegador) e
   baixar. Cada ficha mostra também em quais módulos do curso aquele
   material foi utilizado, com link direto para o módulo.
   ========================================================= */
(function () {
  var activeCat = "todos";
  var query = "";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function moduleTitle(id) {
    var all = (window.COURSE || []).concat(window.LUBE_COURSE || []);
    var m = all.find(function (x) { return x.id === id; });
    if (!m) return null;
    return m.meta && m.meta.short ? m.meta.short : m.title;
  }

  function moduleBadge(id) {
    var all = (window.COURSE || []).concat(window.LUBE_COURSE || []);
    var m = all.find(function (x) { return x.id === id; });
    if (!m) return id;
    if (m.meta && m.meta.num !== undefined && /^m\d+$/.test(id)) return m.meta.num;
    return (m.meta && m.meta.short) || id;
  }

  function langLabel(l) {
    if (l === "en") return "inglês";
    if (l === "es") return "espanhol";
    return "português";
  }

  function matches(item) {
    if (activeCat !== "todos" && item.category !== activeCat) return false;
    if (!query) return true;
    var hay = [item.title, item.publisher, item.description, item.type, item.year]
      .join(" ").toLowerCase();
    return hay.indexOf(query) !== -1;
  }

  function cardHtml(item) {
    var h = '<article class="lib-card" data-cat="' + esc(item.category) + '" id="lib-' + esc(item.id) + '">';

    h += '<div class="lib-cover">';
    h += '<img src="' + esc(item.cover) + '" alt="Capa de ' + esc(item.title) + '" loading="lazy" />';
    h += '<span class="lib-pages">' + esc(item.pages) + " pág.</span>";
    h += "</div>";

    h += '<div class="lib-info">';
    h += '<h3 class="lib-title">' + esc(item.title) + "</h3>";
    h += '<p class="lib-meta">' + esc(item.publisher) +
         (item.year ? " · " + esc(item.year) : "") +
         " · " + esc(langLabel(item.lang)) + "</p>";
    h += '<span class="lib-type">' + esc(item.type) + "</span>";
    h += '<p class="lib-desc">' + esc(item.description) + "</p>";

    if (item.usedIn && item.usedIn.length) {
      var links = item.usedIn.filter(function (id) { return moduleTitle(id); });
      if (links.length) {
        h += '<div class="lib-used"><span class="lib-used-label">Usado em:</span>';
        links.forEach(function (id) {
          h += '<button class="lib-modchip" onclick="goTo(\'' + esc(id) + '\')" ' +
               'title="' + esc(moduleTitle(id)) + '">' + esc(moduleBadge(id)) + "</button>";
        });
        h += "</div>";
      }
    }

    if (item.restricted) {
      h += '<p class="lib-restricted">🔒 Publicação comercial de distribuição restrita. ' +
           "O arquivo acompanha apenas a cópia local do curso — não é redistribuído na versão publicada. " +
           (item.officialUrl
             ? 'Obtenha pelo <a href="' + esc(item.officialUrl) + '" target="_blank" rel="noopener">site do editor ↗</a>.'
             : "") +
           "</p>";
    }

    h += '<div class="lib-actions">';
    h += '<a class="lib-btn lib-btn-view" href="' + esc(item.file) + '" target="_blank" rel="noopener">👁️ Visualizar</a>';
    h += '<a class="lib-btn lib-btn-dl" href="' + esc(item.file) + '" download>⬇️ Baixar</a>';
    h += "</div>";
    h += "</div></article>";
    return h;
  }

  function render() {
    var items = (window.LIBRARY || []).filter(matches);
    var cats = window.LIBRARY_CATEGORIES || [];

    var h = '<div class="lib-page">';
    h += '<header class="lib-header">';
    h += "<h1>📚 Biblioteca do curso</h1>";
    h += '<p class="lib-sub">Todo o acervo técnico usado na construção deste curso, reunido em um lugar só. ' +
         "Cada material mostra em quais módulos foi utilizado — clique no número do módulo para ir direto ao conteúdo.</p>";
    h += "</header>";

    h += '<div class="lib-toolbar">';
    h += '<input id="lib-search" type="search" placeholder="Buscar por título, editora ou assunto…" ' +
         'value="' + esc(query) + '" oninput="libSearch(this.value)" aria-label="Buscar na biblioteca" />';
    h += "</div>";

    h += '<div class="lib-chips">';
    cats.forEach(function (c) {
      var n = c.id === "todos"
        ? (window.LIBRARY || []).length
        : (window.LIBRARY || []).filter(function (x) { return x.category === c.id; }).length;
      h += '<button class="lib-chip' + (activeCat === c.id ? " active" : "") + '" ' +
           "onclick=\"libFilter('" + esc(c.id) + "')\">" + c.icon + " " + esc(c.label) +
           ' <span class="lib-chip-n">' + n + "</span></button>";
    });
    h += "</div>";

    if (!items.length) {
      h += '<p class="lib-empty">Nenhum material encontrado para essa busca.</p>';
    } else {
      h += '<div class="lib-grid">';
      items.forEach(function (it) { h += cardHtml(it); });
      h += "</div>";
    }

    h += '<p class="lib-note">Os materiais reunidos aqui são publicações técnicas de terceiros ' +
         "(SKF, ISO/BSI, Noria, ICML, Mobius Institute e outros), disponibilizadas como bibliografia de estudo. " +
         "Os direitos de cada publicação pertencem aos respectivos autores e editores.</p>";
    h += "</div>";

    var el = document.getElementById("content");
    if (el) el.innerHTML = h;
    if (window.revealOnScroll) window.revealOnScroll();
  }

  window.libFilter = function (cat) {
    activeCat = cat;
    render();
  };

  window.libSearch = function (v) {
    query = (v || "").trim().toLowerCase();
    var items = (window.LIBRARY || []).filter(matches);
    var grid = document.querySelector(".lib-grid");
    var empty = document.querySelector(".lib-empty");
    // re-render apenas a grade, preservando o foco no campo de busca
    if (grid) {
      grid.innerHTML = items.map(cardHtml).join("");
      grid.style.display = items.length ? "" : "none";
    }
    if (!items.length && !empty) {
      var p = document.createElement("p");
      p.className = "lib-empty";
      p.textContent = "Nenhum material encontrado para essa busca.";
      if (grid && grid.parentNode) grid.parentNode.insertBefore(p, grid);
    } else if (items.length && empty) {
      empty.remove();
    }
  };

  window.renderLibraryPage = render;
})();
