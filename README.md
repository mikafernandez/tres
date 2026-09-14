# TRES — Produktseite

Einseitige Produktseite für die Verpackungseinheit aus der Patentanmeldung
*„Verpackungseinheit mit Vorratskammer im Schraubverschluss und
Bodenkammer"* (Int. Cl. B65D 51/28): ein 20-ml-Tequila-Shot, der Salz im
Schraubdeckel und Limettensaft im Flaschenboden mitführt.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktionsbuild
npm run renders  # zeigt, welche Bilder liegen und welche fehlen
```

## Was die Seite zeigt

| Abschnitt | Inhalt |
|---|---|
| Hero | Die Flasche lässt sich mit Maus, Finger oder Pfeiltasten drehen. Bezugslinien auf die drei Kammern. |
| Der Stand der Dinge | Drei Behältnisse werden eines, maßstäblich gegenübergestellt. |
| Aufbau | Gepinnte Sektion: beim Scrollen dreht sich die Einheit einmal um sich selbst, fünf Bauteile treten nacheinander hervor. |
| Der Deckel | Längsschnitt zum Aufklappen. Die Klappe schwenkt 135 Grad, die vier Austrittsöffnungen werden frei. Stückliste mit Hervorhebung. |
| Der Boden | Schnitt durch den Bodeneinzug. Die Siegelfolie lässt sich abziehen. |
| Datenblatt, Ablauf, Sorten, Schutzrecht, Rückfragen, Liste | Text und Zahlen aus der Anmeldung. |

Am linken Blattrand läuft eine Maßlinie mit: sie zeigt den Fortschritt und
trägt an jeder Teilung die Bezugsziffer des Bauteils, um das es im
jeweiligen Abschnitt geht. Die Teilungen sind anklickbar.

## Aufbau des Projekts

```
src/
  app/
    layout.tsx              Schriften, Metadaten
    page.tsx                Reihenfolge der Abschnitte
    globals.css             Farben, Schriftstufen, Zeichenhilfen
    api/waitlist/route.ts   Warteliste  ← vor dem Livegang anpassen
  content/
    product.ts              ALLE Texte und Zahlen an einer Stelle
  components/               ein Bauteil je Abschnitt
  lib/
    bottle.ts               zeichnet die Flasche, wenn kein Foto da ist
    frames.ts               Namensschema der Bildsequenz
    useSpinCanvas.ts        verbindet Canvas, Bilder und Drehwinkel
    assets.ts               liest public/renders/ beim Serverstart
```

**Texte ändern:** nur `src/content/product.ts`. Dort steht auch, aus welchem
Absatz der Anmeldung jede Zahl stammt.

**Namen ändern:** `brand.name` und `brand.wordmark` in derselben Datei. Der
Schriftzug auf dem gezeichneten Etikett zieht automatisch nach.

## Bilder

Die Seite funktioniert ohne ein einziges Foto — sie zeichnet die
Verpackungseinheit maßstäblich nach den Angaben der Anmeldung. Sobald
Renderings in `public/renders/` liegen, werden die benutzt.

Was genau gebraucht wird, mit Maßen, Winkeln, Farben und Dateinamen:
**[BILDER.md](./BILDER.md)**.

Kurzfassung:

- `public/renders/spin/spin_0001.webp` … `spin_0036.webp` — 36 Bilder, alle
  10 Grad, transparenter Hintergrund, identische Kamera
- `public/renders/ritual-01.webp` … `-03.webp` — die drei Abgabeschritte
- `public/renders/edition-{blanco,chili,sangrita,cristal}.webp`
- `public/renders/og.webp` — optional, für das Teilen in sozialen Netzen

Nach dem Einlegen den Dev-Server neu starten; das Verzeichnis wird beim
Serverstart gelesen.

## Vor dem Livegang

1. **Warteliste anschließen.** `src/app/api/waitlist/route.ts` schreibt die
   Adressen in eine lokale Datei. Auf Vercel und ähnlichen Plattformen ist
   das Dateisystem flüchtig — die Einträge wären nach dem nächsten Deploy
   weg. Einen echten Empfänger einsetzen (Datenbank, Resend, Brevo,
   Mailchimp) und die Einwilligung nach DSGVO ergänzen, üblicherweise als
   Double-Opt-in.
2. **Rechtliches.** Impressum, Datenschutz und Kontakt in
   `content/product.ts` unter `footer.links` zeigen auf `#`. Für eine
   Alkoholseite kommt in Deutschland in der Regel eine Altersabfrage hinzu.
3. **Domain eintragen.** `metadataBase` in `src/app/layout.tsx` steht auf
   `https://tres.example`.
4. **Hinweis prüfen.** Der Fußtext nennt die Seite ein Produktkonzept zur
   Patentanmeldung und stellt klar, dass die Verpackungseinheit noch nicht
   im Handel ist. Solange das stimmt, sollte er stehen bleiben.

## Technik

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 ·
GSAP 3.15 mit ScrollTrigger · Lenis für das Scrollen.

Die Flasche wird in ein Canvas gezeichnet, nicht als 3D-Szene gerechnet:
Kontur, Riffelung, Etikett und die vier Öffnungen in der Deckfläche folgen
den Maßen aus der Anmeldung und drehen sich mit dem Winkel. Das hält die
Seite leicht und macht sie unabhängig davon, ob Bilder vorliegen.

`prefers-reduced-motion` wird beachtet: Lenis bleibt dann aus, die gepinnte
Sektion zeigt alle fünf Erläuterungen untereinander, und die Zeichnungen
schalten ohne Übergang um.
