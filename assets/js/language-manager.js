class LanguageManager {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translations = {};
    }

    detectLanguage() {
        const saved = localStorage.getItem('posturaia_lang');
        if (saved) return saved;
        const navLang = navigator.language.split('-')[0];
        return ['fr', 'en'].includes(navLang) ? navLang : 'fr';
    }

    async init() {
        await this.loadTranslations(this.currentLang);
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`../i18n/${lang}.json`);
            this.translations = await response.json();
        } catch (e) {
            console.error(`Failed to load ${lang}, falling back to FR`);
            const fallback = await fetch(`../i18n/fr.json`);
            this.translations = await fallback.json();
        }
    }

    t(key) {
        const keys = key.split('.');
        let result = this.translations;
        for (const k of keys) {
            result = result ? result[k] : null;
        }
        return result || `[${key}]`; // Fallback to key name if missing
    }

    setLanguage(lang) {
        localStorage.setItem('posturaia_lang', lang);
        location.reload();
    }
}

export const i18n = new LanguageManager();
await i18n.init();
