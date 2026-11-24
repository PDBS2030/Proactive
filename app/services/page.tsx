import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/MotionBits";
import { ServicesHero } from "@/components/ServicesHero";
import { Words } from "@/components/PageIntro";
import { ServicesNav } from "@/components/ServicesNav";
import { FaintVideo } from "@/components/FaintVideo";
import { InquiryForm } from "@/components/Inquiry";
import { PhaseCards } from "@/components/PhaseCards";
import { ServiceProjects } from "@/components/ServiceProjects";
import { HashScroll, StackSection } from "@/components/Stack";
import { PROJECTS, SERVICE_SLUGS } from "@/lib/pages";
import { cn } from "@/lib/cn";
import {
  COMPARISON,
  PHASES,
  SERVICES_CTA,
  SERVICES_FAQS,
  SERVICES_PAGE,
  SERVICE_LIST,
} from "@/lib/services";
import { FOOTER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Proactive Design and Building Systems",
  description:
    "Architecture, design-build and construction management from one accountable team, serving Maryland, DC and Virginia.",
};

const NAV_ITEMS = [
  ...SERVICE_LIST.map((s) => ({ id: s.id, label: s.name })),
  { id: "why-design-build", label: "Why design-build" },
  { id: "faqs", label: "FAQs" },
  { id: "inquiry", label: "Contact" },
];

const HERO_IMAGES: Record<string, { image: string; alt: string; position?: string }> = {
  architecture: { image: "/assets/gallery/landmark/1.jpg", alt: "Brick-walled study with built-in shelving and a long work table", position: "center 40%" },
  "design-build": { image: "/assets/gallery/loft/1.jpg", alt: "Living room with custom wood cabinetry and a fireplace", position: "center 45%" },
  "construction-management": { image: "/assets/offerings-talent.jpg", alt: "Construction workers wearing safety helmets and vests at an outdoor site.", position: "center 78%" },
};

const title =
  "font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]";
