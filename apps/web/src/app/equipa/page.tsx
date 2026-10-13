import Image from "next/image";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { historicalTeam, teamSource } from "@/content/community";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Equipa e comunidade",
  description: "Conheça a equipa histórica de 2016 e a comunidade que tornou possíveis as edições do TEDxSãoTomé.",
  path: "/equipa/",
  image: "/images/team.jpg",
});

export default function TeamPage() {
  return (
    <ContentPage
      kicker="As pessoas que fazem acontecer"
      title="Equipa e comunidade"
      introduction="Cada edição nasce do trabalho de pessoas que acreditam no valor de reunir a comunidade em torno de ideias."
    >
      <figure className="community-photo">
        <Image
          src="/images/team.jpg"
          alt="Fotografia de grupo da equipa TEDxSãoTomé junto às letras TEDx"
          width={2048}
          height={1365}
          sizes="(max-width: 1200px) 100vw, 1180px"
          preload
        />
        <figcaption>Uma memória da comunidade TEDxSãoTomé.</figcaption>
      </figure>
      <section className="content-section" aria-labelledby="team-heading">
        <div className="content-section__heading">
          <p className="section-kicker">Arquivo de 2016</p>
          <h2 id="team-heading">Uma equipa, muitas contribuições.</h2>
          <p>Este registo identifica a equipa da edição de 2016, publicada pelo TED.</p>
          <a className="text-link" href={teamSource} target="_blank" rel="noreferrer">
            Consultar o registo oficial ↗
          </a>
        </div>
        <ul className="team-list">
          {historicalTeam.map((member) => (
            <li key={member.name}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </li>
          ))}
        </ul>
      </section>
      <aside className="community-callout">
        <h2>Também faz parte desta história?</h2>
        <p>Ajude-nos a completar as memórias das equipas, das pessoas e das edições.</p>
        <Link className="button button--primary" href="/contactos/">Entrar em contacto</Link>
      </aside>
    </ContentPage>
  );
}
