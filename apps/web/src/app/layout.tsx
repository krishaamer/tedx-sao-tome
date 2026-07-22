import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "TEDxSãoTomé",
    "TEDx",
    "São Tomé e Príncipe",
    "ReEvolution",
    "ideias",
    "conferência",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero-revolution.jpg",
        width: 5760,
        height: 2832,
        alt: "TEDxSãoTomé 2018 — Re|Evolution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/hero-revolution.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "education",
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body>
        <a className="skip-link" href="#main-content">
          Saltar para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
