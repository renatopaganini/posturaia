/**
 * PosturaIA - Logique Bot Hybride (V4_ULTIMATE_FIXED)
 * Rôle : CTO Orchestrateur
 * FAQ Locale (0 coût) + Escalade n8n (IA Réelle)
 */
export const BOT_FAQ = {
    "fr": [
        { "q": "Qu'est-ce que PosturaIA ?", "a": "PosturaIA est une plateforme d'analyse posturale par IA pour patients et professionnels." },
        { "q": "Est-ce un diagnostic médical ?", "a": "Non, c'est un outil d'aide à la décision. Consultez toujours un médecin pour un diagnostic." },
        { "q": "Comment lancer un bilan ?", "a": "Inscrivez-vous, puis cliquez sur 'Nouvelle Analyse' dans votre dashboard." }
    ],
    "en": [
        { "q": "What is PosturaIA?", "a": "PosturaIA is an AI-driven postural analysis platform for professionals and patients." },
        { "q": "Is it a medical diagnosis?", "a": "No, it is a decision support tool. Always consult a doctor for a diagnosis." },
        { "q": "How to start an analysis?", "a": "Sign up, then click 'New Analysis' in your dashboard." }
    ]
};

export async function askBot(question) {
    const lang = localStorage.getItem('posturaia_lang') || 'fr';
    
    // 1. Recherche dans la FAQ locale (Gratuit)
    const localMatch = BOT_FAQ[lang].find(item => question.toLowerCase().includes(item.q.toLowerCase()));
    if (localMatch) return localMatch.a;

    // 2. Escalade vers n8n (IA Réelle)
    try {
        const response = await fetch('https://renatopaganini467.app.n8n.cloud/webhook/bot-support', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question, lang: lang })
        });
        const data = await response.json();
        // n8n retourne souvent le résultat dans un champ spécifique ou directement
        return data.output || data.text || data.message || (lang === 'fr' ? "Désolé, je ne peux pas répondre pour le moment." : "Sorry, I cannot answer at the moment.");
    } catch (e) {
        console.error("n8n error:", e);
        return lang === 'fr' 
            ? "Je transmets votre question à nos experts. En attendant, consultez notre blog !"
            : "I am forwarding your question to our experts. In the meantime, check our blog!";
    }
}
