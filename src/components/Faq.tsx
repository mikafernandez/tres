import { Container, SectionHead } from "./Shell";
import { faq } from "@/content/product";

export default function Faq() {
  return (
    <section
      id="fragen"
      data-part="270"
      data-name="Dichtlippe"
      data-tone="night"
      className="bg-night-2 py-24 text-salt lg:py-32"
    >
      <Container className="lg:pl-rail">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead
              refNo="270"
              name={faq.kicker}
              title={faq.headline}
              night
            />
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-salt/20">
              {faq.items.map((item) => (
                <details
                  key={item.q}
                  className="group border-b border-salt/12"
                  name="faq"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 marker:hidden">
                    <h3 className="t-display-sm text-[clamp(1.05rem,1.6vw,1.25rem)] text-salt">
                      {item.q}
                    </h3>
                    <span
                      aria-hidden
                      className="relative mt-2 block h-3 w-3 shrink-0"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-3 bg-salt/60" />
                      <span className="absolute top-0 left-1/2 h-3 w-px bg-salt/60 transition-transform duration-300 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="t-body pr-8 pb-6 text-[0.98rem] text-salt/70">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
