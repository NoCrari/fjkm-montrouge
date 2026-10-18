import { formaterDate } from "@/lib/dates";
import { A_REMPLIR } from "@/lib/placeholders";
import type { Parametres, VideoYoutube } from "@/lib/types";
import { ClickToLoad } from "./ClickToLoad";
import { CmsImage } from "./CmsImage";
import { IconeFacebook, IconeInstagram, IconeYoutube } from "./Icones";

function EnteteReseau({ Icone, nom }: { Icone: typeof IconeFacebook; nom: string }) {
  return (
    <h3 className="mb-4 flex items-center gap-2 text-2xl">
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-ciel-clair text-marine">
        <Icone />
      </span>
      {nom}
    </h3>
  );
}

function LienCompte({ url, texte }: { url?: string; texte: string }) {
  if (!url) return <p className="mt-4 font-semibold">{A_REMPLIR.reseaux}</p>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-contour mt-4">
      {texte}
      <span className="sr-only"> (nouvel onglet)</span>
    </a>
  );
}

export function SuivezNous({ parametres: p, videos }: { parametres: Parametres; videos: VideoYoutube[] }) {
  const urlPluginFacebook = p.facebookUrl
    ? `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(p.facebookUrl)}&tabs=timeline&width=500&height=520&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&locale=fr_FR`
    : null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Facebook : plugin de page officiel */}
      <div className="carte p-5">
        <EnteteReseau Icone={IconeFacebook} nom="Facebook" />
        {urlPluginFacebook ? (
          <ClickToLoad
            fournisseur="facebook"
            src={urlPluginFacebook}
            titre="Derniers posts de notre page Facebook"
            libelle="Afficher les posts Facebook"
            className="h-[520px] rounded-lg"
          />
        ) : (
          <p className="rounded-lg bg-ciel-clair p-4">Les derniers posts Facebook s&apos;afficheront ici.</p>
        )}
        <LienCompte url={p.facebookUrl} texte="Voir notre page Facebook" />
      </div>

      {/* YouTube : dernières vidéos de la chaîne */}
      <div className="carte p-5">
        <EnteteReseau Icone={IconeYoutube} nom="YouTube" />
        {videos.length ? (
          <ul className="space-y-4">
            {videos.map((v) => (
              <li key={v.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3"
                >
                  <span className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-lg bg-ciel-clair">
                    <CmsImage image={{ url: v.miniature, alt: "" }} fill sizes="144px" className="object-cover" />
                  </span>
                  <span>
                    <span className="line-clamp-3 font-semibold text-marine group-hover:underline">{v.titre}</span>
                    {v.date && <span className="mt-1 block text-sm text-texte-doux">{formaterDate(v.date)}</span>}
                    <span className="sr-only"> (YouTube, nouvel onglet)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg bg-ciel-clair p-4">
            Les dernières vidéos de la chaîne s&apos;afficheront ici
            {!p.youtubeChannelId && <> une fois l&apos;identifiant renseigné ({A_REMPLIR.youtube})</>}.
          </p>
        )}
        <LienCompte url={p.youtubeUrl} texte="Voir la chaîne YouTube" />
      </div>

      {/* Instagram : emplacement pour un widget, lien vers le compte en attendant */}
      <div className="carte p-5">
        <EnteteReseau Icone={IconeInstagram} nom="Instagram" />
        {p.instagramWidgetUrl ? (
          <ClickToLoad
            fournisseur="instagram"
            src={p.instagramWidgetUrl}
            titre="Derniers posts Instagram"
            libelle="Afficher les posts Instagram"
            className="h-[520px] rounded-lg"
          />
        ) : (
          <p className="rounded-lg bg-ciel-clair p-4">
            Retrouvez nos photos et nos stories sur notre compte Instagram.
          </p>
        )}
        <LienCompte url={p.instagramUrl} texte="Voir notre compte Instagram" />
      </div>
    </div>
  );
}
