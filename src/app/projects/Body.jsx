import Image from "next/image";
import Link from "next/link";

const filters = ["All", "Hospitality", "Residential", "Commercial"];

const projects = [
  {
    title: "Hotel Maestral Bluesun",
    category: "Hospitality",
    image: "/images/11.webp",
    href: "/primo-penthouse",
  },
  {
    title: "Private Villa Palm Jumeirah",
    category: "Residential",
    image: "/images/2.webp",
    href: "/primo-penthouse",
  },
  {
    title: "Corporate Office DIFC",
    category: "Commercial",
    image: "/images/3.webp",
    href: "/primo-penthouse",
  },
  {
    title: "Luxury Beach Resort",
    category: "Hospitality",
    image: "/images/4.webp",
    href: "/primo-penthouse",
  },
  {
    title: "Penthouse Apartment",
    category: "Residential",
    image: "/images/5.webp",
    href: "/primo-penthouse",
  },
];

export default function Body() {
  return (
    <main className="bg-[#1f2321] text-white">
      {/* Filters */}
      <section className="px-5 py-10 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-6">
          {filters.map((item, index) => (
            <button
              key={item}
              className={`text-[14px] uppercase tracking-[0.15em] transition ${
                index === 0 ? "text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Project */}
      <section className="px-5 pb-16 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href="/primo-penthouse"
            className="group relative block h-[420px] w-full overflow-hidden rounded-md md:h-[540px]"
          >
            <Image
              src="/images/penth1.webp"
              alt="Signature Luxury Resort"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-6 left-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/70">
                Hospitality
              </p>
              <h2 className="mt-2 text-[28px] font-semibold md:text-[42px]">
                Signature Luxury Resort
              </h2>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid Projects */}
      <section className="px-5 pb-20 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group relative block h-[320px] overflow-hidden md:h-[420px]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/50" />

              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">
                  {project.category}
                </p>

                <h3 className="mt-2 text-[20px] font-light leading-[1.2]">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-5 pb-20 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-2">
          <div className="bg-[#2a2e2c] p-8">
            <h3 className="text-[24px] font-light">Have a project in mind?</h3>

            <Link
              href="/contact"
              className="mt-8 inline-block border border-white px-5 py-3 text-[12px] uppercase transition hover:bg-white hover:text-[#1f2321]"
            >
              Get in touch →
            </Link>
          </div>

          <div className="bg-[#2a2e2c] p-8">
            <h3 className="text-[24px] font-light">
              Explore our procurement process
            </h3>

            <Link
              href="/procurement"
              className="mt-8 inline-block border border-white px-5 py-3 text-[12px] uppercase transition hover:bg-white hover:text-[#1f2321]"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}