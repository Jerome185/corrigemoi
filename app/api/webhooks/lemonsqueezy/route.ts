import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("LEMON WEBHOOK:", JSON.stringify(body, null, 2))

    const eventName = body.meta.event_name

    if (
      eventName === "subscription_created" ||
      eventName === "subscription_updated"
    ) {
      const subscription = body.data.attributes

      // ✅ récupération correcte du user_id
      const userId = subscription.custom_data?.user_id || null

      await supabase.from("subscriptions").upsert({
        lemon_subscription_id: String(body.data.id),
        user_id: userId,
        customer_email: subscription.user_email,
        status: subscription.status,
        variant_id: String(subscription.variant_id),
      })
    }

    if (eventName === "subscription_cancelled") {
      await supabase
        .from("subscriptions")
        .update({
          status: "cancelled",
        })
        .eq("lemon_subscription_id", String(body.data.id))
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("WEBHOOK ERROR:", error)

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