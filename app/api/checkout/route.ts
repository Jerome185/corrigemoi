import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || !user.email) {
      return NextResponse.json(
        {
          error: "Utilisateur non connecté",
        },
        {
          status: 401,
        }
      )
    }

    const response = await fetch(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
        body: JSON.stringify({
          data: {
            type: "checkouts",
            attributes: {
              checkout_data: {
                email: user.email,
              },
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: process.env.LEMON_SQUEEZY_STORE_ID,
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: process.env.LEMON_SQUEEZY_VARIANT_ID,
                },
              },
            },
          },
        }),
      }
    )

    const data = await response.json()

    console.log("LEMON RESPONSE:", data)

    return NextResponse.json({
      url: data.data.attributes.url,
    })
  } catch (error) {
    console.error("CHECKOUT ERROR:", error)

    return NextResponse.json(
      {
        error: "Erreur création checkout",
      },
      {
        status: 500,
      }
    )
  }
}