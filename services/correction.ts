import { CorrectionResponse } from "@/types/correction"

export async function correctText(
  text: string
): Promise<CorrectionResponse> {
  const response = await fetch("/api/correct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    throw new Error("Erreur lors de la correction")
  }

  return response.json()
}