"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
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
    <div className="w-full max-w-7xl mx-auto h-screen">
      <h1>Dashboard</h1>
      <p>{profile?.email}</p>
    </div>
  );
}
