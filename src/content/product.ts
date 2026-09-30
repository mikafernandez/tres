/* ============================================================
   Alle Texte und Zahlen der Seite an einer Stelle.
   Die Werte stammen aus der Patentanmeldung
   "Verpackungseinheit mit Vorratskammer im Schraubverschluss
   und Bodenkammer" (Int. Cl. B65D 51/28).
   Absatznummern in Klammern verweisen auf die Anmeldung.
   ============================================================ */

export const brand = {
  name: "TRES",
  wordmark: "TRES",
  claim: "Salz oben. Limette unten. Tequila dazwischen.",
};

export const hero = {
  headline: ["Ein Behälter.", "Drei Kammern.", "Kein Zubehör."],
  lede: "Salz oben, Limette unten, 20 ml Tequila dazwischen. Die komplette Reihenfolge steckt schon in der Flasche — kein Streuer, keine Limettenscheibe, keine zweite Hand.",
  cta: "Auf die Liste",
  ctaSub: "So funktioniert der Deckel",
  dragHint: "Ziehen zum Drehen",
  callouts: [
    { ref: "200", label: "Salz", detail: "1,5 g im Deckel", at: 0.14 },
    { ref: "60", label: "Tequila", detail: "20 ml, 38 % vol", at: 0.52 },
    { ref: "130", label: "Limette", detail: "5 ml im Boden", at: 0.88 },
  ],
};

/* ---------- Abschnitt: drei werden eins ---------- */

export const reduction = {
  kicker: "Der Stand der Dinge",
  headline: "Ein Shot, drei Behältnisse",
  body: "Bis heute braucht die Reihenfolge Salz, Tequila, Limette drei getrennte Gefäße: einen Streuer, das Glas, ein Schälchen. Alle drei müssen mitgeführt, geöffnet und entsorgt werden, und für den Shot selbst muss man mindestens einmal absetzen.",
  counts: [
    { n: "3", label: "Behältnisse heute", tone: "before" as const },
    { n: "1", label: "mit TRES", tone: "after" as const },
  ],
  closing:
    "TRES nutzt zwei Hohlräume, die an jeder Shot-Flasche ohnehin vorhanden sind und bisher leer bleiben: den Raum unter dem Schraubdeckel und den eingezogenen Flaschenboden. Die Außenkontur bleibt identisch — gleiche Stellfläche im Regal, gleiche Kartonage.",
};

/* ---------- Abschnitt: Scroll-Sequenz ---------- */

export const sequence = {
  kicker: "Aufbau",
  headline: "Drei Kammern, kein Kontakt",
  /* `at` = Fortschritt 0 bis 1 innerhalb der gepinnten Sequenz */
  stops: [
    {
      at: 0.05,
      ref: "150",
      title: "Schraubverschluss",
      body: "Ein einstückiges PP-Spritzgussteil, 16,5 mm hoch, aufgestockt um genau die Höhe der Salzkammer. Das ist der ganze bauliche Aufpreis: rund 1,3 g Polypropylen.",
    },
    {
      at: 0.28,
      ref: "200",
      title: "Vorratskammer",
      body: "Rund 1,9 ml zwischen Stirnwand und Trennwand, gefüllt mit 1,5 g Speisesalz. Ein Drittel bleibt frei, damit das Salz beim Kippen den Öffnungen zuläuft.",
    },
    {
      at: 0.5,
      ref: "260",
      title: "Trennwand",
      body: "1,2 mm PP, nach dem Befüllen von unten eingesetzt und umlaufend verschweißt. Darunter eine Dichtlippe, die in den Flaschenmund taucht und zugleich die Mündungsdichtung ist. Zwei Barrieren zwischen Salz und Tequila.",
    },
    {
      at: 0.74,
      ref: "80",
      title: "Bodeneinzug",
      body: "Der Kegelstumpf im Flaschenboden, sonst reine Formsteifigkeit, fasst rund 5,4 ml. Darin stehen 5 ml Limettensaft; 7 Grad Wandneigung lassen ihn restlos auslaufen.",
    },
    {
      at: 0.94,
      ref: "110",
      title: "Siegelfolie",
      body: "62 µm Aluminiumverbund mit säurefester Siegelschicht, bei etwa 160 °C aufgesiegelt. Die Siegelfläche liegt 1 mm hinter dem Standring zurück — abgestellt berührt die Folie nie den Tisch.",
    },
  ],
};

/* ---------- Abschnitt: Deckel ---------- */

