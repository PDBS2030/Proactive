import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryForm } from "@/components/InquiryForm";
import { ServiceStage } from "@/components/ServiceStage";
import { ServicesNav } from "@/components/ServicesNav";
import { TimelineDiagram } from "@/components/TimelineDiagram";
import { FOOTER } from "@/lib/data";
import {
  DIFFERENCE,
  INQUIRY,
  MARKETS,
  PHASES,
  SERVICES_FAQS,
  SERVICES_PAGE,
  SERVICE_LIST,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — PROACTIVE Design and Building Systems",
  description:
    "Architecture, design-build and construction management from one accountable team, serving Maryland, DC and Virginia.",
};

const NAV_ITEMS = [
  ...SERVICE_LIST.map((s) => ({ id: s.id, label: s.name })),
  { id: "difference", label: "Why one team" },
  { id: "phases", label: "How it runs" },
  { id: "faqs", label: "FAQs" },
  { id: "inquiry", label: "Contact" },
];

const title =
  "font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]";
const pad = "px-4 min-[768px]:px-[124px]";
const btnPrimary =
  "inline-flex min-h-12 items-center justify-center border border-[#143275] bg-[#143275] px-7 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline transition-colors duration-300 outline-none hover:bg-transparent hover:text-[#143275] focus-visible:bg-transparent focus-visible:text-[#143275]";
