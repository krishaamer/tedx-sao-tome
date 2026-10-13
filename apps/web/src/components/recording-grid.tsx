import Image from "next/image";
import type { Recording } from "@/content/archive";

export function RecordingGrid({ recordings }: { recordings: Recording[] }) {
  return (
    <div className="recording-grid">
      {recordings.map((recording) => (
        <a
          className="recording-card"
          href={`https://www.youtube.com/watch?v=${recording.youtubeId}`}
          key={recording.youtubeId}
          target="_blank"
          rel="noreferrer"
        >
          <div className="recording-card__image">
            <Image
              src={`/images/recordings/${recording.youtubeId}.jpg`}
              alt=""
              width={480}
              height={360}
              sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 33vw"
            />
            <span className="recording-card__play" aria-hidden="true">▶</span>
          </div>
          <div className="recording-card__copy">
            <p className="section-kicker">TEDxSãoTomé {recording.year}</p>
            <h3>{recording.title}</h3>
            <p>{recording.speaker}</p>
            <span className="text-link">Ver no YouTube ↗</span>
          </div>
        </a>
      ))}
    </div>
  );
}
