import Image from "next/image";
import { HERO_H1 } from "@/lib/heroType";

/**
 * The closing call to action: a full-width photograph of a client and a designer going over plans, under a
 * deep blue wash so the heading and the button stay clear, with one button that opens the Start a Project popup.
 */
export function AboutCta({ heading }: { heading: string }) {
  return (
    <section aria-label={heading} className="group/cta relative isolate flex min-h-[460px] items-center justify-center overflow-hidden bg-[#04142a] px-4 py-[90px] text-center text-white min-[768px]:min-h-[560px] min-[768px]:px-[124px]">
      <Image
        src="/assets/cta-meeting.jpg"
        alt="A client and a designer smiling over a set of drawings at a table."
        fill
        sizes="100vw"
        quality={85}
        className="-z-20 object-cover object-[50%_42%] transition-transform duration-[2400ms] ease-out group-hover/cta:scale-[1.04]"
      />
      {/* a blue wash, darker toward the edges and the foot, so the picture stays visible in the middle */}
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(4,20,42,.5),rgba(4,20,42,.82)_75%)]" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[#04142a]/80 to-transparent" />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="mx-auto max-w-[980px]">
        <span aria-hidden="true" className="mx-auto mb-8 block h-0.5 w-14 bg-gold" />
        <h2 className={HERO_H1}>{heading}</h2>
        <a
          href="/contact"
          data-start-project
          className="mt-11 inline-flex min-h-[58px] items-center justify-center border border-gold bg-gold px-10 text-[15px] font-semibold tracking-[.1em] text-[#04142a] uppercase no-underline outline-none transition-colors duration-300 hover:bg-transparent hover:text-white focus-visible:bg-transparent focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Start a Project
        </a>
      </div>
    </section>
  );
}
