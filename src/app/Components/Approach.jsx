"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, X } from "lucide-react";

const approachItems = [
  {
    title: "Design",
    letter: "D",
    image: "/images/approach-1.webp",
    brand: "CALIBRO",
    category: "DESIGN FURNITURE",
    description:
      "We create custom furniture pieces where form, proportion, and craftsmanship come together to shape interiors with clarity, elegance, and character.",
  },
  {
    title: "Art Advisory",
    letter: "A",
    image: "/images/approach-2.webp",
    brand: "CALIBRO",
    category: "ART ADVISORY",
    description:
      "We champion artworks that go beyond decoration, pieces that spark dialogue and invite reflection. From celebrated masters to emerging talents, each work fosters connection and leaves you inspired.",
  },
];

export default function Approach() {
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section
      id="approach"
      className="scroll-mt-28 overflow-hidden bg-[#f1f1f1] pt-6"
    >
      <div className="rounded-t-[24px] bg-[#2a1708] px-3 py-8 text-white sm:px-3 sm:py-10 lg:px-10 lg:py-12">
        <div className="space-y-8 lg:space-y-10">
          {/* Top Content */}
          <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-40">
            <h2 className="text-[28px] font-black sm:text-[34px]">
              Approach
            </h2>

            <p className="max-w-[900px] text-[18px] font-bold leading-[1.05] sm:text-[22px] lg:text-[24px]">
              At Calibro, Uniqueness defines our approach. Each client has their
              own identity, and every space should embody it fully. Calibro
              designs custom elements that transform interiors into personal
              statements, reflecting individual taste, character, and lifestyle.
            </p>
          </div>

          <p className="text-[12px] font-semibold uppercase text-white/70">
            Design Furniture, Art Advisory
          </p>

          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {approachItems.map((item, index) => {
              const isOpen = activeCard === index;

              return (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-[26px]"
                >
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={900}
                    height={1100}
                    className="h-[420px] w-full object-cover sm:h-[420px] lg:h-[620px]"
                  />

                  {/* Plus Button */}
                  <button
                    onClick={() => toggleCard(index)}
                    className="absolute right-5 top-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-md transition hover:scale-105"
                  >
                    {isOpen ? <X size={20} /> : <Plus size={20} />}
                  </button>

                  {/* Letter */}
                  {!isOpen && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[120px] font-semibold text-white sm:text-[150px] lg:text-[200px]">
                        {item.letter}
                      </span>
                    </div>
                  )}

                  {isOpen && (
                <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center px-4">
  <div
    className="
      w-full
      max-w-sm 
      sm:max-w-sm 
      md:max-w-sm 
      lg:max-w-sm
      rounded-[24px]
      border border-white/20
      bg-white/10
      p-4 sm:p-5 lg:p-5
      text-white
      backdrop-blur-xl
      shadow-2xl
    "
  >
                        
                        {/* Top */}
                        <div className="mb-6 flex items-start justify-between">
                          <div>
                            <p className="text-[12px] font-semibold uppercase text-white/70">
                              {item.brand}
                            </p>
                            <p className="text-[12px] font-semibold uppercase text-white/60">
                              {item.category}
                            </p>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-[36px] font-bold leading-[1] sm:text-[48px] lg:text-[32px]">
                          {item.title.toUpperCase()}
                        </h3>

                        {/* Description */}
                        <p className="mt-6 text-[16px] text-white/80 sm:text-[20px] lg:text-[20px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}