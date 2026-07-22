import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEDxSãoTomé 2018 | Re|Evolution",
  description:
    "Static archive of TEDxSãoTomé 2018, an independently organized TED event in São Tomé.",
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
