import type { MetadataRoute } from "next";
import { absoluteUrl, seoPages, type PageSeo } from "@/lib/seo";

const routePriority: Record<string, number> = {
  "/": 1,
  "/development": 0.95,
  "/technology": 0.9,
  "/private": 0.9,
  "/partnerships": 0.8,
  "/partnerships/landowners": 0.85,
  "/contact": 0.8,
  "/insights": 0.7,
  "/about": 0.65,
  "/privacy": 0.4,
  "/terms": 0.4,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return (Object.values(seoPages) as PageSeo[])
    .filter((page) => page.index !== false)
    .map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: routePriority[page.path] ?? 0.6,
    }));
}
