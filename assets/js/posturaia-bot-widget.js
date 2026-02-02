(function () {
  const BOT_WEBHOOK_URL = "https://renatopaganini467.app.n8n.cloud/webhook/bot-support";

  const config = {
    title: "Assistant PosturaIA",
    position: "bottom-right",
    primaryColor: "#0ea5e9",
  };

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "style") node.style.cssText = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    children.forEach((c) => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return node;
  }

  async function sendToBot(message) {
    try {
      const res = await fetch(BOT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // n8n workflow attend 'message' dans le body
        body: JSON.stringify({ message: message }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        return text || "Désolé, je n’ai pas compris.";
      }

      // Extraction robuste du message selon les formats n8n courants
      let output = 
        data.output ?? 
        data.text ?? 
        data.message ??
        data.result ?? 
        data.response ?? 
        (Array.isArray(data) && data.length > 0 ? (data[0].output ?? data[0].text ?? data[0].message ?? data[0]) : data);

      // Si l'output est encore un objet vide ou non défini
      if (!output || (typeof output === 'object' && Object.keys(output).length === 0)) {
          return "Bonjour ! Je suis l'assistant PosturaIA. Comment puis-je vous aider aujourd'hui ?";
      }

      return typeof output === "string" ? output : JSON.stringify(output);
    } catch (e) {
      console.error("Bot error:", e);
      return "Désolé, le bot est momentanément indisponible. Réessayez dans un instant.";
    }
  }

  function addMessage(messages, who, content) {
    const bubble = el("div", { class: `pbot-bubble pbot-${who}` }, [content]);
    const row = el("div", { class: `pbot-row pbot-row-${who}` }, [bubble]);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function createWidget() {
    if (document.getElementById("posturaia-bot-widget")) return;

    const root = el("div", { id: "posturaia-bot-widget", class: `pbot-root ${config.position}` });

    const header = el("div", { class: "pbot-header" }, [
      el("div", { class: "pbot-title" }, [config.title]),
      el(
        "button",
        {
          class: "pbot-close",
          type: "button",
          ariaLabel: "Fermer",
          onclick: () => root.classList.toggle("pbot-collapsed"),
        },
        ["–"]
      ),
    ]);

    const messages = el("div", { class: "pbot-messages", id: "pbot-messages" });

    const input = el("input", {
      class: "pbot-input",
      id: "pbot-input",
      type: "text",
      placeholder: "Écrivez votre message…",
      autocomplete: "off",
    });

    const sendBtn = el(
      "button",
      {
        class: "pbot-send",
        type: "button",
        onclick: async () => {
          const msg = input.value.trim();
          if (!msg) return;
          addMessage(messages, "user", msg);
          input.value = "";
          const reply = await sendToBot(msg);
          addMessage(messages, "bot", reply);
        },
      },
      ["Envoyer"]
    );

    input.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") sendBtn.click();
    });

    const footer = el("div", { class: "pbot-footer" }, [input, sendBtn]);

    root.appendChild(header);
    root.appendChild(messages);
    root.appendChild(footer);
    document.body.appendChild(root);

    // Welcome message
    (async () => {
      const reply = await sendToBot("Bonjour");
      addMessage(messages, "bot", reply);
    })();
  }

  function injectCSSVars() {
    const style = document.documentElement.style;
    style.setProperty("--pbot-primary", config.primaryColor);
  }

  function init() {
    injectCSSVars();
    createWidget();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
