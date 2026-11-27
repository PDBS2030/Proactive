"use client";

import { useState } from "react";
import { FOOTER } from "@/lib/data";

const field =
  "field-line mt-2 block w-full min-h-12 border border-[#082b52]/25 bg-white px-4 py-3 text-[16px] leading-snug text-[#082b52] outline-none transition-[border-color,box-shadow,translate] duration-300 ease-out placeholder:text-[#082b52]/40 hover:-translate-y-px hover:border-[#082b52]/55 hover:shadow-[0_8px_16px_-12px_rgba(8,43,82,.45)] focus:border-gold focus:shadow-[0_0_0_3px_rgba(181,143,72,.18)] focus-visible:border-gold motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const label = "block text-sm font-medium text-[#082b52]";

/** Sends the message to the office inbox through /api/contact and says plainly whether it went. */
export function ContactForm({ topics }: { topics: string[] }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const f = new FormData(form);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first: get("first"),
          last: get("last"),
          email: get("email"),
          phone: get("phone"),
          topic: get("topic"),
          message: get("message"),
          company: get("company"),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5 min-[640px]:grid-cols-2" aria-describedby="contact-note">
      {/* a field only a script would fill in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-company">Company</label>
        <input id="c-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="c-first" className={label}>
          First name
        </label>
        <input id="c-first" name="first" required autoComplete="given-name" className={field} />
      </div>
      <div>
        <label htmlFor="c-last" className={label}>
          Last name
        </label>
        <input id="c-last" name="last" required autoComplete="family-name" className={field} />
      </div>
      <div>
        <label htmlFor="c-email" className={label}>
          Email address
        </label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="c-phone" className={label}>
          Phone <span className="font-normal text-[#082b52]/60">(optional)</span>
        </label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div className="min-[640px]:col-span-2">
        <label htmlFor="c-topic" className={label}>
          How can we help?
        </label>
        <select id="c-topic" name="topic" defaultValue={topics[0]} className={field}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="min-[640px]:col-span-2">
        <label htmlFor="c-message" className={label}>
          Your message
        </label>
        <textarea id="c-message" name="message" required rows={6} className={field} />
      </div>
      <div className="flex flex-wrap items-center gap-4 min-[640px]:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex disabled:cursor-wait disabled:opacity-70 min-h-12 cursor-pointer items-center justify-center gap-3 border border-[#082b52] bg-[#082b52] px-8 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase transition-[color,background-color,translate,box-shadow] duration-300 outline-none hover:-translate-y-0.5 hover:bg-transparent hover:text-[#082b52] hover:shadow-[0_12px_20px_-14px_rgba(8,43,82,.6)] focus-visible:bg-transparent focus-visible:text-[#082b52] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {state === "sending" ? "Sending…" : "Send message"}
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
            <path d="M1 5h14M11 1l4 4-4 4" />
          </svg>
        </button>
        <p id="contact-note" role="status" className="text-[14px] leading-snug text-[#082b52]/75">
          {state === "sent" && "Thank you. Your message has been sent to our team, and we will reply within one business day."}
          {state === "error" && (
            <>
              We could not send your message just now. Please try again, or email us at{" "}
              <a href={`mailto:${FOOTER.email}`} className="underline underline-offset-4">
                {FOOTER.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
