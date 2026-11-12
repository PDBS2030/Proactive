import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ServicesNav } from "@/components/ServicesNav";
import { cn } from "@/lib/cn";
import {
  COMPARISON,
  MARKETS,
  PHASES,
  SERVICES_CTA,
  SERVICES_FAQS,
  SERVICES_PAGE,
  SERVICE_LIST,
} from "@/lib/services";
import { FOOTER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — PROACTIVE Design and Building Systems",
  description:
    "Architecture, design-build and construction management from one accountable team, serving Maryland, DC and Virginia.",
};

const NAV_ITEMS = [
  ...SERVICE_LIST.map((s) => ({ id: s.id, label: s.name })),
  { id: "why-design-build", label: "Why design-build" },
  { id: "markets", label: "Markets" },
  { id: "faqs", label: "FAQs" },
];

const title =
  "font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]";
const eyebrow = "text-xs leading-4 font-semibold tracking-[.15em] text-gold uppercase";
const btnPrimary =
  "inline-flex min-h-12 items-center justify-center border border-[#143275] bg-[#143275] px-7 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline transition-colors duration-300 outline-none hover:bg-transparent hover:text-[#143275] focus-visible:bg-transparent focus-visible:text-[#143275]";
const btnGhost =
  "inline-flex min-h-12 items-center justify-center border border-[#143275]/30 px-7 text-[.8125rem] font-medium tracking-[.08em] text-[#143275] uppercase no-underline transition-colors duration-300 outline-none hover:border-gold focus-visible:border-gold";

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-[3px] shrink-0 text-gold">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="offerings-vars relative bg-white text-[#143275]">
        {/* Hero */}
        <section className="px-4 pt-[150px] pb-14 min-[768px]:px-[124px] min-[768px]:pt-[190px] min-[768px]:pb-[72px]">
          <div className="mx-auto grid w-full max-w-[1680px] gap-10 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
            <div className="min-[992px]:col-span-7">
              <p className={eyebrow}>{SERVICES_PAGE.eyebrow}</p>
              <h1 className="mt-4 font-jost text-[22.4px] leading-[27px] font-medium tracking-normal uppercase min-[690px]:text-[34.2px] min-[690px]:leading-[39px] min-[992px]:text-[length:min(54px,calc((100vw-299px)/12.55))] min-[992px]:leading-[1.11]">
                {SERVICES_PAGE.title}
              </h1>
            </div>
            <div className="flex flex-col justify-end min-[992px]:col-span-5">
              <p className="font-mulish text-[20px] leading-[31px] font-normal text-[#143275] min-[992px]:text-[length:clamp(14px,calc((50vw-184px)/32.5),20px)] min-[992px]:leading-[1.55]">{SERVICES_PAGE.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={SERVICES_PAGE.primaryCta.href} className={btnPrimary}>
                  {SERVICES_PAGE.primaryCta.label}
                </Link>
                <Link href={SERVICES_PAGE.secondaryCta.href} className={btnGhost}>
                  {SERVICES_PAGE.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-12 grid w-full max-w-[1680px] gap-4 min-[992px]:mt-16 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
            <div className="relative aspect-[16/10] overflow-hidden min-[992px]:col-span-7 min-[992px]:aspect-auto min-[992px]:min-h-[420px]">
              <Image src={SERVICES_PAGE.image} alt={SERVICES_PAGE.imageAlt} fill priority sizes="(max-width: 992px) 100vw, 58vw" className="object-cover" />
            </div>
            <ul className="grid gap-4 min-[992px]:col-span-5">
              {SERVICE_LIST.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex h-full items-center gap-5 border border-[#143275]/12 p-5 text-inherit no-underline transition-colors duration-300 outline-none hover:border-gold focus-visible:border-gold min-[768px]:p-7"
                  >
                    <span aria-hidden="true" className="h-10 w-0.5 shrink-0 bg-gold" />
                    <span className="flex-1">
                      <span className="block text-(length:--h5) leading-(--h5-lh) font-(--h5-weight)">{s.name}</span>
                      <span className="mt-1 block text-[14px] leading-snug text-[#143275]/70">{s.short}</span>
                    </span>
                    <span aria-hidden="true" className="text-xl transition-transform duration-300 group-hover:translate-y-1 group-focus-visible:translate-y-1">↓</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mx-auto mt-6 w-full max-w-[1680px] text-xs font-semibold tracking-[.15em] text-[#143275]/70 uppercase">{SERVICES_PAGE.regions}</p>
        </section>

        <ServicesNav items={NAV_ITEMS} />

        {/* The three services */}
        {SERVICE_LIST.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={cn("scroll-mt-[170px] px-4 py-16 min-[768px]:px-[124px] min-[768px]:py-[110px]", i % 2 === 1 && "bg-[#f3f6fa]")}
          >
            <div className="mx-auto grid w-full max-w-[1680px] items-center gap-10 min-[992px]:grid-cols-12 min-[992px]:gap-x-14">
              <div className={cn("relative aspect-[4/3] overflow-hidden min-[992px]:col-span-6", i % 2 === 1 && "min-[992px]:order-2")}>
                <Image src={s.image} alt={s.alt} fill sizes="(max-width: 992px) 100vw, 50vw" className="object-cover" />
                <span aria-hidden="true" className="absolute top-0 left-0 h-12 w-12 border-t-2 border-l-2 border-gold" />
              </div>
              <div className={cn("min-[992px]:col-span-6", i % 2 === 1 && "min-[992px]:order-1")}>
                <p className={eyebrow}>{s.name}</p>
                <h2 id={`${s.id}-title`} className={cn(title, "mt-4")}>
                  {s.headline}
                </h2>
                <p className="mt-5 font-mulish text-[17px] leading-[1.65] text-[#143275]/85">{s.body}</p>
                <h3 className="mt-8 text-xs font-semibold tracking-[.15em] uppercase">What’s included</h3>
                <ul className="mt-3 grid gap-2.5">
                  {s.includes.map((x) => (
                    <li key={x} className="flex gap-3 text-[15px] leading-snug">
                      <Check />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-8 grid gap-4 border-t border-[#143275]/12 pt-6 min-[640px]:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold tracking-[.15em] text-gold uppercase">Best for</dt>
                    <dd className="mt-1.5 text-[15px] leading-snug">{s.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-[.15em] text-gold uppercase">You receive</dt>
                    <dd className="mt-1.5 text-[15px] leading-snug">{s.outcome}</dd>
                  </div>
                </dl>
                <Link href="/contact" className={cn(btnPrimary, "mt-8")}>
                  Discuss {s.name}
                </Link>
              </div>
            </div>
          </section>
        ))}

        {/* Why design-build */}
        <section id="why-design-build" aria-labelledby="why-title" className="scroll-mt-[170px] bg-[#082b52] px-4 py-16 text-white min-[768px]:px-[124px] min-[768px]:py-[110px]">
          <div className="mx-auto w-full max-w-[1680px]">
            <p className={eyebrow}>The difference</p>
            <h2 id="why-title" className={cn(title, "mt-4")}>
              {COMPARISON.heading}
            </h2>
            <p className="mt-4 max-w-2xl font-mulish text-[17px] leading-[1.6] text-white/80">{COMPARISON.lead}</p>

            <div className="mt-10 hidden border-t border-white/20 min-[768px]:block">
              <div className="grid grid-cols-[1fr_1.4fr_1.4fr] gap-x-8 py-4 text-xs font-semibold tracking-[.15em] uppercase">
                <span className="sr-only">Topic</span>
                <span aria-hidden="true" />
                <span className="text-white/60">{COMPARISON.columns[0]}</span>
                <span className="text-gold">{COMPARISON.columns[1]}</span>
              </div>
              {COMPARISON.rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[1fr_1.4fr_1.4fr] gap-x-8 border-t border-white/15 py-5 text-[16px] leading-snug">
                  <span className="font-medium">{r.label}</span>
                  <span className="text-white/65">{r.a}</span>
                  <span className="text-white">{r.b}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 min-[768px]:hidden">
              {COMPARISON.rows.map((r) => (
                <div key={r.label} className="border border-white/20 p-5">
                  <p className="text-xs font-semibold tracking-[.15em] uppercase">{r.label}</p>
                  <p className="mt-3 text-[14px] text-white/60">
                    <span className="block text-[11px] tracking-[.12em] uppercase">{COMPARISON.columns[0]}</span>
                    {r.a}
                  </p>
                  <p className="mt-3 text-[15px]">
                    <span className="block text-[11px] tracking-[.12em] text-gold uppercase">{COMPARISON.columns[1]}</span>
                    {r.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process teaser */}
        <section aria-labelledby="phases-title" className="px-4 py-16 min-[768px]:px-[124px] min-[768px]:py-[110px]">
          <div className="mx-auto w-full max-w-[1680px]">
            <h2 id="phases-title" className={title}>
              {PHASES.heading}
            </h2>
            <p className="mt-4 max-w-2xl font-mulish text-[17px] leading-[1.6] text-[#143275]/85">{PHASES.lead}</p>
            <ol className="mt-10 grid gap-6 min-[992px]:grid-cols-3 min-[992px]:gap-x-10">
              {PHASES.items.map((p) => (
                <li key={p.n} className="border-t border-[#143275]/15 pt-5">
                  <span aria-hidden="true" className="block h-0.5 w-10 bg-gold" />
                  <h3 className="mt-4 text-(length:--h5) leading-(--h5-lh) font-(--h5-weight)">{p.title}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-[.15em] text-[#143275]/60 uppercase">{p.steps}</p>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[#143275]/85">{p.text}</p>
                </li>
              ))}
            </ol>
            <Link href={PHASES.cta.href} className={cn(btnGhost, "mt-10")}>
              {PHASES.cta.label}
            </Link>
          </div>
        </section>

        {/* Markets */}
        <section id="markets" aria-labelledby="markets-title" className="scroll-mt-[170px] border-t border-[#143275]/10 px-4 py-16 min-[768px]:px-[124px] min-[768px]:py-[110px]">
          <div className="mx-auto w-full max-w-[1680px]">
            <h2 id="markets-title" className={title}>
              {MARKETS.heading}
            </h2>
            <p className="mt-4 font-mulish text-[17px] leading-[1.6] text-[#143275]/85">{MARKETS.lead}</p>
            <ul className="mt-10 grid gap-6 min-[768px]:grid-cols-3 min-[768px]:gap-x-8">
              {MARKETS.items.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="group block text-inherit no-underline outline-offset-[3px] focus-visible:outline-2 focus-visible:outline-[#2356e5]">
                    <span className="relative block aspect-[4/3] overflow-hidden">
                      <Image src={m.image} alt={m.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none" />
                    </span>
                    <span className="mt-4 flex items-center justify-between gap-4 border-b border-[#143275]/15 pb-3 text-(length:--h5) leading-(--h5-lh) font-(--h5-weight) transition-colors duration-300 group-hover:border-gold group-focus-visible:border-gold">
                      {m.title}
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div id="faqs" className="scroll-mt-[120px]">
          <Faq data={SERVICES_FAQS} />
        </div>

        {/* Closing call to action */}
        <section aria-labelledby="cta-title" className="bg-[#082b52] px-4 py-16 text-center text-white min-[768px]:px-[124px] min-[768px]:py-[100px]">
          <div className="mx-auto max-w-3xl">
            <h2 id="cta-title" className={title}>
              {SERVICES_CTA.title}
            </h2>
            <p className="mt-4 font-mulish text-[17px] leading-[1.6] text-white/80">{SERVICES_CTA.text}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={SERVICES_CTA.button.href}
                className="inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-8 text-[.8125rem] font-medium tracking-[.08em] text-[#082b52] uppercase no-underline transition-colors duration-300 outline-none hover:bg-transparent hover:text-gold focus-visible:bg-transparent focus-visible:text-gold"
              >
                {SERVICES_CTA.button.label}
              </Link>
              <a href={FOOTER.phone.href} className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline transition-colors duration-300 outline-none hover:border-gold focus-visible:border-gold">
                Call {FOOTER.phone.label}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
