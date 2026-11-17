import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutHero } from "@/components/AboutHero";
import { AboutLinks } from "@/components/AboutLinks";
import { FilmDialog } from "@/components/FilmDialog";
import { TeamSection } from "@/components/TeamSection";
import { CtaBand, ui } from "@/components/PageIntro";
import { ScrollProgress } from "@/components/MotionBits";
import { ServicesNav } from "@/components/ServicesNav";
import { FOOTER } from "@/lib/data";
import { ABOUT } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About — Proactive Design and Building Systems",
  description:
    "Proactive Design and Building Systems is a Baltimore design-build firm serving Maryland, DC and Virginia.",
};

const NAV = [
  { id: "leadership", label: "Our Team" },
  { id: "who-we-are", label: "Our Vision" },
  { id: "values", label: "Values" },
  { id: "commitments", label: "Commitments" },
  { id: "locations", label: "Locations" },
];

export default function AboutPage() {
  const a = ABOUT;
  return (
    <>
      <Header />
      <main id="main-content" data-motion className="offerings-vars relative bg-white text-[#082b52]">
        <AboutHero title="About" />

        {/* Introduction */}
        <section aria-label="Introduction" className={`${ui.pad} pt-14 pb-14 min-[768px]:pt-[90px] min-[768px]:pb-[90px]`}>
          <ScrollProgress />
          <div className={ui.wrap}>
            <p data-up className="mx-auto w-full max-w-[1340px] text-center font-mulish text-[22px] leading-[1.55] text-[#082b52] [text-wrap:balance]">
              {a.lead}
            </p>
            <AboutLinks
              items={[
                { id: "leadership", label: "Our Team", icon: "people" },
                { id: "values", label: "Our Values", icon: "idea", dialog: "open-values" },
                { id: "who-we-are", label: "Our Vision", icon: "group", dialog: "open-vision" },
              ]}
            />
          </div>
        </section>

        <ServicesNav items={NAV} />

        {/* Our team */}
        <TeamSection id="leadership" people={a.leadership.people} />

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
                  <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-[#082b52]/85">{c.text}</p>
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
            <div className="border border-[#082b52]/15 p-7 transition-[border-color,box-shadow] duration-500 hover:border-gold hover:shadow-[0_20px_40px_-28px_rgba(8,43,82,.5)] min-[768px]:p-10 min-[992px]:col-span-6 min-[992px]:col-start-7">
              <h3 className={ui.eyebrow}>Headquarters</h3>
              <p className="mt-4 text-[19px] leading-snug font-medium">Proactive Design and Building Systems</p>
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
              <p className="mt-6 border-t border-[#082b52]/15 pt-5 text-[15px] text-[#082b52]/80">Service area: Maryland, DC and Virginia</p>
            </div>
          </div>
        </section>

        <CtaBand heading={a.cta.heading} label={a.cta.button.label} href={a.cta.button.href} />
      </main>
      <FilmDialog
        id="vision"
        event="open-vision"
        title="Our Vision"
        outline="VISION"
        statement={a.who.statement}
        rows={[
          { word: "Plan", text: "Goals, site and budget settled before design begins." },
          { word: "Design", text: "Architecture and engineering that are buildable and priced." },
          { word: "Build", text: "One accountable team, from the first sketch to handover." },
        ]}
        paragraphs={a.who.body}
        ring={"BUILD FOR A BETTER SOCIETY • "}
      />
      {/* the same dialog with the film and the words on opposite sides */}
      <FilmDialog
        id="values"
        event="open-values"
        title="Our Values"
        outline="VALUES"
        statement={a.values.statement}
        rows={a.values.items.map((v) => ({ word: v.title, text: v.text }))}
        paragraphs={[a.values.closing]}
        ring={"INTEGRITY • ACCOUNTABILITY • COLLABORATION • CRAFTSMANSHIP • "}
        ringSize={10.5}
        wordWidth="12rem"
        mirrored
      />
      <Footer />
    </>
  );
}
