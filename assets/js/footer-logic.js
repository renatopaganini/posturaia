/**
 * PosturaIA - Logique de Footer Global (V4_GOLD)
 * Rôle : Frontend architect
 */
export function initFooter() {
    const footer = document.createElement('footer');
    footer.style.cssText = "background: #004d66; color: white; padding: 4rem 2rem; margin-top: 5rem; border-top: 4px solid #00a896;";
    
    footer.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem;">
            <div>
                <h3 style="color: #00a896; margin-bottom: 1.5rem;">PosturaIA</h3>
                <p style="font-size: 0.9rem; opacity: 0.8; line-height: 1.6;">L'excellence de l'analyse posturale par l'intelligence artificielle clinique.</p>
            </div>
            <div>
                <h4 style="margin-bottom: 1.2rem;">Navigation</h4>
                <ul style="list-style: none; padding: 0; font-size: 0.9rem;">
                    <li style="margin-bottom: 0.8rem;"><a href="index.html" style="color: white; text-decoration: none; opacity: 0.7;">Accueil</a></li>
                    <li style="margin-bottom: 0.8rem;"><a href="blog.html" style="color: white; text-decoration: none; opacity: 0.7;">Blog Santé</a></li>
                    <li style="margin-bottom: 0.8rem;"><a href="dashboard.html" style="color: white; text-decoration: none; opacity: 0.7;">Dashboard</a></li>
                </ul>
            </div>
            <div>
                <h4 style="margin-bottom: 1.2rem;">Légal</h4>
                <ul style="list-style: none; padding: 0; font-size: 0.9rem;">
                    <li style="margin-bottom: 0.8rem;"><a href="legal.html?page=cgu" style="color: white; text-decoration: none; opacity: 0.7;">Conditions Générales</a></li>
                    <li style="margin-bottom: 0.8rem;"><a href="legal.html?page=privacy" style="color: white; text-decoration: none; opacity: 0.7;">Confidentialité</a></li>
                    <li style="margin-bottom: 0.8rem;"><a href="legal.html?page=about" style="color: white; text-decoration: none; opacity: 0.7;">À Propos</a></li>
                </ul>
            </div>
            <div>
                <h4 style="margin-bottom: 1.2rem;">Contact</h4>
                <p style="font-size: 0.9rem; opacity: 0.7;">support@posturaia.com</p>
                <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 0.5rem;">Clinique Digitale PosturaIA</p>
            </div>
        </div>
        <div style="max-width: 1200px; margin: 3rem auto 0; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; font-size: 0.8rem; opacity: 0.5;">
            &copy; 2026 PosturaIA. Tous droits réservés. Outil d'aide à la décision - Ne remplace pas un diagnostic médical.
        </div>
    `;
    document.body.appendChild(footer);
}
