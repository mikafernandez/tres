#!/usr/bin/env node
/* Zeigt an, welche Renderings in public/renders/ liegen und welche
   Teile der Seite deshalb noch gezeichnet werden. */

import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const RENDERS = path.join(root, "public", "renders");
const IMAGE = /\.(webp|png|jpg|jpeg|avif)$/i;

const list = (dir) => {
  try {
    return readdirSync(dir);
  } catch {
    return [];
  }
};

const SPIN_COUNT = 36;
const STILLS = [
  ["ritual-01", "Ablauf, Schritt 1 — Klappe hoch, salzen"],
  ["ritual-02", "Ablauf, Schritt 2 — Deckel ab, Shot"],
  ["ritual-03", "Ablauf, Schritt 3 — Folie abziehen"],
  ["edition-blanco", "Sorte 01 — Blanco"],
  ["edition-chili", "Sorte 02 — Chili"],
  ["edition-sangrita", "Sorte 03 — Sangrita"],
  ["edition-cristal", "Sorte 04 — Cristal"],
  ["og", "Bild zum Teilen (optional)"],
];

const spin = list(path.join(RENDERS, "spin")).filter(
  (f) => IMAGE.test(f) && f.startsWith("spin_"),
);
const stills = new Set(list(RENDERS).filter(IMAGE.test.bind(IMAGE)).map((f) => f.replace(IMAGE, "")));

const ok = (b) => (b ? "  vorhanden" : "  fehlt    ");

console.log("\n  Renderings in public/renders/\n");

console.log(`${ok(spin.length >= 2)}  360-Grad-Sequenz — ${spin.length} von ${SPIN_COUNT} Bildern`);
if (spin.length > 0 && spin.length < SPIN_COUNT) {
  const have = new Set(spin.map((f) => f.replace(IMAGE, "")));
  const missing = [];
  for (let i = 1; i <= SPIN_COUNT; i++) {
    const name = `spin_${String(i).padStart(4, "0")}`;
    if (!have.has(name)) missing.push(name);
  }
  console.log(`              es fehlen: ${missing.slice(0, 8).join(", ")}${missing.length > 8 ? ` und ${missing.length - 8} weitere` : ""}`);
}

console.log("");
for (const [name, label] of STILLS) {
  console.log(`${ok(stills.has(name))}  ${name.padEnd(18)} ${label}`);
}

const drawn = [];
if (spin.length < 2) drawn.push("die drehbare Flasche im Hero und in der Aufbau-Sektion");
if (!["ritual-01", "ritual-02", "ritual-03"].every((n) => stills.has(n)))
  drawn.push("die drei Ablauf-Bilder");
if (!["edition-blanco", "edition-chili", "edition-sangrita", "edition-cristal"].every((n) => stills.has(n)))
  drawn.push("die vier Sorten");

console.log("");
if (drawn.length === 0) {
  console.log("  Alles vorhanden. Die Seite zeigt durchgehend echte Bilder.\n");
} else {
  console.log("  Noch gezeichnet statt fotografiert:");
  for (const d of drawn) console.log(`    - ${d}`);
  console.log("\n  Vorgaben dazu stehen in BILDER.md.");
  console.log("  Nach dem Einlegen den Dev-Server neu starten.\n");
}
