import Image from "next/image";

const serviceItems = [
  {
    title: "Sourcing",
    text: "We source from global brands and coordinate bespoke, one-off or stock requirements.",
  },
  {
    title: "Pricing & POs",
    text: "Transparent pricing, detailed quotes, and accurate purchase order management.",
  },
  {
    title: "Validation",
    text: "Physical sampling and final material sign-off managed before production.",
  },
  {
    title: "Production",
    text: "Manufacturing status, factory updates, and timeline control across every item.",
  },
  {
    title: "Logistics",
    text: "Global coordination, customs clearance, and precise site delivery across the GCC.",
  },
  {
    title: "Assembly",
    text: "Installation instructions, assembly, and site handover coordination.",
  },
  {
    title: "Warranty",
    text: "Defect reporting, supplier follow-up, and rectification management.",
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
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
              Complete Services
            </p>

            <h2 className="max-w-[420px] text-[38px] font-light leading-[0.95] tracking-[-0.04em] md:text-[58px]">
              From brief to aftercare
            </h2>

            <p className="mt-8 max-w-[390px] text-[15px] leading-[1.4] text-white/85">
              Whether you are specifying for a luxury hotel, a corporate office,
              a residential villa, or a mixed-use development, we manage every
              phase of FF&E procurement with transparency, precision, and
              single-point accountability.
            </p>

            <div className="relative mt-14 h-[300px] w-full overflow-hidden md:h-[380px] lg:max-w-[410px]">
              <Image
                src="/images/11.webp"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((item) => (
              <div key={item.title} className="border-t border-white pt-5">
                <h3 className="text-[18px] font-light">{item.title}</h3>
                <p className="mt-5 text-[13px] leading-[1.4] text-white/80">
                  {item.text}
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
              src="/images/12.webp"
              alt=""
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

            <h2 className="text-[40px] font-light uppercase leading-[0.95] tracking-[-0.04em] md:text-[54px]">
              Execution Process
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={num} className="border-b border-white pb-6">
                <span className="text-[64px] font-light">{num}</span>
                <p className="mt-4 text-[13px] text-white/80">
                  Process description here for step {num}.
                </p>
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
          src="/images/13.webp"
          alt=""
          fill
          className="object-cover"
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
                <p className="mt-4 text-[12px] text-white/80">
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

          <p className="mt-6 max-w-[700px] text-[15px] text-white/85">
            We work closely with architects and interior designers across
            multiple sectors.
          </p>
        </div>
      </section>
    </main>
  );
}