/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/effects.js — efeitos visuais (independente da lógica de dados)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. Onda animada no logo da sidebar — muda de forma e cor
     conforme a trilha do módulo atual (chamado por app.js via
     window.setWaveTrack), para dar identidade visual a cada trilha:
       - vibracao:     onda senoidal contínua, verde (padrão original)
       - rolamentos:   trem de pulsos/impactos, laranja (falha de rolamento
                        se manifesta como impactos periódicos, não uma
                        senoide contínua)
       - lubrificacao: onda larga e lenta, dourada (fluxo de óleo)
     Sem trilha ativa (capa, prática, chat, consulta) usa o estilo padrão
     "vibracao". ---------- */
  function animateWaveLogo() {
    const path = document.getElementById("wave-path");
    if (!path) return;

    const STYLES = {
      vibracao: {
        color: "#6fd88a", glow: "rgba(111,216,138,0.6)",
        shape: function (x, t, amp) { return 20 + Math.sin(x / 18 + t) * amp; },
      },
      rolamentos: {
        color: "#ff7a59", glow: "rgba(255,122,89,0.6)",
        // trem de pulsos: a maior parte da onda fica perto da linha de base,
        // com um pico estreito e agudo periódico — como o impacto de um
        // defeito de rolamento passando pela zona de carga.
        shape: function (x, t, amp) {
          const cycle = 60; // largura de um período de impacto
          const phase = ((x + t * 40) % cycle + cycle) % cycle;
          const pulse = Math.exp(-Math.pow(phase - cycle * 0.15, 2) / 6);
          return 20 - amp * 1.7 * pulse + Math.sin(x / 14 + t) * amp * 0.12;
        },
      },
      lubrificacao: {
        color: "#f2b53c", glow: "rgba(242,181,60,0.55)",
        // onda larga, lenta e arredondada — como o fluxo contínuo de óleo.
        shape: function (x, t, amp) { return 20 + Math.sin(x / 42 + t * 0.6) * amp * 1.15; },
      },
    };

    let current = "vibracao";
    window.setWaveTrack = function (track) {
      current = STYLES[track] ? track : "vibracao";
    };

    let t = 0;
    function frame() {
      t += 0.05;
      const s = STYLES[current];
      path.style.stroke = s.color;
      path.style.filter = "drop-shadow(0 0 4px " + s.glow + ")";
      const amp = 8 + Math.sin(t * 0.5) * 3; // amplitude "respirando"
      let d = "M0,20";
      const step = 15;
      for (let x = step; x <= 210; x += step) {
        d += " T" + x + "," + s.shape(x, t, amp);
      }
      path.setAttribute("d", d);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- 2. Scroll-reveal (IntersectionObserver) ---------- */
  let observer = null;
  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll("#content .reveal:not(.visible)").forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 25, 300) + "ms";
      observer.observe(el);
    });
  }
  window.initScrollReveal = initScrollReveal;

  /* ---------- 3. Confete simples ao concluir um módulo ---------- */
  const CONFETTI_COLORS = ["#1f5fa8", "#6fd88a", "#b5462a", "#4d9de0", "#ffd166"];
  window.celebrate = function () {
    const count = 26;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      el.style.left = Math.random() * 100 + "vw";
      el.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      el.style.width = el.style.height = (5 + Math.random() * 6) + "px";
      el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      el.style.animationDuration = (1.1 + Math.random() * 0.9) + "s";
      el.style.animationDelay = (Math.random() * 0.25) + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    }
  };

  /* ---------- 3b. Tema claro/escuro ---------- */
  const THEME_KEY = "vibcourse_theme";
  function applyThemeIcon() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
  }
  window.toggleTheme = function () {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    applyThemeIcon();
  };

  /* ---------- 3c. Menu suspenso de navegação rápida ---------- */
  window.toggleQuickNav = function () {
    const dd = document.getElementById("quick-nav-dropdown");
    if (!dd) return;
    dd.style.display = dd.style.display === "none" ? "block" : "none";
  };
  function initQuickNavOutsideClick() {
    document.addEventListener("click", function (ev) {
      const nav = document.getElementById("quick-nav");
      const dd = document.getElementById("quick-nav-dropdown");
      if (!nav || !dd || dd.style.display === "none") return;
      if (!nav.contains(ev.target)) dd.style.display = "none";
    });
  }

  /* ---------- 4. Overlay de sidebar acompanha estado (mobile) ---------- */
  function syncOverlay() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (!sidebar || !overlay) return;
    const mo = new MutationObserver(() => {
      if (sidebar.classList.contains("open")) overlay.classList.add("open");
      else overlay.classList.remove("open");
    });
    mo.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    animateWaveLogo();
    syncOverlay();
    initScrollReveal();
    applyThemeIcon();
    initQuickNavOutsideClick();
  });
})();
