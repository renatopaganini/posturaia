/**
 * PosturaIA - Pipeline d'Analyse (V4_ULTIMATE_FIXED)
 * Rôle : CTO Orchestrateur
 * Inclut la persistance réelle en base de données Supabase et l'IA réelle via n8n.
 */
import { auth, supabase } from './auth-manager.js';

export async function runAnalysis(agent_code, payload) {
    const user = auth.getUser();
    if (!user) {
        throw new Error("Authentification requise pour enregistrer l'analyse.");
    }

    console.log(`[Pipeline V4] Lancement analyse réelle: ${agent_code}`, payload);
    
    // 1. Appel IA réelle via n8n
    let resultData;
    try {
        const response = await fetch('https://renatopaganini467.app.n8n.cloud/webhook/analyse-core', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agent: agent_code, data: payload, user_id: user.id })
        });
        resultData = await response.json();
    } catch (e) {
        console.error("Erreur n8n Analyse:", e);
        // Fallback simulation en cas d'erreur réseau
        resultData = {
            analysis_metadata: { agent_id: agent_code, version: "1.0-fallback", generated_at: new Date().toISOString() },
            scores: { global_score: 0, alignment_score: 0, symmetry_score: 0 },
            resume_final: "Erreur de connexion au serveur d'analyse."
        };
    }

    // 2. PERSISTANCE RÉELLE EN DB
    const { data, error } = await supabase
        .from('analyses')
        .insert([{ 
            user_id: user.id, 
            agent_code: agent_code, 
            input_json: payload,
            output_json: resultData 
        }])
        .select()
        .single();

    if (error) {
        console.error("Erreur de sauvegarde DB:", error);
        throw error;
    }

    return data;
}

export async function getAnalysisById(id) {
    const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function getUserAnalyses() {
    const user = auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('analyses')
        .select('id, agent_code, created_at, output_json->scores->global_score')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}
