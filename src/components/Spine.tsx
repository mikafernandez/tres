"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

type Tick = { top: number; ref: string; name: string; id: string };

/**
 * Maßlinie am linken Blattrand.
 *
 * Sie ist zugleich Fortschrittsanzeige und Inhaltsverzeichnis: jede
 * Teilung sitzt dort, wo der zugehörige Abschnitt im Dokument liegt,
 * und trägt die Bezugsziffer des Bauteils, um das es dort geht.
 */
export default function Spine() {
  const railRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [ticks, setTicks] = useState<Tick[]>([]);
  const [active, setActive] = useState(0);
  const [night, setNight] = useState(false);

  useEffect(() => {
    const measure = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-part]"),
      );
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      setTicks(
        nodes.map((n) => ({
          top: Math.min(
            1,
            Math.max(0, (n.offsetTop - window.innerHeight * 0.35) / docH),
          ),
          ref: n.dataset.part ?? "",
          name: n.dataset.name ?? "",
          id: n.id,
        })),
      );
    };

    measure();
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onRefresh: measure,
      onUpdate: (self) => {
        const p = self.progress;
        const marker = markerRef.current;
        const rail = railRef.current;
        if (marker && rail) {
          marker.style.transform = `translate3d(0, ${p * rail.clientHeight}px, 0)`;
        }
        /* Abschnitt unter der Bildschirmmitte bestimmt Farbe und Marke */
        const mid = window.scrollY + window.innerHeight * 0.45;
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>("[data-part]"),
        );
        let idx = 0;
        let dark = false;
        nodes.forEach((n, i) => {
          if (n.offsetTop <= mid) {
            idx = i;
            dark = n.dataset.tone === "night";
          }
        });
        setActive(idx);
        setNight(dark);
      },
    });

    window.addEventListener("resize", measure);
    return () => {
      st.kill();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const fg = night ? "text-salt" : "text-ink";
  const line = night ? "bg-salt/25" : "bg-ink/25";
  const dim = night ? "text-salt/45" : "text-ink/45";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-40 hidden h-screen w-rail select-none lg:block"
    >
      <div className="relative h-full pt-24 pb-16 pl-7">
        <div ref={railRef} className="relative h-full">
          {/* die Linie */}
          <div className={`absolute top-0 bottom-0 left-0 w-px ${line}`} />

          {/* Endpfeile */}
          <div className={`absolute -top-0.5 -left-1 h-px w-2.5 ${line}`} />
          <div className={`absolute -bottom-0.5 -left-1 h-px w-2.5 ${line}`} />

          {/* Teilungen */}
          {ticks.map((t, i) => (
            <a
              key={t.id + i}
              href={`#${t.id}`}
              className="group pointer-events-auto absolute -left-1 flex items-center gap-2"
              style={{ top: `${t.top * 100}%` }}
            >
              <span
                className={`block h-px transition-all duration-300 ${line} ${
                  i === active ? "w-4" : "w-2"
                }`}
              />
              <span
                className={`t-num text-[0.66rem] transition-colors duration-300 ${
                  i === active ? fg : dim
                }`}
              >
                {t.ref}
              </span>
              <span
                className={`t-annot absolute left-full ml-2 hidden text-[0.7rem] whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 xl:block ${dim}`}
              >
                {t.name}
              </span>
            </a>
          ))}

          {/* laufende Marke */}
          <div
            ref={markerRef}
            className="absolute top-0 -left-[3px] will-change-transform"
          >
            <div
              className={`h-[7px] w-[7px] rotate-45 transition-colors duration-300 ${
                night ? "bg-gold" : "bg-ink"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
