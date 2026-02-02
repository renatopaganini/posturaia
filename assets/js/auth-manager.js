/**
 * PosturaIA - Moteur d'Authentification Supabase v2 (Socle V4 FIGÉ)
 * Rôle : Senior full-stack auth engineer
 */
import POSTURAIA_CONFIG from './config.js';

const { createClient } = window.supabase;
export const supabase = createClient(POSTURAIA_CONFIG.supabaseUrl, POSTURAIA_CONFIG.supabaseAnonKey);

class AuthManager {
    constructor() {
        this.user = null;
        this.session = null;
        this.init();
    }

    async init() {
        const { data: { session } } = await supabase.auth.getSession();
        this.handleAuthStateChange(session);
        
        supabase.auth.onAuthStateChange((_event, session) => {
            this.handleAuthStateChange(session);
        });
    }

    handleAuthStateChange(session) {
        this.session = session;
        this.user = session?.user || null;
        document.dispatchEvent(new CustomEvent('auth-state-changed', { 
            detail: { user: this.user, session: this.session } 
        }));
    }

    async signUp(email, password) {
        return await supabase.auth.signUp({ email, password });
    }

    async login(email, password) {
        return await supabase.auth.signInWithPassword({ email, password });
    }

    async loginWithGoogle() {
        return await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${POSTURAIA_CONFIG.siteUrl}/dashboard.html`
            }
        });
    }

    async logout() {
        await supabase.auth.signOut();
        window.location.href = '/login.html';
    }

    getUser() {
        return this.user;
    }

    isAuthenticated() {
        return !!this.user;
    }

    /**
     * Guard Auth : À appeler sur toutes les pages protégées
     */
    async checkAuth() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            window.location.href = '/login.html';
        }
        return session;
    }
}

export const auth = new AuthManager();
