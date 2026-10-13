"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { Recording } from "@/content/archive";
import styles from "./recording-grid.module.css";

type WatchRecording = Recording & {
  id?: string;
  sourceUrl?: string;
  embedUrl?: string;
  thumbnail?: string;
  label?: string;
};

function recordingId(recording: WatchRecording) {
  return recording.id ?? recording.youtubeId ?? recording.embedUrl ?? `${recording.speaker}-${recording.title}`;
}

function thumbnail(recording: WatchRecording) {
  return recording.thumbnail ?? (recording.youtubeId ? `/images/recordings/${recording.youtubeId}.jpg` : "/images/2013.jpg");
}

function sourceUrl(recording: WatchRecording) {
  return recording.sourceUrl ?? (recording.youtubeId ? `https://www.youtube.com/watch?v=${recording.youtubeId}` : undefined);
}

function embedUrl(recording: WatchRecording) {
  if (recording.embedUrl) {
    const url = new URL(recording.embedUrl);
    url.searchParams.set("autoplay", "1");
    return url.toString();
  }

  return recording.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${recording.youtubeId}?autoplay=1&playsinline=1&rel=0&hl=pt&controls=1&disablekb=0`
    : undefined;
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 4.5v15L20 12 8 4.5Z" />
    </svg>
  );
}

export function RecordingGrid({ recordings }: { recordings: Recording[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [filterYear, setFilterYear] = useState("all");
  const [search, setSearch] = useState("");
  const playerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const queueId = useId();
  const searchId = useId();
  const activeIndex = Math.min(selectedIndex, Math.max(0, recordings.length - 1));
  const selected = recordings[activeIndex] as WatchRecording | undefined;
  const years = [...new Set(recordings.map((recording) => recording.year))].sort();
  const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt");
  const query = normalize(search.trim());
  const queueIndices = recordings.flatMap((recording, index) =>
    (filterYear === "all" || recording.year === filterYear) &&
    normalize(`${recording.speaker} ${recording.title} ${recording.year} ${recording.label ?? ""}`).includes(query) ? [index] : []);
  const nextIndex = queueIndices[queueIndices.indexOf(activeIndex) + 1];

  useEffect(() => {
    if (!playerLoaded) return;

    playerRef.current?.focus({ preventScroll: true });
    if (window.matchMedia("(max-width: 760px)").matches) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      playerRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  }, [activeIndex, playerLoaded]);

  if (!selected) return null;

  function selectRecording(index: number) {
    setSelectedIndex(index);
    setPlayerLoaded(true);
  }

  const originalUrl = sourceUrl(selected);

  return (
    <div className={`${styles.watch}${recordings.length === 1 ? ` ${styles.single}` : ""}`}>
      <div className={styles.featured}>
        <div
          className={styles.player}
          ref={playerRef}
          tabIndex={-1}
          role="region"
          aria-label={`Leitor de vídeo: ${selected.title}`}
        >
          {playerLoaded ? (
            <iframe
              key={recordingId(selected)}
              className={styles.iframe}
              src={embedUrl(selected)}
              title={`${selected.title} — ${selected.speaker}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              className={styles.poster}
              type="button"
              onClick={() => selectRecording(activeIndex)}
              aria-label={`Reproduzir ${selected.title}, de ${selected.speaker}, nesta página`}
            >
              <Image
                src={thumbnail(selected)}
                alt=""
                fill
                sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1240px) 64vw, 780px"
              />
              <span className={styles.posterShade} aria-hidden="true" />
              <span className={styles.playPrompt}>
                <span className={styles.playCircle}><PlayIcon /></span>
                <span>Ver a palestra</span>
              </span>
            </button>
          )}
        </div>

        <div className={styles.details}>
          <p className={styles.edition}>{selected.label ?? `TEDxSãoTomé ${selected.year}`}</p>
          <h3 id={titleId} className={styles.title}>{selected.title}</h3>
          <p className={styles.speaker}>{selected.speaker}</p>
          <div className={styles.actions}>
            {nextIndex !== undefined && (
              <button
                className={styles.next}
                type="button"
                onClick={() => selectRecording(nextIndex)}
                aria-label={`Ver a próxima palestra: ${recordings[nextIndex].title}, de ${recordings[nextIndex].speaker}`}
              >
                <PlayIcon />
                Ver a próxima
              </button>
            )}
            {originalUrl && (
              <a className={styles.source} href={originalUrl} target="_blank" rel="noreferrer">
                Abrir na fonte original <span aria-hidden="true">↗</span>
                <span className={styles.visuallyHidden}> (abre num novo separador)</span>
              </a>
            )}
          </div>
          <p className={styles.help}>
            {playerLoaded
              ? "Se o vídeo não reproduzir, abra-o na fonte original."
              : "O leitor externo só é carregado quando escolhe reproduzir um vídeo."}
          </p>
        </div>
      </div>

      {recordings.length > 1 && (
        <aside className={styles.queue} aria-labelledby={queueId}>
          <div className={styles.queueHeading}>
            <h3 id={queueId}>Mais palestras</h3>
            <span role="status" aria-live="polite">{queueIndices.length} vídeos</span>
          </div>
          <div className={styles.search}>
            <label htmlFor={searchId}>Procurar um nome ou uma ideia</label>
            <input id={searchId} type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Orador ou título" />
          </div>
          {years.length > 1 && (
            <div className={styles.filters} role="group" aria-label="Filtrar palestras por edição">
              <button
                type="button"
                className={styles.filter}
                aria-pressed={filterYear === "all"}
                aria-label="Mostrar palestras de todas as edições"
                onClick={() => setFilterYear("all")}
              >Todas</button>
              {years.map((year) => (
                <button
                  type="button"
                  className={styles.filter}
                  aria-pressed={filterYear === year}
                  aria-label={`Mostrar palestras de ${year}`}
                  onClick={() => setFilterYear(year)}
                  key={year}
                >{year}</button>
              ))}
            </div>
          )}
          <ul className={styles.queueList}>
            {queueIndices.map((index) => {
              const recording = recordings[index] as WatchRecording;
              const isSelected = index === activeIndex;

              return (
                <li key={recordingId(recording)}>
                  <button
                    className={`${styles.queueButton}${isSelected ? ` ${styles.selected}` : ""}`}
                    type="button"
                    onClick={() => selectRecording(index)}
                    aria-pressed={isSelected}
                    aria-label={`Reproduzir ${recording.title}, de ${recording.speaker}, ${recording.label ?? `TEDxSãoTomé ${recording.year}`}`}
                  >
                    <span className={styles.queueImage}>
                      <Image src={thumbnail(recording)} alt="" fill sizes="(max-width: 380px) 96px, 120px" />
                      <span className={styles.queuePlay} aria-hidden="true"><PlayIcon /></span>
                    </span>
                    <span className={styles.queueCopy}>
                      <span className={styles.queueTitle}>{recording.title}</span>
                      <span className={styles.queueSpeaker}>{recording.speaker}</span>
                      <span className={styles.queueYear}>{recording.year}{isSelected && " · Selecionado"}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {queueIndices.length === 0 && (
            <div className={styles.empty}>
              <p>Não encontrámos vídeos com estes filtros.</p>
              <button type="button" onClick={() => { setSearch(""); setFilterYear("all"); }}>Limpar filtros</button>
            </div>
          )}
          {!queueIndices.includes(activeIndex) && (
            <p className={styles.filterNote}>O vídeo selecionado continua no leitor. Escolha outra miniatura para mudar.</p>
          )}
        </aside>
      )}

      <p className={styles.visuallyHidden} role="status" aria-live="polite" aria-atomic="true">
        {playerLoaded ? `Vídeo selecionado: ${selected.title}, de ${selected.speaker}. O leitor está aberto nesta página.` : ""}
      </p>
      <noscript>
        <div className={styles.noScript}>
          <p>Para assistir dentro do site, ative JavaScript. Também pode abrir as palestras na fonte original:</p>
          <ul>
            {recordings.map((recording) => (
              <li key={recordingId(recording)}><a href={sourceUrl(recording)}>{recording.title} — {recording.speaker}</a></li>
            ))}
          </ul>
        </div>
      </noscript>
    </div>
  );
}
