"use client"

import { useState } from "react"

import ResultCard from "./ResultCard"

type CorrectionResponse = {
  corrected: string
  explanations: string[]
  improved: string
}

export default function HomePage() {

  const [text, setText] = useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const [result, setResult] =
    useState<CorrectionResponse | null>(
      null
    )

  const [mode, setMode] =
    useState("whatsapp")

  const handleSubmit = async () => {

    if (!text.trim()) return

    try {

      setLoading(true)

      setError("")

      setResult(null)

      const response = await fetch(
        "/api/correct",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            text,
            mode,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.error ||
            "Une erreur est survenue."
        )

        return
      }

      setResult(data)

    } catch {

      setError(
        "Une erreur est survenue."
      )

    } finally {

      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">

      {/* HERO */}
      <div className="max-w-3xl mx-auto text-center mb-10">

        <img
          src="/logo.png"
          alt="logo"
          className="h-44 mx-auto mb-6 drop-shadow-md"
        />

        <h1 className="text-5xl font-bold mb-4">
          Écris un français impeccable,
          instantanément
        </h1>

        <p className="text-xl text-gray-600">
          Transforme tes messages en
          français naturel et professionnel.
        </p>
      </div>

      {/* INPUT */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">

        <textarea
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Écris ton texte ici..."
          rows={8}
          maxLength={1000}
          className="w-full border rounded-xl p-4 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* COUNTER */}
        <div className="text-right text-sm text-gray-500 mt-2">
          {text.length} / 1000 caractères
        </div>

        {/* MODES */}
        <div className="flex gap-3 mt-6 flex-wrap">

          <button
            onClick={() =>
              setMode("whatsapp")
            }
            className={`px-4 py-2 rounded-full border transition ${
              mode === "whatsapp"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            WhatsApp
          </button>

          <button
            onClick={() =>
              setMode("email_pro")
            }
            className={`px-4 py-2 rounded-full border transition ${
              mode === "email_pro"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Email Pro
          </button>

          <button
            onClick={() =>
              setMode(
                "francais_naturel"
              )
            }
            className={`px-4 py-2 rounded-full border transition ${
              mode ===
              "francais_naturel"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Français naturel
          </button>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition"
        >
          {loading
            ? "Correction..."
            : "Corriger mon texte"}
        </button>

        {/* ERROR */}
        {error && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-xl">
            {error}
          </div>
        )}
      </div>

      {/* RESULTS */}
      {result && (
        <div className="max-w-3xl mx-auto mt-10 space-y-6">

          <ResultCard
            title="✅ Texte corrigé"
            content={result.corrected}
            color="green"
          />

          <ResultCard
            title="💡 Explications"
            content={result.explanations}
            color="blue"
          />

          <ResultCard
            title="✨ Version améliorée"
            content={result.improved}
            color="emerald"
          />
        </div>
      )}
    </main>
  )
}