export const cap = {
  kicker: "Der Deckel",
  headline: "Ein Salzstreuer, der den Shot nicht öffnet",
  body: "Die Klappe sitzt an einem 0,3 mm dünnen Filmscharnier und schwenkt quer zur Schraubachse. Wer sie aufreißt, dreht den Verschluss nicht mit — und wer den Verschluss abdreht, öffnet die Salzkammer nicht. Die beiden Bewegungen haben nichts miteinander zu tun.",
  parts: [
    { ref: "230", name: "Verschlussglied", note: "Klappe, 135 Grad Schwenk" },
    { ref: "220", name: "Austrittsöffnungen", note: "4 × Ø 1,8 mm, Teilkreis 14 mm" },
    { ref: "300", name: "Dichtzapfen", note: "je Öffnung einer, an der Klappe" },
    { ref: "190", name: "Stirnwand", note: "1,0 mm" },
    { ref: "160", name: "Kappenkörper", note: "PP, Ø 30 mm" },
    { ref: "200", name: "Vorratskammer", note: "rund 1,9 ml, 1,5 g Salz" },
    { ref: "260", name: "Trennwand", note: "1,2 mm, verschweißt" },
    { ref: "270", name: "Dichtlippe", note: "zugleich Mündungsdichtung" },
    { ref: "180", name: "Innengewinde", note: "Ø 25 mm, 9 mm lang" },
  ],
  proof: {
    headline: "Warum sich dabei nichts aufdreht",
    rows: [
      { k: "Losbrechmoment der Schraubverbindung", v: "1,4", u: "Nm" },
      { k: "Öffnungskraft an der Klappe", v: "≈ 10", u: "N" },
      { k: "Moment der Öffnungskraft um die Mittelachse", v: "0", u: "Nm" },
      { k: "Drehscheiben-Variante: Stellmoment", v: "0,15", u: "Nm" },
    ],
  },
  flow: {
    headline: "Warum vier Löcher mit 1,8 mm",
    body: "Der Durchmesser muss mindestens das Vierfache des größten Salzkorns betragen, sonst verkeilen sich die Körner über der Öffnung zu einer tragenden Brücke und der Austritt setzt aus. Bei 0,4 mm Korn und 1,8 mm Öffnung liegt das Verhältnis bei 4,5.",
    rows: [
      { k: "Öffnungsdurchmesser", v: "1,8", u: "mm" },
      { k: "Größte Korngröße", v: "0,4", u: "mm" },
      { k: "Verhältnis Öffnung zu Korn", v: "4,5", u: "" },
      { k: "Übliche Portion", v: "0,3 – 0,7", u: "g" },
      { k: "abgegeben in etwa", v: "1", u: "s" },
    ],
  },
};

/* ---------- Abschnitt: Boden ---------- */

export const base = {
  kicker: "Der Boden",
  headline: "Die Limette liegt schon richtig",
  body: "Die Bodenkammer sitzt am anderen Ende der Flasche. Beim Trinken kippt sie von selbst nach oben, in genau die Lage, in der man sie öffnet. Zwischen Salz, Shot und Limette muss die Flasche weder abgestellt noch umgegriffen werden.",
  parts: [
    { ref: "90", name: "Standring", note: "steht über die Folie hinaus" },
    { ref: "110", name: "Siegelfolie", note: "62 µm Alu-Verbund, 160 °C" },
    { ref: "120", name: "Aufreißlasche", note: "20 × 12 mm, nach innen umgelegt" },
    { ref: "100", name: "Siegelfläche", note: "Ring Ø 23 auf 27 mm, 1 mm zurück" },
    { ref: "130", name: "Bodenkammer", note: "rund 5,4 ml, 5 ml Füllung" },
    { ref: "80", name: "Bodeneinzug", note: "Kegelstumpf, 7 Grad geneigt" },
  ],
  proof: {
    headline: "Dicht im Flugzeug, leicht von Hand",
    body: "Die Naht hält den Überdruck bei Erwärmung und Lufttransport mit Reserve, der Kopfraum über dem Saft fängt Wärmedehnung und Druckänderung auf. Beim Abziehen wird sie fortschreitend getrennt, deshalb genügt wenig Kraft.",
    rows: [
      { k: "Nahtfestigkeit", v: "10", u: "N / 15 mm" },
      { k: "Länge der Siegelnaht", v: "78,5", u: "mm" },
      { k: "Haltekraft der Naht", v: "52,4", u: "N" },
      { k: "Abziehkraft von Hand", v: "8 – 14", u: "N" },
    ],
  },
};

/* ---------- Abschnitt: Ritual ---------- */

