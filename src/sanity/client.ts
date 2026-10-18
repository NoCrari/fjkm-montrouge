import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigure } from "./env";

export const client = sanityConfigure
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
