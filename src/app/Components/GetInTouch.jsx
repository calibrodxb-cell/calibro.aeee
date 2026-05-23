"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function GetInTouch({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    project: "",
    description: "",
    timeline: "1-3 MO",
    contactMethod: "WhatsApp",
    privacy: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.privacy) {
      alert("Please agree with the privacy policy.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      alert("Message sent successfully.");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        project: "",
        description: "",
        timeline: "1-3 MO",
        contactMethod: "WhatsApp",
        privacy: false,
      });
    } else {
      alert("Something went wrong.");
    }
  };

  const whatsappText = encodeURIComponent(
    "Hello TRIKA ARABIA team, I would like to connect with you."
  );

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-all duration-500 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close contact form"
        className="absolute inset-0 hidden bg-black/75 backdrop-blur-sm lg:block"
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full overflow-y-auto bg-[#f7f7f7] text-[#20294f] transition-transform duration-500 ease-in-out lg:w-[52vw] xl:w-[48vw] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="min-h-full px-6 py-8 md:px-10 lg:px-12 xl:px-14">
          <div className="sticky top-0 z-30 -mx-6 mb-12 flex items-start justify-between gap-6 bg-[#f7f7f7] px-6 py-8 md:-mx-10 md:px-10 lg:-mx-12 lg:px-12 xl:-mx-14 xl:px-14">
            <h2 className="text-[42px] font-light uppercase leading-none tracking-[-0.03em] md:text-[56px] lg:text-[44px] xl:text-[56px]">
              Get In Touch
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="pt-2 text-[12px] font-medium uppercase tracking-[0.32em] text-[#697085] transition hover:text-[#20294f]"
            >
              Close
            </button>
          </div>

          <section className="space-y-8">
            <div className="space-y-8">
              <p className="text-[24px] font-medium leading-snug md:text-[28px] lg:text-[22px] xl:text-[28px]">
                Response time:{" "}
                <span className="font-bold">Same business day</span>
              </p>

              <p className="max-w-[760px] text-[21px] font-medium leading-snug md:text-[27px] lg:text-[18px] xl:text-[24px]">
                Whether you are starting a new project, require specification
                support, or wish to visit our showroom, our team is ready to
                assist.
              </p>

              <a
                href={`https://wa.me/971508509900?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-5 bg-[#20294f] px-6 py-7 text-white transition hover:bg-[#172044]"
              >
                <div className="flex items-center gap-6">
                  <span className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-white/20 md:h-[86px] md:w-[86px] lg:h-[60px] lg:w-[60px] xl:h-[76px] xl:w-[76px]">
                    <FaWhatsapp className="text-[38px] md:text-[48px] lg:text-[32px] xl:text-[42px]" />
                  </span>

                  <div>
                    <p className="mb-1 text-[13px] font-medium uppercase tracking-[0.28em] text-white/70 md:text-[18px] lg:text-[12px] xl:text-[16px]">
                      Quickest Response Via WhatsApp
                    </p>
                    <h3 className="max-w-[620px] text-[20px] font-semibold leading-tight md:text-[26px] lg:text-[17px] xl:text-[25px]">
                      Share your BOQ, moodboard, or project brief, instantly
                    </h3>
                  </div>
                </div>

                <FiArrowRight className="shrink-0 text-[38px] md:text-[48px]" />
              </a>

              <div className="grid gap-x-14 gap-y-7 border-b-[5px] border-[#20294f] pb-9 md:grid-cols-2">
                <InfoBlock
                  title="General Information"
                  value="info@trikaarabia.com"
                  href="mailto:info@trikaarabia.com"
                />

                <InfoBlock
                  title="Project Enquiries"
                  value="team@trikaarabia.com"
                  href="mailto:team@trikaarabia.com"
                />

                <InfoBlock
                  title="Phone"
                  value="+971 50 850 9900"
                  href="tel:+971508509900"
                />
              </div>

              <div className="h-[250px] w-full overflow-hidden bg-[#e7ecec] md:h-[280px] lg:h-[170px] xl:h-[250px]">
                <iframe
                  title="Showroom Location"
                  src="https://www.google.com/maps?q=Nassco%2017%20Building%2C%20Umm%20Suqeim%20Street%2C%20Al%20Barsha%202nd%2C%20Dubai%2C%20UAE&output=embed"
                  className="h-full w-full grayscale"
                  loading="lazy"
                />
              </div>

              <div className="grid gap-8 pb-10 md:grid-cols-2">
                <InfoText
                  title="Showroom"
                  text="Nassco 17 Building, Umm Suqeim Street, Al Barsha 2nd, Dubai, UAE"
                />

                <InfoText
                  title="Business Hours"
                  text={
                    <>
                      Mon—Fri: 10:00 AM — 6:00 PM
                      <br />
                      Sat & Sun: Closed
                    </>
                  }
                />
              </div>
            </div>

            <div className="border-t-[5px] border-[#20294f] pt-20">
              <h3 className="mb-12 text-[28px] font-light uppercase tracking-[-0.02em] md:text-[36px]">
                Send A Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-9">
                <Input
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Phone (Optional)"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <Input
                  label="Company / Studio Name"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                />

                <Input
                  label="Project Type & Location"
                  name="project"
                  placeholder="e.g. Hotel in Dubai"
                  value={form.project}
                  onChange={handleChange}
                  required
                />

                <div>
                  <Label>Brief Description</Label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="h-[130px] w-full resize-none bg-[#eeeeee] px-6 py-4 text-[18px] outline-none placeholder:text-[#aaa]"
                  />
                </div>

                <div>
                  <Label>Project Timeline</Label>

                  <div className="relative pt-4">
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="1"
                      value={
                        ["IMMEDIATE", "1-3 MO", "3-6 MO", "6+ MO"].indexOf(
                          form.timeline
                        )
                      }
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          timeline: [
                            "IMMEDIATE",
                            "1-3 MO",
                            "3-6 MO",
                            "6+ MO",
                          ][Number(e.target.value)],
                        }))
                      }
                      className="timeline-range w-full"
                    />

                    <div className="mt-4 grid grid-cols-4 text-[18px] uppercase tracking-[0.08em] text-[#73798d] md:text-[22px]">
                      <span>Immediate</span>
                      <span className="text-center">1-3 MO</span>
                      <span className="text-center">3-6 MO</span>
                      <span className="text-right">6+ MO</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Preferred Contact Method</Label>

                  <select
                    name="contactMethod"
                    value={form.contactMethod}
                    onChange={handleChange}
                    className="h-[72px] w-full appearance-none bg-[#eeeeee] px-6 text-[20px] text-[#20294f] outline-none"
                  >
                    <option>WhatsApp</option>
                    <option>Email</option>
                    <option>Phone</option>
                  </select>
                </div>

                <label className="flex items-center gap-4 text-[16px] font-semibold uppercase tracking-[0.16em] text-[#73798d] md:text-[20px]">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={form.privacy}
                    onChange={handleChange}
                    className="h-7 w-7 appearance-none border-2 border-[#73798d] bg-transparent checked:bg-[#20294f]"
                  />
                  <span>
                    I agree with the{" "}
                    <a
                      href="/privacy-policy"
                      className="text-[#20294f] underline underline-offset-4"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#969daf] py-7 text-center text-[18px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#20294f] disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>
        </div>

        <style jsx>{`
          .timeline-range {
            height: 38px;
            appearance: none;
            background: transparent;
            cursor: pointer;
          }

          .timeline-range::-webkit-slider-runnable-track {
            height: 38px;
            background: #eeeeee;
          }

          .timeline-range::-webkit-slider-thumb {
            appearance: none;
            width: 34px;
            height: 34px;
            margin-top: 2px;
            border-radius: 9999px;
            background: #20294f;
          }

          .timeline-range::-moz-range-track {
            height: 38px;
            background: #eeeeee;
          }

          .timeline-range::-moz-range-thumb {
            width: 34px;
            height: 34px;
            border: 0;
            border-radius: 9999px;
            background: #20294f;
          }
        `}</style>
      </aside>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="mb-3 block text-[16px] font-semibold uppercase tracking-[0.26em] text-[#73798d] md:text-[20px]">
      {children}
    </label>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        {...props}
        className="h-[72px] w-full bg-[#eeeeee] px-6 text-[18px] text-[#20294f] outline-none placeholder:text-[#aaa]"
      />
    </div>
  );
}

function InfoBlock({ title, value, href }) {
  return (
    <div>
      <h4 className="mb-2 text-[16px] font-semibold uppercase tracking-[0.26em] text-[#73798d] md:text-[20px] lg:text-[14px] xl:text-[18px]">
        {title}
      </h4>
      <a
        href={href}
        className="text-[20px] font-medium leading-snug text-[#20294f] md:text-[26px] lg:text-[17px] xl:text-[24px]"
      >
        {value}
      </a>
    </div>
  );
}

function InfoText({ title, text }) {
  return (
    <div>
      <h4 className="mb-2 text-[16px] font-semibold uppercase tracking-[0.26em] text-[#73798d] md:text-[20px] lg:text-[14px] xl:text-[18px]">
        {title}
      </h4>
      <p className="text-[21px] font-medium leading-snug text-[#20294f] md:text-[26px] lg:text-[18px] xl:text-[24px]">
        {text}
      </p>
    </div>
  );
}