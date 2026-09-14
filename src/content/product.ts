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
      body: "Ein einstückiges PP-Spritzgussteil, 16,5 mm hoch statt 9 mm. Das ist der ganze bauliche Aufpreis: 1,3 g Polypropylen.",
    },
    {
      at: 0.28,
      ref: "200",
      title: "Vorratskammer",
      body: "1,86 cm³ zwischen Stirnwand und Trennwand, gefüllt mit 1,5 g Speisesalz. Ein Drittel bleibt frei, damit sich die Schüttung beim Kippen umlagern kann.",
    },
    {
      at: 0.5,
      ref: "260",
      title: "Trennwand",
      body: "1,2 mm PP, nach dem Befüllen von unten eingesetzt und umlaufend verschweißt. Dahinter eine Dichtlippe mit 0,35 mm Überdeckung. Zwei Barrieren zwischen Salz und Tequila.",
    },
    {
      at: 0.74,
      ref: "80",
      title: "Bodeneinzug",
      body: "Der Kegelstumpf im Flaschenboden, sonst reine Formsteifigkeit, fasst 5,43 ml. Darin stehen 5 ml Limettensaft.",
    },
    {
      at: 0.94,
      ref: "110",
      title: "Siegelfolie",
      body: "62 µm Aluminiumverbund, bei 190 °C aufgesiegelt. Der Standring steht 0,94 mm darüber hinaus — abgestellt berührt die Folie nie den Tisch.",
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
    { ref: "220", name: "Austrittsöffnungen", note: "4 × Ø 1,8 mm" },
    { ref: "190", name: "Stirnwand", note: "1,0 mm" },
    { ref: "160", name: "Kappenkörper", note: "PP, Ø 30 mm" },
    { ref: "200", name: "Vorratskammer", note: "1,86 cm³, 1,5 g Salz" },
    { ref: "260", name: "Trennwand", note: "1,2 mm, verschweißt" },
    { ref: "270", name: "Dichtlippe", note: "0,35 mm Überdeckung" },
    { ref: "180", name: "Innengewinde", note: "Ø 25 mm, 3,2 mm Steigung" },
  ],
  proof: {
    headline: "Warum sich dabei nichts aufdreht",
    rows: [
      { k: "Losbrechmoment der Schraubverbindung", v: "1,40", u: "Nm" },
      { k: "Öffnungskraft an der Klappe", v: "9,9", u: "N" },
      { k: "Moment um die Mittelachse bei 30 % Schrägzug", v: "0,053", u: "Nm" },
      { k: "Sicherheit gegen ungewolltes Aufdrehen", v: "26,7", u: "fach" },
    ],
  },
  flow: {
    headline: "Warum vier Löcher mit 1,8 mm",
    body: "Der Durchmesser muss mindestens das Vierfache des größten Salzkorns betragen, sonst verkeilen sich die Körner über der Öffnung zu einer tragenden Brücke und der Austritt setzt aus. Bei 0,4 mm Korn und 1,8 mm Öffnung liegt das Verhältnis bei 4,5.",
    rows: [
      { k: "Öffnungsdurchmesser", v: "1,8", u: "mm" },
      { k: "Größte Korngröße", v: "0,4", u: "mm" },
      { k: "Massenstrom, alle vier Öffnungen", v: "0,472", u: "g/s" },
      { k: "Übliche Portion 0,5 g nach", v: "1,1", u: "s" },
      { k: "Volle Füllung 1,5 g nach", v: "3,2", u: "s" },
    ],
  },
};

/* ---------- Abschnitt: Boden ---------- */

