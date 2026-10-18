import type { MetadataRoute } from "next";
import { getEvenements, getNewsListe } from "@/lib/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, evenements] = await Promise.all([getNewsListe(), getEvenements()]);
  return [
    ...["", "/news", "/medias", "/live", "/contact"].map((p) => ({ url: `${SITE}${p}` })),
    ...news.map((n) => ({ url: `${SITE}/news/${n.slug}`, lastModified: n.date })),
    ...evenements.map((e) => ({ url: `${SITE}/medias/${e.slug}`, lastModified: e.date })),
  ];
}
