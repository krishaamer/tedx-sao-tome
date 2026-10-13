import { ContentPage } from "@/components/content-page";
import { RecordingGrid } from "@/components/recording-grid";
import { recordings, screenings } from "@/content/archive";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Palestras e vídeos",
  description: "Veja nove gravações do TEDxSãoTomé 2013 publicadas pelo TEDx Talks e os vídeos TED exibidos no programa de 2018.",
  path: "/videos/",
  image: "/images/2013.jpg",
});

export default function VideosPage() {
  return (
    <ContentPage
      kicker="Ideias que merecem ser partilhadas"
      title="O palco continua aqui."
      introduction="Reveja as conversas da primeira edição e descubra os vídeos que fizeram parte do programa de 2018."
    >
      <section className="content-section content-section--stacked" aria-labelledby="talks-heading">
        <div className="content-section__heading">
          <p className="section-kicker">Islands Connected · 2013</p>
          <h2 id="talks-heading">Nove vozes, uma ilha de ideias.</h2>
          <p>Gravações publicadas pelo canal TEDx Talks. Os vídeos abrem no YouTube.</p>
        </div>
        <RecordingGrid recordings={recordings} />
      </section>
      <section className="content-section content-section--stacked" aria-labelledby="screenings-heading">
        <div className="content-section__heading">
          <p className="section-kicker">No programa de 2018</p>
          <h2 id="screenings-heading">Vídeos TED exibidos no evento.</h2>
          <p>Estas palestras foram gravadas noutros eventos TED e projetadas no programa do TEDxSãoTomé 2018.</p>
        </div>
        <div className="channel-grid">
          {screenings.map((screening) => (
            <a className="channel-link" href={screening.url} key={screening.url} target="_blank" rel="noreferrer">
              <p className="section-kicker">{screening.speaker}</p>
              <h3>{screening.title}</h3>
              <span className="text-link">Ver no TED.com ↗</span>
            </a>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
