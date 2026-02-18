"use client";

import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import { IoNewspaper } from "react-icons/io5";
import { RiHome9Fill } from "react-icons/ri";
import SidebarButton from "./SidebarButton";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { profile } = useAuth();
  const pathname = usePathname();

  const menus = [
    { href: "/admin/dashboard", icon: <RiHome9Fill />, label: "Dashboard" },
    { href: "/admin/blogs", icon: <IoNewspaper />, label: "Blogs" },
  ];

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 z-40 bg-brand-white w-48 h-screen px-5 py-8 flex-col justify-between items-center border-r border-brand-medium-gray">
        <div className="flex flex-col items-center gap-8 w-full">
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={50}
              height={50}
              className="hover:scale-110 transition-transform"
            />
          </Link>
          <div className="flex flex-col gap-2 w-full">
            {menus.map((menu) => (
              <SidebarButton
                key={menu.href}
                href={menu.href}
                icon={menu.icon}
                label={menu.label}
              />
            ))}
          </div>
        </div>

        <Link href="/admin/profile" className="group">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full border-2 border-transparent group-hover:border-brand-light-red transition-all shadow-md"
            />
          ) : (
            <BsPersonCircle className="text-4xl text-brand-dark-gray group-hover:text-brand-light-red transition-colors" />
          )}
        </Link>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-medium-gray px-6 py-3 flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {menus.map((menu) => {
          const isActive = pathname === menu.href;
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-brand-light-red" : "text-brand-dark-gray"
              }`}
            >
              <span className="text-2xl">{menu.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {menu.label}
              </span>
            </Link>
          );
        })}

        <Link href="/admin/profile">
          <div
            className={`p-1 rounded-full border-2 ${pathname === "/admin/profile" ? "border-brand-light-red" : "border-transparent"}`}
          >
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt="Avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              <BsPersonCircle className="text-2xl text-brand-dark-gray" />
            )}
          </div>
        </Link>
      </nav>
    </>
  );
}
