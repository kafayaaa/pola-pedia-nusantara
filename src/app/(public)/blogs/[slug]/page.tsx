import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

const supabase = createClient();

async function getBlog(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select(`*, profiles (username, full_name, avatar_url)`)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

async function getMoreBlogs(currentId: string) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .neq("id", currentId)
    .eq("is_published", true)
    .limit(3)
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  const moreBlogs = await getMoreBlogs(blog.id);

  return (
    <article className="relative w-full min-h-screen bg-white">
      <div className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/blogs"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-xl sm:text-2xl text-gray-700" />
            </Link>
            <h1 className="text-lg sm:text-xl font-bold truncate max-w-[150px] sm:max-w-md">
              Blog Detail
            </h1>
          </div>
        </div>
      </div>

      {blog.image_url && (
        <div className="w-full max-w-5xl mx-auto sm:px-6 sm:mt-8">
          <div className="relative aspect-video w-full sm:rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-black leading-tight text-brand-black mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-brand-light-red flex items-center justify-center text-white font-bold text-sm">
              {blog.profiles?.full_name?.charAt(0) || "A"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-brand-black">
                {blog.profiles?.full_name || "Admin"}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(blog.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        <div
          className="
            prose prose-neutral max-w-none
            /* Mobile adjustments */
            prose-headings:text-brand-black prose-headings:font-bold
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-[17px]
            prose-img:rounded-xl prose-img:shadow-lg
            prose-blockquote:italic prose-blockquote:text-brand-light-red prose-blockquote:border-l-4 prose-blockquote:border-brand-light-red
            sm:prose-lg md:prose-xl
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {moreBlogs.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-20 px-5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-row justify-between items-center mb-12 gap-4">
              <h4 className="text-brand-light-red font-black uppercase tracking-[0.3em] text-xs">
                Baca Juga
              </h4>

              <Link
                href="/blogs"
                className="text-sm font-bold border-b-2 border-brand-black pb-1 hover:text-brand-light-red hover:border-brand-light-red transition-all"
              >
                Lihat Semua Berita →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {moreBlogs.map((item) => (
                <Link
                  key={item.id}
                  href={`/blogs/${item.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-200 mb-4 border border-gray-100">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-gray-400">
                        NO IMAGE
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {/* <p className="text-[10px] font-black uppercase tracking-widest text-brand-light-red">
                      {item.category || "General"}
                    </p> */}
                    <h3 className="text-lg font-bold leading-tight group-hover:text-brand-light-red transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
