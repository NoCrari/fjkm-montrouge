"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";
import type { Img } from "@/lib/types";

/** Redimensionnement directement par le CDN d'images de Sanity. */
const sanityLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?w=${width}&q=${quality ?? 75}&auto=format&fit=max`;

type Props = Omit<ImageProps, "src" | "alt" | "loader" | "width" | "height"> & { image: Img };

export function CmsImage({ image, style, fill, ...rest }: Props) {
  const alt = image.alt ?? "";
  const commun = {
    fill,
    style: image.hotspot
      ? { objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`, ...style }
      : style,
    ...(fill ? {} : { width: image.width ?? 1200, height: image.height ?? 800 }),
    ...rest,
  };

  if (image.url.startsWith("https://cdn.sanity.io/")) {
    return <Image src={image.url} alt={alt} loader={sanityLoader} {...commun} />;
  }
  if (image.url.startsWith("https://i.ytimg.com/")) {
    // Optimisée et servie par le site : le navigateur du visiteur ne contacte pas YouTube.
    return <Image src={image.url} alt={alt} {...commun} />;
  }
  // Images d'exemple (SVG locaux)
  return <Image src={image.url} alt={alt} unoptimized {...commun} />;
}
