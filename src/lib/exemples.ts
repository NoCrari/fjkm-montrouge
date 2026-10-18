/**
 * Contenu de départ.
 * - Affiché tant que Sanity n'est pas connecté (fichier .env.local vide).
 * - Importé dans Sanity par le script `npm run seed`.
 * Les news et événements marqués [EXEMPLE – À SUPPRIMER] sont à supprimer depuis /admin.
 */

export const themeExemple = {
  mois: "2026-10-01",
  phrase: "Prier sans relâche",
  verset: "Priez sans cesse.",
  reference: "1 Thessaloniciens 5.17",
  traduction: "Louis Segond",
  presentation: "[TEXTE DE PRÉSENTATION DU THÈME — à rédiger dans l'administration]",
  photo: { fichier: "theme.svg", alt: "Image d'illustration à remplacer" },
};

export const newsExemples = [
  {
    slug: "exemple-bienvenue-sur-le-nouveau-site",
    titre: "[EXEMPLE – À SUPPRIMER] Bienvenue sur le nouveau site",
    date: "2026-10-15",
    categorie: "Annonce",
    resume:
      "Actualité d'exemple : elle montre à quoi ressemble une news sur le site. Supprimez-la depuis l'administration une fois vos propres actualités publiées.",
    image: { fichier: "photo-1.svg", alt: "Image d'exemple à remplacer" },
    paragraphes: [
      "Ceci est une actualité d'exemple. Elle sert uniquement à montrer la mise en page d'une news : titre, catégorie, date, image, résumé et texte.",
      "Pour publier une vraie actualité, connectez-vous sur la page /admin du site, ouvrez « Actualités » puis cliquez sur le bouton de création.",
      "Pensez à supprimer cette actualité d'exemple une fois vos propres contenus en ligne.",
    ],
  },
  {
    slug: "exemple-theme-du-mois-prier-sans-relache",
    titre: "[EXEMPLE – À SUPPRIMER] Thème du mois : prier sans relâche",
    date: "2026-10-04",
    categorie: "Vie de l'église",
    resume:
      "Exemple d'actualité liée au thème du mois d'octobre 2026. Remplacez ce texte par votre propre contenu.",
    image: { fichier: "photo-2.svg", alt: "Image d'exemple à remplacer" },
    paragraphes: [
      "Ceci est une actualité d'exemple liée au thème du mois.",
      "« Priez sans cesse. » — 1 Thessaloniciens 5.17 (Louis Segond)",
      "Remplacez ce texte par votre propre contenu, ou supprimez cette actualité depuis l'administration.",
    ],
  },
  {
    slug: "exemple-modele-annonce-evenement",
    titre: "[EXEMPLE – À SUPPRIMER] Modèle d'annonce d'événement",
    date: "2026-09-27",
    categorie: "Événement",
    resume:
      "Modèle d'annonce : indiquez ici en une ou deux phrases ce qui se passe, quand et où. À supprimer.",
    image: { fichier: "photo-3.svg", alt: "Image d'exemple à remplacer" },
    paragraphes: [
      "Ceci est un modèle d'annonce d'événement.",
      "Indiquez ici la date, l'heure, le lieu et toutes les informations utiles pour les personnes qui souhaitent participer.",
      "Supprimez cette actualité d'exemple depuis l'administration.",
    ],
  },
];

export const evenementsExemples = [
  {
    slug: "exemple-galerie-1",
    titre: "[EXEMPLE – À SUPPRIMER] Galerie photos d'exemple",
    date: "2026-10-11",
    description:
      "Événement d'exemple pour montrer la galerie. Ajoutez vos propres photos et vidéos YouTube depuis l'administration, puis supprimez celui-ci.",
    photos: [
      { fichier: "photo-1.svg", alt: "Photo d'exemple n°1 à remplacer" },
      { fichier: "photo-2.svg", alt: "Photo d'exemple n°2 à remplacer" },
      { fichier: "photo-3.svg", alt: "Photo d'exemple n°3 à remplacer" },
      { fichier: "photo-4.svg", alt: "Photo d'exemple n°4 à remplacer" },
    ],
  },
  {
    slug: "exemple-galerie-2",
    titre: "[EXEMPLE – À SUPPRIMER] Deuxième galerie d'exemple",
    date: "2026-09-20",
    description: "Deuxième événement d'exemple. À supprimer depuis l'administration.",
    photos: [
      { fichier: "photo-5.svg", alt: "Photo d'exemple n°5 à remplacer" },
      { fichier: "photo-6.svg", alt: "Photo d'exemple n°6 à remplacer" },
      { fichier: "photo-4.svg", alt: "Photo d'exemple n°7 à remplacer" },
    ],
  },
];

/** Convertit des paragraphes simples en texte riche Sanity (Portable Text). */
export function paragraphesEnBlocs(paragraphes: string[], prefixe: string) {
  return paragraphes.map((texte, i) => ({
    _type: "block" as const,
    _key: `${prefixe}-p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span" as const, _key: `${prefixe}-s${i}`, text: texte, marks: [] }],
  }));
}
