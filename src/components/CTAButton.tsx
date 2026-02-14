"use client";

import { GoArrowRight } from "react-icons/go";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CTAButtonProps {
  text: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
}

export default function CTAButton({
  text,
  textColor,
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
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`overflow-hidden relative pl-6 pr-1 py-1 flex items-center gap-5 text-brand-white border rounded-full backddrop-blur-sm shadow-md ${bgColor} ${borderColor} transition-all duration-300`}
    >
      <div ref={bgRef} className="absolute inset-0 bg-white/20 z-0"></div>
      <p className={`${textColor} z-10`}>{text}</p>
      <div
        ref={arrowRef}
        className="w-10 h-10 rounded-full bg-linear-to-tr from-brand-light-red to-brand-dark-red flex items-center justify-center z-10"
      >
        <GoArrowRight className="-rotate-45" />
      </div>
    </button>
  );
}
