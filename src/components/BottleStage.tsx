"use client";

import { useEffect, useRef } from "react";
import { useSpinCanvas } from "@/lib/useSpinCanvas";
import type { BottleTheme } from "@/lib/bottle";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Flasche zum Drehen. Zieht man mit Maus, Finger oder Pfeiltasten,
 * dreht sich das Objekt; losgelassen läuft es aus. Ohne Eingabe
 * dreht es sich sehr langsam von selbst, bis es einmal angefasst wurde.
 */
export default function BottleStage({
  theme = "light",
  className = "",
  label = "Verpackungseinheit drehen",
  anchorX = 0.5,
  fill = 0.86,
  onFirstDrag,
}: {
  theme?: BottleTheme;
  className?: string;
  label?: string;
  anchorX?: number;
  fill?: number;
  onFirstDrag?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const { paint } = useSpinCanvas(canvasRef, { theme, anchorX, fill });

  const state = useRef({
    turn: 0.015,
    vel: 0,
    dragging: false,
    lastX: 0,
    touched: false,
    raf: 0,
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const s = state.current;
    const reduced = prefersReducedMotion();

    const step = () => {
      if (!s.dragging) {
        if (Math.abs(s.vel) > 0.00002) {
          s.turn += s.vel;
          s.vel *= 0.945;
        } else if (!s.touched && !reduced) {
          s.turn += 0.00042; // Leerlauf
        }
      }
      paint(s.turn);
      s.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);

    const down = (e: PointerEvent) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.vel = 0;
      if (!s.touched) {
        s.touched = true;
        onFirstDrag?.();
      }
      host.setPointerCapture(e.pointerId);
      host.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      s.lastX = e.clientX;
      const d = dx / Math.max(220, host.clientWidth * 0.9);
      s.turn += d;
      s.vel = d * 0.85;
    };
    const up = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.dragging = false;
      try {
        host.releasePointerCapture(e.pointerId);
      } catch {}
      host.style.cursor = "grab";
    };
    const key = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      s.touched = true;
      s.vel = e.key === "ArrowRight" ? 0.014 : -0.014;
    };

    host.addEventListener("pointerdown", down);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", up);
    host.addEventListener("keydown", key);

    return () => {
      cancelAnimationFrame(s.raf);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointercancel", up);
      host.removeEventListener("keydown", key);
    };
  }, [paint, onFirstDrag]);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={label}
      tabIndex={0}
      className={`cursor-grab touch-pan-y ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
