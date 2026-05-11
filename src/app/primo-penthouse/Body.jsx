import Image from "next/image";

const defaultProject = {
  title: "Primo Penthouse",
  category: "Residential",
  location: "Dubai, UAE",
  scope: "Interior Fit-Out / FF&E",
  year: "2026",
  heading:
    "A refined residential interior shaped with curated finishes, bespoke detailing, and calm spatial balance.",
  description:
    "Primo Penthouse is designed as a premium living environment where material selection, furniture coordination, lighting, and decorative details work together to create a warm, elevated, and highly functional home.",
  story:
    "Every stage of the project was approached with precision — from concept refinement and material selection to furniture placement, finishing details, and final styling. The result is a sophisticated penthouse interior that feels timeless, comfortable, and deeply connected to modern luxury living.",
  images: [
    "/images/penth1.webp",
    "/images/penth2.webp",
    "/images/penth3.webp",
    "/images/penth4.webp",
  ],
};

export default function Body({ project = defaultProject }) {
  return (
    <main className="bg-[#1f2321] text-white">
      {/* Intro */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/60">
              Project Overview
            </p>
          </div>

          <div>
            <h2 className="text-[34px] font-light leading-[1.08] tracking-[-0.04em] md:text-[58px]">
              {project.heading}
            </h2>

            <p className="mt-8 max-w-[760px] text-[16px] leading-[1.55] text-white/80 md:text-[18px]">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 border-y border-white py-8 md:grid-cols-4">
          {[
            ["Location", project.location],
            ["Sector", project.category],
            ["Scope", project.scope],
            ["Year", project.year],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                {label}
              </p>
              <h3 className="mt-3 text-[18px] font-light">{value}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Large Image */}
      <section className="px-5 pb-6 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="relative h-[420px] w-full overflow-hidden md:h-[720px]">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Two Images */}
      <section className="px-5 pb-6 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-2">
          {project.images.slice(1, 3).map((img, index) => (
            <div
              key={index}
              className="relative h-[360px] w-full overflow-hidden md:h-[560px]"
            >
              <Image
                src={img}
                alt={`${project.title} ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-[38px] font-light leading-[1] tracking-[-0.05em] md:text-[58px]">
            Design,
            <br />
            delivery,
            <br />
            detail.
          </h2>

          <p className="max-w-[760px] text-[16px] leading-[1.6] text-white/80 md:text-[18px]">
            {project.story}
          </p>
        </div>
      </section>

      {/* Final Image */}
      <section className="px-5 pb-20 md:px-10 md:pb-28 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="relative h-[420px] w-full overflow-hidden md:h-[720px]">
            <Image
              src={project.images[3]}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}