import { defineArrayMember, defineField, defineType } from "sanity";
import { extraireIdYoutube } from "../../lib/youtube-id";

export const evenement = defineType({
  name: "evenement",
  title: "Événement (photos & vidéos)",
  type: "document",
  icon: () => "📷",
  fields: [
    defineField({
      name: "titre",
      title: "Titre de l'événement",
      type: "string",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Adresse de la page",
      description: "Cliquez sur « Générer ».",
      type: "slug",
      options: { source: "titre", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date de l'événement",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Courte description (facultatif)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "photos",
      title: "Photos",
      description:
        "Glissez-déposez plusieurs photos d'un coup. La première sert de couverture. Pensez à remplir la description de chaque photo.",
      type: "array",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Description de la photo",
              type: "string",
              validation: (r) => r.required().error("La description de la photo est obligatoire."),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "videos",
      title: "Vidéos YouTube",
      description:
        "Collez l'adresse de chaque vidéo YouTube (ex. https://www.youtube.com/watch?v=…). Bouton « Partager » sous la vidéo sur YouTube, puis « Copier ».",
      type: "array",
      of: [
        defineArrayMember({
          type: "url",
          validation: (r) =>
            r.custom((url) =>
              !url || extraireIdYoutube(String(url)) ? true : "Ce lien ne semble pas être une vidéo YouTube.",
            ),
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Date (récente d'abord)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "titre", date: "date", media: "photos.0", photos: "photos", videos: "videos" },
    prepare({ title, date, media, photos, videos }) {
      const d = date ? String(date).split("-").reverse().join("/") : "sans date";
      const nbP = Array.isArray(photos) ? photos.length : 0;
      const nbV = Array.isArray(videos) ? videos.length : 0;
      return { title, subtitle: `${d} · ${nbP} photo(s), ${nbV} vidéo(s)`, media };
    },
  },
});
