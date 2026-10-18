"use client";

import { useEffect, useRef, useState } from "react";
import type { Img } from "@/lib/types";
import { CmsImage } from "./CmsImage";
import { IconeDroite, IconeFermer, IconeGauche } from "./Icones";

/** Grille de photos avec visionneuse plein écran (clavier : ← → Échap). */
export function Galerie({ photos }: { photos: Img[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogue = useRef<HTMLDialogElement>(null);
  const total = photos.length;

  useEffect(() => {
    const d = dialogue.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const precedente = () => setIndex((i) => (i === null ? i : (i - 1 + total) % total));
  const suivante = () => setIndex((i) => (i === null ? i : (i + 1) % total));

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-carte bg-ciel-clair"
            >
              <CmsImage
                image={photo}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="sr-only">Agrandir la photo {i + 1} sur {total}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogue}
        aria-label="Visionneuse de photos"
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") precedente();
          if (e.key === "ArrowRight") suivante();
        }}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-marine p-0 text-white backdrop:bg-marine"
      >
        {index !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-3">
              <p aria-live="polite" className="px-2 text-white/90">
                Photo {index + 1} sur {total}
              </p>
              <button
                type="button"
                onClick={() => setIndex(null)}
                className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10"
                autoFocus
              >
                <IconeFermer width={26} height={26} />
                <span className="sr-only">Fermer la visionneuse</span>
              </button>
            </div>
            <figure className="relative flex-1">
              <CmsImage image={photos[index]} fill sizes="100vw" className="object-contain" />
            </figure>
            <p className="px-4 py-2 text-center text-white/90">{photos[index].alt}</p>
            {total > 1 && (
              <div className="flex justify-center gap-4 pb-5">
                <button
                  type="button"
                  onClick={precedente}
                  className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <IconeGauche width={26} height={26} />
                  <span className="sr-only">Photo précédente</span>
                </button>
                <button
                  type="button"
                  onClick={suivante}
                  className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <IconeDroite width={26} height={26} />
                  <span className="sr-only">Photo suivante</span>
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
