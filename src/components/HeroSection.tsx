"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CTAButton from "./CTAButton";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] bg-cover bg-center bg-no-repeat origin-center"
        style={{
          backgroundImage: "url('/images/hero.webp')",
          top: "-10%",
        }}
      ></div>

      <div className="absolute inset-0 bg-brand-black/50"></div>
      <div className="relative z-10 w-full max-w-11/12 md:max-w-7xl mx-auto h-full flex flex-col items-center md:items-start justify-center gap-10 px-6">
        <h1 className="text-3xl md:text-7xl text-brand-white leading-tight text-center md:text-left">
          Eksplorasi Potensi <br className="hidden md:block" />
          <span className="text-brand-light-red font-extrabold">
            {" "}
            Tanpa Batas{" "}
          </span>
          <br /> Bersama Kami
        </h1>
        <p className="w-full md:max-w-3xl text-brand-light-gray text-sm md:text-lg text-justify leading-relaxed">
          Kami hadir untuk mendobrak batasan digital bisnis Anda. Dengan
          integrasi teknologi mutakhir dan strategi kreatif yang tepat, kami
          membantu Anda menemukan peluang baru yang belum pernah terbayangkan
          sebelumnya. Mari melangkah lebih jauh dan wujudkan visi besar Anda
          menjadi solusi nyata yang berkelanjutan.
        </p>
        <CTAButton text="Mulai Eksplorasi Sekarang" />
      </div>
    </section>
  );
}
