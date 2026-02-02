/**
 * PosturaIA - UI Orchestrator (V4_FIXED)
 * Rôle : CTO / Intégrateur
 * Mission : Injecter le header, le footer, le bot et gérer l'i18n sur TOUTES les pages.
 */
import { initHeader } from './header-logic.js';
import { initFooter } from './footer-logic.js';
import { initBot } from './bot-widget.js';

export async function startUI() {
    console.log("[UI] Starting Orchestration...");
    
    // 1. Initialiser le Header
    initHeader();
    
    // 2. Initialiser le Footer
    initFooter();
    
    // 3. Initialiser le Bot
    initBot();
    
    // 4. Gérer l'i18n
    await applyI18n();
}

async function applyI18n() {
    const lang = localStorage.getItem('posturaia_lang') || 'fr';
    try {
        const response = await fetch(`i18n/${lang}.json`);
        const translations = await response.json();
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const keys = key.split('.');
            let text = translations;
            keys.forEach(k => text = text ? text[k] : null);
            if (text) el.innerHTML = text;
        });
    } catch (e) {
        console.error("[i18n] Error loading translations", e);
    }
}

// Auto-start
startUI();
