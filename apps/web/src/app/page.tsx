import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { pastEvents, programme, speakers, sponsors } from "@/content/2018";
import { siteConfig } from "@/content/site";

export const dynamic = "error";

const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: siteConfig.event.name,
  description: siteConfig.description,
  startDate: siteConfig.event.startDate,
  endDate: siteConfig.event.endDate,
  eventStatus: "https://schema.org/EventCompleted",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`${siteConfig.url}/images/hero-revolution.jpg`],
  location: {
    "@type": "Place",
    name: siteConfig.event.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.event.city,
      addressCountry: "ST",
    },
  },
  organizer: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <Image
            className="hero__image"
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <div className="hero__veil" aria-hidden="true" />
          <div className="container hero__content">
            <p className="archive-pill">Arquivo da edição 2018</p>
            <div className="hero__copy">
              <p className="hero__meta">
                <span>29 setembro 2018</span>
                <span aria-hidden="true">•</span>
                <span>CACAU, São Tomé</span>
              </p>
              <h1 id="hero-title" aria-label="Re|Evolution">
                Re<span aria-hidden="true">|</span>Evolution
              </h1>
              <p className="hero__tagline">Reinvent yourself</p>
              <div className="hero__actions">
                <Link className="button button--primary" href="#speakers">
                  Conheça os oradores
                </Link>
                <Link className="button button--ghost" href="#programme">
                  Ver o programa
                </Link>
              </div>
            </div>
            <Link className="hero__scroll" href="#event" aria-label="Continuar para os detalhes do evento">
              Explorar <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </section>

        <section className="event-overview" id="event" aria-labelledby="event-heading">
          <div className="container event-overview__grid">
            <div className="event-overview__intro">
              <p className="section-kicker">Re|Evolution</p>
              <h2 id="event-heading">Um dia para desafiar ideias e reinventar futuros.</h2>
            </div>
            <dl className="event-facts" aria-label="Informação do evento">
              <div>
                <dt>Quando</dt>
                <dd>29 de setembro de 2018, 14h30</dd>
              </div>
              <div>
                <dt>Onde</dt>
                <dd>CACAU, São Tomé</dd>
              </div>
              <div>
                <dt>Edição</dt>
                <dd>13 oradores, artistas e agentes de mudança</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="about" id="about">
          <div className="about__intro">
            <div className="container about__intro-grid">
              <h2>O que é o TEDxSãoTomé?</h2>
              <p>
                Uma conferência sem fins lucrativos que reúne alguns pensadores de diferentes
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
            <header className="section-heading">
              <p className="section-kicker">As pessoas por detrás das ideias</p>
              <h2>Oradores do TEDxSãoTomé 2018</h2>
              <p>Vozes de São Tomé e Príncipe e do mundo, reunidas para partilhar novas perspetivas.</p>
            </header>
            <div className="speaker-grid">
              {speakers.map((speaker) => (
                <Link
                  className="speaker-card"
                  href={`/speakers/${speaker.slug}`}
                  key={speaker.slug}
                  prefetch={false}
                >
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    width={534}
                    height={400}
                    className="speaker-card__image"
                    sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                  />
                  <span className="speaker-card__copy">
                    <strong>{speaker.name}</strong>
                    <small>{speaker.talk}</small>
                    <span className="speaker-card__arrow" aria-hidden="true">↗</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="programme" id="programme">
          <div className="container programme__grid">
            <header className="section-heading section-heading--left programme__heading">
              <p className="section-kicker">29 setembro · CACAU</p>
              <h2>Programa</h2>
              <p>Uma tarde e uma noite de talks, performances, encontros e ideias que merecem ser partilhadas.</p>
            </header>
            <ol className="programme__list">
              {programme.map(([time, item]) => (
                <li key={`${time}-${item}`}>
                  <time dateTime={`2018-09-29T${time}:00+00:00`}>{time}</time>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sponsors" id="sponsors">
          <div className="container sponsors__content">
            <p className="section-kicker">Apoios</p>
            <h2>Parceiros TEDxSãoTomé 2018</h2>
            <p className="sponsors__intro">Organizações que ajudaram a tornar esta edição possível.</p>
            <div className="sponsor-grid">
              {sponsors.map((sponsor) => (
                <div className="sponsor-card" key={sponsor.name}>
                  <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    width={240}
                    height={140}
                    sizes="(max-width: 560px) 50vw, (max-width: 900px) 25vw, 16vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="past" id="past">
          <div className="container">
            <header className="section-heading section-heading--left past__heading">
              <p className="section-kicker">A nossa história</p>
              <h2>Edições anteriores</h2>
            </header>
            <div className="past__grid">
              {pastEvents.map((event) => (
                <article className="past-card" key={event.year}>
                  <div className="past-card__image">
                    <Image
                      src={event.image}
                      alt={`TEDxSãoTomé ${event.year}`}
                      width={1050}
                      height={720}
                      sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
                    />
                    <span>{event.year}</span>
                  </div>
                  <h3>{event.theme}</h3>
                  <p>{event.date}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
