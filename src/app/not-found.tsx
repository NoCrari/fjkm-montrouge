import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function PageIntrouvable() {
  return (
    <>
      <Header />
      <main id="contenu" className="flex-1 bg-ciel-clair">
        <div className="conteneur py-20 text-center">
          <p className="etiquette">Erreur 404</p>
          <h1 className="mt-3 text-[clamp(2.25rem,6vw,3.5rem)]">Page introuvable</h1>
          <p className="mx-auto mt-4 max-w-md text-lg">
            Cette page n&apos;existe pas ou a été déplacée.
          </p>
          <Link href="/" className="btn btn-contour mt-8">
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
