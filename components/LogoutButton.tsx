"use client"

import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()

    await supabase.auth.signOut()

    router.push("/")

    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition font-medium"
    >
      Déconnexion
    </button>
  )
}