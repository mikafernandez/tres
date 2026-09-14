# Was an Bildern noch fehlt

Die Seite ist vollständig und funktioniert ohne ein einziges Foto: sie
zeichnet die Verpackungseinheit selbst. Sobald echte Renderings in
`public/renders/` liegen, benutzt sie die stattdessen — automatisch, ohne
Codeänderung.

**Ablauf:** Datei in den passenden Ordner legen → `npm run renders` zeigt,
was erkannt wurde → Dev-Server neu starten (oder neu deployen). Das
Verzeichnis wird beim Serverstart einmal gelesen.

---

## 1. Die 360-Grad-Sequenz (wichtigste Position)

**Ordner:** `public/renders/spin/`
**Dateien:** `spin_0001.webp` … `spin_0036.webp` — genau diese Schreibweise,
vierstellig, bei 1 beginnend.

| Vorgabe | Wert |
|---|---|
| Anzahl | 36 Bilder, ein Bild alle 10 Grad |
| Drehrichtung | im Uhrzeigersinn von oben gesehen |
| Bild 1 | Etikett frontal zur Kamera |
| Kamerahöhe | rund 8 Grad über der Horizontalen, in allen Bildern gleich |
| Abstand, Brennweite, Licht | in allen 36 Bildern identisch |
| Format | 1200 × 1600 px (3:4), WebP |
| Hintergrund | **transparent** |
| Dateigröße | möglichst unter 150 KB je Bild |

Der Hintergrund muss transparent sein, weil dieselbe Sequenz zweimal
verwendet wird: im Hero auf hellem Kalkstein und in der Aufbau-Sektion auf
fast schwarzem Grund.

Die Flasche soll etwa 86 Prozent der Bildhöhe einnehmen und waagerecht
mittig stehen — dann sitzen die Bezugslinien im Hero genau an der Kontur.

### Wie man 36 zueinander passende Bilder bekommt

Ein Bildmodell 36-mal einzeln zu fragen, ergibt 36 verschiedene Flaschen.
Drei Wege, die tatsächlich funktionieren:

1. **3D-Modell (zuverlässig).** Die Verpackungseinheit in Blender oder
   Fusion nach den Maßen unten aufbauen, Kamera fixieren, Objekt in 36
   Schritten drehen, als PNG-Sequenz mit Alphakanal rendern. Das ist der
   Weg, den Produktseiten üblicherweise gehen.
