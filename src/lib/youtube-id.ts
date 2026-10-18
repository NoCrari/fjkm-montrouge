/** Extrait l'identifiant d'une vidéo depuis un lien YouTube (watch, youtu.be, shorts, live, embed). */
export function extraireIdYoutube(url: string): string | null {
  const m = url
    .trim()
    .match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}
