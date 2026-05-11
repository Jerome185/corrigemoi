"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {

  const supabase = createClient()

  const router = useRouter()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const handleSignup = async () => {

    try {

      setLoading(true)
      setError("")

      const { error } =
        await supabase.auth.signUp({
          email,
          password,
        })

      if (error) {
        setError(error.message)
        return
      }

      router.push("/dashboard")

    } catch {

      setError(
        "Une erreur est survenue."
      )

    } finally {

      setLoading(false)
    }
  }

  return (
    <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      px-6
    ">

      <div className="
        w-full
        max-w-md
        bg-white
        p-8
        rounded-2xl
        shadow-sm
        border
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-6
          text-center
        ">
          Créer un compte
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-4
              rounded-xl
              font-semibold
              transition
            "
          >
            {loading
              ? "Création..."
              : "Créer mon compte"}
          </button>
            <div className="text-center pt-2">

            <Link
            href="/login"
            className="
            text-sm
            text-blue-600
            hover:underline
            "
            >
                Déjà un compte ? Se connecter
            </Link>

</div>
          {error && (
            <div className="
              bg-red-50
              border
              border-red-200
              text-red-700
              p-4
              rounded-xl
            ">
              {error}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}