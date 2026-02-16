"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import BlogCard from "@/components/BlogCard";

export default function BlogsPage() {
  const { profile, loading: authLoading } = useAuth();
  const router = useRouter();

  const [blogs, setBlogs] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log(blogs);
  useEffect(() => {
    if (!authLoading && !profile) {
      router.push("/signin");
    }
  }, [profile, authLoading, router]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select(`*, profiles (*)`)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setDataLoading(false);
      }
    };

    if (profile) {
      fetchBlogs();
    }
  }, [profile]);

  if (authLoading || dataLoading)
    return <p className="p-10 text-center">Loading...</p>;
  if (!profile) return null;
  if (error) return <div className="p-10">Gagal mengambil data.</div>;

  return (
    <div className="w-full min-h-screen">
      <div className="sticky top-0 z-10 px-10 py-8 w-full flex items-center justify-between bg-brand-white/10 backdrop-blur-sm">
        <h1 className="text-4xl font-extrabold">Blogs</h1>
        <Link href="/admin/blogs/create">
          <FaPlusCircle className="text-3xl text-brand-light-red hover:scale-110 transition-transform" />
        </Link>
      </div>
      <div className="p-10">
        <div className="flex flex-col gap-5">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                slug={blog.slug}
                title={blog.title}
                image={blog.image_url}
                author={blog.profiles.full_name}
                createdAt={blog.created_at}
                desc={blog.content}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">Belum ada blog yang dibuat.</p>
          )}
        </div>
      </div>
    </div>
  );
}
