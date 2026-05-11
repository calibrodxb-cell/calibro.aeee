import Image from "next/image";

const points = [
  "We coordinate bespoke manufacturing with meticulous precision and unwavering dependability.",
  "We serve as your single point of accountability from our Dubai showroom to final delivery.",
  "We translate your vision into a finished reality.",
];

export default function Body() {
  return (
    <section className="w-full bg-[#1f2321] px-5 py-16 text-white md:px-10 md:py-24 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-[1280px]">
        {/* Main Heading */}
        <h2 className="max-w-[1100px] text-[34px] font-light leading-[1.18] tracking-[-0.03em] md:text-[54px] lg:text-[60px]">
          Based in Dubai, we are Calibro—an FF&E procurement partner for
          architects, interior designers, developers, and private clients across
          the UAE and the wider GCC
        </h2>

        {/* Content Grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.8fr] lg:items-start">
          {/* Left Content */}
          <div>
            <div className="mb-9 h-[2px] w-full max-w-[580px] bg-white" />

            <p className="max-w-[560px] text-[24px] font-light leading-[1.18] tracking-[-0.02em] md:text-[30px]">
              We source and deliver products from a curated portfolio of
              international brands—including furniture, bespoke joinery,
              lighting, accessories, rugs, outdoor collections, and large-format
              art.
            </p>

            {/* Points */}
            <div className="mt-20 grid gap-8 md:grid-cols-3 md:gap-10">
              {points.map((item, index) => (
                <div key={index}>
                  <p className="min-h-[88px] text-[15px] font-semibold leading-[1.15] md:text-[14px] lg:text-[15px]">
                    {item}
                  </p>

                  <div className="mt-8 h-[2px] w-full bg-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[360px] w-full overflow-hidden md:h-[460px] lg:h-[465px]">
            <Image
              src="/images/body-img1.png"
              alt="Curated furniture procurement"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* CTA Cards */}
        <div className="mt-24 grid gap-5 md:grid-cols-2">
          <div className="flex min-h-[260px] flex-col justify-between bg-[#363636] p-8 md:min-h-[300px] lg:p-10">
            <h3 className="max-w-[470px] text-[25px] font-light leading-[1.15] tracking-[-0.02em] md:text-[30px]">
              Share your BOQ moodboard via Whatsapp
            </h3>

            <button className="mt-12 flex w-fit items-center gap-20 border border-white px-5 py-3 text-[12px] font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#363636]">
              Share
              <span>→</span>
            </button>
          </div>

          <div className="flex min-h-[260px] flex-col justify-between bg-[#363636] p-8 md:min-h-[300px] lg:p-10">
            <h3 className="max-w-[470px] text-[25px] font-light leading-[1.15] tracking-[-0.02em] md:text-[30px]">
              Book your Dubai Showroom visit
            </h3>

            <button className="mt-12 flex w-fit items-center gap-16 border border-white px-5 py-3 text-[12px] font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#363636]">
              Get In Touch
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}