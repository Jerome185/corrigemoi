"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function LoginPage() {

  const supabase = createClient()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    console.log("LOGIN START")

    try {

      setLoading(true)

      setError("")

      const {
        data,
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("LOGIN DATA:", data)
      console.log("LOGIN ERROR:", error)

      if (error) {
        setError(error.message)
        return
      }

      window.location.href =
        "/"

    } catch (err) {

      console.log(err)

      setError(
        "Une erreur est survenue."
      )

    } finally {

      setLoading(false)
    }
  }

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        px-6
      "
    >

      <form
        onSubmit={handleLogin}
        className="
          w-full
          max-w-md
          bg-white
          p-8
          rounded-2xl
          shadow-sm
          border
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
          "
        >
          Connexion
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            autoComplete="email"
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
            autoComplete="current-password"
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
            type="submit"
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
              ? "Connexion..."
              : "Se connecter"}
          </button>

          <div className="text-center pt-2">

            <Link
            href="/signup"
            className="
            text-sm
            text-blue-600
            hover:underline
            "
          >
            Pas encore de compte ? Créer un compte
            </Link>

        </div>

          {error && (
            <div
              className="
                bg-red-50
                border
                border-red-200
                text-red-700
                p-4
                rounded-xl
              "
            >
              {error}
            </div>
          )}
        </div>
      </form>
    </main>
  )
}