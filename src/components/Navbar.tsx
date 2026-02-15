import Image from "next/image";
import NavButton from "./NavButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 w-full pt-5 pb-10 px-5 bg-linear-to-b from-brand-black/50 to-brand-black/0">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        <div className="max-w-40">
          <Link href="/#hero">
            <Image src="/logo.webp" alt="Logo" width={40} height={40} />
          </Link>
        </div>
        <ul className="flex items-center gap-10 text-brand-white">
          <NavButton text="About" href="#about" />
          <NavButton text="Services" href="#services" />
          <NavButton text="Contacts" href="#contacts" />
          <NavButton text="Sign In" href="/signin" />
        </ul>
      </div>
    </nav>
  );
}
