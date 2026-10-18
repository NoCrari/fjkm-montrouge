import Link from "next/link";
import { NavPrincipale } from "./NavPrincipale";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-marine text-white">
      <div className="conteneur relative flex min-h-18 items-center justify-between gap-4 py-2">
        <Link href="/" className="flex flex-col leading-tight no-underline">
          {/* À remplacer par le logo quand il sera disponible */}
          <span className="font-serif text-xl text-white sm:text-2xl">FJKM Montrouge-Paris</span>
          <span className="text-sm font-semibold tracking-[0.12em] text-ciel uppercase">Fiorenana</span>
        </Link>
        <NavPrincipale />
      </div>
    </header>
  );
}
