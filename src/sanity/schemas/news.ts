import { defineArrayMember, defineField, defineType } from "sanity";
import { imageAvecAlt } from "./imageAvecAlt";

export const CATEGORIES_NEWS = [
  "Annonce",
  "Vie de l'église",
  "Événement",
  "Culte",
  "Jeunesse",
  "Autre",
];

export const news = defineType({
  name: "news",
  title: "Actualité",
  type: "document",
  icon: () => "📰",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Adresse de la page",
      description: "Cliquez sur « Générer » : l'adresse est créée à partir du titre.",
      type: "slug",
      options: { source: "titre", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date de publication",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: { list: CATEGORIES_NEWS, layout: "radio", direction: "horizontal" },
      initialValue: "Annonce",
      validation: (r) => r.required(),
    }),
    imageAvecAlt("image", "Image principale"),
    defineField({
      name: "resume",
      title: "Résumé",
      description: "1 ou 2 phrases, affichées sur les cartes de la page d'accueil.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "contenu",
      title: "Texte",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraphe", value: "normal" },
            { title: "Intertitre", value: "h2" },
            { title: "Sous-intertitre", value: "h3" },
            { title: "Citation", value: "blockquote" },
          ],
        }),
        defineArrayMember({
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Description de l'image",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "legende", title: "Légende (facultatif)", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Date (récente d'abord)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "titre", date: "date", categorie: "categorie", media: "image" },
    prepare({ title, date, categorie, media }) {
      const d = date ? String(date).split("-").reverse().join("/") : "sans date";
      return { title, subtitle: `${categorie ?? ""} · ${d}`, media };
    },
  },
});
