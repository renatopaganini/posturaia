/**
 * PosturaIA - Bot Widget (V4_FIXED)
 */
import { askBot } from './bot-logic.js';

export function initBot() {
    if (document.getElementById('bot-container')) return;

    const container = document.createElement('div');
    container.id = 'bot-container';
    container.innerHTML = `
        <div id="bot-launcher" style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background: #004d66; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 9999; font-size: 24px;">💬</div>
        <div id="bot-window" style="position: fixed; bottom: 90px; right: 20px; width: 350px; height: 450px; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); display: none; flex-direction: column; z-index: 9999; border: 1px solid #eee; overflow: hidden;">
            <div style="background: #004d66; color: white; padding: 15px; font-weight: bold; display: flex; justify-content: space-between;">
                <span>Assistant PosturaIA</span>
                <span id="bot-close" style="cursor: pointer;">✕</span>
            </div>
            <div id="bot-messages" style="flex-grow: 1; padding: 15px; overflow-y: auto; font-size: 0.9rem; background: #f9f9f9; display: flex; flex-direction: column;">
                <div style="margin-bottom: 10px; background: #eef2f3; padding: 10px; border-radius: 8px; max-width: 85%;">Bonjour ! Comment puis-je vous aider ?</div>
            </div>
            <div style="padding: 10px; border-top: 1px solid #eee; display: flex;">
                <input type="text" id="bot-input" placeholder="Posez votre question..." style="flex-grow: 1; border: none; padding: 8px; outline: none;">
                <button id="bot-send" style="background: #00a896; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    const launcher = document.getElementById('bot-launcher');
    const windowEl = document.getElementById('bot-window');
    const close = document.getElementById('bot-close');
    const send = document.getElementById('bot-send');
    const input = document.getElementById('bot-input');
    const messages = document.getElementById('bot-messages');

    launcher.onclick = () => windowEl.style.display = windowEl.style.display === 'none' ? 'flex' : 'none';
    close.onclick = () => windowEl.style.display = 'none';

    const addMessage = (text, isUser = false) => {
        const msg = document.createElement('div');
        msg.style.cssText = `margin-bottom: 10px; padding: 10px; border-radius: 8px; max-width: 85%; ${isUser ? 'background: #00a896; color: white; align-self: flex-end; margin-left: auto;' : 'background: #eef2f3; color: #333;'}`;
        msg.innerText = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    };

    const handleSend = async () => {
        const q = input.value.trim();
        if (!q) return;
        addMessage(q, true);
        input.value = '';
        const response = await askBot(q);
        addMessage(response);
    };

    send.onclick = handleSend;
    input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };
}
