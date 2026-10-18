import { cacheLife } from "next/cache";
import type { VideoYoutube } from "./types";

/**
 * Dernières vidéos d'une chaîne, via le flux RSS public de YouTube (aucune clé d'API nécessaire).
 * Rafraîchi toutes les heures.
 */
export async function getDernieresVideos(channelId: string | undefined, nombre: number): Promise<VideoYoutube[]> {
  "use cache";
  cacheLife("hours");
  if (!channelId || !/^UC[\w-]{22}$/.test(channelId)) return [];

  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    if (!res.ok) return [];
    const xml = await res.text();
    const entrees = xml.split("<entry>").slice(1);
    return entrees.slice(0, nombre).flatMap((entree) => {
      const id = entree.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
      if (!id) return [];
      return [
        {
          id,
          titre: decoderXml(entree.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "Vidéo"),
          date: entree.match(/<published>([^<]+)<\/published>/)?.[1] ?? "",
          miniature: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        },
      ];
    });
  } catch (erreur) {
    console.error("Flux YouTube indisponible :", erreur);
    return [];
  }
}

function decoderXml(texte: string): string {
  return texte
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
