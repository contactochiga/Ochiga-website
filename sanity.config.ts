import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'ochiga-studio',
  title: 'Ochiga CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ap1ku6sf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
