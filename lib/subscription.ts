import { createClient } from "@/lib/supabase/server"

export async function isPremiumUser(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle()

  if (error) {
    console.error("PREMIUM CHECK ERROR:", error)
    return false
  }

  return !!data
}