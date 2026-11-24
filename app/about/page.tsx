import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutCta } from "@/components/AboutCta";
import { AboutHero } from "@/components/AboutHero";
import { AboutLinks } from "@/components/AboutLinks";
import { CommitmentsSection } from "@/components/CommitmentsSection";
import { FilmDialog } from "@/components/FilmDialog";
import { TeamSection } from "@/components/TeamSection";
import { ui } from "@/components/PageIntro";
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
            <p data-up className="mx-auto w-full max-w-[68ch] text-center font-mulish text-[clamp(18px,1.55vw,24px)] leading-[1.6] text-[#082b52] [text-wrap:balance]">
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
        <CommitmentsSection id="commitments" heading={a.commitments.heading} lead={a.commitments.lead} items={a.commitments.items} />

        <AboutCta heading={a.cta.heading} />
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
