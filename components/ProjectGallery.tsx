import Image from "next/image";

/**
 * The photographs of a project, on the same left and right margins as the rest of the page and as the reference does: a wide picture across the full width, then two
 * side by side, and again, with only a hairline of white between them. Photographs come in threes.
 */
export function ProjectGallery({ title, photos }: { title: string; photos: string[] }) {
  return (
    <section aria-label={`Photographs of ${title}`} className="bg-white px-4 py-14 min-[768px]:px-[124px] min-[768px]:py-20">
      <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 gap-[6px] min-[640px]:grid-cols-2">
        {photos.map((src, i) => {
          const wide = i % 3 === 0;
          return (
            <div key={src + i} className={`relative overflow-hidden bg-[#e6e6e6] ${wide ? "aspect-[3/2] min-[640px]:col-span-2 min-[640px]:aspect-[2.28/1]" : "aspect-[3/2]"}`}>
              <Image
                src={src}
                alt={`Photograph ${i + 1} of ${title}`}
                fill
                sizes={wide ? "(max-width: 1928px) 100vw, 1680px" : "(max-width: 640px) 100vw, (max-width: 1928px) 50vw, 840px"}
                quality={85}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
