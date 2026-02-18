"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";

const clients = [
  <FaWhatsapp className="text-5xl" />,
  <FaFacebook className="text-5xl" />,
  <FaInstagram className="text-5xl" />,
  <FaTiktok className="text-5xl" />,
];

export default function ClientLogos() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const totalWidth = slider.scrollWidth;

    const tl = gsap.to(slider, {
      x: `-${totalWidth / 2}`,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full bg-white py-16 md:py-24 border-t border-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h4 className="text-xs md:text-sm text-center md:text-left font-bold uppercase tracking-[0.3em] text-brand-light-red">
          Dipercaya Oleh
        </h4>
      </div>

      <div className="relative flex overflow-hidden">
        <div
          ref={sliderRef}
          className="flex whitespace-nowrap items-center gap-5 md:gap-32"
        >
          {[...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <div className="h-12 w-20 flex items-center justify-center text-gray-400">
                {client}
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  );
}
