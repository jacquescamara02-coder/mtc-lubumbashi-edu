## Objectif

Donner à l'admin le contrôle total et professionnel sur **chaque texte et chaque image** du site (Hero, À propos, Formations, Galerie, Vidéos, Témoignages, Paiement, Contact, FAQ, Footer, Sites partenaires), sans qu'il manque le moindre élément.

## Architecture proposée

### 1. Backend (base de données)

Deux tables génériques + un bucket de stockage déjà existant (`uploads`) :

- **`site_texts`** (existe déjà) — étendue avec un champ `label` (titre lisible : "Titre principal du Hero") et `kind` (`text` court ou `richtext` paragraphe). Chaque texte du site est identifié par une clé stable (ex: `hero.title`, `about.paragraph_1`).
- **`site_images`** (nouvelle) — chaque image du site est un "slot" identifié par une clé stable (ex: `hero.background`, `about.photo`, `gallery.cover_1`) avec `label`, `image_url`, `section`. Si l'admin n'a rien uploadé, le site utilise l'image par défaut (fallback codé en dur).

Les deux tables sont auto-alimentées par un seed initial qui crée tous les slots existants du site avec leurs valeurs actuelles.

### 2. Frontend (hooks universels)

Deux hooks simples utilisés dans chaque composant :

- `useSiteText("hero.title", "Bienvenue au MTC")` → renvoie la valeur de la BDD ou le fallback.
- `useSiteImage("hero.background", heroImg)` → idem pour les images.

Tous les composants (`HeroSection`, `AboutSection`, `CoursesSection`, `GallerySection`, `VideoSection`, `TestimonialsSection`, `PaymentSection`, `ContactSection`, `FAQSection`, `Footer`, `SitesSection`, `Navbar`) sont refactorés pour passer leurs textes et images via ces hooks. Aucun changement visuel — uniquement la source des données change.

### 3. Tableau de bord admin — restructuré

Le menu admin devient organisé par **section du site** (et plus par type technique), pour que l'admin pense en termes de pages :

```
Tableau de bord
├─ Contenu du site
│   ├─ Hero (accueil)
│   ├─ À propos
│   ├─ Formations
│   ├─ Galerie photos
│   ├─ Vidéos
│   ├─ Témoignages
│   ├─ Paiement
│   ├─ Contact
│   ├─ FAQ
│   ├─ Footer
│   └─ Navigation
├─ Services (existant)
├─ Articles (existant)
└─ Affiches & annonces
```

Chaque page de section affiche **tous les textes ET toutes les images de cette section** sur un seul écran, avec :
- Aperçu de l'image actuelle + bouton "Remplacer" (upload direct)
- Champs de texte modifiables en direct avec sauvegarde instantanée
- Étiquettes lisibles ("Titre du Hero", "Sous-titre du Hero", "Image de fond du Hero")

Aucun champ technique exposé. L'admin voit exactement ce qu'il voit sur le site.

## Plan d'exécution

1. **Migration BDD** : créer `site_images`, ajouter `label`/`kind` à `site_texts`, seeder tous les slots actuels (textes + images de toutes les sections).
2. **Hooks frontend** : `useSiteText` et `useSiteImage` avec cache React Query.
3. **Refactor des composants** : remplacer chaque chaîne et chaque `<img>` par les hooks, sans changer le design.
4. **Nouveau layout admin** : sidebar regroupée par section du site.
5. **Pages d'édition par section** : un éditeur unifié par section (textes + images côte à côte).
6. **Suppression de l'ancienne page "Textes du site"** (remplacée par les éditeurs par section, plus clairs).

## Détails techniques

- Cache front : React Query avec `staleTime: 60s`, invalidation à chaque update admin.
- Upload images : bucket `uploads` existant, chemin `site/{section}/{key}-{timestamp}.{ext}`.
- RLS : `site_images` lisible par tous, modifiable uniquement par admin (même schéma que `site_texts`).
- Fallback robuste : si la BDD est lente ou vide, les images/textes codés en dur s'affichent immédiatement → zéro régression visuelle.

## Hors-scope (volontairement)

- Pas de WYSIWYG complexe — juste textarea + upload (suffisant et fiable).
- Pas de versioning des contenus (peut être ajouté plus tard si demandé).
- Galerie et témoignages gardent leurs pages dédiées existantes (déjà optimales pour des listes).

---

Confirme et je lance la migration + le refactor complet.