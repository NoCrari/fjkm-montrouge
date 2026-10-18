import { A_REMPLIR } from "@/lib/placeholders";

/** Carte OpenStreetMap (aucun cookie publicitaire, chargement direct). */
export function CarteOSM({ latitude, longitude }: { latitude?: number; longitude?: number }) {
  if (latitude == null || longitude == null) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-carte border border-bordure bg-ciel-clair p-6 text-center">
        <p>
          La carte s&apos;affichera ici une fois les coordonnées renseignées
          <br />
          <strong>{A_REMPLIR.coordonnees}</strong>
        </p>
      </div>
    );
  }
  const d = 0.004;
  const bbox = [longitude - d * 1.6, latitude - d, longitude + d * 1.6, latitude + d].join("%2C");
  return (
    <div className="overflow-hidden rounded-carte border border-bordure">
      <iframe
        title="Carte : emplacement de l'église"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`}
        className="aspect-[4/3] w-full border-0"
        loading="lazy"
      />
      <p className="bg-white px-4 py-2 text-sm">
        <a
          href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-marine underline underline-offset-4"
        >
          Agrandir la carte<span className="sr-only"> (OpenStreetMap, nouvel onglet)</span>
        </a>
      </p>
    </div>
  );
}
