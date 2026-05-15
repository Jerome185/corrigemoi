"use client"

import { useEffect, useState } from "react"

type SubscriptionData = {
  premium: boolean

  subscription: {
    status: string
    renews_at?: string
  } | null
}

export default function SubscriptionStatus() {
  const [loading, setLoading] =
    useState(true)

  const [data, setData] =
    useState<SubscriptionData | null>(
      null
    )

  useEffect(() => {
    async function loadSubscription() {
      try {
        const response = await fetch(
          "/api/subscription"
        )

        const json =
          await response.json()

        setData(json)
      } catch (error) {
        console.error(
          "SUBSCRIPTION FETCH ERROR:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    loadSubscription()
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl border p-4 bg-white shadow-sm">
        Chargement abonnement...
      </div>
    )
  }

  // UTILISATEUR GRATUIT
  if (!data?.premium) {
    return (
      <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">
          Compte gratuit
        </h2>

        <p className="text-sm text-gray-700 mb-4">
          Vous êtes actuellement limité
          à 10 corrections par jour.
        </p>

        <a
          href="/premium"
          className="inline-flex items-center rounded-xl bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          Débloquer Premium
        </a>
      </div>
    )
  }

  // UTILISATEUR PREMIUM
  return (
    <div className="rounded-2xl border border-green-300 bg-green-50 p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">
        Premium actif
      </h2>

      <p className="text-sm text-gray-700 mb-2">
        Corrections illimitées
        activées.
      </p>

      {data.subscription
        ?.renews_at && (
        <p className="text-sm text-gray-600">
          Renouvellement :{" "}
          {new Date(
            data.subscription.renews_at
          ).toLocaleDateString(
            "fr-FR"
          )}
        </p>
      )}
    </div>
  )
}