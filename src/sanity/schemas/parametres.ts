import { defineArrayMember, defineField, defineType } from "sanity";

const creneau = defineArrayMember({
  type: "object",
  name: "creneau",
  title: "Créneau",
  fields: [
    defineField({ name: "jour", title: "Jour", description: "Ex. : Dimanche", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heure", title: "Heure", description: "Ex. : 10h00", type: "string", validation: (r) => r.required() }),
    defineField({ name: "libelle", title: "Précision (facultatif)", description: "Ex. : Culte en malgache", type: "string" }),
  ],
  preview: {
    select: { jour: "jour", heure: "heure", libelle: "libelle" },
    prepare: ({ jour, heure, libelle }) => ({ title: `${jour} · ${heure}`, subtitle: libelle }),
  },
});

export const parametres = defineType({
  name: "parametres",
  title: "Paramètres du site",
  type: "document",
  icon: () => "⚙",
  groups: [
    { name: "horaires", title: "Horaires", default: true },
    { name: "contact", title: "Adresse & contact" },
    { name: "reseaux", title: "Réseaux sociaux" },
    { name: "legal", title: "Mentions légales" },
  ],
  fields: [
    defineField({ name: "horairesCultes", title: "Horaires des cultes", type: "array", of: [creneau], group: "horaires" }),
    defineField({
      name: "horairesDirects",
      title: "Horaires des directs",
      description: "Laissez vide si les directs ont lieu aux mêmes heures que les cultes.",
      type: "array",
      of: [creneau],
      group: "horaires",
    }),
    defineField({ name: "adresse", title: "Adresse", description: "Sur plusieurs lignes si besoin.", type: "text", rows: 3, group: "contact" }),
    defineField({
      name: "latitude",
      title: "Latitude (carte)",
      description:
        "Sur openstreetmap.org, faites un clic droit sur l'église > « Afficher l'adresse » : les deux nombres affichés sont la latitude puis la longitude. Ex. : 48.8186",
      type: "number",
      group: "contact",
    }),
    defineField({ name: "longitude", title: "Longitude (carte)", description: "Ex. : 2.3194", type: "number", group: "contact" }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.email(), group: "contact" }),
    defineField({ name: "telephone", title: "Téléphone", type: "string", group: "contact" }),
    defineField({ name: "facebookUrl", title: "Lien de la page Facebook", type: "url", group: "reseaux" }),
    defineField({ name: "instagramUrl", title: "Lien du compte Instagram", type: "url", group: "reseaux" }),
    defineField({ name: "youtubeUrl", title: "Lien de la chaîne YouTube", type: "url", group: "reseaux" }),
    defineField({
      name: "youtubeChannelId",
      title: "ID de la chaîne YouTube",
      description:
        "Commence par « UC » (24 caractères). YouTube > votre photo de profil > Paramètres > Paramètres avancés > « ID de la chaîne ».",
      type: "string",
      validation: (r) =>
        r.custom((v) => !v || /^UC[\w-]{22}$/.test(String(v)) ? true : "L'ID doit commencer par UC et faire 24 caractères."),
      group: "reseaux",
    }),
    defineField({
      name: "instagramWidgetUrl",
      title: "Adresse du widget Instagram (facultatif)",
      description:
        "Si vous utilisez un service de widget Instagram qui fournit une adresse d'intégration (iframe), collez-la ici. Sinon, un simple lien vers le compte est affiché.",
      type: "url",
      group: "reseaux",
    }),
    defineField({ name: "nomAssociation", title: "Nom officiel de l'association", type: "string", group: "legal" }),
    defineField({ name: "adresseSiege", title: "Adresse du siège", type: "text", rows: 2, group: "legal" }),
    defineField({ name: "responsablePublication", title: "Responsable de la publication", type: "string", group: "legal" }),
  ],
  preview: { prepare: () => ({ title: "Paramètres du site" }) },
});
