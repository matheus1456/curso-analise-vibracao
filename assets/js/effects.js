/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/effects.js — efeitos visuais (independente da lógica de dados)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. Onda de vibração animada no logo da sidebar ---------- */
  function animateWaveLogo() {
    const path = document.getElementById("wave-path");
    if (!path) return;
    let t = 0;
    function frame() {
      t += 0.05;
      const amp = 8 + Math.sin(t * 0.5) * 3; // amplitude "respirando"
      let d = "M0,20";
      const step = 15;
      for (let x = step; x <= 210; x += step) {
        const y = 20 + Math.sin((x / 20) + t) * amp * (x % (step * 2) === 0 ? 1 : -1) * 0.001; // subtle base
        d += " T" + x + "," + (20 + Math.sin(x / 18 + t) * amp);
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
