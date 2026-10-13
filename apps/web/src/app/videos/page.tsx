import { ContentPage } from "@/components/content-page";
import { RecordingGrid } from "@/components/recording-grid";
import { EditionNav } from "@/components/edition-nav";
import { recordings, screenings } from "@/content/archive";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Palestras e vídeos",
  description: "Veja as gravações recuperadas de 2013, 2015 e 2016 e os vídeos TED exibidos nas cinco edições. Escolha um ano e assista sem sair do arquivo.",
  path: "/videos/",
  image: "/images/2013.jpg",
});

export default function VideosPage() {
  return (
    <ContentPage
      kicker="Ideias que merecem ser partilhadas"
      title="Palestras para ver e rever."
      introduction="Escolha uma conversa, fique para a próxima. As ideias das ilhas continuam a circular."
      compact
    >
      <EditionNav />
      <section className="edition-block" aria-labelledby="talks-heading">
        <div className="edition-block__heading">
          <h2 id="talks-heading">Ver dentro do arquivo</h2>
          <p>{recordings.length} gravações locais e {screenings.length} vídeos TED documentados nos programas. Use os filtros para encontrar uma edição ou um nome.</p>
        </div>
        <RecordingGrid recordings={[...recordings, ...screenings]} />
      </section>
      <section className="edition-sources" aria-labelledby="screenings-heading">
        <h2 id="screenings-heading">Um arquivo, dois tipos de vídeo</h2>
        <p>As gravações locais foram publicadas pelo canal TEDx Talks. Os itens identificados como “Vídeo TED exibido” foram gravados noutros eventos e apresentados no programa são-tomense; não representam a presença desses oradores nas ilhas.</p>
        <p>Ainda não localizámos gravações de apresentações locais de 2014 e 2018. Nas outras edições, a coleção também pode estar incompleta. Os vídeos são reproduzidos pelos leitores oficiais do YouTube e do TED, sem realojar os ficheiros.</p>
      </section>
    </ContentPage>
  );
}
