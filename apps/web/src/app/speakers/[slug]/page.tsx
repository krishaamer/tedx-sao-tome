import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { speakers } from "@/content/2018";

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

export async function generateMetadata({ params }: SpeakerPageProps) {
  const { slug } = await params;
  const speaker = speakers.find((item) => item.slug === slug);

  if (!speaker) {
    return {};
  }

  return {
    title: `${speaker.name} | TEDxSãoTomé 2018`,
    description: `${speaker.talk} no TEDxSãoTomé 2018.`,
  };
}

export default async function SpeakerPage({ params }: SpeakerPageProps) {
  const { slug } = await params;
  const speaker = speakers.find((item) => item.slug === slug);

  if (!speaker) {
    notFound();
  }

  return (
    <>
      <SiteNav compact />
      <main className="speaker-page">
        <section className="speaker-hero">
          <div className="container speaker-hero__grid">
            <div>
              <p className="section-kicker">Orador TEDxSãoTomé 2018</p>
              <h1>{speaker.name}</h1>
              <p>{speaker.talk}</p>
              <Link className="back-link" href="/#speakers">
                Voltar aos oradores
              </Link>
            </div>
            <Image src={speaker.image} alt={speaker.name} width={534} height={400} priority />
          </div>
        </section>
        <section
          className="container speaker-copy"
          dangerouslySetInnerHTML={{ __html: speaker.bioHtml }}
        />
      </main>
    </>
  );
}
