"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalServices() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          clipPath: "inset(0% 2% 0% 2% round 4rem 4rem 0rem 0rem)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 5rem 5rem 0rem 0rem)",
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        },
      );

      gsap.to(sectionRef.current, {
        x: "-300vw",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section id="services" className="overflow-hidden">
      <div
        ref={containerRef}
        className="w-full bg-radial from-brand-light-red to-brand-dark-red"
        style={{ willChange: isMobile ? "auto" : "clip-path" }}
      >
        <div ref={triggerRef} className="relative w-full">
          <h1 className="absolute md:static top-10 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:text-center z-10 text-3xl md:text-5xl text-brand-white font-bold whitespace-nowrap pt-0 md:pt-20 pb-10">
            Layanan Kami
          </h1>

          {isMobile ? (
            <div className="flex flex-col w-full px-6 pt-20 gap-10">
              <ServiceCard
                title="Menemukan Jalan"
                image="/illustrations/searching.webp"
              >
                Kami menganalisis ekosistem bisnis Anda untuk menemukan celah
                inovasi...
              </ServiceCard>
              <ServiceCard
                title="Membangun Identitas"
                image="/illustrations/designing.webp"
              >
                Kami menciptakan wajah digital yang berkarakter. Dari desain
                UI/UX...
              </ServiceCard>
              <ServiceCard
                title="Eksekusi Presisi"
                image="/illustrations/development.webp"
              >
                Mengubah ide kompleks menjadi infrastruktur digital yang
                tangguh...
              </ServiceCard>
              <ServiceCard
                title="Akselerasi Dampak"
                image="/illustrations/optimization.webp"
              >
                Eksplorasi tidak berhenti setelah peluncuran. Kami
                mengoptimalkan...
              </ServiceCard>
            </div>
          ) : (
            <div
              ref={sectionRef}
              className="flex flex-row w-[400vw] h-screen items-center"
            >
              <ServiceCard
                title="Menemukan Jalan"
                image="/illustrations/searching.webp"
              >
                Kami menganalisis ekosistem bisnis Anda untuk menemukan celah
                inovasi...
              </ServiceCard>
              <ServiceCard
                title="Membangun Identitas"
                image="/illustrations/designing.webp"
              >
                Kami menciptakan wajah digital yang berkarakter. Dari desain
                UI/UX...
              </ServiceCard>
              <ServiceCard
                title="Eksekusi Presisi"
                image="/illustrations/development.webp"
              >
                Mengubah ide kompleks menjadi infrastruktur digital yang
                tangguh...
              </ServiceCard>
              <ServiceCard
                title="Akselerasi Dampak"
                image="/illustrations/optimization.webp"
              >
                Eksplorasi tidak berhenti setelah peluncuran. Kami
                mengoptimalkan...
              </ServiceCard>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
