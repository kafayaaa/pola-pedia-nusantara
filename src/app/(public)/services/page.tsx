"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const detailedServices = [
  {
    number: "01",
    title: "Strategic Consulting",
    features: [
      "Market Analysis",
      "Digital Roadmap",
      "Brand Positioning",
      "ROI Forecasting",
    ],
    desc: "Kami membantu Anda menentukan arah di tengah ketidakpastian digital. Strategi kami bukan sekadar dokumen, melainkan peta jalan praktis untuk mendominasi pasar.",
  },
  {
    number: "02",
    title: "UI/UX Design",
    features: [
      "User Research",
      "Wireframing",
      "Visual Identity",
      "Interactive Prototypes",
    ],
    desc: "Desain kami berfokus pada emosi dan fungsi. Kami memastikan setiap interaksi pengguna terasa intuitif, berkesan, dan yang terpenting: konversif.",
  },
  {
    number: "03",
    title: "Web & App Development",
    features: [
      "Custom Software",
      "E-commerce Solutions",
      "API Integration",
      "Cloud Infrastructure",
    ],
    desc: "Menggunakan teknologi terbaru seperti Next.js dan sistem berbasis cloud untuk membangun platform yang cepat, aman, dan siap tumbuh sesuai skala bisnis Anda.",
  },
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".service-grid",
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-white text-brand-black">
      <Navbar />

      <section className="pt-40 pb-24 px-6 border-b border-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-sm uppercase tracking-[0.4em] text-brand-light-red font-bold mb-8">
            Our Expertise
          </h1>
          <p className="text-5xl md:text-8xl font-black leading-tight tracking-tighter max-w-5xl">
            SOLUSI DIGITAL <br />
            TANPA <span className="text-brand-light-red italic">KOMPROMI.</span>
          </p>
        </div>
      </section>

      <section className="py-32 px-6 service-grid">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-20">
          {detailedServices.map((service, index) => (
            <div
              key={index}
              className="service-card group grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-gray-200 pb-20 last:border-0"
            >
              <div className="lg:col-span-5">
                <span className="text-xl font-bold text-brand-light-red mb-4 block">
                  {service.number}.
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 group-hover:text-brand-light-red transition-colors">
                  {service.title}
                </h2>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between">
                <p className="text-xl md:text-2xl text-brand-dark-gray leading-relaxed mb-10">
                  {service.desc}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-light-red rounded-full"></div>
                      <span className="font-bold text-sm uppercase tracking-widest">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-10">
            PUNYA PROYEK BESAR <br /> DI PIKIRAN ANDA?
          </h2>
          <a
            href="/contacts"
            className="inline-block px-12 py-5 bg-brand-light-red text-white font-black text-xl uppercase tracking-widest hover:bg-white hover:text-brand-black transition-all duration-300 rounded-full"
          >
            Mulai Konsultasi
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
