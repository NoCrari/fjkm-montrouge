import Link from "next/link";
import { getAnnee, getParametres } from "@/lib/data";
import { A_REMPLIR } from "@/lib/placeholders";
import { LiensReseaux } from "./LiensReseaux";

export async function Footer() {
  const [p, annee] = await Promise.all([getParametres(), getAnnee()]);

  return (
    <footer className="bg-marine text-white">
      <div className="conteneur grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">FJKM Montrouge-Paris</p>
          <p className="text-sm font-semibold tracking-[0.12em] text-ciel uppercase">Fiorenana</p>
          <p className="mt-3 whitespace-pre-line text-white/85">{p.adresse ?? A_REMPLIR.adresse}</p>
        </div>
        <nav aria-label="Liens du pied de page">
          <ul className="space-y-2">
            <li><Link href="/news" className="hover:underline">News</Link></li>
            <li><Link href="/medias" className="hover:underline">Médias</Link></li>
            <li><Link href="/live" className="hover:underline">Live</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact / Nous trouver</Link></li>
            <li><Link href="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
          </ul>
        </nav>
        <div>
          <p className="mb-3 font-semibold">Suivez-nous</p>
          <LiensReseaux parametres={p} />
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="conteneur flex flex-col gap-2 py-5 text-sm text-white/80 sm:flex-row sm:justify-between">
          <p>© {annee} FJKM Montrouge-Paris Fiorenana</p>
          <p>
            <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
            {" · "}
            <Link href="/admin" prefetch={false} className="hover:underline">Espace bénévoles</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
