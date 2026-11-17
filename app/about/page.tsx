import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutHero } from "@/components/AboutHero";
import { AboutLinks } from "@/components/AboutLinks";
import { FilmDialog } from "@/components/FilmDialog";
import { TeamSection } from "@/components/TeamSection";
import { CtaBand, ui } from "@/components/PageIntro";
import { ScrollProgress } from "@/components/MotionBits";
import { ABOUT } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About — Proactive Design and Building Systems",
  description:
    "Proactive Design and Building Systems is a Baltimore design-build firm serving Maryland, DC and Virginia.",
};

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

        {/* Our team */}
        <TeamSection id="leadership" people={a.leadership.people} />

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
