"use client";
import { RefObject, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".reveal-contact", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-white text-brand-black min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h1 className="text-sm uppercase tracking-[0.4em] text-brand-light-red font-bold mb-8 reveal-contact">
              Get In Touch
            </h1>
            <p className="text-5xl md:text-8xl font-black leading-tight tracking-tighter reveal-contact">
              MARI <span className="text-brand-light-red italic">BICARA</span>{" "}
              <br />
              TENTANG IDE ANDA.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-12 reveal-contact">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Email
                </h3>
                <p className="text-2xl md:text-3xl font-bold hover:text-brand-light-red transition-colors">
                  hello@polapedia.id
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Lokasi
                </h3>
                <p className="text-2xl md:text-3xl font-bold">
                  Jakarta, Indonesia <br />
                  Nusantara Center, 12th Floor.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Socials
                </h3>
                <div className="flex gap-6 text-xl font-bold">
                  <a
                    href="#"
                    className="hover:text-brand-light-red transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="hover:text-brand-light-red transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="hover:text-brand-light-red transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 reveal-contact">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="border-b-2 border-black py-4 focus:border-brand-light-red outline-none transition-colors text-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest">
                      Email Bisnis
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="border-b-2 border-black py-4 focus:border-brand-light-red outline-none transition-colors text-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    Layanan yang Dibutuhkan
                  </label>
                  <select className="border-b-2 border-black py-4 focus:border-brand-light-red outline-none transition-colors text-lg bg-transparent">
                    <option>Strategic Consulting</option>
                    <option>UI/UX Design</option>
                    <option>Web & App Development</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    Pesan
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ceritakan sedikit tentang proyek Anda..."
                    className="border-b-2 border-black py-4 focus:border-brand-light-red outline-none transition-colors text-lg resize-none"
                  ></textarea>
                </div>

                <button className="w-full md:w-auto px-12 py-5 bg-brand-black text-white font-black text-lg uppercase tracking-widest hover:bg-brand-light-red transition-all duration-300">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
function useGSAP(arg0: () => void, arg1: { scope: RefObject<null> }) {
  throw new Error("Function not implemented.");
}
