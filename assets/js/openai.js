/* =========================================================
   Análise de Vibração — Curso Interativo
   assets/js/openai.js — helper compartilhado para integração com a API da
   OpenAI (chat e voz neural), usando a chave do próprio usuário.

   A chave fica salva apenas no localStorage do navegador
   ("vibcourse_openai_api_key") e é usada só para chamar a API oficial da
   OpenAI diretamente do navegador — nenhum servidor deste projeto vê ou
   armazena a chave. O uso é cobrado na conta OpenAI do próprio usuário.

   Aviso técnico importante: como este site é 100% estático (sem backend),
   as chamadas à API da OpenAI são feitas diretamente do navegador. A OpenAI
   pode, dependendo da política de CORS vigente na sua conta/endpoint,
   bloquear chamadas feitas assim a partir de uma página sem servidor. Se
   isso acontecer, o erro aparece de forma clara na tela (não trava o site)
   — nesse caso, a única solução é rodar um pequeno proxy/backend próprio,
   o que foge do escopo de um site estático.
   ========================================================= */
(function () {
  "use strict";

  const KEY_STORAGE = "vibcourse_openai_api_key";
  const API_BASE = "https://api.openai.com/v1";

  function loadOpenAIKey() { try { return localStorage.getItem(KEY_STORAGE) || ""; } catch (e) { return ""; } }
  function saveOpenAIKey(k) { try { localStorage.setItem(KEY_STORAGE, k); } catch (e) {} }
  function clearOpenAIKey() { try { localStorage.removeItem(KEY_STORAGE); } catch (e) {} }

  // Wrapper de fetch para os endpoints da OpenAI, com tratamento uniforme de
  // erro (chave inválida, CORS/rede bloqueada, etc.). `parseJson` controla se
  // a resposta é lida como JSON (chat) ou como blob binário (áudio de TTS).
  function callOpenAI(path, body, opts) {
    opts = opts || {};
    const key = loadOpenAIKey();
    return fetch(API_BASE + path, {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": "Bearer " + key },
      body: JSON.stringify(body),
    })
      .then(function (res) {
        if (opts.binary) {
          if (!res.ok) {
            return res.json().catch(function () { return {}; }).then(function (data) {
              return Promise.reject({ status: res.status, message: (data.error && data.error.message) || ("Erro HTTP " + res.status) });
            });
          }
          return res.blob().then(function (blob) { return { ok: true, blob: blob }; });
        }
        return res.json().then(function (data) { return { ok: res.ok, status: res.status, data: data }; });
      })
      .catch(function (err) {
        if (err && err.status) return Promise.reject(err); // já formatado acima
        // TypeError de fetch = falha de rede/CORS — mensagem amigável explicando a causa provável
        return Promise.reject({
          status: 0,
          message: "Não foi possível conectar à API da OpenAI a partir do navegador. Isso normalmente acontece por bloqueio de CORS " +
            "(a OpenAI pode não permitir chamadas diretas de um site estático, sem servidor) ou por falta de conexão com a internet.",
        });
      });
  }

  window.loadOpenAIKey = loadOpenAIKey;
  window.saveOpenAIKey = saveOpenAIKey;
  window.clearOpenAIKey = clearOpenAIKey;
  window.callOpenAI = callOpenAI;
})();
