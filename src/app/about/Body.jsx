import Image from "next/image";

const credentials = [
  {
    title: "18+ Years of Experience",
    text: "Navigating customs, shipping strikes, factory delays, specification changes, and site surprises while still delivering on time.",
  },
  {
    title: "A Dubai-Based Team",
    text: "That speaks your language, understands your timeline pressures, and responds within hours, not days.",
  },
  {
    title: "VAT-Registered",
    text: "UAE entity with full customs compliance.",
  },
  {
    title: "Single-Point Accountability",
    text: "One contract, one team, and one point of contact from specification to the handover of keys.",
  },
  {
    title: "Direct European Partnerships",
    text: "Ensuring competitive pricing and maintaining quality control.",
  },
  {
    title: "Proven Track Record",
    text: "Across hospitality, commercial, and high-end residential sectors.",
  },
];

export default function Body() {
  return (
    <main className="bg-[#1f2321] text-white">
      {/* Intro */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="max-w-[1100px] text-[38px] font-light leading-[1.08] tracking-[-0.05em] md:text-[60px] lg:text-[72px]">
            Bringing European art and design excellence — refined for the UAE
            and the wider GCC
          </h2>

          <div className="mt-12 h-[2px] w-full max-w-[760px] bg-white" />

          <p className="mt-10 max-w-[820px] text-[22px] font-light leading-[1.25] tracking-[-0.03em] text-white/90 md:text-[32px]">
            CALIBRO is the Middle Eastern division CALIBRO, a European
            procurement firm with international expertise established in 2008.
            Operating from our European headquarters and Dubai office, we
            coordinate a select network of brands and ateliers, managing the
            entire process—from specification through to installation and
            aftercare—for hospitality, commercial, and residential projects
            throughout the region.
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="mb-10 h-[2px] w-full max-w-[460px] bg-white" />

            <h2 className="text-[36px] font-light leading-none tracking-[-0.04em] md:text-[54px]">
              Approach
            </h2>

            <p className="mt-12 max-w-[520px] text-[16px] leading-[1.45] text-white/80">
              We believe exceptional design requires flawless execution. We
              offer proof, not promises; clarity, not complexity; and
              accountability, not excuses. Above all, we respect the designer’s
              vision. We do not compete with architects and designers—we support
              them. Our role is to manage the intricate logistics, quality
              assurance, and delivery coordination required to transform
              specifications into finished spaces.
            </p>
          </div>

          <div className="relative h-[360px] w-full overflow-hidden md:h-[520px]">
            <Image
              src="/images/3.webp"
              alt="Approach"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-2 lg:items-start">
          <div className="relative order-2 h-[360px] w-full overflow-hidden md:h-[520px] lg:order-1">
            <Image
              src="/images/4.webp"
              alt="Why now"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-10 h-[2px] w-full max-w-[460px] bg-white" />

            <h2 className="text-[36px] font-light leading-none tracking-[-0.04em] md:text-[54px]">
              Why now
            </h2>

            <p className="mt-12 max-w-[520px] text-[16px] leading-[1.45] text-white/80">
              The UAE and the wider GCC demand swift service without shortcuts,
              luxury without compromise, and reliable delivery within a complex
              logistics environment. That is precisely what we have built our
              business to provide.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="px-5 pb-20 md:px-10 md:pb-28 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
              Credentials
            </p>

            <h2 className="max-w-[520px] text-[38px] font-light leading-[1.05] tracking-[-0.05em] md:text-[58px]">
              Design professionals trust CALIBRO
            </h2>

            <div className="relative mt-16 h-[280px] w-full overflow-hidden md:h-[360px] lg:max-w-[420px]">
              <Image
                src="/images/5.webp"
                alt="Credentials"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item) => (
              <div key={item.title} className="border-y border-white py-6">
                <h3 className="text-[22px] font-light leading-[1.1] tracking-[-0.03em]">
                  {item.title}
                </h3>

                <p className="mt-8 text-[13px] leading-[1.45] text-white/80">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}