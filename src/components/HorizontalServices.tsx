"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ServiceCard from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalServices() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { x: 0 },
      {
        x: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "1000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      },
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section id="services" className="overflow-hidden">
      <div className="w-full h-full bg-radial from-brand-light-red to-brand-dark-red rounded-t-[5rem]">
        <div ref={triggerRef}>
          <h1 className="absolute top-40 left-1/2 -translate-x-1/2 z-10 text-5xl text-brand-white font-bold">
            Layanan Kami
          </h1>
          <div
            ref={sectionRef}
            className="flex flex-row w-[400vw] h-screen relative"
          >
            <ServiceCard title="Menemukan Jalan" image="/searching.webp">
              Kami menganalisis ekosistem bisnis Anda untuk menemukan celah
              inovasi yang belum terjamah. Bukan sekadar rencana, tapi peta
              jalan strategis untuk dominasi pasar.
            </ServiceCard>
            <ServiceCard title="Membangun Identitas" image="/designing.webp">
              Kami menciptakan wajah digital yang berkarakter. Dari desain UI/UX
              yang intuitif hingga identitas brand yang kuat, kami memastikan
              Anda tampil Berbeda di mata audiens.
            </ServiceCard>
            <ServiceCard title="Eksekusi Presisi" image="/development.webp">
              Mengubah ide kompleks menjadi infrastruktur digital yang tangguh.
              Kami membangun website dan aplikasi yang cepat, aman, dan siap
              tumbuh bersama skala bisnis Anda.
            </ServiceCard>
            <ServiceCard title="Akselerasi Dampak" image="/optimization.webp">
              Eksplorasi tidak berhenti setelah peluncuran. Kami mengoptimalkan
              performa digital Anda melalui data dan teknologi untuk memastikan
              hasil yang nyata dan berkelanjutan.
            </ServiceCard>
          </div>
        </div>
        <div className="h-25"></div>
      </div>
    </section>
  );
}
