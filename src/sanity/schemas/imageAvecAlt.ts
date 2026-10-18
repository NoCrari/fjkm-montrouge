import { defineField } from "sanity";

/** Champ image avec texte alternatif obligatoire (accessibilité). */
export function imageAvecAlt(name: string, title: string, options: { requis?: boolean } = {}) {
  return defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Description de l'image",
        description:
          "Décrivez en une phrase ce que montre la photo (lu par les personnes malvoyantes). Ex. : « La chorale chante pendant le culte de Noël ».",
        type: "string",
        validation: (r) => r.required().error("La description de l'image est obligatoire."),
      }),
    ],
    validation: options.requis ? (r) => r.required() : undefined,
  });
}
