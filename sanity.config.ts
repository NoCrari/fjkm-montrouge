"use client";

import { frFRLocale } from "@sanity/locale-fr-fr";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

const SINGLETONS = new Set(["parametres"]);

export default defineConfig({
  name: "fjkm-montrouge",
  title: "FJKM Montrouge-Paris · Administration",
  basePath: "/admin",
  projectId: projectId || "a-configurer",
  dataset,
  plugins: [
    structureTool({ structure }),
    frFRLocale(),
    // Outil de requêtes réservé au développement
    ...(process.env.NODE_ENV === "development" ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
  schema: {
    types: schemaTypes,
    // Les paramètres sont un document unique : on ne peut pas en créer un second
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
