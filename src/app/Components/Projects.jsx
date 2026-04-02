"use client";

import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const projects = [
  {
    image: "/images/p01.webp",
    brand: "PROJECTS",
    title: "PENTHOUSE PRIMO TOWER, DOWNTOWN",
    description:
      "Located in one of Dubai’s most prestigious addresses, this exceptional residence reflects a seamless blend of luxury, comfort, and contemporary design. Fully furnished with bespoke pieces and thoughtfully tailored layouts, the space is curated in warm, refined tones that enhance both elegance and functionality",
      thumb: "/images/p01.webp",
   
  },
  {
    image: "/images/p02.webp",
    brand: "PROJECTS",
    title: "APARTMENT 23, MARINA TOWER",
    description:
      "In Dubai’s Marina district, 23 Marina Tower is a premier address. This fully furnished apartment combines bespoke furniture, tailored layouts, and warm, refined tones to create an elegant, comfortable, and stylish living space.",
    
    thumb: "/images/p02.webp",
  },
  {
    image: "/images/p03.webp",
    brand: "PROJECTS",
    title: "ZEN TOWER ROOF DUPLEX APTT.",
    description:
     "This Zen Tower roof duplex project goes beyond interior design, offering an emotional experience of balance and serenity. The furniture creates a calm, grounding atmosphere that supports relaxation and clarity. Eachpiece is selected for its comfort, functionality, and timeless elegance.",
   
    thumb: "/images/p03.webp",
  },
  {
    image: "/images/p04.webp",
    brand: "PROJECTS",
    title: "THE EXECUTIVE TOWER",
    description:
      "A contemporary residence in Dubai’s Business Bay, featuring interiors thoughtfully furnished with elegant, high-quality pieces that enhance the overall sense of modern luxury and refined lifestyle.",
    
    thumb: "/images/p04.webp",
  },
  {
    image: "/images/p05.webp",
    brand: "PROJECTS",
    title: "ELITE TOWER MARINA",
    description:
      "This residence features a curated furniture collection that blends contemporary style with everyday comfort. Each piece is carefully selected to complement the interiors, creating a harmonious and inviting space that reflects modern living in Dubai.",
   
    thumb: "/images/p05.webp",
  },
  {
    image: "/images/p06.webp",
    brand: "PROJECTS",
    title: "AL FATTAN MARINA",
    description:
      "A signature project in one of Dubai’s most exclusive locations, showcasing luxurious finishes, bespoke design, carefully selected high-end furniture, and an elegant living experience offering a lifestyle that reflects the true meaning of modern luxury.",
    thumb: "/images/p06.webp",
  },
  
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-28 rounded-t-[24px] bg-[#efefef] px-5 py-8 text-black sm:px-8 sm:py-10 lg:px-10 lg:py-12"
    >
      <div className="space-y-8 lg:space-y-10">
        <h2 className="text-[28px] font-bold leading-none sm:text-[34px]">
          Selected Projects
        </h2>

        <div className="-mx-6">
          <Swiper
            modules={[Pagination]}
            spaceBetween={18}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            className="project-main-swiper w-full"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="relative overflow-hidden rounded-[24px] bg-[#d9d9d9]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1800}
                    height={1000}
                    className="h-[260px] w-full object-cover sm:h-[420px] lg:h-[1020px]"
                    priority={index === 0}
                  />

                  {/* Transparent Info Card */}
                  <div className="absolute bottom-4 right-4 z-20 max-w-[85%] rounded-[18px] border border-white/10 bg-black/25 p-3 text-white backdrop-blur-md sm:bottom-5 sm:right-5 sm:max-w-[380px] sm:p-4 lg:bottom-6 lg:right-6 lg:max-w-[420px] lg:p-5">
                    <div className="flex items-start gap-3">
                      <div className="hidden overflow-hidden rounded-[10px] sm:block">
                        <Image
                          src={project.thumb}
                          alt={project.title}
                          width={90}
                          height={90}
                          className="h-[78px] w-[78px] object-cover lg:h-[88px] lg:w-[88px]"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-[10px] font-semibold uppercase leading-none text-white/75 sm:text-[11px]">
                          {project.brand}
                        </p>

                        <h3 className="mt-1 text-[16px] font-bold leading-none sm:text-[18px]">
                          {project.title}
                        </h3>

                        <p className="mt-2 whitespace-pre-line text-[12px] font-semibold leading-[1.08] text-white/90 sm:text-[13px] lg:text-[14px]">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style jsx global>{`
          .project-main-swiper {
            padding-bottom: 0;
          }

          .project-main-swiper .swiper-pagination {
            position: absolute;
            left: 50% !important;
            bottom: 16px !important;
            transform: translateX(-50%);
            width: auto !important;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 10px 18px;
            border-radius: 9999px;
            background: rgba(120, 104, 90, 0.8);
            backdrop-filter: blur(10px);
            z-index: 30;
          }

          .project-main-swiper .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            margin: 0 !important;
            background: rgba(255, 255, 255, 0.85);
            opacity: 1;
          }

          .project-main-swiper .swiper-pagination-bullet-active {
            background: #111111;
          }

          @media (max-width: 640px) {
            .project-main-swiper .swiper-pagination {
              bottom: 12px !important;
              gap: 8px;
              padding: 8px 14px;
            }

            .project-main-swiper .swiper-pagination-bullet {
              width: 4px;
              height: 4px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}