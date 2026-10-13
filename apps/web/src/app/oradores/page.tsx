import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SpeakerDirectory, type ArchiveSpeaker } from "@/components/speaker-directory";
import styles from "@/components/speaker-directory.module.css";
import { editionPath, editions, recordings } from "@/content/archive";
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
      // One published video includes an honorific absent from the programme.
      // Keep the alias scoped to this edition, rather than using fuzzy matching.
      const recordingName = edition.year === "2013" && speaker.name === "Robert Drewes" ? "Dr. Robert Drewes" : speaker.name;
      return {
        ...speaker,
        id: `${edition.year}-${index}`,
        year: edition.year,
        theme: edition.theme,
        editionHref: editionPath(edition.year),
        profileHref: profile ? `/speakers/${profile.slug}/` : undefined,
        image: getSpeakerImage(edition.year, speaker.name),
        recording: recordings.find((recording) => recording.year === edition.year && recording.speaker === recordingName),
      };
    })).toSorted((a, b) => a.name.localeCompare(b.name, "pt") || a.year.localeCompare(b.year));

  return (
    <>
      <SiteNav />
      <main id="main-content" className="container">
        <header className={styles.intro}>
          <Link href="/" className={styles.back}>TEDxSãoTomé / As pessoas</Link>
          <h1>Oradores e artistas</h1>
          <p>Cinco edições. Muitas vozes. Conheça as pessoas e reveja as suas apresentações.</p>
        </header>
        <SpeakerDirectory speakers={speakers} />
      </main>
      <SiteFooter />
    </>
  );
}
