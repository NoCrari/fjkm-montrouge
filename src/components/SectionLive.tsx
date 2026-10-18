import Link from "next/link";
import type { Parametres } from "@/lib/types";
import { ListeHoraires } from "./Horaires";
import { LecteurDirect } from "./LecteurDirect";

export function BadgeEnDirect() {
  return (
    <span className="pointer-events-none absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded-full bg-rouge px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
      <span aria-hidden="true" className="size-2 rounded-full bg-white" />
      En direct
    </span>
  );
}

export function SectionLive({ parametres }: { parametres: Parametres }) {
  return (
    <section aria-labelledby="titre-live" className="bg-marine text-white">
      <div className="conteneur grid items-center gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div className="relative">
          <BadgeEnDirect />
          <LecteurDirect channelId={parametres.youtubeChannelId} />
        </div>
        <div>
          <h2 id="titre-live" className="titre-section text-white">
            Suivez le culte en direct
          </h2>
          <p className="mt-2 mb-4 text-white/85">Rejoignez-nous en ligne, où que vous soyez :</p>
          <ListeHoraires creneaux={parametres.horairesDirects} clair />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/live" className="btn bg-white text-marine hover:bg-ciel-clair">
              Page Live
            </Link>
            <Link href="/live#replays" className="btn btn-contour-clair">
              Voir les replays
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
