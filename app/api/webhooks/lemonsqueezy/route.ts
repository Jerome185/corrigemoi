import { NextResponse } from "next/server"

import crypto from "crypto"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    // RAW BODY
    const rawBody = await req.text()

    // SIGNATURE HEADER
    const signature =
      req.headers.get("x-signature")

    if (!signature) {
      return NextResponse.json(
        {
          error: "Signature manquante",
        },
        {
          status: 400,
        }
      )
    }

    // VERIFY SIGNATURE
    const secret =
      process.env
        .LEMON_SQUEEZY_WEBHOOK_SECRET!

    const digest = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex")

    const isValid =
      crypto.timingSafeEqual(
        Buffer.from(digest),
        Buffer.from(signature)
      )

    if (!isValid) {
      return NextResponse.json(
        {
          error: "Signature invalide",
        },
        {
          status: 401,
        }
      )
    }

    // PARSE JSON
    const body = JSON.parse(rawBody)

    console.log(
      "LEMON WEBHOOK:",
      JSON.stringify(body, null, 2)
    )

    const eventName =
      body.meta.event_name

    // CREATE / UPDATE
    if (
      eventName ===
        "subscription_created" ||
      eventName ===
        "subscription_updated"
    ) {
      const subscription =
        body.data.attributes

      const userId =
        subscription.custom_data
          ?.user_id || null

      await supabase
        .from("subscriptions")
        .upsert({
          lemon_subscription_id:
            String(body.data.id),

          user_id: userId,

          customer_email:
            subscription.user_email,

          status:
            subscription.status,

          variant_id: String(
            subscription.variant_id
          ),

          renews_at:
            subscription.renews_at,
        })
    }

    // CANCEL
    if (
      eventName ===
      "subscription_cancelled"
    ) {
      await supabase
        .from("subscriptions")
        .update({
          status: "cancelled",
        })
        .eq(
          "lemon_subscription_id",
          String(body.data.id)
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
        error: "Webhook error",
      },
      {
        status: 500,
      }
    )
  }
}