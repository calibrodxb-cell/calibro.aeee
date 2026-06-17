import Image from "next/image";

const serviceItems = [
  {
    title: "Raw Material Sourcing",
    image: "/images/of1.png",
    description:
      "Highest-quality materials and components from trusted European manufacturers.",
  },
  {
    title: "Woodworks & Joinery",
    image: "/images/of2.png",
    description:
      "Bespoke joinery and handcrafted timber pieces built to specification.",
  },
  {
    title: "Metalworks & Fabrication",
    image: "/images/of3.png",
    description:
      "Precision metal frames, structures, and detailing.",
  },
  {
    title: "Upholstery & Soft Furnishing",
    image: "/images/of4.png",
    description:
      " Statement seating and soft furnishings finished inhouse",
  },
  {
    title: "Custom Finishing",
    image: "/images/of5.png",
    description:
      " Surface, colour, and detail finishing to match your design intent.",
  },
];

const processItems = [
  {
    title: "Brief & Design",
    description:
      "Your drawings, BOQ, finish schedule, timeline, and investment range reviewed and confirmed.",
  },
  {
    title: "Material Sourcing",
    description:
      "Highest-quality materials and parts from trusted European manufacturers.",
  },
  {
    title: "Cutting & Preparation",
    description:
      "Precise preparation against approved specifications.",
  },
  {
    title: "Manufacturing & Assembly",
    description:
      "Built in-house with regular inspections and quality assurance.",
  },
  {
    title: "Finishing & Coating",
    description:
      " Surface and detail finishing to match your design intent",
  },
  {
    title: "Quality Control",
    description:
      "Photo documentation and pre-shipment verification to specification.",
  },
  {
    title: "Delivery & Installation",
    description:
      "Consolidation, GCC shipping, site delivery, and white-glove assembly.",
  },
];

export default function Body() {
  return (
    <main className="bg-[#1f2321] text-white">
      {/* Intro Section */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left */}
          <div>
            <p className="mb-5 text-[10px] font-normal leading-[1.4] tracking-normal uppercase text-white/70">
              Complete Services
            </p>

            <h2 className="max-w-[420px] text-[38px] font-normal leading-[1.4] tracking-normal md:text-[58px]">
              Raising the standard for furniture in the UAE
            </h2>

            <p className="mt-8 max-w-[390px] text-[15px] font-normal leading-[1.4] tracking-normal text-white/85 uppercase">
              Every piece we produce can be tailored to your exact vision materials, finishes, colours,
              dimensions, and detailing. Whether it's wood, metal, or fabric, we operate with the speed and
              reliability of a modern factory while keeping the craftsmanship of a boutique workshop.
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
                <h3 className="min-h-[58px] text-[18px] font-normal leading-[1.4] tracking-normal">
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

                {/* Description */}
                <p className="mt-5 text-[13px] font-normal leading-[1.4] tracking-normal text-white/80">
                  {item.description}
                </p>
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
            <p className="mb-5 text-[10px] font-normal leading-[1.4] tracking-normal uppercase text-white/70">
              How it works
            </p>

            <h2 className="text-[40px] font-normal uppercase leading-[1.4] tracking-normal md:text-[45px]">
              Factory stages — process flow
            </h2>

            <p className="mt-10 font-normal leading-[1.4] tracking-normal uppercase">
              We offer complete design flexibility for architects, designers, developers, and clients who don't settle for off-the-shelf solutions. With fast delivery and global shipping, Calibro furniture is made in the UAE and delivered almost anywhere in the world built to stand out, built to last.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {processItems.map((item, index) => (
              <div
                key={index}
                className="flex min-h-[220px] flex-col justify-between border-b border-white pb-6"
              >
                <div>
                  <span className="text-[64px] font-normal leading-[1.4] tracking-normal">
                    {index + 1}
                  </span>

                  <h3 className="mt-4 text-[18px] font-normal leading-[1.4] tracking-normal uppercase">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[13px] font-normal leading-[1.4] tracking-normal text-white/80">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex items-end">
              <h3 className="text-[22px] font-normal uppercase leading-[1.4] tracking-normal">
                Visit Us Today!
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
            <h2 className="text-[38px] font-normal leading-[1.4] tracking-normal md:text-[54px]">
              Why choose
              <br />
              CALIBRO
            </h2>

            <p className="mt-6 text-[13px] font-normal leading-[1.4] tracking-normal text-white/80">
              Trusted by professionals and private clients throughout Europe, the UAE, and across the wider GCC. We are Calibro a custom furniture factory partner for architects, interior designers, developers, and private clients, where timelines are respected, quality is assured, pricing remains precise, and every project is backed by warranty.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Single Point of Accountability",
                description:
                  "One team manages your entire procurement journey with transparent progress updates.",
              },
              {
                title: "Productive Risk Management",
                description:
                  "We anticipate lead times, programme-phasing constraints, shipping risks, and installation logistics before they become problems.",
              },
              {
                title: "Specification-Ready Alternatives",
                description:
                  "When products are unavailable, we provide equivalent options that maintain your design intent, quality standards, and budget.",
              },
              {
                title: "Dynamic Communication",
                description:
                  " Real-time progress updates, revised timelines when needed, and transparent issue resolution",
              },
              {
                title: "Comprehensive Aftercare",
                description:
                  " Post-installation support and warranty management handled by our team, not offloaded to you or your client.",
              },
              {
                title: "UAE and GCC Expertise",
                description:
                  "18+ years of international manufacturing experience, now locally based, with a deep understanding of UAE customs, authority approvals, and project-delivery standards.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-white pt-5">
                <h3 className="text-[15px] font-normal leading-[1.4] tracking-normal">
                  {item.title}
                </h3>

                <p className="mt-4 text-[12px] font-normal leading-[1.4] tracking-normal text-white/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-[32px] font-normal leading-[1.4] tracking-normal md:text-[48px]">
            Global standards. Regional craftsmanship.
          </h2>

          <p className="mt-6 max-w-[700px] text-[15px] font-normal leading-[1.4] tracking-normal text-white/85">
            Great furniture starts with what you put into it. We source only the highest-quality materials and
            parts from trusted European manufacturers, then assemble every piece locally with precision and
            care. From our dedicated Dubai factory, our capabilities span the entire production spectrum woodworks and joinery, metalworks and fabrication, upholstery and soft furnishings, and custom
            finishing all under one roof. <br /><br />
            The result is a single, accountable partner who manages every phase from brief to aftercare with
            transparency, precision, and disciplined timelines.
          </p>
        </div>
      </section>
    </main>
  );
}