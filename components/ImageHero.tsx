import Image from "next/image";
import { HERO_H1 } from "@/lib/heroType";

/**
 * A page-header band with a photograph behind a dark blue tint and the title centred. It is the same height as
 * the About page's header, so the two pages open alike.
 */
export function ImageHero({ title, lead, image, alt, position = "center" }: { title: string; lead?: string; image: string; alt: string; position?: string }) {
  return (
    <section aria-label={title} className="relative isolate overflow-hidden bg-[#061a33] px-4 pt-[96px] text-center text-white min-[768px]:px-[124px] min-[768px]:pt-[110px]">
      <Image src={image} alt={alt} fill priority sizes="100vw" quality={85} className="-z-20 object-cover" style={{ objectPosition: position }} />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[#061a33]/55" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,26,51,.55)_0%,rgba(6,26,51,0)_40%,rgba(6,26,51,.5)_100%)]" />

      <div className="mx-auto flex min-h-[480px] w-full max-w-[1680px] flex-col items-center justify-center py-14 min-[768px]:min-h-[530px]">
        <h1 className={`hero-in ${HERO_H1}`}>{title}</h1>
        {lead && <p className="hero-in mt-6 max-w-[62ch] [text-wrap:balance] font-mulish text-[clamp(18px,1.55vw,24px)] leading-[1.6] text-white/95 [text-shadow:0_2px_12px_rgba(0,0,0,.35)]">{lead}</p>}
      </div>
    </section>
  );
}
