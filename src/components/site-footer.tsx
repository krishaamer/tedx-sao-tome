import Link from "next/link";
import { navItems, socialLinks } from "@/content/2018";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="container site-footer__grid">
        <div>
          <span className="brand-logo" aria-label="TEDxSãoTomé" role="img" />
          <p>This independent TEDx event is operated under license from TED.</p>
        </div>
        <div>
          <h2>Navegação</h2>
          <nav className="site-footer__links" aria-label="Navegação do rodapé">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>Social</h2>
          <p>Siga-nos nas mídias sociais para receber atualizações sobre o evento.</p>
          <div className="social-links">
            {socialLinks.map((item) => (
              <a href={item.href} key={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                {item.short}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
