"use client";

import { useState, DragEvent, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import SimpleEditor from "@/components/SimpleEditor";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateBlogPage() {
  const supabase = createClient();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generatedSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCoverFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Tolong unggah file gambar yang valid.");
    }
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handlePublish = async () => {
    if (!title || !content) return alert("Isi judul dan konten");

    if (!user) {
      return alert("Sesi anda berakhir. Silakan login kembali.");
    }

    setIsSubmitting(true);

    try {
      let finalImageUrl = "";

      if (coverFile) {
        console.log("Log 4: Uploading image...");
        const fileExt = coverFile.name.split(".").pop();
        const fileName = `covers/${user.id}-${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(fileName, coverFile, {
            contentType: coverFile.type,
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          console.error("DIAGNOSA ERROR:", uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);

        finalImageUrl = urlData.publicUrl;
      }

      console.log("Log 6: Inserting blog...");
      const { error: insertError } = await supabase.from("blogs").insert({
        title,
        slug: generatedSlug,
        content,
        image_url: finalImageUrl,
        author_id: user.id,
        is_published: true,
      });

      if (insertError) throw insertError;

      alert("Blog berhasil diterbitkan!");
      router.push("/admin/blogs");
    } catch (err: any) {
      console.error("DIAGNOSA ERROR:", err);
      alert("Gagal: " + (err.message || "Terjadi kesalahan database"));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [title]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  if (authLoading)
    return <div className="p-10 text-center">Memuat Sesi...</div>;

  return (
    <div className="min-h-screen bg-brand-white pb-20">
      <div className="sticky top-0 z-10 bg-brand-white/10 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-400">
          Drafting New Post
        </span>
        <button
          onClick={handlePublish}
          disabled={isSubmitting}
          className="bg-brand-light-red text-white px-6 py-2 rounded-full font-bold hover:brightness-110 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </div>

      <main className="max-w-3xl mx-auto pt-10 px-6">
        <div className="mb-10">
          <label
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`relative group cursor-pointer block w-full h-64 border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-200 ${
              isDragging
                ? "border-brand-light-red bg-red-50 scale-[1.01]"
                : "border-gray-200 bg-gray-50 hover:border-gray-400"
            }`}
          >
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full text-sm">
                    Ganti Gambar
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ImageIcon size={48} strokeWidth={1} className="mb-2" />
                <span className="font-medium">
                  Klik atau seret gambar ke sini
                </span>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </div>

        <textarea
          ref={textareaRef}
          placeholder="Judul"
          rows={1}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl md:text-5xl font-bold placeholder:text-gray-200 outline-none mb-6 resize-none border-none focus:ring-0 overflow-hidden"
        />

        <SimpleEditor content={content} onChange={setContent} />
      </main>
    </div>
  );
}
