import tokens from "../../public/brand/design-tokens.json";
import { editions, recordings } from "@/content/archive";
import { getEditionDocument, getSpeakerImage, getSpeakerProfile } from "@/content/edition-history";
import type { ArchiveSpeaker } from "@/components/speaker-directory";

export const designTokens = tokens;
export const tokenValues = Object.fromEntries([...tokens.colors, ...tokens.primitives].map((token) => [token.variable, token.value]));
export const tokensCss = `:root {\n${[...tokens.colors, ...tokens.primitives].map((token) => `  ${token.variable}: ${token.value};`).join("\n")}\n}`;

export const identitySections = [
  { id: "marca", label: "Marca e logótipo" },
  { id: "cores", label: "Cores" },
  { id: "tipografia", label: "Tipografia" },
  { id: "layout", label: "Espaço e layout" },
  { id: "componentes", label: "Componentes" },
  { id: "acessibilidade", label: "Acessibilidade" },
  { id: "recursos", label: "Recursos" },
] as const;

const samplePeople = [
  { year: "2018", name: "Ana Mota" },
  { year: "2016", name: "Abel Bom Jesus" },
  { year: "2013", name: "Mark Shuttleworth" },
];

export const specimenSpeakers: ArchiveSpeaker[] = samplePeople.flatMap(({ year, name }) => {
  const speaker = getEditionDocument(year)?.speakers.find((person) => person.name === name);
  const edition = editions.find((event) => event.year === year);
  if (!speaker || !edition) return [];
  const profile = getSpeakerProfile(year, name);
  return [{
    ...speaker,
    id: `specimen-${year}-${name}`,
    year,
    theme: edition.theme,
    editionHref: `/edicoes/${year}/`,
    profileHref: profile ? `/speakers/${profile.slug}/` : undefined,
    image: getSpeakerImage(year, name),
    recording: recordings.find((recording) => recording.year === year && recording.speaker === name),
  }];
});

export function contrastRatio(first: string, second: string) {
  function luminance(hex: string) {
    const values = hex.replace("#", "").match(/.{2}/g)!.map((value) => {
      const channel = Number.parseInt(value, 16) / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
  }
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
