import { ContentPage } from "@/components/content-page";
import { SpeakerDirectory, type ArchiveSpeaker } from "@/components/speaker-directory";
import { editionPath, editions } from "@/content/archive";
import { getEditionDocument, getSpeakerImage, getSpeakerProfile } from "@/content/edition-history";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Todos os oradores e artistas",
  description: "Conheça os 47 perfis históricos dos oradores e artistas das cinco edições do TEDxSãoTomé. Procure por nome ou tema e explore o ano de cada participação.",
  path: "/oradores/",
  image: "/images/team.jpg",
});

export default function AllSpeakersPage() {
  const speakers: ArchiveSpeaker[] = editions.flatMap((edition) =>
    (getEditionDocument(edition.year)?.speakers ?? []).map((speaker, index) => {
      const profile = getSpeakerProfile(edition.year, speaker.name);
      return {
        ...speaker,
        id: `${edition.year}-${index}`,
        year: edition.year,
        theme: edition.theme,
        editionHref: editionPath(edition.year),
        profileHref: profile ? `/speakers/${profile.slug}/` : undefined,
        image: getSpeakerImage(edition.year, speaker.name),
      };
    })).toSorted((a, b) => a.name.localeCompare(b.name, "pt") || a.year.localeCompare(b.year));

  return (
    <ContentPage kicker="As pessoas e as ideias" title="Todos os oradores e artistas." introduction="Cinco edições, muitas vozes. Encontre uma pessoa, descubra um tema ou percorra o programa de cada ano." compact>
      <SpeakerDirectory speakers={speakers} />
    </ContentPage>
  );
}
