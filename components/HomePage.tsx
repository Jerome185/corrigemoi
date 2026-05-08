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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] =
    useState<CorrectionResponse | null>(null)

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
    <main className="min-h-screen bg-[#f7f7f8] px-6 py-12">

      {/* HERO */}
      <div className="max-w-3xl mx-auto text-center mb-10">

        <img
          src="/logo.png"
          alt="logo"
          className="h-48 mx-auto mb-8 drop-shadow-md"
        />

        <h1 className="text-4xl md:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
          Écris un français impeccable,
          instantanément
        </h1>

        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Transforme tes messages en
          français naturel et professionnel.
        </p>
      </div>

      {/* INPUT */}
      <div className="
        max-w-3xl
        mx-auto
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        p-5
      ">

        <textarea
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Écris ton texte ici..."
          rows={6}
          maxLength={1000}
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-4
            text-base
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            transition
          "
        />

        {/* COUNTER */}
        <div className="text-right text-sm text-gray-400 mt-2">
          {text.length} / 1000 caractères
        </div>

        {/* MODES */}
        <div className="flex gap-3 mt-5 flex-wrap">

          <button
            onClick={() =>
              setMode("whatsapp")
            }
            className={`
              px-4 py-2 rounded-full
              border text-sm font-medium
              transition
              ${
                mode === "whatsapp"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            WhatsApp
          </button>

          <button
            onClick={() =>
              setMode("email_pro")
            }
            className={`
              px-4 py-2 rounded-full
              border text-sm font-medium
              transition
              ${
                mode === "email_pro"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            Email professionnel
          </button>

          <button
            onClick={() =>
              setMode("francais_naturel")
            }
            className={`
              px-4 py-2 rounded-full
              border text-sm font-medium
              transition
              ${
                mode === "francais_naturel"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            Français naturel
          </button>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-full
            mt-5
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3.5
            rounded-xl
            font-semibold
            text-base
            transition
            disabled:opacity-50
          "
        >
          {loading
            ? "Correction..."
            : "Corriger mon texte"}
        </button>

        {/* ERROR */}
        {error && (
          <div className="
            mt-5
            bg-red-50
            border border-red-200
            text-red-700
            p-4
            rounded-xl
          ">
            {error}
          </div>
        )}
      </div>

      {/* FEATURES */}
      <div className="
        max-w-6xl
        mx-auto
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mt-12
      ">

        <div className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          p-6
          shadow-sm
          text-center
        ">
          <h3 className="text-2xl font-bold mb-3">
            Correction instantanée
          </h3>

          <p className="text-gray-600">
            Corrige tes fautes en temps réel
            avec une IA intelligente.
          </p>
        </div>

        <div className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          p-6
          shadow-sm
          text-center
        ">
          <h3 className="text-2xl font-bold mb-3">
            Explications claires
          </h3>

          <p className="text-gray-600">
            Comprends tes erreurs et
            progresse rapidement.
          </p>
        </div>

        <div className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          p-6
          shadow-sm
          text-center
        ">
          <h3 className="text-2xl font-bold mb-3">
            Français naturel
          </h3>

          <p className="text-gray-600">
            Améliore ton style pour parler
            comme un natif.
          </p>
        </div>
      </div>

      {/* RESULTS */}
      {result && (
        <div className="
          max-w-3xl
          mx-auto
          mt-10
          space-y-6
        ">
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