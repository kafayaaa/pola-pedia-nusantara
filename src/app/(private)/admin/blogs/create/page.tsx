"use client";

import { useState, DragEvent, useRef, useEffect } from "react";
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
  const [isDragging, setIsDragging] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCoverFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Tolong unggah file gamber yang valid.");
    }
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
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

  useEffect(() => {
    adjustHeight();
  }, [title]);

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
          {isSubmitting && <Loader2 className="animate-spin" size={18} />}
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
                ? "border-brand-light-red bg-red-50 scale-[1.02]"
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
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full text-sm">
                    Ganti Gambar (Drop di sini)
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-gray-600 transition-colors">
                <div
                  className={`p-4 rounded-full mb-2 transition-transform ${isDragging ? "scale-125 text-brand-light-red" : ""}`}
                >
                  <ImageIcon size={48} strokeWidth={1} />
                </div>
                <span className="font-medium">
                  {isDragging
                    ? "Lepaskan untuk unggah"
                    : "Klik atau seret gambar ke sini"}
                </span>
                <p className="text-xs mt-1 text-gray-400">PNG, JPG up to 5MB</p>
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
          className="w-full text-5xl font-bold placeholder:text-gray-200 outline-none mb-6 resize-none border-none focus:ring-0 overflow-hidden min-h-[60px]"
          style={{ lineHeight: "1.2" }}
        />

        <SimpleEditor content={content} onChange={setContent} />
      </main>
    </div>
  );
}
