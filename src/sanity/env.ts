export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-10-01";

/** Faux tant que le projet Sanity n'est pas renseigné : le site affiche alors le contenu d'exemple. */
export const sanityConfigure = /^[a-z0-9-]+$/.test(projectId);
