"use client";

import { IoTrashBin } from "react-icons/io5";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({
  blogId,
  imageUrl,
}: {
  blogId: string;
  imageUrl: string | null;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus blog ini? Tindakan ini tidak dapat dibatalkan.",
    );

    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      // 1. Hapus Gambar dari Storage jika ada
      if (imageUrl) {
        const parts = imageUrl.split("blog-images/");
        if (parts.length > 1) {
          const filePath = parts[1];
          await supabase.storage.from("blog-images").remove([filePath]);
        }
      }

      // 2. Hapus Data dari Database
      const { error } = await supabase.from("blogs").delete().eq("id", blogId);

      if (error) throw error;

      alert("Blog berhasil dihapus");
      router.push("/admin/blogs");
      router.refresh();
    } catch (error: any) {
      alert("Gagal menghapus: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`${isDeleting ? "opacity-50 cursor-not-allowed" : "hover:scale-110"} transition-transform`}
    >
      <IoTrashBin className="text-brand-light-red text-xl md:text-3xl" />
    </button>
  );
}
