import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'ochiga-studio',
  title: 'Ochiga CMS',

  projectId: 'ap1ku6sf',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
