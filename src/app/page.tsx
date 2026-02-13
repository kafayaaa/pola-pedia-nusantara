import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <section
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.webp')" }}
      >
        <div className="absolute inset-0 bg-brand-black/50"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex items-center justify-center">
          <h1 className="text-7xl text-brand-white">
            Eksplorasi Potensi <br />
            <span className="text-brand-light-red font-extrabold">
              Tanpa Batas
            </span>
            <br />
            Bersama Kami
          </h1>
        </div>
      </section>
    </main>
  );
}
