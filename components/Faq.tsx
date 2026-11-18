"use client";

import Link from "next/link";
import { useState } from "react";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/cn";

/** FAQ accordion: each question opens and closes on its own. */
export function Faq({ data = FAQS, roomy = false }: { data?: typeof FAQS; roomy?: boolean }) {
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
      className={cn(
        "title-vars relative z-4 bg-[#f3f6fa] px-4 font-sans text-[#020f18] min-[768px]:px-[124px]",
        roomy ? "py-[94px] min-[768px]:py-[140px]" : "py-16 min-[768px]:py-[110px]",
      )}
    >
      <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 items-start gap-y-12 min-[1000px]:grid-cols-[544fr_731fr] min-[1000px]:gap-y-0">
        <div className="max-w-none min-[1000px]:max-w-[71%]">
          <p className="text-xs leading-4 font-semibold tracking-[.15em] text-gold uppercase">{data.eyebrow}</p>
          <h3
            id="faq-title"
            className="mt-[25px] font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial] text-[#020f18]"
          >
            {data.title}
          </h3>
          <Link
            href={data.cta.href}
            className="mt-[25px] inline-block rounded-[200px] border border-[rgba(154,154,154,.75)] px-[35px] py-[13px] text-[.8125rem] leading-5 font-medium tracking-[.08em] text-[#020f18] uppercase no-underline outline-none transition-[background-color,color,border-color] duration-200 hover:border-[#020f18] hover:bg-[#020f18] hover:text-white focus-visible:border-[#020f18] focus-visible:bg-[#020f18] focus-visible:text-white"
          >
            {data.cta.label}
          </Link>
        </div>

        <div>
          {data.items.map((item, i) => {
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
                    className="relative block w-full cursor-pointer py-[22px] pr-[60px] text-left text-[length:max(18px,calc(var(--h2)*.68))] leading-[1.3] font-medium text-[#020f18] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#020f18] min-[600px]:py-[30px]"
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
                      <p className="font-mulish text-[17px] leading-[1.65] font-normal text-[#020f18]">
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
