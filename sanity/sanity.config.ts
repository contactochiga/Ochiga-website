import { defineConfig } from "sanity";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Ochiga",

  projectId: "ap1ku6sf",   // ✅ must match screenshot
  dataset: "production",   // ✅

  apiVersion: "2024-01-01",
  useCdn: true,

  schema: {
    types: schemaTypes,
  },
});
