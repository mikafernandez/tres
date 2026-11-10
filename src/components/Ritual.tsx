"use client";

import { useEffect, useRef } from "react";
import { Container, SectionHead } from "./Shell";
import Still from "./Still";
import { useSpinCanvas } from "@/lib/useSpinCanvas";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ritual } from "@/content/product";

/* Neigung der Flasche je Schritt, in Grad: salzen, trinken, Limette.
   Auf dem Desktop kippt die gepinnte Flasche zwischen diesen Lagen. */
const TILT = [140, 0, 150];

/**
 * Die drei Abgabeschritte in der Verzehrfolge. Auf dem Desktop bleibt
 * die 3D-Flasche stehen, dreht sich beim Scrollen und kippt in die Lage
 * des jeweils aktiven Schritts. Mobil stehen die Schritte untereinander.
 */
export default function Ritual() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const bottle = useRef<HTMLCanvasElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  const { paint } = useSpinCanvas(bottle, {
    theme: "night",
    turns: 0.5,
    fill: 0.8,
  });

  useEffect(() => {
    const dim = (idx: number) =>
      stepRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = i === idx ? "1" : "0.42";
      });

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const el = bottle.current;
        if (!el) return;

        const tilt = gsap.timeline({ paused: true });
        tilt
          .fromTo(el, { rotate: TILT[0] }, { rotate: TILT[1], duration: 1, ease: "power2.inOut" })
          .to(el, { rotate: TILT[2], duration: 1, ease: "power2.inOut" });
        tilt.progress(0);

        const st = ScrollTrigger.create({
          trigger: section.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.6}`,
          pin: pin.current,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            paint(p);
            tilt.progress(p);
            dim(Math.min(2, Math.floor(p * 3)));
          },
        });

        return () => {
          st.kill();
          tilt.kill();
          gsap.set(el, { clearProps: "transform" });
        };
      },
    );

    dim(0);
    paint(0);
    return () => mm.revert();
  }, [paint]);

  return (
    <section
      ref={section}
      id="ablauf"
      data-part="230"
      data-name="Verschlussglied"
      data-tone="night"
      className="relative bg-night text-salt"
    >
      {/* Desktop: gepinnte Bühne mit der Flasche */}
      <div ref={pin} className="relative hidden h-svh overflow-hidden lg:block">
        <Container className="h-full lg:pl-rail">
          <div className="grid h-full grid-cols-12 items-center gap-x-10">
            <div className="col-span-5">
              <SectionHead
                refNo="230"
                name={ritual.kicker}
                title={ritual.headline}
                night
              />
              <ol className="mt-12 space-y-9">
                {ritual.steps.map((s, i) => (
                  <li
                    key={s.n}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="transition-opacity duration-500"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="t-num text-[0.8rem] text-salt/55">
                        {s.n}
                      </span>
                      <h3 className="t-display-sm text-[clamp(1.3rem,2vw,1.65rem)] text-salt">
                        {s.title}
                      </h3>
                      <span className="t-annot ml-auto shrink-0 border border-gold/50 px-2 py-1 text-[0.7rem] text-gold">
                        {s.meta}
                      </span>
                    </div>
                    <p className="t-body mt-3 text-[0.98rem] text-salt/70">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="col-span-7 h-[72svh]">
              <canvas
                ref={bottle}
                role="img"
                aria-label="Verpackungseinheit, beim Scrollen in die Lage der drei Schritte gekippt"
                className="block h-full w-full"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Mobil: Schritte untereinander, mit den gezeichneten Symbolen */}
      <Container className="py-24 lg:hidden">
        <div className="max-w-2xl">
          <SectionHead
            refNo="230"
            name={ritual.kicker}
            title={ritual.headline}
            night
          />
        </div>

        <ol data-stagger className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {ritual.steps.map((s, i) => (
            <li key={s.n} className="flex flex-col">
              <div className="relative aspect-4/5 w-full overflow-hidden border border-salt/15 bg-night-2">
                <Still
                  name={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover"
                >
                  <StepGlyph step={i} />
                </Still>
                <span className="t-num absolute top-3 left-3 text-[0.8rem] text-salt/55">
                  {s.n}
                </span>
                <span className="t-annot absolute right-3 bottom-3 border border-gold/50 px-2 py-1 text-[0.7rem] text-gold">
                  {s.meta}
                </span>
              </div>

              <h3 className="t-display-sm mt-6 text-[clamp(1.3rem,2vw,1.65rem)] text-salt">
                {s.title}
              </h3>
              <p className="t-body mt-3 text-[0.98rem] text-salt/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* --- gezeichnete Alternative, solange keine Fotos vorliegen --- */

/* Umriss der Verpackungseinheit, Standfläche bei y = 0, Höhe 71,5 mm */
const OUTLINE =
  "M -15 0 L -15 -68 Q -15 -71.5 -11.5 -71.5 L 11.5 -71.5 Q 15 -71.5 15 -68 L 15 0 Z";

function StepGlyph({ step }: { step: number }) {
  const tilt = TILT[step];
  const capOff = step === 1;

  return (
    <svg
      viewBox="-54 -54 108 108"
      className="h-full w-full"
      role="img"
      aria-hidden
    >
      {/* die Flasche dreht um ihre eigene Mitte */}
      <g transform={`rotate(${tilt})`}>
        <g transform="translate(0,35.75)">
          {/* Spirituose */}
          <path
            d="M -14 -1 L -14 -40 L 14 -40 L 14 -1 Z"
            fill="var(--color-gold)"
            opacity={step === 2 ? 0.3 : 0.55}
          />
          {/* Bodenkammer */}
          <path
            d="M -11 -1 L -9.6 -16 L 9.6 -16 L 11 -1 Z"
            fill="var(--color-lime)"
            opacity="0.85"
          />
          {/* Vorratskammer im Verschluss */}
          {!capOff && (
            <rect
              x="-13"
              y="-70"
              width="26"
              height="11"
              fill="var(--color-salt)"
              opacity={step === 0 ? 0.3 : 0.75}
            />
          )}

          <path
            d={OUTLINE}
            fill="none"
            stroke="var(--color-salt)"
            strokeWidth="1.5"
            opacity="0.85"
          />
          <line
            x1="-15"
            y1="-55"
            x2="15"
            y2="-55"
            stroke="var(--color-salt)"
            strokeWidth="1.1"
            opacity="0.55"
          />

          {/* Verschlussglied: im ersten Schritt hochgeschwenkt */}
          {step === 0 && (
            <g transform="translate(-14,-71.5) rotate(-128)">
              <rect x="0" y="-3.6" width="25" height="3.6" rx="1.2" fill="var(--color-salt)" opacity="0.85" />
            </g>
          )}

          {/* Siegelfolie am Boden */}
          {step !== 2 && (
            <rect x="-12" y="-0.6" width="24" height="1.6" fill="var(--color-salt)" opacity="0.4" />
          )}
        </g>
      </g>

      {/* abgeschraubter Verschluss neben der Flasche */}
      {capOff && (
        <g>
          <rect
            x="26"
            y="-41"
            width="24"
            height="14"
            rx="2.5"
            fill="var(--color-salt)"
            opacity="0.14"
          />
          <rect
            x="26"
            y="-41"
            width="24"
            height="14"
            rx="2.5"
            fill="none"
            stroke="var(--color-salt)"
            strokeWidth="1.3"
            opacity="0.7"
          />
          <g fill="var(--color-salt)" opacity="0.6">
            <circle cx="32" cy="-34" r="1.1" />
            <circle cx="36" cy="-34" r="1.1" />
            <circle cx="40" cy="-34" r="1.1" />
            <circle cx="44" cy="-34" r="1.1" />
          </g>
          <path
            d="M 17 -34 L 23 -34 M 20.6 -36.6 L 23.6 -34 L 20.6 -31.4"
            fill="none"
            stroke="var(--color-salt)"
            strokeWidth="1.2"
            opacity="0.55"
          />
        </g>
      )}

      {/* Salz auf den Handrücken */}
      {step === 0 && (
        <>
          <g fill="var(--color-salt)">
            {[
              [24, 33],
              [27, 37],
              [23, 41],
              [28, 44],
              [25, 47],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.6" opacity={0.95 - i * 0.13} />
            ))}
          </g>
          <path
            d="M 6 52 Q 25 46 46 52"
            fill="none"
            stroke="var(--color-salt)"
            strokeWidth="1.4"
            opacity="0.4"
          />
        </>
      )}

      {/* abgezogene Siegelfolie, an der Lasche gehalten */}
      {step === 2 && (
        <g transform="translate(-33,-30) rotate(-24)">
          <ellipse rx="11" ry="2.6" fill="var(--color-salt)" opacity="0.22" />
          <ellipse
            rx="11"
            ry="2.6"
            fill="none"
            stroke="var(--color-salt)"
            strokeWidth="1.1"
            opacity="0.6"
          />
          <rect x="8" y="-1" width="7" height="2" rx="0.8" fill="var(--color-salt)" opacity="0.5" />
        </g>
      )}
    </svg>
  );
}
