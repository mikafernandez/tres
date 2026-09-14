import { Container, SectionHead } from "./Shell";
import { specs } from "@/content/product";

export default function Specs() {
  return (
    <section
      id="daten"
      data-part="60"
      data-name="Füllgüter"
      data-tone="light"
      className="bg-limestone py-24 lg:py-32"
    >
      <Container className="lg:pl-rail">
        <div className="max-w-2xl">
          <SectionHead
            refNo="60"
            name={specs.kicker}
            title={specs.headline}
          />
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {specs.groups.map((g) => (
            <div key={g.title}>
              <h3 className="t-annot border-b border-ink pb-2 text-[0.82rem] text-ink">
                {g.title}
              </h3>
              <dl>
                {g.rows.map((r) => (
                  <div key={r.k} className="border-b border-ink/15 py-4">
                    <dt className="t-annot text-[0.78rem] text-ink-2">{r.k}</dt>
                    <dd className="mt-1.5 flex items-baseline gap-1.5">
                      <span className="t-num text-[2rem] leading-none text-ink">
                        {r.v}
                      </span>
                      <span className="t-annot text-[0.85rem] text-ink-3">
                        {r.u}
                      </span>
                    </dd>
                    <p className="t-annot mt-1.5 text-[0.72rem] text-ink-3">
                      {r.sub}
                    </p>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="t-annot mt-8 max-w-xl text-[0.78rem] leading-relaxed text-ink-3">
          {specs.footnote}
        </p>
      </Container>
    </section>
  );
}
