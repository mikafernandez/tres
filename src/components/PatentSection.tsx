import { Container, SectionHead } from "./Shell";
import { patent } from "@/content/product";

export default function PatentSection() {
  return (
    <section
      id="patent"
      data-part="260"
      data-name="Trennwand"
      data-tone="night"
      className="bg-night py-24 text-salt lg:py-32"
    >
      <Container className="lg:pl-rail">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              refNo="260"
              name={patent.kicker}
              title={patent.headline}
              night
            />
            <p className="t-body mt-7 text-salt/70">{patent.body}</p>
          </div>

          <div className="lg:col-span-7">
            {/* Der kennzeichnende Teil des Hauptanspruchs, im Wortlaut. */}
            <blockquote className="border-l-2 border-gold pl-6 lg:pl-8">
              <p className="font-text text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.55] text-salt/90 italic">
                {patent.claim}
              </p>
              <footer className="t-annot mt-5 text-[0.76rem] text-salt/45">
                {patent.claimSource}
              </footer>
            </blockquote>

            <dl className="mt-12 border-t border-salt/20">
              {patent.rows.map((r) => (
                <div
                  key={r.k}
                  className="grid gap-1 border-b border-salt/12 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6"
                >
                  <dt className="t-annot text-[0.76rem] text-salt/45">{r.k}</dt>
                  <dd className="t-annot text-[0.88rem] text-salt/90">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
