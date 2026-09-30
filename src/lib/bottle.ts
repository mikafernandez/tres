/* ============================================================
   Prozedurales Rendering der Verpackungseinheit.

   Solange in /public/renders/spin/ keine echten Renderings liegen,
   zeichnet diese Datei die Flasche selbst. Alle Maße stammen aus
   der Patentanmeldung, die Kontur ist also nicht geschätzt:
   Ø 30 mm, 55 mm Behälter, 16,5 mm Verschluss, Bodeneinzug
   15,5 mm tief bei 7 Grad Wandneigung.

   Sobald echte Frames vorhanden sind, wird diese Datei nicht mehr
   benutzt (siehe lib/frames.ts).
   ============================================================ */

export type BottleTheme = "night" | "light";

/* --- Maße in Millimetern, Ursprung: Mitte Standfläche ---------- */
const MM = {
  bodyR: 15,
  neckR: 12.5,
  capR: 14.5,
  capCollarR: 15.1, // Bund am unteren Rand des Verschlusses
  shoulderStart: 45,
  mouth: 55,
  capTop: 71.5,
  capCollarTop: 57.4,
  fillTop: 40, // 20 ml in einem Innenraum von 26 ml
  labelTop: 33,
  labelBottom: 21.5,
  chamberDepth: 15.5, // Bodeneinzug
  chamberR: 11.5, // lichte Weite 23 mm
  chamberTilt: 7, // Grad
} as const;

const TILT = 0.125; // Blick leicht von oben: Stauchung der Ellipsen

type Palette = {
  glassLo: string;
  glassMid: string;
  glassHi: string;
  edge: string;
  cap: string;
  capLit: string;
  capDark: string;
  liquid: string;
  liquidLit: string;
  citrus: string;
  citrusLit: string;
  band: string;
  bandInk: string;
  shadow: string;
};

const PALETTES: Record<BottleTheme, Palette> = {
  light: {
    glassLo: "rgba(23,32,27,0.13)",
    glassMid: "rgba(23,32,27,0.03)",
    glassHi: "rgba(255,255,255,0.8)",
    edge: "rgba(23,32,27,0.34)",
    cap: "#1d2a23",
    capLit: "#54685a",
    capDark: "#0e1512",
    liquid: "#c0801f",
    liquidLit: "#eab961",
    citrus: "#93a827",
    citrusLit: "#c3d452",
    band: "#17201b",
    bandInk: "#e6e2d5",
    shadow: "rgba(23,32,27,0.2)",
  },
  night: {
    glassLo: "rgba(233,238,228,0.1)",
    glassMid: "rgba(233,238,228,0.03)",
    glassHi: "rgba(250,250,246,0.42)",
    edge: "rgba(233,238,228,0.42)",
    cap: "#202d26",
    capLit: "#61776a",
    capDark: "#080d0b",
    liquid: "#b4791f",
    liquidLit: "#e8c274",
    citrus: "#8fa326",
    citrusLit: "#c3d452",
    band: "#d3d4c6",
    bandInk: "#121a15",
    shadow: "rgba(0,0,0,0.55)",
  },
};

/* Aussenradius des Behälters auf der Höhe y */
function profileR(y: number): number {
  if (y <= 1.2) return MM.bodyR - (1.2 - y) * 0.55; // Fase am Standring
  if (y <= MM.shoulderStart) return MM.bodyR;
  if (y <= MM.mouth) {
    const t = (y - MM.shoulderStart) / (MM.mouth - MM.shoulderStart);
    return MM.bodyR + (MM.neckR - MM.bodyR) * (t * t * (3 - 2 * t));
  }
  return MM.neckR;
}

/* Radius des Bodeneinzugs auf der Höhe y */
function chamberR(y: number): number {
  const t = Math.min(1, Math.max(0, y / MM.chamberDepth));
  return MM.chamberR - t * MM.chamberDepth * Math.tan((MM.chamberTilt * Math.PI) / 180);
}

/* ============================================================
   Hauptfunktion
   ============================================================ */

