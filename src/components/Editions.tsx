import { Container, SectionHead } from "./Shell";
import Still from "./Still";
import { editions } from "@/content/product";

/* Die Farbpaare ergeben sich aus dem, was in den beiden Kammern steht. */
const FILLS: Record<string, { top: string; bottom: string }> = {
  salt: { top: "#f3f4ec", bottom: "#9fb22c" },
  gold: { top: "#d9762f", bottom: "#9fb22c" },
  rust: { top: "#f3f4ec", bottom: "#a33a24" },
  glass: { top: "#f3f4ec", bottom: "#c3d452" },
};

export default function Editions() {
  return (
    <section
      id="sorten"
      data-part="210"
      data-name="Feststoffgut"
      data-tone="night"
      className="bg-night-2 py-24 text-salt lg:py-32"
    >
      <Container className="lg:pl-rail">
        <div className="max-w-2xl">
          <SectionHead
            refNo="210"
            name={editions.kicker}
            title={editions.headline}
            night
          />
          <p className="t-body mt-7 text-salt/70">{editions.body}</p>
        </div>

        <ul className="mt-14 grid gap-px border border-salt/15 bg-salt/15 sm:grid-cols-2 lg:grid-cols-4">
          {editions.items.map((e) => {
            const f = FILLS[e.accent];
            return (
              <li key={e.code} className="flex flex-col bg-night p-5 lg:p-6">
                <div className="flex items-baseline justify-between">
                  <span className="t-num text-[0.72rem] text-salt/40">
                    {e.code}
                  </span>
                  <span className="t-annot text-[0.68rem] text-salt/35">
                    {e.ref}
                  </span>
                </div>

                <div className="relative mt-5 aspect-3/4 w-full overflow-hidden">
                  <Still
                    name={e.image}
                    alt={`TRES ${e.name}`}
                    className="h-full w-full object-contain"
                  >
                    <EditionGlyph
                      top={f.top}
                      bottom={f.bottom}
                      glass={e.accent === "glass"}
                    />
                  </Still>
                </div>

                <h3 className="t-display mt-5 text-[1.75rem] text-salt">
                  {e.name}
                </h3>

                <dl className="mt-4 border-t border-salt/15">
                  <div className="flex items-baseline gap-3 border-b border-salt/10 py-2">
                    <dt className="t-annot w-16 shrink-0 text-[0.7rem] text-salt/40">
                      Deckel
                    </dt>
                    <dd className="t-annot text-[0.76rem] text-salt/85">
                      {e.top}
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-3 border-b border-salt/10 py-2">
                    <dt className="t-annot w-16 shrink-0 text-[0.7rem] text-salt/40">
                      Boden
                    </dt>
                    <dd className="t-annot text-[0.76rem] text-salt/85">
                      {e.bottom}
                    </dd>
                  </div>
                </dl>

                <p className="t-annot mt-4 text-[0.74rem] leading-relaxed text-salt/50">
                  {e.note}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function EditionGlyph({
  top,
  bottom,
  glass = false,
}: {
  top: string;
  bottom: string;
  glass?: boolean;
}) {
  return (
    <svg viewBox="-24 -80 48 84" className="h-full w-full" role="img" aria-hidden>
      {/* Glasausführung: dickere Wand, hellerer Korpus */}
      {glass && (
        <path
          d="M -15 0 L -15 -68 Q -15 -71.5 -11.5 -71.5 L 11.5 -71.5 Q 15 -71.5 15 -68 L 15 0 Z"
          fill="var(--color-salt)"
          opacity="0.12"
        />
      )}
      {/* Spirituose */}
      <path d="M -14 -1 L -14 -40 L 14 -40 L 14 -1 Z" fill="#c2822a" opacity="0.55" />
      {/* Bodenkammer */}
      <path d="M -11 -1 L -9.6 -16 L 9.6 -16 L 11 -1 Z" fill={bottom} opacity="0.9" />
      {/* Vorratskammer im Verschluss */}
      <rect x="-13" y="-70" width="26" height="12" fill={top} opacity="0.9" />
      {/* Kontur */}
      <path
        d="M -15 0 L -15 -68 Q -15 -71.5 -11.5 -71.5 L 11.5 -71.5 Q 15 -71.5 15 -68 L 15 0 Z"
        fill="none"
        stroke="var(--color-salt)"
        strokeWidth={glass ? 2.4 : 1.3}
        opacity="0.8"
      />
      <line x1="-15" y1="-55" x2="15" y2="-55" stroke="var(--color-salt)" strokeWidth="1" opacity="0.55" />
      <rect x="15" y="-69" width="4" height="3.5" rx="1" fill="var(--color-salt)" opacity="0.55" />
    </svg>
  );
}
