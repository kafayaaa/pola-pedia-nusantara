import { GoArrowRight } from "react-icons/go";

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
  return (
    <button
      className={`pl-6 pr-1 py-1 flex items-center gap-5 text-brand-white border rounded-full backddrop-blur-sm shadow-md ${bgColor} ${borderColor}`}
    >
      <p className={`${textColor}`}>{text}</p>
      <div className="w-10 h-10 rounded-full bg-linear-to-tr from-brand-light-red to-brand-dark-red flex items-center justify-center">
        <GoArrowRight />
      </div>
    </button>
  );
}
