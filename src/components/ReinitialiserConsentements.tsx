"use client";

import { useState } from "react";
import { enregistrerConsentement } from "./ClickToLoad";

export function ReinitialiserConsentements() {
  const [fait, setFait] = useState(false);
  return (
    <p>
      <button
        type="button"
        className="btn btn-contour"
        onClick={() => {
          (["youtube", "facebook", "instagram"] as const).forEach((f) => enregistrerConsentement(f, false));
          setFait(true);
        }}
      >
        Réinitialiser mes choix
      </button>
      <span role="status" className="ml-3">
        {fait && "C'est fait : les contenus externes ne s'afficheront plus sans votre clic."}
      </span>
    </p>
  );
}
