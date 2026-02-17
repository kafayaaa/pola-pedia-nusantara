"use client";
import DashboardCard from "@/components/DashboardCard";
import { IoNewspaper } from "react-icons/io5";
import { PiEyesFill } from "react-icons/pi";

export default function DashboardPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="sticky top-0 z-10 px-10 py-8 w-full flex items-center justify-between bg-brand-white/10 backdrop-blur-sm">
        <h1 className="text-4xl font-extrabold">Dashboard</h1>
      </div>
      <div className="px-10 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <DashboardCard
            icon={<PiEyesFill className="text-xl" />}
            count={10}
            title="Pengunjung"
          />
          <DashboardCard
            icon={<IoNewspaper className="text-xl" />}
            count={10}
            title="Artikel"
          />
        </div>
      </div>
    </div>
  );
}
