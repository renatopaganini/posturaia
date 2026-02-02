# Documentation du Workflow Blog Automatisé

## 1. Fonctionnement du Workflow n8n
Le système utilise une "IA Écrivaine" intégrée à n8n pour générer du contenu SEO de haute qualité.

- **Trigger** : Cron job configuré pour s'exécuter 2 fois par jour (09:00 et 18:00).
- **Génération** : L'IA produit un article en Français et sa version adaptée en Anglais.
- **Publication** : Les articles sont ajoutés au fichier `assets/blog/posts.json` sur l'hébergement Infomaniak.

## 2. Structure d'un Article
Chaque article généré suit un format strict :
- **Titre H1** + Intro.
- **4 Sections H2** pour la lisibilité.
- **CTA discret** vers le bilan postural ou le pricing.
- **Avertissement Médical** obligatoire en pied de page.

## 3. Maintenance
- **Images** : Les images hero sont stockées dans `assets/blog/img/` (optimisées < 50KB).
- **Indexation** : La page `blog.html` charge dynamiquement les articles en fonction de la langue choisie par l'utilisateur.
