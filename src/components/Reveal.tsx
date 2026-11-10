"use client";

import { useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Auftritt beim Scrollen für alles, was in den Abschnitten markiert ist:
 * data-reveal (Kopf fährt ein), data-rule (Linie zeichnet sich),
 * data-stagger (Zeilen folgen nacheinander). Läuft je einmal.
 */
export default function Reveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 18,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 10,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
