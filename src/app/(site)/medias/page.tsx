import type { Metadata } from "next";
import Link from "next/link";
import { CmsImage } from "@/components/CmsImage";
import { EntetePage } from "@/components/EnteteSection";
import { IconeVideo } from "@/components/GrilleMedias";
import { getEvenements } from "@/lib/data";
import { formaterDate } from "@/lib/dates";
import { extraireIdYoutube } from "@/lib/youtube-id";
import type { Evenement, Img } from "@/lib/types";

export const metadata: Metadata = {
  title: "Médias",
  description: "Photos et vidéos des événements de l'église FJKM Montrouge-Paris Fiorenana.",
};

function couverture(ev: Evenement): { image: Img; video: boolean } | null {
  if (ev.photos[0]) return { image: ev.photos[0], video: false };
  const id = ev.videos.map(extraireIdYoutube).find(Boolean);
  return id ? { image: { url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, alt: "" }, video: true } : null;
}

export default async function PageMedias() {
  const evenements = await getEvenements();
  return (
    <>
      <EntetePage titre="Médias" intro="Photos et vidéos de nos événements, classées du plus récent au plus ancien." />
      <div className="conteneur py-12">
        {evenements.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {evenements.map((ev) => {
              const c = couverture(ev);
              return (
                <li key={ev.slug} className="carte group relative transition-shadow hover:shadow-md focus-within:shadow-md">
                  <div className="relative aspect-[3/2] bg-ciel-clair">
                    {c && (
                      <CmsImage
                        image={{ ...c.image, alt: "" }}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )}
                    {c?.video && <IconeVideo />}
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-texte-doux">
                      <time dateTime={ev.date}>{formaterDate(ev.date)}</time>
                    </p>
                    <h2 className="mt-1 text-2xl">
                      <Link href={`/medias/${ev.slug}`} className="after:absolute after:inset-0 group-hover:underline">
                        {ev.titre}
                      </Link>
                    </h2>
                    <p className="mt-1 text-texte-doux">
                      {ev.photos.length} photo{ev.photos.length > 1 ? "s" : ""}
                      {ev.videos.length > 0 && ` · ${ev.videos.length} vidéo${ev.videos.length > 1 ? "s" : ""}`}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Aucun événement pour le moment.</p>
        )}
      </div>
    </>
  );
}
