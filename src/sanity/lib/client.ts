// src/sanity/lib/client.ts
import { createClient } from 'next-sanity'

const apiVersion = '2024-05-01' // Sanity v4と互換性のある日付

export const sanityPublicClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})