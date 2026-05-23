import Image from "next/image";

const workflow = [
  "Briefing & Budget",
  "Artist Shortlist Preview",
  "Sketches & Scale Tests",
  "Contract & Timeline",
  "Production & Documentation",
  "Shipping & Customs",
  "Installation & Care Notes",
];

const useCases = [
  "Hotel Lobbies & Reception Walls",
  "Office Building Atriums",
  "Meeting Room Features",
  "Corridor Galleries",
  "Executive Suites",
  "Distinctive Residential Spaces",
  "Private collections",
];

const ctas = [
  {
    title: "Request a list of artists for your project",
    button: "Book a Visit",
  },
  {
    title: "Visit the showroom to see art in context",
    button: "Get In Touch",
  },
  {
    title: "View available large-format artworks",
    button: "Get In Touch",
  },
];

export default function Body() {
  return (
    <main className="bg-[#1f2321] text-white">
      {/* Intro */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-2 lg:items-start">
          <div className="relative h-[360px] w-full overflow-hidden md:h-[540px]">
            <Image
              src="/images/7.webp"
              alt="Large format artwork"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:pl-16">
            <div className="mb-10 h-[2px] w-full bg-white" />

            <h2 className="max-w-[560px] text-[32px] font-light leading-[1.1] tracking-[-0.04em] md:text-[46px]">
              Through our dedicated curatorial platform, CALIBRO, we source
              and commission bespoke artwork for public spaces, luxury
              hospitality, modern workplaces, and distinctive private homes.
            </h2>

            <p className="mt-12 max-w-[520px] text-[15px] leading-[1.45] text-white/80">
              We connect you with established and emerging artists specialising
              in large-format works and site-specific commissions. From hotel
              lobbies and boardrooms to private galleries, we ensure a seamless
              journey from the initial brief to final installation.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
            <h2 className="text-[28px] font-light uppercase leading-[1] tracking-[-0.04em] md:text-[34px]">
              Commission
              <br />
              Workflow
            </h2>

            <div className="grid gap-8 sm:grid-cols-2">
              {workflow.map((item, index) => (
                <div key={item} className="border-t border-white pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[18px] font-light">{index + 1}</span>
                    <span className="text-[22px]">→</span>
                  </div>

                  <h3 className="mt-6 text-[18px] font-light leading-[1.15]">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[360px] w-full overflow-hidden md:h-[500px]">
            <Image
              src="/images/8.webp"
              alt="Private villa artwork"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Wide Image */}
      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="relative h-[380px] w-full overflow-hidden md:h-[720px]">
            <Image
              src="/images/9.webp"
              alt="Art placement in interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
              Use Cases
            </p>

            <h2 className="max-w-[420px] text-[40px] font-light leading-[1] tracking-[-0.05em] md:text-[58px]">
              Where art
              <br />
              leaves an
              <br />
              impression
            </h2>
          </div>

          <div className="grid gap-x-10 sm:grid-cols-2">
            {useCases.map((item, index) => (
              <div
                key={item}
                className="flex items-start justify-between gap-6 border-t border-white py-6"
              >
                <div className="flex gap-5">
                  <span className="text-[16px] font-light">{index + 1}</span>
                  <h3 className="text-[18px] font-light leading-[1.2]">
                    {item}
                  </h3>
                </div>

                <span className="text-[22px]">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="px-5 pb-20 md:px-10 md:pb-28 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-5 md:grid-cols-3">
          {ctas.map((card) => (
            <div
              key={card.title}
              className="flex min-h-[260px] flex-col justify-between bg-[#363636] p-7 md:min-h-[310px]"
            >
              <h3 className="text-[24px] font-light leading-[1.1] tracking-[-0.03em]">
                {card.title}
              </h3>

              <button className="mt-12 flex w-fit items-center gap-10 border border-white px-4 py-3 text-[11px] font-bold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#1f2321]">
                {card.button}
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}