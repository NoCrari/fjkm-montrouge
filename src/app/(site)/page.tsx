import { BandeauTheme } from "@/components/BandeauTheme";
import { CarteNews } from "@/components/CarteNews";
import { EnteteSection } from "@/components/EnteteSection";
import { GrilleMedias } from "@/components/GrilleMedias";
import { InfosPratiques } from "@/components/InfosPratiques";
import { SectionLive } from "@/components/SectionLive";
import { SuivezNous } from "@/components/SuivezNous";
import { getMediasRecents, getNewsListe, getParametres, getThemeDuMois } from "@/lib/data";
import { getDernieresVideos } from "@/lib/youtube";

export default async function Accueil() {
  const [theme, parametres, news, medias] = await Promise.all([
    getThemeDuMois(),
    getParametres(),
    getNewsListe(3),
    getMediasRecents(6),
  ]);
  const videos = await getDernieresVideos(parametres.youtubeChannelId, 3);

  return (
    <>
      <h1 className="sr-only">FJKM Montrouge-Paris Fiorenana</h1>

      <BandeauTheme theme={theme} />

      <SectionLive parametres={parametres} />

      <section aria-labelledby="titre-news" className="py-14 md:py-20">
        <div className="conteneur">
          <EnteteSection id="titre-news" titre="Dernières actualités" lien={{ href: "/news", label: "Toutes les news" }} />
          {news.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <CarteNews key={n.slug} news={n} />
              ))}
            </div>
          ) : (
            <p>Aucune actualité pour le moment.</p>
          )}
        </div>
      </section>

      <section aria-labelledby="titre-medias" className="bg-ciel-clair py-14 md:py-20">
        <div className="conteneur">
          <EnteteSection
            id="titre-medias"
            titre="Photos & vidéos"
            intro="Les derniers moments partagés en communauté."
            lien={{ href: "/medias", label: "Toute la galerie" }}
          />
          {medias.length ? <GrilleMedias medias={medias} /> : <p>Aucune photo pour le moment.</p>}
        </div>
      </section>

      <section aria-labelledby="titre-reseaux" className="py-14 md:py-20">
        <div className="conteneur">
          <EnteteSection id="titre-reseaux" titre="Suivez-nous" intro="Nos dernières publications sur les réseaux sociaux." />
          <SuivezNous parametres={parametres} videos={videos} />
        </div>
      </section>

      <section aria-labelledby="titre-infos" className="bg-ciel py-14 md:py-20">
        <div className="conteneur">
          <EnteteSection
            id="titre-infos"
            titre="Infos pratiques"
            lien={{ href: "/contact", label: "Plan d'accès" }}
          />
          <InfosPratiques parametres={parametres} />
        </div>
      </section>
    </>
  );
}
