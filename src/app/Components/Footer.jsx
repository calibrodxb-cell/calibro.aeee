import Image from "next/image";

export default function Footer() {
  const exploreLinks = [
    "Home",
    "Our Factory",
    "Projects",
    "Calibro Art",
    "About",
  ];

  const legalLinks = [
    "Terms & Conditions",
    "Privacy Policy",
  ];

  return (
    <footer className="bg-[#1f2321] px-5 py-10 text-white md:px-10 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="h-[2px] w-full bg-white" />

        <div className="grid gap-14 py-14 lg:grid-cols-3 lg:gap-20">
          {/* Left Column */}
          <div className="flex flex-col justify-between gap-16">
            <div>
              <h3 className="text-[22px] font-light">Newsletter</h3>

              <p className="mt-5 max-w-[300px] text-[14px] font-semibold leading-[1.15]">
                Subscribe for project highlights, new brand partnerships,
                artist collaborations, and Dubai showroom updates.
              </p>

              <button className="mt-7 flex w-fit items-center gap-10 border border-white px-4 py-3 text-[12px] font-bold uppercase transition-all duration-300 hover:bg-white hover:text-[#1f2321]">
                Join our newsletter <span>→</span>
              </button>
            </div>

            <Image
              src="/images/logo-w.png"
              alt="Calibro Logo"
              width={240}
              height={80}
              className="h-auto w-[160px] object-contain md:w-[210px]"
            />
          </div>

          {/* Middle Column */}
          <div className="lg:pl-10">
            <h4 className="mb-6 text-[12px] font-bold uppercase">
              Explore
            </h4>

            <ul className="space-y-4">
              {exploreLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    className="text-[24px] font-light transition-all duration-300 hover:text-white/60"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10">
            {/* Legal */}
            <div>
              <h4 className="mb-6 text-[12px] font-bold uppercase">
                Legal
              </h4>

              <ul className="space-y-3">
                {legalLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[14px] font-semibold transition-all duration-300 hover:text-white/60"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-6 text-[12px] font-bold uppercase">
                Contact
              </h4>

              <ul className="space-y-4 text-[14px] font-semibold">
                <li>
                  <a
                    href="tel:+971501234567"
                    className="transition-all duration-300 hover:text-white/60"
                  >
                    +971 58 604 5588
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:info@calibro.ae"
                    className="transition-all duration-300 hover:text-white/60"
                  >
                    info@calibro.ae
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="mb-6 text-[12px] font-bold uppercase">
                Follow Us
              </h4>

              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-[14px] font-semibold transition-all duration-300 hover:text-white/60"
                  >
                    Instagram
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-[14px] font-semibold transition-all duration-300 hover:text-white/60"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-[2px] w-full bg-white" />

        <div className="flex flex-col gap-4 py-8 text-[13px] font-semibold uppercase md:flex-row md:justify-between">
          <p>1, Jebel Ali Industrial Area, 47th Street, Dubai, United Arab Emirates</p>
          <p>2026 Calibro Trading L.L.C. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}