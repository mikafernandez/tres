"use client";

import { Container, SectionHead } from "./Shell";
import { reduction } from "@/content/product";

/**
 * Die Gegenüberstellung, um die es geht: drei Behältnisse heute,
 * eines danach. Die Umrisse sind maßstäblich zueinander.
 */
export default function Reduction() {
  return (
    <section
      id="warum"
      data-part="20"
      data-name="Behälter"
      data-tone="light"
      className="bg-limestone pt-20 pb-24 lg:pt-28 lg:pb-32"
    >
      <Container className="lg:pl-rail">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              refNo="20"
              name={reduction.kicker}
              title={reduction.headline}
            />
            <p className="t-body mt-7 text-ink-2">{reduction.body}</p>
            <p className="t-body mt-5 text-ink-2">{reduction.closing}</p>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <svg
              viewBox="0 0 300 104"
              className="w-full"
              role="img"
              aria-label="Gegenüberstellung: heute Streuer, Glas und Schälchen, mit TRES ein einziger Behälter"
            >
              {/* heute: drei Behältnisse, gestrichelt */}
              <g
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="1.2"
                strokeDasharray="3 2.4"
                opacity="0.5"
              >
                <path d="M10 92 L10 44 Q10 36 16 33 L16 23 L36 23 L36 33 Q42 36 42 44 L42 92 Z" />
                <path d="M68 32 L74 92 L98 92 L104 32 Z" />
                <path d="M126 60 Q126 92 146 92 Q166 92 166 60 Z" />
                <path d="M136 60 a10 10 0 0 1 20 0" />
              </g>
              <g fill="var(--color-ink)" opacity="0.5">
                <circle cx="22" cy="27" r="1.1" />
                <circle cx="26" cy="27" r="1.1" />
                <circle cx="30" cy="27" r="1.1" />
              </g>

              {/* Trennung */}
              <line
                x1="186"
                y1="24"
                x2="186"
                y2="92"
                stroke="var(--color-ink)"
                strokeWidth="1"
                opacity="0.25"
              />

              {/* mit TRES: ein Behälter, maßstäblich gleich */}
              <g stroke="var(--color-ink)" strokeWidth="1.5" fill="none">
                <path
                  d="M214 92 L214 27 Q214 22 219 22 L245 22 Q250 22 250 27 L250 92 Z"
                  fill="var(--color-ink)"
                  opacity="0.08"
                />
                <path d="M214 92 L214 27 Q214 22 219 22 L245 22 Q250 22 250 27 L250 92 Z" />
                <line x1="214" y1="42" x2="250" y2="42" />
                <line
                  x1="217"
                  y1="80"
                  x2="247"
                  y2="80"
                  strokeDasharray="2.6 2"
                  opacity="0.6"
                />
              </g>
              <g fill="var(--color-ink)">
                <circle cx="222" cy="27" r="1.2" />
                <circle cx="228" cy="27" r="1.2" />
                <circle cx="236" cy="27" r="1.2" />
                <circle cx="242" cy="27" r="1.2" />
                <rect x="250" y="25" width="5" height="4" rx="1" />
              </g>

              {/* Zählung */}
              <text
                x="10"
                y="102"
                className="t-annot"
                fontSize="6.5"
                fill="var(--color-ink-3)"
              >
                Streuer, Glas, Schälchen
              </text>
              <text
                x="214"
                y="102"
                className="t-annot"
                fontSize="6.5"
                fill="var(--color-ink-3)"
              >
                mit TRES
              </text>
            </svg>

            <div className="mt-2 flex items-baseline gap-[26%]">
              <span className="t-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-ink/35">
                3
              </span>
              <span className="t-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-ink">
                1
              </span>
            </div>

            <p className="t-annot mt-8 max-w-md text-[0.78rem] leading-relaxed text-ink-3">
              Die beiden Kammern sitzen dort, wo bei jeder Shot-Flasche schon
              Hohlraum ist: unter dem Schraubdeckel und im eingezogenen Boden.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
