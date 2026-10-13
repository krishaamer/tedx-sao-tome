export const siteConfig = {
  name: "TEDxSãoTomé",
  shortName: "TEDxSTP",
  title: "TEDxSãoTomé 2018 | Re|Evolution",
  description:
    "Arquivo digital do TEDxSãoTomé 2018: Re|Evolution — ideias, oradores e programa de um evento TEDx organizado de forma independente em São Tomé e Príncipe.",
  url: "https://www.tedxsaotome.com",
  locale: "pt_PT",
  archiveUpdatedAt: "2026-10-14",
  event: {
    name: "TEDxSãoTomé 2018: Re|Evolution",
    startDate: "2018-09-29T14:30:00+01:00",
    venue: "CACAU",
    city: "São Tomé",
    country: "São Tomé e Príncipe",
  },
} as const;

export const navItems = [
  { label: "Edições", href: "/edicoes/" },
  { label: "Oradores", href: "/oradores/" },
  { label: "Palestras", href: "/videos/" },
  { label: "Equipa", href: "/equipa/" },
  { label: "Participar", href: "/participar/" },
] as const;

export const footerLinks = [
  ...navItems,
  { label: "Contactos", href: "/contactos/" },
  { label: "Identidade e design", href: "/identidade/" },
  { label: "Oradores de 2018", href: "/#speakers" },
  { label: "Programa de 2018", href: "/#programme" },
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
