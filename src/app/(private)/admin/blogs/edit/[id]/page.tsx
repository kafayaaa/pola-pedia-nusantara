"use client";

import { useState, useEffect, useRef, DragEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import SimpleEditor from "@/components/SimpleEditor";
import { Image as ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [oldImageUrl, setOldImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchOldData = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Blog tidak ditemukan");
        router.push("/admin/blogs");
        return;
      }

      setTitle(data.title);
      setContent(data.content);
      setPreviewUrl(data.image_url);
      setOldImageUrl(data.image_url);
      setIsLoadingData(false);
    };

    if (id) fetchOldData();
  }, [id, router]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  const getFilePathFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("blog-images/");
      if (pathParts.length > 1) {
        return decodeURIComponent(pathParts[1].split("?")[0]);
      }
      return null;
    } catch (e) {
      return null;
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

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      let finalImageUrl = previewUrl;

      if (coverFile) {
        if (oldImageUrl && oldImageUrl.includes("supabase.co")) {
          const oldFilePath = getFilePathFromUrl(oldImageUrl);
          if (oldFilePath) {
            await supabase.storage.from("blog-images").remove([oldFilePath]);
          }
        }
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

      const newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const { error: updateError } = await supabase
        .from("blogs")
        .update({
          title,
          content,
          image_url: finalImageUrl,
          slug: newSlug,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      alert("Blog berhasil diperbarui!");
      router.push(`/admin/blogs/${newSlug}`);
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData)
    return <div className="p-20 text-center">Loading data...</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <Link
          href="/admin/blogs"
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Back</span>
        </Link>
        <button
          onClick={handleUpdate}
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={18} />}
          {isSubmitting ? "Saving..." : "Update Post"}
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
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCoverFile(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        <textarea
          ref={textareaRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-5xl font-bold font-serif outline-none mb-6 resize-none overflow-hidden"
          rows={1}
        />

        <SimpleEditor content={content} onChange={setContent} />
      </main>
    </div>
  );
}
