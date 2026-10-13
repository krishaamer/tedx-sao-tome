"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import styles from "./speaker-directory.module.css";

export type ArchiveSpeaker = {
  id: string;
  name: string;
  year: string;
  theme: string;
  bio: string;
  role?: string;
  topic?: string;
  editionHref: string;
  profileHref?: string;
  image?: { src: string; width: number; height: number };
};

function searchable(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt");
}

export function SpeakerDirectory({ speakers }: { speakers: ArchiveSpeaker[] }) {
  const [year, setYear] = useState("all");
  const [search, setSearch] = useState("");
  const searchId = useId();
  const years = [...new Set(speakers.map((speaker) => speaker.year))].sort();
  const query = searchable(search.trim());
  const visible = speakers.filter((speaker) =>
    (year === "all" || speaker.year === year) &&
    searchable(`${speaker.name} ${speaker.topic ?? ""} ${speaker.role ?? ""} ${speaker.year}`).includes(query));

  function reset() { setYear("all"); setSearch(""); }

  return (
    <section aria-label="Diretório de oradores e artistas">
      <div className={styles.controls}>
        <div className={styles.search}>
          <label htmlFor={searchId}>Procurar por nome ou tema</label>
          <input id={searchId} type="search" placeholder="Nome, tema ou área" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        <div className={styles.years} role="group" aria-label="Filtrar oradores por edição">
          <button type="button" aria-pressed={year === "all"} onClick={() => setYear("all")}>Todos os anos</button>
          {years.map((value) => <button type="button" key={value} aria-pressed={year === value} onClick={() => setYear(value)}>{value}</button>)}
        </div>
      </div>
      <div className={styles.summary}>
        <p role="status" aria-live="polite" aria-atomic="true">{visible.length} de {speakers.length} perfis históricos{year !== "all" && ` · Edição de ${year}`}</p>
        {(search || year !== "all") && <button type="button" onClick={reset}>Limpar filtros</button>}
      </div>
      <ul className={styles.list}>
        {visible.map((speaker) => (
          <li className={styles.person} key={speaker.id} data-speaker-card data-year={speaker.year}>
            <div className={styles.identity}>
              {speaker.image && <Image src={speaker.image.src} alt="" width={speaker.image.width} height={speaker.image.height} sizes="96px" className={styles.image} />}
              <div>
                <p className={styles.year}>TEDxSãoTomé {speaker.year}</p>
                <h2>{speaker.name}</h2>
                {speaker.role && <p className={styles.role}>{speaker.role}</p>}
              </div>
            </div>
            {speaker.topic && <p className={styles.topic}>{speaker.topic}</p>}
            <p className={styles.bio}>{speaker.bio}</p>
            <div className={styles.links}>
              {speaker.profileHref && <Link href={speaker.profileHref}>Perfil completo <span className={styles.hidden}>de {speaker.name}</span></Link>}
              <Link href={speaker.editionHref}>Ver a edição de {speaker.year} <span className={styles.hidden}>— {speaker.theme}</span></Link>
            </div>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <div className={styles.empty}><h2>Nenhum perfil corresponde a estes filtros.</h2><p>Experimente outro nome, tema ou ano.</p><button type="button" onClick={reset}>Mostrar todos os perfis</button></div>}
      <p className={styles.note}>O diretório inclui oradores, artistas e grupos do programa histórico de cada edição. As funções e biografias referem-se ao ano indicado, não a cargos atuais.</p>
    </section>
  );
}
