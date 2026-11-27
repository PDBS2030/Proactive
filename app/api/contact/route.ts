/**
 * Sends the Contact form's message to the office inbox. Mail goes out through Resend, using three settings kept in the
 * host's environment (never in the code):
 *   RESEND_API_KEY  the key from the Resend account
 *   CONTACT_FROM    the sender, on a domain verified in Resend, e.g. "PDBS Website <website@proactivedbs.com>"
 *   CONTACT_TO      where the messages go; info@proactivedbs.com if not set
 * The visitor's own address is set as the reply-to, so answering the email answers the visitor. Every message is also
 * kept in the admin inbox where the store can be written; if the email cannot go out but the copy was kept, the visitor
 * is still told it was received.
 */
import { addMessage } from "@/lib/db";

const TO_DEFAULT = "info@proactivedbs.com";

const clean = (value: unknown, max: number) => String(value ?? "").replace(/\r/g, "").trim().slice(0, max);
const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();
const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // a hidden field that people never see; anything that fills it in is a script, so it is quietly dropped
  if (clean(data.company, 200)) return Response.json({ ok: true });

  const first = oneLine(clean(data.first, 80));
  const last = oneLine(clean(data.last, 80));
  const email = oneLine(clean(data.email, 200));
  const phone = oneLine(clean(data.phone, 60));
  const topic = oneLine(clean(data.topic, 120)) || "General enquiry";
  const message = clean(data.message, 5000);

  if (!first || !last || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // keep a copy for the admin inbox wherever the store can be written (the developer's machine for now)
  const stored = addMessage({ first, last, email, phone, topic, message });

  const key = process.env.RESEND_API_KEY;
  if (!key) return stored ? Response.json({ ok: true }) : Response.json({ error: "not_configured" }, { status: 503 });

  const name = `${first} ${last}`;
  const text = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "not given"}`, `Topic: ${topic}`, "", message].join("\n");
  const html = `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Phone:</strong> ${escapeHtml(
    phone || "not given",
  )}<br><strong>Topic:</strong> ${escapeHtml(topic)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "PDBS Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || TO_DEFAULT],
      reply_to: email,
      subject: `${topic} — ${name}`,
      text,
      html,
    }),
  }).catch(() => null);

  if (!sent || !sent.ok) return stored ? Response.json({ ok: true }) : Response.json({ error: "send_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
