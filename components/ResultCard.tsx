interface ResultCardProps {
  corrected: string
  explanations: string[]
  improved: string
}

export default function ResultCard({
  corrected,
  explanations,
  improved,
}: ResultCardProps) {
  return (
    <div className="w-full max-w-2xl mt-6 space-y-6">
      
      {/* CORRECTION */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-green-600 font-bold text-xl mb-3">
          ✅ Texte corrigé
        </h2>

        <p className="text-gray-800 text-lg leading-relaxed">
          {corrected}
        </p>
      </div>

      {/* EXPLANATIONS */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-blue-600 font-bold text-xl mb-3">
          💡 Explications
        </h2>

        <ul className="list-disc pl-5 space-y-3 text-gray-700">
          {explanations.map((exp, index) => (
            <li key={index}>
              {exp}
            </li>
          ))}
        </ul>
      </div>

      {/* IMPROVED VERSION */}
      <div className="bg-green-50 rounded-xl shadow p-6 border border-green-100">
        <h2 className="text-green-700 font-bold text-xl mb-3">
          ✨ Version améliorée
        </h2>

        <p className="text-gray-800 text-lg leading-relaxed">
          {improved}
        </p>
      </div>
    </div>
  )
}