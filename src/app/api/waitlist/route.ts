import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/* ------------------------------------------------------------------
   ACHTUNG vor dem Livegang:
   Diese Route schreibt die Adressen in eine lokale Datei. Das genügt
   für die Entwicklung, aber nicht für den Betrieb — auf Vercel und
   ähnlichen Plattformen ist das Dateisystem flüchtig, die Einträge
   wären nach dem nächsten Deploy weg.

   Vor der Veröffentlichung hier einen echten Empfänger einsetzen,
   zum Beispiel eine Datenbank, Resend, Brevo oder Mailchimp, und die
   Einwilligung nach DSGVO (Double-Opt-in) ergänzen.
   ------------------------------------------------------------------ */

const STORE = path.join(process.cwd(), ".data", "waitlist.jsonl");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = (await request.json()) as { email?: unknown });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return NextResponse.json(
      { ok: false, error: "Bitte eine gültige E-Mail-Adresse angeben." },
      { status: 422 },
    );
  }

  const entry = JSON.stringify({
    email: email.trim().toLowerCase(),
    at: new Date().toISOString(),
  });

  try {
    await mkdir(path.dirname(STORE), { recursive: true });
    await appendFile(STORE, entry + "\n", "utf8");
  } catch {
    /* Schreibt das Dateisystem nicht, bleibt wenigstens das Log. */
    console.warn("[waitlist]", entry);
  }

  return NextResponse.json({ ok: true });
}
