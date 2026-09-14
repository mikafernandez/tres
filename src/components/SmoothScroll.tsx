"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis übernimmt das Scrollen, ScrollTrigger liest die Position daraus.
 * Bei `prefers-reduced-motion` bleibt das native Scrollen aktiv.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const refresh = () => ScrollTrigger.refresh();
      refresh();
      document.fonts?.ready.then(refresh);
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.11,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* Anker-Links über Lenis laufen lassen */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    /* Erst wenn Schriften und Bilder stehen, stimmen die Höhen -
       sonst rechnet ScrollTrigger mit veralteten Maßen. */
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    const late = window.setTimeout(refresh, 600);

    return () => {
      window.clearTimeout(late);
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