2. **Bild → Video → Einzelbilder (schnellster KI-Weg).** Ein einziges
   Produktbild erzeugen, es mit einem Bild-zu-Video-Modell um die eigene
   Achse drehen lassen („slow 360 degree turntable rotation, locked camera,
   seamless loop"), das Video in 36 Bilder zerlegen:

   ```bash
   ffmpeg -i turntable.mp4 -vf "fps=36/DAUER,scale=1200:-1" -vsync 0 spin_%04d.png
   # DAUER = Länge des Videos in Sekunden, damit genau 36 Bilder entstehen
   ```

   Danach freistellen und nach WebP wandeln:

   ```bash
   for f in spin_*.png; do cwebp -q 82 -alpha_q 100 "$f" -o "${f%.png}.webp"; done
   ```

3. **Fotografieren.** Muster auf einen Drehteller, Kamera auf Stativ, alle
   10 Grad auslösen, freistellen.

### Maße für das Modell (aus der Patentanmeldung)

| Teil | Maß |
|---|---|
| Behälter | Ø 30 mm, 55 mm hoch, PET, Wandstärke 0,4 mm |
| Schraubverschluss | Ø 30 mm, 16,5 mm hoch, PP, geriffelte Mantelwand |
| Gesamthöhe | 71,5 mm |
| Behältermund | Ø 25 mm Außengewinde, Steigung 3,2 mm |
| Austrittsöffnungen | 4 × Ø 1,8 mm auf einem Teilkreis von Ø 14 mm in der Deckfläche |
| Verschlussglied | Klappe über der Deckfläche, Betätigungslasche steht 2,5 mm über die Mantelwand |
| Bodeneinzug | Kegelstumpf, Öffnung Ø 23 mm unten, 15,5 mm tief, 7 Grad Wandneigung |
| Standring | bis Ø 30 mm, steht 0,94 mm über die Siegelfolie hinaus |
| Füllstand | 20 ml in einem Innenraum von 22 ml, also fast bis zur Schulter |

### Farben und Licht

| Element | Farbe |
|---|---|
| Verschluss | tiefes Agavengrün `#1D2A23`, matt |
| Spirituose | Bernstein `#C0801F`, klar |
| Bodenkammer | Limette `#93A827` |
| Etikettenband | Tiefgrün `#17201B` mit hellem Schriftzug `#E6E2D5` |
| Siegelfolie | Aluminium, leicht grünlich |

Weiches Hauptlicht von links oben, eine schmale Glanzkante links auf der
Flasche, kein harter Schlagschatten. Die Bilder liegen später auf hellem
und auf dunklem Grund — eine dunkle Kontur an der Silhouette hilft auf
beidem.

---

## 2. Der Ablauf, drei Bilder

**Ordner:** `public/renders/` · Format 4:5, 1000 × 1250 px, WebP
Hier ist ein Hintergrund erwünscht; die Bilder stehen auf fast schwarzem
Grund und werden formatfüllend beschnitten.

| Datei | Motiv |
|---|---|
| `ritual-01.webp` | Eine Hand hält die Flasche schräg, Klappe hochgeschwenkt, Salz rieselt aus den vier Öffnungen auf den Handrücken. Der Verschluss ist noch aufgeschraubt. |
| `ritual-02.webp` | Verschluss abgenommen, Flasche am Mund oder kurz davor. Die Klappe ist wieder zu. |
| `ritual-03.webp` | Flasche über Kopf, Daumen an der Aufreißlasche am Boden, Folie halb abgezogen. |

Gleiche Person, gleiche Hand, gleiches Licht in allen drei Bildern. Dunkle
Umgebung, warmes Licht von der Seite, Bar oder Küche, keine
Markenfremdkörper im Bild.

---

## 3. Die vier Sorten

**Ordner:** `public/renders/` · Format 3:4, 900 × 1200 px, WebP,
**transparenter Hintergrund**

| Datei | Deckel | Boden | Besonderheit |
|---|---|---|---|
| `edition-blanco.webp` | Speisesalz, weiß | Limettensaft, hellgrün | die Grundausführung |
| `edition-chili.webp` | Salz mit Chili, orangerot | Limettensaft | gröberes Korn sichtbar |
| `edition-sangrita.webp` | Speisesalz | Tomatenzubereitung, tiefrot | Boden 12 Grad geneigt, 17 mm tief |
| `edition-cristal.webp` | Speisesalz | Limettensaft | Behälter aus **Glas** statt PET, schwerer wirkend |

Frontalansicht, Etikett zur Kamera, gleiche Kamera und gleiches Licht wie
bei der Sequenz.

---

## 4. Bild für das Teilen in sozialen Netzen (optional)

**Datei:** `public/renders/og.webp` · 1200 × 630 px
Flasche links, viel Raum rechts. Wird automatisch als Open-Graph-Bild
eingetragen, sobald die Datei vorhanden ist.

---

## Anhaltspunkte für Bildprompts

Für ein Bildmodell, als Ausgangspunkt gedacht und nicht als fertige
Eingabe:

> Produktfoto einer sehr kleinen Einweg-Shotflasche, 30 mm Durchmesser,
> 71,5 mm hoch, klares PET, gefüllt mit bernsteinfarbener Spirituose.
> Darauf ein mattgrüner Schraubverschluss mit fein geriffelter Mantelwand
> und flacher Deckfläche, in der vier kleine Löcher auf einem Kreis sitzen,
> daneben eine kleine Klapplasche am Rand. Im eingezogenen Flaschenboden
> eine zweite, hellgrün gefüllte Kammer, unten mit Aluminiumfolie
> verschlossen. Schmales dunkelgrünes Etikettenband um die Mitte.
> Studiolicht von links oben, freigestellt, kein Hintergrund.

Für den Ablauf zusätzlich: „Hand hält die Flasche schräg, Salz rieselt aus
den Löchern im Deckel auf den Handrücken, dunkle Bar, warmes Seitenlicht."

---

## Prüfen, was gefunden wurde

```bash
npm run renders
```

Listet je Position, ob die Datei liegt oder fehlt, und zeigt an, welche
Teile der Seite noch gezeichnet werden.
