"use client";

import { useState } from "react";
import { Container } from "./Shell";
import { preorder } from "@/content/product";

type State = "idle" | "sending" | "done" | "error";

export default function Preorder() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Fehlgeschlagen");
      setState("done");
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Die Adresse konnte gerade nicht gespeichert werden. Bitte später erneut versuchen.",
      );
    }
  }

  return (
    <section
      id="liste"
      data-part="110"
      data-name="Siegelfolie"
      data-tone="night"
      className="bg-night py-24 text-salt lg:py-36"
    >
      <Container className="lg:pl-rail">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="t-annot text-[0.8rem] text-gold">
              {preorder.kicker}
            </span>
            <h2 className="t-display mt-4 text-[clamp(2.6rem,6.5vw,5rem)] text-salt">
              {preorder.headline}
            </h2>
            <p className="t-body mt-7 text-salt/70">{preorder.body}</p>
          </div>

          <div className="lg:col-span-5 lg:pt-20">
            {state === "done" ? (
              <p
                role="status"
                className="t-display-sm border-l-2 border-gold py-2 pl-5 text-[1.2rem] text-salt"
              >
                {preorder.success}
              </p>
            ) : (
              <form onSubmit={submit} noValidate>
                <label
                  htmlFor="waitlist-email"
                  className="t-annot block text-[0.78rem] text-salt/55"
                >
                  E-Mail-Adresse
                </label>
                <div className="mt-2 flex flex-wrap gap-3">
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    placeholder={preorder.placeholder}
                    className="t-annot min-w-0 flex-1 border-b border-salt/35 bg-transparent py-3 text-[0.95rem] text-salt placeholder:text-salt/30 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="t-annot bg-salt px-6 py-3 text-[0.85rem] text-night transition-colors hover:bg-gold disabled:opacity-50"
                  >
                    {state === "sending" ? "Moment…" : preorder.button}
                  </button>
                </div>
                <p className="t-annot mt-3 text-[0.72rem] text-salt/40">
                  {preorder.fine}
                </p>
                {state === "error" && (
                  <p
                    role="alert"
                    className="t-annot mt-3 text-[0.76rem] text-gold"
                  >
                    {message}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
