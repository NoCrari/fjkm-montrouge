import { defineField, defineType } from "sanity";
import { imageAvecAlt } from "./imageAvecAlt";

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export const themeMois = defineType({
  name: "themeMois",
  title: "Thème du mois",
  type: "document",
  icon: () => "✝",
  fields: [
    defineField({
      name: "mois",
      title: "Mois",
      description:
        "Choisissez n'importe quel jour du mois concerné. Le thème s'affiche automatiquement pendant ce mois. Vous pouvez préparer les mois suivants à l'avance.",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "phrase",
      title: "Phrase du thème",
      description: "Ex. : Prier sans relâche",
      type: "string",
      validation: (r) => r.required().max(90),
    }),
    defineField({
      name: "verset",
      title: "Texte du verset",
      description: "Sans les guillemets. Ex. : Priez sans cesse.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reference",
      title: "Référence biblique",
      description: "Ex. : 1 Thessaloniciens 5.17",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "traduction",
      title: "Traduction de la Bible",
      type: "string",
      initialValue: "Louis Segond",
    }),
    defineField({
      name: "presentation",
      title: "Court texte de présentation",
      description: "2 ou 3 phrases maximum.",
      type: "text",
      rows: 4,
      validation: (r) => r.max(400),
    }),
    imageAvecAlt("photo", "Photo"),
  ],
  orderings: [
    { title: "Mois (récent d'abord)", name: "moisDesc", by: [{ field: "mois", direction: "desc" }] },
  ],
  preview: {
    select: { mois: "mois", phrase: "phrase", media: "photo" },
    prepare({ mois, phrase, media }) {
      let titre = "Mois non renseigné";
      if (mois) {
        const [annee, m] = String(mois).split("-");
        titre = `${MOIS[Number(m) - 1]} ${annee}`;
        titre = titre.charAt(0).toUpperCase() + titre.slice(1);
      }
      return { title: titre, subtitle: phrase, media };
    },
  },
});
