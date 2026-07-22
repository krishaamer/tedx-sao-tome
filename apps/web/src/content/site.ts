export const siteConfig = {
  name: "TEDxSãoTomé",
  shortName: "TEDxSTP",
  title: "TEDxSãoTomé 2018 | Re|Evolution",
  description:
    "Arquivo digital do TEDxSãoTomé 2018: Re|Evolution — ideias, oradores e programa de um evento TEDx organizado de forma independente em São Tomé e Príncipe.",
  url: "https://tedxsaotome.com",
  locale: "pt_PT",
  archiveUpdatedAt: "2026-07-22",
  event: {
    name: "TEDxSãoTomé 2018: Re|Evolution",
    startDate: "2018-09-29T14:30:00+00:00",
    endDate: "2018-09-29T23:59:00+00:00",
    venue: "CACAU",
    city: "São Tomé",
    country: "São Tomé e Príncipe",
  },
} as const;

export const navItems = [
  { label: "Sobre TEDx", href: "/#about" },
  { label: "Oradores", href: "/#speakers" },
  { label: "Programa", href: "/#programme" },
  { label: "Parceiros", href: "/#sponsors" },
] as const;

export const socialLinks = [
  { label: "Facebook", short: "Fb", href: "https://www.facebook.com/tedxsaotome" },
  { label: "Instagram", short: "Ig", href: "https://www.instagram.com/tedxsaotome/" },
  { label: "Twitter", short: "Tw", href: "https://twitter.com/tedxsaotome" },
  {
    label: "YouTube",
    short: "Yt",
    href: "https://www.youtube.com/results?search_query=tedxsaotome",
  },
] as const;
