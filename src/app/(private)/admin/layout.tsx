"use client";

import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !profile) {
      router.push("/signin");
    }
  }, [profile, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return null;
  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <div className="md:ml-48 w-full">{children}</div>
    </main>
  );
}
