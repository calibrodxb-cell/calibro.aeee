import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[650px] w-full overflow-hidden bg-[#1f2321] md:min-h-[720px]">
      <Image
        src="/images/16.webp"
        alt="Projects"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full items-end px-5 pb-12 md:px-10 md:pb-16 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <h1 className="text-[60px] font-semibold leading-[1.1] tracking-[-0.03em] text-white md:text-[110px] lg:text-[130px]">
            Projects
          </h1>

          <p className="mt-6 max-w-[520px] text-[14px] font-semibold text-white/80 md:text-[16px]">
            A curated selection of hospitality, residential, and commercial
            environments delivered across the UAE and wider GCC.
          </p>
        </div>
      </div>
    </section>
  );
}