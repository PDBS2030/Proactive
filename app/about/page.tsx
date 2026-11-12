import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CtaBand, PageIntro, ui } from "@/components/PageIntro";
import { ServicesNav } from "@/components/ServicesNav";
import { CountUp } from "@/components/MotionBits";
import { FOOTER } from "@/lib/data";
import { ABOUT } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About — PROACTIVE Design and Building Systems",
  description:
    "PROACTIVE Design and Building Systems, Inc. is a Baltimore design-build firm serving Maryland, DC and Virginia.",
};

const NAV = [
  { id: "who-we-are", label: "Who we are" },
  { id: "values", label: "Values" },
  { id: "leadership", label: "Leadership" },
  { id: "commitments", label: "Commitments" },
  { id: "locations", label: "Locations" },
];

export default function AboutPage() {
  const a = ABOUT;
  return (
    <>
      <Header />
      <main id="main-content" data-motion className="offerings-vars relative bg-white text-[#143275]">
        <PageIntro crumb="About" title={a.title} lead={a.lead} image={a.image} imageAlt={a.imageAlt} />

        {/* Key facts */}
        <section aria-label="Key facts" className={`${ui.pad} pt-12 pb-16 min-[768px]:pb-[90px]`}>
          <dl className={`${ui.wrap} grid gap-8 border-t border-[#143275]/15 pt-10 min-[768px]:grid-cols-2 min-[1100px]:grid-cols-4 min-[1100px]:gap-x-10`}>
            {a.facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-jost text-[clamp(32px,3.6vw,52px)] leading-none"><CountUp text={f.value} /></dd>
                <p className="mt-3 max-w-[28ch] text-[15px] leading-snug text-[#143275]/80" aria-hidden="true">
                  {f.label}
                </p>
              </div>
            ))}
          </dl>
        </section>

        <ServicesNav items={NAV} />

        {/* Who we are */}
        <section id="who-we-are" aria-labelledby="who-title" className={`${ui.pad} scroll-mt-[130px] py-16 min-[768px]:py-[110px]`}>
          <div className={`${ui.wrap} grid gap-10 min-[992px]:grid-cols-12 min-[992px]:gap-x-10`}>
            <div className="min-[992px]:col-span-5">
              <h2 id="who-title" className={ui.eyebrow}>
                {a.who.heading}
              </h2>
              <p className={`${ui.title} mt-5`}>{a.who.statement}</p>
            </div>
            <div className="grid gap-6 min-[992px]:col-span-6 min-[992px]:col-start-7">
              {a.who.body.map((p) => (
                <p key={p} className={`${ui.body} max-w-[62ch]`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="values" aria-labelledby="values-title" className={`${ui.pad} scroll-mt-[130px] bg-[#f3f6fa] py-16 min-[768px]:py-[110px]`}>
          <div className={ui.wrap}>
            <h2 id="values-title" className={ui.title}>
              {a.values.heading}
            </h2>
            <ul className="mt-12 grid gap-4 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-4 min-[1100px]:gap-6">
              {a.values.items.map((v) => (
                <li key={v.title} className="group flex min-h-[220px] flex-col bg-[#082b52] p-7 text-white hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-24px_rgba(8,43,82,.7)]">
                  <span aria-hidden="true" className="block h-0.5 w-10 bg-gold transition-[width] duration-500 ease-out group-hover:w-full" />
                  <h3 className="mt-auto pt-10 font-jost text-[26px] leading-[1.1]">{v.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-white/80">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" aria-labelledby="leadership-title" className={`${ui.pad} scroll-mt-[130px] py-16 min-[768px]:py-[110px]`}>
          <div className={ui.wrap}>
            <div className="grid gap-6 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
              <h2 id="leadership-title" className={`${ui.title} min-[992px]:col-span-5`}>
                {a.leadership.heading}
              </h2>
              <p className={`${ui.body} max-w-[56ch] min-[992px]:col-span-6 min-[992px]:col-start-7`}>{a.leadership.lead}</p>
            </div>
            <ul className="mt-12 grid border-t border-[#143275]/15 min-[768px]:grid-cols-2">
              {a.leadership.roles.map((r, i) => (
                <li key={r.title} className={`group border-b border-[#143275]/15 py-8 min-[768px]:pr-10 ${i % 2 === 1 ? "min-[768px]:border-l min-[768px]:pl-10" : ""}`}>
                  <h3 className={`${ui.tile} transition-colors duration-300 group-hover:text-gold`}>{r.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-[#143275]/85">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Commitments */}
        <section id="commitments" aria-labelledby="commitments-title" className={`${ui.pad} scroll-mt-[130px] bg-[#f3f6fa] py-16 min-[768px]:py-[110px]`}>
          <div className={ui.wrap}>
            <h2 id="commitments-title" className={ui.title}>
              {a.commitments.heading}
            </h2>
            <p className={`${ui.body} mt-4 max-w-[56ch]`}>{a.commitments.lead}</p>
            <ul className="mt-12 grid gap-x-10 gap-y-0 min-[768px]:grid-cols-2 min-[1100px]:grid-cols-3">
              {a.commitments.items.map((c) => (
                <li key={c.title} className="relative py-7">
                  <span data-rule aria-hidden="true" className="absolute top-0 left-0 h-0.5 w-full bg-gold" />
                  <h3 className={ui.tile}>{c.title}</h3>
                  <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-[#143275]/85">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Locations */}
        <section id="locations" aria-labelledby="locations-title" className={`${ui.pad} scroll-mt-[130px] py-16 min-[768px]:py-[110px]`}>
          <div className={`${ui.wrap} grid gap-10 min-[992px]:grid-cols-12 min-[992px]:gap-x-10`}>
            <div className="min-[992px]:col-span-5">
              <h2 id="locations-title" className={ui.title}>
                {a.locations.heading}
              </h2>
              <p className={`${ui.body} mt-5 max-w-[44ch]`}>{a.locations.lead}</p>
            </div>
            <div className="border border-[#143275]/15 p-7 transition-[border-color,box-shadow] duration-500 hover:border-gold hover:shadow-[0_20px_40px_-28px_rgba(20,50,117,.5)] min-[768px]:p-10 min-[992px]:col-span-6 min-[992px]:col-start-7">
              <h3 className={ui.eyebrow}>Headquarters</h3>
              <p className="mt-4 text-[19px] leading-snug font-medium">PROACTIVE Design and Building Systems, Inc.</p>
              <address className="mt-3 text-[16px] leading-[1.6] whitespace-pre-line not-italic">{FOOTER.office}</address>
              <p className="mt-4 text-[16px] leading-[1.6]">
                <a href={FOOTER.phone.href} className={ui.link}>
                  {FOOTER.phone.label}
                </a>
                <br />
                <a href={`mailto:${FOOTER.email}`} className={ui.link}>
                  {FOOTER.email}
                </a>
              </p>
              <p className="mt-6 border-t border-[#143275]/15 pt-5 text-[15px] text-[#143275]/80">Service area: Maryland, DC and Virginia</p>
            </div>
          </div>
        </section>

        <CtaBand heading={a.cta.heading} label={a.cta.button.label} href={a.cta.button.href} />
      </main>
      <Footer />
    </>
  );
}
