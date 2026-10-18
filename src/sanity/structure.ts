import type { StructureResolver } from "sanity/structure";

/** Menu de l'administration, simplifié pour les bénévoles. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu du site")
    .items([
      S.documentTypeListItem("themeMois").title("Thème du mois"),
      S.documentTypeListItem("news").title("Actualités"),
      S.documentTypeListItem("evenement").title("Photos & vidéos (événements)"),
      S.divider(),
      S.listItem()
        .title("Paramètres du site")
        .id("parametres")
        .child(S.document().schemaType("parametres").documentId("parametres").title("Paramètres du site")),
    ]);
