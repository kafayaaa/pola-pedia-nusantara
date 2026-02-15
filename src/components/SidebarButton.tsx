"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href ||
    (href !== "/admin/dashboard" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300
        ${isActive ? "text-brand-light-red font-bold" : "hover:bg-brand-light-red hover:text-brand-white"}
        `}
    >
      {icon}
      <p>{label}</p>
    </Link>
  );
}
