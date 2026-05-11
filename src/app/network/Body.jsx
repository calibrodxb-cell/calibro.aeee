const brands = [
  "A Rum Fellow",
  "Anour",
  "Artisan",
  "Audo Copenhagen",
  "Diphano",
  "Fjaka",
  "Gazzda",
  "Mullan Lighting",
  "Palet",
  "Paper Collective",
  "Point 1920",
  "Pure White Lines",
  "Tirolo",
  "Volumen",
  "YES Colours",
];

export default function Body() {
  return (
    <main className="bg-[#1f2321] px-5 pb-20 text-white md:px-10 md:pb-28 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="border-t border-white">
          {brands.map((brand) => (
            <a
              key={brand}
              href="#"
              className="group flex items-center justify-between border-b border-white py-6 transition-all duration-300 hover:bg-white hover:px-5 md:py-8"
            >
              <span className="text-[38px] font-light leading-none tracking-[-0.05em] transition-all duration-300 group-hover:text-[#1f2321] md:text-[62px] lg:text-[72px]">
                {brand}
              </span>

              <span className="text-[26px] font-light opacity-0 transition-all duration-300 group-hover:text-[#1f2321] group-hover:opacity-100">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}