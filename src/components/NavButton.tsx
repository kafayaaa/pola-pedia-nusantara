"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavButtonProps {
  text: string;
  href: string;
}

export default function NavButton({ text, href }: NavButtonProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <div className="min-w-20 flex justify-center items-center">
      <Link
        href={href}
        className={`tracking-wide transition-all duration-300 ease-in-out hover:tracking-normal hover:text-brand-light-red hover:font-extrabold 
          ${
            isActive
              ? "text-brand-light-red font-extrabold tracking-normal"
              : "text-brand-white"
          }`}
      >
        {text}
      </Link>
    </div>
  );
}
