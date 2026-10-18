/**
 * Importe le contenu de départ dans Sanity (thème d'octobre 2026, 3 news et 2 événements d'exemple).
 * Lancement : npm run seed   (après « npx sanity login »)
 * Peut être relancé sans risque : les documents d'exemple sont remplacés, pas dupliqués.
 */
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";
import { evenementsExemples, newsExemples, paragraphesEnBlocs, themeExemple } from "../src/lib/exemples";

const client = getCliClient({ apiVersion: "2025-10-01" });
const assets = new Map<string, string>();

async function image(fichier: string, alt: string) {
  if (!assets.has(fichier)) {
    const asset = await client.assets.upload("image", createReadStream(join(process.cwd(), "public/exemples", fichier)), {
      filename: fichier,
    });
    assets.set(fichier, asset._id);
  }
  return { _type: "image", asset: { _type: "reference", _ref: assets.get(fichier)! }, alt };
}

async function main() {
  console.log("Import du contenu de départ…");

  await client.createOrReplace({
    _id: "theme-2026-10",
    _type: "themeMois",
    mois: themeExemple.mois,
    phrase: themeExemple.phrase,
    verset: themeExemple.verset,
    reference: themeExemple.reference,
    traduction: themeExemple.traduction,
    presentation: themeExemple.presentation,
    photo: await image(themeExemple.photo.fichier, themeExemple.photo.alt),
  });
  console.log("✓ Thème d'octobre 2026");

  for (const n of newsExemples) {
    await client.createOrReplace({
      _id: n.slug,
      _type: "news",
      titre: n.titre,
      slug: { _type: "slug", current: n.slug },
      date: n.date,
      categorie: n.categorie,
      resume: n.resume,
      image: await image(n.image.fichier, n.image.alt),
      contenu: paragraphesEnBlocs(n.paragraphes, n.slug),
    });
    console.log(`✓ ${n.titre}`);
  }

  for (const e of evenementsExemples) {
    const photos = [];
    for (const [i, p] of e.photos.entries()) {
      photos.push({ ...(await image(p.fichier, p.alt)), _key: `${e.slug}-${i}` });
    }
    await client.createOrReplace({
      _id: e.slug,
      _type: "evenement",
      titre: e.titre,
      slug: { _type: "slug", current: e.slug },
      date: e.date,
      description: e.description,
      photos,
      videos: [],
    });
    console.log(`✓ ${e.titre}`);
  }

  console.log("Terminé. Ouvrez /admin pour voir le contenu.");
}

main().catch((erreur) => {
  console.error(erreur);
  process.exit(1);
});
