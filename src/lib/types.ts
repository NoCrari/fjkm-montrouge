import type { PortableTextBlock } from "next-sanity";

export type Img = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** Point d'intérêt choisi dans Sanity (0 à 1), utilisé pour le cadrage. */
  hotspot?: { x: number; y: number };
};

export type Theme = {
  mois: string; // AAAA-MM-JJ
  phrase: string;
  verset: string;
  reference: string;
  traduction?: string;
  presentation?: string;
  photo?: Img;
};

export type NewsResume = {
  slug: string;
  titre: string;
  date: string;
  categorie: string;
  resume: string;
  image?: Img;
};

export type NewsDetail = NewsResume & { contenu?: PortableTextBlock[] };

export type Evenement = {
  slug: string;
  titre: string;
  date: string;
  description?: string;
  photos: Img[];
  videos: string[]; // liens YouTube
};

export type Creneau = { jour: string; heure: string; libelle?: string };

export type Parametres = {
  horairesCultes: Creneau[];
  horairesDirects: Creneau[];
  adresse?: string;
  latitude?: number;
  longitude?: number;
  email?: string;
  telephone?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  youtubeChannelId?: string;
  instagramWidgetUrl?: string;
  nomAssociation?: string;
  adresseSiege?: string;
  responsablePublication?: string;
};

export type MediaRecent = {
  type: "photo" | "video";
  image: Img;
  evenementSlug: string;
  evenementTitre: string;
};

export type VideoYoutube = {
  id: string;
  titre: string;
  date: string;
  miniature: string;
};
