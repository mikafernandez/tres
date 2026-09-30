"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------
   Schnitt durch den Behälterboden. Eine Einheit im Bild ist ein
   Millimeter am Bauteil. Ursprung: Mitte der Aufstandsebene des
   Standrings; y zeigt nach oben, im SVG also ins Negative.

   Die Behälterwand ist eine durchgehende Kontur: aussen am Mantel
   herunter, um den Standring herum, über die Siegelfläche nach innen
   und als Kegelstumpf wieder hinauf bis zur Kuppe des Bodeneinzugs.
   ------------------------------------------------------------------ */

const R_OUT = 15; // Standring aussen
const R_RING_I = 13.5; // Standring innen = Siegelfläche aussen
const R_SEAL_I = 11.5; // lichte Weite des Einzugs, Ø 23 mm
const R_APEX = 9.6; // Radius an der Kuppe, 7 Grad Neigung
const SEAL_Y = -1.0; // Siegelfläche liegt 1,0 mm zurück
const APEX_Y = SEAL_Y - 15.5; // Tiefe 15,5 mm
const WALL = 0.62; // Wandstärke, überzeichnet
const HALF = WALL / 2;
const FOIL = 0.5; // Folie, überzeichnet (tatsächlich 62 µm)
const TOP = -23; // oberer Bildrand
const LEVEL = APEX_Y + 1.5; // 5,0 ml in einer Kammer von rund 5,4 ml

export default function BaseDrawing({
  peeled,
  active,
  className = "",
}: {
  peeled: boolean;
  active: string | null;
  className?: string;
}) {
  const foil = useRef<SVGGElement>(null);

  /* Die Folie wird an der Lasche abgezogen, nicht abgehoben. */
  useEffect(() => {
    if (!foil.current) return;
    gsap.to(foil.current, {
      rotate: peeled ? 58 : 0,
      duration: prefersReducedMotion() ? 0 : 0.8,
      ease: peeled ? "power3.out" : "power3.inOut",
      svgOrigin: `${-R_RING_I} ${SEAL_Y + FOIL / 2}`,
    });
  }, [peeled]);

  const on = (r: string) => active === r;
  const fill = (r: string, base: string) => (on(r) ? "var(--color-gold)" : base);

  return (
    <svg
      viewBox="-25 -24 50 29"
      className={className}
      role="img"
      aria-label="Schnitt durch den Behälterboden mit Bodeneinzug, Bodenkammer und aufgesiegelter Folie"
    >
      {/* Spirituose im Behälterinnenraum */}
      <path d={interior()} fill="var(--color-gold)" opacity="0.28" />

      {/* Zusatzflüssigkeit in der Bodenkammer */}
      <path
        d={chamber()}
        fill={fill("130", "var(--color-lime)")}
        opacity={on("130") ? 0.85 : 0.92}
      />

      {/* Behälterwand */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={contour(s as 1 | -1)}
          fill="none"
          stroke={fill("80", "var(--color-ink)")}
          strokeWidth={WALL}
          strokeLinejoin="round"
          strokeLinecap="butt"
        />
      ))}

      {/* Standring hervorheben */}
      {on("90") &&
        [-1, 1].map((s) => (
          <rect
            key={s}
            x={s < 0 ? -R_OUT - HALF : R_RING_I - HALF}
            y={SEAL_Y}
            width={R_OUT - R_RING_I + WALL}
            height={Math.abs(SEAL_Y)}
            fill="var(--color-gold)"
            opacity="0.55"
          />
        ))}

      {/* Siegelfolie mit Naht und Aufreißlasche */}
      <g ref={foil}>
        <rect
          x={-R_RING_I}
          y={SEAL_Y}
          width={R_RING_I * 2}
          height={FOIL}
          fill={fill("110", "var(--color-agave)")}
        />
        {[-1, 1].map((s) => (
          <rect
            key={s}
            x={s < 0 ? -R_RING_I : R_SEAL_I}
            y={SEAL_Y}
            width={R_RING_I - R_SEAL_I}
            height={FOIL}
            fill={fill("100", "var(--color-agave-ink)")}
          />
        ))}
        {/* Lasche, 20 mm lang, nach innen auf die Folie zurückgelegt;
            sie endet innerhalb des Standrings */}
        <path
          d={`M ${R_RING_I} ${SEAL_Y + FOIL}
              L ${R_RING_I - 1.1} ${SEAL_Y + FOIL + 0.75}
              L ${R_RING_I - 20} ${SEAL_Y + FOIL + 0.75}
              L ${R_RING_I - 20} ${SEAL_Y + FOIL} Z`}
          fill={fill("120", "var(--color-agave)")}
        />
      </g>

      {/* Aufstandsebene */}
      <line
        x1={-R_OUT - 4}
        y1="0"
        x2={R_OUT + 4}
        y2="0"
        stroke="var(--color-ink)"
        strokeWidth="0.22"
        opacity="0.4"
      />

      {/* Mittelachse */}
      <line
        x1="0"
        y1={TOP}
        x2="0"
        y2="2.5"
        stroke="var(--color-ink)"
        strokeWidth="0.16"
        strokeDasharray="2.4 1.1 0.5 1.1"
        opacity="0.45"
      />

      {/* Die Siegelfläche liegt 1,0 mm hinter der Aufstandsebene zurück */}
      <g stroke="var(--color-ink)" strokeWidth="0.16" opacity="0.65">
        <line x1="-17.4" y1="0" x2="-17.4" y2={SEAL_Y} />
        <line x1="-18.4" y1="0" x2="-16.4" y2="0" />
        <line x1="-18.4" y1={SEAL_Y} x2="-16.4" y2={SEAL_Y} />
        <line x1="-16.4" y1={SEAL_Y} x2="-13.4" y2={SEAL_Y} opacity="0.4" />
      </g>
      <text
        x="-18.9"
        y={SEAL_Y + 0.3}
        textAnchor="end"
        className="t-num"
        fontSize="1.9"
        fill="var(--color-ink-2)"
      >
        1,0
      </text>

      {/* Tiefe des Bodeneinzugs */}
      <g stroke="var(--color-ink)" strokeWidth="0.16" opacity="0.65">
        <line x1={R_OUT + 3} y1={SEAL_Y} x2={R_OUT + 3} y2={APEX_Y} />
        <line x1={R_OUT + 2} y1={SEAL_Y} x2={R_OUT + 4} y2={SEAL_Y} />
        <line x1={R_OUT + 2} y1={APEX_Y} x2={R_OUT + 4} y2={APEX_Y} />
      </g>
      <text
        x={R_OUT + 4.8}
        y={(SEAL_Y + APEX_Y) / 2 + 0.7}
        className="t-num"
        fontSize="1.9"
        fill="var(--color-ink-2)"
      >
        15,5
      </text>

      {/* lichte Weite der Öffnung */}
      <g stroke="var(--color-ink)" strokeWidth="0.16" opacity="0.65">
        <line x1={-R_SEAL_I} y1="4" x2={R_SEAL_I} y2="4" />
        <line x1={-R_SEAL_I} y1="1" x2={-R_SEAL_I} y2="4.6" />
        <line x1={R_SEAL_I} y1="1" x2={R_SEAL_I} y2="4.6" />
      </g>
      <text
        x="0"
        y="3.4"
        textAnchor="middle"
        className="t-num"
        fontSize="1.9"
        fill="var(--color-ink-2)"
      >
        Ø 23
      </text>
    </svg>
  );
}

