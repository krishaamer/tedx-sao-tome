import { ContentPage } from "@/components/content-page";
import { contactChannels } from "@/content/community";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contactos",
  description: "Encontre os canais públicos do TEDxSãoTomé para partilhar memórias, sugerir correções ou acompanhar a comunidade.",
  path: "/contactos/",
});

export default function ContactPage() {
  return (
    <ContentPage
      kicker="Vamos conversar"
      title="Contactos"
      introduction="Partilhe uma memória, ajude a corrigir o arquivo ou acompanhe as novidades pelos canais públicos do TEDxSãoTomé."
    >
      <div className="channel-grid">
        {contactChannels.map((channel) => (
          <a className="channel-link" href={channel.url} key={channel.name} target="_blank" rel="noreferrer">
            <span className="section-kicker">Canal público</span>
            <h2>{channel.name} <span aria-hidden="true">↗</span></h2>
            <p>{channel.description}</p>
          </a>
        ))}
      </div>
      <section className="prose-section" aria-labelledby="contribution-heading">
        <h2 id="contribution-heading">Tem algo para acrescentar ao arquivo?</h2>
        <p>
          Envie uma mensagem por um dos canais acima com a edição, o nome da pessoa ou
          a página a que se refere. Se possível, inclua uma ligação pública que ajude a
          confirmar a informação.
        </p>
        <p>Fotografias, programas, gravações e relatos das edições anteriores ajudam a preservar esta história.</p>
      </section>
    </ContentPage>
  );
}
