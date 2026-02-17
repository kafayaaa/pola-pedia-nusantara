"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { TbEdit, TbCheck, TbX, TbLoader2 } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import Image from "next/image";
import { ProfileInput } from "@/components/ProfileInput";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { profile, user, loading, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        full_name: profile.full_name || "",
      });
    }
  }, [profile]);

  const handleCancle = () => {
    setIsEditing(false);
    setAvatarFile(null);
    setPreviewAvatar(null);
    setFormData({
      username: profile?.username || "",
      full_name: profile?.full_name || "",
    });
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setIsSaving(true);

    try {
      let finalAvatarUrl = profile?.avatar_url;

      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatarFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

        finalAvatarUrl = urlData.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username: formData.username,
          full_name: formData.full_name,
          avatar_url: finalAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      await refreshProfile();
      alert("Profil berhasil diperbarui!");
      setIsEditing(false);
      setAvatarFile(null);
      setPreviewAvatar(null);
    } catch (error: any) {
      alert("Gagal memperbarui profil: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen">
      <div className="sticky top-0 z-10 px-10 py-8 w-full flex items-center justify-between bg-brand-white/10 backdrop-blur-sm">
        <h1 className="text-4xl font-extrabold">Profile</h1>

        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button onClick={handleCancle} disabled={isSaving}>
                <TbX className="text-3xl text-red-400 hover:scale-110 transition-transform" />
              </button>
              <button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <TbLoader2 className="text-3xl text-green-400 animate-spin" />
                ) : (
                  <TbCheck className="text-3xl text-green-400 hover:scale-110 transition-transform" />
                )}
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <TbEdit className="text-3xl text-sky-300 hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>

      <div className="p-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <label
            className={`relative w-32 h-32 rounded-full overflow-hidden border-4 shadow-sm group 
      ${isEditing ? "cursor-pointer border-brand-light-red" : "border-gray-100"}`}
          >
            {previewAvatar || profile?.avatar_url ? (
              <Image
                src={previewAvatar || profile?.avatar_url || ""}
                alt="Avatar"
                fill
                className="object-cover"
              />
            ) : (
              <BsPersonCircle className="w-full h-full text-gray-300" />
            )}

            {isEditing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">Ganti Foto</span>
              </div>
            )}

            <input
              type="file"
              className="hidden"
              accept="image/*"
              disabled={!isEditing}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatarFile(file);
                  setPreviewAvatar(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        <ProfileInput
          label="Username"
          value={formData.username}
          type="text"
          disabled={!isEditing}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <ProfileInput
          label="Full Name"
          value={formData.full_name}
          type="text"
          disabled={!isEditing}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
        />
        <ProfileInput
          label="Email"
          value={user?.email || ""}
          type="email"
          disabled={true}
        />
      </div>
    </div>
  );
}
