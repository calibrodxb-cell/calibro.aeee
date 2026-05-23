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
        className={`absolute right-0 top-0 h-full w-full overflow-y-auto bg-[#f7f7f7] text-[#20294f] transition-transform duration-500 ease-in-out lg:w-[40vw] xl:w-[45vw] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="min-h-full px-6 py-2 md:px-10 lg:px-12 xl:px-14">
          <div className="sticky top-0 z-30 -mx-6 mb-12 flex items-start justify-between gap-6 bg-[#f7f7f7] px-6 py-8 md:-mx-10 md:px-10 lg:-mx-12 lg:px-12 xl:-mx-14 xl:px-14">
            <h2 className="text-[42px] font-light uppercase leading-none tracking-[-0.03em] md:text-[56px] lg:text-[44px] xl:text-[30px]">
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

          <section className="space-y-2">
            <div className="space-y-2">
              <p className="text-[14px] font-medium leading-snug md:text-[14px] lg:text-[18px] xl:text-[16px]">
                Response time:{" "}
                <span className="font-bold">Same business day</span>
              </p>

              <p className="max-w-[760px] text-[21px] font-medium leading-snug md:text-[27px] lg:text-[18px] xl:text-[14px]">
                Whether you are starting a new project, require specification
                support, or wish to visit our showroom, our team is ready to
                assist.
              </p>

              <a
                href={`https://wa.me/971586045588?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-5 bg-[#20294f] px-6 py-7 text-white transition hover:bg-[#172044]"
              >
                <div className="flex items-center gap-6">
                  <span className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-white/20 md:h-[86px] md:w-[86px] lg:h-[60px] lg:w-[60px] xl:h-[50px] xl:w-[50px]">
                    <FaWhatsapp className="text-[38px] md:text-[48px] lg:text-[32px] xl:text-[30px]" />
                  </span>

                  <div>
                    <p className="mb-1 text-[13px] font-medium uppercase tracking-[0.28em] text-white/70 md:text-[18px] lg:text-[12px] xl:text-[12px]">
                      Quickest Response Via WhatsApp
                    </p>
                    <h3 className="max-w-[620px] text-[20px] leading-tight md:text-[26px] lg:text-[17px] xl:text-[14px]">
                      Share your BOQ, moodboard, or project brief, instantly
                    </h3>
                  </div>
                </div>

                <FiArrowRight className="shrink-0 text-[30px] md:text-[30px]" />
              </a>

              <div className="grid gap-x-14 gap-y-7 border-b-[5px] border-[#20294f] pb-9 md:grid-cols-2">
                <InfoBlock
                  title="General Information"
                  value="info@calibro.ae"
                  href="mailto:info@calibro.ae"
                />

                <InfoBlock
                  title="Project Enquiries"
                  value="team@calibro.ae"
                  href="mailto:team@calibro.ae"
                />

                <InfoBlock
                  title="Phone"
                  value="+971 58 604 5588"
                  href="tel:+971586045588"
                />
              </div>

              <div className="h-[250px] w-full overflow-hidden bg-[#e7ecec] md:h-[280px] lg:h-[170px] xl:h-[250px]">
                <iframe
                  title="Showroom Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.8201708054858!2d55.1220575!3d25.006225799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f13d719553d29%3A0xaa29551a50af861!2sCustom%20Furniture%20-%20Bespoke%20Custom%20Furniture%20%7C%20Calibro!5e0!3m2!1sen!2sae!4v1779526907006!5m2!1sen!2sae"
                  className="h-full w-full grayscale"
                  loading="lazy"
                />
              </div>

              <div className="grid gap-8 pb-10 md:grid-cols-2">
                <InfoText
                  title="Showroom"
                  text="1, Jebel Ali Industrial Area, 47th Street, Dubai, United Arab Emirates"
                />

                <InfoText
                  title="Business Hours"
                  text={
                    <>
                      Mon—Sat: 10:00 AM — 6:00 PM
                      <br />
                      Sun: Closed
                    </>
                  }
                />
              </div>
            </div>

            <div className="border-t-[5px] border-[#20294f] pt-20">
              <h3 className="mb-12 text-[28px] font-light uppercase tracking-[-0.02em] md:text-[20px]">
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
                    className="h-[100px] w-full resize-none bg-[#eeeeee] px-6 py-4 text-[14px] text-[#20294f] outline-none placeholder:text-[#aaa]"
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

                    <div className="mt-4 grid grid-cols-4 text-[12px] uppercase tracking-[0.08em] text-[#73798d] md:text-[12px]">
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
                    className="h-[52px] w-full appearance-none bg-[#eeeeee] px-6 text-[14px] text-[#20294f] outline-none"
                  >
                    <option>WhatsApp</option>
                    <option>Email</option>
                    <option>Phone</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#73798d] md:text-[12px]">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={form.privacy}
                    onChange={handleChange}
                    className="h-5 w-5 shrink-0 appearance-none border-2 border-[#73798d] bg-transparent checked:bg-[#20294f]"
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
                  className="w-full bg-[#969daf] py-5 text-center text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#20294f] disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>
        </div>

        <style jsx>{`
          .timeline-range {
            height: 30px;
            appearance: none;
            background: transparent;
            cursor: pointer;
          }

          .timeline-range::-webkit-slider-runnable-track {
            height: 30px;
            background: #eeeeee;
          }

          .timeline-range::-webkit-slider-thumb {
            appearance: none;
            width: 22px;
            height: 22px;
            margin-top: 4px;
            border-radius: 9999px;
            background: #20294f;
          }

          .timeline-range::-moz-range-track {
            height: 30px;
            background: #eeeeee;
          }

          .timeline-range::-moz-range-thumb {
            width: 22px;
            height: 22px;
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
    <label className="mb-3 block text-[12px] uppercase tracking-[0.26em] text-[#73798d] md:text-[12px]">
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
        className="h-[36px] w-full bg-[#eeeeee] px-6 text-[14px] text-[#20294f] outline-none placeholder:text-[#aaa]"
      />
    </div>
  );
}

function InfoBlock({ title, value, href }) {
  return (
    <div>
      <h4 className="mb-2 text-[11px] uppercase tracking-[0.26em] text-[#73798d] md:text-[11px] lg:text-[11px] xl:text-[11px]">
        {title}
      </h4>

      <a
        href={href}
        className="text-[20px] font-medium leading-snug text-[#20294f] md:text-[26px] lg:text-[11px] xl:text-[11px]"
      >
        {value}
      </a>
    </div>
  );
}

function InfoText({ title, text }) {
  return (
    <div>
      <h4 className="mb-2 text-[11px] uppercase tracking-[0.26em] text-[#73798d] md:text-[11px] lg:text-[11px] xl:text-[11px]">
        {title}
      </h4>

      <p className="text-[21px] font-medium leading-snug text-[#20294f] md:text-[26px] lg:text-[11px] xl:text-[11px]">
        {text}
      </p>
    </div>
  );
}