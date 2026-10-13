import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Participar",
  description: "Descubra as palestras, contribua para as memórias do TEDxSãoTomé e acompanhe os anúncios de próximas edições.",
  path: "/participar/",
});

export default function ParticipatePage() {
  return (
    <ContentPage
      kicker="Ideias que continuam"
      title="Faça parte da conversa."
      introduction="A experiência de partilhar ideias continua para além do palco. Explore as palestras, reencontre a comunidade e ajude a preservar a sua história."
    >
      <ol className="participation-list">
        <li>
          <span aria-hidden="true">01</span>
          <div>
            <h2>Descubra e partilhe ideias.</h2>
            <p>Veja as gravações disponíveis e converse sobre os temas com amigos, colegas ou a sua comunidade.</p>
            <Link className="text-link" href="/videos/">Explorar as palestras →</Link>
          </div>
        </li>
        <li>
          <span aria-hidden="true">02</span>
          <div>
            <h2>Contribua com uma memória.</h2>
            <p>Tem fotografias, programas ou informação sobre uma edição? Ajude a completar o arquivo e a identificar as pessoas que participaram.</p>
            <Link className="text-link" href="/contactos/">Partilhar uma contribuição →</Link>
          </div>
        </li>
        <li>
          <span aria-hidden="true">03</span>
          <div>
            <h2>Acompanhe as próximas edições.</h2>
            <p>Datas, inscrições, oportunidades de colaboração e candidaturas dependem de cada edição. Siga os canais da comunidade para acompanhar os anúncios.</p>
            <Link className="text-link" href="/proximas-edicoes/">Saber mais →</Link>
          </div>
        </li>
      </ol>
    </ContentPage>
  );
}
