import Image from "next/image";
import Link from "next/link";

/** Shared styles so every inner page uses the homepage type scale. */
export const ui = {
  pad: "px-4 min-[768px]:px-[124px]",
  wrap: "mx-auto w-full max-w-[1680px]",
  title: "font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial]",
  eyebrow: "text-xs leading-4 font-semibold tracking-[.15em] text-gold uppercase",
  body: "font-mulish text-[17px] leading-[1.65] text-[#143275]/90",
  tile: "text-(length:--h5) leading-(--h5-lh) font-(--h5-weight)",
  btn: "inline-flex min-h-12 items-center justify-center border border-[#143275] bg-[#143275] px-7 text-[.8125rem] font-medium tracking-[.08em] text-white uppercase no-underline transition-colors duration-300 outline-none hover:bg-transparent hover:text-[#143275] focus-visible:bg-transparent focus-visible:text-[#143275]",
  btnGhost:
    "inline-flex min-h-12 items-center justify-center border border-[#143275]/30 px-7 text-[.8125rem] font-medium tracking-[.08em] text-[#143275] uppercase no-underline transition-colors duration-300 outline-none hover:border-gold focus-visible:border-gold",
  link: "text-inherit underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-gold focus-visible:decoration-gold",
};

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
      <div className={ui.wrap}>
        <nav aria-label="Breadcrumb" className="text-sm text-[#143275]/70">
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
          <h1 className="font-jost text-[22.4px] leading-[27px] font-medium tracking-normal uppercase min-[690px]:text-[34.2px] min-[690px]:leading-[39px] min-[992px]:col-span-6 min-[992px]:text-[length:min(54px,calc((100vw-299px)/12.55))] min-[992px]:leading-[1.11]">
            {title}
          </h1>
          <p className="font-mulish text-[20px] leading-[31px] font-normal text-[#143275] min-[992px]:col-span-5 min-[992px]:col-start-8 min-[992px]:text-[length:clamp(14px,calc((50vw-184px)/32.5),20px)] min-[992px]:leading-[1.55]">
            {lead}
          </p>
        </div>
        {image && (
          <div className="relative mt-12 aspect-[16/10] overflow-hidden min-[992px]:aspect-[21/8]">
            <Image src={image} alt={imageAlt ?? ""} fill priority sizes="100vw" className="object-cover" />
          </div>
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
          className="mt-8 inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-8 text-[.8125rem] font-medium tracking-[.08em] text-[#082b52] uppercase no-underline transition-colors duration-300 outline-none hover:bg-transparent hover:text-gold focus-visible:bg-transparent focus-visible:text-gold"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