export const ritual = {
  kicker: "Der Ablauf",
  headline: "Drei Schritte, eine Hand",
  steps: [
    {
      n: "01",
      ref: "230",
      title: "Klappe hoch, über Kopf",
      body: "Die Originalitätssicherung reißt bei etwa 10 N, deutlich unter der Daumenkraft und deutlich über allem, was im Transport passiert. Über Kopf halten, leicht schütteln, Salz läuft auf den Handrücken. Der Shot bleibt verschlossen.",
      meta: "0,5 g in 1 s",
      image: "ritual-01",
    },
    {
      n: "02",
      ref: "150",
      title: "Klappe zu, Deckel ab, Shot",
      body: "Klappe zurückschwenken, erst dann den Verschluss abschrauben. In den offenen Shot kann nichts rieseln. Salz vom Handrücken, dann 20 ml, 38 % vol.",
      meta: "20 ml",
      image: "ritual-02",
    },
    {
      n: "03",
      ref: "110",
      title: "Folie ab, Boden an den Mund",
      body: "Beim Trinken zeigt der Boden ohnehin nach oben, die Folie liegt griffbereit. Lasche greifen, abziehen, die Flasche aus dem Handgelenk zurückschwenken und den Boden an den Mund führen — der Saft läuft über die geneigte Wand aus.",
      meta: "5 ml",
      image: "ritual-03",
    },
  ],
};

/* ---------- Abschnitt: Daten ---------- */

export const specs = {
  kicker: "Datenblatt",
  headline: "Was drin ist und was es wiegt",
  groups: [
    {
      title: "Füllgüter",
      rows: [
        { k: "Spirituose", v: "20", u: "ml", sub: "38 % vol, Innenraum 26 ml" },
        { k: "Speisesalz", v: "1,5", u: "g", sub: "Korn 0,2 bis 0,4 mm" },
        { k: "Limettensaft", v: "5,0", u: "ml", sub: "in 5,4 ml Bodenkammer" },
      ],
    },
    {
      title: "Maße",
      rows: [
        { k: "Außendurchmesser", v: "30", u: "mm", sub: "Standring wie Serie" },
        { k: "Höhe mit Verschluss", v: "71,5", u: "mm", sub: "55 plus 16,5 mm" },
        { k: "Verschluss", v: "16,5", u: "mm", sub: "Ø 30 mm, Gewinde Ø 25 mm" },
      ],
    },
    {
      title: "Werkstoffe",
      rows: [
        { k: "Behälter", v: "0,4", u: "mm", sub: "PET, streckgeblasen, Boden 0,8 bis 1,2 mm" },
        { k: "Schraubverschluss", v: "1,0", u: "mm", sub: "PP, Spritzguss, Stirnwand" },
        { k: "Siegelfolie", v: "62", u: "µm", sub: "PET 12 / Alu 20 / Copolyester 30 µm" },
      ],
    },
  ],
  footnote:
    "Mehraufwand gegenüber einer Shot-Flasche ohne Begleitkomponenten: rund 1,3 g Polypropylen und die Siegelfolie.",
};

/* ---------- Abschnitt: Sorten ---------- */

export const editions = {
  kicker: "Sorten",
  headline: "Vier Füllungen, ein Bauteilsatz",
  body: "Die Kammern geben nur die Mengen vor, nicht den Inhalt. Was sich ändert, ist die Füllung, und in einem Fall die Neigung des Bodeneinzugs.",
  items: [
    {
      code: "01",
      name: "Blanco",
      top: "Speisesalz",
      bottom: "Limettensaft",
      note: "Die Auslegung, auf die alle Zahlen dieser Seite gerechnet sind.",
      ref: "[0038]",
      accent: "salt" as const,
      image: "edition-blanco",
    },
    {
      code: "02",
      name: "Chili",
      top: "Salz mit 20 % gemahlenem Chili",
      bottom: "Limettensaft",
      note: "Die Öffnungen richten sich nach dem gröbsten Korn der Mischung: mindestens das Vierfache.",
      ref: "[0062]",
      accent: "gold" as const,
      image: "edition-chili",
    },
    {
      code: "03",
      name: "Sangrita",
      top: "Speisesalz",
      bottom: "Gewürzte Tomatenzubereitung",
      note: "Zähflüssiger, deshalb 12 statt 7 Grad Wandneigung. Lichte Weite und Siegelfläche bleiben gleich.",
      ref: "[0063]",
      accent: "rust" as const,
      image: "edition-sangrita",
    },
    {
      code: "04",
      name: "Cristal",
      top: "Speisesalz",
      bottom: "Limettensaft",
      note: "Behälter aus Glas. Der Bodeneinzug kommt beim Formen mit, die Siegelfläche wird plan geschliffen, gesiegelt wird mit Siegellack.",
      ref: "[0064]",
      accent: "glass" as const,
      image: "edition-cristal",
    },
  ],
};

/* ---------- Abschnitt: Patent ---------- */

