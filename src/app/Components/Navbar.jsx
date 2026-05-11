"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiX, FiMenu } from "react-icons/fi";

const navItems = [
  { label: "OUR FACTORY", href: "/our-factory" },
  { label: "PROJECTS", href: "/projects" },
  { label: "NETWORK", href: "/network" },
  { label: "CALIBRO ART", href: "/calibro-art" },
  { label: "ABOUT", href: "/about" },
];

const mobileInitialOffset = 10;
const desktopInitialOffset = 20;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initialOffset = isDesktop ? desktopInitialOffset : mobileInitialOffset;

  const handleLogoClick = () => {
    setMenuOpen(false);

    if (pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      router.push("/");
    }
  };

  const handleScrollToSection = (href) => {
    setMenuOpen(false);

    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header
      style={{
        top: scrolled ? "0px" : `${initialOffset}px`,
      }}
      className={`fixed left-0 z-50 w-full transition-all duration-500 ease-in-out ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 py-4 md:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="cursor-pointer"
            aria-label="Go to home"
          >
            <Image
              src={scrolled ? "/images/logo-b.png" : "/images/logo-w.png"}
              alt="Trika Arabia Logo"
              width={260}
              height={90}
              priority
              className="h-auto w-[100px] object-contain md:w-[100px] lg:w-[100px]"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-10 lg:flex xl:gap-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleScrollToSection(item.href)}
                className={`cursor-pointer text-[12px] font-bold uppercase tracking-wide transition-all duration-300 xl:text-[12px] ${
                  scrolled
                    ? "text-[#363443] hover:text-[#363443]/60"
                    : "text-white hover:text-white/70"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={() => handleScrollToSection("#contact")}
            className={`hidden cursor-pointer border px-6 py-1 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 lg:block xl:px-6 ${
              scrolled
                ? "border-[#363443] text-[#363443] hover:bg-[#363443] hover:text-white"
                : "border-white/80 text-white hover:bg-white hover:text-[#363443]"
            }`}
          >
            Get In Touch
          </button>

          {/* Mobile Menu */}
          <div className="flex items-center gap-4 lg:hidden">
            <span
              className={`text-[12px] font-medium uppercase tracking-[0.24em] transition-all duration-300 ${
                scrolled ? "text-[#363443]" : "text-white"
              }`}
            >
              Menu
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center border transition-all duration-300 ${
                scrolled
                  ? "border-[#363443] text-[#363443] hover:bg-[#363443] hover:text-white"
                  : "border-white/80 text-white hover:bg-white hover:text-[#363443]"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div
            className={`mt-5 border p-5 backdrop-blur-md transition-all duration-300 lg:hidden ${
              scrolled
                ? "border-[#363443]/20 bg-white"
                : "border-white/20 bg-black/70"
            }`}
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleScrollToSection(item.href)}
                  className={`cursor-pointer text-left text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                    scrolled
                      ? "text-[#363443] hover:text-[#363443]/60"
                      : "text-white hover:text-white/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => handleScrollToSection("#contact")}
                className={`mt-3 cursor-pointer border px-5 py-4 text-left text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                  scrolled
                    ? "border-[#363443] text-[#363443] hover:bg-[#363443] hover:text-white"
                    : "border-white/60 text-white hover:bg-white hover:text-[#363443]"
                }`}
              >
                Get In Touch
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}