import Link from "next/link";
import { formaterDate } from "@/lib/dates";
import type { NewsResume } from "@/lib/types";
import { CmsImage } from "./CmsImage";

export function CarteNews({ news, titreNiveau = 3 }: { news: NewsResume; titreNiveau?: 2 | 3 }) {
  const Titre = titreNiveau === 2 ? "h2" : "h3";
  return (
    <article className="carte group relative flex flex-col transition-shadow hover:shadow-md focus-within:shadow-md">
      <div className="relative aspect-[3/2] bg-ciel-clair">
        {news.image && (
          <CmsImage
            image={news.image}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-semibold text-texte-doux">
          <span className="text-texte uppercase tracking-wide">{news.categorie}</span>
          {" · "}
          <time dateTime={news.date}>{formaterDate(news.date)}</time>
        </p>
        <Titre className="mt-2 text-2xl">
          <Link
            href={`/news/${news.slug}`}
            className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4"
          >
            {news.titre}
          </Link>
        </Titre>
        <p className="mt-2 text-texte-doux">{news.resume}</p>
      </div>
    </article>
  );
}
