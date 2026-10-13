import type { MetadataRoute } from "next";
import { speakers } from "@/content/2018";
import { editions, editionPath } from "@/content/archive";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: siteConfig.archiveUpdatedAt,
      changeFrequency: "yearly",
      priority: 1,
      images: [`${siteConfig.url}/images/hero-revolution.jpg`],
    },
    ...["edicoes", "videos", "equipa", "contactos", "participar", "proximas-edicoes"].map((path) => ({
      url: `${siteConfig.url}/${path}/`,
      lastModified: siteConfig.archiveUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...editions.map((edition) => ({
      url: `${siteConfig.url}${editionPath(edition.year)}`,
      lastModified: siteConfig.archiveUpdatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: [`${siteConfig.url}${edition.image}`],
    })),
    ...speakers.map((speaker) => ({
      url: `${siteConfig.url}/speakers/${speaker.slug}/`,
      lastModified: siteConfig.archiveUpdatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: [`${siteConfig.url}${speaker.image}`],
    })),
  ];
}
