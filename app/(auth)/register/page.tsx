"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import Link from "next/link"

import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const router = useRouter()

  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")

  const handleRegister = async () => {
    try {
      setLoading(true)
      setError("")

      // CREATE USER
      const { error } =
        await supabase.auth.signUp({
          email,
          password,
        })

      if (error) {
        setError(error.message)
        return
      }

      // GET USER
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // CREATE PROFILE
      if (user) {
        await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
        })
      }

      router.push("/login")

    } catch {
      setError("Une erreur est survenue.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        
        <h1 className="text-3xl font-bold mb-6 text-center">
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
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Création..."
              : "Créer mon compte"}
          </button>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <p className="text-sm text-center text-gray-600">
            Déjà inscrit ?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline"
            >
              Connexion
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}