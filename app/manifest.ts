import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.defaultTitle,
    short_name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