export const base = {
  kicker: "Der Boden",
  headline: "Die Limette liegt schon richtig",
  body: "Die Bodenkammer sitzt am anderen Ende der Flasche. Beim Trinken kippt sie von selbst nach oben, in genau die Lage, in der man sie öffnet. Zwischen Salz, Shot und Limette muss die Flasche weder abgestellt noch umgegriffen werden.",
  parts: [
    { ref: "90", name: "Standring", note: "steht 0,94 mm über der Folie" },
    { ref: "110", name: "Siegelfolie", note: "62 µm Alu-Verbund" },
    { ref: "120", name: "Aufreißlasche", note: "10 × 6 mm, innen liegend" },
    { ref: "100", name: "Siegelfläche", note: "Ring Ø 23 auf 27 mm" },
    { ref: "130", name: "Bodenkammer", note: "5,43 ml, 5 ml Füllung" },
    { ref: "80", name: "Bodeneinzug", note: "Kegelstumpf, 7 Grad geneigt" },
  ],
  proof: {
    headline: "Dicht, auch bei 750 hPa",
    body: "Die kritische Last ist der Druckabfall im Flugzeug. Fällt der Außendruck von 1013 auf 750 hPa, drückt die Kammer mit 10,9 N gegen die Naht.",
    rows: [
      { k: "Länge der Siegelnaht", v: "78,5", u: "mm" },
      { k: "Haltekraft der Naht", v: "52,4", u: "N" },
      { k: "Last bei 750 hPa", v: "10,9", u: "N" },
      { k: "Sicherheit gegen Aufreißen", v: "4,8", u: "fach" },
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
      title: "Klappe hoch, kippen",
      body: "Die Originalitätssicherung reißt bei 9,9 N, deutlich unter der Daumenkraft und deutlich über allem, was im Transport passiert. Salz läuft auf den Handrücken. Der Shot bleibt verschlossen.",
      meta: "3,2 s für 1,5 g",
      image: "ritual-01",
    },
    {
      n: "02",
      ref: "150",
      title: "Deckel ab, Shot",
      body: "Erst jetzt wird der Behälter geöffnet. Die Klappe ist längst wieder zu, es kann nichts nachrieseln. 20 ml, 38 % vol.",
      meta: "20 ml",
      image: "ritual-02",
    },
    {
      n: "03",
      ref: "110",
      title: "Weiterkippen, Folie ab",
      body: "Der Boden zeigt am Ende der Trinkbewegung ohnehin nach oben. Lasche greifen, Folie abziehen, Limette hinterher.",
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
        { k: "Spirituose", v: "20", u: "ml", sub: "38 % vol, 18,8 g" },
        { k: "Speisesalz", v: "1,5", u: "g", sub: "Korn 0,2 bis 0,4 mm" },
        { k: "Limettensaft", v: "5,0", u: "ml", sub: "5,2 g" },
      ],
    },
    {
      title: "Maße",
      rows: [
        { k: "Außendurchmesser", v: "30", u: "mm", sub: "Standring wie Serie" },
        { k: "Höhe mit Verschluss", v: "71,5", u: "mm", sub: "55 plus 16,5 mm" },
        { k: "Masse gefüllt", v: "36,0", u: "g", sub: "verzehrfertig" },
      ],
    },
    {
      title: "Werkstoffe",
      rows: [
        { k: "Behälter", v: "6,5", u: "g", sub: "PET, streckgeblasen, 0,4 mm" },
        { k: "Schraubverschluss", v: "3,9", u: "g", sub: "PP, Spritzguss" },
        { k: "Siegelfolie", v: "0,06", u: "g", sub: "PET 12 / Alu 20 / PP 30 µm" },
      ],
    },
  ],
  footnote:
    "Mehraufwand gegenüber einer Shot-Flasche ohne Begleitkomponenten: 1,3 g Polypropylen und 0,06 g Folie.",
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
      ref: "[0039]",
      accent: "salt" as const,
      image: "edition-blanco",
    },
    {
      code: "02",
      name: "Chili",
      top: "Salz mit 20 % gemahlenem Chili",
      bottom: "Limettensaft",
      note: "Gröberes Korn, deshalb größere Austrittsöffnungen. Das Verhältnis bleibt bei vier.",
      ref: "[0065]",
      accent: "gold" as const,
      image: "edition-chili",
    },
    {
      code: "03",
      name: "Sangrita",
      top: "Speisesalz",
      bottom: "Gewürzte Tomatenzubereitung",
      note: "Zähflüssiger, deshalb 12 statt 7 Grad Wandneigung und 17 mm Tiefe. 5,08 ml.",
      ref: "[0066]",
      accent: "rust" as const,
      image: "edition-sangrita",
    },
    {
      code: "04",
      name: "Cristal",
      top: "Speisesalz",
      bottom: "Limettensaft",
      note: "Behälter aus Glas. Der Bodeneinzug kommt beim Formen mit, die Siegelfläche wird auf 0,05 mm plan geschliffen.",
      ref: "[0067]",
      accent: "glass" as const,
      image: "edition-cristal",
    },
  ],
};

