"use client";

import Link from "next/link";
import { useState } from "react";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/cn";

/** FAQ accordion: each question opens and closes on its own. */
export function Faq() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section
      aria-labelledby="faq-title"
      className="title-vars relative z-4 bg-[#f3f6fa] px-6 pt-[90px] pb-[110px] font-mulish text-[#020f18] min-[1000px]:pt-[130px] min-[1000px]:pb-[200px]"
    >
      <div className="mx-auto grid w-[min(1275px,100%)] grid-cols-1 items-start gap-y-12 min-[1000px]:grid-cols-[544fr_731fr] min-[1000px]:gap-y-0">
        <div className="max-w-none min-[1000px]:max-w-[71%]">
          <p className="text-sm leading-[23px] font-bold tracking-[2.5px] text-gold uppercase">{FAQS.eyebrow}</p>
          <h3
            id="faq-title"
            className="mt-[25px] font-sans text-(length:--h2) leading-(--h2-lh) font-[450] tracking-[-.028em] [text-wrap:initial] text-[#020f18]"
          >
            {FAQS.title}
          </h3>
          <Link
            href={FAQS.cta.href}
            className="mt-[25px] inline-block rounded-[200px] border border-[rgba(154,154,154,.75)] px-[35px] py-[13px] text-sm leading-5 font-bold tracking-[2.5px] text-[#020f18] uppercase no-underline outline-none transition-[background-color,color,border-color] duration-200 hover:border-[#020f18] hover:bg-[#020f18] hover:text-white focus-visible:border-[#020f18] focus-visible:bg-[#020f18] focus-visible:text-white"
          >
            {FAQS.cta.label}
          </Link>
        </div>

        <div>
          {FAQS.items.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div key={item.q} className="relative border-b border-black/8">
                <h4>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => toggle(i)}
                    className="relative block w-full cursor-pointer py-[22px] pr-[60px] text-left text-[22px] leading-[30px] font-bold text-[#020f18] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#020f18] min-[600px]:py-[30px] min-[600px]:text-[30px] min-[600px]:leading-10"
                  >
                    <span>{item.q}</span>
                    <i
                      aria-hidden="true"
                      className={cn(
                        "absolute top-[37px] right-0 size-[30px] -translate-y-1/2 rounded-full border border-[#020f18] transition-[border-color,background-color] duration-150 motion-reduce:transition-none min-[600px]:top-[50px]",
                        "before:absolute before:top-1/2 before:left-1/2 before:h-[1.5px] before:w-[11px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-gold before:transition-[transform,background-color] before:duration-250 before:content-['']",
                        "after:absolute after:top-1/2 after:left-1/2 after:h-[11px] after:w-[1.5px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-gold after:transition-[transform,background-color] after:duration-250 after:content-['']",
                        isOpen && "bg-[#020f18] before:bg-white after:scale-y-0",
                      )}
                    />
                  </button>
                </h4>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-350 ease-in-out motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pt-[5px] pb-[35px]">
                      <p className="text-[17px] leading-7 font-normal text-[#020f18] min-[600px]:text-xl min-[600px]:leading-[31px]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
