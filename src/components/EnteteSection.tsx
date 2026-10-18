import Link from "next/link";

export function EnteteSection({
  id,
  titre,
  intro,
  lien,
}: {
  id: string;
  titre: string;
  intro?: string;
  lien?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id={id} className="titre-section">
          {titre}
        </h2>
        {intro && <p className="text-texte-doux">{intro}</p>}
      </div>
      {lien && (
        <Link href={lien.href} className="font-semibold text-marine underline underline-offset-4 hover:no-underline">
          {lien.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

/** Bandeau de titre des pages intérieures. */
export function EntetePage({ titre, intro, surtitre }: { titre: string; intro?: string; surtitre?: React.ReactNode }) {
  return (
    <div className="bg-ciel-clair">
      <div className="conteneur py-10 md:py-14">
        {surtitre && <div className="mb-2">{surtitre}</div>}
        <h1 className="text-[clamp(2.25rem,6vw,3.5rem)]">{titre}</h1>
        {intro && <p className="mt-3 max-w-2xl text-lg text-texte">{intro}</p>}
      </div>
    </div>
  );
}
