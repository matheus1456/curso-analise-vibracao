/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/audio.js — leitura em áudio das aulas.

   Motor de voz: navegador (Web Speech API, window.speechSynthesis) — motor
   offline, sempre disponível, com afinação de voz e cadência para soar
   menos "robótica" (ver scoreVoice/speakNextBrowser).

   Observação: este arquivo também mantém um caminho opcional de voz via
   API externa de IA (usado apenas se o próprio usuário configurar uma
   chave no localStorage do navegador — nunca embutida no site). Sem
   chave configurada, a leitura usa sempre a voz do navegador.
   ========================================================= */
(function () {
  "use strict";

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  let currentModuleId = null;
  let state = "stopped"; // stopped | playing | paused
  let engine = null; // "ai" | "browser"
  let queue = [];
  let queueIdx = 0;
  const PAUSE_BETWEEN_SENTENCES_MS = 260;
  let pauseTimer = null;

  // ---- fila de áudio da IA (OpenAI TTS) ----
  let aiChunks = [];
  let aiIdx = 0;
  let aiAudioEl = null;
  let aiFellBackToBrowser = false;

  function hasAIVoice() {
    return typeof window.loadOpenAIKey === "function" && !!window.loadOpenAIKey() && typeof window.callOpenAI === "function";
  }

  function scoreVoice(v) {
    let score = 0;
    if (/pt[-_]BR/i.test(v.lang)) score += 100;
    else if (/^pt/i.test(v.lang)) score += 60;
    else return -1;
    const name = v.name || "";
    if (/google/i.test(name)) score += 30;
    if (/microsoft/i.test(name)) score += 25;
    if (/natural|neural|online|wavenet/i.test(name)) score += 25;
    if (/compact|espeak/i.test(name)) score -= 20;
    if (v.localService === false) score += 5; // vozes online costumam soar melhor
    return score;
  }

  function pickVoice() {
    if (!supported) return null;
    const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
    let best = null, bestScore = -1;
    voices.forEach((v) => {
      const s = scoreVoice(v);
      if (s > bestScore) { bestScore = s; best = v; }
    });
    return bestScore >= 0 ? best : null;
  }

  function updateButton() {
    const btn = document.getElementById("audio-toggle-btn");
    const stopBtn = document.getElementById("audio-stop-btn");
    const badge = document.getElementById("audio-engine-badge");
    if (!btn) return;
    if (state === "playing") {
      btn.innerHTML = "⏸ Pausar leitura";
      btn.classList.add("audio-active");
    } else if (state === "paused") {
      btn.innerHTML = "▶ Continuar leitura";
      btn.classList.add("audio-active");
    } else {
      btn.innerHTML = "🔊 Ouvir aula";
      btn.classList.remove("audio-active");
    }
    if (stopBtn) stopBtn.style.display = state === "stopped" ? "none" : "inline-block";
    if (badge) {
      if (state === "stopped") { badge.style.display = "none"; }
      else {
        badge.style.display = "inline-block";
        badge.textContent = engine === "ai" && !aiFellBackToBrowser ? "🤖 voz de IA" : "🖥️ voz do navegador";
      }
    }
  }

  function extractText(moduleObj) {
    const parts = [moduleObj.title];
    (moduleObj.body || []).forEach((n) => {
      if (n.type === "h2" || n.type === "h3" || n.type === "p" || n.type === "bullet" || n.type === "quote") {
        if (n.text) parts.push(n.text);
      }
      // tabelas, imagens e gráficos são pulados — não fazem sentido em áudio
    });
    return parts.join(". ");
  }

  // Divide o texto em sentenças curtas (por ponto final, ponto e vírgula,
  // exclamação e interrogação), preservando a pontuação para a entonação
  // natural da síntese de voz.
  function splitSentences(text) {
    const raw = text
      .replace(/\s+/g, " ")
      .trim()
      .match(/[^.!?;]+[.!?;]?/g) || [text];
    return raw.map((s) => s.trim()).filter((s) => s.length > 0);
  }

  // Agrupa sentenças em blocos de até ~900 caracteres — pedidos menores
  // demais desperdiçam requisições, e a API de TTS lida bem com parágrafos
  // inteiros de uma vez, o que também soa mais natural que frase a frase.
  function chunkForAI(sentences) {
    const chunks = [];
    let cur = "";
    sentences.forEach((s) => {
      if ((cur + " " + s).trim().length > 900 && cur) {
        chunks.push(cur.trim());
        cur = s;
      } else {
        cur = (cur + " " + s).trim();
      }
    });
    if (cur) chunks.push(cur);
    return chunks;
  }

  // ---------------- Motor 1: voz do navegador (fallback) ----------------

  function speakNextBrowser() {
    if (queueIdx >= queue.length) {
      state = "stopped";
      currentModuleId = null;
      updateButton();
      return;
    }
    const sentence = queue[queueIdx];
    const utter = new SpeechSynthesisUtterance(sentence);
    utter.lang = "pt-BR";
    const voice = pickVoice();
    if (voice) utter.voice = voice;
    utter.rate = 0.93;
    utter.pitch = 1.02;
    utter.onend = function () {
      queueIdx++;
      if (state === "playing") {
        pauseTimer = setTimeout(speakNextBrowser, PAUSE_BETWEEN_SENTENCES_MS);
      }
    };
    utter.onerror = function () {
      state = "stopped";
      currentModuleId = null;
      updateButton();
    };
    window.speechSynthesis.speak(utter);
  }

  function startBrowserEngine(text) {
    engine = "browser";
    window.speechSynthesis.cancel();
    queue = splitSentences(text);
    queueIdx = 0;
    speakNextBrowser();
  }

  // ---------------- Motor 2: voz de IA (OpenAI TTS) ----------------

  function playAIChunk() {
    if (aiIdx >= aiChunks.length) {
      state = "stopped";
      currentModuleId = null;
      updateButton();
      return;
    }
    const text = aiChunks[aiIdx];
    window.callOpenAI("/audio/speech", { model: "gpt-4o-mini-tts", voice: "alloy", input: text, response_format: "mp3" }, { binary: true })
      .then(function (r) {
        if (state !== "playing" && state !== "paused") return; // usuário já parou
        const url = (window.URL || window.webkitURL).createObjectURL(r.blob);
        aiAudioEl = new Audio(url);
        aiAudioEl.onended = function () {
          aiIdx++;
          if (state === "playing") playAIChunk();
        };
        aiAudioEl.onerror = function () { fallbackToBrowserMidway(); };
        if (state === "playing") aiAudioEl.play();
      })
      .catch(function () {
        // Chave inválida, CORS bloqueado ou sem internet — cai para a voz do
        // navegador a partir daqui, sem interromper a experiência do aluno.
        fallbackToBrowserMidway();
      });
  }

  function fallbackToBrowserMidway() {
    if (aiFellBackToBrowser) return;
    aiFellBackToBrowser = true;
    engine = "browser";
    // continua a leitura, a partir do texto ainda não lido pela IA
    const remaining = aiChunks.slice(aiIdx).join(" ");
    queue = splitSentences(remaining || "");
    queueIdx = 0;
    updateButton();
    if (queue.length && supported) speakNextBrowser();
    else { state = "stopped"; currentModuleId = null; updateButton(); }
  }

  function startAIEngine(text) {
    engine = "ai";
    aiFellBackToBrowser = false;
    aiChunks = chunkForAI(splitSentences(text));
    aiIdx = 0;
    playAIChunk();
  }

  // ---------------- Controle público ----------------

  window.stopReading = function () {
    clearTimeout(pauseTimer);
    if (supported) window.speechSynthesis.cancel();
    if (aiAudioEl) { try { aiAudioEl.pause(); } catch (e) {} aiAudioEl = null; }
    queue = [];
    queueIdx = 0;
    aiChunks = [];
    aiIdx = 0;
    state = "stopped";
    currentModuleId = null;
    updateButton();
  };

  window.toggleReading = function (moduleObj) {
    if (!supported && !hasAIVoice()) {
      alert("Este navegador não tem suporte à leitura em voz alta.");
      return;
    }
    // trocou de módulo com leitura em andamento -> reinicia do zero no novo módulo
    if (currentModuleId && currentModuleId !== moduleObj.id && state !== "stopped") {
      window.stopReading();
    }
    if (state === "playing") {
      clearTimeout(pauseTimer);
      if (engine === "ai" && !aiFellBackToBrowser) { if (aiAudioEl) aiAudioEl.pause(); }
      else if (supported) window.speechSynthesis.pause();
      state = "paused";
      updateButton();
      return;
    }
    if (state === "paused" && currentModuleId === moduleObj.id) {
      state = "playing";
      if (engine === "ai" && !aiFellBackToBrowser) { if (aiAudioEl) aiAudioEl.play(); }
      else if (supported) window.speechSynthesis.resume();
      updateButton();
      return;
    }
    // começar do zero
    window.stopReading();
    const text = extractText(moduleObj);
    currentModuleId = moduleObj.id;
    state = "playing";
    if (hasAIVoice()) {
      startAIEngine(text);
    } else {
      startBrowserEngine(text);
    }
    updateButton();
  };

  window.isReadingSupported = function () { return supported || hasAIVoice(); };
})();
