import Link from "next/link";

interface NavButtonProps {
  text: string;
  href: string;
}

export default function NavButton({ text, href }: NavButtonProps) {
  return (
    <li className="min-w-20 flex justify-center items-center">
      <Link
        href={href}
        className="tracking-wide hover:tracking-normal hover:text-brand-light-red hover:font-extrabold transition-all duration-300 ease-in-out"
      >
        {text}
      </Link>
    </li>
  );
}
