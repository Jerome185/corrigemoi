"use client"

import { useState } from "react"

import ResultCard from "./ResultCard"

import { correctText } from "@/services/correction"

export default function HomePage() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState<{
    corrected: string
    explanations: string[]
    improved: string
  } | null>(null)

  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!text.trim()) return

    try {
      setLoading(true)
      setError("")
      setResult(null)

      const data = await correctText(text)

      setResult(data)

    } catch (err) {
      setError("Une erreur est survenue.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-16">

      {/* HERO */}
      <div className="text-center max-w-2xl mb-10">

        <img
          src="/logo.png"
          alt="Logo"
          className="h-44 md:h-48 mx-auto mb-6 drop-shadow-md"
        />

        <h1 className="text-3xl md:text-3xl font-bold mb-4">
          Écris un français impeccable, instantanément
        </h1>

        <p className="text-gray-600 text-lg">
          Transforme tes messages en français naturel et professionnel.
        </p>
      </div>

      {/* INPUT BOX */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écris ton texte ici..."
          className="w-full border p-4 rounded-lg mb-2 bg-white text-black resize-none"
          rows={6}
          maxLength={1000}
        />

        {/* CHARACTER COUNT */}
        <div className="flex justify-end mb-4">
          <span className="text-sm text-gray-500">
            {text.length} / 1000 caractères
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading
            ? "✨ Analyse en cours..."
            : "Corriger mon texte"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}

      {/* RESULT */}
      {result && (
        <ResultCard
          corrected={result.corrected}
          explanations={result.explanations}
          improved={result.improved}
        />
      )}

      {/* QUICK EXAMPLES */}
      <div className="flex flex-wrap gap-3 mt-10 justify-center">

        <button
          onClick={() =>
            setText("moi pas comprendre ce document")
          }
          className="bg-white shadow px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition"
        >
          WhatsApp
        </button>

        <button
          onClick={() =>
            setText(
              "bonjour monsieur je vous envoie mon cv merci"
            )
          }
          className="bg-white shadow px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition"
        >
          Email professionnel
        </button>

        <button
          onClick={() =>
            setText(
              "je vais prend le bus demain matin"
            )
          }
          className="bg-white shadow px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition"
        >
          Français naturel
        </button>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 w-full max-w-6xl">

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="font-bold text-xl mb-2">
            Correction instantanée
          </h3>

          <p className="text-gray-600">
            Corrige tes fautes en temps réel avec une IA intelligente.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="font-bold text-xl mb-2">
            Explications claires
          </h3>

          <p className="text-gray-600">
            Comprends tes erreurs et progresse rapidement.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="font-bold text-xl mb-2">
            Français naturel
          </h3>

          <p className="text-gray-600">
            Améliore ton style pour parler comme un natif.
          </p>
        </div>
      </div>
    </main>
  )
}