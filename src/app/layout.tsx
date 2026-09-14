import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { manifest } from "@/lib/assets";

/* Eine Familie in drei Breiten trägt die ganze Seite,
   eine zweite nur den Fließtext. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tres.example"),
  title: {
    default: "TRES — Salz oben. Limette unten. Tequila dazwischen.",
    template: "%s — TRES",
  },
  description:
    "Ein 20-ml-Tequila-Shot, der Salz und Limette in zwei eigenen Kammern mitbringt: im Schraubverschluss und im Flaschenboden. Zum Patent angemeldet.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "TRES",
    title: "TRES — der ganze Shot in einem Behälter",
    description:
      "Salz im Deckel, Limette im Boden, 20 ml Tequila dazwischen. Drei Behältnisse werden eins.",
    /* wird gesetzt, sobald public/renders/og.webp vorhanden ist */
    images: manifest.stills.includes("og")
      ? [{ url: "/renders/og.webp", width: 1200, height: 630 }]
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#101713",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${archivo.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-limestone text-ink">
        <SmoothScroll />
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-2 focus:text-salt"
        >
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}
