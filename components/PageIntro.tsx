import Image from "next/image";
import Link from "next/link";
import { ParallaxFrame, ScrollProgress } from "@/components/MotionBits";

/** Shared styles so every inner page uses the homepage type scale. */
export const ui = {
  pad: "px-4 min-[768px]:px-[124px]",
  wrap: "mx-auto w-full max-w-[1680px]",
  title: "font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]",
  eyebrow: "text-xs leading-4 font-semibold tracking-[.15em] text-gold uppercase",
  body: "font-mulish text-[17px] leading-[1.65] text-[#143275]/90",
  tile: "text-(length:--h5) leading-(--h5-lh) font-(--h5-weight)",
  btn: "btn-sweep inline-flex min-h-12 items-center justify-center border border-[#143275] bg-[#143275] bg-[linear-gradient(#fff,#fff)] px-7 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline outline-none hover:text-[#143275] focus-visible:text-[#143275]",
  btnGhost:
    "btn-sweep inline-flex min-h-12 items-center justify-center border border-[#143275]/30 bg-[linear-gradient(#143275,#143275)] px-7 text-[.8125rem] font-medium tracking-[.08em] text-[#143275] uppercase no-underline outline-none hover:border-[#143275] hover:text-white focus-visible:border-[#143275] focus-visible:text-white",
  link: "text-inherit underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold",
};

/** Splits a headline into masked words so they can rise one after another. */
export function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`}>
          {i > 0 && " "}
          <span className="w">
            <span style={{ ["--i" as string]: i }}>{w}</span>
          </span>
        </span>
      ))}
    </>
  );
}

/** Breadcrumb, headline, introduction and a wide image, as on the institutional builders' pages. */
export function PageIntro({
  crumb,
  title,
  lead,
  image,
  imageAlt,
}: {
  crumb: string;
  title: string;
  lead: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className={`${ui.pad} pt-[140px] min-[768px]:pt-[180px]`}>
      <ScrollProgress />
      <div className={ui.wrap}>
        <nav data-up aria-label="Breadcrumb" className="text-sm text-[#143275]/70">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className={ui.link}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#143275]">
              {crumb}
            </li>
          </ol>
        </nav>
        <div className="mt-8 grid gap-8 min-[992px]:grid-cols-12 min-[992px]:gap-x-10">
          <h1 data-words className="font-jost text-[22.4px] leading-[27px] font-medium tracking-normal uppercase min-[690px]:text-[34.2px] min-[690px]:leading-[39px] min-[992px]:col-span-6 min-[992px]:text-[length:min(54px,calc((100vw-299px)/12.55))] min-[992px]:leading-[1.11]">
            <Words text={title} />
          </h1>
          <p data-up style={{ ["--d" as string]: "250ms" }} className="font-mulish text-[20px] leading-[31px] font-normal text-[#143275] min-[992px]:col-span-5 min-[992px]:col-start-8 min-[992px]:text-[length:clamp(14px,calc((50vw-184px)/32.5),20px)] min-[992px]:leading-[1.55]">
            {lead}
          </p>
        </div>
        {image && (
          <ParallaxFrame className="mt-12 aspect-[16/10] min-[992px]:aspect-[21/8]">
            <Image src={image} alt={imageAlt ?? ""} fill priority sizes="100vw" className="object-cover" />
          </ParallaxFrame>
        )}
      </div>
    </section>
  );
}

/** Closing band used at the end of each page. */
export function CtaBand({ heading, label, href }: { heading: string; label: string; href: string }) {
  return (
    <section aria-label={heading} className={`${ui.pad} bg-[#082b52] py-16 text-center text-white min-[768px]:py-[100px]`}>
      <div className="mx-auto max-w-3xl">
        <h2 className={ui.title}>{heading}</h2>
        <Link
          href={href}
          className="btn-sweep mt-8 inline-flex min-h-12 items-center justify-center border border-gold bg-gold bg-[linear-gradient(#082b52,#082b52)] px-8 text-[.8125rem] font-medium tracking-[.08em] text-[#082b52] uppercase no-underline outline-none hover:text-gold focus-visible:text-gold"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
