import { redirect } from "next/navigation"

import Navbar from "@/components/Navbar"

import SubscriptionStatus from "@/components/SubscriptionStatus"

import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = await createClient()

  // GET USER
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // PROTECT ROUTE
  if (!user) {
    redirect("/login")
  }

  // GET CORRECTIONS
  const { data: corrections } = await supabase
    .from("corrections")
    .select("*")
    .order("created_at", {
      ascending: false,
    })

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2">
              Dashboard
            </h1>

            <p className="text-gray-600">
              Retrouve l’historique de tes corrections.
            </p>
          </div>

          {/* SUBSCRIPTION STATUS */}
          <div className="mb-8">
            <SubscriptionStatus />
          </div>

          {/* EMPTY STATE */}
          {(!corrections ||
            corrections.length === 0) && (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <h2 className="text-2xl font-bold mb-3">
                Aucune correction
              </h2>

              <p className="text-gray-600">
                Commence à corriger du texte
                pour voir ton historique ici.
              </p>
            </div>
          )}

          {/* CORRECTIONS */}
          <div className="space-y-6">
            {corrections?.map(
              (correction) => (
                <div
                  key={correction.id}
                  className="bg-white rounded-xl shadow p-6"
                >

                  {/* DATE */}
                  <div className="mb-4 text-sm text-gray-500">
                    {new Date(
                      correction.created_at
                    ).toLocaleString(
                      "fr-FR"
                    )}
                  </div>

                  {/* ORIGINAL */}
                  <div className="mb-5">
                    <h2 className="font-bold text-gray-900 mb-2">
                      Texte original
                    </h2>

                    <p className="text-gray-700">
                      {
                        correction.original_text
                      }
                    </p>
                  </div>

                  {/* CORRECTED */}
                  <div className="mb-5">
                    <h2 className="font-bold text-green-600 mb-2">
                      Texte corrigé
                    </h2>

                    <p className="text-gray-700">
                      {
                        correction.corrected_text
                      }
                    </p>
                  </div>

                  {/* EXPLANATIONS */}
                  <div className="mb-5">
                    <h2 className="font-bold text-blue-600 mb-2">
                      Explications
                    </h2>

                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {correction.explanations?.map(
                        (
                          exp: string,
                          index: number
                        ) => (
                          <li key={index}>
                            {exp}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* IMPROVED */}
                  <div>
                    <h2 className="font-bold text-purple-600 mb-2">
                      Version améliorée
                    </h2>

                    <p className="text-gray-700">
                      {
                        correction.improved_text
                      }
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </>
  )
}