import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemaTypes'
import { defaultDocumentNode } from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'OUCHI-CINEMA',

  projectId: 'csuhnmyi', // ← ここが本番ID
  dataset: 'production',

  plugins: [
    structureTool({ defaultDocumentNode }),
    visionTool(),
  ],

  schema: {
    types: schema.types,
  },
})

