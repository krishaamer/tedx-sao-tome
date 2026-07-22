import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { pastEvents, programme, speakers, sponsors } from "@/content/2018";

export const dynamic = "error";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="hero" id="hero" aria-label="TEDxSãoTomé 2018">
          <div className="hero__content">
            <p>
              <span>29.09.2018</span>
              <span aria-hidden="true">|</span>
              <span>CACAU</span>
            </p>
          </div>
        </section>

        <section className="theme" id="theme">
          <div className="container theme__grid">
            <div>
              <h1>Re|Evolution</h1>
              <p className="eyebrow">Reinvent yourself</p>
              <div className="event-facts" aria-label="Informação do evento">
                <div>
                  <h2>Onde</h2>
                  <p>
                    CACAU
                    <br />
                    São Tomé
                  </p>
                </div>
                <div>
                  <h2>Quando</h2>
                  <p>
                    29 de setembro de 2018
                    <br />
                    14h30
                  </p>
                </div>
              </div>
            </div>
            <div className="theme__logo" role="img" aria-label="TEDxSãoTomé" />
          </div>
        </section>

        <section className="about" id="about">
          <div className="about__intro">
            <div className="container about__intro-grid">
              <h2>O que é o TEDxSãoTomé?</h2>
              <p>
                uma conferência sem fins lucrativos que reúne alguns pensadores de diferentes
                áreas do conhecimento.
              </p>
            </div>
          </div>
          <div className="container about__body">
            <article>
              <h3>Sobre TED</h3>
              <p>
                <strong>TED</strong> - é uma organização sem fins lucrativos devotada a
                &quot;Ideias Que Merecem Ser Espalhadas&quot;. Surgiu em 1984 como uma
                conferência anual na Califórnia e já teve entre seus palestrantes Bill Clinton,
                Paul Simon, Bill Gates, Bono Vox, Al Gore, Michelle Obama e Philippe Starck.
              </p>
              <p>
                Mais de 700 das palestras estão disponíveis gratuitamente no site TED.com e já
                foram acessadas por milhões de pessoas do mundo todo. A sigla TED significa
                Tecnologia, Entretenimento e Design.
              </p>
              <p>
                Hoje a discussão cresceu para os mais diversos campos, como educação, ciências,
                negócios, artes e questões globais. O que está em jogo realmente é o poder de
                transformar e melhorar o futuro, não importando formações.
              </p>
              <p>
                <strong>TEDx</strong> - No espírito das ideias que merecem ser espalhadas, o
                TED criou o programa chamado TEDx. O TEDx é um programa de eventos locais,
                organizados de forma independente, que reúne pessoas para dividir uma experiência
                ao estilo TED.
              </p>
            </article>
            <article>
              <h3>
                Sobre TEDxSãoTomé, <span>x</span>{" "}
                <small>= independently organized event</small>
              </h3>
              <p>
                O TEDxSãoTomé foi criado no espírito de missão TED, “ideias que merecem ser
                partilhadas”. O programa foi criado para oferecer às comunidades, organizações e
                indivíduos em e de São Tomé e Príncipe, a oportunidade de promover o diálogo
                através de experiências TED no país.
              </p>
            </article>
          </div>
        </section>

        <section className="speakers" id="speakers">
          <div className="container">
            <h2>Oradores do TEDxSãoTomé 2018</h2>
            <div className="speaker-grid">
              {speakers.map((speaker) => (
                <Link className="speaker-card" href={`/speakers/${speaker.slug}`} key={speaker.slug}>
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    width={534}
                    height={400}
                    className="speaker-card__image"
                  />
                  <span>
                    <strong>{speaker.name}</strong>
                    <small>{speaker.talk}</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="programme" id="programme">
          <div className="container">
            <h2>PROGRAMA TEDxSãoTomé 2018</h2>
            <div className="programme__table-wrap">
              <table>
                <tbody>
                  {programme.map(([time, item]) => (
                    <tr key={`${time}-${item}`}>
                      <th scope="row">{time}</th>
                      <td>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="sponsors" id="sponsors">
          <div className="container sponsors__content">
            <p className="section-kicker">Apoios</p>
            <h2>Parceiros TEDxSãoTomé 2018</h2>
            <div className="sponsor-grid">
              {sponsors.map((sponsor) => (
                <div className="sponsor-card" key={sponsor.name}>
                  <Image src={sponsor.image} alt={sponsor.name} width={240} height={140} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="past" id="past">
          <div className="container past__grid">
            {pastEvents.map((event) => (
              <article className="past-card" key={event.year}>
                <Image src={event.image} alt={`TEDxSãoTomé ${event.year}`} width={1050} height={720} />
                <h2>TEDxSãoTomé {event.year}</h2>
                <p>{event.theme}</p>
                <small>{event.date}</small>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
