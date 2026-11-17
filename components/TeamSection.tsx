import Image from "next/image";
import { RotatingBadge } from "@/components/RotatingBadge";
import { HERO_H1 } from "@/lib/heroType";

type Person = { name: string; title: string; image: string };

/**
 * "Meet our dedicated team": a blurred photograph behind a title and a short line on the left, and a grid of
 * portrait cards on the right, each with the name and the title underneath, as on the earlier PDBS site.
 */
export function TeamSection({ id, heading, lead, people }: { id: string; heading: string; lead: string; people: Person[] }) {
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
          <RotatingBadge className="mt-14" />
        </div>

        <div className="grid gap-5 min-[640px]:grid-cols-2 min-[992px]:col-span-8">
          {people.map((p) => (
            <article key={p.name} className="group relative overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,.7)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_40px_80px_-24px_rgba(0,0,0,.85)]">
              <div className="relative aspect-[1.245/1] overflow-hidden bg-[#0e365c]">
                <Image
                  src={p.image}
                  alt={`${p.name}, ${p.title}`}
                  fill
                  sizes="(max-width: 992px) 50vw, 330px"
                  quality={90}
                  className="scale-100 object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
              </div>
              {/* the name and the title on a dark panel, as in the reference */}
              <div className="flex min-h-[8.6rem] flex-col justify-center bg-[#262626]/92 px-5 py-5 text-center">
                <h3 className="text-[22px] leading-snug font-medium text-white">{p.name}</h3>
                <p className="mt-1 text-[20px] leading-snug font-normal text-white/65">{p.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
