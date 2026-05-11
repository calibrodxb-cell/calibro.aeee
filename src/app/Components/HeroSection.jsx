"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroImages = [
  "/images/hero-img1.webp",
  "/images/hero-img2.webp",
  "/images/hero-img3.webp",
  "/images/hero-img4.webp",
  "/images/hero-img5.webp",
];

export default function HeroSection() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-black md:min-h-[720px]"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`Hero Image ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover transition-all duration-[1600ms] ease-in-out ${
              index === activeImage
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-10 md:px-10 md:pb-16 lg:px-24 lg:pb-20">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {/* Heading */}
          <h1 className="max-w-[900px] text-[64px] font-light leading-[0.92] tracking-[-0.06em] text-white md:text-[110px] lg:text-[120px] xl:text-[150px]">
            Curated
            <br />
            Excellence
          </h1>

          {/* Right Label Desktop */}
          <div className="hidden items-center gap-4 pb-8 text-white lg:flex">
            <span className="text-[18px] font-medium uppercase tracking-tight">
              Artisan
            </span>

            <div className="flex items-center gap-2">
              {heroImages.map((_, index) => (
                <span
                  key={index}
                  className={`h-7 w-[3px] transition-all duration-500 ${
                    index === activeImage ? "bg-white" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Label */}
        <div className="mt-12 flex items-center justify-between text-white lg:hidden">
          <span className="text-[13px] font-medium uppercase tracking-wide">
            Volumen
          </span>

          <div className="flex items-center gap-2">
            {heroImages.map((_, index) => (
              <span
                key={index}
                className={`h-5 w-[2px] transition-all duration-500 ${
                  index === activeImage ? "bg-white" : "bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}