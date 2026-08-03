/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/chat.js — página "Chat com IA" (ChatGPT / OpenAI, via API do
   próprio usuário). A chave e a chamada HTTP são compartilhadas com
   assets/js/openai.js (mesma chave usada pela leitura de voz neural).
   ========================================================= */
(function () {
  "use strict";

  const MODEL = "gpt-4o-mini";

  const SYSTEM_PROMPT =
    "Você é um assistente especialista em análise de vibração em máquinas rotativas, atuando como tutor de apoio " +
    "dentro de um curso interativo para Engenheiros de Confiabilidade. O curso cobre, entre outros temas: fundamentos de " +
    "vibração, unidades e domínios (tempo/frequência/FFT), normas ISO 10816 (partes 1, 2, 3, 4, 5 e 7), diagnóstico por " +
    "assinatura espectral (desbalanceamento 1X, desalinhamento 2X, folga mecânica e seus harmônicos/sub-harmônicos, " +
    "defeitos de rolamento em estágios, engrenamentos e GMF, problemas elétricos em motores, correias, cavitação, " +
    "ressonância), balanceamento de campo e alinhamento de eixos. Responda sempre em português do Brasil, de forma " +
    "didática, objetiva e tecnicamente precisa, referenciando o módulo do curso relacionado quando fizer sentido " +
    "(ex.: 'ver Módulo 6.1'). Se a pergunta fugir do escopo de vibração/manutenção/confiabilidade, responda mesmo assim " +
    "da melhor forma possível, mas sinta-se à vontade para sugerir focar no conteúdo do curso.";

  let messages = []; // { role: "user" | "assistant", content: string }
  let sending = false;

  function escapeHtml(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function mdLite(s) {
    // formatação leve: **negrito**, quebras de linha, `código`
    let h = escapeHtml(s);
    h = h.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    h = h.replace(/`(.+?)`/g, "<code>$1</code>");
    h = h.replace(/\n/g, "<br/>");
    return h;
  }

  function renderKeySetup(container, errorMsg) {
    container.innerHTML =
      '<div class="chat-key-card reveal">' +
      "<h3>🔑 Conecte sua chave de API da OpenAI</h3>" +
      "<p>Para conversar com o ChatGPT, use sua própria chave de API da OpenAI (platform.openai.com). " +
      "Ela fica salva <b>apenas no seu navegador</b> (localStorage) e é usada só para chamar a API oficial da " +
      "OpenAI diretamente — nunca passa por nenhum servidor deste curso. O uso é cobrado na sua conta OpenAI. " +
      "Essa mesma chave também é usada, opcionalmente, para a leitura de voz mais natural (veja o botão 🔊 Ouvir aula nos módulos).</p>" +
      (errorMsg ? '<div class="chat-error">' + escapeHtml(errorMsg) + "</div>" : "") +
      '<input type="password" id="chat-key-input" class="chat-key-input" placeholder="sk-..." autocomplete="off"/>' +
      '<button class="verify-btn" id="chat-key-save">Salvar e começar a conversar</button>' +
      '<p class="hint">Dica: crie uma chave em platform.openai.com → API Keys. Você pode remover a chave salva a qualquer momento na própria página de chat.</p>' +
      '<p class="hint">Observação técnica: como este site não tem servidor, a chamada é feita direto do seu navegador para a OpenAI. Se a OpenAI bloquear esse tipo de chamada (CORS) no momento, uma mensagem de erro clara vai aparecer aqui — nesse caso, infelizmente, só um pequeno backend próprio resolveria, o que foge do escopo deste site estático.</p>' +
      "</div>";
    const btn = container.querySelector("#chat-key-save");
    const input = container.querySelector("#chat-key-input");
    btn.addEventListener("click", function () {
      const val = (input.value || "").trim();
      if (!val) return;
      window.saveOpenAIKey(val);
      window.renderChatPage();
    });
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") btn.click();
    });
  }

  function renderMessages() {
    const wrap = document.getElementById("chat-messages");
    if (!wrap) return;
    let html = "";
    if (messages.length === 0) {
      html += '<div class="chat-empty">👋 Olá! Pergunte qualquer coisa sobre análise de vibração, normas ISO 10816, ' +
        "diagnóstico de espectros ou os casos práticos do curso.</div>";
    }
    messages.forEach((m) => {
      html += '<div class="chat-msg ' + (m.role === "user" ? "chat-user" : "chat-assistant") + '">' +
        '<div class="chat-bubble">' + mdLite(m.content) + "</div></div>";
    });
    if (sending) {
      html += '<div class="chat-msg chat-assistant"><div class="chat-bubble chat-typing">Digitando<span class="dots"><span>.</span><span>.</span><span>.</span></span></div></div>';
    }
    wrap.innerHTML = html;
    wrap.scrollTop = wrap.scrollHeight;
  }

  function renderChatUI(container) {
    container.innerHTML =
      '<div class="chat-header reveal">' +
      "<h2 style='margin:0;'>💬 Chat com IA (ChatGPT)</h2>" +
      '<button class="chat-forget-btn" id="chat-forget">Trocar/remover chave</button>' +
      "</div>" +
      '<p class="hint" style="margin:0 0 14px 0;">Tire dúvidas sobre o curso a qualquer momento — a IA conhece o conteúdo de análise de vibração e pode ajudar a interpretar espectros e casos práticos.</p>' +
      '<div class="chat-panel reveal">' +
      '<div id="chat-messages" class="chat-messages"></div>' +
      '<div class="chat-input-row">' +
      '<textarea id="chat-input" class="chat-input" placeholder="Digite sua pergunta..." rows="2"></textarea>' +
      '<button class="verify-btn" id="chat-send">Enviar</button>' +
      "</div></div>";

    document.getElementById("chat-forget").addEventListener("click", function () {
      window.clearOpenAIKey();
      messages = [];
      window.renderChatPage();
    });

    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");

    function doSend() {
      const text = (input.value || "").trim();
      if (!text || sending) return;
      input.value = "";
      sendMessage(text);
    }
    sendBtn.addEventListener("click", doSend);
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" && !ev.shiftKey) {
        ev.preventDefault();
        doSend();
      }
    });

    renderMessages();
  }

  function sendMessage(text) {
    messages.push({ role: "user", content: text });
    sending = true;
    renderMessages();

    const body = {
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }].concat(
        messages.map((m) => ({ role: m.role, content: m.content }))
      ),
    };

    window.callOpenAI("/chat/completions", body)
      .then(function (r) {
        sending = false;
        if (!r.ok) {
          const msg = (r.data && r.data.error && r.data.error.message) || ("Erro HTTP " + r.status);
          if (r.status === 401) {
            messages.pop(); // remove a pergunta do usuário para não poluir o histórico com falha de auth
            window.clearOpenAIKey();
            const root = document.getElementById("chat-root");
            renderKeySetup(root, "Chave inválida ou sem permissão (" + msg + "). Verifique e tente novamente.");
            return;
          }
          messages.push({ role: "assistant", content: "⚠️ Erro ao consultar a IA: " + msg });
          renderMessages();
          return;
        }
        const choice = (r.data.choices || [])[0];
        const textOut = (choice && choice.message && choice.message.content) || "(resposta vazia)";
        messages.push({ role: "assistant", content: textOut.trim() });
        renderMessages();
      })
      .catch(function (err) {
        sending = false;
        messages.push({ role: "assistant", content: "⚠️ " + ((err && err.message) || "Não foi possível conectar à API da OpenAI.") });
        renderMessages();
      });
  }

  window.renderChatPage = function () {
    const contentEl = document.getElementById("content");
    contentEl.innerHTML = '<div id="chat-root"></div>';
    contentEl.classList.remove("fade-target");
    void contentEl.offsetWidth;
    contentEl.classList.add("fade-target");

    const root = document.getElementById("chat-root");
    const key = window.loadOpenAIKey();
    if (!key) {
      renderKeySetup(root);
    } else {
      renderChatUI(root);
    }
    if (window.initScrollReveal) window.initScrollReveal();
  };
})();
