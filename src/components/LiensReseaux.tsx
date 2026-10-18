import { A_REMPLIR } from "@/lib/placeholders";
import type { Parametres } from "@/lib/types";
import { IconeFacebook, IconeInstagram, IconeYoutube } from "./Icones";

/** Icônes rondes vers les réseaux sociaux (pied de page). */
export function LiensReseaux({ parametres: p }: { parametres: Parametres }) {
  const liens = [
    { url: p.facebookUrl, nom: "Facebook", Icone: IconeFacebook },
    { url: p.instagramUrl, nom: "Instagram", Icone: IconeInstagram },
    { url: p.youtubeUrl, nom: "YouTube", Icone: IconeYoutube },
  ].filter((l) => l.url);

  if (!liens.length) return <p className="text-white/85">{A_REMPLIR.reseaux}</p>;

  return (
    <ul className="flex gap-3">
      {liens.map(({ url, nom, Icone }) => (
        <li key={nom}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-marine"
          >
            <Icone width={22} height={22} />
            <span className="sr-only">{nom} (nouvel onglet)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
