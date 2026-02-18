"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const methodologies = [
  {
    id: "01",
    title: "Discovery",
    subtitle: "Memahami Akar Tantangan",
    desc: "Kami memulai dengan mendengarkan. Melalui riset mendalam dan analisis data, kami membedah ekosistem bisnis Anda untuk menemukan peluang yang belum terjamah dan solusi yang benar-benar relevan dengan target audiens Anda.",
    bg: "bg-white",
  },
  {
    id: "02",
    title: "Strategy",
    subtitle: "Merancang Peta Jalan",
    desc: "Bukan sekadar ide kreatif, kami membangun arsitektur strategi yang solid. Ini adalah fase di mana visi Anda diterjemahkan menjadi rencana aksi digital yang terukur, memastikan setiap langkah memiliki tujuan yang jelas terhadap ROI.",
    bg: "bg-brand-white",
  },
  {
    id: "03",
    title: "Execution",
    subtitle: "Presisi dalam Membangun",
    desc: "Memasuki tahap konstruksi, kami menggabungkan desain UI/UX yang intuitif dengan infrastruktur teknologi yang tangguh. Fokus kami adalah menciptakan produk digital yang tidak hanya indah secara visual, tetapi juga cepat dan aman.",
    bg: "bg-white",
  },
  {
    id: "04",
    title: "Evolution",
    subtitle: "Optimasi Berkelanjutan",
    desc: "Peluncuran hanyalah awal. Kami terus memantau, menganalisis, dan mengoptimalkan performa digital Anda. Di dunia yang terus berubah, kami memastikan bisnis Anda tetap adaptif dan memimpin di garis depan inovasi.",
    bg: "bg-brand-white",
  },
];

export default function MethodologyStack() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative w-full bg-white">
      {methodologies.map((item, index) => (
        <div
          key={item.id}
          className={`relative w-full h-screen flex flex-col border-t border-black ${item.bg}`}
          style={{
            zIndex: index + 1,
            position: "sticky",
            top: 100,
          }}
        >
          <div className="w-full flex border-b border-black bg-inherit">
            <div className="flex-1 p-4 md:p-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-brand-light-red">
                  {item.id}.
                </span>
                <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-brand-black">
                  {item.title}
                </h2>
              </div>
              <span className="hidden md:block text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                Pola Pedia Methodology
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-20">
            <div className="max-w-4xl w-full">
              <h3 className="text-2xl md:text-6xl font-bold text-brand-black mb-6 md:mb-8 leading-tight">
                {item.subtitle}
              </h3>
              <p className="text-sm md:text-xl text-brand-dark-gray leading-relaxed text-center md:text-justify">
                {item.desc}
              </p>

              <div className="mt-12 flex items-center gap-4">
                <div className="h-[2px] w-20 bg-brand-light-red"></div>
                <span className="text-sm font-bold uppercase tracking-widest text-brand-light-red">
                  Phase {item.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="h-[20vh] bg-white border-t border-black"></div>
    </section>
  );
}
