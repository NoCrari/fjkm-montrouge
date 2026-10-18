import type { Metadata } from "next";
import { CarteNews } from "@/components/CarteNews";
import { EntetePage } from "@/components/EnteteSection";
import { getNewsListe } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
  description: "Toutes les actualités de l'église FJKM Montrouge-Paris Fiorenana.",
};

export default async function PageNews() {
  const news = await getNewsListe();
  return (
    <>
      <EntetePage titre="News" intro="Toutes les actualités de l'église, de la plus récente à la plus ancienne." />
      <div className="conteneur py-12">
        {news.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <CarteNews key={n.slug} news={n} titreNiveau={2} />
            ))}
          </div>
        ) : (
          <p>Aucune actualité pour le moment.</p>
        )}
      </div>
    </>
  );
}
