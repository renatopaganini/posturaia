/**
 * PosturaIA - Schéma de Production (Safe Mode)
 * Rôle : CTO Orchestrateur
 * Objectif : Cohérence DB pour parcours Analyse
 */

-- 1. Table des profils (étendu depuis auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    role TEXT DEFAULT 'user', -- user, pro, admin
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table des analyses
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    agent_code TEXT NOT NULL, -- lulu_basic, lulu_experte, etc.
    status TEXT DEFAULT 'completed',
    input_json JSONB, -- Questionnaire initial
    output_json JSONB, -- Format Lulu V1
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table des patients (pour le parcours PRO)
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pro_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    pseudo TEXT NOT NULL,
    reference_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS (Row Level Security) - Protection des données
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view their own analyses" ON public.analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Pros can view their own patients" ON public.patients FOR SELECT USING (auth.uid() = pro_user_id);
