/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/charts.js — renderizador de espectro/forma de onda em SVG,
   compartilhado entre os módulos do curso (app.js) e a página de
   Prática de Diagnóstico (practice.js). Mantém uma única implementação
   do gráfico dinâmico para toda a experiência do site.
   ========================================================= */
(function () {
  "use strict";

  function escapeHtmlChart(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function buildCurve(spec, samples) {
    const n = samples || 500;
    const xs = new Array(n);
    const ys = new Array(n);
    const width = spec.width || (spec.mode === "time" ? 0.008 : 0.045);
    const noiseAmp = spec.noise || 0.02;
    // seeded pseudo-random for a stable noise floor across renders
    let seed = 42;
    function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * spec.xmax;
      let y = rnd() * noiseAmp;
      spec.peaks.forEach((p) => {
        const d = x - p.order;
        y += p.amp * Math.exp(-(d * d) / (2 * width * width));
      });
      xs[i] = x; ys[i] = y;
    }
    return { xs, ys };
  }

  function renderSpectrumSVG(container, spec, opts) {
    opts = opts || {};
    const W = 640, H = opts.height || 260, padL = 46, padR = 16, padT = 16, padB = 34;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const { xs, ys } = buildCurve(spec);
    const maxY = Math.max(...ys, ...spec.peaks.map((p) => p.amp)) * 1.18;

    function xPix(x) { return padL + (x / spec.xmax) * plotW; }
    function yPix(y) { return padT + plotH - (y / maxY) * plotH; }

    let path = "M " + xs.map((x, i) => xPix(x).toFixed(1) + " " + yPix(ys[i]).toFixed(1)).join(" L ");

    const nTicks = spec.mode === "time" ? 6 : Math.min(10, Math.ceil(spec.xmax));
    let ticks = "";
    for (let t = 0; t <= nTicks; t++) {
      const xv = (t / nTicks) * spec.xmax;
      const xp = xPix(xv);
      ticks += `<line x1="${xp}" y1="${padT + plotH}" x2="${xp}" y2="${padT + plotH + 5}" stroke="#8aa0b8" stroke-width="1"/>`;
      ticks += `<text x="${xp}" y="${padT + plotH + 18}" font-size="10" fill="#5a6b80" text-anchor="middle">${xv.toFixed(spec.mode === "time" ? 2 : 1)}</text>`;
    }
    let yticks = "";
    for (let t = 0; t <= 4; t++) {
      const yv = (t / 4) * maxY;
      const yp = yPix(yv);
      yticks += `<line x1="${padL - 5}" y1="${yp}" x2="${padL}" y2="${yp}" stroke="#8aa0b8" stroke-width="1"/>`;
      yticks += `<text x="${padL - 9}" y="${yp + 3}" font-size="10" fill="#5a6b80" text-anchor="end">${yv.toFixed(2)}</text>`;
    }

    const svgId = "svg-" + Math.random().toString(36).slice(2, 9);
    const html = `
      <svg id="${svgId}" viewBox="0 0 ${W} ${H}" class="spectrum-svg" preserveAspectRatio="xMidYMid meet">
        <rect x="0" y="0" width="${W}" height="${H}" fill="#0f2b4c" rx="10"/>
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="#3a6690" stroke-width="1"/>
        <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="#3a6690" stroke-width="1"/>
        ${ticks}${yticks}
        <path d="${path}" fill="none" stroke="#6fd88a" stroke-width="1.6"/>
        <text x="${padL + plotW / 2}" y="${H - 4}" font-size="10.5" fill="#a9bdd6" text-anchor="middle">${escapeHtmlChart(spec.unit)}</text>
        <text x="14" y="${padT + 8}" font-size="10.5" fill="#a9bdd6" transform="rotate(-90 14 ${padT + 8})" text-anchor="end">Amplitude</text>
        <g class="hover-guide" style="display:none">
          <line x1="0" y1="${padT}" x2="0" y2="${padT + plotH}" stroke="#ffd166" stroke-width="1" stroke-dasharray="3,3"/>
          <circle r="4" fill="#ffd166"/>
        </g>
        <g class="click-marker" style="display:none">
          <line x1="0" y1="${padT}" x2="0" y2="${padT + plotH}" stroke="#ff6b6b" stroke-width="1.5"/>
          <circle r="5.5" fill="#ff6b6b" stroke="#fff" stroke-width="1.5"/>
        </g>
        <rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="transparent" class="hover-capture" style="cursor:crosshair" tabindex="0"/>
      </svg>
      <div class="svg-tooltip" style="display:none"></div>
      <div class="svg-click-readout" style="display:none"></div>
    `;
    container.innerHTML = html;

    const svg = container.querySelector("svg");
    const capture = container.querySelector(".hover-capture");
    const guide = container.querySelector(".hover-guide");
    const guideLine = guide.querySelector("line");
    const guideDot = guide.querySelector("circle");
    const tooltip = container.querySelector(".svg-tooltip");
    const marker = container.querySelector(".click-marker");
    const markerLine = marker.querySelector("line");
    const markerDot = marker.querySelector("circle");
    const clickReadout = container.querySelector(".svg-click-readout");

    function dataAtEvent(ev) {
      const rect = svg.getBoundingClientRect();
      const scaleX = W / rect.width;
      const relX = (ev.clientX - rect.left) * scaleX;
      const dataX = Math.max(0, Math.min(spec.xmax, ((relX - padL) / plotW) * spec.xmax));
      const idx = Math.round((dataX / spec.xmax) * (xs.length - 1));
      return { idx, x: xs[idx], y: ys[idx] };
    }

    capture.addEventListener("mousemove", function (ev) {
      const d = dataAtEvent(ev);
      const xp = xPix(d.x), yp = yPix(d.y);
      guide.style.display = "block";
      guideLine.setAttribute("x1", xp); guideLine.setAttribute("x2", xp);
      guideDot.setAttribute("cx", xp); guideDot.setAttribute("cy", yp);
      tooltip.style.display = "block";
      const unitLabel = spec.mode === "time" ? "t" : "ordem";
      tooltip.innerHTML = "<b>" + unitLabel + "</b> ≈ " + d.x.toFixed(spec.mode === "time" ? 3 : 2) +
        " &nbsp;|&nbsp; <b>amplitude</b> ≈ " + d.y.toFixed(3);
      const contRect = container.getBoundingClientRect();
      const left = Math.min(Math.max(ev.clientX - contRect.left - 60, 0), contRect.width - 150);
      tooltip.style.left = left + "px";
      tooltip.style.top = "8px";
    });
    capture.addEventListener("mouseleave", function () {
      guide.style.display = "none";
      tooltip.style.display = "none";
    });
    // Marcador fixo com suporte a navegação: guarda o índice atual no vetor de
    // amostras para que as setas ← → do teclado possam deslocá-lo passo a passo.
    let markerIdx = null;

    function placeMarkerByIdx(idx) {
      idx = Math.max(0, Math.min(xs.length - 1, idx));
      markerIdx = idx;
      const xp = xPix(xs[idx]), yp = yPix(ys[idx]);
      marker.style.display = "block";
      markerLine.setAttribute("x1", xp); markerLine.setAttribute("x2", xp);
      markerDot.setAttribute("cx", xp); markerDot.setAttribute("cy", yp);
      clickReadout.style.display = "block";
      const unitLabel = spec.mode === "time" ? "tempo" : "ordem";
      clickReadout.innerHTML = "📍 <b>Ponto de medição marcado</b> — " + unitLabel + ": <b>" +
        xs[idx].toFixed(spec.mode === "time" ? 3 : 2) + "</b> &nbsp;|&nbsp; amplitude: <b>" + ys[idx].toFixed(3) +
        "</b> <span class=\"marker-kbd-hint\">(use ← → para deslocar o ponto)</span>";
    }

    // Clique fixa um "ponto de medição" persistente no gráfico — como marcar
    // manualmente onde um analista posicionaria o cursor num equipamento real.
    capture.addEventListener("click", function (ev) {
      const d = dataAtEvent(ev);
      placeMarkerByIdx(d.idx);
      if (capture.focus) capture.focus();
    });
    // Setas ← → deslocam o ponto já fixado, atualizando os valores mostrados
    // conforme o deslocamento — útil para varrer o espectro sem precisar
    // mirar o mouse pixel a pixel.
    capture.addEventListener("keydown", function (ev) {
      if (markerIdx === null) return;
      if (ev.key === "ArrowRight" || ev.key === "Right") {
        if (ev.preventDefault) ev.preventDefault();
        placeMarkerByIdx(markerIdx + 1);
      } else if (ev.key === "ArrowLeft" || ev.key === "Left") {
        if (ev.preventDefault) ev.preventDefault();
        placeMarkerByIdx(markerIdx - 1);
      }
    });
  }

  window.buildCurve = buildCurve;
  window.renderSpectrumSVG = renderSpectrumSVG;
})();
