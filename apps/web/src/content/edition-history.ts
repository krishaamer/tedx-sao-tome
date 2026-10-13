import { programme, speakers } from "@/content/2018";
import { editionDocuments, type EditionDocument } from "@/content/edition-documents";

const edition2018: EditionDocument = {
  overview: [
    "Re|Evolution: Reinvent Yourself reuniu no CACAU treze oradores e artistas para pensar a mudança a partir das ilhas. Conservação da natureza, comunidade, educação inclusiva, cinema, saúde, energia e transformação digital cruzaram-se com a música de Any Moreira e MC Karboss.",
    "O programa preservado começa com o check-in às 14:30 e inclui duas exibições de palestras TED, uma pausa para encontros e o X After Dark no Pirata Lounge Beach. Os horários são os anunciados pela organização, não uma medição das apresentações.",
    "Os perfis e guiões de setembro recuperados nos documentos da organização complementam o site original. As versões de preparação incluíam nomes que não constam do programa final; o arquivo mantém a seleção publicada para 29 de setembro de 2018.",
  ],
  speakers: speakers.map((speaker) => ({
    name: speaker.name,
    topic: speaker.talk,
    bio: speaker.bioHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s/).slice(0, 2).join(" "),
  })),
  programme: programme.map(([time, title]) => ({ time, title })),
  programmeNote: "Programa publicado no site de 2018, preservado no arquivo WordPress. Os perfis descrevem o percurso das pessoas à data da edição, não as suas funções atuais. As duas palestras TED foram exibidas no evento e não são gravações de oradores locais.",
  sourceNotes: [
    { title: "Site e programa original da edição de 2018", url: "/#programme" },
    { title: "Perfis de oradores · documentos de setembro de 2018 preservados no arquivo" },
    { title: "Guião de base de Mé-Chinhô · 29 de setembro de 2018" },
  ],
};

export function getEditionDocument(year: string): EditionDocument | undefined {
  return year === "2018" ? edition2018 : editionDocuments[year];
}

export function getSpeakerProfile(year: string, name: string) {
  return year === "2018" ? speakers.find((speaker) => speaker.name === name) : undefined;
}

const recoveredImages: Record<string, Record<string, string>> = {
  "2013": {
    "Nelly Strong": "nelly-strong",
    "Dynka Amorim": "dynka-amorim",
    "Mark Shuttleworth": "mark-shuttleworth",
    "Robert Drewes": "robert-drewes",
  },
  "2015": {
    "Killa Z": "killa-z",
    "Ahti Heinla": "ahti-heinla",
    "Roselyn Silva": "roselyn-silva",
    "André Aragão": "andre-aureliano-aragao",
    "Yanira Tiny": "yanira-tiny",
    "Wildmark Trovoada": "wildmark-trovoada",
    "Nayda Almeida": "nayda-d-almeida",
    "Abílio Bragança Neto": "abilio-neto",
  },
};

export function getSpeakerImage(year: string, name: string) {
  const profile = getSpeakerProfile(year, name);
  if (profile) return { src: profile.image, width: 600, height: 600 };
  const image = recoveredImages[year]?.[name];
  if (!image) return undefined;
  const size = year === "2013" ? 612 : 1080;
  return { src: `/images/editions/${year}/${image}.jpg`, width: size, height: size };
}