export function renderBottle(
  ctx: CanvasRenderingContext2D,
  cssW: number,
  cssH: number,
  angle: number,
  theme: BottleTheme = "night",
  opts: { wordmark?: string; anchorX?: number; fill?: number } = {},
) {
  const p = PALETTES[theme];
  const wordmark = opts.wordmark ?? "TRES";

  ctx.clearRect(0, 0, cssW, cssH);

  const b = bottleBounds(cssW, cssH, opts.anchorX, opts.fill);
  const { scale, cx } = b;
  const cy = b.bottom;

  const X = (mm: number) => cx + mm * scale;
  const Y = (mm: number) => cy - mm * scale;
  const S = (mm: number) => mm * scale;
  const ell = (yMM: number, rMM: number) => S(rMM) * TILT;

  ctx.save();
  ctx.lineJoin = "round";

  /* ---------- Schlagschatten ---------- */
  {
    ctx.save();
    const gy = Y(0) + S(1);
    ctx.translate(cx, gy);
    ctx.scale(1, TILT * 0.85);
    ctx.translate(-cx, -gy);
    const g = ctx.createRadialGradient(cx, gy, 0, cx, gy, S(22));
    g.addColorStop(0, p.shadow);
    g.addColorStop(0.5, theme === "night" ? "rgba(0,0,0,0.2)" : "rgba(23,32,27,0.07)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, gy, S(22), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /* ---------- Silhouette Behälter ---------- */
  const body = new Path2D();
  body.moveTo(X(-profileR(0)), Y(0));
  for (let y = 0; y <= MM.mouth; y += 0.4) body.lineTo(X(-profileR(y)), Y(y));
  body.lineTo(X(MM.neckR), Y(MM.mouth));
  for (let y = MM.mouth; y >= 0; y -= 0.4) body.lineTo(X(profileR(y)), Y(y));
  body.closePath();

  {
    const g = ctx.createLinearGradient(X(-MM.bodyR), 0, X(MM.bodyR), 0);
    g.addColorStop(0, p.glassLo);
    g.addColorStop(0.2, p.glassMid);
    g.addColorStop(0.38, p.glassHi);
    g.addColorStop(0.58, p.glassMid);
    g.addColorStop(1, p.glassLo);
    ctx.fillStyle = g;
    ctx.fill(body);
  }

  /* ---------- Füllgüter ---------- */
  ctx.save();
  ctx.clip(body);

  /* Spirituose */
  {
    const top = Y(MM.fillTop);
    const g = ctx.createLinearGradient(X(-MM.bodyR), 0, X(MM.bodyR), 0);
    g.addColorStop(0, mix(p.liquid, -0.42));
    g.addColorStop(0.3, p.liquidLit);
    g.addColorStop(0.52, p.liquid);
    g.addColorStop(0.86, mix(p.liquid, -0.3));
    g.addColorStop(1, mix(p.liquid, -0.5));
    ctx.fillStyle = g;
    ctx.fillRect(X(-MM.bodyR - 1), top, S(MM.bodyR * 2 + 2), Y(0) - top);

    /* Spiegel */
    ctx.beginPath();
    ctx.ellipse(cx, top, S(MM.bodyR), ell(MM.fillTop, MM.bodyR), 0, 0, Math.PI * 2);
    ctx.fillStyle = mix(p.liquidLit, 0.25);
    ctx.fill();
    ctx.strokeStyle = mix(p.liquid, -0.2);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  /* Bodeneinzug mit Zusatzflüssigkeit */
  {
    const path = new Path2D();
    path.moveTo(X(-chamberR(0)), Y(0) + S(0.8));
    for (let y = 0; y <= MM.chamberDepth; y += 0.4)
      path.lineTo(X(-chamberR(y)), Y(y));
    path.lineTo(X(chamberR(MM.chamberDepth)), Y(MM.chamberDepth));
    for (let y = MM.chamberDepth; y >= 0; y -= 0.4)
      path.lineTo(X(chamberR(y)), Y(y));
    path.closePath();

    const g = ctx.createLinearGradient(X(-MM.chamberR), 0, X(MM.chamberR), 0);
    g.addColorStop(0, mix(p.citrus, -0.45));
    g.addColorStop(0.32, p.citrusLit);
    g.addColorStop(0.55, p.citrus);
    g.addColorStop(1, mix(p.citrus, -0.5));
    ctx.fillStyle = g;
    ctx.fill(path);

    /* Kuppe des Einzugs */
    const rTop = chamberR(MM.chamberDepth);
    ctx.beginPath();
    ctx.ellipse(cx, Y(MM.chamberDepth), S(rTop), ell(0, rTop), 0, 0, Math.PI * 2);
    ctx.fillStyle = mix(p.citrus, 0.3);
    ctx.fill();
    ctx.strokeStyle = mix(p.citrus, -0.3);
    ctx.lineWidth = 1;
    ctx.stroke();

    /* Die Kammer liegt hinter der Spirituose: warmer Schleier darüber */
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = p.liquid;
    ctx.fill(path);
    ctx.restore();
  }

  /* Etikett: der Schriftzug läuft um den Zylinder */
  drawLabel(ctx, {
    cx,
    yTop: Y(MM.labelTop),
    yBottom: Y(MM.labelBottom),
    r: S(MM.bodyR),
    angle,
    text: wordmark,
    band: p.band,
    ink: p.bandInk,
  });

  ctx.restore();

  /* Standring als Ellipse am Boden */
  ctx.beginPath();
  ctx.ellipse(cx, Y(0), S(profileR(0)), ell(0, profileR(0)), 0, 0, Math.PI);
  ctx.strokeStyle = p.edge;
  ctx.lineWidth = Math.max(1, S(0.3));
  ctx.stroke();

  ctx.strokeStyle = p.edge;
  ctx.lineWidth = Math.max(1, S(0.3));
  ctx.stroke(body);

  /* Glanzstreifen */
  {
    ctx.save();
    ctx.clip(body);
    const g = ctx.createLinearGradient(X(-MM.bodyR * 0.95), 0, X(-MM.bodyR * 0.25), 0);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.5, theme === "night" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(X(-MM.bodyR), Y(MM.mouth), S(MM.bodyR), Y(0) - Y(MM.mouth));
    ctx.restore();
  }

  /* ---------- Schraubverschluss ---------- */
  const capBottom = Y(MM.mouth); // 16,5 mm Verschluss auf 55 mm Behälter
  const capTopY = Y(MM.capTop);
  const collarY = Y(MM.capCollarTop);
  const r = S(1.4);

  const cap = new Path2D();
  cap.moveTo(X(-MM.capCollarR), capBottom);
  cap.lineTo(X(-MM.capCollarR), collarY);
  cap.lineTo(X(-MM.capR), collarY - S(0.7));
  cap.lineTo(X(-MM.capR), capTopY + r);
  cap.quadraticCurveTo(X(-MM.capR), capTopY, X(-MM.capR) + r, capTopY);
  cap.lineTo(X(MM.capR) - r, capTopY);
  cap.quadraticCurveTo(X(MM.capR), capTopY, X(MM.capR), capTopY + r);
  cap.lineTo(X(MM.capR), collarY - S(0.7));
  cap.lineTo(X(MM.capCollarR), collarY);
  cap.lineTo(X(MM.capCollarR), capBottom);
  cap.closePath();

  {
    const g = ctx.createLinearGradient(X(-MM.capCollarR), 0, X(MM.capCollarR), 0);
    g.addColorStop(0, p.capDark);
    g.addColorStop(0.14, p.cap);
    g.addColorStop(0.34, p.capLit);
    g.addColorStop(0.5, mix(p.capLit, 0.18));
    g.addColorStop(0.72, p.cap);
    g.addColorStop(1, p.capDark);
    ctx.fillStyle = g;
    ctx.fill(cap);
  }

  /* Riffelung - der deutlichste Hinweis auf die Drehung */
  ctx.save();
  ctx.clip(cap);
  drawFlutes(ctx, {
    cx,
    y0: Y(MM.capTop - 3.1),
    y1: Y(MM.mouth + 2.2),
    r: S(MM.capR),
    angle,
    count: 30,
    color: theme === "night" ? "rgba(250,250,246,0.3)" : "rgba(255,255,255,0.34)",
    dark: "rgba(0,0,0,0.34)",
    width: Math.max(0.8, S(0.42)),
  });
  ctx.restore();

  ctx.strokeStyle = p.edge;
  ctx.lineWidth = Math.max(1, S(0.3));
  ctx.stroke(cap);

  /* Deckfläche mit den vier Austrittsöffnungen */
  const faceRy = S(MM.capR) * TILT;
  ctx.beginPath();
  ctx.ellipse(cx, capTopY, S(MM.capR), faceRy, 0, 0, Math.PI * 2);
  {
    const g = ctx.createLinearGradient(X(-MM.capR), 0, X(MM.capR), 0);
    g.addColorStop(0, mix(p.cap, 0.04));
    g.addColorStop(0.42, mix(p.capLit, 0.1));
    g.addColorStop(1, p.capDark);
    ctx.fillStyle = g;
  }
  ctx.fill();
  ctx.strokeStyle = p.edge;
  ctx.lineWidth = 1;
  ctx.stroke();

  /* Teilkreis Ø 14 mm */
  for (let i = 0; i < 4; i++) {
    const a = angle + (i * Math.PI) / 2;
    const hx = cx + Math.sin(a) * S(7);
    const hy = capTopY - Math.cos(a) * S(7) * TILT;
    ctx.beginPath();
    ctx.ellipse(hx, hy, Math.max(1.1, S(0.9)), Math.max(0.8, S(0.9) * 0.5), 0, 0, Math.PI * 2);
    ctx.fillStyle = p.capDark;
    ctx.fill();
  }

  /* Filmscharnier der Klappe */
  {
    const a = angle + Math.PI;
    const vis = Math.max(0, Math.cos(a));
    if (vis > 0.02) {
      ctx.save();
      ctx.globalAlpha = 0.25 + 0.55 * vis;
      ctx.beginPath();
      ctx.moveTo(cx + Math.sin(a - 0.62) * S(MM.capR) * 0.95, capTopY - Math.cos(a - 0.62) * faceRy * 0.95);
      ctx.lineTo(cx + Math.sin(a + 0.62) * S(MM.capR) * 0.95, capTopY - Math.cos(a + 0.62) * faceRy * 0.95);
      ctx.strokeStyle = p.capDark;
      ctx.lineWidth = Math.max(1, S(0.45));
      ctx.stroke();
      ctx.restore();
    }
  }

  /* Betätigungslasche, steht 2,5 mm über die Mantelwand */
  {
    const a = angle + 1.45;
    const depth = Math.cos(a);
    const lx = cx + Math.sin(a) * S(MM.capR + 1.1);
    const ly = Y(MM.capTop - 3.2);
    const w = S(5.6) * (0.24 + Math.abs(depth) * 0.5);
    const h = S(3.2);
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, lx - w / 2, ly - h / 2, w, h, S(0.6));
    ctx.fillStyle = depth > 0 ? mix(p.capLit, 0.1) : mix(p.capDark, 0.12);
    ctx.fill();
    ctx.strokeStyle = p.capDark;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

/* ============================================================
   Lage der Flasche im Bild, damit Bezugslinien im DOM
   exakt an der Kontur ansetzen können.
   ============================================================ */

export function bottleBounds(cssW: number, cssH: number, anchorX = 0.5, fill = 0.86) {
  const scale = (cssH * fill) / MM.capTop;
  const height = MM.capTop * scale;
  const halfW = MM.capCollarR * scale;
  const cx = cssW * anchorX;
  const bottom = cssH * 0.5 + height / 2;
  return {
    scale,
    cx,
    bottom,
    top: bottom - height,
    left: cx - halfW,
    right: cx + halfW,
    height,
    width: halfW * 2,
  };
}

/* ============================================================
   Hilfen
   ============================================================ */

function drawFlutes(
  ctx: CanvasRenderingContext2D,
  o: {
    cx: number;
    y0: number;
    y1: number;
    r: number;
    angle: number;
    count: number;
    color: string;
    dark: string;
    width: number;
  },
) {
  ctx.save();
  for (let i = 0; i < o.count; i++) {
    const a = o.angle + (i / o.count) * Math.PI * 2;
    const depth = Math.cos(a);
    if (depth <= 0.03) continue;
    const x = o.cx + Math.sin(a) * o.r;
    const fade = Math.pow(depth, 0.85);
    ctx.globalAlpha = fade * 0.85;
    ctx.lineWidth = o.width * Math.max(0.35, depth);
    ctx.strokeStyle = o.color;
    ctx.beginPath();
    ctx.moveTo(x, o.y0);
    ctx.lineTo(x, o.y1);
    ctx.stroke();
    /* Schattenkante rechts daneben gibt der Rille Tiefe */
    ctx.globalAlpha = fade * 0.5;
    ctx.strokeStyle = o.dark;
    ctx.beginPath();
    ctx.moveTo(x + ctx.lineWidth, o.y0);
    ctx.lineTo(x + ctx.lineWidth, o.y1);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLabel(
  ctx: CanvasRenderingContext2D,
  o: {
    cx: number;
    yTop: number;
    yBottom: number;
    r: number;
    angle: number;
    text: string;
    band: string;
    ink: string;
  },
) {
  const h = o.yBottom - o.yTop;
  ctx.save();

  /* Bandfläche, an den Rändern abgedunkelt wie am Zylinder */
  const g = ctx.createLinearGradient(o.cx - o.r, 0, o.cx + o.r, 0);
  g.addColorStop(0, mix(o.band, -0.4));
  g.addColorStop(0.24, mix(o.band, 0.04));
  g.addColorStop(0.42, mix(o.band, 0.14));
  g.addColorStop(0.72, o.band);
  g.addColorStop(1, mix(o.band, -0.45));
  ctx.fillStyle = g;
  ctx.fillRect(o.cx - o.r - 2, o.yTop, o.r * 2 + 4, h);

  const fontPx = h * 0.4;
  ctx.font = `700 ${fontPx}px ${getComputedStyle(ctx.canvas).fontFamily || "sans-serif"}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const midY = o.yTop + h * 0.52;
  const chars = o.text.split("");
  const step = 0.26;

  /* zwei Wiederholungen, um 180 Grad versetzt */
  for (let rep = 0; rep < 2; rep++) {
    const base = o.angle + rep * Math.PI;
    chars.forEach((ch, i) => {
      const a = base + (i - (chars.length - 1) / 2) * step;
      const depth = Math.cos(a);
      if (depth <= 0.08) return;
      const x = o.cx + Math.sin(a) * o.r;
      ctx.save();
      ctx.translate(x, midY);
      ctx.scale(Math.max(0.1, depth), 1);
      ctx.globalAlpha = Math.min(1, Math.pow(depth, 0.45) * 1.25);
      ctx.fillStyle = o.ink;
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    });
  }

  /* schmale Trennlinie oberhalb des Schriftzugs */
  ctx.globalAlpha = 0.4;
  ctx.strokeStyle = o.ink;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(o.cx - o.r * 0.55, o.yTop + h * 0.19);
  ctx.lineTo(o.cx + o.r * 0.55, o.yTop + h * 0.19);
  ctx.stroke();

  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
}

/** Farbe aufhellen (t > 0) oder abdunkeln (t < 0) */
function mix(color: string, t: number): string {
  const hex = color.match(/^#([0-9a-f]{6})$/i);
  let r: number, g: number, b: number, a = 1;
  if (hex) {
    const n = parseInt(hex[1], 16);
    r = (n >> 16) & 255;
    g = (n >> 8) & 255;
    b = n & 255;
  } else {
    const parts = color.match(/-?\d*\.?\d+/g);
    if (!parts || parts.length < 3) return color;
    r = +parts[0];
    g = +parts[1];
    b = +parts[2];
    if (parts.length > 3) a = +parts[3];
  }
  const f = (c: number) => Math.round(t >= 0 ? c + (255 - c) * t : c * (1 + t));
  return a < 1 ? `rgba(${f(r)},${f(g)},${f(b)},${a})` : `rgb(${f(r)},${f(g)},${f(b)})`;
}
