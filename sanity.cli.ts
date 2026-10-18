import { loadEnvConfig } from "@next/env";
import { defineCliConfig } from "sanity/cli";

// Lit .env.local pour que les commandes « sanity » utilisent le même projet que le site.
loadEnvConfig(process.cwd());

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
