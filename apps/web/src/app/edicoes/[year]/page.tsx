import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { RecordingGrid } from "@/components/recording-grid";
import { EditionNav } from "@/components/edition-nav";
import { editionPath, editions, recordings, screenings } from "@/content/archive";
import { getEditionDocument, getSpeakerImage, getSpeakerProfile } from "@/content/edition-history";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ year: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return editions.map(({ year }) => ({ year }));
}

export async function generateMetadata({ params }: Props) {
  const { year } = await params;
  const edition = editions.find((item) => item.year === year);
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
  const edition = editions.find((item) => item.year === year);
  const document = getEditionDocument(year);
  if (!edition || !document) notFound();
  const editionRecordings = recordings.filter((recording) => recording.year === year);
  const editionScreenings = screenings.filter((recording) => recording.year === year);
  const editionIndex = editions.findIndex((item) => item.year === year);
  const neighboringEditions = [editions[editionIndex - 1], editions[editionIndex + 1]].filter(Boolean);

  return (
    <ContentPage kicker={`TEDxSãoTomé ${year}`} title={edition.theme} introduction={edition.summary} compact backHref="/edicoes/" backLabel="Todas as edições">
      <EditionNav year={year} />
      <nav className="edition-sections" aria-label="Nesta edição">
        <a href="#historia">A edição</a>
        <a href="#videos">Vídeos</a>
        <a href="#oradores">Oradores e artistas</a>
        <a href="#programa">Programa</a>
        <a href="#fontes">Fontes</a>
      </nav>
      <div className="edition-details">
        <Image src={edition.image} alt="Fotografia histórica do TEDxSãoTomé" width={1050} height={720} sizes="(max-width: 760px) 100vw, 60vw" preload />
        <dl>
          <div><dt>Data</dt><dd><time dateTime={edition.date}>{edition.dateLabel}</time></dd></div>
          <div><dt>Local</dt><dd>{edition.venue}, São Tomé</dd></div>
          <div><dt>Tema</dt><dd>{edition.theme}</dd></div>
          <div><dt>Registo</dt><dd><a className="text-link" href={edition.source} target="_blank" rel="noreferrer">{edition.sourceLabel} ↗</a></dd></div>
        </dl>
      </div>
      <section className="edition-story" id="historia" aria-labelledby="history-heading">
        <h2 id="history-heading">O encontro de {year}</h2>
        <div>{document.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>
      <section className="edition-block" id="videos" aria-labelledby="recordings-heading">
        <div className="edition-block__heading">
          <h2 id="recordings-heading">Ver e rever</h2>
          <p>
            {editionRecordings.length > 0
              ? `${editionRecordings.length} gravações locais recuperadas, acompanhadas dos vídeos TED exibidos no programa.`
              : "Vídeos TED exibidos no programa. As gravações das apresentações locais ainda não foram localizadas; estes vídeos não são palestras gravadas nesta edição."}
          </p>
        </div>
        <RecordingGrid recordings={[...editionRecordings, ...editionScreenings]} />
      </section>
      <section className="edition-block" id="oradores" aria-labelledby="people-heading">
        <div className="edition-block__heading">
          <h2 id="people-heading">Oradores e artistas</h2>
          <p>Perfis históricos da edição de {year}. As funções e biografias referem-se a esse momento.</p>
        </div>
        <ul className="edition-people">
          {document.speakers.map((speaker) => {
            const image = getSpeakerImage(year, speaker.name);
            const profile = getSpeakerProfile(year, speaker.name);
            return (
              <li key={speaker.name}>
                {image && <Image className="edition-person__image" src={image.src} alt={`${speaker.name} no arquivo de ${year}`} width={image.width} height={image.height} sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" />}
                <h3>{speaker.name}</h3>
                {speaker.role && <p className="edition-person__role">{speaker.role}</p>}
                {speaker.topic && <p className="edition-person__topic">{speaker.topic}</p>}
                <p>{speaker.bio}</p>
                {profile && <Link className="text-link" href={`/speakers/${profile.slug}/`}>Ler o perfil completo</Link>}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="edition-block" id="programa" aria-labelledby="programme-heading">
        <div className="edition-block__heading">
          <h2 id="programme-heading">O programa anunciado</h2>
          <p>{document.programmeNote}</p>
        </div>
        <ol className="edition-programme">
          {document.programme?.map((item) => (
            <li key={`${item.time}-${item.title}`}>
              <span>{item.time}</span>
              <div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div>
            </li>
          ))}
        </ol>
      </section>
      <section className="edition-sources" id="fontes" aria-labelledby="sources-heading">
        <h2 id="sources-heading">Fontes desta edição</h2>
        <p>O arquivo combina registos públicos com programas, biografias e fotografias preservados pela organização. Não publicamos listas de contactos ou documentos pessoais.</p>
        <ul>{document.sourceNotes.map((source) => <li key={source.title}>{source.url ? <a href={source.url} target={source.url.startsWith("http") ? "_blank" : undefined} rel={source.url.startsWith("http") ? "noreferrer" : undefined}>{source.title}</a> : source.title}</li>)}</ul>
        <Link className="text-link" href="/contactos/">Sugerir uma correção ou acrescentar uma memória</Link>
      </section>
      <nav className="edition-neighbors" aria-label="Continuar pelo arquivo">
        {neighboringEditions.map((neighbor) => <Link href={editionPath(neighbor.year)} key={neighbor.year}><span>{neighbor.year}</span>{neighbor.theme}</Link>)}
      </nav>
    </ContentPage>
  );
}
