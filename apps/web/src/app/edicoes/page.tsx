import Image from "next/image";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { editionPath, editions } from "@/content/archive";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Edições",
  description: "Explore as edições de 2013, 2014, 2015, 2016 e 2018 do TEDxSãoTomé: temas, locais, datas e memórias das ideias partilhadas nas ilhas.",
  path: "/edicoes/",
});

export default function EditionsPage() {
  return (
    <ContentPage
      kicker="A nossa história"
      title="Cinco edições. Muitas formas de ver o mundo."
      introduction="Um percurso de encontros em São Tomé e Príncipe, preservado através dos temas, das pessoas e das ideias de cada edição."
    >
      <div className="edition-list">
        {editions.toReversed().map((edition) => (
          <Link className="edition-row" href={editionPath(edition.year)} key={edition.year} prefetch={false}>
            <div className="edition-row__image">
              <Image src={edition.image} alt="Fotografia do arquivo TEDxSãoTomé" width={1050} height={720} sizes="(max-width: 760px) 100vw, 40vw" />
            </div>
            <div className="edition-row__copy">
              <p className="section-kicker">TEDxSãoTomé {edition.year}</p>
              <h2>{edition.theme}</h2>
              <p><time dateTime={edition.date}>{edition.dateLabel}</time> · {edition.venue}</p>
              <p>{edition.summary}</p>
              <span className="text-link">Explorar a edição →</span>
            </div>
          </Link>
        ))}
      </div>
    </ContentPage>
  );
}
