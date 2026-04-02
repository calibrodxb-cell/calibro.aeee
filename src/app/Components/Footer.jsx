"use client";

import Image from "next/image";
import Link from "next/link";

const policyLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Cookie Preferences", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-[#5f5f5f]">
      <div className="mx-auto max-w-[1920px] px-4 pb-8 pt-12 sm:px-6 lg:px-10 lg:pb-10 lg:pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr_0.9fr_1.6fr] lg:items-end lg:gap-8">
          {/* Left Block */}
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-[13px] font-semibold uppercase tracking-tight text-white sm:text-[15px]">
                A Calibro Company
              </p>

              <div className="w-fit">
                <Image
                  src="/images/logo-w.svg"
                  alt="Calibro"
                  width={260}
                  height={80}
                  className="h-auto w-[180px] sm:w-[220px] lg:w-[250px]"
                />
              </div>
            </div>

            <button
              type="button"
              className="min-h-[48px] rounded-xl bg-[#343434] px-7 py-4 text-[13px] font-semibold uppercase text-white transition-all duration-300 hover:opacity-80 sm:min-h-[56px] sm:px-10"
            >
              More About Us
            </button>

            <div className="pt-1">
              <p className="max-w-[260px] text-[18px] font-semibold leading-[1.02] sm:text-[12px] lg:text-[16px]">
                ©Calibro Holding
                <br />
                All rights reserved
              </p>
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="max-w-[360px] text-[18px] font-semibold leading-[1.02] sm:text-[12px] lg:text-[16px]">
              
              <br />
              
              <br />
              
              <br />
              Dubai, UAE
            </p>
          </div>

          {/* Policy Links */}
          <div className="grid grid-cols-1 gap-1 lg:gap-0">
            {policyLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[18px] font-semibold leading-[1.02] transition-opacity duration-300 hover:opacity-70 sm:text-[12px] lg:text-[16px]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <div className="w-full rounded-[12px] bg-[#343434] p-4 sm:p-5 lg:ml-auto lg:max-w-[540px]">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="max-w-[470px] text-[24px] font-bold uppercase leading-[1.02] text-white sm:text-[28px]">
                    Join Our Community.
                  </h3>

                  <p className="max-w-[500px] text-[22px] font-bold uppercase leading-[1.02] text-[#6f6f6f] sm:text-[26px]">
                    Receive updates from Calibro, from new collaborations to
                    future projects.
                  </p>
                </div>

                <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="email"
                    placeholder="EMAIL"
                    className="h-[52px] w-full rounded-[10px] border border-[#7a7a7a] bg-transparent px-4 text-[14px] font-semibold uppercase text-white outline-none placeholder:text-[#9a9a9a] sm:h-[54px]"
                  />

                  <button
                    type="submit"
                    className="h-[52px] rounded-[10px] bg-black px-6 text-[14px] font-semibold uppercase text-white transition-opacity duration-300 hover:opacity-80 sm:h-[54px] sm:min-w-[134px]"
                  >
                    Submit
                  </button>
                </form>

                <p className="text-[13px] font-semibold leading-[1.15] text-[#8d8d8d] sm:text-[14px]">
                  By subscribing, you agree to our Privacy Policy and provide
                  consent to receive updates from our company. You can withdraw
                  your consent at any time by following the unsubscribe
                  instructions in any email we send to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}