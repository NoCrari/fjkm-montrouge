import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Galerie } from "@/components/Galerie";
import { VideoYoutube } from "@/components/VideoYoutube";
import { getEvenement, getEvenements } from "@/lib/data";
import { formaterDate } from "@/lib/dates";

export async function generateStaticParams() {
  const evenements = await getEvenements();
  // Next.js exige au moins une valeur ; la valeur « aucun » mène à la page 404.
  return evenements.length ? evenements.map((e) => ({ slug: e.slug })) : [{ slug: "aucun" }];
}

export async function generateMetadata({ params }: PageProps<"/medias/[slug]">): Promise<Metadata> {
  const ev = await getEvenement((await params).slug);
  if (!ev) return { title: "Événement introuvable" };
  return {
    title: ev.titre,
    description: ev.description ?? `Photos et vidéos : ${ev.titre}`,
    openGraph: { images: ev.photos[0] ? [ev.photos[0].url] : undefined },
  };
}

async function ContenuEvenement({ params }: Pick<PageProps<"/medias/[slug]">, "params">) {
  const ev = await getEvenement((await params).slug);
  if (!ev) notFound();

  return (
    <>
      <div className="bg-ciel-clair">
        <div className="conteneur py-10 md:py-14">
          <p className="text-sm font-semibold text-texte-doux">
            <time dateTime={ev.date}>{formaterDate(ev.date)}</time>
          </p>
          <h1 className="mt-2 text-[clamp(2rem,5.5vw,3.25rem)]">{ev.titre}</h1>
          {ev.description && <p className="mt-3 max-w-2xl text-lg">{ev.description}</p>}
        </div>
      </div>
      <div className="conteneur space-y-12 py-12">
        {ev.videos.length > 0 && (
          <section aria-labelledby="titre-videos">
            <h2 id="titre-videos" className="titre-section mb-6">
              Vidéos
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {ev.videos.map((lien, i) => (
                <VideoYoutube key={i} lien={lien} titre={`${ev.titre} — vidéo ${i + 1}`} />
              ))}
            </div>
          </section>
        )}
        {ev.photos.length > 0 && (
          <section aria-labelledby="titre-photos">
            <h2 id="titre-photos" className="titre-section mb-6">
              Photos
            </h2>
            <Galerie photos={ev.photos} />
          </section>
        )}
        <p className="border-t border-bordure pt-6">
          <Link href="/medias" className="font-semibold text-marine underline underline-offset-4">
            <span aria-hidden="true">←</span> Tous les événements
          </Link>
        </p>
      </div>
    </>
  );
}

export default function PageEvenement({ params }: PageProps<"/medias/[slug]">) {
  return (
    <Suspense fallback={<div className="conteneur min-h-[60vh] py-14" aria-busy="true" />}>
      <ContenuEvenement params={params} />
    </Suspense>
  );
}
