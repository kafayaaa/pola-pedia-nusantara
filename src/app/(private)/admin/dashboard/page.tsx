"use client";
import DashboardCard from "@/components/DashboardCard";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { PiEyesFill } from "react-icons/pi";

export default function DashboardPage() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !profile) {
      router.push("/signin");
    }
  }, [profile, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return null;

  return (
    <div className="w-full min-h-screen p-10">
      <div className="w-full flex items-center justify-between mb-5">
        <h1 className="text-4xl font-extrabold">Dashboard</h1>
        <FaPlusCircle className="text-3xl cursor-pointer" />
      </div>
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
  );
}
