import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export function ContentPage({
  kicker,
  title,
  introduction,
  children,
}: {
  kicker: string;
  title: string;
  introduction: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        <header className="page-intro">
          <div className="container">
            <Link className="page-intro__back" href="/">← TEDxSãoTomé</Link>
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
