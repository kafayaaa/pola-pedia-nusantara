"use client";

import Image from "next/image";
import Link from "next/link";
import NavButton from "./NavButton";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full pt-5 pb-10 px-6 bg-linear-to-b from-black/60 to-black/0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <div className="z-50 min-w-[40px]">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.webp"
              alt="Logo"
              width={40}
              height={40}
              className="hover:scale-110 transition-transform"
            />
          </Link>
        </div>

        {/* DESKTOP MENU - Pastikan 'flex' aktif di md: keatas */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <NavButton text="About" href="/about" />
          <NavButton text="Services" href="/services" />
          <NavButton text="Contacts" href="/contacts" />
          <NavButton text="Blogs" href="/blogs" />
          <NavButton text="Sign In" href="/signin" />
        </div>

        {/* MOBILE TOGGLE - 'hidden' di md: keatas */}
        <button
          className="md:hidden z-50 text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-brand-black/95 transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-full invisible"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {/* Gunakan onClick untuk menutup menu saat link diklik */}
          <div
            onClick={() => setIsOpen(false)}
            className="flex flex-col items-center gap-8"
          >
            <Link href="/about" className="text-white text-3xl font-bold">
              About
            </Link>
            <Link href="/services" className="text-white text-3xl font-bold">
              Services
            </Link>
            <Link href="/contacts" className="text-white text-3xl font-bold">
              Contacts
            </Link>
            <Link href="/blogs" className="text-white text-3xl font-bold">
              Blogs
            </Link>
            <Link
              href="/signin"
              className="bg-brand-light-red text-white px-8 py-3 rounded-full font-bold text-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
