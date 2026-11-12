import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageIntro, ui } from "@/components/PageIntro";
import { FOOTER } from "@/lib/data";
import { CONTACT } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Contact — PROACTIVE Design and Building Systems",
  description: "Contact PROACTIVE Design and Building Systems, Inc. in Baltimore, Maryland.",
};

const mail = (subject: string) => `mailto:${FOOTER.email}?subject=${encodeURIComponent(subject)}`;

export default function ContactPage() {
  const c = CONTACT;
  return (
    <>
      <Header />
      <main id="main-content" data-motion className="offerings-vars relative bg-white text-[#143275]">
        <PageIntro crumb="Contact" title={c.title} lead={c.lead} />

        <section aria-label="Contact details and form" className={`${ui.pad} py-14 min-[768px]:py-[90px]`}>
          <div className={`${ui.wrap} grid gap-14 border-t border-[#143275]/15 pt-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-10`}>
            <div className="min-[992px]:col-span-4">
              <h2 className={ui.eyebrow}>Headquarters</h2>
              <p className="mt-4 text-[19px] leading-snug font-medium">PROACTIVE Design and Building Systems, Inc.</p>
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

            <div className="min-[992px]:col-span-7 min-[992px]:col-start-6">
              <h2 className={ui.title}>Send us a message</h2>
              <div className="mt-8">
                <ContactForm topics={c.topics} />
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Other ways to reach us" className={`${ui.pad} bg-[#f3f6fa] py-16 min-[768px]:py-[100px]`}>
          <div className={`${ui.wrap} grid gap-6 min-[992px]:grid-cols-2 min-[992px]:gap-x-10`}>
            <article data-up className="bg-white p-7 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_22px_40px_-28px_rgba(20,50,117,.5)] min-[768px]:p-10">
              <h2 className={ui.tile}>{c.subcontractors.heading}</h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-[#143275]/85">{c.subcontractors.text}</p>
              <a href={mail("Subcontractor or supplier inquiry")} className={`${ui.btnGhost} mt-6`}>
                {c.subcontractors.button}
              </a>
            </article>
            <article data-up style={{ ["--d" as string]: "120ms" }} className="bg-white p-7 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_22px_40px_-28px_rgba(20,50,117,.5)] min-[768px]:p-10">
              <h2 className={ui.tile}>{c.careers.heading}</h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-[#143275]/85">{c.careers.text}</p>
              <a href={mail("Careers inquiry")} className={`${ui.btnGhost} mt-6`}>
                {c.careers.button}
              </a>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
