"use client";

import Image from "next/image";

export default function SignInPage() {
  return (
    <main className="w-full h-screen grid grid-cols-2">
      <div
        className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero.webp')" }}
      >
        <div className="absolute inset-0 bg-brand-black/50"></div>
        <div className="w-1/2 flex flex-col items-center gap-5 p-10 bg-brand-white/10 border border-brand-white/50 rounded-3xl backdrop-blur-sm shadow-md">
          <Image src="/ppn.webp" alt="Logo" width={200} height={200} />
          <h1 className="text-5xl font-bold text-brand-white tracking-wider uppercase">
            Pola Pedia
            <br />
            Nusantara
          </h1>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <form className="w-1/2 p-10 flex flex-col items-center gap-5 rounded-3xl shadow-md">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <div className="w-full space-y-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="border border-brand-black/50 rounded-lg px-2 py-1"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="border border-brand-black/50 rounded-lg px-2 py-1"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-brand-dark-red text-brand-white font-bold py-2 px-5 rounded-full hover:bg-brand-light-red transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
