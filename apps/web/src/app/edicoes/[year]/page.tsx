import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { RecordingGrid } from "@/components/recording-grid";
import { editions, recordings } from "@/content/archive";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ year: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return editions.filter((edition) => edition.year !== "2018").map(({ year }) => ({ year }));
}

export async function generateMetadata({ params }: Props) {
  const { year } = await params;
  const edition = editions.find((item) => item.year === year && year !== "2018");
  if (!edition) notFound();

  return pageMetadata({
    title: `${edition.year} — ${edition.theme}`,
    description: `${edition.theme}: TEDxSãoTomé em ${edition.dateLabel}, no ${edition.venue}. ${edition.summary}`,
    path: `/edicoes/${year}/`,
    image: edition.image,
  });
}

export default async function EditionPage({ params }: Props) {
  const { year } = await params;
  const edition = editions.find((item) => item.year === year && year !== "2018");
  if (!edition) notFound();
  const editionRecordings = recordings.filter((recording) => recording.year === year);

  return (
    <ContentPage kicker={`TEDxSãoTomé ${year}`} title={edition.theme} introduction={edition.summary}>
      <div className="edition-details">
        <Image src={edition.image} alt="Fotografia histórica do TEDxSãoTomé" width={1050} height={720} sizes="(max-width: 760px) 100vw, 60vw" preload />
        <dl>
          <div><dt>Data</dt><dd><time dateTime={edition.date}>{edition.dateLabel}</time></dd></div>
          <div><dt>Local</dt><dd>{edition.venue}, São Tomé</dd></div>
          <div><dt>Tema</dt><dd>{edition.theme}</dd></div>
          <div><dt>Registo</dt><dd><a className="text-link" href={edition.source} target="_blank" rel="noreferrer">{edition.sourceLabel} ↗</a></dd></div>
        </dl>
      </div>
      <section className="content-section content-section--stacked" aria-labelledby="recordings-heading">
        <div className="content-section__heading">
          <p className="section-kicker">Ideias para revisitar</p>
          <h2 id="recordings-heading">Palestras e memórias</h2>
          {editionRecordings.length > 0 ? (
            <p>Gravações publicadas pelo canal TEDx Talks, disponíveis para ver no YouTube.</p>
          ) : (
            <p>As gravações desta edição ainda não estão reunidas neste arquivo. Se conhece uma publicação, partilhe-a com a comunidade.</p>
          )}
        </div>
        {editionRecordings.length > 0 ? (
          <RecordingGrid recordings={editionRecordings} />
        ) : (
          <Link className="text-link" href="/contactos/">Contribuir para o arquivo →</Link>
        )}
      </section>
      <Link className="text-link" href="/edicoes/">← Todas as edições</Link>
    </ContentPage>
  );
}
