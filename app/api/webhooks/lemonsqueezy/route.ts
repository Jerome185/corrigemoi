import { NextResponse } from "next/server"

import crypto from "crypto"

import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {

  try {

    // RAW BODY
    const body = await req.text()

    // SIGNATURE
    const signature =
      req.headers.get("x-signature")

    // SECRET
    const secret =
      process.env.LEMONSQUEEZY_WEBHOOK_SECRET!

    // VERIFY SIGNATURE
    const digest = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex")

    if (digest !== signature) {

      console.log("INVALID SIGNATURE")

      return NextResponse.json(
        {
          error: "Invalid signature",
        },
        {
          status: 401,
        }
      )
    }

    // PARSE JSON
    const payload = JSON.parse(body)

    console.log(
      "LEMON WEBHOOK:",
      payload
    )

    const eventName =
      payload.meta?.event_name

    const data =
      payload.data

    const attributes =
      data?.attributes

    const customData =
      attributes?.custom_data || {}

    const userId =
      customData?.user_id

    const supabase =
      await createClient()

    // =========================
    // SUB CREATED / UPDATED
    // =========================

    if (
      eventName ===
        "subscription_created" ||

      eventName ===
        "subscription_updated"
    ) {

      if (!userId) {

        console.log(
          "NO USER ID"
        )

        return NextResponse.json({
          success: false,
        })
      }

      await supabase
        .from("profiles")
        .update({

          subscription_status:
            "premium",

          lemonsqueezy_customer_id:
            String(
              attributes.customer_id
            ),

          lemonsqueezy_order_id:
            String(
              attributes.order_id
            ),

          lemonsqueezy_subscription_id:
            String(data.id),
        })
        .eq("id", userId)

      console.log(
        "USER UPGRADED"
      )
    }

    // =========================
    // SUB CANCELLED
    // =========================

    if (
      eventName ===
      "subscription_cancelled"
    ) {

      await supabase
        .from("profiles")
        .update({
          subscription_status:
            "free",
        })
        .eq(
          "lemonsqueezy_subscription_id",
          String(data.id)
        )

      console.log(
        "SUB CANCELLED"
      )
    }

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.error(
      "WEBHOOK ERROR:",
      error
    )

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    )
  }
}