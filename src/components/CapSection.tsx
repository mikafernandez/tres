"use client";

import { useState } from "react";
import { Container, SectionHead, DataRows } from "./Shell";
import PartsList from "./PartsList";
import CapDrawing from "./CapDrawing";
import { cap } from "@/content/product";

export default function CapSection() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="deckel"
      data-part="150"
      data-name="Schraubverschluss"
      data-tone="light"
      className="bg-limestone py-24 lg:py-32"
    >
      <Container className="lg:pl-rail">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead refNo="150" name={cap.kicker} title={cap.headline} />
            <p className="t-body mt-7 text-ink-2">{cap.body}</p>

            <div className="mt-8">
              <PartsList parts={cap.parts} active={active} onActive={setActive} />
            </div>
          </div>

          {/* Zeichnung */}
          <div className="lg:col-span-7">
            <figure className="border border-ink/20 bg-limestone-2/50">
              <div className="flex items-center justify-between gap-4 border-b border-ink/20 px-4 py-2.5">
                <figcaption className="t-annot text-[0.74rem] text-ink-2">
                  Längsschnitt, Verschlussglied in der{" "}
                  {open ? "Freigabestellung" : "Schließstellung"}
                </figcaption>
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="t-annot border border-ink px-3 py-1.5 text-[0.74rem] text-ink transition-colors hover:bg-ink hover:text-limestone"
                >
                  {open ? "Klappe schließen" : "Klappe öffnen"}
                </button>
              </div>
              <CapDrawing
                open={open}
                active={active}
                className="block w-full px-4 py-6"
              />
            </figure>

            <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              <div>
                <h3 className="t-display-sm text-[1.3rem] text-ink">
                  {cap.proof.headline}
                </h3>
                <div className="mt-4">
                  <DataRows rows={cap.proof.rows} />
                </div>
              </div>
              <div>
                <h3 className="t-display-sm text-[1.3rem] text-ink">
                  {cap.flow.headline}
                </h3>
                <p className="t-body mt-3 text-[0.98rem] text-ink-2">
                  {cap.flow.body}
                </p>
                <div className="mt-4">
                  <DataRows rows={cap.flow.rows} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
