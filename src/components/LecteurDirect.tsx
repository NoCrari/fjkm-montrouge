import { A_REMPLIR } from "@/lib/placeholders";
import { ClickToLoad } from "./ClickToLoad";

export function idChaineValide(id?: string): id is string {
  return !!id && /^UC[\w-]{22}$/.test(id);
}

/** Lecteur 16:9 du direct de la chaîne YouTube. */
export function LecteurDirect({ channelId }: { channelId?: string }) {
  if (!idChaineValide(channelId)) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-carte bg-marine p-6 text-center text-white ring-1 ring-white/20">
        <p>
          Le lecteur du direct s&apos;affichera ici une fois l&apos;identifiant de la chaîne renseigné
          <br />
          <strong>{A_REMPLIR.youtube}</strong>
        </p>
      </div>
    );
  }
  return (
    <ClickToLoad
      fournisseur="youtube"
      src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1`}
      titre="Culte en direct sur YouTube"
      libelle="Lancer le direct"
      className="aspect-video w-full rounded-carte"
    />
  );
}
