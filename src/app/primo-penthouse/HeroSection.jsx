import Image from "next/image";

const defaultProject = {
  title: "Primo Penthouse",
  category: "Residential",
  heroImage: "/images/penth3.webp",
};

export default function HeroSection({ project = defaultProject }) {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[650px] w-full overflow-hidden bg-[#1f2321] md:min-h-[720px]"
    >
      <Image
        src={project.heroImage}
        alt={project.title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full items-end px-5 pb-12 md:px-10 md:pb-16 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">
            {project.category}
          </p>

          <h1 className="max-w-[900px] text-[54px] font-light font-semibold leading-[0.9] tracking-[-0.03em] text-white md:text-[100px] lg:text-[120px]">
            {project.title}
          </h1>
        </div>
      </div>
    </section>
  );
}