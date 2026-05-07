import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {

    const body = await req.json()

    console.log("LEMON WEBHOOK:", body)

    const eventName = body.meta?.event_name

    // PAYMENT SUCCESS
    if (
      eventName ===
      "subscription_created"
    ) {

      const email =
        body.data?.attributes?.user_email

      const customerId =
        body.data?.attributes?.customer_id

      const orderId =
        body.data?.attributes?.order_id

      if (!email) {
        return NextResponse.json({
          success: false,
        })
      }

      const supabase =
        await createClient()

      // FIND PROFILE
      const { data: profile } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("email", email)
          .single()

      if (!profile) {
        return NextResponse.json({
          success: false,
        })
      }

      // UPDATE PREMIUM
      await supabase
        .from("profiles")
        .update({
          subscription_status:
            "premium",

          lemonsqueezy_customer_id:
            String(customerId),

          lemonsqueezy_order_id:
            String(orderId),
        })
        .eq("id", profile.id)

      console.log(
        "USER UPGRADED TO PREMIUM"
      )
    }

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.error(error)

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