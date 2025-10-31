// lib/sanity.server.ts
import "server-only";
import { createClient } from "next-sanity";

export const sanityServerClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
