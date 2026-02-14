"use client";

import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/admin/dashboard");
    }
    setLoading(false);
  };

  return (
    <main className="w-full h-screen grid grid-cols-2">
      <div
        className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero.webp')" }}
      >
        <div className="absolute inset-0 bg-brand-black/50"></div>
        <div className="w-1/2 flex flex-col items-center gap-5 p-10 bg-brand-white/10 border border-brand-white/50 rounded-3xl backdrop-blur-sm shadow-md z-10">
          <Image src="/ppn.webp" alt="Logo" width={200} height={200} />
          <h1 className="text-4xl font-black text-brand-white tracking-wider uppercase text-center leading-tight">
            Pola Pedia <br /> Nusantara
          </h1>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center bg-white">
        <form
          onSubmit={handleSignIn}
          className="w-1/2 p-10 flex flex-col items-center gap-5 rounded-3xl shadow-xl border border-gray-100"
        >
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Sign In
          </h1>

          <div className="w-full space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-sm uppercase">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-dark-red"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password" className="font-bold text-sm uppercase">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-dark-red"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-light-red text-brand-white font-bold py-3 px-5 rounded-full hover:bg-brand-dark-red transition-all duration-300 disabled:bg-gray-400"
          >
            {loading ? "Sign In..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
