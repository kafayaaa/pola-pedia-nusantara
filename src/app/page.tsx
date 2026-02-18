import Navbar from "@/components/Navbar";
import HorizontalServices from "@/components/HorizontalServices";
import HeroSection from "@/components/HeroSection";
import MetodologySection from "@/components/MetodologySection";
import ClientLogos from "@/components/ClientLogos";
import BlogSection from "@/components/BlogSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MetodologySection />
      <HorizontalServices />
      <ClientLogos />
      <BlogSection />
      <Footer />
    </main>
  );
}
