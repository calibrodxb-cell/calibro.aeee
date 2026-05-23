import Image from "next/image";

const serviceItems = [
  {
    title: "Raw Material Sourcing",
    image: "/images/of1.png",
  },
  {
    title: "Woodworks & Joinery",
    image: "/images/of2.png",
  },
  {
    title: "Metalworks & Fabrication",
    image: "/images/of3.png",
  },
  {
    title: "Upholstery & Soft Furnishing",
    image: "/images/of4.png",
  },
  {
    title: "Custom Finishing",
    image: "/images/of5.png",
  },
];

const processItems = [
  "Brief & Design.",
  "Material Sourcing.",
  "Cutting & Preparation.",
  "Manufacturing & Assembly.",
  "Finishing & Coating.",
  "Quality Control.",
  "Delivery & Installation",
];

export default function Body() {
  return (
    <main className="bg-[#1f2321] text-white">
      {/* Intro Section */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
              Complete Services
            </p>

            <h2 className="max-w-[420px] text-[38px] font-light leading-[0.95] tracking-[-0.04em] md:text-[58px]">
              From brief to aftercare
            </h2>

            <p className="mt-8 max-w-[390px] text-[15px] leading-[1.4] text-white/85 uppercase">
              Our capabilities span the entire production spectrum from
              woodworks and joinery to metalworks and upholstery all under one
              roof.
            </p>

            <div className="relative mt-14 h-[300px] w-full overflow-hidden md:h-[380px] lg:max-w-[410px]">
              <Image
                src="/images/factory-3.png"
                alt="Factory"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((item) => (
              <div key={item.title} className="border-t border-white pt-5">
                {/* Title */}
                <h3 className="min-h-[58px] text-[18px] font-light leading-tight">
                  {item.title}
                </h3>

                {/* Image */}
                <div className="relative mt-5 h-[190px] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="px-5 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="relative h-[360px] w-full overflow-hidden md:h-[620px]">
            <Image
              src="/images/factory-4.png"
              alt="Factory Interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
              How it works
            </p>

            <h2 className="text-[40px] font-light uppercase leading-[0.95] tracking-[-0.04em] md:text-[45px]">
              Process Flow
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {processItems.map((text, index) => (
              <div
                key={index}
                className="flex min-h-[220px] flex-col justify-between border-b border-white pb-6"
              >
                <div>
                  <span className="text-[64px] font-light">
                    {index + 1}
                  </span>

                  <p className="mt-4 text-[13px] leading-[1.5] text-white/80">
                    {text}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex items-end">
              <h3 className="text-[22px] font-light uppercase leading-tight">
                Transparent.
                <br />
                Trackable.
                <br />
                On Time.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="relative h-[420px] w-full overflow-hidden md:h-[600px]">
        <Image
          src="/images/factory-1.png"
          alt="Factory"
          fill
          className="scale-x-[-1] object-cover"
        />
      </section>

      {/* Why Choose */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-[38px] font-light md:text-[54px]">
              Why choose
              <br />
              CALIBRO
            </h2>

            <p className="mt-6 text-[13px] text-white/80">
              Trusted by professionals across UAE and GCC.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Single Point of Accountability",
              "Proactive Risk Management",
              "Specification-Ready Alternatives",
              "Dynamic Communication",
              "Comprehensive Aftercare",
              "UAE and GCC Expertise",
            ].map((item) => (
              <div key={item} className="border-t border-white pt-5">
                <h3 className="text-[15px] font-light">{item}</h3>

                <p className="mt-4 text-[12px] leading-[1.5] text-white/80">
                  Supporting content goes here.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-[32px] font-light md:text-[48px]">
            Partnerships built on trust, precision, and shared vision
          </h2>

          <p className="mt-6 max-w-[700px] text-[15px] leading-[1.6] text-white/85">
            We work closely with architects and interior designers across
            multiple sectors, delivering dependable execution, transparent
            communication, and refined craftsmanship from concept to completion.
          </p>
        </div>
      </section>
    </main>
  );
}