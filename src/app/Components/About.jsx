"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const aboutImages = [
  "/images/about-1.webp",
  "/images/about-2.webp",
  "/images/about-3.webp",
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-28 rounded-t-[36px] bg-[#f1f1f1] text-black"
    >
      <div className="space-y-8 px-5 py-8 sm:px-8 sm:py-10 lg:space-y-12 lg:px-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
          <h2 className="text-[28px] font-black leading-none sm:text-[34px]">
            About
          </h2>

          <p className="max-w-[1200px] text-[18px] font-bold leading-[1.05] sm:text-[22px] lg:text-[32px]">
            1234567890
            deliver refined furniture solutions where craftsmanship,
            materiality, and detail define every piece. From bespoke furniture
            to complete FF&E concepts, and tailored solutions with lasting
            value.
          </p>
        </div>

        <div className="-mx-3 sm:-mx-6 lg:-mx-8">
  <div className="overflow-hidden rounded-[12px]">
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      loop={true}
      speed={1200}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className="w-full"
    >
      {aboutImages.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={`About image ${index + 1}`}
            width={1800}
            height={900}
            className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[720px]"
            priority={index === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>
      </div>
    </section>
  );
}