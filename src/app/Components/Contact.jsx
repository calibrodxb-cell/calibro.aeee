"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 bg-[#f1f1f1] pt-6 text-white"
    >
      <div className="rounded-t-[32px] bg-black px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        {/* Header */}
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-[28px] font-black leading-none sm:text-[34px]">
            Get in Touch
          </h2>

          <p className="mt-3 text-[16px] font-black text-white/40 sm:text-[18px] lg:text-[27px]">
            We welcome inquiries and will be in contact soon.
          </p>
        </div>

        {/* Smaller Centered Form */}
        <div className="mx-auto mt-10 w-full max-w-[640px]">
          <form className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="FIRST NAME"
              className="h-14 rounded-[10px] border border-white/10 bg-transparent px-4 text-sm font-medium uppercase tracking-[0.02em] text-white placeholder:text-white/40 outline-none"
            />
            <input
              type="text"
              placeholder="LAST NAME"
              className="h-14 rounded-[10px] border border-white/10 bg-transparent px-4 text-sm font-medium uppercase tracking-[0.02em] text-white placeholder:text-white/40 outline-none"
            />

            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="h-14 rounded-[10px] border border-white/10 bg-transparent px-4 text-sm font-medium uppercase tracking-[0.02em] text-white placeholder:text-white/40 outline-none sm:col-span-2"
            />

            <input
              type="text"
              placeholder="PHONE NUMBER"
              className="h-14 rounded-[10px] border border-white/10 bg-transparent px-4 text-sm font-medium uppercase tracking-[0.02em] text-white placeholder:text-white/40 outline-none"
            />

            <div className="relative">
              <input
                type="text"
                placeholder="SELECT RECIPIENT"
                className="h-14 w-full rounded-[10px] border border-white/10 bg-transparent px-4 pr-12 text-sm font-medium uppercase tracking-[0.02em] text-white placeholder:text-white/40 outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-white/50">
                +
              </span>
            </div>

            <div className="relative sm:col-span-2">
              <input
                type="text"
                placeholder="TYPE OF CUSTOMER"
                className="h-14 w-full rounded-[10px] border border-white/10 bg-transparent px-4 pr-12 text-sm font-medium uppercase tracking-[0.02em] text-white placeholder:text-white/40 outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-white/50">
                +
              </span>
            </div>

            <input
              type="text"
              placeholder="COMPANY NAME"
              className="h-14 rounded-[10px] border border-white/10 bg-transparent px-4 text-sm font-medium uppercase tracking-[0.02em] text-white placeholder:text-white/40 outline-none sm:col-span-2"
            />

            <div className="relative sm:col-span-2">
              <input
                type="text"
                placeholder="SUBJECT"
                className="h-14 w-full rounded-[10px] border border-white/10 bg-transparent px-4 pr-12 text-sm font-medium uppercase tracking-[0.02em] text-white placeholder:text-white/40 outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-white/50">
                +
              </span>
            </div>

            <textarea
              placeholder="MESSAGE"
              rows={6}
              className="rounded-[10px] border border-white/10 bg-transparent px-4 py-4 text-sm font-medium uppercase tracking-[0.02em] text-white placeholder:text-white/40 outline-none sm:col-span-2"
            />
          </form>
        </div>
      </div>
    </section>
  );
}