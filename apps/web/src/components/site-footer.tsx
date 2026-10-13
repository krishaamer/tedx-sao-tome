import Image from "next/image";
import Link from "next/link";
import { footerLinks, socialLinks } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Image
            className="brand-logo"
            src="/images/tedxsaotome-logo.svg"
            alt="TEDxSãoTomé"
            width={220}
            height={55}
          />
          <p>Ideias, pessoas e memórias das edições do TEDxSãoTomé.</p>
          <small>Este evento TEDx independente foi realizado sob licença TED.</small>
        </div>
        <div>
          <h2>Navegação</h2>
          <nav className="site-footer__links" aria-label="Navegação do rodapé">
            {footerLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>Social</h2>
          <p>Reencontre a comunidade TEDxSãoTomé nas redes sociais.</p>
          <div className="social-links">
            {socialLinks.map((item) => (
              <a href={item.href} key={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                <span aria-hidden="true">{item.short}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container site-footer__base">
        <span>TEDxSãoTomé</span>
        <Link href="#menu">Voltar ao topo ↑</Link>
      </div>
    </footer>
  );
}
