"use client";

import { useState } from "react";
import { FOOTER } from "@/lib/data";

const field =
  "mt-2 block w-full min-h-12 border border-[#143275]/25 bg-white px-4 py-3 text-[16px] leading-snug text-[#143275] outline-none transition-colors duration-200 placeholder:text-[#143275]/40 focus:border-gold focus-visible:border-gold";
const label = "block text-sm font-medium text-[#143275]";

/** There is no server yet, so sending opens the visitor's email app with the details filled in. */
export function ContactForm({ topics }: { topics: string[] }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const name = `${get("first")} ${get("last")}`.trim();
    const body = [`Name: ${name}`, `Email: ${get("email")}`, `Phone: ${get("phone") || "not given"}`, "", get("message")].join("\n");
    window.location.href = `mailto:${FOOTER.email}?subject=${encodeURIComponent(`${get("topic")} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5 min-[640px]:grid-cols-2" aria-describedby="contact-note">
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
          Phone <span className="font-normal text-[#143275]/60">(optional)</span>
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
          className="inline-flex min-h-12 cursor-pointer items-center justify-center border border-[#143275] bg-[#143275] px-8 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase transition-colors duration-300 outline-none hover:bg-transparent hover:text-[#143275] focus-visible:bg-transparent focus-visible:text-[#143275]"
        >
          Send message
        </button>
        <p id="contact-note" role="status" className="text-[14px] leading-snug text-[#143275]/75">
          {sent ? "Your email app should now open with the message filled in. Press send there to finish." : "This opens your email app with your message filled in."}
        </p>
      </div>
    </form>
  );
}