/* Radius der Wandmitte auf der Höhe y, innerhalb des Kegelstumpfs */
function coneR(y: number): number {
  const t = (SEAL_Y - y) / (SEAL_Y - APEX_Y);
  return R_SEAL_I + (R_APEX - R_SEAL_I) * t;
}

/* Kontur der Behälterwand, eine Seite */
function contour(side: 1 | -1): string {
  return [
    `M 0 ${APEX_Y}`,
    `L ${side * R_APEX} ${APEX_Y}`,
    `L ${side * R_SEAL_I} ${SEAL_Y}`,
    `L ${side * R_RING_I} ${SEAL_Y}`,
    `L ${side * R_RING_I} 0`,
    `L ${side * R_OUT} 0`,
    `L ${side * R_OUT} ${TOP}`,
  ].join(" ");
}

/* Behälterinnenraum: über der Kuppe und im Ring um den Einzug */
function interior(): string {
  const wallIn = R_OUT - WALL;
  const apex = APEX_Y - HALF;
  const flange = SEAL_Y - HALF;
  const pts: string[] = [`M ${-wallIn} ${TOP}`, `L ${-wallIn} ${flange}`];
  /* am Ring entlang nach innen und aussen um den Kegelstumpf herum */
  pts.push(`L ${-(coneR(SEAL_Y) + HALF)} ${flange}`);
  for (let y = SEAL_Y; y >= APEX_Y; y -= 0.5)
    pts.push(`L ${-(coneR(y) + HALF)} ${y}`);
  pts.push(`L ${coneR(APEX_Y) + HALF} ${apex}`);
  for (let y = APEX_Y; y <= SEAL_Y; y += 0.5)
    pts.push(`L ${coneR(y) + HALF} ${y}`);
  pts.push(`L ${wallIn} ${flange}`, `L ${wallIn} ${TOP}`, "Z");
  return pts.join(" ");
}

/* Bodenkammer bis zum Pegel */
function chamber(): string {
  const pts: string[] = [`M ${-(coneR(LEVEL) - HALF)} ${LEVEL}`];
  for (let y = LEVEL; y <= SEAL_Y; y += 0.5)
    pts.push(`L ${-(coneR(y) - HALF)} ${y}`);
  pts.push(`L ${coneR(SEAL_Y) - HALF} ${SEAL_Y}`);
  for (let y = SEAL_Y; y >= LEVEL; y -= 0.5)
    pts.push(`L ${coneR(y) - HALF} ${y}`);
  pts.push("Z");
  return pts.join(" ");
}
