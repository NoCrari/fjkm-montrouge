import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import type { Img } from "@/lib/types";
import { CmsImage } from "./CmsImage";

const composants: PortableTextComponents = {
  types: {
    image: ({ value }: { value: Img & { legende?: string } }) =>
      value?.url ? (
        <figure className="my-8">
          <CmsImage image={value} sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full rounded-carte" />
          {value.legende && <figcaption className="mt-2 text-sm text-texte-doux">{value.legende}</figcaption>}
        </figure>
      ) : null,
  },
  marks: {
    link: ({ value, children }) => {
      const externe = typeof value?.href === "string" && value.href.startsWith("http");
      return (
        <a href={value?.href} {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

export function TexteRiche({ blocs }: { blocs: PortableTextBlock[] }) {
  return (
    <div className="texte-riche text-lg">
      <PortableText value={blocs} components={composants} />
    </div>
  );
}
