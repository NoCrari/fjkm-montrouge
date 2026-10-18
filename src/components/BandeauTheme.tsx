import Link from "next/link";
import { formaterMois } from "@/lib/dates";
import type { Theme } from "@/lib/types";
import { CmsImage } from "./CmsImage";
import { PointLive } from "./Icones";

export function BandeauTheme({ theme }: { theme: Theme | null }) {
  return (
    <section aria-labelledby="titre-theme" className="bg-ciel-clair">
      <div className="conteneur grid items-center gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          {theme ? (
            <>
              <p className="etiquette">Thème du mois · {formaterMois(theme.mois)}</p>
              <h2 id="titre-theme" className="mt-3 text-[clamp(2.5rem,7vw,4.25rem)]">
                {theme.phrase}
              </h2>
              <figure className="mt-6 border-l-4 border-ciel pl-5">
                <blockquote className="font-serif text-2xl text-marine italic">« {theme.verset} »</blockquote>
                <figcaption className="mt-2 font-semibold text-texte">
                  {theme.reference}
                  {theme.traduction && <span className="font-normal text-texte-doux"> ({theme.traduction})</span>}
                </figcaption>
              </figure>
              {theme.presentation && <p className="mt-6 max-w-prose text-lg">{theme.presentation}</p>}
            </>
          ) : (
            <h2 id="titre-theme" className="text-[clamp(2.5rem,7vw,4.25rem)]">
              Bienvenue
            </h2>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/live" className="btn btn-rouge">
              <PointLive />
              Regarder le live
            </Link>
            <Link href="/news" className="btn btn-contour">
              Dernières nouvelles
            </Link>
          </div>
        </div>
        {theme?.photo && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-carte border border-bordure">
            <CmsImage
              image={theme.photo}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
