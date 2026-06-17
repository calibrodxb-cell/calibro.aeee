import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const exploreLinks = [
    {
      name: "HOME",
      href: "/",
    },
    {
      name: "OUR FACTORY",
      href: "/our-factory",
    },
    {
      name: "SERVICES",
      href: "/services",
    },
    {
      name: "ABOUT",
      href: "/about",
    },
  ];

  const legalLinks = [
    {
      name: "TERMS & CONDITIONS",
      href: "/terms-conditions",
    },
    {
      name: "PRIVACY POLICY",
      href: "/privacy-policy",
    },
  ];

  return (
    <footer className="bg-[#1f2321] px-5 py-10 text-white md:px-10 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="h-[2px] w-full bg-white" />

        <div className="grid gap-14 py-14 lg:grid-cols-3 lg:gap-20">
          {/* Left Column */}
          <div className="flex flex-col justify-between gap-16">
            <div>
              <h3 className="text-[22px] font-normal leading-[1.4] tracking-normal">
                Newsletter
              </h3>

              <p className="mt-5 max-w-[300px] text-[14px] font-normal leading-[1.4] tracking-normal">
                Subscribe for project highlights, new brand partnerships,
                artist collaborations, and Dubai showroom updates.
              </p>

              <button className="mt-7 flex w-fit items-center gap-10 border border-white px-4 py-3 text-[12px] font-normal leading-[1.4] tracking-normal uppercase transition-all duration-300 hover:bg-white hover:text-[#1f2321]">
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
            <h4 className="mb-6 text-[12px] font-normal leading-[1.4] tracking-normal uppercase">
              Explore
            </h4>

            <ul className="space-y-4">
              {exploreLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[24px] font-normal leading-[1.4] tracking-normal transition-all duration-300 hover:text-white/60"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10">
            {/* Legal */}
            <div>
              <h4 className="mb-6 text-[12px] font-normal leading-[1.4] tracking-normal uppercase">
                Legal
              </h4>

              <ul className="space-y-3">
                {legalLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[14px] font-normal leading-[1.4] tracking-normal transition-all duration-300 hover:text-white/60"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-6 text-[12px] font-normal leading-[1.4] tracking-normal uppercase">
                Contact
              </h4>

              <ul className="space-y-4 text-[14px] font-normal leading-[1.4] tracking-normal">
                <li>
                  <a
                    href="tel:+971586045588"
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
              <h4 className="mb-6 text-[12px] font-normal leading-[1.4] tracking-normal uppercase">
                Follow Us
              </h4>

              <ul className="space-y-3">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-normal leading-[1.4] tracking-normal transition-all duration-300 hover:text-white/60"
                  >
                    Instagram
                  </a>
                </li>

                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-normal leading-[1.4] tracking-normal transition-all duration-300 hover:text-white/60"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-[2px] w-full bg-white" />

        <div className="flex flex-col gap-4 py-8 text-[13px] font-normal leading-[1.4] tracking-normal uppercase md:flex-row md:justify-between">
          <p>
            1, Jebel Ali Industrial Area, 47th Street, Dubai, United Arab Emirates
          </p>

          <p>
            2026 Calibro Trading L.L.C. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}