import Image from "next/image";
import Link from "next/link";
import { INSIGHTS } from "@/lib/data";
import { cn } from "@/lib/cn";

function Chevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/** News & events: three cards whose white panel wipes away on hover (values from the reference). */
export function Insights() {
  return (
    <section
      aria-labelledby="insights-title"
      className="title-vars relative z-4 bg-white py-[74px] font-sans text-[#00142c] min-[640px]:py-[90px] min-[1024px]:py-[106px]"
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 min-[640px]:px-8">
        <p className="text-xs leading-4 font-semibold tracking-[.15em] text-gold uppercase">{INSIGHTS.eyebrow}</p>
        <h2
          id="insights-title"
          className="mt-3 font-jost text-(length:--h2) leading-(--h2-lh) font-medium tracking-normal uppercase [text-wrap:initial] text-[#00142c]"
        >
          {INSIGHTS.heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-[2fr_1fr_1fr] min-[1024px]:gap-8">
          {INSIGHTS.items.map((item, i) => {
            const lead = i === 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative block h-[30rem] overflow-hidden rounded-2xl bg-white text-[#00142c] no-underline shadow-[0_24px_50px_-34px_rgba(0,20,44,.45)] outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_#0b7fe0] min-[1280px]:h-[34rem]",
                  lead && "min-[640px]:col-span-2 min-[1024px]:col-span-1",
                )}
              >
                <Image src={item.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[rgba(1,15,33,.65)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                />
                <div className="absolute inset-x-0 bottom-0 h-[17rem]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-white [clip-path:inset(0)] transition-[clip-path] duration-300 ease-out group-hover:[clip-path:inset(100%_0_0_0)] group-focus-visible:[clip-path:inset(100%_0_0_0)] motion-reduce:transition-none"
                  />
                  <div className="relative flex h-full flex-col p-6 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white min-[1280px]:p-7 motion-reduce:transition-none">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-4">
                      <time
                        dateTime={item.iso}
                        className="text-[#4a6690] transition-colors duration-300 group-hover:text-white/70 group-focus-visible:text-white/70"
                      >
                        {item.date}
                      </time>
                    </p>
                    <span aria-hidden="true" className="mt-3 block h-0.5 w-4 shrink-0 bg-gold" />
                    <h3
                      className={cn(
                        "mt-4 line-clamp-4 shrink-0 text-lg leading-snug font-normal tracking-[-.025em] [text-wrap:initial] min-[1280px]:text-xl",
                        lead && "max-w-2xl line-clamp-3 text-2xl min-[1280px]:text-3xl",
                      )}
                    >
                      {item.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm leading-5 font-medium">
                      More <Chevron />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
