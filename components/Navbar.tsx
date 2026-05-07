import Link from "next/link"

import { createClient } from "@/lib/supabase/server"

import LogoutButton from "./LogoutButton"

export default async function Navbar() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="CorrigeMoi"
            className="h-10 w-auto"
          />

          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-900">
              CorrigeMoi
            </span>

            <span className="text-xs text-gray-500">
              par Français Impeccable
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-6">

          <Link
            href="/pricing"
            className="text-gray-600 hover:text-black transition font-medium"
          >
            Tarifs
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-black transition font-medium"
              >
                Dashboard
              </Link>

              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium"
            >
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}