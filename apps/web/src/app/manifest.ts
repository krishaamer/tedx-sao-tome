import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "pt-PT",
    icons: [
      {
        src: "/images/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
