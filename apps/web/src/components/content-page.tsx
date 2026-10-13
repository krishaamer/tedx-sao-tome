import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export function ContentPage({
  kicker,
  title,
  introduction,
  children,
  compact = false,
  backHref = "/",
  backLabel = "TEDxSãoTomé",
}: {
  kicker: string;
  title: string;
  introduction: string;
  children: ReactNode;
  compact?: boolean;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        <header className={`page-intro${compact ? " page-intro--compact" : ""}`}>
          <div className="container">
            <Link className="page-intro__back" href={backHref}>← {backLabel}</Link>
            <p className="section-kicker">{kicker}</p>
            <h1>{title}</h1>
            <p className="page-intro__description">{introduction}</p>
          </div>
        </header>
        <div className="container page-content">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