/* ---------- Abschnitt: Patent ---------- */

export const patent = {
  kicker: "Schutzrecht",
  headline: "Zum Patent angemeldet",
  body: "Der Kern ist nicht der Deckel und nicht der Boden für sich, sondern dass beide Kammern nach außen abgeben statt in den Behälter hinein, und dass keine der drei Abgaben die anderen auslöst.",
  rows: [
    {
      k: "Bezeichnung",
      v: "Verpackungseinheit mit Vorratskammer im Schraubverschluss und Bodenkammer",
    },
    { k: "Internationale Klassifikation", v: "B65D 51/28" },
    { k: "Anmeldetag", v: "13. September 2026" },
    { k: "Erfinder", v: "Mika Fernandez Muniz" },
  ],
  claim:
    "… wobei die Vorratskammer zum Behälterinnenraum hin durch eine geschlossene Trennwand abgeschlossen ist, wobei das Verschlussglied ohne Drehung des Schraubverschlusses gegenüber dem Behältermund zwischen der Schließstellung und der Freigabestellung bewegbar ist …",
  claimSource: "Anspruch 1, kennzeichnender Teil",
};

/* ---------- Abschnitt: FAQ ---------- */

export const faq = {
  kicker: "Rückfragen",
  headline: "Was man zuerst fragt",
  items: [
    {
      q: "Warum liegt das Salz nicht einfach lose im Getränk?",
      a: "Speisesalz ist hygroskopisch. Neben einer Flüssigkeit zieht es Feuchtigkeit und verbackt zu einem Klumpen, der nicht mehr rieselt. Die verschweißte Trennwand und die Dichtlippe halten die Kammer über die gesamte Lagerdauer trocken. Es gibt keinen Weg für Feuchtigkeit zwischen Tequila und Salz.",
    },
    {
      q: "Kann sich der Deckel beim Salzen aufdrehen?",
      a: "Nein. Die Klappe schwenkt um eine Achse quer zur Schraubachse. Die Öffnungskraft wirkt damit in einer Ebene durch die Mittelachse, ihr Moment um diese Achse ist rechnerisch null. Selbst bei 30 % Schrägzug bleiben 0,053 Nm gegen ein Losbrechmoment von 1,40 Nm.",
    },
    {
      q: "Hält die Bodenfolie im Flugzeug?",
      a: "Beim Abfall des Kabinendrucks auf 750 hPa entsteht in der Bodenkammer 0,263 bar Überdruck, der mit 10,9 N gegen die Naht drückt. Die Siegelnaht hält 52,4 N. Von Hand abziehen lässt sie sich trotzdem mit 8 bis 14 N, weil sie dabei fortschreitend und nicht auf ganzer Länge gleichzeitig getrennt wird.",
    },
    {
      q: "Wird die Abfüllung dadurch komplizierter?",
      a: "Nein. Beide Kammern werden von außen befüllt und verschlossen, bevor sie den Abfüllbetrieb erreichen: der Verschlusshersteller füllt das Salz ein und schweißt die Trennwand, der Behälterhersteller füllt den Saft ein und siegelt. Die bestehende Linie füllt weiter nur den Tequila und schraubt zu.",
    },
    {
      q: "Passt das noch in bestehende Kartonagen?",
      a: "Ja. Weil keine Kammer an den Behälter angeformt wird, bleibt die Außenkontur die einer gewöhnlichen 30-mm-Shot-Flasche. Nur der Verschluss baut 7,5 mm höher.",
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
