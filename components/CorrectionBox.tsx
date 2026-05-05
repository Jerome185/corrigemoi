"use client";

import { useState } from "react";

type Result = {
  corrected: string;
  natural: string;
  explanation: string;
};

export default function CorrectionBox() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCorrect = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/correct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5">
      <textarea
        className="w-full border p-3 rounded mb-3"
        rows={5}
        placeholder="Écris ton texte ici..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleCorrect}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Correction..." : "Corriger"}
      </button>

      {result && (
        <div className="mt-5 space-y-4">
          <div>
            <h3 className="font-semibold">✅ Correction</h3>
            <p>{result.corrected}</p>
          </div>

          <div>
            <h3 className="font-semibold">✨ Version naturelle</h3>
            <p>{result.natural}</p>
          </div>

          <div>
            <h3 className="font-semibold">📚 Explication</h3>
            <p>{result.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}