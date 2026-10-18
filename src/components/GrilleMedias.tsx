import Link from "next/link";
import type { MediaRecent } from "@/lib/types";
import { CmsImage } from "./CmsImage";
import { IconeLecture } from "./Icones";

export function IconeVideo() {
  return (
    <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <span className="flex size-14 items-center justify-center rounded-full bg-marine/80 text-white ring-2 ring-white">
        <IconeLecture width={26} height={26} className="ml-1" />
      </span>
    </span>
  );
}

export function GrilleMedias({ medias }: { medias: MediaRecent[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {medias.map((m, i) => (
        <li key={i}>
          <Link
            href={`/medias/${m.evenementSlug}`}
            className="group relative block aspect-square overflow-hidden rounded-carte bg-ciel"
          >
            <CmsImage
              image={m.image}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {m.type === "video" && <IconeVideo />}
            <span className="sr-only">
              {m.type === "video" ? "Vidéo" : "Photo"} de l&apos;événement « {m.evenementTitre} »
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
