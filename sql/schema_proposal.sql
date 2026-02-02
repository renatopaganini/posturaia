-- PROPOSITION DE STRUCTURE BACKEND (SAFE MODE)
-- À valider par l'utilisateur avant exécution

-- 1. Table des profils utilisateurs (extension de auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    plan_type TEXT DEFAULT 'free', -- free, pro, senior
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table des analyses de posture
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    media_url TEXT,
    results_json JSONB, -- Stockage du format JSON stable
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table des quotas (Reset mensuel)
CREATE TABLE IF NOT EXISTS public.quotas (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    analyses_used INTEGER DEFAULT 0,
    last_reset TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view their own analyses" ON public.analyses
    FOR SELECT USING (auth.uid() = user_id);

-- 5. RPC pour reset des quotas (exemple)
-- CREATE OR REPLACE FUNCTION reset_monthly_quotas() ...
