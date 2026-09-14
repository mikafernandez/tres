"use client";

import { useState } from "react";
import { Container, SectionHead, DataRows } from "./Shell";
import PartsList from "./PartsList";
import BaseDrawing from "./BaseDrawing";
import { base } from "@/content/product";

export default function BaseSection() {
  const [peeled, setPeeled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="boden"
      data-part="130"
      data-name="Bodenkammer"
      data-tone="light"
      className="bg-limestone-2 py-24 lg:py-32"
    >
      <Container className="lg:pl-rail">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          {/* Zeichnung zuerst: sie trägt das Argument */}
          <div className="lg:col-span-7">
            <figure className="border border-ink/20 bg-limestone/60">
              <div className="flex items-center justify-between gap-4 border-b border-ink/20 px-4 py-2.5">
                <figcaption className="t-annot text-[0.74rem] text-ink-2">
                  Schnitt durch den Behälterboden,{" "}
                  {peeled ? "Siegelfolie abgezogen" : "Siegelfolie unversehrt"}
                </figcaption>
                <button
                  type="button"
                  onClick={() => setPeeled((v) => !v)}
                  className="t-annot border border-ink px-3 py-1.5 text-[0.74rem] text-ink transition-colors hover:bg-ink hover:text-limestone"
                >
                  {peeled ? "Folie zurücklegen" : "Folie abziehen"}
                </button>
              </div>
              <BaseDrawing
                peeled={peeled}
                active={active}
                className="block w-full px-4 py-6"
              />
            </figure>

            <div className="mt-10 max-w-xl">
              <h3 className="t-display-sm text-[1.3rem] text-ink">
                {base.proof.headline}
              </h3>
              <p className="t-body mt-3 text-[0.98rem] text-ink-2">
                {base.proof.body}
              </p>
              <div className="mt-4">
                <DataRows rows={base.proof.rows} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SectionHead refNo="130" name={base.kicker} title={base.headline} />
            <p className="t-body mt-7 text-ink-2">{base.body}</p>
            <div className="mt-8">
              <PartsList
                parts={base.parts}
                active={active}
                onActive={setActive}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
