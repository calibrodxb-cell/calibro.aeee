import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[650px] w-full overflow-hidden bg-[#1f2321] md:min-h-[720px]"
    >
      <Image
        src="/images/10.webp"
        alt="Our Factory with impact"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full items-end px-5 pb-12 md:px-10 md:pb-16 lg:px-16 xl:px-20">
        <div className="mx-auto flex w-full max-w-[1280px] items-end justify-between gap-8">
          <h1 className="max-w-[720px] text-[54px] font-light leading-[0.95] tracking-[-0.06em] text-white md:text-[92px] lg:text-[110px]">
            Our Factory
            <br />
            with impact
          </h1>

          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-white lg:block">
            Entry, The Mission
          </p>
        </div>
      </div>
    </section>
  );
}