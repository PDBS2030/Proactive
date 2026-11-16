"use client";

import { useEffect, useRef, useState } from "react";
import { goToSection } from "@/components/Stack";
import { FOOTER } from "@/lib/data";

const SERVICES = ["Design-build", "Architecture and design", "Construction management", "Not sure yet"];
const TYPES = ["New construction", "Renovation or addition", "Interior fit-out", "Historic or landmark building", "Industrial conversion", "Other"];
const SIZES = ["Under $500K", "$500K to $2M", "$2M to $10M", "Over $10M", "Not sure yet"];
const WHEN = ["As soon as possible", "Within 3 months", "3 to 6 months", "6 to 12 months", "Just exploring"];
const PLANS = ["Yes", "In progress", "No"];

const field =
  "field-line mt-2 block w-full min-h-12 border border-[#143275]/25 bg-white px-4 py-3 text-[16px] leading-snug text-[#143275] outline-none transition-colors duration-200 placeholder:text-[#143275]/40 focus:border-gold focus-visible:border-gold";
const label = "block text-sm font-medium text-[#143275]";

/** Fired by the service buttons so the form opens with that service already chosen. */
export const INQUIRY_EVENT = "inquiry:service";

/** A button that scrolls to the inquiry form and chooses a service in it. */
export function InquiryLink({ service, className, children }: { service: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href="#inquiry"
      className={className}
      onClick={(e) => {
        window.dispatchEvent(new CustomEvent(INQUIRY_EVENT, { detail: service }));
        goToSection(e, "inquiry");
      }}
    >
      {children}
    </a>
  );
}

/** There is no server yet, so sending opens the visitor's email app with the details filled in. */
export function InquiryForm({
  idPrefix = "iq",
  initialService,
  listen = true,
  autoFocus = false,
  onSent,
}: {
  idPrefix?: string;
  initialService?: string;
  /** Follow the service buttons on the page. The popup chooses its own service instead. */
  listen?: boolean;
  autoFocus?: boolean;
  onSent?: () => void;
}) {
  const [service, setService] = useState(initialService && SERVICES.includes(initialService) ? initialService : SERVICES[0]);
  const [sent, setSent] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!listen) return;
    const on = (e: Event) => {
      const v = (e as CustomEvent<string>).detail;
      if (SERVICES.includes(v)) setService(v);
    };
    window.addEventListener(INQUIRY_EVENT, on);
    return () => window.removeEventListener(INQUIRY_EVENT, on);
  }, [listen]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone") || "not given"}`,
      `Service: ${service}`,
      `Project type: ${get("type")}`,
      `Location: ${get("location") || "not given"}`,
      `Budget: ${get("budget")}`,
      `Start: ${get("when")}`,
      `Plans or drawings exist: ${get("plans")}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${FOOTER.email}?subject=${encodeURIComponent(`${service} inquiry from ${get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    onSent?.();
  };

  return (
    <form ref={form} onSubmit={onSubmit} className="grid gap-5 min-[640px]:grid-cols-2" aria-describedby={`${idPrefix}-note`}>
      <div>
        <label htmlFor={`${idPrefix}-name`} className={label}>
          Your name
        </label>
        <input id={`${idPrefix}-name`} name="name" required autoFocus={autoFocus} autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`} className={label}>
          Email address
        </label>
        <input id={`${idPrefix}-email`} name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`} className={label}>
          Phone <span className="font-normal text-[#143275]/60">(optional)</span>
        </label>
        <input id={`${idPrefix}-phone`} name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-location`} className={label}>
          Project location
        </label>
        <input id={`${idPrefix}-location`} name="location" autoComplete="address-level2" placeholder="City and state" className={field} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-service`} className={label}>
          Service
        </label>
        <select id={`${idPrefix}-service`} value={service} onChange={(e) => setService(e.target.value)} className={field}>
          {SERVICES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-type`} className={label}>
          Type of project
        </label>
        <select id={`${idPrefix}-type`} name="type" defaultValue={TYPES[0]} className={field}>
          {TYPES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-budget`} className={label}>
          Estimated budget
        </label>
        <select id={`${idPrefix}-budget`} name="budget" defaultValue={SIZES[SIZES.length - 1]} className={field}>
          {SIZES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-when`} className={label}>
          When do you want to start?
        </label>
        <select id={`${idPrefix}-when`} name="when" defaultValue={WHEN[WHEN.length - 1]} className={field}>
          {WHEN.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <fieldset className="min-[640px]:col-span-2">
        <legend className={label}>Do you already have plans or drawings?</legend>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {PLANS.map((o, i) => (
            <label key={o} className="inline-flex min-h-8 cursor-pointer items-center gap-2 text-[15px] text-[#143275]">
              <input type="radio" name="plans" value={o} defaultChecked={i === 2} className="size-4 accent-[#143275]" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="min-[640px]:col-span-2">
        <label htmlFor={`${idPrefix}-message`} className={label}>
          Tell us about the project
        </label>
        <textarea id={`${idPrefix}-message`} name="message" required rows={5} placeholder="What you want to build, the site, and anything we should know." className={field} />
      </div>
      <div className="flex flex-wrap items-center gap-4 min-[640px]:col-span-2">
        <button
          type="submit"
          className="btn-sweep inline-flex min-h-12 cursor-pointer items-center justify-center border border-[#143275] bg-[#143275] bg-[linear-gradient(#fff,#fff)] px-8 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase outline-none hover:text-[#143275] focus-visible:text-[#143275]"
        >
          Send inquiry
        </button>
        <p id={`${idPrefix}-note`} role="status" className="text-[14px] leading-snug text-[#143275]/75">
          {sent ? "Your email app should now open with the details filled in. Press send there to finish." : "This opens your email app with your details filled in."}
        </p>
      </div>
    </form>
  );
}
