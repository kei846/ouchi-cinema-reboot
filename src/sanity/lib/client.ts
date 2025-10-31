// lib/sanity.client.ts
import { createClient } from "next-sanity";

export const sanityPublicClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  useCdn: true,              // 公開データのみ取得
  perspective: "published",  // 公開記事のみ取得
});
