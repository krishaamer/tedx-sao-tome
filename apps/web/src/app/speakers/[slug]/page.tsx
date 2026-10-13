import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { speakers } from "@/content/2018";
import { pageMetadata } from "@/lib/metadata";

type SpeakerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return speakers.map((speaker) => ({
    slug: speaker.slug,
  }));
}

export async function generateMetadata({ params }: SpeakerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const speaker = speakers.find((item) => item.slug === slug);

  if (!speaker) {
    return {
      title: "Orador não encontrado",
    };
  }

  return pageMetadata({
    title: `${speaker.name} — 2018`,
    description: `${speaker.talk} no TEDxSãoTomé 2018.`,
    path: `/speakers/${speaker.slug}/`,
    image: speaker.image,
  });
}

export default async function SpeakerPage({ params }: SpeakerPageProps) {
  const { slug } = await params;
  const speaker = speakers.find((item) => item.slug === slug);

  if (!speaker) {
    notFound();
  }

  const speakerIndex = speakers.findIndex((item) => item.slug === speaker.slug);
  const previousSpeaker = speakers[(speakerIndex - 1 + speakers.length) % speakers.length];
  const nextSpeaker = speakers[(speakerIndex + 1) % speakers.length];

  return (
    <>
      <SiteNav />
      <main className="speaker-page" id="main-content">
        <section className="speaker-hero">
          <div className="container speaker-hero__grid">
            <div className="speaker-hero__copy">
              <p className="section-kicker">Orador TEDxSãoTomé 2018</p>
              <h1>{speaker.name}</h1>
              <p className="speaker-hero__talk">{speaker.talk}</p>
              <Link className="back-link" href="/#speakers">
                <span aria-hidden="true">←</span> Todos os oradores
              </Link>
            </div>
            <figure className="speaker-hero__portrait">
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={534}
                height={400}
                sizes="(max-width: 860px) 100vw, 45vw"
                preload
              />
            </figure>
          </div>
        </section>
        <section className="container speaker-copy" aria-labelledby="biography-heading">
          <p className="section-kicker">Perfil</p>
          <h2 id="biography-heading">Biografia</h2>
          <p className="archive-note">
            Texto publicado para a edição de 2018. As funções, projetos e referências
            a inscrições refletem esse momento histórico.
          </p>
          <div dangerouslySetInnerHTML={{ __html: speaker.bioHtml }} />
        </section>
        <nav className="speaker-pagination" aria-label="Navegar entre oradores">
          <div className="container speaker-pagination__grid">
            <Link href={`/speakers/${previousSpeaker.slug}`}>
              <span>← Anterior</span>
              <strong>{previousSpeaker.name}</strong>
            </Link>
            <Link href={`/speakers/${nextSpeaker.slug}`}>
              <span>Seguinte →</span>
              <strong>{nextSpeaker.name}</strong>
            </Link>
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
