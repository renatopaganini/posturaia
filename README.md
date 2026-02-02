# PosturaIA - Squelette V3 (Prêt Infomaniak)

## Architecture du Moteur
Ce ZIP contient le socle produit minimaliste et testable de PosturaIA. Mobirise a été abandonné pour privilégier la fiabilité du moteur d'analyse et d'authentification.

- **Authentification** : `/assets/js/auth-manager.js` (Supabase v2 réel).
- **Parcours Analyse** : `/intake.html` -> `/capture.html` -> `/analyze.html` -> `/results.html`.
- **Pipeline** : `/assets/js/analysis-pipeline.js` (Stub testable).
- **Format Data** : `/assets/data/lulu_format.json` (Format standard Lulu agents).

## Installation
1. Uploader le contenu sur `/sites/posturaia.com`.
2. Vérifier que la `Site URL` dans Supabase Auth est `https://posturaia.com`.
3. Ajouter `https://posturaia.com/login.html` et `https://posturaia.com/signup.html` aux Redirect URLs.

## Checklist Smoke Test (CTO)
- [x] Google OAuth : Bouton redirige réellement vers Supabase.
- [x] Session : Persistante au reload (via `onAuthStateChange`).
- [x] Analyse : Parcours complet de l'intake aux résultats (simulation 3s).
- [x] Sécurité : Pas de `service_role` exposé, clé `anon` complète.
- [x] Chemins : Chemins relatifs propres (`assets/js/...`).

## Note sur les Médias
Conformément à la politique "Privacy First", les médias capturés ne sont pas stockés de manière permanente. L'analyse s'effectue via un pipeline client-side simulé.
