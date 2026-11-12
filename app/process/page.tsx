import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PhaseSteps } from "@/components/PhaseSteps";
import { CtaBand, PageIntro, ui } from "@/components/PageIntro";
import { PROCESS_PAGE } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Process — PROACTIVE Design and Building Systems",
  description: "Our design-build process: fifteen steps in three phases, from preliminary study to handover.",
};

export default function ProcessPage() {
  const p = PROCESS_PAGE;
  return (
    <>
      <Header />
      <main id="main-content" data-motion className="offerings-vars relative bg-white text-[#143275]">
        <PageIntro crumb="Process" title={p.title} lead={p.lead} image={p.image} imageAlt={p.imageAlt} />

        <section aria-labelledby="steps-title" className={`${ui.pad} py-16 min-[768px]:py-[100px]`}>
          <div className={ui.wrap}>
            <h2 id="steps-title" className={`${ui.title} mb-10`}>
              15 Steps | 3 Phases
            </h2>
            <PhaseSteps phases={p.phases} />
          </div>
        </section>

        <section aria-labelledby="pillars-title" className={`${ui.pad} bg-[#f3f6fa] py-16 min-[768px]:py-[110px]`}>
          <div className={ui.wrap}>
            <h2 id="pillars-title" className={ui.title}>
              {p.pillars.heading}
            </h2>
            <p className={`${ui.body} mt-4 max-w-[56ch]`}>{p.pillars.lead}</p>
            <ul className="mt-12 grid gap-4 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-4 min-[1100px]:gap-6">
              {p.pillars.items.map((i) => (
                <li key={i.title} className="group flex min-h-[220px] flex-col bg-[#082b52] p-7 text-white hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-24px_rgba(8,43,82,.7)]">
                  <span aria-hidden="true" className="block h-0.5 w-10 bg-gold transition-[width] duration-500 ease-out group-hover:w-full" />
                  <h3 className="mt-auto pt-10 font-jost text-[26px] leading-[1.1]">{i.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-white/80">{i.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="delivery-title" className={`${ui.pad} py-16 min-[768px]:py-[110px]`}>
          <div className={ui.wrap}>
            <h2 id="delivery-title" className={ui.title}>
              {p.delivery.heading}
            </h2>
            <p className={`${ui.body} mt-4 max-w-[56ch]`}>{p.delivery.lead}</p>
            <ul className="mt-12 grid border-t border-[#143275]/15 min-[992px]:grid-cols-3">
              {p.delivery.items.map((d, i) => (
                <li key={d.title} className={`group border-b border-[#143275]/15 py-8 min-[992px]:border-b-0 min-[992px]:pr-10 ${i > 0 ? "min-[992px]:border-l min-[992px]:pl-10" : ""}`}>
                  <h3 className={`${ui.tile} transition-colors duration-300 group-hover:text-gold`}>{d.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] text-[#143275]/85">{d.text}</p>
                  <Link href={d.href} className="mt-5 inline-block border-b-2 border-gold pb-0.5 transition-[padding] duration-300 hover:pr-3 text-[14px] font-medium text-[#143275] no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2356e5]">
                    Learn more
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand heading={p.cta.heading} label={p.cta.button.label} href={p.cta.button.href} />
      </main>
      <Footer />
    </>
  );
}
