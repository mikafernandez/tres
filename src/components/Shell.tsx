import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-14 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Kopf eines Abschnitts im Stil eines Schriftfelds auf einer Zeichnung:
 * links die Bezugsziffer des Bauteils, daneben der Gegenstand,
 * darunter eine Linie und die Überschrift.
 */
export function SectionHead({
  refNo,
  name,
  title,
  night = false,
  id,
}: {
  refNo?: string;
  name: string;
  title: string;
  night?: boolean;
  id?: string;
}) {
  return (
    <header id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        {refNo && (
          <span
            className={`t-num inline-flex h-6 min-w-9 items-center justify-center border px-1.5 text-[0.72rem] ${
              night
                ? "border-salt/35 text-salt/75"
                : "border-ink/35 text-ink/70"
            }`}
          >
            {refNo}
          </span>
        )}
        <span
          className={`t-annot text-[0.78rem] ${
            night ? "text-salt/65" : "text-ink-2/85"
          }`}
        >
          {name}
        </span>
      </div>
      <div
        className={`mt-3 h-px w-full ${night ? "bg-salt/20" : "bg-ink/20"}`}
      />
      <h2
        className={`t-display mt-6 max-w-[20ch] text-[clamp(2rem,4.2vw,3.4rem)] ${
          night ? "text-salt" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </header>
  );
}

/** Zahlenreihe im Stil einer Stückliste */
export function DataRows({
  rows,
  night = false,
}: {
  rows: { k: string; v: string; u?: string }[];
  night?: boolean;
}) {
  return (
    <dl className="w-full">
      {rows.map((r) => (
        <div
          key={r.k}
          className={`flex items-baseline justify-between gap-6 border-b py-3 ${
            night ? "border-salt/15" : "border-ink/15"
          }`}
        >
          <dt
            className={`t-annot text-[0.82rem] ${
              night ? "text-salt/70" : "text-ink-2"
            }`}
          >
            {r.k}
          </dt>
          <dd
            className={`t-num shrink-0 text-[1.05rem] ${
              night ? "text-salt" : "text-ink"
            }`}
          >
            {r.v}
            {r.u && (
              <span
                className={`t-annot ml-1.5 text-[0.72rem] ${
                  night ? "text-salt/55" : "text-ink-3"
                }`}
              >
                {r.u}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
