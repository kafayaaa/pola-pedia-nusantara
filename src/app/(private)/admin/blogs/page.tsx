"use client";

import BlogCard from "@/components/BlogCard";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

export default function BlogsPage() {
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
      <div className="w-full flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold">Blogs</h1>
        <FaPlusCircle className="text-3xl cursor-pointer" />
      </div>
      <div className="flex flex-col gap-5">
        <BlogCard
          title="Gegara 131 Kucing Disingkirkan, Populasi Merpati Langka Melonjak Drastis"
          image="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg"
          author="John Doe"
          createdAt="15 Februari 2026"
          desc="Populasi merpati yang terancam punah di Jepang melonjak tajam hanya dalam waktu tiga tahun setelah ratusan kucing liar dipindahkan dari habitatnya..."
        />
      </div>
    </div>
  );
}
