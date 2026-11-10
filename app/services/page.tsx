import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryForm } from "@/components/InquiryForm";
import { FOOTER } from "@/lib/data";
import {
  CAPABILITIES,
  INQUIRY,
  LOCAL,
  MARKETS,
  PROOF,
  SERVICES_FAQS,
  SERVICES_PAGE,
  STATEMENT,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — PROACTIVE Design and Building Systems",
  description:
    "Architecture, design-build and construction management from one accountable team, serving Maryland, DC and Virginia.",
};

const pad = "px-4 min-[768px]:px-[124px]";
const wrap = "mx-auto w-full max-w-[1680px]";
const title =
  "font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]";
const eyebrow = "text-xs leading-4 font-semibold tracking-[.15em] text-gold uppercase";
const btn =
  "inline-flex min-h-12 items-center justify-center border border-[#143275] px-7 text-[.8125rem] font-medium tracking-[.08em] text-[#143275] uppercase no-underline transition-colors duration-300 outline-none hover:bg-[#143275] hover:text-white focus-visible:bg-[#143275] focus-visible:text-white";
const link =
  "text-inherit underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="title-vars relative bg-white text-[#143275]">
        {/* Photo hero: title bottom-left, introduction on the right (ARCO, Skanska) */}
        <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden bg-[#082b52] text-white min-[992px]:min-h-[86vh]">
          <Image src={SERVICES_PAGE.image} alt={SERVICES_PAGE.imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#082b52]/92 via-[#082b52]/45 to-[#082b52]/10" />
          <div className={`${pad} w-full pt-40 pb-12 min-[768px]:pb-[72px]`}>
            <div className={`${wrap} grid gap-8 min-[992px]:grid-cols-12 min-[992px]:gap-x-10`}>
              <div className="min-[992px]:col-span-6">
                <p className="text-xs leading-4 font-semibold tracking-[.15em] text-white uppercase">{SERVICES_PAGE.title}</p>
                <h1 className="mt-4 font-jost text-[clamp(34px,5.4vw,84px)] leading-[1.04] font-normal tracking-normal text-balance uppercase">
                  {SERVICES_PAGE.headline}
                </h1>
              </div>
              <p className="self-end font-mulish text-[17px] leading-[1.65] text-white/90 min-[768px]:text-[19px] min-[992px]:col-span-5 min-[992px]:col-start-8">
                {SERVICES_PAGE.lead}
              </p>
            </div>
          </div>
        </section>

        {/* Statement on the left, the three services as labeled sections on the right */}
        <section aria-labelledby="statement-title" className={`${pad} bg-[#f3f6fa] py-16 min-[768px]:py-[110px]`}>
          <div className={`${wrap} grid gap-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-10`}>
            <h2 id="statement-title" className={`${title} max-w-[22ch] min-[992px]:col-span-5`}>
              {STATEMENT.text}
            </h2>
            <div className="min-[992px]:col-span-6 min-[992px]:col-start-7">
              {STATEMENT.sections.map((s, i) => (
                <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={`scroll-mt-[130px] ${i > 0 ? "mt-12 border-t border-[#143275]/12 pt-12" : ""}`}>
                  <h3 id={`${s.id}-title`} className={eyebrow}>
                    {s.label}
                  </h3>
                  <p className="mt-4 max-w-[60ch] font-mulish text-[17px] leading-[1.65] text-[#143275]/90">{s.body}</p>
                  <ul className="mt-5 grid max-w-[60ch] gap-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-snug">
                        <span aria-hidden="true" className="mt-[.55em] h-0.5 w-3 shrink-0 bg-gold" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
              <Link href={STATEMENT.cta.href} className={`${btn} mt-12`}>
                {STATEMENT.cta.label}
              </Link>
            </div>
          </div>

          <div className={`${wrap} mt-16 min-[768px]:mt-24`}>
            <p className={`${eyebrow} text-center`}>{PROOF.label}</p>
            <ul className="mx-auto mt-8 grid max-w-4xl gap-8 text-center min-[768px]:grid-cols-3 min-[768px]:gap-x-6">
              {PROOF.items.map((x) => (
                <li key={x.value} className="min-[768px]:border-l min-[768px]:border-[#143275]/15 first:border-l-0">
                  <p className="font-jost text-[clamp(28px,3.2vw,44px)] leading-none">{x.value}</p>
                  <p className="mt-2 text-[15px] text-[#143275]/80">{x.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Dark capability grid (ARCO) */}
        <section aria-labelledby="cap-title" className={`${pad} py-16 min-[768px]:py-[110px]`}>
          <div className={wrap}>
            <p className={eyebrow}>{CAPABILITIES.label}</p>
            <h2 id="cap-title" className={`${title} mt-4 max-w-[24ch]`}>
              {CAPABILITIES.heading}
            </h2>
            <ul className="mt-12 grid gap-4 min-[640px]:grid-cols-2 min-[992px]:gap-6">
              {CAPABILITIES.items.map((c) => (
                <li key={c.title} className="flex min-h-[230px] flex-col bg-[#082b52] p-7 text-white min-[992px]:p-9">
                  <span aria-hidden="true" className="block h-0.5 w-10 bg-gold" />
                  <h3 className="mt-auto pt-10 font-jost text-[26px] leading-[1.1]">{c.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.6] text-white/80">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Markets as image cards with a one-line description (Skanska) */}
        <section id="markets" aria-labelledby="markets-title" className={`${pad} scroll-mt-[120px] border-t border-[#143275]/10 py-16 min-[768px]:py-[110px]`}>
          <div className={wrap}>
            <p className={eyebrow}>{MARKETS.label}</p>
            <h2 id="markets-title" className={`${title} mt-4`}>
              {MARKETS.heading}
            </h2>
            <p className="mt-4 max-w-[60ch] font-mulish text-[17px] leading-[1.65] text-[#143275]/85">{MARKETS.lead}</p>
            <ul className="mt-10 grid gap-8 min-[768px]:grid-cols-3 min-[768px]:gap-x-8">
              {MARKETS.items.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="group block text-inherit no-underline outline-offset-[3px] focus-visible:outline-2 focus-visible:outline-[#2356e5]">
                    <span className="relative block aspect-[4/3] overflow-hidden">
                      <Image src={m.image} alt={m.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none" />
                    </span>
                    <span className="mt-4 block text-[19px] leading-tight font-medium">{m.title}</span>
                    <span className="mt-2 block max-w-[40ch] text-[15px] leading-[1.6] text-[#143275]/80">{m.text}</span>
                    <span className="mt-3 inline-block border-b-2 border-transparent pb-0.5 text-[14px] font-medium transition-colors duration-300 group-hover:border-gold group-focus-visible:border-gold">
                      See projects
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Local team: text beside a photo, with one call to action (ARCO) */}
        <section aria-labelledby="local-title" className={`${pad} bg-[#f3f6fa] py-16 min-[768px]:py-[110px]`}>
          <div className={`${wrap} grid items-center gap-10 min-[992px]:grid-cols-12 min-[992px]:gap-x-16`}>
            <div className="min-[992px]:col-span-5">
              <p className={eyebrow}>{LOCAL.label}</p>
              <h2 id="local-title" className={`${title} mt-4`}>
                {LOCAL.heading}
              </h2>
              <p className="mt-5 max-w-[52ch] font-mulish text-[17px] leading-[1.65] text-[#143275]/90">{LOCAL.body}</p>
              <Link href={LOCAL.cta.href} className={`${btn} mt-8`}>
                {LOCAL.cta.label}
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden min-[992px]:col-span-7">
              <Image src={LOCAL.image} alt={LOCAL.imageAlt} fill sizes="(max-width: 992px) 100vw, 58vw" className="object-cover" />
            </div>
          </div>
        </section>

        <div id="faqs" className="scroll-mt-[120px]">
          <Faq data={SERVICES_FAQS} />
        </div>

        <section id="inquiry" aria-labelledby="inquiry-title" className={`${pad} scroll-mt-[120px] py-16 min-[768px]:py-[110px]`}>
          <div className={`${wrap} grid gap-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-16`}>
            <div className="min-[992px]:col-span-5">
              <h2 id="inquiry-title" className={title}>
                {INQUIRY.heading}
              </h2>
              <p className="mt-5 max-w-[44ch] font-mulish text-[17px] leading-[1.65] text-[#143275]/85">{INQUIRY.lead}</p>
              <dl className="mt-8 grid gap-5 text-[15px] leading-snug">
                <div>
                  <dt className="text-sm font-semibold text-gold">Call</dt>
                  <dd className="mt-1">
                    <a href={FOOTER.phone.href} className={link}>
                      {FOOTER.phone.label}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gold">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${FOOTER.email}`} className={link}>
                      {FOOTER.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gold">Office</dt>
                  <dd className="mt-1 whitespace-pre-line">{FOOTER.office}</dd>
                </div>
              </dl>
            </div>
            <div className="min-[992px]:col-span-7">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
