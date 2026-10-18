"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconeFermer, IconeMenu, PointLive } from "./Icones";

const LIENS = [
  { href: "/", label: "Accueil" },
  { href: "/news", label: "News" },
  { href: "/medias", label: "Médias" },
  { href: "/live", label: "Live" },
  { href: "/contact", label: "Contact" },
];

function estActif(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function NavPrincipale() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  // Touche Échap pour refermer le menu mobile
  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [ouvert]);

  const boutonLive = (
    <Link href="/live" className="btn btn-rouge min-h-10 px-4 py-2 text-[0.95rem]" onClick={() => setOuvert(false)}>
      <PointLive />
      Live
    </Link>
  );

  return (
    <>
      {/* Ordinateur */}
      <nav aria-label="Menu principal" className="hidden items-center gap-1 md:flex">
        <ul className="flex items-center gap-1">
          {LIENS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={estActif(pathname, l.href) ? "page" : undefined}
                className="rounded-full px-3 py-2 font-semibold text-white/90 hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/15 aria-[current=page]:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-3">{boutonLive}</div>
      </nav>

      {/* Téléphone */}
      <div className="flex items-center gap-2 md:hidden">
        {boutonLive}
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? <IconeFermer width={24} height={24} /> : <IconeMenu width={24} height={24} />}
          <span className="sr-only">{ouvert ? "Fermer le menu" : "Ouvrir le menu"}</span>
        </button>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu principal"
        hidden={!ouvert}
        className="absolute inset-x-0 top-full border-t border-white/10 bg-marine shadow-lg md:hidden"
      >
        <ul className="conteneur flex flex-col py-3">
          {LIENS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={estActif(pathname, l.href) ? "page" : undefined}
                onClick={() => setOuvert(false)}
                className="block rounded-lg px-3 py-3 text-lg font-semibold text-white hover:bg-white/10 aria-[current=page]:bg-white/15"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
