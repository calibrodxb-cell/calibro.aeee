export default function HeroSection() {
  return (
    <section
      id="home"
      className="bg-[#1f2321] px-5 pb-16 pt-36 text-white md:px-10 md:pb-24 md:pt-44 lg:px-16 xl:px-20"
    >
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
        <h1 className="text-[72px] font-light leading-[0.9] tracking-[-0.07em] md:text-[120px] lg:text-[150px]">
          Network
        </h1>

        <div className="max-w-[620px]">
          <h2 className="text-[28px] font-light leading-[1.1] tracking-[-0.04em] md:text-[42px]">
            CALIBRO represents a carefully curated network of international
            brands and specialised ateliers
          </h2>

          <p className="mt-8 max-w-[560px] text-[15px] leading-[1.45] text-white/80 md:text-[17px]">
            Each partnership is built on shared values: exceptional
            craftsmanship, specification-grade quality, and reliable
            delivery—all accessible through our Dubai showroom and procurement
            service.
          </p>
        </div>
      </div>
    </section>
  );
}