/** Dates au format « 12 octobre 2026 ». Les dates Sanity sont au format AAAA-MM-JJ. */
export function formaterDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso.slice(0, 10)}T12:00:00Z`));
}

/** « Octobre 2026 » */
export function formaterMois(iso: string): string {
  const texte = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso.slice(0, 7)}-15T12:00:00Z`),
  );
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}

/** Mois en cours à Paris, au format AAAA-MM. */
export function moisCourantParis(maintenant: Date): string {
  const parts = new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit" })
    .formatToParts(maintenant);
  const annee = parts.find((p) => p.type === "year")?.value;
  const mois = parts.find((p) => p.type === "month")?.value;
  return `${annee}-${mois}`;
}
