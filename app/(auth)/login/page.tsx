"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import Link from "next/link"

import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()

  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      setLoading(true)
      setError("")

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (error) {
        setError(error.message)
        return
      }

      router.push("/")

      router.refresh()

    } catch {
      setError("Une erreur est survenue.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Connexion
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Connexion..."
              : "Se connecter"}
          </button>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <p className="text-sm text-center text-gray-600">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline"
            >
              Créer un compte
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}