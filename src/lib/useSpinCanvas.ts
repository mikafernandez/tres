"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadSpinFrames } from "./frames";
import { useAssets } from "@/components/Assets";
import { renderBottle, type BottleTheme } from "./bottle";

type Options = {
  theme?: BottleTheme;
  wordmark?: string;
  /** Vollrotationen über den gesamten Fortschritt 0…1 */
  turns?: number;
  /** Startwinkel in Umdrehungen (0…1) */
  offset?: number;
  /** waagerechter Standort im Bild, 0…1 */
  anchorX?: number;
  /** Anteil der Bildhöhe, den die Flasche einnimmt */
  fill?: number;
};

/**
 * Hängt ein Canvas an die Flaschendarstellung.
 * Gibt `paint(progress)` zurück — 0…1 entspricht `turns` Umdrehungen.
 */
export function useSpinCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  {
    theme = "night",
    wordmark = "TRES",
    turns = 1,
    offset = 0,
    anchorX = 0.5,
    fill = 0.86,
  }: Options = {},
) {
  const { spin } = useAssets();
  const framesRef = useRef<HTMLImageElement[] | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const progressRef = useRef(0);
  const [usesPhotos, setUsesPhotos] = useState(false);

  const paint = useCallback(
    (progress: number) => {
      progressRef.current = progress;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const { w, h } = sizeRef.current;
      if (!w || !h) return;

      const turned = progress * turns + offset;
      const frames = framesRef.current;

      if (frames && frames.length > 1) {
        const t = ((turned % 1) + 1) % 1;
        const idx = Math.min(frames.length - 1, Math.floor(t * frames.length));
        const img = frames[idx];
        ctx.clearRect(0, 0, w, h);
        if (!img.naturalWidth) return;
        const s = Math.min(w / img.naturalWidth, (h * fill) / img.naturalHeight);
        const dw = img.naturalWidth * s;
        const dh = img.naturalHeight * s;
        ctx.drawImage(img, w * anchorX - dw / 2, (h - dh) / 2, dw, dh);
      } else {
        renderBottle(ctx, w, h, turned * Math.PI * 2, theme, {
          wordmark,
          anchorX,
          fill,
        });
      }
    },
    [canvasRef, theme, wordmark, turns, offset, anchorX, fill],
  );

  /* Größe und Pixeldichte */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      paint(progressRef.current);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [canvasRef, paint]);

  /* Echte Renderings nachladen, falls vorhanden */
  useEffect(() => {
    let alive = true;
    loadSpinFrames(spin).then((frames) => {
      if (!alive || !frames) return;
      framesRef.current = frames;
      setUsesPhotos(true);
      paint(progressRef.current);
    });
    return () => {
      alive = false;
    };
  }, [paint, spin]);

  return { paint, usesPhotos };
}
