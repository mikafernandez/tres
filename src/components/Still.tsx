"use client";

import { stillUrl } from "@/lib/frames";
import { useAssets } from "./Assets";

/**
 * Zeigt ein Foto aus /public/renders/, wenn es dort liegt.
 * Fehlt es, bleibt die gezeichnete Alternative stehen — die Seite
 * ist also vollständig, bevor das erste Bild existiert.
 */
export default function Still({
  name,
  alt,
  className = "",
  children,
}: {
  name: string;
  alt: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { stills } = useAssets();

  if (!stills.includes(name)) return <>{children}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Masse der eingelegten Bilder ist nicht bekannt
    <img
      src={stillUrl(name)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
