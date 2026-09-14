"use client";

import { useEffect, useRef, useState } from "react";
import { Container, SectionHead } from "./Shell";
import { useSpinCanvas } from "@/lib/useSpinCanvas";
import { sequence } from "@/content/product";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useMediaQuery";

/**
 * Beim Scrollen dreht sich die Verpackungseinheit einmal um sich selbst,
 * und an fünf Stellen tritt die Erläuterung des Bauteils hervor, das
 * gerade nach vorne kommt.
 */
export default function Sequence() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const { paint } = useSpinCanvas(canvasRef, { theme: "night", turns: 1.15 });

  useEffect(() => {
    if (reduced) {
      paint(0.08);
      return;
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3.4}`,
        pin: pin.current,
        pinSpacing: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          paint(p);
          if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
          let idx = 0;
          sequence.stops.forEach((s, i) => {
            if (p >= s.at - 0.08) idx = i;
          });
          setActive(idx);
        },
      });
      paint(0);
      return () => st.kill();
    }, section);

    return () => ctx.revert();
  }, [paint, reduced]);

  return (
    <section
      ref={section}
      id="aufbau"
      data-part="10"
      data-name="Verpackungseinheit"
      data-tone="night"
      className="relative bg-night text-salt"
    >
      <div ref={pin} className="relative h-svh overflow-hidden">
        <Container className="lg:pl-rail">
          <div className="grid h-svh grid-cols-1 items-center gap-6 py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-0">
            {/* Erläuterungen */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              <SectionHead
                refNo="10"
                name={sequence.kicker}
                title={sequence.headline}
                night
              />

              {/* Laufleiste mit den fünf Haltepunkten */}
              <div className="relative mt-8 h-px w-full bg-salt/15">
                <div
                  ref={barRef}
                  className="h-px w-full origin-left scale-x-0 bg-gold"
                />
                {sequence.stops.map((s, i) => (
                  <span
                    key={s.ref}
                    className={`absolute -top-[2px] block h-[5px] w-[5px] -translate-x-1/2 rotate-45 transition-colors duration-300 ${
                      i <= active ? "bg-gold" : "bg-salt/30"
                    }`}
                    style={{ left: `${s.at * 100}%` }}
                  />
                ))}
              </div>

              <div className="relative mt-8">
                {reduced ? (
                  <ul className="space-y-9">
                    {sequence.stops.map((s) => (
                      <li key={s.ref}>
                        <Stop refNo={s.ref} title={s.title} body={s.body} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="relative min-h-[13rem] sm:min-h-[11rem]">
                    {sequence.stops.map((s, i) => (
                      <div
                        key={s.ref}
                        className={`transition-all duration-500 ease-out ${
                          i === active
                            ? "relative opacity-100 blur-0"
                            : "pointer-events-none absolute inset-0 translate-y-3 opacity-0 blur-[2px]"
                        }`}
                        aria-hidden={i !== active}
                      >
                        <Stop refNo={s.ref} title={s.title} body={s.body} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Objekt */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="relative mx-auto h-[38svh] max-h-[540px] min-h-[240px] w-full lg:h-[66svh]">
                <canvas
                  ref={canvasRef}
                  className="block h-full w-full"
                  aria-label="Verpackungseinheit im Schnitt, gedreht beim Scrollen"
                  role="img"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function Stop({
  refNo,
  title,
  body,
}: {
  refNo: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="t-num inline-flex h-6 min-w-9 items-center justify-center border border-gold/60 px-1.5 text-[0.72rem] text-gold">
          {refNo}
        </span>
        <h3 className="t-display-sm text-[clamp(1.35rem,2.3vw,1.85rem)] text-salt">
          {title}
        </h3>
      </div>
      <p className="t-body mt-3 text-salt/72">{body}</p>
    </div>
  );
}