const btnGhost =
  "inline-flex min-h-12 items-center justify-center border border-[#143275]/30 px-7 text-[.8125rem] font-medium tracking-[.08em] text-[#143275] uppercase no-underline transition-colors duration-300 outline-none hover:border-gold focus-visible:border-gold";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="title-vars relative bg-white text-[#143275]">
        {/* Opening: a plain statement, then the work */}
        <section className={`${pad} pt-[150px] min-[768px]:pt-[190px]`}>
          <div className="mx-auto w-full max-w-[1680px]">
            <h1 className="max-w-[16ch] font-jost text-[clamp(34px,6.4vw,96px)] leading-[1.02] font-normal tracking-normal text-balance uppercase min-[992px]:max-w-[14ch]">
              {SERVICES_PAGE.title}
            </h1>
            <div className="mt-8 grid gap-8 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
              <p className="font-mulish text-[17px] leading-[1.65] text-[#143275]/85 min-[768px]:text-[19px] min-[992px]:col-span-6 min-[992px]:col-start-7">
                {SERVICES_PAGE.lead}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 min-[992px]:ml-[calc(50%+20px)]">
              <Link href="#inquiry" className={btnPrimary}>
                {SERVICES_PAGE.primaryCta.label}
              </Link>
              <Link href={SERVICES_PAGE.secondaryCta.href} className={btnGhost}>
                {SERVICES_PAGE.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto mt-14 aspect-[16/10] w-full max-w-[1680px] overflow-hidden min-[992px]:aspect-[21/9]">
            <Image src={SERVICES_PAGE.image} alt={SERVICES_PAGE.imageAlt} fill priority sizes="100vw" className="object-cover" />
            <ul className="absolute inset-x-0 bottom-0 grid bg-linear-to-t from-[#082b52]/90 via-[#082b52]/60 to-transparent pt-24 text-white min-[768px]:grid-cols-3">
              {SERVICE_LIST.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group block h-full px-5 py-3 text-inherit no-underline outline-none min-[768px]:px-7 min-[768px]:pt-4 min-[768px]:pb-6"
                  >
                    <span className="block border-t border-white/40 pt-3 transition-colors duration-300 group-hover:border-gold group-focus-visible:border-gold">
                      <span className="block text-[16px] font-medium min-[768px]:text-[19px]">{s.name}</span>
                      <span className="mt-0.5 hidden text-[14px] text-white/75 min-[768px]:block">{s.short}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mx-auto mt-4 mb-14 w-full max-w-[1680px] text-sm text-[#143275]/70 min-[768px]:mb-20">
            Serving {SERVICES_PAGE.regions.replaceAll(" · ", ", ")}, from our office in Baltimore.
          </p>
        </section>

        <ServicesNav items={NAV_ITEMS} />

        <section aria-label="Our services" className="py-6 min-[992px]:py-16">
          <ServiceStage services={SERVICE_LIST} />
        </section>

        {/* The one moment: how the schedule changes */}
        <section id="difference" aria-labelledby="difference-title" className={`${pad} scroll-mt-[120px] bg-[#082b52] py-16 text-white min-[768px]:py-[110px]`}>
          <div className="mx-auto w-full max-w-[1680px]">
            <h2 id="difference-title" className={`${title} max-w-[20ch]`}>
              {DIFFERENCE.heading}
            </h2>
            <p className="mt-5 max-w-[60ch] font-mulish text-[17px] leading-[1.65] text-white/80">{DIFFERENCE.lead}</p>
            <div className="mt-14">
              <TimelineDiagram />
            </div>
            <ul className="mt-16 grid gap-10 border-t border-white/20 pt-10 min-[992px]:grid-cols-3 min-[992px]:gap-x-12">
              {DIFFERENCE.points.map((p) => (
                <li key={p.title}>
                  <h3 className="text-[19px] font-medium">{p.title}</h3>
                  <p className="mt-2 max-w-[44ch] text-[15px] leading-[1.6] text-white/75">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The fifteen steps are a true sequence, so they are numbered */}
        <section id="phases" aria-labelledby="phases-title" className={`${pad} scroll-mt-[120px] py-16 min-[768px]:py-[110px]`}>
          <div className="mx-auto w-full max-w-[1680px]">
            <h2 id="phases-title" className={title}>
              {PHASES.heading}
            </h2>
            <p className="mt-4 max-w-[60ch] font-mulish text-[17px] leading-[1.65] text-[#143275]/85">{PHASES.lead}</p>

            <ol aria-hidden="true" className="mt-12 grid grid-cols-15 gap-1">
              {Array.from({ length: 15 }, (_, i) => (
                <li
                  key={i}
                  className={`h-2 ${i < 5 ? "bg-[#143275]/35" : i < 10 ? "bg-[#143275]/65" : "bg-[#143275]"}`}
                />
              ))}
            </ol>
            <ol className="mt-6 grid gap-10 min-[992px]:grid-cols-3 min-[992px]:gap-x-10">
              {PHASES.items.map((p, i) => (
                <li key={p.title}>
                  <p className="text-sm font-semibold text-gold">
                    Phase {i + 1}, {p.steps.toLowerCase()}
                  </p>
                  <h3 className="mt-1 text-[19px] leading-tight font-medium">{p.title}</h3>
                  <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-[#143275]/85">{p.text}</p>
                </li>
              ))}
            </ol>
            <Link href={PHASES.cta.href} className={`${btnGhost} mt-10`}>
              {PHASES.cta.label}
            </Link>
          </div>
        </section>

        <section id="markets" aria-labelledby="markets-title" className={`${pad} scroll-mt-[120px] border-t border-[#143275]/10 py-16 min-[768px]:py-[100px]`}>
          <div className="mx-auto w-full max-w-[1680px]">
            <h2 id="markets-title" className={title}>
              {MARKETS.heading}
            </h2>
            <ul className="mt-10 grid gap-6 min-[768px]:grid-cols-3 min-[768px]:gap-x-8">
              {MARKETS.items.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="group block text-inherit no-underline outline-offset-[3px] focus-visible:outline-2 focus-visible:outline-[#2356e5]">
                    <span className="relative block aspect-[4/3] overflow-hidden">
                      <Image src={m.image} alt={m.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none" />
                    </span>
                    <span className="mt-4 block border-b border-[#143275]/15 pb-3 text-[17px] leading-tight font-medium transition-colors duration-300 group-hover:border-gold group-focus-visible:border-gold">
                      {m.title}
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

        <section id="inquiry" aria-labelledby="inquiry-title" className={`${pad} scroll-mt-[120px] py-16 min-[768px]:py-[110px]`}>
          <div className="mx-auto grid w-full max-w-[1680px] gap-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-16">
            <div className="min-[992px]:col-span-5">
              <h2 id="inquiry-title" className={title}>
                {INQUIRY.heading}
              </h2>
              <p className="mt-5 max-w-[44ch] font-mulish text-[17px] leading-[1.65] text-[#143275]/85">{INQUIRY.lead}</p>
              <dl className="mt-8 grid gap-5 text-[15px] leading-snug">
                <div>
                  <dt className="text-sm font-semibold text-gold">Call</dt>
                  <dd className="mt-1">
                    <a href={FOOTER.phone.href} className="text-inherit underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold">
                      {FOOTER.phone.label}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gold">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${FOOTER.email}`} className="text-inherit underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold">
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