export const patent = {
  kicker: "Schutzrecht",
  headline: "Zum Patent angemeldet",
  body: "Der Kern ist nicht der Deckel und nicht der Boden für sich, sondern ihr Zusammenspiel: Beide Kammern geben nach außen ab statt in den Behälter hinein, keine der drei Abgaben löst eine andere aus, und die Trinkbewegung bringt jede Kammer von selbst in die Lage, in der sie gebraucht wird.",
  rows: [
    {
      k: "Bezeichnung",
      v: "Verpackungseinheit mit Vorratskammer im Schraubverschluss und Bodenkammer",
    },
    { k: "Internationale Klassifikation", v: "B65D 51/28" },
    { k: "Anmeldetag", v: "30. September 2026" },
    { k: "Erfinder", v: "Mika Fernandez Muniz" },
  ],
  claim:
    "… wobei die Austrittsöffnung in der Stirnwand angeordnet und die Vorratskammer zum Behälterinnenraum hin durch eine geschlossene Trennwand abgeschlossen ist, wobei das Verschlussglied am Kappenkörper beweglich gelagert und bei gegenüber dem Behältermund feststehendem Schraubverschluss zwischen der Schließstellung und der Freigabestellung bewegbar ist …",
  claimSource: "Anspruch 1, kennzeichnender Teil",
};

/* ---------- Abschnitt: FAQ ---------- */

export const faq = {
  kicker: "Rückfragen",
  headline: "Was man zuerst fragt",
  items: [
    {
      q: "Warum liegt das Salz nicht einfach lose im Getränk?",
      a: "Speisesalz ist hygroskopisch. Neben einer Flüssigkeit zieht es Feuchtigkeit und verbackt zu einem Klumpen, der nicht mehr rieselt. Die verschweißte Trennwand und die Dichtlippe halten die Kammer über die gesamte Lagerdauer trocken. Es gibt keinen Weg für Feuchtigkeit zwischen Tequila und Salz, und nach außen begrenzt die geschlossene Klappe den Luftaustausch.",
    },
    {
      q: "Kann sich der Deckel beim Salzen aufdrehen?",
      a: "Nein. Die Klappe schwenkt um eine Achse quer zur Schraubachse. Die Öffnungskraft wirkt damit in einer Ebene durch die Mittelachse und erzeugt kein Moment, das den Verschluss lösen könnte. Umgekehrt öffnet das Abschrauben die Salzkammer nicht.",
    },
    {
      q: "Hält die Bodenfolie im Flugzeug?",
      a: "Ja. Die Siegelnaht hält mit 10 N je 15 mm den Überdruck bei Erwärmung und Lufttransport mit Reserve, und der Kopfraum über dem Saft fängt die Druckänderung auf. Von Hand abziehen lässt sie sich trotzdem mit 8 bis 14 N, weil sie dabei fortschreitend und nicht auf ganzer Länge gleichzeitig getrennt wird.",
    },
    {
      q: "Wird die Abfüllung dadurch komplizierter?",
      a: "Nein. Beide Kammern werden von außen befüllt und verschlossen, bevor sie den Abfüllbetrieb erreichen: der Verschlusshersteller füllt das Salz ein und schweißt die Trennwand, der Behälterhersteller füllt den Saft ein und siegelt. Die bestehende Linie füllt weiter nur den Tequila und schraubt zu.",
    },
    {
      q: "Passt das noch in bestehende Kartonagen?",
      a: "Ja. Weil keine Kammer an den Behälter angeformt wird, bleibt die Außenkontur die einer gewöhnlichen 30-mm-Shot-Flasche. Nur der Verschluss baut um die Höhe der Salzkammer höher.",
    },
  ],
};

export const preorder = {
  kicker: "Noch nicht im Handel",
  headline: "Erste Charge, kleine Liste",
  body: "TRES ist als Verpackungseinheit fertig ausgelegt und zum Patent angemeldet. Wer bei der ersten Produktionscharge dabei sein will, hinterlässt eine Adresse. Wir melden uns, wenn ein Abfülltermin steht.",
  placeholder: "deine@adresse.de",
  button: "Eintragen",
  success: "Steht auf der Liste. Wir melden uns.",
  fine: "Eine Mail zum Start, sonst nichts.",
};

export const footer = {
  disclaimer:
    "TRES ist ein Produktkonzept zur Patentanmeldung „Verpackungseinheit mit Vorratskammer im Schraubverschluss und Bodenkammer“ (KIT, Institut für Technik der Informationsverarbeitung, Seminar „Wir machen ein Patent“). Die Verpackungseinheit ist noch nicht im Handel erhältlich.",
  age: "Alkohol erst ab 18. Kein Verkauf an Jugendliche.",
  links: [
    { label: "Impressum", href: "#" },
    { label: "Datenschutz", href: "#" },
    { label: "Kontakt", href: "#" },
  ],
};

export const nav = [
  { label: "Aufbau", href: "#aufbau" },
  { label: "Deckel", href: "#deckel" },
  { label: "Boden", href: "#boden" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Daten", href: "#daten" },
  { label: "Sorten", href: "#sorten" },
];
