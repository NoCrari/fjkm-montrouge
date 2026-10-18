import { A_REMPLIR } from "@/lib/placeholders";
import type { Creneau } from "@/lib/types";

export function ListeHoraires({ creneaux, clair = false }: { creneaux: Creneau[]; clair?: boolean }) {
  if (!creneaux.length) return <p className="font-semibold">{A_REMPLIR.horaires}</p>;
  return (
    <ul className="space-y-1">
      {creneaux.map((c, i) => (
        <li key={i}>
          <span className="font-semibold">{c.jour}</span> · {c.heure}
          {c.libelle && <span className={clair ? "text-white/80" : "text-texte-doux"}> — {c.libelle}</span>}
        </li>
      ))}
    </ul>
  );
}
