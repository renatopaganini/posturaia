class ThemeToggle {
    constructor() {
        this.theme = localStorage.getItem('posturaia_theme') || 'light';
        this.applyTheme();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const btn = document.querySelector('[data-theme-toggle]');
            if (btn) {
                btn.addEventListener('click', () => this.toggle());
                this.updateButton(btn);
            }
        });
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('posturaia_theme', this.theme);
        this.applyTheme();
        this.updateButton(document.querySelector('[data-theme-toggle]'));
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    updateButton(btn) {
        if (!btn) return;
        btn.textContent = this.theme === 'light' ? '🌙' : '☀️';
    }
}

new ThemeToggle();
