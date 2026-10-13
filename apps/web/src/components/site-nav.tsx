"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { navItems } from "@/content/site";

type NavLinksProps = {
  className: string;
  id?: string;
  onNavigate?: () => void;
};

function NavLinks({ className, id, onNavigate }: NavLinksProps) {
  return (
    <div className={className} id={id}>
      {navItems.map((item) => (
        <Link href={item.href} key={item.href} onClick={onNavigate}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="site-nav"
      id="menu"
      onKeyDown={(event) => {
        if (event.key === "Escape" && mobileOpen) {
          setMobileOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <nav className="container site-nav__inner" aria-label="Navegação principal">
        <Link
          className="site-nav__brand"
          href="/"
          aria-label="TEDxSãoTomé"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            className="brand-logo"
            src="/images/tedxsaotome-logo.svg"
            alt="TEDxSãoTomé"
            width={220}
            height={55}
            preload
          />
          <span className="site-nav__edition">Ideias das ilhas</span>
        </Link>
        <NavLinks className="site-nav__links site-nav__links--desktop" />
        <button
          className="site-nav__toggle"
          type="button"
          ref={toggleRef}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Fechar" : "Menu"}
        </button>
        <NavLinks
          className={`site-nav__links site-nav__links--mobile${mobileOpen ? " is-open" : ""}`}
          id="mobile-navigation"
          onNavigate={() => setMobileOpen(false)}
        />
      </nav>
    </header>
  );
}
