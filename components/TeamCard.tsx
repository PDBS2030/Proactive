"use client";

import Image from "next/image";
import { OPEN_PERSON } from "@/components/PersonDialog";

/** One team card. Pressing it opens that person's profile, growing from the card. */
export function TeamCard({ index, name, title, image }: { index: number; name: string; title: string; image: string }) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={`${name}, ${title}. Open profile`}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        window.dispatchEvent(new CustomEvent(OPEN_PERSON, { detail: { i: index, x: r.left + r.width / 2, y: r.top + r.height / 2 } }));
      }}
      className="group relative block w-full cursor-pointer overflow-hidden text-left shadow-[0_24px_50px_-22px_rgba(8,43,82,.55)] outline-none transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_40px_70px_-24px_rgba(8,43,82,.7)] focus-visible:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2356e5]"
    >
      <div className="relative aspect-[1.245/1] overflow-hidden bg-[#0e365c]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 992px) 50vw, 330px"
          quality={90}
          className="scale-100 object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
      </div>
      {/* the name and the title on a very dark blue panel */}
      <div className="flex min-h-[8.6rem] flex-col justify-center bg-[#04142a] px-5 py-5 text-center">
        <span className="block text-(length:--h5) leading-(--h5-lh) font-(--h5-weight) text-white">{name}</span>
        <span className="mt-1 block text-[15px] leading-snug font-normal text-white/65">{title}</span>
      </div>
    </button>
  );
}
