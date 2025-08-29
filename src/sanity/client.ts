import { createClient } from "next-sanity";

// SanityのプロジェクトIDとかは、あんた自身のものに書き換えてな！
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; 
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-08-28';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 開発中はfalseがおすすめ
});