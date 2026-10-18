import { NextStudio } from "next-sanity/studio";
import { sanityConfigure } from "@/sanity/env";
import config from "../../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function AdminPage() {
  if (!sanityConfigure) {
    return (
      <main className="conteneur max-w-2xl py-16">
        <h1 className="text-4xl">Administration non configurée</h1>
        <p className="mt-4 text-lg">
          Le site n&apos;est pas encore relié à Sanity. Renseignez <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> dans le
          fichier <code>.env.local</code> (en local) ou dans les variables d&apos;environnement Vercel (en ligne), puis
          relancez le site. Voir le README, étape « Créer le projet Sanity ».
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
