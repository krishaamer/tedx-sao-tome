import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/hero-revolution.jpg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      url: path,
      images: [{ url: image, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
