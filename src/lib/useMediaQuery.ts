"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Liest eine Media Query, ohne beim ersten Rendern Zustand zu setzen.
 * Auf dem Server gilt die Abfrage als nicht erfüllt.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** true, wenn der Nutzer reduzierte Bewegung eingestellt hat */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
