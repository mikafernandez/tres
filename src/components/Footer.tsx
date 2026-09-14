import { Container } from "./Shell";
import { brand, footer, nav } from "@/content/product";

export default function Footer() {
  return (
    <footer className="bg-night pb-10 text-salt">
      <Container className="lg:pl-rail">
        <div className="border-t border-salt/20 pt-10">
          <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-8">
            <div>
              <span
                className="t-display block text-[1.35rem] text-salt"
                style={{ fontVariationSettings: '"wdth" 118, "wght" 800' }}
              >
                {brand.wordmark}
              </span>
              <p className="t-annot mt-2 text-[0.78rem] text-salt/50">
                {brand.claim}
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-7 gap-y-2">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="t-annot text-[0.78rem] text-salt/55 transition-colors hover:text-salt"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <nav className="flex flex-wrap gap-x-7 gap-y-2">
              {footer.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="t-annot text-[0.78rem] text-salt/40 transition-colors hover:text-salt"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-12 grid gap-6 border-t border-salt/12 pt-6 sm:grid-cols-[1fr_auto]">
            <p className="t-annot max-w-3xl text-[0.72rem] leading-relaxed text-salt/35">
              {footer.disclaimer}
            </p>
            <p className="t-annot text-[0.72rem] text-salt/45 sm:text-right">
              {footer.age}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
