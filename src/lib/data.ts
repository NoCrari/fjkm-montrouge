import { cacheLife, cacheTag } from "next/cache";
import { client } from "@/sanity/client";
import { moisCourantParis } from "./dates";
import { evenementsExemples, newsExemples, paragraphesEnBlocs, themeExemple } from "./exemples";
import type { Evenement, Img, MediaRecent, NewsDetail, NewsResume, Parametres, Theme } from "./types";
import { extraireIdYoutube } from "./youtube-id";

/*
 * Toutes les lectures de contenu passent par ce fichier.
 * - Les résultats sont mis en cache (tag « sanity ») et rafraîchis :
 *   instantanément quand Sanity appelle le webhook /api/revalidate,
 *   et au plus tard toutes les heures (utile pour le changement de thème au 1er du mois).
 * - Sans projet Sanity configuré, le contenu d'exemple de exemples.ts est utilisé.
 */

const IMG = `{ "url": asset->url, alt, hotspot, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;
const NEWS_RESUME = `"slug": slug.current, titre, date, categorie, resume, image ${IMG}`;

function cacheContenu() {
  cacheLife("hours");
  cacheTag("sanity");
}

async function requete<T>(groq: string, params: Record<string, unknown>, vide: T): Promise<T> {
  try {
    return (await client!.fetch<T>(groq, params)) ?? vide;
  } catch (erreur) {
    console.error("Erreur Sanity :", erreur);
    return vide;
  }
}

const imgExemple = (i: { fichier: string; alt: string }): Img => ({
  url: `/exemples/${i.fichier}`,
  alt: i.alt,
  width: 1200,
  height: 800,
});

const newsExemplesDetail: NewsDetail[] = newsExemples.map((n) => ({
  slug: n.slug,
  titre: n.titre,
  date: n.date,
  categorie: n.categorie,
  resume: n.resume,
  image: imgExemple(n.image),
  contenu: paragraphesEnBlocs(n.paragraphes, n.slug),
}));

const evenementsExemplesData: Evenement[] = evenementsExemples.map((e) => ({
  ...e,
  photos: e.photos.map(imgExemple),
  videos: [],
}));

/* ---------- Thème du mois ---------- */

export async function getThemeDuMois(): Promise<Theme | null> {
  "use cache";
  cacheContenu();
  const themes: Theme[] = client
    ? await requete(
        `*[_type == "themeMois" && defined(mois)] | order(mois desc) { mois, phrase, verset, reference, traduction, presentation, photo ${IMG} }`,
        {},
        [],
      )
    : [{ ...themeExemple, photo: imgExemple(themeExemple.photo) }];

  // Le thème du mois en cours, sinon le plus récent déjà passé, sinon le prochain prévu.
  const moisCourant = moisCourantParis(new Date());
  return (
    themes.find((t) => t.mois.slice(0, 7) === moisCourant) ??
    themes.find((t) => t.mois.slice(0, 7) < moisCourant) ??
    themes.at(-1) ??
    null
  );
}

/* ---------- Actualités ---------- */

export async function getNewsListe(limite?: number): Promise<NewsResume[]> {
  "use cache";
  cacheContenu();
  const toutes = client
    ? await requete<NewsResume[]>(
        `*[_type == "news" && defined(slug.current)] | order(date desc, _createdAt desc) [0...$fin] { ${NEWS_RESUME} }`,
        { fin: limite ?? 1000 },
        [],
      )
    : newsExemplesDetail;
  return limite ? toutes.slice(0, limite) : toutes;
}

export async function getNews(slug: string): Promise<NewsDetail | null> {
  "use cache";
  cacheContenu();
  if (!client) return newsExemplesDetail.find((n) => n.slug === slug) ?? null;
  return requete<NewsDetail | null>(
    `*[_type == "news" && slug.current == $slug][0] {
      ${NEWS_RESUME},
      contenu[] { ..., _type == "image" => { "url": asset->url, alt, legende, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height } }
    }`,
    { slug },
    null,
  );
}

/* ---------- Événements (médias) ---------- */

const EVENEMENT = `"slug": slug.current, titre, date, description, "photos": coalesce(photos[] ${IMG}, []), "videos": coalesce(videos, [])`;

export async function getEvenements(): Promise<Evenement[]> {
  "use cache";
  cacheContenu();
  if (!client) return evenementsExemplesData;
  return requete<Evenement[]>(
    `*[_type == "evenement" && defined(slug.current)] | order(date desc) { ${EVENEMENT} }`,
    {},
    [],
  );
}

export async function getEvenement(slug: string): Promise<Evenement | null> {
  "use cache";
  cacheContenu();
  if (!client) return evenementsExemplesData.find((e) => e.slug === slug) ?? null;
  return requete<Evenement | null>(`*[_type == "evenement" && slug.current == $slug][0] { ${EVENEMENT} }`, { slug }, null);
}

/** Photos et vidéos les plus récentes, tous événements confondus. */
export async function getMediasRecents(nombre: number): Promise<MediaRecent[]> {
  const evenements = await getEvenements();
  const medias: MediaRecent[] = [];
  for (const ev of evenements) {
    for (const lien of ev.videos) {
      const id = extraireIdYoutube(lien);
      if (id) {
        medias.push({
          type: "video",
          image: { url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, alt: `Vidéo : ${ev.titre}`, width: 480, height: 360 },
          evenementSlug: ev.slug,
          evenementTitre: ev.titre,
        });
      }
    }
    for (const photo of ev.photos) {
      medias.push({ type: "photo", image: photo, evenementSlug: ev.slug, evenementTitre: ev.titre });
    }
    if (medias.length >= nombre) break;
  }
  return medias.slice(0, nombre);
}

/* ---------- Paramètres ---------- */

export async function getParametres(): Promise<Parametres> {
  "use cache";
  cacheContenu();
  const p = client
    ? await requete<Partial<Parametres> | null>(`*[_type == "parametres" && _id == "parametres"][0]`, {}, null)
    : null;
  return {
    ...p,
    horairesCultes: p?.horairesCultes ?? [],
    horairesDirects: p?.horairesDirects?.length ? p.horairesDirects : (p?.horairesCultes ?? []),
  };
}

/** Année en cours (pied de page). */
export async function getAnnee(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
