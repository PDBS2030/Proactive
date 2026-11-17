import Image from "next/image";
import { HERO_H1 } from "@/lib/heroType";

type Role = { title: string; text: string };

/** Where each person stands in the placeholder photograph of the crew, so each card shows one face (percent) */
const CROPS = [{ x: 0 }, { x: 42 }, { x: 84 }, { x: 100 }];

/**
 * "Meet our dedicated team": a blurred photograph behind a title and a short line on the left, and a grid of
 * portrait cards on the right, each with the role underneath. The portraits are placeholders cut from the crew
 * photograph until the real team photos are supplied.
 */
export function TeamSection({ id, heading, lead, roles }: { id: string; heading: string; lead: string; roles: Role[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative isolate scroll-mt-[130px] overflow-hidden bg-[#061a33] px-4 py-[94px] text-white min-[768px]:px-[124px] min-[768px]:py-[120px]">
      <Image src="/assets/gallery/landmark/3.jpg" alt="" fill sizes="100vw" className="-z-20 scale-110 object-cover blur-[14px]" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[#061a33]/66" />

      <div className="mx-auto grid w-full max-w-[1680px] gap-12 min-[992px]:grid-cols-12 min-[992px]:gap-x-14">
        <div className="min-[992px]:col-span-4">
          <h2 id={`${id}-title`} className={`${HERO_H1} text-white`}>
            Meet Our Dedicated {heading.replace(/^Our\s+/i, "")}
          </h2>
          <p className="mt-7 max-w-[34ch] font-mulish text-[18px] leading-[1.65] text-white/85">{lead}</p>
        </div>

        <div className="grid gap-5 min-[640px]:grid-cols-2 min-[992px]:col-span-8">
          {roles.map((r, i) => (
            <article key={r.title} className="group relative overflow-hidden bg-[#0b2a4d] shadow-[0_24px_60px_-24px_rgba(0,0,0,.7)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_40px_80px_-24px_rgba(0,0,0,.85)]">
              <div className="relative aspect-[1.12/1] overflow-hidden bg-[#0e365c]">
                <div
                  role="img"
                  aria-label={`${r.title}, photo to be added`}
                  className="absolute inset-0 scale-100 bg-no-repeat transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  style={{ backgroundImage: "url(/assets/offerings-talent.jpg)", backgroundSize: "290% auto", backgroundPosition: `${CROPS[i % CROPS.length].x}% 58%` }}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#061a33]/45 via-transparent to-transparent" />
              </div>
              <div className="relative px-6 py-5 text-center">
                <span aria-hidden="true" className="absolute top-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gold transition-[width] duration-500 ease-out group-hover:w-24" />
                <h3 className="text-[20px] leading-snug font-medium text-white">{r.title}</h3>
                <p className="mx-auto mt-1.5 line-clamp-2 max-w-[38ch] text-[14px] leading-[1.5] text-white/70">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
