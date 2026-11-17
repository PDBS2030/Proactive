import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryForm } from "@/components/Inquiry";
import { ProcessIntro } from "@/components/ProcessIntro";
import { PhaseCards } from "@/components/PhaseCards";
import { PhaseCardsSection } from "@/components/PhaseCardsSection";
import { ProcessHero } from "@/components/ProcessHero";
import { StackSection } from "@/components/Stack";
import { FOOTER } from "@/lib/data";
import { COMMITMENTS, HERO_STATES, PHASES, PROCESS_FAQS, PROCESS_HERO } from "@/lib/process";

export const metadata: Metadata = {
  title: "Process — PROACTIVE Design and Building Systems",
  description: "Our design-build process: fifteen steps in three phases, from preliminary study to handover.",
};

const COMMITMENT_IMAGES = [
  { src: "/assets/offerings-talent.jpg", position: "center 72%" },
  { src: "/assets/process-design.jpg", position: "center 40%" },
  { src: "/assets/gallery/residential/3.jpg", position: "center 55%" },
  { src: "/assets/offerings-buildings.jpg", position: "center 60%" },
];

const title = "font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]";
const contactLink =
  "text-inherit underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold";

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main id="main-content" data-motion className="offerings-vars relative bg-white text-[#082b52]">
        <ProcessHero title={PROCESS_HERO.title} tagline={PROCESS_HERO.tagline} states={HERO_STATES} />

        <div className="relative z-10 bg-white">
          <StackSection index={0}>
            <ProcessIntro />
          </StackSection>

          {/* The three phases: cards lifted off a full-screen, blue-tinted film */}
          <StackSection index={1}>
            <PhaseCardsSection phases={PHASES} />
          </StackSection>

          <StackSection index={2}>
            {/* Built the same way as "How a project runs" on the Services page */}
            <section aria-labelledby="commit-title" className="px-4 py-[94px] min-[768px]:px-[124px] min-[768px]:py-[140px]">
              <div className="mx-auto w-full max-w-[1680px]">
                <h2 id="commit-title" className={title}>
                  {COMMITMENTS.heading}
                </h2>
                <p className="mt-4 max-w-2xl font-mulish text-[17px] leading-[1.6] text-[#082b52]/85">{COMMITMENTS.lead}</p>
                <PhaseCards items={COMMITMENTS.items} images={COMMITMENT_IMAGES} />
              </div>
            </section>
          </StackSection>

          <StackSection index={3}>
            <div id="faqs">
              <Faq data={PROCESS_FAQS} roomy />
            </div>
          </StackSection>

          <StackSection index={4}>
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
