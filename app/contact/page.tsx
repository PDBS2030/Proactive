import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageHero } from "@/components/ImageHero";
import { ui } from "@/components/PageIntro";
import { FOOTER } from "@/lib/data";
import { CONTACT } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Contact — Proactive Design and Building Systems",
  description: "Contact Proactive Design and Building Systems in Baltimore, Maryland.",
};

export default function ContactPage() {
  const c = CONTACT;
  return (
    <>
      <Header />
      <main id="main-content" data-motion className="offerings-vars relative bg-white text-[#082b52]">
        <ImageHero title={c.title} lead={c.lead} image="/assets/contact-hero.jpg" alt="Curved blue glass facade of a modern building against the sky." position="center 40%" />

        <section aria-label="Contact details and form" className={`${ui.pad} bg-[#f3f6fa] py-14 min-[768px]:py-[90px]`}>
          <div className={`${ui.wrap} grid items-start gap-14 min-[992px]:grid-cols-12 min-[992px]:gap-x-10`}>
            <div className="min-[992px]:col-span-4">
              <h2 className={ui.eyebrow}>Headquarters</h2>
              <p className="mt-4 text-[19px] leading-snug font-medium">Proactive Design and Building Systems</p>
              <address className="mt-3 text-[16px] leading-[1.6] whitespace-pre-line not-italic">{FOOTER.office}</address>

              <h2 className={`${ui.eyebrow} mt-10`}>Phone</h2>
              <p className="mt-3 text-[16px]">
                <a href={FOOTER.phone.href} className={ui.link}>
                  {FOOTER.phone.label}
                </a>
              </p>

              <h2 className={`${ui.eyebrow} mt-10`}>Email</h2>
              <p className="mt-3 text-[16px]">
                <a href={`mailto:${FOOTER.email}`} className={ui.link}>
                  {FOOTER.email}
                </a>
              </p>

              <h2 className={`${ui.eyebrow} mt-10`}>Service area</h2>
              <p className="mt-3 text-[16px]">Maryland, DC and Virginia</p>
            </div>

            {/* the form sits on a white platform that lifts a little off the pale page: a hairline border, a gold rule along the top and a soft, low shadow */}
            <div className="rounded-[2px] border border-[#082b52]/10 border-t-2 border-t-gold bg-white p-7 shadow-[0_1px_2px_rgba(8,43,82,.06),0_28px_50px_-30px_rgba(8,43,82,.4)] min-[768px]:p-12 min-[992px]:col-span-7 min-[992px]:col-start-6">
              <h2 className={ui.title}>Send us a message</h2>
              <div className="mt-8">
                <ContactForm topics={c.topics} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
