"use client";

import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import { IoNewspaper } from "react-icons/io5";
import { RiHome9Fill } from "react-icons/ri";
import SidebarButton from "./SidebarButton";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Sidebar() {
  const { profile } = useAuth();

  return (
    <nav className="fixed top-0 left-0 z-10 bg-brand-white w-48 h-screen px-5 py-8 flex flex-col justify-between items-center border-r border-brand-medium-gray">
      <div className="flex flex-col items-center gap-8">
        <Image src="/logo.webp" alt="Logo" width={50} height={50} />
        <div className="flex flex-col gap-2">
          <SidebarButton
            href="/admin/dashboard"
            icon={<RiHome9Fill />}
            label="Dashboard"
          />
          <SidebarButton
            href="/admin/blogs"
            icon={<IoNewspaper />}
            label="Blogs"
          />
        </div>
      </div>
      <Link href="/admin/profile">
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt="Avatar"
            width={50}
            height={50}
            className="rounded-full hover:outline-2 hover:outline-brand-light-red hover:outline-offset-2"
          />
        ) : (
          <BsPersonCircle className="text-4xl" />
        )}
      </Link>
    </nav>
  );
}
