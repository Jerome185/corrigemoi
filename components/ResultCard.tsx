type ResultCardProps = {
  title: string
  content: string | string[]
  color: "green" | "blue" | "emerald"
}

export default function ResultCard({
  title,
  content,
  color,
}: ResultCardProps) {

  const colorClasses = {
    green:
      "border-green-200 bg-white",

    blue:
      "border-blue-200 bg-white",

    emerald:
      "border-emerald-200 bg-emerald-50",
  }

  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm ${colorClasses[color]}`}
    >
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      {Array.isArray(content) ? (

        <ul className="space-y-3 list-disc pl-5 text-gray-700 text-lg">
          {content.map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>

      ) : (

        <p className="text-xl text-gray-800 leading-9">
          {content}
        </p>

      )}
    </div>
  )
}