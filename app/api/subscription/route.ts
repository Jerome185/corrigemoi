import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        {
          error: "Non autorisé",
        },
        {
          status: 401,
        }
      )
    }

    const { data: subscription, error } =
      await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle()

    if (error) {
      console.error(
        "SUBSCRIPTION ERROR:",
        error
      )

      return NextResponse.json(
        {
          error:
            "Erreur récupération abonnement",
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json({
      premium: !!subscription,

      subscription:
        subscription || null,
    })
  } catch (error) {
    console.error(
      "API SUBSCRIPTION ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Erreur serveur",
      },
      {
        status: 500,
      }
    )
  }
}