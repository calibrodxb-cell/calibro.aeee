"use client";

import Image from "next/image";
import About from "./About";
import Approach from "./Approach";
import Services from "./Services";
import Projects from "./Projects";
import Contact from "./Contact";

export default function Body() {
  return (
    <main className="w-full bg-black text-white">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-0 pb-5">
        <section
          id="home"
          className="scroll-mt-28 space-y-6 px-4 pb-6 sm:px-6 lg:px-4 lg:pb-8"
        >
          <div className="pt-6">
            <h1 className="mt-16 max-w-[1400px] text-[14px] font-black leading-[1.05] tracking-[-0.01em] sm:text-[28px] lg:text-[32px]">
              <span className="text-white">FORM. PROPORTION.</span>{" "}
              <span className="text-white/50">
                Calibro delivers bespoke furniture and FF&amp;E solutions where
                every material, proportion and detail is held to the highest
                standard.
              </span>
            </h1>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-2">
            <div className="overflow-hidden rounded-[12px] bg-[#111111]">
              <video
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[620px]"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/video.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="overflow-hidden rounded-[12px] bg-[#111111]">
              <Image
                src="/images/hero-image.webp"
                alt="Interior design material inspiration"
                width={1200}
                height={1200}
                priority
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[620px]"
              />
            </div>
          </div>
        </section>

        <About />
        <Approach />
        <Services />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}