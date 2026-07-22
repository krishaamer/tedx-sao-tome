import Link from "next/link";
import { navItems } from "@/content/2018";

type SiteNavProps = {
  compact?: boolean;
};

export function SiteNav({ compact = false }: SiteNavProps) {
  return (
    <header className={`site-nav${compact ? " site-nav--static" : ""}`} id={compact ? undefined : "menu"}>
      <nav className="container site-nav__inner" aria-label="Navegação principal">
        <Link className="site-nav__brand" href="/" aria-label="TEDxSãoTomé">
          <span className="brand-logo" aria-hidden="true" />
        </Link>
        {compact ? (
          <Link href="/#speakers">Oradores</Link>
        ) : (
          <div className="site-nav__links">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
