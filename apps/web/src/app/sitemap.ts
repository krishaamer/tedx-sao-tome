import type { MetadataRoute } from "next";
import { speakers } from "@/content/2018";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: siteConfig.archiveUpdatedAt,
      changeFrequency: "yearly",
      priority: 1,
      images: [`${siteConfig.url}/images/hero-revolution.jpg`],
    },
    ...speakers.map((speaker) => ({
      url: `${siteConfig.url}/speakers/${speaker.slug}`,
      lastModified: siteConfig.archiveUpdatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: [`${siteConfig.url}${speaker.image}`],
    })),
  ];
}
