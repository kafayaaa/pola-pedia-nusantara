import Navbar from "@/components/Navbar";
import CTAButton from "@/components/CTAButton";
import HorizontalServices from "@/components/HorizontalServices";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Navbar />
      <section
        id="hero"
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('images/hero.webp')" }}
      >
        <div className="absolute inset-0 bg-brand-black/50"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col items-start justify-center gap-10">
          <h1 className="text-7xl text-brand-white">
            Eksplorasi Potensi <br />
            <span className="text-brand-light-red font-extrabold">
              Tanpa Batas
            </span>
            <br />
            Bersama Kami
          </h1>
          <p className="max-w-3xl text-brand-light-gray text-lg text-justify">
            Kami hadir untuk mendobrak batasan digital bisnis Anda. Dengan
            integrasi teknologi mutakhir dan strategi kreatif yang tepat, kami
            membantu Anda menemukan peluang baru yang belum pernah terbayangkan
            sebelumnya. Mari melangkah lebih jauh dan wujudkan visi besar Anda
            menjadi solusi nyata yang berkelanjutan.
          </p>
          <CTAButton text="Mulai Eksplorasi Sekarang" />
        </div>
      </section>
      <section id="about" className="w-full min-h-screen">
        <div className="w-full max-w-7xl mx-auto h-screen flex flex-col justify-center gap-10">
          <h1 className="text-5xl text-brand-black font-bold">
            Eksplorasi potensi <br />
            <span className="text-brand-light-red font-extrabold">
              tanpa batas
            </span>{" "}
            bersama kami
          </h1>
          <p className="text-xl text-justify">
            Teknologi bukan sekadar alat, melainkan sebuah keputusan strategis.
            Di dunia digital yang bergerak cepat, banyak yang kehilangan arah.
            Kami hadir untuk membantu Anda berdiri tegak dengan solusi yang
            melampaui standar biasa.
          </p>
          <div className="grid grid-cols-2 gap-10 text-xl text-justify text-brand-dark-gray">
            <div className="col-span-1">
              <p>
                Di PT Pola Pedia Nusantara, kami membangun ekosistem digital
                dengan substansi dan karakter. Dirancang secara strategis.
                Disempurnakan melalui teknologi. Kami bekerja untuk bisnis yang
                ingin menjadi pemimpin pasar, bukan sekadar pengikut.
              </p>
            </div>
            <div className="col-span-1">
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
      <HorizontalServices />
      <section
        id="contacts"
        className="w-full -translate-y-25 rounded-t-[5rem] bg-brand-white"
      >
        <div className="w-full max-w-7xl mx-auto py-50 grid grid-cols-2">
          <div className="col-span-1 h-full flex justify-center items-center">
            <h1 className="text-5xl uppercase">
              PROYEK ANDA <br />
              SELANJUTNYA? BISA <br />
              JADI YANG{" "}
              <span className="font-bold text-brand-light-red">TERBAIK</span>
            </h1>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <div className="flex flex-col gap-10 text-brand-dark-gray">
              <p>Apakah Anda punya pertanyaan?</p>
              <div className="space-y-5 font-bold text-lg">
                <div className="flex items-center gap-5">
                  <IoMail />
                  <p className="text-brand-black">
                    nusantarapolapedia@gmail.com
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <FaPhone />
                  <p className="text-brand-black">+62 812-3456-7890</p>
                </div>
              </div>
              <div>
                <CTAButton
                  text="Mulai Eksplorasi Sekarang"
                  textColor="text-brand-dark-gray"
                  bgColor="bg-brand-black/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
