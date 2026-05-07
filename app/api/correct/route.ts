import { NextResponse } from "next/server"

import { openai } from "@/lib/openai"

import { buildCorrectionPrompt } from "@/lib/prompts"

import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {

    // BODY
    const body = await req.json()

    const text = body.text?.trim()

    const mode =
      body.mode || "whatsapp"

    // VALIDATION
    if (!text) {
      return NextResponse.json(
        {
          error: "Texte requis",
        },
        {
          status: 400,
        }
      )
    }

    // LIMIT
    if (text.length > 1000) {
      return NextResponse.json(
        {
          error: "Texte trop long",
        },
        {
          status: 400,
        }
      )
    }

    // SUPABASE
    const supabase =
      await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    let profile = null

    // PROFILE
    if (user) {

      const { data } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

      profile = data

      // RESET DAILY USAGE
      const today = new Date()
        .toISOString()
        .split("T")[0]

      if (
        profile &&
        profile.usage_date !== today
      ) {

        await supabase
          .from("profiles")
          .update({
            daily_usage: 0,
            usage_date: today,
          })
          .eq("id", user.id)

        profile.daily_usage = 0
      }

      // FREE LIMIT
      if (
        profile &&
        profile.subscription_status ===
          "free" &&
        profile.daily_usage >= 10
      ) {

        return NextResponse.json(
          {
            error:
              "Limite gratuite atteinte aujourd’hui.",
          },
          {
            status: 403,
          }
        )
      }
    }

    // PROMPT
    const prompt =
      buildCorrectionPrompt(
        text,
        mode
      )

    // OPENAI
    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,
      })

    // RAW CONTENT
    const rawContent =
      completion.choices[0]?.message
        ?.content

    if (!rawContent) {
      throw new Error("Réponse vide")
    }

    // JSON PARSE
    let parsed

    try {

      parsed =
        JSON.parse(rawContent)

    } catch {

      throw new Error(
        "JSON invalide reçu depuis OpenAI"
      )
    }

    // SAVE
    if (user) {

      await supabase
        .from("corrections")
        .insert({
          user_id: user.id,

          original_text: text,

          corrected_text:
            parsed.corrected,

          explanations:
            parsed.explanations,

          improved_text:
            parsed.improved,

          mode,
        })

      // UPDATE USAGE
      await supabase
        .from("profiles")
        .update({
          daily_usage:
            (profile?.daily_usage || 0) + 1,
        })
        .eq("id", user.id)
    }

    return NextResponse.json(parsed)

  } catch (error) {

    console.error(
      "API ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue pendant la correction.",
      },
      {
        status: 500,
      }
    )
  }
}