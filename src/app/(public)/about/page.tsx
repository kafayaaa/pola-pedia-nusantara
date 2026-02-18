"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal",
          start: "top 85%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-brand-white text-brand-black">
      <Navbar />

      <section className="pt-40 pb-20 px-6 border-b border-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-sm uppercase tracking-[0.4em] text-brand-light-red font-bold mb-8 reveal">
            Who We Are
          </h1>
          <p className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter reveal">
            WE DESIGN THE <br />
            <span className="text-gray-300 italic">FUTURE</span> OF DIGITAL{" "}
            <br />
            SUBSTANCE.
          </p>
        </div>
      </section>

      <section className="py-32 px-6 border-b border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold reveal">Manifesto Kami</h2>
          </div>
          <div className="lg:col-span-7 space-y-8 reveal text-lg md:text-xl leading-relaxed text-brand-dark-gray">
            <p>
              Di Pola Pedia Nusantara, kami tidak percaya pada solusi instan.
              Kami percaya bahwa setiap entitas memiliki "pola" unik yang harus
              ditemukan dan dioptimalkan melalui teknologi yang tepat.
            </p>
            <p>
              Berawal dari sebuah keresahan akan ekosistem digital yang semakin
              dangkal, kami menyatukan para pemikir strategis, desainer
              visioner, dan insinyur teknologi untuk membangun produk yang
              memiliki makna dan dampak nyata.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-black border border-black">
            {[
              {
                title: "Integritas",
                desc: "Kejujuran dalam setiap baris kode dan strategi yang kami berikan.",
              },
              {
                title: "Inovasi",
                desc: "Terus mengeksplorasi teknologi terbaru untuk solusi masa depan.",
              },
              {
                title: "Dampak",
                desc: "Fokus pada hasil yang meningkatkan nilai bisnis klien kami.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white p-12 hover:bg-brand-light-red transition-colors group"
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white">
                  {value.title}
                </h3>
                <p className="text-brand-dark-gray group-hover:text-white/80">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 border-t border-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-12">
            <div className="relative w-32 h-32 bg-gray-200 rounded-full mx-auto border-2 border-brand-light-red mb-4">
              <Image
                src="https://images.pexels.com/photos/27661934/pexels-photo-27661934.jpeg"
                alt="Founder"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <p className="font-bold uppercase tracking-widest">The Founders</p>
          </div>
          <blockquote className="text-3xl md:text-5xl font-serif italic max-w-4xl mx-auto leading-tight">
            "Inovasi sejati lahir saat kita berhenti mengikuti tren dan mulai
            menciptakan solusi yang menjawab kebutuhan manusia yang paling
            mendasar."
          </blockquote>
        </div>
      </section>

      <Footer />
    </main>
  );
}
