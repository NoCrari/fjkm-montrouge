"use client";

import { useState, useSyncExternalStore } from "react";
import { CmsImage } from "./CmsImage";
import { IconeLecture } from "./Icones";
import type { Img } from "@/lib/types";

/*
 * Les contenus YouTube / Facebook / Instagram déposent des cookies.
 * Conformément aux recommandations de la CNIL, ils ne sont chargés qu'après un clic du visiteur.
 * Le visiteur peut choisir de toujours les autoriser (mémorisé dans son navigateur).
 */

export type Fournisseur = "youtube" | "facebook" | "instagram";

const NOMS: Record<Fournisseur, string> = { youtube: "YouTube", facebook: "Facebook", instagram: "Instagram" };
const EVENEMENT = "consentement-change";
const cle = (f: Fournisseur) => `consentement-${f}`;

function abonner(rappel: () => void) {
  window.addEventListener("storage", rappel);
  window.addEventListener(EVENEMENT, rappel);
  return () => {
    window.removeEventListener("storage", rappel);
    window.removeEventListener(EVENEMENT, rappel);
  };
}

function lireConsentement(f: Fournisseur) {
  try {
    return localStorage.getItem(cle(f)) === "oui";
  } catch {
    return false;
  }
}

export function enregistrerConsentement(f: Fournisseur, valeur: boolean) {
  try {
    if (valeur) localStorage.setItem(cle(f), "oui");
    else localStorage.removeItem(cle(f));
  } catch {
    /* stockage indisponible : le consentement vaut pour cette page seulement */
  }
  window.dispatchEvent(new Event(EVENEMENT));
}

type Props = {
  fournisseur: Fournisseur;
  src: string;
  titre: string;
  libelle: string;
  miniature?: Img;
  className?: string;
};

export function ClickToLoad({ fournisseur, src, titre, libelle, miniature, className = "" }: Props) {
  const toujours = useSyncExternalStore(abonner, () => lireConsentement(fournisseur), () => false);
  const [clique, setClique] = useState(false);
  const [memoriser, setMemoriser] = useState(false);
  const nom = NOMS[fournisseur];

  if (toujours || clique) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <iframe
          src={src}
          title={titre}
          className="absolute inset-0 size-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-marine ring-1 ring-white/20 ring-inset ${className}`}>
      {miniature && (
        <CmsImage image={{ ...miniature, alt: "" }} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-40" />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-white">
        <button
          type="button"
          onClick={() => {
            if (memoriser) enregistrerConsentement(fournisseur, true);
            setClique(true);
          }}
          className="btn bg-white text-marine hover:bg-ciel-clair"
        >
          <IconeLecture />
          {libelle}
        </button>
        <p className="max-w-sm text-sm text-white/90">
          Ce contenu est hébergé par {nom}, qui peut déposer des cookies lorsqu&apos;il s&apos;affiche.
        </p>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/90">
          <input
            type="checkbox"
            checked={memoriser}
            onChange={(e) => setMemoriser(e.target.checked)}
            className="size-4 accent-white"
          />
          Toujours afficher les contenus {nom}
        </label>
      </div>
    </div>
  );
}
