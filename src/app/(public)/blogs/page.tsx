"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

const categories = ["All", "Strategy", "Design", "Technology", "News"];

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  created_at: string;
  image_url: string;
  content: string;
}

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<Blog[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Blog[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const gridRef = useRef(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) {
          setAllPosts(data);
          setFilteredPosts(data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredPosts(allPosts);
    } else {
      const filtered = allPosts.filter(
        (post) => post.category?.toLowerCase() === activeCategory.toLowerCase(),
      );
      setFilteredPosts(filtered);
    }

    gsap.fromTo(
      ".blog-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
    );
  }, [activeCategory, allPosts]);

  return (
    <main className="bg-white text-brand-black min-h-screen">
      <Navbar />

      <section className="pt-40 pb-20 px-6 border-b border-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-sm uppercase tracking-[0.4em] text-brand-light-red font-bold mb-8">
            Journal & Insights
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <p className="text-5xl md:text-8xl font-black leading-tight tracking-tighter">
              BACAAN <br />{" "}
              <span className="text-brand-light-red italic">STRATEGIS.</span>
            </p>

            {/* <div className="flex flex-wrap gap-4 md:mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 border rounded-full text-sm font-bold transition-all
                    ${
                      activeCategory === cat
                        ? "bg-brand-black text-white border-brand-black"
                        : "bg-transparent text-gray-400 border-gray-200 hover:border-black hover:text-black"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div
          ref={gridRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20"
        >
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-6">
                <div className="aspect-[16/10] bg-gray-100 rounded-sm"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 w-1/4"></div>
                  <div className="h-8 bg-gray-100 w-full"></div>
                  <div className="h-20 bg-gray-100 w-full"></div>
                </div>
              </div>
            ))
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.id} className="blog-card group cursor-pointer">
                <Link href={`/blogs/${post.slug}`}>
                  <div className="relative aspect-[16/10] bg-gray-100 mb-8 border border-black/5 overflow-hidden">
                    {post.image_url ? (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-gray-200 group-hover:scale-110 transition-transform duration-700">
                        {post.category?.substring(0, 2).toUpperCase() || "BP"}
                      </div>
                    )}
                    {/* <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-black">
                        {post.category || "Uncategorized"}
                      </span>
                    </div> */}
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                      {new Date(post.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-brand-light-red transition-colors">
                      {post.title}
                    </h3>
                    <div
                      className="text-brand-dark-gray leading-relaxed line-clamp-3 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: post.content.replace(/<[^>]*>?/gm, ""),
                      }}
                    />
                    <div className="pt-4 flex items-center gap-2 group-hover:gap-4 transition-all text-brand-light-red font-black uppercase tracking-widest text-xs">
                      Read Article <span>→</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 italic">
                Belum ada artikel di kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
