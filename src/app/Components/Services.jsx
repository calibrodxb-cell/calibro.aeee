"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const services = [
  {
    title: "1. Preliminary Project analysis",
    description:
      "In the preliminary phase, Calibro engages in close collaboration with architects, designers, and clients, meticulously aligning every aspect of the project to ensure objectives and expectations are fully realized.",
    image: "/images/service-1.webp",
  },
  {
    title: "2. Cost Engineering",
    description:
      "Thorough project planning, preparation of preliminary drawings, and accurate cost estimation are just a few examples of how Calibro supports clients in adhering to both timelines and budgets.",
    image: "/images/service-2.webp",
  },
  {
    title: "3. Shop-drawings and prototypes",
    description:
      "Every element, detail, and space is carefully reviewed and approved before execution and installation.",
    image: "/images/service-3.webp",
  },
  {
    title: "4. Production and quality control",
    description:
      "Calibro provides exclusive solutions crafted by skilled artisans combining advanced technologies with expertise.",
    image: "/images/service-4.webp",
  },
  {
    title: "5. FF&E Supply",
    description:
      "We source premium products and furnishings tailored to complement any design style.",
    image: "/images/service-5.webp",
  },
  {
    title: "6. Logistics",
    description:
      "Carefully managed logistics ensuring timely delivery and perfect condition worldwide.",
    image: "/images/service-6.webp",
  },
  {
    title: "7. Installation",
    description:
      "Expert teams ensure flawless execution and installation to the highest standards.",
    image: "/images/service-7.webp",
  },
];

export default function Services() {
  const handleScrollToContact = () => {
    const section = document.querySelector("#contact");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="services"
      className="scroll-mt-28 overflow-hidden bg-gradient-to-b from-[#2a1708] to-[#050505] pt-6"
    >
      <div className="rounded-t-[24px] bg-[#050505] px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="space-y-8 lg:space-y-10">
          
          {/* Top Content */}
          <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
            <h2 className="text-[28px] font-semibold sm:text-[34px]">
              Services
            </h2>

            <p className="max-w-[1200px] text-[18px] font-semibold leading-[1.05] text-white sm:text-[22px] lg:text-[32px]">
              We are with you every step of the process, guiding consultation,
              concept development, selection, and procurement, enriched by access
              to renowned brands and thoughtful curation.
            </p>
          </div>

          {/* Swiper */}
          <Swiper
            spaceBetween={16}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {services.map((service) => (
              <SwiperSlide key={service.title}>
                <div className="flex h-full min-h-[520px] flex-col rounded-[26px] bg-white/5 p-4 backdrop-blur-sm sm:min-h-[580px] sm:p-5 lg:min-h-[600px]">
                  
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-[22px] font-semibold leading-tight sm:text-[24px] lg:text-[26px]">
                      {service.title}
                    </h3>

                    <p className="mt-6 text-[14px] text-white/40 sm:text-[16px] lg:text-[18px]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[18px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={900}
                      height={700}
                      className="h-[200px] w-full object-cover sm:h-[220px] lg:h-[240px]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Contact Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleScrollToContact}
              className="group flex w-full max-w-[320px] items-center justify-between rounded-full bg-white/10 px-6 py-2 backdrop-blur-md transition hover:scale-[1.02]"
            >
              <span className="text-[13px] font-semibold uppercase text-white">
                Contact Us
              </span>

              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6b0814] transition group-hover:rotate-90">
                <Plus size={26} />
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}