const eyebrow = "text-xs leading-4 font-semibold tracking-[.15em] text-gold uppercase";

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
      <main id="main-content" data-motion className="offerings-vars relative bg-white text-[#082b52]">
        {/* Hero: a full-screen slider with one slide per service, pinned so the sections below slide over it */}
        <ScrollProgress />
        <HashScroll />
        <ServicesHero
          eyebrow={SERVICES_PAGE.eyebrow}
          title={SERVICES_PAGE.title}
          slides={SERVICE_LIST.map((s) => ({ id: s.id, name: s.name, headline: s.headline, ...HERO_IMAGES[s.id] }))}
          primary={SERVICES_PAGE.primaryCta}
          secondary={SERVICES_PAGE.secondaryCta}
        />

        <div className="relative z-10 bg-white">
          <ServicesNav items={NAV_ITEMS} />

        {/* Services under one roof */}
        <StackSection index={0}>
          <section aria-labelledby="one-roof-title" className="border-b border-[#082b52]/10 px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[120px]">
            <div className="mx-auto grid w-full max-w-[1680px] gap-8 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
              <h2 id="one-roof-title" className={cn(title, "min-[992px]:col-span-4")}>
                Services under one roof
              </h2>
              <p className="font-mulish text-[clamp(18px,1.55vw,24px)] leading-[1.6] text-[#082b52] min-[992px]:col-span-7 min-[992px]:col-start-6">
                We bring architecture, design-build, and construction management together under one roof, uniting thoughtful design with disciplined execution. From the earliest concept to final completion, our integrated approach provides clear communication, coordinated expertise, and a consistent focus on your vision, budget, and schedule, delivering a seamless experience and spaces built for lasting value.
              </p>
            </div>
          </section>
        </StackSection>

        {/* The three services */}
        {SERVICE_LIST.map((s, i) => (
          <StackSection key={s.id} index={1 + i}>
          <section
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={cn("scroll-mt-[190px] px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[140px]", i % 2 === 1 && "bg-[#f3f6fa]")}
          >
            <div className="mx-auto grid w-full max-w-[1680px] gap-10 min-[992px]:grid-cols-12 min-[992px]:items-stretch min-[992px]:gap-x-14">
              <div className={cn("min-[992px]:col-span-7", i % 2 === 1 && "min-[992px]:order-2")}>
                <ServiceProjects
                  serviceId={s.id}
                  serviceName={s.name}
                  projects={PROJECTS.filter((p) => p.service === SERVICE_SLUGS[s.id]).slice(0, 5)}
                />
              </div>
              {/* The text runs from the top edge of the project accordion to its bottom edge, with even space between its parts */}
              <div className={cn("flex flex-col justify-between gap-9 min-[992px]:col-span-5", i % 2 === 1 && "min-[992px]:order-1")}>
                <div>
                  <p className={eyebrow}>{s.name}</p>
                  <h2 id={`${s.id}-title`} className="mt-4 font-jost text-[length:max(18px,calc(var(--h2)*.68))] leading-[1.22] font-normal tracking-normal uppercase [text-wrap:initial]">
                    {s.headline}
                  </h2>
                </div>
                <p className="font-mulish text-[17px] leading-[1.65] text-[#082b52]/85">{s.body}</p>
                <div>
                  <h3 className="text-xs font-semibold tracking-[.15em] uppercase">What’s included</h3>
                  <ul className="mt-3 grid gap-2.5">
                    {s.includes.map((x) => (
                      <li key={x} className="flex gap-3 text-[15px] leading-snug">
                        <Check />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <dl className="grid gap-5 min-[640px]:grid-cols-2">
                  <div className="group border border-[#082b52]/10 bg-white p-5 shadow-[inset_0_1px_0_#fff,0_1px_1px_rgba(8,43,82,.08),0_5px_10px_rgba(8,43,82,.08),0_16px_30px_rgba(8,43,82,.14),0_36px_64px_-14px_rgba(8,43,82,.3)] hover:-translate-y-1 hover:bg-[#082b52] hover:text-white hover:shadow-[0_2px_2px_rgba(8,43,82,.12),0_10px_18px_rgba(8,43,82,.16),0_26px_44px_rgba(8,43,82,.22),0_48px_80px_-16px_rgba(8,43,82,.42)]">
                    <dt className="text-xs font-semibold tracking-[.15em] text-gold uppercase transition-colors duration-300 group-hover:text-[#e3c98f]">Best for</dt>
                    <dd className="mt-1.5 text-[15px] leading-snug">{s.bestFor}</dd>
                  </div>
                  <div className="group border border-[#082b52]/10 bg-white p-5 shadow-[inset_0_1px_0_#fff,0_1px_1px_rgba(8,43,82,.08),0_5px_10px_rgba(8,43,82,.08),0_16px_30px_rgba(8,43,82,.14),0_36px_64px_-14px_rgba(8,43,82,.3)] hover:-translate-y-1 hover:bg-[#082b52] hover:text-white hover:shadow-[0_2px_2px_rgba(8,43,82,.12),0_10px_18px_rgba(8,43,82,.16),0_26px_44px_rgba(8,43,82,.22),0_48px_80px_-16px_rgba(8,43,82,.42)]">
                    <dt className="text-xs font-semibold tracking-[.15em] text-gold uppercase transition-colors duration-300 group-hover:text-[#e3c98f]">You receive</dt>
                    <dd className="mt-1.5 text-[15px] leading-snug">{s.outcome}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
          </StackSection>

        ))}

        {/* Why design-build */}
        <StackSection index={5}>
        <section id="why-design-build" aria-labelledby="why-title" className="relative isolate scroll-mt-[190px] overflow-hidden bg-[#082b52] px-4 py-[94px] text-white min-[768px]:px-[124px] min-[768px]:py-[140px]">
          {/* A faint construction video plays behind this section while it is the one on screen */}
          <FaintVideo src="/assets/service-video.mp4" poster="/assets/service-video-poster.jpg" className="absolute inset-0 -z-20 size-full object-cover opacity-[.07]" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-[#082b52]/70 via-[#082b52]/30 to-[#082b52]/70" />
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
                <div data-up key={r.label} className="grid grid-cols-[1fr_1.4fr_1.4fr] gap-x-8 border-t border-white/15 py-5 text-[16px] leading-snug">
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
                    <span className="block text-xs tracking-[.15em] uppercase">{COMPARISON.columns[0]}</span>
                    {r.a}
                  </p>
                  <p className="mt-3 text-[15px]">
                    <span className="block text-xs tracking-[.15em] text-gold uppercase">{COMPARISON.columns[1]}</span>
                    {r.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </StackSection>

        {/* Process teaser */}
        <StackSection index={6}>
        <section aria-labelledby="phases-title" className="px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[140px]">
          <div className="mx-auto w-full max-w-[1680px]">
            <h2 id="phases-title" className={title}>
              {PHASES.heading}
            </h2>
            <p className="mt-4 max-w-2xl font-mulish text-[17px] leading-[1.6] text-[#082b52]/85">{PHASES.lead}</p>
            <PhaseCards items={PHASES.items} cta={PHASES.cta} />
          </div>
        </section>
        </StackSection>

        <StackSection index={7}>
        <div id="faqs">
          <Faq data={SERVICES_FAQS} roomy />
        </div>
        </StackSection>

        {/* Inquiry form */}
        <StackSection index={8}>
        <section id="inquiry" aria-labelledby="inquiry-title" className="bg-white px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[140px]">
          <div className="mx-auto grid w-full max-w-[1680px] gap-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-16">
            <div className="min-[992px]:col-span-5">
              <h2 id="inquiry-title" className={title}>
                Start with a conversation
              </h2>
              <p className="mt-5 max-w-[44ch] font-mulish text-[17px] leading-[1.65] text-[#082b52]/85">
                Tell us what you are planning. We reply within one business day to set up a call and suggest the right first step.
              </p>
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
        </StackSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
