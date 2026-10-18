import type { Metadata } from "next";
import { DM_Serif_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "FJKM Montrouge-Paris Fiorenana",
    template: "%s · FJKM Montrouge-Paris Fiorenana",
  },
  description:
    "Site de l'église FJKM Montrouge-Paris Fiorenana : actualités, photos et vidéos, culte en direct et informations pratiques.",
  openGraph: {
    siteName: "FJKM Montrouge-Paris Fiorenana",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${dmSerif.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
