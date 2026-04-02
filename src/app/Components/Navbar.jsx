"use client";

import Image from "next/image";
import { useState } from "react";
import { FiX } from "react-icons/fi";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollToSection = (href) => {
    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  const handleScrollToTop = () => {
    const section = document.querySelector("#home");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-[1920px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:grid lg:grid-cols-3 lg:items-center">
          {/* Mobile Logo / Desktop Left Nav */}
          <div className="flex items-center lg:justify-start">
            {/* Mobile Logo */}
            <button
              type="button"
              onClick={handleScrollToTop}
              className="cursor-pointer bg-transparent lg:hidden"
              aria-label="Go to top"
            >
              <Image
                src="/images/logo-w.svg"
                alt="Logo"
                width={120}
                height={40}
                priority
                className="bg-transparent object-contain"
              />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:block">
              <div className="flex items-center rounded-md border border-white/10 bg-[rgba(0, 0, 0, 0.45)] backdrop-blur-sm">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleScrollToSection(item.href)}
                    className="cursor-pointer rounded-sm px-5 py-3 text-[12px] font-semibold text-white transition-all duration-300 hover:bg-white/10 active:scale-95"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Desktop Center Logo */}
          <div className="hidden lg:flex justify-center">
            <button
              type="button"
              onClick={handleScrollToTop}
              className="cursor-pointer bg-transparent"
              aria-label="Go to top"
            >
              <Image
                src="/images/logo-w.svg"
                alt="Logo"
                width={160}
                height={50}
                priority
                className="bg-transparent object-contain"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer rounded-xl border border-white/10 bg-[rgba(2, 0, 0, 0.45)] px-5 py-2 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 active:scale-95 lg:hidden"
            >
              {menuOpen ? <FiX size={22} /> : "Menu"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(56,56,56,0.45)] p-4 backdrop-blur-md lg:hidden">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleScrollToSection(item.href)}
                  className="cursor-pointer rounded-xl px-4 py-3 text-left text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 active:scale-95"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}