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

      const email = subscription.user_email

      console.log("EMAIL FROM LEMON:", email)

      // Recherche utilisateur Supabase via email
      const { data: usersData, error: userError } =
        await supabase.auth.admin.listUsers()

      if (userError) {
        console.error("USER FETCH ERROR:", userError)
      }

      const matchedUser =
        usersData?.users.find(
          (u) => u.email?.toLowerCase() === email?.toLowerCase()
        ) || null

      console.log("MATCHED USER:", matchedUser)

      const { data, error } = await supabase
        .from("subscriptions")
        .upsert(
          {
            lemon_subscription_id: String(body.data.id),
            user_id: matchedUser?.id || null,
            customer_email: email,
            status: subscription.status,
            variant_id: String(subscription.variant_id),
          },
          {
            onConflict: "lemon_subscription_id",
          }
        )
        .select()

      if (error) {
        console.error("UPSERT ERROR:", error)
      }

      console.log("UPSERT RESULT:", data)
    }

    if (eventName === "subscription_cancelled") {
      const { error } = await supabase
        .from("subscriptions")
        .update({
          status: "cancelled",
        })
        .eq("lemon_subscription_id", String(body.data.id))

      if (error) {
        console.error("CANCEL ERROR:", error)
      }
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