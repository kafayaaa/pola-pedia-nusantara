"use client";

import { GoArrowRight } from "react-icons/go";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

interface CTAButtonProps {
  text: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
}

export default function CTAButton({
  text,
  textColor = "text-white",
  bgColor = "bg-brand-white/10",
  borderColor = "border-brand-white/50",
}: CTAButtonProps) {
  const bgRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    gsap.set(bgRef.current, { x: "-100%" });
  }, []);

  const onMouseEnter = () => {
    gsap.to(bgRef.current, {
      x: "0%",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(arrowRef.current, {
      rotate: 45,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  const onMouseLeave = () => {
    gsap.to(bgRef.current, {
      x: "100%",
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(bgRef.current, { x: "-100%" });
      },
    });

    gsap.to(arrowRef.current, {
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Link
      href="/contacts"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group w-fit overflow-hidden relative pl-6 pr-1 py-1 flex items-center gap-5 border rounded-full backdrop-blur-sm shadow-md ${bgColor} ${borderColor} transition-all duration-300`}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-white/20 z-0 pointer-events-none"
      ></div>

      <span
        className={`${textColor} z-10 text-sm md:text-base font-bold relative inline-block`}
      >
        {text}
      </span>

      <div
        ref={arrowRef}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-linear-to-tr from-brand-light-red to-brand-dark-red flex items-center justify-center z-10 text-white"
      >
        <GoArrowRight className="-rotate-45 text-xl" />
      </div>
    </Link>
  );
}
