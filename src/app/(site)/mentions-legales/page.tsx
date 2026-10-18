import type { Metadata } from "next";
import { EntetePage } from "@/components/EnteteSection";
import { ReinitialiserConsentements } from "@/components/ReinitialiserConsentements";
import { getParametres } from "@/lib/data";
import { A_REMPLIR } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default async function PageMentionsLegales() {
  const p = await getParametres();

  return (
    <>
      <EntetePage titre="Mentions légales" />
      <div className="conteneur texte-riche max-w-3xl py-12">
        <h2>Éditeur du site</h2>
        <p>
          {p.nomAssociation ?? A_REMPLIR.nomAssociation}
          <br />
          <span className="whitespace-pre-line">{p.adresseSiege ?? p.adresse ?? A_REMPLIR.adresseSiege}</span>
          <br />
          Email : {p.email ?? A_REMPLIR.email}
          <br />
          Téléphone : {p.telephone ?? A_REMPLIR.telephone}
        </p>
        <p>Responsable de la publication : {p.responsablePublication ?? A_REMPLIR.responsable}</p>

        <h2>Hébergement</h2>
        <p>
          Site hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.
          <br />
          Contenus gérés avec Sanity (Sanity AS), sanity.io.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, photos et vidéos publiés sur ce site appartiennent à leurs auteurs. Toute reproduction sans
          autorisation est interdite. Les citations bibliques sont issues de la traduction indiquée à côté de chaque
          verset.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Ce site ne comporte pas de formulaire et ne collecte aucune donnée personnelle. Aucun outil de mesure
          d&apos;audience n&apos;est utilisé.
        </p>

        <h2>Cookies et contenus externes</h2>
        <p>
          Les vidéos YouTube, les publications Facebook et Instagram sont fournies par ces services, qui peuvent
          déposer des cookies. Elles ne sont donc chargées qu&apos;après votre clic. Si vous avez choisi de toujours
          les afficher, ce choix est enregistré dans votre navigateur ; vous pouvez l&apos;annuler ici :
        </p>
        <ReinitialiserConsentements />
        <p>La carte est fournie par OpenStreetMap, qui ne dépose pas de cookie publicitaire.</p>
      </div>
    </>
  );
}
