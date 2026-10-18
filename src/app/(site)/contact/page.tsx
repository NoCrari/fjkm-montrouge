import type { Metadata } from "next";
import { CarteOSM } from "@/components/CarteOSM";
import { EntetePage } from "@/components/EnteteSection";
import { ListeHoraires } from "@/components/Horaires";
import { Contact, lienItineraire } from "@/components/InfosPratiques";
import { getParametres } from "@/lib/data";
import { A_REMPLIR } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Contact / Nous trouver",
  description: "Adresse, plan d'accès, horaires des cultes et contact de l'église FJKM Montrouge-Paris Fiorenana.",
};

export default async function PageContact() {
  const p = await getParametres();
  const itineraire = lienItineraire(p);

  return (
    <>
      <EntetePage titre="Contact / Nous trouver" intro="Vous êtes les bienvenus ! Voici comment nous rejoindre." />
      <div className="conteneur grid gap-10 py-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-8">
          <section aria-labelledby="titre-adresse">
            <h2 id="titre-adresse" className="mb-2 text-3xl">Adresse</h2>
            <p className="whitespace-pre-line text-lg">{p.adresse ?? A_REMPLIR.adresse}</p>
            {itineraire && (
              <a href={itineraire} target="_blank" rel="noopener noreferrer" className="btn btn-contour mt-4">
                Calculer l&apos;itinéraire<span className="sr-only"> (OpenStreetMap, nouvel onglet)</span>
              </a>
            )}
          </section>
          <section aria-labelledby="titre-horaires">
            <h2 id="titre-horaires" className="mb-2 text-3xl">Horaires des cultes</h2>
            <div className="text-lg">
              <ListeHoraires creneaux={p.horairesCultes} />
            </div>
          </section>
          <section aria-labelledby="titre-contact">
            <h2 id="titre-contact" className="mb-2 text-3xl">Nous contacter</h2>
            <div className="text-lg">
              <Contact parametres={p} />
            </div>
          </section>
        </div>
        <section aria-label="Carte">
          <CarteOSM latitude={p.latitude} longitude={p.longitude} />
        </section>
      </div>
    </>
  );
}
