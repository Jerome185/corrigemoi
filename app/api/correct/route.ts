import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { text } = await req.json()

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
Corrige le texte en français.

Réponds STRICTEMENT en JSON :
{
  "corrected": "...",
  "explanations": ["...", "..."],
  "improved": "..."
}
`
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    })

    const data = await response.json()

    // 🔥 DEBUG (important)
    console.log("OPENAI RAW:", data)

    const content = data?.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: "Réponse vide OpenAI" },
        { status: 500 }
      )
    }

    const match = content.match(/\{[\s\S]*\}/)

    if (!match) {
      console.log("INVALID FORMAT:", content)
      return NextResponse.json(
        { error: "Format JSON invalide" },
        { status: 500 }
      )
    }

    try {
      const parsed = JSON.parse(match[0])

      return NextResponse.json({
        result: parsed
      })

    } catch (parseError) {
      console.log("JSON PARSE ERROR:", match[0])
      return NextResponse.json(
        { error: "Erreur parsing JSON" },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("API ERROR:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}