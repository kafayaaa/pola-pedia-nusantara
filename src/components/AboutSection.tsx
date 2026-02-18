"use client";

export default function AboutProcess() {
  return (
    <section id="about" className="w-full min-h-screen py-20 md:py-0">
      <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-center gap-10 px-6 md:px-0">
        <h1 className="text-3xl md:text-5xl text-brand-black font-bold text-center md:text-left">
          Eksplorasi potensi <br />
          <span className="text-brand-light-red font-extrabold">
            tanpa batas
          </span>{" "}
          bersama kami
        </h1>
        <p className="text-sm md:text-xl text-justify">
          Teknologi bukan sekadar alat, melainkan sebuah keputusan strategis. Di
          dunia digital yang bergerak cepat, banyak yang kehilangan arah. Kami
          hadir untuk membantu Anda berdiri tegak dengan solusi yang melampaui
          standar biasa.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-sm md:text-xl text-justify text-brand-dark-gray">
          <div className="col-span-1 md:col-span-1">
            <p>
              Di PT Pola Pedia Nusantara, kami membangun ekosistem digital
              dengan substansi dan karakter. Dirancang secara strategis.
              Disempurnakan melalui teknologi. Kami bekerja untuk bisnis yang
              ingin menjadi pemimpin pasar, bukan sekadar pengikut.
            </p>
          </div>
          <div className="col-span-1 md:col-span-1">
            <p>
              Strategi, Desain, Digital. Kami tidak bekerja untuk tren sesaat.
              Kami membangun untuk jangka panjang. Kami menciptakan kehadiran
              digital yang tidak hanya terlihat indah, tetapi juga memberikan
              dampak nyata. Karena inovasi lebih dari sekadar pembaruan, dan
              solusi yang baik adalah solusi yang bekerja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
