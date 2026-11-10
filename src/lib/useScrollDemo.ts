"use client";

import { useEffect, type RefObject } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Zeigt eine Bewegung von selbst: sobald der Abschnitt ins Bild rückt,
 * ruft `play(true)` sie auf, und `play(false)`, wenn man wieder nach oben
 * scrollt. Der Nutzer kann sie danach trotzdem per Knopf steuern.
 */
export function useScrollDemo(
  ref: RefObject<HTMLElement | null>,
  play: (on: boolean) => void,
) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 45%",
      end: "bottom 45%",
      onEnter: () => play(true),
      onLeaveBack: () => play(false),
    });
    return () => st.kill();
  }, [ref, play]);
}
