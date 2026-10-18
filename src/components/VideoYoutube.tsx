import { extraireIdYoutube } from "@/lib/youtube-id";
import { ClickToLoad } from "./ClickToLoad";

/** Vidéo YouTube intégrée (chargée au clic, sans cookie avant lecture). */
export function VideoYoutube({ lien, titre }: { lien: string; titre: string }) {
  const id = extraireIdYoutube(lien);
  if (!id) return null;
  return (
    <ClickToLoad
      fournisseur="youtube"
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
      titre={titre}
      libelle="Lire la vidéo"
      miniature={{ url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, alt: "", width: 480, height: 360 }}
      className="aspect-video w-full rounded-carte"
    />
  );
}
