import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import CTAButton from "./CTAButton";

export default function Footer() {
  return (
    <section
      id="contacts"
      className="w-full"
      style={{
        backgroundImage: "linear-gradient(to top, #9b2b2a, #df463a)",
      }}
    >
      <div className="w-full max-w-7xl mx-auto py-20 md:py-50 px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
        <div className="col-span-1 h-full flex justify-center md:justify-center items-center">
          <h1 className="text-3xl md:text-5xl uppercase text-brand-white text-center md:text-left">
            PROYEK ANDA <br />
            SELANJUTNYA? BISA <br />
            JADI YANG{" "}
            <span className="font-bold text-brand-white italic">TERBAIK</span>
          </h1>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <div className="flex flex-col gap-6 md:gap-10 text-brand-white">
            <p className="text-sm md:text-base">
              Apakah Anda punya pertanyaan?
            </p>
            <div className="space-y-3 md:space-y-5 font-bold text-base md:text-lg">
              <div className="flex items-center gap-5">
                <IoMail />
                <p className="text-brand-white">nusantarapolapedia@gmail.com</p>
              </div>
              <div className="flex items-center gap-5">
                <FaPhone />
                <p className="text-brand-white">+62 812-3456-7890</p>
              </div>
            </div>
            <div>
              <CTAButton
                text="Mulai Eksplorasi Sekarang"
                textColor="text-brand-white"
                bgColor="bg-brand-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
