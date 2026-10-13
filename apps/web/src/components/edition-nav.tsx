import Link from "next/link";
import { editionPath, editions } from "@/content/archive";

export function EditionNav({ year }: { year?: string }) {
  return (
    <nav className="edition-nav" aria-label="Escolher uma edição do arquivo">
      <span>Edições</span>
      <div>
        {editions.map((edition) => (
          <Link href={editionPath(edition.year)} key={edition.year} aria-current={year === edition.year ? "page" : undefined}>
            {edition.year}
          </Link>
        ))}
      </div>
    </nav>
  );
}
