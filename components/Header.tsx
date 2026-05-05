"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="CorrigeMoi"
            width={36}
            height={36}
          />
          <span className="font-semibold text-lg">
            CorrigeMoi
          </span>
        </div>

        <div className="text-sm text-gray-500 hidden md:block">
          par Français Impeccable
        </div>

      </div>
    </header>
  );
}