import { A_REMPLIR } from "@/lib/placeholders";
import type { Parametres } from "@/lib/types";
import { ListeHoraires } from "./Horaires";
import { IconeEmail, IconeHorloge, IconeLieu, IconeTelephone } from "./Icones";

export function lienItineraire(p: Parametres) {
  if (p.latitude != null && p.longitude != null) {
    return `https://www.openstreetmap.org/directions?to=${p.latitude}%2C${p.longitude}`;
  }
  if (p.adresse) return `https://www.openstreetmap.org/search?query=${encodeURIComponent(p.adresse)}`;
  return null;
}

function Bloc({ titre, Icone, children }: { titre: string; Icone: typeof IconeLieu; children: React.ReactNode }) {
  return (
    <div className="carte p-6">
      <h3 className="mb-3 flex items-center gap-2 text-2xl">
        <Icone className="text-texte" />
        {titre}
      </h3>
      {children}
    </div>
  );
}

export function Contact({ parametres: p }: { parametres: Parametres }) {
  return (
    <ul className="space-y-2">
      <li className="flex items-center gap-2">
        <IconeEmail className="shrink-0 text-texte-doux" />
        <span className="sr-only">Email : </span>
        {p.email ? (
          <a href={`mailto:${p.email}`} className="font-semibold text-marine underline underline-offset-4 break-all">
            {p.email}
          </a>
        ) : (
          <span className="font-semibold">{A_REMPLIR.email}</span>
        )}
      </li>
      <li className="flex items-center gap-2">
        <IconeTelephone className="shrink-0 text-texte-doux" />
        <span className="sr-only">Téléphone : </span>
        {p.telephone ? (
          <a href={`tel:${p.telephone.replace(/[^\d+]/g, "")}`} className="font-semibold text-marine underline underline-offset-4">
            {p.telephone}
          </a>
        ) : (
          <span className="font-semibold">{A_REMPLIR.telephone}</span>
        )}
      </li>
    </ul>
  );
}

export function InfosPratiques({ parametres: p }: { parametres: Parametres }) {
  const itineraire = lienItineraire(p);
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Bloc titre="Adresse" Icone={IconeLieu}>
        <p className="whitespace-pre-line">{p.adresse ?? A_REMPLIR.adresse}</p>
        {itineraire && (
          <a href={itineraire} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-marine underline underline-offset-4">
            Calculer l&apos;itinéraire<span className="sr-only"> (OpenStreetMap, nouvel onglet)</span>
          </a>
        )}
      </Bloc>
      <Bloc titre="Horaires des cultes" Icone={IconeHorloge}>
        <ListeHoraires creneaux={p.horairesCultes} />
      </Bloc>
      <Bloc titre="Contact" Icone={IconeEmail}>
        <Contact parametres={p} />
      </Bloc>
    </div>
  );
}
