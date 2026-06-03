import type { MetadataRoute } from "next";
import { absoluteUrl, seoPages, type PageSeo } from "@/lib/seo";

const routePriority: Record<string, number> = {
  "/": 1,
  "/oyi": 0.95,
  "/deployments": 0.9,
  "/technology": 0.85,
  "/infrastructure": 0.85,
  "/architecture": 0.8,
  "/command-center": 0.8,
  "/contact": 0.8,
  "/papers": 0.7,
  "/privacy": 0.4,
  "/terms": 0.4,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-03");

  return (Object.values(seoPages) as PageSeo[])
    .filter((page) => page.index !== false)
    .map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: routePriority[page.path] ?? 0.65,
    }));
}
