/**
 * PosturaIA - Logique de Header (Socle V4)
 * Rôle : Frontend architect
 */
import { auth } from './auth-manager.js';

export function initHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const render = () => {
        const user = auth.getUser();
        const logoUrl = user ? 'dashboard.html' : 'index.html';
        
        header.innerHTML = `
            <nav>
                <div class="logo">
                    <a href="${logoUrl}" class="logo">PosturaIA</a>
                </div>
                <div class="nav-links">
                    ${user ? `
                        <a href="dashboard.html">Dashboard</a>
                        <a href="intake.html">Nouvelle Analyse</a>
                        <a href="blog.html">Blog</a>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${user.email}</span>
                        <button id="logout-btn" class="btn btn-outline" style="padding: 0.4rem 1rem;">Déconnexion</button>
                    ` : `
                        <a href="blog.html">Blog</a>
                        <a href="login.html">Connexion</a>
                        <a href="signup.html" class="btn btn-secondary">Inscription</a>
                    `}
                    <div id="lang-switcher" style="margin-left: 1rem; cursor: pointer; font-size: 0.9rem; font-weight: bold; color: var(--primary);">
                        <span id="btn-fr">FR</span> | <span id="btn-en">EN</span>
                    </div>
                </div>
            </nav>
        `;

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.addEventListener('click', () => auth.logout());

        // Lang Switcher (Statique pour V4)
        document.getElementById('btn-fr')?.addEventListener('click', () => setLang('fr'));
        document.getElementById('btn-en')?.addEventListener('click', () => setLang('en'));
    };

    function setLang(lang) {
        localStorage.setItem('posturaia_lang', lang);
        window.location.reload();
    }

    render();
    document.addEventListener('auth-state-changed', render);
}
