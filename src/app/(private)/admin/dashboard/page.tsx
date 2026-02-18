"use client";
import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import { IoNewspaper } from "react-icons/io5";
import { createClient } from "@/lib/supabase";

export default function DashboardPage() {
  const [blogCount, setBlogCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getStats() {
      try {
        const { count, error } = await supabase
          .from("blogs")
          .select("*", { count: "exact", head: true });

        if (error) throw error;
        setBlogCount(count || 0);
      } catch (err) {
        console.error("Gagal mengambil statistik:", err);
      } finally {
        setIsLoading(false);
      }
    }

    getStats();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="sticky top-0 z-10 px-5 md:px-10 py-8 w-full flex items-center justify-between bg-brand-white/10 backdrop-blur-sm">
        <h1 className="text-2xl md:text-4xl font-extrabold text-brand-black">
          Dashboard
        </h1>
      </div>

      <div className="px-5 md:px-10 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <DashboardCard
            icon={<IoNewspaper className="text-xl" />}
            count={isLoading ? "..." : blogCount}
            title="Artikel"
          />
        </div>
      </div>
    </div>
  );
}
