"use client";

type Part = { ref: string; name: string; note: string };

/**
 * Stückliste zur Zeichnung. Zeigt man auf eine Zeile, hebt sich das
 * zugehörige Bauteil in der Zeichnung hervor.
 */
export default function PartsList({
  parts,
  active,
  onActive,
  night = false,
}: {
  parts: Part[];
  active: string | null;
  onActive: (ref: string | null) => void;
  night?: boolean;
}) {
  return (
    <ul
      className={`border-t ${night ? "border-salt/20" : "border-ink/20"}`}
      onMouseLeave={() => onActive(null)}
    >
      {parts.map((p) => {
        const on = active === p.ref;
        return (
          <li key={p.ref}>
            <button
              type="button"
              onMouseEnter={() => onActive(p.ref)}
              onFocus={() => onActive(p.ref)}
              onBlur={() => onActive(null)}
              aria-pressed={on}
              className={`flex w-full items-baseline gap-3 border-b py-2.5 text-left transition-colors ${
                night ? "border-salt/12" : "border-ink/12"
              } ${on ? (night ? "bg-salt/6" : "bg-ink/5") : ""}`}
            >
              <span
                className={`t-num inline-flex h-5 min-w-8 shrink-0 items-center justify-center border px-1 text-[0.66rem] transition-colors ${
                  on
                    ? "border-gold text-gold"
                    : night
                      ? "border-salt/25 text-salt/55"
                      : "border-ink/25 text-ink/50"
                }`}
              >
                {p.ref}
              </span>
              <span
                className={`t-display-sm text-[0.98rem] ${night ? "text-salt" : "text-ink"}`}
              >
                {p.name}
              </span>
              <span
                className={`t-annot ml-auto shrink-0 pl-3 text-right text-[0.72rem] ${
                  night ? "text-salt/50" : "text-ink-3"
                }`}
              >
                {p.note}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
