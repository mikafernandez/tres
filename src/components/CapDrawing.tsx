"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* Schnitt durch den Schraubverschluss. Eine Einheit im Bild ist ein
   Millimeter am Bauteil; alle Werte stammen aus der Anmeldung.
   Ursprung: Mitte der äußeren Stirnwandfläche, y nach unten. */

const W = 15; // halber Außendurchmesser
const WALL = 1.3; // Mantelwand
const IN = W - WALL; // lichte Weite
const FACE = 1.0; // Stirnwand
const CHAMBER = 4.5; // Unterkante Vorratskammer
const PART = 5.7; // Unterkante Trennwand
const H = 16.5; // Gesamthöhe
const HOLE = 0.9; // halber Öffnungsdurchmesser
const PITCH = 7; // Teilkreisradius
const HINGE = { x: -W + 0.6, y: -0.7 };

export default function CapDrawing({
  open,
  active,
  className = "",
}: {
  open: boolean;
  active: string | null;
  className?: string;
}) {
  const flap = useRef<SVGGElement>(null);

  /* Die Klappe schwenkt um 135 Grad, wie im Ausführungsbeispiel. */
  useEffect(() => {
    if (!flap.current) return;
    const reduced = prefersReducedMotion();
    gsap.to(flap.current, {
      rotate: open ? -135 : 0,
      duration: reduced ? 0 : 0.72,
      ease: open ? "back.out(1.4)" : "power3.inOut",
      svgOrigin: `${HINGE.x} ${HINGE.y}`,
    });
  }, [open]);

  const on = (ref: string) => active === ref;
  const fill = (ref: string, base: string) =>
    on(ref) ? "var(--color-gold)" : base;

  return (
    <svg
      viewBox="-25 -21 50 27"
      className={className}
      role="img"
      aria-label="Längsschnitt durch den Schraubverschluss mit Vorratskammer, Trennwand und Verschlussglied"
    >
      <defs>
        <pattern
          id="hatch"
          width="1.1"
          height="1.1"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="1.1"
            stroke="var(--color-ink)"
            strokeWidth="0.28"
            opacity="0.5"
          />
        </pattern>
      </defs>

      {/* alles auf den Kopf: Stirnwand oben, Gewinde unten */}
      <g transform="translate(0,-16.5)">
        {/* ---- Mittelachse ---- */}
        <line
          x1="0"
          y1="-6"
          x2="0"
          y2={H + 2.5}
          stroke="var(--color-ink)"
          strokeWidth="0.16"
          strokeDasharray="2.4 1.1 0.5 1.1"
          opacity="0.45"
        />

        {/* ---- Vorratskammer mit Speisesalz (200 / 210) ---- */}
        <rect
          x={-IN}
          y={FACE}
          width={IN * 2}
          height={CHAMBER - FACE}
          fill={on("200") ? "rgba(194,130,42,0.22)" : "rgba(23,32,27,0.05)"}
        />
        <g fill="var(--color-ink)" opacity={on("200") ? 0.95 : 0.6}>
          {SALT.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} />
          ))}
        </g>

        {/* ---- Kappenkörper: Stirnwand, Mantelwand (160 / 170 / 190) ---- */}
        <path
          d={capBody()}
          fill="url(#hatch)"
          stroke="var(--color-ink)"
          strokeWidth="0.3"
        />
        {/* Stirnwand hervorheben */}
        {(on("190") || on("160") || on("170")) && (
          <path d={capBody()} fill="var(--color-gold)" opacity="0.3" />
        )}

        {/* ---- Behältermund, auf den der Verschluss geschraubt ist (30) ---- */}
        <g opacity="0.5">
          {[-1, 1].map((side) => (
            <path
              key={side}
              d={`M ${side * 12.5} ${PART + 1.2}
                  L ${side * 12.5} ${H + 3.5}
                  L ${side * 11.2} ${H + 3.5}
                  L ${side * 11.2} ${PART + 1.2} Z`}
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="0.26"
              strokeDasharray="1.6 1"
            />
          ))}
          <path d={mouthThread(-1)} fill="none" stroke="var(--color-ink)" strokeWidth="0.24" strokeDasharray="1.6 1" />
          <path d={mouthThread(1)} fill="none" stroke="var(--color-ink)" strokeWidth="0.24" strokeDasharray="1.6 1" />
        </g>

        {/* ---- Innengewinde (180) ---- */}
        <path
          d={thread(-1)}
          fill="none"
          stroke={fill("180", "var(--color-ink)")}
          strokeWidth={on("180") ? 0.45 : 0.3}
        />
        <path
          d={thread(1)}
          fill="none"
          stroke={fill("180", "var(--color-ink)")}
          strokeWidth={on("180") ? 0.45 : 0.3}
        />

        {/* ---- Trennwand (260) ---- */}
        <rect
          x={-IN}
          y={CHAMBER}
          width={IN * 2}
          height={PART - CHAMBER}
          fill={on("260") ? "var(--color-gold)" : "var(--color-ink)"}
          opacity={on("260") ? 0.95 : 0.82}
        />

        {/* ---- Dichtlippe (270) ---- */}
        {[-1, 1].map((side) => (
          <path
            key={side}
            d={`M ${side * 11.9} ${PART}
                L ${side * 11.3} ${PART + 2.6}
                L ${side * 10.3} ${PART + 2.4}
                L ${side * 10.5} ${PART} Z`}
            fill={fill("270", "var(--color-agave)")}
          />
        ))}

        {/* ---- Verschlussglied mit Lasche (230 / 250 / 300) ---- */}
        <g ref={flap}>
          <rect
            x={-W + 0.4}
            y={-1.5}
            width={W * 2 - 0.8}
            height={1.5}
            rx="0.4"
            fill={fill("230", "var(--color-ink)")}
          />
          {/* Dichtzapfen greifen in die Austrittsöffnungen */}
          {[-PITCH, PITCH].map((px) => (
            <path
              key={px}
              d={`M ${px - HOLE + 0.12} 0 L ${px - HOLE + 0.3} ${FACE - 0.1} L ${px + HOLE - 0.3} ${FACE - 0.1} L ${px + HOLE - 0.12} 0 Z`}
              fill={fill("300", "var(--color-ink)")}
            />
          ))}
          {/* Betätigungslasche steht 2,5 mm über die Mantelwand */}
          <rect
            x={W - 0.4}
            y={-1.5}
            width="2.9"
            height="1.5"
            rx="0.3"
            fill={fill("250", "var(--color-agave-ink)")}
          />
          {/* Filmscharnier */}
          <circle
            cx={HINGE.x}
            cy={HINGE.y}
            r="0.75"
            fill="none"
            stroke={fill("290", "var(--color-ink)")}
            strokeWidth="0.3"
          />
        </g>

        {/* ---- Austrittsöffnungen: frei, sobald die Klappe offen ist ---- */}
        {(on("220") || open) &&
          [-PITCH, PITCH].map((px) => (
            <rect
              key={px}
              x={px - HOLE}
              y={-0.2}
              width={HOLE * 2}
              height={FACE + 0.4}
              fill="var(--color-gold)"
              opacity={on("220") ? 1 : 0.55}
            />
          ))}

        {/* ---- Maßangabe der Gesamthöhe ---- */}
        <g stroke="var(--color-ink)" strokeWidth="0.16" opacity="0.55">
          <line x1={W + 2.4} y1="0" x2={W + 2.4} y2={H} />
          <line x1={W + 1.4} y1="0" x2={W + 3.4} y2="0" />
          <line x1={W + 1.4} y1={H} x2={W + 3.4} y2={H} />
        </g>
        <text
          x={W + 4.1}
          y={H / 2 + 0.6}
          className="t-num"
          fontSize="2.1"
          fill="var(--color-ink-2)"
        >
          16,5
        </text>
      </g>
    </svg>
  );
}

