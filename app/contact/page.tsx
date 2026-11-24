import type { Metadata } from "next";
import { BrandLockup } from "@/components/BrandLockup";
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
              <p className={ui.eyebrow}>Headquarters</p>
              <div role="img" aria-label="Proactive Design and Building Systems, Inc." className="mt-5 inline-flex items-center gap-3">
                <BrandLockup />
              </div>
              <address className={`mt-3 ${ui.small} whitespace-pre-line not-italic`}>{FOOTER.office}</address>

              <p className={`${ui.eyebrow} mt-10`}>Phone</p>
              <p className={`mt-3 ${ui.small}`}>
                <a href={FOOTER.phone.href} className={ui.link}>
                  {FOOTER.phone.label}
                </a>
              </p>

              <p className={`${ui.eyebrow} mt-10`}>Email</p>
              <p className={`mt-3 ${ui.small}`}>
                <a href={`mailto:${FOOTER.email}`} className={ui.link}>
                  {FOOTER.email}
                </a>
              </p>

              <p className={`${ui.eyebrow} mt-10`}>Service area</p>
              <p className={`mt-3 ${ui.small}`}>Maryland, DC and Virginia</p>
            </div>

            {/* the form sits on a white platform that lifts a little off the pale page: a hairline border, a gold rule along the top and a soft, low shadow */}
            <div className="rounded-[2px] border border-[#082b52]/10 border-t-2 border-t-gold bg-white p-7 shadow-[0_1px_2px_rgba(8,43,82,.06),0_28px_50px_-30px_rgba(8,43,82,.4)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(8,43,82,.08),0_34px_58px_-30px_rgba(8,43,82,.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[768px]:p-12 min-[992px]:col-span-7 min-[992px]:col-start-6">
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
