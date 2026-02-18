"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  created_at: string;
  image_url: string;
  content: string;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        if (data) setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(cardRefs.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      });
      return () => ctx.revert();
    }
  }, [blogs]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-20 md:py-32 border-t border-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="w-full flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-xs md:text-sm text-center md:text-left font-bold uppercase tracking-[0.3em] text-brand-light-red mb-4">
              Insights & News
            </h4>
            <h2 className="text-2xl md:text-6xl font-bold text-brand-black leading-tight">
              Pikiran Terkini Tentang <br /> Inovasi Digital.
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs md:text-sm group flex items-center gap-3 font-bold border-b-2 border-black pb-1 hover:text-brand-light-red hover:border-brand-light-red transition-all"
          >
            Lihat Semua Artikel
            <span className="group-hover:translate-x-2 transition-transform">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="aspect-[16/10] bg-gray-200"></div>
                  <div className="h-6 bg-gray-200 w-3/4"></div>
                  <div className="h-4 bg-gray-200 w-full"></div>
                </div>
              ))
            : blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="group cursor-pointer"
                >
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-6 border border-gray-200">
                      <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-all duration-500 z-10"></div>

                      {blog.image_url ? (
                        <Image
                          src={blog.image_url}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold italic">
                          NO IMAGE
                        </div>
                      )}

                      {/* <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest border border-black">
                          {blog.category || "General"}
                        </span>
                      </div> */}
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500 font-medium">
                        {new Date(blog.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold leading-snug group-hover:text-brand-light-red transition-colors">
                        {blog.title}
                      </h3>
                      <div
                        className="text-gray-600 line-clamp-2 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: blog.content.replace(/<[^>]*>?/gm, ""),
                        }}
                      />
                      <div className="pt-2">
                        <span className="text-xs md:text-sm font-black uppercase tracking-widest border-b border-transparent group-hover:border-brand-light-red text-brand-black group-hover:text-brand-light-red transition-all">
                          Baca Selengkapnya
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
