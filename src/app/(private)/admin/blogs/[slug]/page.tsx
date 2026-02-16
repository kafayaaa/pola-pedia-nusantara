import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import DeleteButton from "@/components/DeleteButton";

async function getBlog(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select(
      `
      *,
      profiles (
        username,
        full_name,
        avatar_url
      )
    `,
    )
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="relative w-full min-h-screen">
      <div className="sticky top-0 z-10 px-10 py-8 w-full flex items-center justify-between bg-brand-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link href="/admin/blogs">
            <FaArrowLeft className="text-3xl text-brand-dark-gray hover:scale-110 transition-transform" />
          </Link>
          <h1 className="text-4xl font-extrabold">Blog Detail</h1>
        </div>
        <div className="text-3xl flex items-center gap-4">
          <Link href={`/admin/blogs/edit/${blog.id}`}>
            <TbEdit className="text-sky-300 hover:scale-110 transition-transform" />
          </Link>
          <DeleteButton blogId={blog.id} imageUrl={blog.image_url} />
        </div>
      </div>
      <div className="p-10">
        {blog.image_url && (
          <div className="max-w-5xl mx-auto px-6 mb-12">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
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

        <div className="max-w-3xl mx-auto px-6 pb-20">
          <div className="mb-10 space-y-5">
            <h1 className="text-4xl font-extrabold">{blog.title}</h1>
            <div className="flex items-center gap-2">
              <p className="text-brand-black font-bold">
                {blog.profiles.full_name}
              </p>
              <p className="text-brand-dark-gray">•</p>
              <p className="text-brand-dark-gray">
                {new Date(blog.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div
            className="prose prose-lg md:prose-xl prose-neutral max-w-none prose-headings:font-sans prose-img:rounded-xl prose-blockquote:border-brand-light-red"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </article>
  );
}
