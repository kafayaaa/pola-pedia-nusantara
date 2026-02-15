"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import SimpleEditor from "@/components/SimpleEditor";
import { Image as ImageIcon, Loader2 } from "lucide-react";

export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePublish = async () => {
    if (!title || !content) {
      return alert("Judul dan konten tidak boleh kosong!");
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Anda harus login untuk memposting.");

      let finalImageUrl = "";

      if (coverFile) {
        const fileExt = coverFile.name.split(".").pop();
        const fileName = `covers/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(fileName, coverFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);

        finalImageUrl = urlData.publicUrl;
      }

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const { error: insertError } = await supabase.from("blogs").insert({
        title,
        slug,
        content,
        image_url: finalImageUrl,
        author_id: user.id,
        is_published: true,
      });

      if (insertError) throw insertError;

      alert("Blog berhasil dipublikasikan!");
      router.push("/admin/blogs");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-400">
          Drafting New Post
        </span>
        <button
          onClick={handlePublish}
          disabled={isSubmitting}
          className="bg-brand-light-red text-white px-6 py-2 rounded-full font-bold hover:brightness-110 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={18} />}
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </div>

      <main className="max-w-3xl mx-auto pt-10 px-6">
        <div className="mb-10">
          <label className="relative group cursor-pointer block w-full h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-gray-600 transition-colors">
                <ImageIcon size={48} strokeWidth={1} />
                <span className="mt-2 font-medium">Add a cover image</span>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <textarea
          placeholder="Judul"
          rows={1}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-5xl font-bold font-serif placeholder:text-gray-200 outline-none mb-6 resize-none border-none focus:ring-0"
        />

        <SimpleEditor content={content} onChange={setContent} />
      </main>
    </div>
  );
}