/* Kontur des Kappenkörpers: Stirnwand mit zwei Öffnungen, dann Mantelwand */
function capBody(): string {
  const l = -W;
  const r = W;
  const h1 = -PITCH;
  const h2 = PITCH;
  return [
    `M ${l} 0`,
    `L ${h1 - HOLE} 0`,
    `L ${h1 - HOLE} ${FACE}`,
    `L ${h1 + HOLE} ${FACE}`,
    `L ${h1 + HOLE} 0`,
    `L ${h2 - HOLE} 0`,
    `L ${h2 - HOLE} ${FACE}`,
    `L ${h2 + HOLE} ${FACE}`,
    `L ${h2 + HOLE} 0`,
    `L ${r} 0`,
    `L ${r} ${H}`,
    `L ${IN} ${H}`,
    `L ${IN} ${FACE}`,
    `L ${-IN} ${FACE}`,
    `L ${-IN} ${H}`,
    `L ${l} ${H}`,
    "Z",
  ].join(" ");
}

/* Außengewinde am Behältermund, greift in das Innengewinde */
function mouthThread(side: 1 | -1): string {
  const x = side * 12.5;
  const from = 7.4;
  const pitch = 1.6;
  const depth = side * 1.05;
  const parts: string[] = [`M ${x} ${from}`];
  for (let i = 0; i < 5; i++) {
    const y = from + i * pitch;
    parts.push(`L ${x + depth} ${y + pitch * 0.55}`, `L ${x} ${y + pitch}`);
  }
  return parts.join(" ");
}

/* Sägezahnprofil des Innengewindes, 9 mm lang */
function thread(side: 1 | -1): string {
  const x = side * IN;
  const from = 6.6;
  const pitch = 1.6;
  const depth = side * -1.05;
  const parts: string[] = [`M ${x} ${from}`];
  for (let i = 0; i < 6; i++) {
    const y = from + i * pitch;
    parts.push(`L ${x + depth} ${y + pitch * 0.55}`, `L ${x} ${y + pitch}`);
  }
  return parts.join(" ");
}

/* Schüttung in der Vorratskammer, 67 Prozent Füllgrad */
const SALT: [number, number, number][] = (() => {
  const out: [number, number, number][] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  for (let i = 0; i < 78; i++) {
    const x = (rnd() * 2 - 1) * (IN - 0.5);
    /* Füllgrad 67 Prozent: das obere Drittel der Kammer bleibt frei */
    const top = FACE + (CHAMBER - FACE) * 0.33;
    const y = top + rnd() * (CHAMBER - top - 0.3);
    out.push([x, y, 0.19 + rnd() * 0.1]);
  }
  return out;
})();
