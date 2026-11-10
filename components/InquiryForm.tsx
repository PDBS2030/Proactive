"use client";

import { useState } from "react";
import { FOOTER } from "@/lib/data";

const field =
  "mt-2 block w-full border border-[#143275]/25 bg-white px-4 py-3 text-[16px] leading-snug text-[#143275] outline-none transition-colors duration-200 placeholder:text-[#143275]/40 focus:border-gold focus-visible:border-gold";
const label = "block text-sm font-medium text-[#143275]";

/** No server yet: sending opens the visitor's email app with the details filled in. */
export function InquiryForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const body = [
      `Name: ${get("name")}`,
      `Phone: ${get("phone") || "not given"}`,
      `Service: ${get("service")}`,
      `Project location: ${get("location") || "not given"}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${FOOTER.email}?subject=${encodeURIComponent(`Project inquiry from ${get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5 min-[640px]:grid-cols-2" aria-describedby="inquiry-note">
      <div>
        <label htmlFor="inq-name" className={label}>
          Your name
        </label>
        <input id="inq-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="inq-phone" className={label}>
          Phone <span className="font-normal text-[#143275]/60">(optional)</span>
        </label>
        <input id="inq-phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div>
        <label htmlFor="inq-service" className={label}>
          What do you need?
        </label>
        <select id="inq-service" name="service" defaultValue="Design-build" className={field}>
          <option>Design-build</option>
          <option>Architecture and design</option>
          <option>Construction management</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="inq-location" className={label}>
          Project location
        </label>
        <input id="inq-location" name="location" autoComplete="address-level2" placeholder="City, state" className={field} />
      </div>
      <div className="min-[640px]:col-span-2">
        <label htmlFor="inq-message" className={label}>
          Tell us about the project
        </label>
        <textarea id="inq-message" name="message" required rows={5} placeholder="Type of building, size, timeline and budget range if you have them." className={field} />
      </div>
      <div className="flex flex-wrap items-center gap-4 min-[640px]:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-12 cursor-pointer items-center justify-center border border-[#143275] bg-[#143275] px-8 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase transition-colors duration-300 outline-none hover:bg-transparent hover:text-[#143275] focus-visible:bg-transparent focus-visible:text-[#143275]"
        >
          Send inquiry
        </button>
        <p id="inquiry-note" role="status" className="text-[14px] leading-snug text-[#143275]/75">
          {sent
            ? "Your email app should now open with the details filled in. Press send there to finish."
            : "This opens your email app with your details filled in."}
        </p>
      </div>
    </form>
  );
}
