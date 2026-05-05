"use client"

import { useState } from "react"

export default function Home() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!text.trim()) return

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const res = await fetch("/api/correct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      })

      if (!res.ok) {
        throw new Error("Erreur API")
      }

      const data = await res.json()

      // 🔥 maintenant on reçoit déjà un objet JSON
      setResult(data.result)

    } catch (err) {
      setError("Une erreur est survenue.")
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10">

      {/* HERO */}
      <div className="text-center max-w-2xl mb-10">
        <img 
          src="/logo.png" 
          alt="logo" 
          className="h-28 md:h-32 mx-auto mb-6 drop-shadow-md"
        />
        <h1 className="text-4xl font-bold mb-4">
          Écris un français impeccable, instantanément
        </h1>
        <p className="text-gray-600">
          Corrige tes messages, améliore ton français et parle naturellement.
        </p>
      </div>

      {/* INPUT BOX */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écris ton texte ici..."
          className="w-full border p-4 rounded mb-4 bg-white text-black"
          rows={6}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Correction en cours..." : "Corriger mon texte"}
        </button>

      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 mt-6">{error}</p>
      )}

      {/* RESULT */}
      {result && (
        <div className="w-full max-w-2xl mt-8 space-y-6">

          {/* TEXTE CORRIGÉ */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-2 text-green-600">
              Texte corrigé
            </h2>
            <p className="whitespace-pre-wrap">
              {result.corrected}
            </p>
          </div>

          {/* EXPLICATIONS */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-2 text-blue-600">
              Explications
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              {result.explanations?.map((exp: string, i: number) => (
                <li key={i}>{exp}</li>
              ))}
            </ul>
          </div>

          {/* VERSION AMÉLIORÉE */}
          <div className="bg-green-50 p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-2 text-green-700">
              Version améliorée
            </h2>
            <p className="whitespace-pre-wrap">
              {result.improved}
            </p>
          </div>

        </div>
      )}

      {/* FEATURES */}
      <div className="mt-16 max-w-5xl grid md:grid-cols-3 gap-6 text-center">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Correction instantanée</h3>
          <p className="text-gray-600 text-sm">
            Corrige tes fautes en temps réel avec une IA avancée.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Explications claires</h3>
          <p className="text-gray-600 text-sm">
            Comprends tes erreurs et progresse rapidement.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Français naturel</h3>
          <p className="text-gray-600 text-sm">
            Améliore ton style pour parler comme un natif.
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="mt-16 text-center text-gray-500 text-sm pb-10">
        © {new Date().getFullYear()} CorrigeMoi — Tous droits réservés
      </footer>

    </main>
  )
}