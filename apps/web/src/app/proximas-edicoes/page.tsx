import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { contactChannels } from "@/content/community";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Próximas edições",
  description: "Acompanhe os canais do TEDxSãoTomé para futuros anúncios de datas, inscrições e oportunidades de participação.",
  path: "/proximas-edicoes/",
});

export default function UpcomingPage() {
  return (
    <ContentPage
      kicker="Mantenha a curiosidade"
      title="O próximo encontro começa com uma ideia."
      introduction="Ainda não há uma nova edição anunciada neste site. Acompanhe os canais do TEDxSãoTomé para novidades."
    >
      <section className="prose-section" aria-labelledby="announcements-heading">
        <h2 id="announcements-heading">Onde acompanhar os anúncios</h2>
        <p>Uma nova edição terá a sua própria data, local, programa e informações de participação. Consulte as publicações da comunidade antes de planear a sua visita.</p>
        <div className="inline-actions">
          {contactChannels.map((channel) => (
            <a className="button button--primary" href={channel.url} key={channel.name} target="_blank" rel="noreferrer">
              Acompanhar no {channel.name} ↗
            </a>
          ))}
        </div>
      </section>
      <aside className="community-callout">
        <h2>Até ao próximo encontro, há ideias para descobrir.</h2>
        <p>Conheça as edições realizadas e veja as gravações disponíveis.</p>
        <Link className="text-link" href="/edicoes/">Percorrer o arquivo →</Link>
      </aside>
    </ContentPage>
  );
}
