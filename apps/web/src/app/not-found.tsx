import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="not-found" id="main-content">
        <div className="container not-found__content">
          <p className="section-kicker">Erro 404</p>
          <h1>Esta ideia não está no palco.</h1>
          <p>A página que procura não faz parte deste arquivo.</p>
          <Link className="button button--primary" href="/">
            Voltar ao início
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
