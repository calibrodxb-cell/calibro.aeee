"use client";

import Image from "next/image";
import { useState } from "react";
import GetInTouch from "@/app/Components/GetInTouch";

const points = [
  "We source only the highest quality materials and parts from trusted European manufacturers great furniture starts with quality materials.",
  "Our expert team assembles every piece locally with precision and care, combining global standards with regional craftsmanship.",
  "We prioritize speed and efficiency, ensuring your furniture moves quickly from assembly to delivery without unnecessary delays.",
];

export default function Body() {
  const [contactOpen, setContactOpen] = useState(false);

  const whatsappText = encodeURIComponent(
    "Hello Calibro team, I would like to share my BOQ, moodboard, or project brief."
  );

  return (
    <>
      <section className="w-full bg-[#1f2321] px-5 py-10 text-white md:px-10 md:py-10 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          {/* Main Heading */}
          <h2 className="max-w-[1100px] text-[20px] font-light leading-[1.25] tracking-normal md:text-[36px] lg:text-[50px]">
            Calibro is a custom furniture factory partner for architects, interior designers, developers, and private clients in the UAE and throughout the GCC. Where timelines are respected, quality is assured, pricing remains precise, and every project is backed by warranty.
          </h2>

          {/* Content Grid */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.8fr] lg:items-center">
            {/* Left Content */}
            <div>
              <div className="mb-9 h-[2px] w-full max-w-[580px] bg-white" />

              <p className="max-w-[560px] text-[24px] font-light leading-[1.18] tracking-normal md:text-[28px]">
               We manufacture and deliver from our dedicated furniture factory including custommade pieces, bespoke joinery, handcrafted tables, statement seating, upholstery, storage
               solutions, and large-scale production.</p>

              {/* Points */}
              <div className="mt-20 grid gap-8 md:grid-cols-3 md:gap-10">
                {points.map((item, index) => (
                  <div key={index}>
                    <p className="min-h-[88px] text-[15px] leading-[1.15] md:text-[14px] lg:text-[15px]">
                      {item}
                    </p>

                    <div className="mt-8 h-[2px] w-full bg-white" />
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative flex w-full items-start justify-center">
              <Image
                src="/images/about-us.png"
                alt="Curated furniture procurement"
                width={900}
                height={1200}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>

          {/* CTA Cards */}
          <div className="mt-24 grid gap-5 md:grid-cols-2">
            {/* WhatsApp CTA */}
            <div className="flex min-h-[260px] flex-col justify-between bg-[#363636] p-8 md:min-h-[300px] lg:p-10">
              <h3 className="max-w-[470px] text-[25px] font-light leading-[1.15] tracking-[-0.02em] md:text-[30px]">
                Share your BOQ moodboard via Whatsapp
              </h3>

              <a
                href={`https://wa.me/971586045588?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 flex w-fit items-center gap-20 border border-white px-5 py-3 text-[12px] font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#363636]"
              >
                Share
                <span>→</span>
              </a>
            </div>

            {/* Showroom CTA */}
            <div className="flex min-h-[260px] flex-col justify-between bg-[#363636] p-8 md:min-h-[300px] lg:p-10">
              <h3 className="max-w-[470px] text-[25px] font-light leading-[1.15] tracking-[-0.02em] md:text-[30px]">
                Book your Dubai Showroom visit
              </h3>

              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="mt-12 flex w-fit items-center gap-16 border border-white px-5 py-3 text-[12px] font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#363636]"
              >
                Get In Touch
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <GetInTouch open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}