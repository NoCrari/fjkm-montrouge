import type { Metadata } from "next";
import { CmsImage } from "@/components/CmsImage";
import { EntetePage } from "@/components/EnteteSection";
import { ListeHoraires } from "@/components/Horaires";
import { IconeLecture, IconeYoutube } from "@/components/Icones";
import { LecteurDirect } from "@/components/LecteurDirect";
import { BadgeEnDirect } from "@/components/SectionLive";
import { getParametres } from "@/lib/data";
import { formaterDate } from "@/lib/dates";
import { A_REMPLIR } from "@/lib/placeholders";
import { getDernieresVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Live",
  description: "Suivez le culte de l'église FJKM Montrouge-Paris Fiorenana en direct sur YouTube et retrouvez les replays.",
};

export default async function PageLive() {
  const p = await getParametres();
  const replays = await getDernieresVideos(p.youtubeChannelId, 9);

  return (
    <>
      <EntetePage titre="Culte en direct" intro="Suivez le culte en direct depuis chez vous, ou revoyez les derniers cultes en replay." />

      <section aria-label="Lecteur du direct" className="bg-marine py-10 md:py-14">
        <div className="conteneur grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="relative">
            <BadgeEnDirect />
            <LecteurDirect channelId={p.youtubeChannelId} />
          </div>
          <div className="text-white">
            <h2 className="titre-section text-white">Horaires des directs</h2>
            <ListeHoraires creneaux={p.horairesDirects} clair />
            <p className="mt-6 text-white/85">
              En dehors des horaires de direct, le lecteur peut indiquer qu&apos;aucune diffusion n&apos;est en cours :
              retrouvez alors les cultes précédents dans les replays ci-dessous.
            </p>
            {p.youtubeUrl && (
              <a href={p.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-contour-clair mt-6">
                <IconeYoutube />
                Ouvrir la chaîne YouTube<span className="sr-only"> (nouvel onglet)</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <section id="replays" aria-labelledby="titre-replays" className="scroll-mt-24 py-14">
        <div className="conteneur">
          <h2 id="titre-replays" className="titre-section mb-8">
            Derniers replays
          </h2>
          {replays.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {replays.map((v) => (
                <li key={v.id} className="carte group relative transition-shadow hover:shadow-md focus-within:shadow-md">
                  <div className="relative aspect-video bg-ciel-clair">
                    <CmsImage image={{ url: v.miniature, alt: "", width: 480, height: 360 }} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <span className="flex size-14 items-center justify-center rounded-full bg-marine/80 text-white ring-2 ring-white">
                        <IconeLecture width={26} height={26} className="ml-1" />
                      </span>
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="line-clamp-2 font-sans text-lg font-semibold text-marine">
                      <a
                        href={`https://www.youtube.com/watch?v=${v.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0 group-hover:underline"
                      >
                        {v.titre}
                        <span className="sr-only"> (YouTube, nouvel onglet)</span>
                      </a>
                    </h3>
                    {v.date && <p className="mt-1 text-sm text-texte-doux">{formaterDate(v.date)}</p>}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-carte bg-ciel-clair p-6">
              Les dernières vidéos de la chaîne s&apos;afficheront ici
              {!p.youtubeChannelId && <> une fois l&apos;identifiant renseigné ({A_REMPLIR.youtube})</>}.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
