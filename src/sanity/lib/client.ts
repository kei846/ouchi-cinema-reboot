// src/sanity/lib/client.ts
import { createClient } from 'next-sanity'

const apiVersion = '2024-05-01'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export const sanityPublicClient = createClient({                                            
  projectId,                                  
  dataset,                                    
  apiVersion,                                 
  useCdn: true,
  perspective: 'published',
})