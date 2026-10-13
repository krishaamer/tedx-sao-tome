"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Recording } from "@/content/archive";
import { RecordingGrid } from "./recording-grid";
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
  recording?: Recording;
};

function searchable(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt");
}

function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return `${words[0][0]}${words.length > 1 ? words.at(-1)![0] : ""}`.toLocaleUpperCase("pt");
}

function SearchIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>;
}

function PlayIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 4 13 8-13 8V4Z" /></svg>;
}

function SpeakerPortrait({ speaker, large = false }: { speaker: ArchiveSpeaker; large?: boolean }) {
  return <div className={`${styles.portrait}${large ? ` ${styles.largePortrait}` : ""}`}>
    {speaker.image ? <Image src={speaker.image.src} alt="" fill sizes={large ? "(max-width: 760px) 100vw, 280px" : "(max-width: 360px) calc(100vw - 32px), (max-width: 540px) 45vw, (max-width: 1000px) 45vw, 380px"} className={styles.image} /> :
      <div className={styles.monogram} aria-hidden="true"><span>{initials(speaker.name)}</span><small>TEDxSãoTomé {speaker.year}</small></div>}
  </div>;
}

export function SpeakerDirectory({ speakers }: { speakers: ArchiveSpeaker[] }) {
  const [year, setYear] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [withVideo, setWithVideo] = useState(false);
  const [selected, setSelected] = useState<ArchiveSpeaker | null>(null);
  const [videoFirst, setVideoFirst] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const searchId = useId();
  const sortId = useId();
  const resultsId = useId();
  const dialogTitleId = useId();
  const years = [...new Set(speakers.map((speaker) => speaker.year))].sort();
  const query = searchable(search.trim());
  const visible = speakers.filter((speaker) =>
    (year === "all" || speaker.year === year) &&
    (!withVideo || speaker.recording) &&
    searchable(`${speaker.name} ${speaker.topic ?? ""} ${speaker.role ?? ""} ${speaker.bio} ${speaker.year}`).includes(query))
    .sort((a, b) => (sort === "recent" ? b.year.localeCompare(a.year) : sort === "oldest" ? a.year.localeCompare(b.year) : 0) || a.name.localeCompare(b.name, "pt"));

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      if (dialog.open) dialog.close();
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  function reset() { setYear("all"); setSearch(""); setWithVideo(false); searchRef.current?.focus(); }

  function openProfile(speaker: ArchiveSpeaker, button: HTMLButtonElement, showVideo = false) {
    openerRef.current = button;
    setVideoFirst(showVideo);
    setSelected(speaker);
  }

  const filtered = Boolean(search || year !== "all" || withVideo);
  const video = selected?.recording && <div className={`${styles.dialogVideo}${videoFirst ? ` ${styles.videoFirst}` : ""}`}><h3>A apresentação</h3><RecordingGrid key={selected.id} recordings={[selected.recording]} /></div>;

  return (
    <section className={styles.directory} aria-label="Diretório de oradores e artistas">
      <div className={styles.controls}>
        <div className={styles.controlRow}>
          <div className={styles.search}>
            <label className={styles.hidden} htmlFor={searchId}>Procurar por nome, tema ou área</label>
            <SearchIcon />
            <input ref={searchRef} id={searchId} type="search" placeholder="Nome, tema ou área" value={search} aria-controls={resultsId} onChange={(event) => setSearch(event.target.value)} />
            {search && <button type="button" className={styles.clearSearch} aria-label="Limpar pesquisa" onClick={() => { setSearch(""); searchRef.current?.focus(); }}>×</button>}
          </div>
          <label className={styles.videoFilter}>
            <input type="checkbox" checked={withVideo} onChange={(event) => setWithVideo(event.target.checked)} />
            <PlayIcon /> Com vídeo
          </label>
        </div>
        <div className={styles.years} role="group" aria-label="Filtrar oradores por edição">
          <button type="button" aria-pressed={year === "all"} onClick={() => setYear("all")}>Todos <span>{speakers.length}</span></button>
          {years.map((value) => <button type="button" key={value} aria-pressed={year === value} onClick={() => setYear(value)}>{value} <span>{speakers.filter((speaker) => speaker.year === value).length}</span></button>)}
        </div>
      </div>
      <div className={styles.summary}>
        <div className={styles.resultSummary}>
          <p role="status" aria-live="polite" aria-atomic="true"><strong>{visible.length}</strong> {visible.length === 1 ? "perfil" : "perfis"}{year !== "all" && ` de ${year}`}{search.trim() && ` para “${search.trim()}”`}{withVideo && " com vídeo"}</p>
          {filtered && <button type="button" className={styles.reset} onClick={reset}>Limpar filtros</button>}
        </div>
        <div className={styles.sort}>
          <label htmlFor={sortId}>Ordenar</label>
          <select id={sortId} value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="name">Nome A–Z</option><option value="recent">Edição mais recente</option><option value="oldest">Primeiras edições</option>
          </select>
        </div>
      </div>
      <ul className={styles.list} id={resultsId}>
        {visible.map((speaker) => (
          <li key={speaker.id} data-speaker-card data-year={speaker.year}>
            <article className={styles.person}>
              <SpeakerPortrait speaker={speaker} />
              <div className={styles.copy}>
                <p className={styles.year}>TEDxSãoTomé {speaker.year}</p>
                <h2><button type="button" className={styles.profileButton} aria-label={`Conhecer ${speaker.name}`} aria-haspopup="dialog" onClick={(event) => openProfile(speaker, event.currentTarget)}>{speaker.name}</button></h2>
                {speaker.role && <p className={styles.role}>{speaker.role}</p>}
                <p className={styles.topic}>{speaker.topic || speaker.bio}</p>
                <span className={styles.readProfile} aria-hidden="true">Conhecer o perfil <span>+</span></span>
              </div>
              <div className={styles.links}>
                <Link href={speaker.editionHref}>Edição de {speaker.year}<span className={styles.hidden}> — {speaker.name}</span></Link>
                {speaker.recording && <button type="button" aria-haspopup="dialog" aria-label={`Ver palestra de ${speaker.name}`} onClick={(event) => openProfile(speaker, event.currentTarget, true)}><PlayIcon /> Ver palestra</button>}
              </div>
            </article>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <div className={styles.empty}><SearchIcon /><h2>Nenhum perfil encontrado.</h2><p>Experimente outro nome ou tema, ou escolha uma edição diferente.</p><button type="button" onClick={reset}>Mostrar todos os perfis</button></div>}
      <p className={styles.note}>Este arquivo inclui oradores, artistas e grupos. As biografias e funções referem-se à edição indicada. Nem todas as apresentações têm gravação disponível.</p>
      <dialog className={styles.dialog} ref={dialogRef} aria-labelledby={dialogTitleId} onClose={() => setSelected(null)} onCancel={() => setSelected(null)} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setSelected(null);
      }}>
        {selected && <>
          <div className={styles.dialogBar}><span>TEDxSãoTomé {selected.year}</span><button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Fechar perfil">Fechar <span aria-hidden="true">×</span></button></div>
          {videoFirst && video}
          <div className={styles.dialogProfile}>
            <SpeakerPortrait speaker={selected} large />
            <div className={styles.dialogCopy}>
              <p className={styles.year}>{selected.theme}</p>
              <h2 id={dialogTitleId}>{selected.name}</h2>
              {selected.role && <p className={styles.dialogRole}>{selected.role}</p>}
              {selected.topic && <p className={styles.dialogTopic}>{selected.topic}</p>}
              <p className={styles.bio}>{selected.bio}</p>
              <div className={styles.dialogLinks}>
                {selected.profileHref && <Link href={selected.profileHref}>Perfil completo</Link>}
                <Link href={selected.editionHref}>Explorar a edição de {selected.year}</Link>
              </div>
            </div>
          </div>
          {!videoFirst && video}
          <p className={styles.dialogNote}>Perfil histórico da edição de {selected.year}.</p>
        </>}
      </dialog>
    </section>
  );
}
