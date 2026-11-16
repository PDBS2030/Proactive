import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryForm } from "@/components/Inquiry";
import { PhasePanel } from "@/components/PhasePanel";
import { PhaseRail } from "@/components/PhaseRail";
import { ProcessHero } from "@/components/ProcessHero";
import { StackSection } from "@/components/Stack";
import { FOOTER } from "@/lib/data";
import { COMMITMENTS, PHASES, PROCESS_FAQS, PROCESS_HERO } from "@/lib/process";

export const metadata: Metadata = {
  title: "Process — PROACTIVE Design and Building Systems",
  description: "Our design-build process: fifteen steps in three phases, from preliminary study to handover.",
};

const HERO_PHOTOS = [
  { image: "/assets/gallery/landmark/1.jpg", position: "center 40%" },
  { image: "/assets/gallery/explore/1.jpg", position: "center" },
  { image: "/assets/offerings-talent.jpg", position: "center 78%" },
];

const title = "font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]";
const contactLink =
  "text-inherit underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold";

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main id="main-content" data-motion className="offerings-vars relative bg-white text-[#143275]">
        <ProcessHero
          slides={[
            { id: "line", label: "Our process", title: PROCESS_HERO.title, text: PROCESS_HERO.lead },
            ...PHASES.map((p, i) => ({ id: p.id, label: p.range, title: p.title, text: p.summary, ...HERO_PHOTOS[i] })),
          ]}
        />
        <PhaseRail items={PHASES.map((p) => ({ id: p.id, label: p.short }))} endId="commit-title" />

        <div className="relative z-10 bg-white">
          {PHASES.map((p, i) => (
            <StackSection key={p.id} index={i}>
              <PhasePanel phase={p} />
            </StackSection>
          ))}

          <StackSection index={3}>
            <section aria-labelledby="commit-title" className="bg-white px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[120px]">
              <div className="mx-auto w-full max-w-[1680px]">
                <h2 id="commit-title" className={title}>
                  {COMMITMENTS.heading}
                </h2>
                <p className="mt-4 max-w-2xl font-mulish text-[17px] leading-[1.6] text-[#143275]/85">{COMMITMENTS.lead}</p>
                <ul className="mt-10 grid gap-8 min-[768px]:grid-cols-2 min-[992px]:grid-cols-4 min-[992px]:gap-x-10">
                  {COMMITMENTS.items.map((c) => (
                    <li
                      key={c.title}
                      className="border border-[#143275]/10 bg-white p-8 shadow-[inset_0_1px_0_#fff,0_1px_1px_rgba(8,43,82,.08),0_5px_10px_rgba(8,43,82,.08),0_16px_30px_rgba(8,43,82,.12)]"
                    >
                      <span aria-hidden="true" className="block h-0.5 w-10 bg-gold" />
                      <h3 className="mt-4 text-(length:--h5) leading-(--h5-lh) font-(--h5-weight)">{c.title}</h3>
                      <p className="mt-3 text-[15px] leading-[1.6] text-[#143275]/85">{c.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </StackSection>

          <StackSection index={4}>
            <div id="faqs">
              <Faq data={PROCESS_FAQS} roomy />
            </div>
          </StackSection>

          <StackSection index={5}>
            <section id="inquiry" aria-labelledby="inquiry-title" className="bg-white px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[140px]">
              <div className="mx-auto grid w-full max-w-[1680px] gap-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-16">
                <div className="min-[992px]:col-span-5">
                  <h2 id="inquiry-title" className={title}>
                    Start with a conversation
                  </h2>
                  <p className="mt-5 max-w-[44ch] font-mulish text-[17px] leading-[1.65] text-[#143275]/85">
                    Tell us what you are planning. We reply within one business day to set up a call and suggest the right first step.
                  </p>
                  <dl className="mt-8 grid gap-5 text-[15px] leading-snug">
                    <div>
                      <dt className="text-sm font-semibold text-gold">Call</dt>
                      <dd className="mt-1">
                        <a href={FOOTER.phone.href} className={contactLink}>
                          {FOOTER.phone.label}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-gold">Email</dt>
                      <dd className="mt-1">
                        <a href={`mailto:${FOOTER.email}`} className={contactLink}>
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
