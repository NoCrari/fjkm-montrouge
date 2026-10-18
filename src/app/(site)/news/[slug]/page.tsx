import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CmsImage } from "@/components/CmsImage";
import { TexteRiche } from "@/components/TexteRiche";
import { getNews, getNewsListe } from "@/lib/data";
import { formaterDate } from "@/lib/dates";

export async function generateStaticParams() {
  const news = await getNewsListe();
  // Next.js exige au moins une valeur ; la valeur « aucune » mène à la page 404.
  return news.length ? news.map((n) => ({ slug: n.slug })) : [{ slug: "aucune" }];
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const news = await getNews((await params).slug);
  if (!news) return { title: "Actualité introuvable" };
  return {
    title: news.titre,
    description: news.resume,
    openGraph: { title: news.titre, description: news.resume, images: news.image ? [news.image.url] : undefined },
  };
}

async function Article({ params }: Pick<PageProps<"/news/[slug]">, "params">) {
  const news = await getNews((await params).slug);
  if (!news) notFound();

  return (
    <article>
      <header className="bg-ciel-clair">
        <div className="conteneur max-w-3xl py-10 md:py-14">
          <p className="text-sm font-semibold text-texte-doux">
            <span className="tracking-wide text-texte uppercase">{news.categorie}</span>
            {" · "}
            <time dateTime={news.date}>{formaterDate(news.date)}</time>
          </p>
          <h1 className="mt-3 text-[clamp(2rem,5.5vw,3.25rem)]">{news.titre}</h1>
          <p className="mt-4 text-xl text-texte">{news.resume}</p>
        </div>
      </header>
      <div className="conteneur max-w-3xl py-10">
        {news.image && (
          <CmsImage
            image={news.image}
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="mb-10 h-auto w-full rounded-carte border border-bordure"
          />
        )}
        {news.contenu && <TexteRiche blocs={news.contenu} />}
        <p className="mt-12 border-t border-bordure pt-6">
          <Link href="/news" className="font-semibold text-marine underline underline-offset-4">
            <span aria-hidden="true">←</span> Toutes les actualités
          </Link>
        </p>
      </div>
    </article>
  );
}

export default function PageArticle({ params }: PageProps<"/news/[slug]">) {
  return (
    <Suspense fallback={<div className="conteneur min-h-[60vh] py-14" aria-busy="true" />}>
      <Article params={params} />
    </Suspense>
  );
}
