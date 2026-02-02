# Guide d'Activation du Moteur IA PosturaIA (V4_ULTIMATE_ENGINE)

Ce guide permet d'activer le moteur IA réel de PosturaIA en moins de 15 minutes. Aucun code n'est requis.

## 1. Importation des Workflows dans n8n
Pour chaque fichier JSON fourni (`WF_BOT_SUPPORT.json`, `WF_ANALYSE_CORE.json`, `WF_BLOG_GENERATOR.json`) :
1. Ouvrez votre instance n8n.
2. Cliquez sur **"Workflows"** -> **"Add Workflow"**.
3. Cliquez sur les trois points en haut à droite -> **"Import from File"**.
4. Sélectionnez le fichier JSON correspondant.

## 2. Configuration des Credentials (Indispensable)
Dans chaque workflow importé, vous devez associer vos clés API aux nœuds correspondants :
- **Nœud OpenAI** : Cliquez sur le nœud, sélectionnez votre credential OpenAI (ou créez-en un avec votre `OPENAI_API_KEY`).
- **Nœud Supabase (Blog uniquement)** : Cliquez sur le nœud "Supabase Save", sélectionnez votre credential Supabase (URL + Service Role Key).

## 3. Activation
Une fois les credentials associés :
1. Cliquez sur le bouton **"Activate"** (en haut à droite de chaque workflow).
2. Vérifiez que le statut passe au **Vert**.

## 4. Tests de Validation Immédiate
| Fonctionnalité | Test à effectuer | Résultat attendu |
| :--- | :--- | :--- |
| **Bot** | Posez une question libre sur le site (ex: "Conseils posture ?"). | L'IA répond avec un texte clinique et pro. |
| **Analyse** | Lancez une analyse avec une image. | Le score et le résumé s'affichent (format Lulu V1). |
| **Blog** | Dans n8n, cliquez sur "Execute Workflow" dans `WF_BLOG_GENERATOR`. | Un nouvel article apparaît sur la page `/blog.html`. |

---
**Note du CTO** : Le moteur est désormais branché sur la réalité. Toute question ou analyse passera par ces workflows pour garantir un service dynamique et intelligent.
