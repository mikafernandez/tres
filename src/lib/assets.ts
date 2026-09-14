import { readdirSync } from "node:fs";
import path from "node:path";

/* ------------------------------------------------------------------
   Welche Renderings liegen tatsächlich in /public/renders/?

   Der Ordner wird beim Start des Servers einmal gelesen. Was fehlt,
   ersetzt die Seite durch ihre gezeichnete Alternative - es gibt also
   keine kaputten Bilder und keine 404er in der Konsole.

   Nach dem Einlegen neuer Bilder den Dev-Server neu starten
   (beziehungsweise neu deployen). `npm run renders` zeigt an,
   was gefunden wurde.
   ------------------------------------------------------------------ */

export type Manifest = {
  /** Anzahl gefundener Bilder der 360-Grad-Sequenz */
  spin: number;
  /** Dateinamen ohne Endung, z. B. "ritual-01" */
  stills: string[];
};

const RENDERS = path.join(process.cwd(), "public", "renders");
const IMAGE = /\.(webp|png|jpg|jpeg|avif)$/i;

function safeList(dir: string): string[] {
  try {
    return readdirSync(dir);
  } catch {
    return [];
  }
}

export function readManifest(): Manifest {
  const spin = safeList(path.join(RENDERS, "spin")).filter(
    (f) => IMAGE.test(f) && f.startsWith("spin_"),
  ).length;

  const stills = safeList(RENDERS)
    .filter((f) => IMAGE.test(f))
    .map((f) => f.replace(IMAGE, ""));

  return { spin, stills };
}

/* einmal pro Serverstart */
export const manifest: Manifest = readManifest();
