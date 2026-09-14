"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./Shell";
import BottleStage from "./BottleStage";
import { bottleBounds } from "@/lib/bottle";
import { brand, hero, nav } from "@/content/product";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";

type Bounds = ReturnType<typeof bottleBounds>;

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [dragged, setDragged] = useState(false);
  const [bounds, setBounds] = useState<Bounds | null>(null);

  /* Auf schmalen Bildschirmen steht die Flasche mittig,
     auf breiten links, damit rechts die Bezugslinien Platz haben. */
  const wide = useMediaQuery("(min-width: 640px)");
  const anchorX = wide ? 0.34 : 0.5;

  /* Kontur der Flasche vermessen, damit die Bezugslinien
     tatsächlich an ihr ansetzen und nicht daneben. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setBounds(bottleBounds(r.width, r.height, anchorX));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [anchorX]);

  /* Ein einziger orchestrierter Auftritt beim Laden. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".hero-line > span", {
          yPercent: 108,
          duration: 1.15,
          stagger: 0.085,
        })
        .from(".hero-rule", { scaleX: 0, duration: 0.9 }, 0.25)
        .from(
          ".hero-fade",
          { opacity: 0, y: 14, duration: 0.8, stagger: 0.06 },
          0.45,
        )
        .from(
          ".hero-stage",
          { opacity: 0, scale: 0.97, duration: 1.4, ease: "power2.out" },
          0.05,
        );
    }, root);
    return () => ctx.revert();
  }, []);

  /* Die Bezugslinien entstehen erst, wenn die Kontur vermessen ist,
     deshalb treten sie in einem eigenen Zug auf. */
  const calloutsShown = useRef(false);
  useEffect(() => {
    if (!bounds || calloutsShown.current || prefersReducedMotion()) return;
    const targets = root.current?.querySelectorAll(".hero-callout");
    if (!targets?.length) return;
    calloutsShown.current = true;
    gsap.from(targets, {
      opacity: 0,
      x: 20,
      duration: 0.7,
      stagger: 0.1,
      delay: 0.75,
      ease: "expo.out",
    });
  }, [bounds]);

  const span = bounds ? bounds.bottom - bounds.top : 0;

  return (
    <div id="top" ref={root} className="relative overflow-clip bg-limestone">
      {/* Kopfzeile */}
      <Container className="relative z-20 pt-6 lg:pl-rail">
        <div className="flex items-center justify-between gap-6 border-b border-ink/20 pb-4">
          <a
            href="#top"
            className="t-display text-[1.35rem] text-ink"
            style={{ fontVariationSettings: '"wdth" 118, "wght" 800' }}
          >
            {brand.wordmark}
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="t-annot text-[0.8rem] text-ink-2 transition-colors hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#liste"
            className="t-annot border border-ink px-4 py-2 text-[0.78rem] text-ink transition-colors hover:bg-ink hover:text-limestone"
          >
            {hero.cta}
          </a>
        </div>
      </Container>

      {/* Bühne */}
      <Container className="relative lg:pl-rail">
        <div className="grid items-center gap-y-8 pt-10 pb-16 lg:min-h-[calc(100svh-6.5rem)] lg:grid-cols-12 lg:gap-x-10 lg:pt-2 lg:pb-8">
          {/* Text */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <h1 className="t-display text-[clamp(2.15rem,5.4vw,4.3rem)] text-ink">
              {hero.headline.map((line) => (
                <span
                  key={line}
                  className="hero-line block overflow-hidden pb-[0.06em]"
                >
                  <span className="block whitespace-nowrap">{line}</span>
                </span>
              ))}
            </h1>

            <div className="hero-rule mt-7 h-px w-full origin-left bg-ink/25" />

            <p className="hero-fade t-body mt-6 text-ink-2">{hero.lede}</p>

            <div className="hero-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#liste"
                className="t-annot bg-ink px-6 py-3.5 text-[0.85rem] text-limestone transition-colors hover:bg-agave-ink"
              >
                {hero.cta}
              </a>
              <a
                href="#deckel"
                className="t-annot border-b border-ink/30 pb-0.5 text-[0.85rem] text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                {hero.ctaSub}
              </a>
            </div>
          </div>

          {/* Objekt */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div
              ref={stageRef}
              className="hero-stage relative mx-auto h-[54svh] max-h-[560px] min-h-[340px] w-full lg:h-[calc(100svh-12rem)] lg:max-h-[640px]"
            >
              <BottleStage
                theme="light"
                anchorX={anchorX}
                className="absolute inset-0 outline-none"
                onFirstDrag={() => setDragged(true)}
              />

              {/* Bezugslinien auf die drei Kammern */}
              {bounds && (
                <ul className="pointer-events-none absolute inset-0 hidden sm:block">
                  {hero.callouts.map((c) => (
                    <li
                      key={c.ref}
                      className="hero-callout absolute flex -translate-y-1/2 items-center"
                      style={{
                        top: bounds.top + c.at * span,
                        left: bounds.right - 2,
                        right: 0,
                      }}
                    >
                      <span className="h-px w-5 shrink-0 bg-ink/45 lg:w-8" />
                      <span className="mr-3 -ml-[3px] h-[5px] w-[5px] shrink-0 rotate-45 border border-ink/60 bg-limestone" />
                      <span className="min-w-0">
                        <span className="t-display-sm block text-[1.05rem] text-ink">
                          {c.label}
                        </span>
                        <span className="t-annot block text-[0.74rem] text-ink-3">
                          {c.detail}
                        </span>
                      </span>
                      <span className="t-num ml-auto pl-3 text-[0.66rem] text-ink/30">
                        {c.ref}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

            {/* Hinweis auf die Bedienung */}
              <p
                className={`t-annot pointer-events-none absolute flex items-center gap-2 text-[0.72rem] text-ink-3 transition-opacity duration-500 ${
                  dragged ? "opacity-0" : "opacity-100"
                }`}
                style={
                  bounds
                    ? { top: bounds.bottom + 18, left: bounds.left }
                    : { bottom: 0, left: 0 }
                }
              >
                <span className="inline-block h-px w-5 bg-ink/35" />
                {hero.dragHint}
              </p>
            </div>

            {/* auf schmalen Schirmen stehen die drei Kammern unter dem Objekt */}
            <ul className="mt-5 grid grid-cols-3 gap-3 border-t border-ink/20 pt-4 sm:hidden">
              {hero.callouts.map((c) => (
                <li key={c.ref}>
                  <span className="t-display-sm block text-[0.95rem] text-ink">
                    {c.label}
                  </span>
                  <span className="t-annot block text-[0.7rem] text-ink-3">
                    {c.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
