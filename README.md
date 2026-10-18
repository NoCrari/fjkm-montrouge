# Site web FJKM Montrouge-Paris Fiorenana

Site de l'église : actualités, photos et vidéos, culte en direct, thème du mois et informations pratiques.
Les contenus sont modifiables par des bénévoles, sans savoir coder, depuis l'adresse **/admin** du site.

| Rôle | Outil |
|---|---|
| Site | Next.js 16 (React, TypeScript) + Tailwind CSS |
| Administration des contenus | Sanity, intégré au site sur `/admin`, en français |
| Hébergement | Vercel |

**Sommaire**

1. [Lancer le site sur votre ordinateur](#1-lancer-le-site-sur-votre-ordinateur)
2. [Créer le projet Sanity (administration)](#2-créer-le-projet-sanity-administration)
3. [Mettre le site en ligne sur Vercel](#3-mettre-le-site-en-ligne-sur-vercel)
4. [Mise à jour instantanée après publication](#4-mise-à-jour-instantanée-après-publication)
5. [Inviter les bénévoles](#5-inviter-les-bénévoles)
6. [Guide du bénévole](#6-guide-du-bénévole)
7. [Configurer les réseaux sociaux](#7-configurer-les-réseaux-sociaux)
8. [Informations à compléter](#8-informations-à-compléter)
9. [Pour les développeurs](#9-pour-les-développeurs)

---

## 1. Lancer le site sur votre ordinateur

**Prérequis** (déjà installés sur l'ordinateur où le site a été créé) :
- [Node.js](https://nodejs.org) version 20 ou plus (version « LTS »)
- [Git](https://git-scm.com)

Ouvrez un terminal (PowerShell sous Windows) dans le dossier du projet, puis :

```bash
npm install      # à faire une seule fois (installe les dépendances)
npm run dev      # lance le site
```

Ouvrez **http://localhost:3000** dans votre navigateur. Pour arrêter : `Ctrl + C` dans le terminal.

> Tant que Sanity n'est pas configuré (étape 2), le site affiche le **contenu d'exemple** intégré :
> le thème d'octobre 2026, 3 news et 2 galeries marquées « [EXEMPLE – À SUPPRIMER] ».
> Les informations de l'église apparaissent entre crochets : `[ADRESSE]`, `[EMAIL]`…

> Sous Windows, si PowerShell refuse `npm` (« l'exécution de scripts est désactivée »), tapez `npm.cmd` à la place de `npm`.

---

## 2. Créer le projet Sanity (administration)

Sanity stocke les contenus (news, photos, thème…) et fournit l'interface d'administration.
La formule gratuite suffit pour démarrer.

1. Créez un compte sur **[sanity.io](https://www.sanity.io)** (avec l'adresse email de l'église, de préférence).
2. Sur **[sanity.io/manage](https://www.sanity.io/manage)**, cliquez sur **Create new project**.
   Nommez-le « FJKM Montrouge », et gardez le dataset proposé : `production`.
3. Notez l'**identifiant du projet** (*Project ID*, une suite de lettres et chiffres comme `ab12cd34`).
4. Dans le dossier du projet, copiez le fichier `.env.example` sous le nom **`.env.local`** et remplissez :
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ab12cd34
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
5. Autorisez le site à se connecter à Sanity : dans sanity.io/manage > votre projet > **API** > **CORS origins** > **Add CORS origin** :
   - `http://localhost:3000`, en cochant **Allow credentials**
   - (plus tard) l'adresse du site en ligne, en cochant aussi **Allow credentials**
6. Importez le contenu de départ :
   ```bash
   npx sanity login     # connexion à votre compte Sanity (une seule fois)
   npm run seed         # importe le thème d'octobre 2026, 3 news et 2 galeries d'exemple
   ```
7. Relancez `npm run dev`, puis ouvrez **http://localhost:3000/admin** et connectez-vous.

---

## 3. Mettre le site en ligne sur Vercel

### a) Envoyer le code sur GitHub

1. Sur [github.com](https://github.com), créez un **nouveau dépôt** (*New repository*), par exemple `fjkm-montrouge`, en **privé**, sans README.
2. Dans le dossier du projet :
   ```bash
   git init
   git add .
   git commit -m "Premier envoi du site"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/fjkm-montrouge.git
   git push -u origin main
   ```
   (Le fichier `.env.local` n'est **pas** envoyé : c'est voulu, il reste privé.)

### b) Créer le site sur Vercel

1. Créez un compte sur **[vercel.com](https://vercel.com)** avec **« Continue with GitHub »**.
2. Cliquez sur **Add New… > Project**, puis choisissez le dépôt `fjkm-montrouge` et **Import**.
3. Dans **Environment Variables**, ajoutez :

   | Nom | Valeur |
   |---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | votre identifiant Sanity |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `SANITY_REVALIDATE_SECRET` | une longue phrase secrète inventée (voir étape 4) |
   | `NEXT_PUBLIC_SITE_URL` | l'adresse du site, ex. `https://fjkm-montrouge.vercel.app` |

4. Cliquez sur **Deploy**. Après 1 à 2 minutes, le site est en ligne.
5. Ajoutez l'adresse du site en ligne dans les **CORS origins** de Sanity (étape 2.5), avec **Allow credentials**.

Ensuite, **chaque `git push` met automatiquement le site à jour.**

### c) Nom de domaine (facultatif)

Achetez un domaine (environ 10 à 15 €/an), puis dans Vercel > votre projet > **Settings > Domains**, ajoutez-le et suivez les instructions.
Mettez à jour `NEXT_PUBLIC_SITE_URL` et les CORS origins de Sanity avec la nouvelle adresse.

> **Formule Vercel** : la formule gratuite « Hobby » est prévue pour un usage personnel et non commercial.
> Pour être pleinement dans les conditions d'utilisation, la formule « Pro » (environ 20 $/mois) est recommandée.
> Le site fonctionne de la même façon avec l'une ou l'autre.

---

## 4. Mise à jour instantanée après publication

Sans réglage, une publication dans l'administration apparaît sur le site **en moins d'une heure**.
Pour qu'elle apparaisse **en quelques secondes**, créez un webhook :

1. sanity.io/manage > votre projet > **API** > **Webhooks** > **Create webhook**
2. Remplissez :
   - **Name** : `Mise à jour du site`
   - **URL** : `https://VOTRE-SITE/api/revalidate`
   - **Dataset** : `production`
   - **Trigger on** : cochez *Create*, *Update* et *Delete*
   - **Filter** : `_type in ["news", "evenement", "themeMois", "parametres"]`
   - **HTTP method** : `POST`
   - **Secret** : exactement la même phrase que `SANITY_REVALIDATE_SECRET` sur Vercel
3. **Save**.

Le thème du mois change tout seul au 1er du mois (dans l'heure qui suit minuit, heure de Paris).

---

## 5. Inviter les bénévoles

sanity.io/manage > votre projet > **Members** > **Invite members** : saisissez l'email du bénévole et choisissez le rôle **Editor**.
Le bénévole reçoit un email, crée son accès (avec Google ou email + mot de passe), puis se connecte sur **https://VOTRE-SITE/admin**.

> Un lien « Espace bénévoles » se trouve aussi en bas de chaque page du site.

---

## 6. Guide du bénévole

Rendez-vous sur **https://VOTRE-SITE/admin** et connectez-vous. Le menu de gauche contient :
**Thème du mois**, **Actualités**, **Photos & vidéos (événements)** et **Paramètres du site**.

Rien n'apparaît sur le site tant que vous n'avez pas cliqué sur **Publier** (bouton vert en bas à droite).
Vous pouvez donc préparer un contenu tranquillement : il reste en brouillon.

### Publier une news

1. Cliquez sur **Actualités**, puis sur l'icône **crayon / +** en haut de la liste.
2. Remplissez :
   - **Titre**
   - **Adresse de la page** : cliquez sur **Générer**
   - **Date de publication** (aujourd'hui par défaut)
   - **Catégorie**
   - **Image principale** : glissez une photo, puis remplissez sa **description** (une phrase qui dit ce que montre la photo : elle est lue aux personnes malvoyantes)
   - **Résumé** : 1 ou 2 phrases, affichées sur la page d'accueil
   - **Texte** : le contenu complet (vous pouvez ajouter des intertitres, des listes, des liens et des images)
3. Cliquez sur **Publier**.

Les 3 news les plus récentes s'affichent automatiquement sur la page d'accueil.

**Modifier ou supprimer une news** : ouvrez-la dans la liste, modifiez puis **Publier**.
Pour la supprimer : menu **⋯** (à côté de Publier) > **Supprimer**.
👉 Pensez à supprimer les 3 news **[EXEMPLE – À SUPPRIMER]**.

### Changer le thème du mois

La bonne méthode : **créer un nouveau thème pour chaque mois** (ce qui garde l'historique).

1. Cliquez sur **Thème du mois**, puis sur **+**.
2. Remplissez :
   - **Mois** : choisissez n'importe quel jour du mois concerné
   - **Phrase du thème**
   - **Texte du verset** (sans guillemets)
   - **Référence biblique** (ex. 1 Thessaloniciens 5.17)
   - **Traduction**
   - **Court texte de présentation**
   - **Photo**, avec sa description
3. Cliquez sur **Publier**.

Le site affiche automatiquement le thème du mois en cours.
Vous pouvez donc préparer les thèmes des mois suivants à l'avance : ils apparaîtront le moment venu.

### Ajouter des photos et vidéos d'un événement

1. **Photos & vidéos (événements)** > **+**
2. Saisissez le **titre**, cliquez sur **Générer** pour l'adresse, puis indiquez la **date**.
3. **Photos** : glissez-déposez plusieurs photos d'un coup. La première sert de couverture.
   Remplissez la description de chaque photo (cliquez sur la photo).
4. **Vidéos YouTube** : cliquez sur **Ajouter**, puis collez le lien de la vidéo (sur YouTube : bouton **Partager** > **Copier**).
5. **Publier**.

👉 Pensez à supprimer les 2 galeries **[EXEMPLE – À SUPPRIMER]**.

> Conseil : avant d'envoyer des photos, vérifiez que les personnes reconnaissables sont d'accord pour apparaître sur le site.

### Modifier les horaires, l'adresse, les réseaux sociaux

**Paramètres du site** : quatre onglets (Horaires, Adresse & contact, Réseaux sociaux, Mentions légales).
Modifiez puis cliquez sur **Publier**.

---

## 7. Configurer les réseaux sociaux

Tout se règle dans **/admin > Paramètres du site > Réseaux sociaux**.

> **Cookies (RGPD)** : YouTube, Facebook et Instagram déposent des cookies.
> Sur ce site, leurs contenus ne se chargent qu'après un clic du visiteur (bouton « Afficher… »), conformément aux recommandations de la CNIL.
> Le visiteur peut cocher « Toujours afficher » ; il peut annuler ce choix depuis la page Mentions légales.

### Facebook (plugin de page officiel)

1. Collez l'adresse de la page dans **Lien de la page Facebook** (ex. `https://www.facebook.com/nomdelapage`).
2. La page doit être **publique** : pas de restriction d'âge ni de pays dans les paramètres de la page Facebook.
   Sinon, le plugin reste vide.

Aucun compte développeur n'est nécessaire. Les derniers posts s'affichent dans « Suivez-nous », sur la page d'accueil.

### YouTube (direct + dernières vidéos)

1. **Lien de la chaîne YouTube** : l'adresse de la chaîne (ex. `https://www.youtube.com/@nomdelachaine`).
2. **ID de la chaîne YouTube** : il commence par `UC` et fait 24 caractères.
   Pour le trouver : connecté à YouTube, photo de profil > **Paramètres** > **Paramètres avancés** > **ID de la chaîne**.

Ce que ça active :
- **Lecteur du direct** (accueil et page Live) : il affiche automatiquement le direct en cours de la chaîne.
  Pour que ça marche, le direct doit être **public** (pas « non répertorié ») et l'**intégration doit être autorisée** (YouTube Studio > paramètres du direct, réglage activé par défaut).
  Hors direct, YouTube affiche « Cette vidéo n'est pas disponible » : c'est normal, la page invite alors à regarder les replays.
- **Dernières vidéos et replays** : lus depuis le flux public de la chaîne (jusqu'à 15 vidéos), sans clé d'API.
  Ils se mettent à jour toutes les heures.

> Pour lancer un direct depuis YouTube, la chaîne doit avoir activé la diffusion en direct (vérification par téléphone ; le tout premier direct peut demander 24 h d'attente).

### Instagram (lien + emplacement pour un widget)

1. **Lien du compte Instagram** : l'adresse du compte (ex. `https://www.instagram.com/nomducompte`). Le site affiche un bouton vers le compte.
2. **Afficher les derniers posts** (facultatif) : Instagram ne propose pas de plugin simple.
   L'API officielle demande un compte Instagram **professionnel ou créateur** relié à une page Facebook, ainsi qu'une application déclarée sur [developers.facebook.com](https://developers.facebook.com).
   Le plus simple est de passer par un **service de widget Instagram** qui fait cette connexion pour vous et fournit une **adresse d'intégration (iframe)**.
   Collez cette adresse dans **Adresse du widget Instagram** : le flux s'affichera dans le cadre prévu (chargé lui aussi au clic).
   Vérifiez les conditions et la politique de confidentialité du service choisi.

---

## 8. Informations à compléter

Tant qu'elles ne sont pas renseignées, ces informations apparaissent entre crochets sur le site.
**Aucune information sur l'église n'a été inventée.**

| Affiché sur le site | Où le renseigner |
|---|---|
| `[ADRESSE]` | Paramètres du site > Adresse & contact |
| `[COORDONNÉES GPS]` (carte) | Paramètres du site > Latitude / Longitude |
| `[HORAIRES DES CULTES]` | Paramètres du site > Horaires |
| `[EMAIL]`, `[TÉLÉPHONE]` | Paramètres du site > Adresse & contact |
| `[LIENS RÉSEAUX]` | Paramètres du site > Réseaux sociaux |
| `[ID CHAÎNE YOUTUBE]` | Paramètres du site > Réseaux sociaux |
| `[NOM DE L'ASSOCIATION]`, `[RESPONSABLE DE LA PUBLICATION]`, `[ADRESSE DU SIÈGE]` | Paramètres du site > Mentions légales |
| Texte de présentation du thème d'octobre | Thème du mois > Octobre 2026 |
| Photos d'exemple | Remplacer dans l'administration |

**Logo** : le nom de l'église est affiché en texte. Pour mettre un logo, placez le fichier dans `public/` et modifiez `src/components/Header.tsx` (endroit signalé par un commentaire).

**Mentions légales** : le texte (`src/app/(site)/mentions-legales/page.tsx`) est un modèle.
Faites-le relire, et vérifiez l'adresse de l'hébergeur Vercel indiquée sur [vercel.com/legal](https://vercel.com/legal).

---

## 9. Pour les développeurs

### Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement (http://localhost:3000) |
| `npm run build` | Compilation de production |
| `npm run start` | Lance la version compilée |
| `npm run lint` | Vérification du code |
| `npm run seed` | Importe le contenu de départ dans Sanity (peut être relancé sans créer de doublons) |

### Structure

```
src/
├── app/
│   ├── (site)/                  # pages publiques (avec en-tête et pied de page)
│   │   ├── page.tsx             # Accueil
│   │   ├── news/                # liste + [slug] (détail)
│   │   ├── medias/              # liste des événements + [slug] (galerie)
│   │   ├── live/  contact/  mentions-legales/
│   │   └── layout.tsx
│   ├── admin/[[...tool]]/       # interface Sanity sur /admin
│   ├── api/revalidate/          # webhook : mise à jour instantanée
│   ├── layout.tsx               # polices, métadonnées
│   ├── globals.css              # charte graphique (couleurs, boutons)
│   ├── not-found.tsx  robots.ts  sitemap.ts
├── components/                  # en-tête, bandeau du thème, cartes, galerie, lecteurs…
├── lib/
│   ├── data.ts                  # toutes les lectures de contenu (cache + exemples)
│   ├── exemples.ts              # contenu de départ
│   ├── youtube.ts               # flux RSS de la chaîne
│   └── types.ts  dates.ts  placeholders.ts
└── sanity/
    ├── schemas/                 # formulaires de l'administration
    ├── structure.ts             # menu de l'administration
    └── client.ts  env.ts
sanity.config.ts                 # configuration de l'administration
scripts/seed.ts                  # import du contenu de départ
public/exemples/                 # images d'exemple (SVG)
```

### Fonctionnement du cache

Next.js 16 avec *Cache Components* : les lectures dans `src/lib/data.ts` utilisent `"use cache"`, avec le tag `sanity` et une durée d'une heure.
Le webhook `/api/revalidate` invalide ce tag à chaque publication. Les pages sont pré-générées et servies très rapidement.

### Charte graphique

Couleurs définies dans `src/app/globals.css` (`@theme`) et utilisables en classes Tailwind :
`marine` #0F2547, `ciel` #A8D4F0, `ciel-clair` #E8F4FC, `rouge` #C8102E (réservé au Live et aux actions principales), `texte` #24406B, `texte-doux` #3A5478, `bordure` #CFE3F2.
Polices : DM Serif Display (titres) et Source Sans 3 (texte).
