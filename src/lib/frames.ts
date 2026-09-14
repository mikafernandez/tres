/* ============================================================
   Bildsequenz für die 360-Grad-Ansicht.

   Die Seite sucht beim Laden nach /renders/spin/spin_0001.webp.
   Findet sie die Datei, wird die komplette Sequenz nachgeladen und
   verwendet. Findet sie nichts, zeichnet lib/bottle.ts die Flasche
   selbst. Es ist also kein Schalter nötig: Bilder in den Ordner
   legen genügt.

   Erwartetes Namensschema (1-basiert, vierstellig):
     /public/renders/spin/spin_0001.webp … spin_0036.webp
   ============================================================ */

export const SPIN = {
  count: 36, // ein Bild alle 10 Grad
  dir: "/renders/spin",
  prefix: "spin_",
  ext: "webp",
  pad: 4,
} as const;

export function spinFrameUrl(index1: number): string {
  const n = String(index1).padStart(SPIN.pad, "0");
  return `${SPIN.dir}/${SPIN.prefix}${n}.${SPIN.ext}`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`missing ${src}`));
    img.src = src;
  });
}

let cache: Promise<HTMLImageElement[] | null> | null = null;

/**
 * Lädt die Sequenz einmalig. `count` stammt aus dem serverseitig
 * gelesenen Verzeichnis, es wird also nichts auf Verdacht angefragt.
 */
export function loadSpinFrames(count: number): Promise<HTMLImageElement[] | null> {
  if (count < 2) return Promise.resolve(null);
  if (cache) return cache;
  cache = (async () => {
    const loaded = await Promise.all(
      Array.from({ length: count }, (_, i) =>
        loadImage(spinFrameUrl(i + 1)).catch(() => null),
      ),
    );
    const frames = loaded.filter((f): f is HTMLImageElement => !!f);
    return frames.length >= 2 ? frames : null;
  })();
  return cache;
}

/* ------------------------------------------------------------
   Einzelbilder. Gleiches Prinzip: liegt die Datei, wird sie
   benutzt; sonst zeigt die Seite ihre gezeichnete Alternative.
   ------------------------------------------------------------ */

export const STILLS = {
  dir: "/renders",
  ext: "webp",
} as const;

export function stillUrl(name: string): string {
  return `${STILLS.dir}/${name}.${STILLS.ext}`;
}
