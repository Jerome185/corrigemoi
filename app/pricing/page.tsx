import Link from "next/link"
import Image from "next/image"

import { createClient } from "@/lib/supabase/server"

export default async function PricingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div
          className="
            max-w-6xl
            mx-auto
            px-6
            py-4
            flex
            items-center
            justify-between
          "
        >

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 w-fit"
          >
            <Image
              src="/logo.png"
              alt="CorrigeMoi"
              width={38}
              height={38}
            />

            <div>
              <div className="font-bold text-lg leading-none">
                CorrigeMoi
              </div>

              <div className="text-sm text-gray-500">
                par Français Impeccable
              </div>
            </div>
          </Link>

          {/* NAVIGATION */}
          <div className="flex items-center gap-3">

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="
                    text-sm
                    font-medium
                    text-gray-700
                    hover:text-black
                    transition
                  "
                >
                  Connexion
                </Link>

                <Link
                  href="/signup"
                  className="
                    bg-black
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    text-sm
                    font-medium
                    hover:opacity-90
                    transition
                  "
                >
                  Créer un compte
                </Link>
              </>
            ) : (
              <>
                <div
                  className="
                    hidden
                    sm:flex
                    items-center
                    gap-2
                    bg-green-100
                    text-green-700
                    px-3
                    py-2
                    rounded-xl
                    text-sm
                    font-medium
                  "
                >
                  ✓ Connecté
                </div>

                <Link
                  href="/dashboard"
                  className="
                    bg-black
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    text-sm
                    font-medium
                    hover:opacity-90
                    transition
                  "
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="px-6 py-16">

        <div className="max-w-lg mx-auto">

          {/* BADGE */}
          <div className="flex justify-center mb-5">
            <div
              className="
                bg-blue-100
                text-blue-700
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
              "
            >
              🔥 Le plus populaire
            </div>
          </div>

          {/* CARD */}
          <div
            className="
              bg-white
              rounded-3xl
              border
              shadow-sm
              p-8
            "
          >

            {/* TITLE */}
            <h1
              className="
                text-4xl
                font-bold
                text-center
                leading-tight
                mb-4
              "
            >
              CorrigeMoi Premium
            </h1>

            <p
              className="
                text-gray-600
                text-center
                mb-8
                text-base
              "
            >
              Écris un français professionnel,
              naturel et impeccable sans limite.
            </p>

            {/* PRICE */}
            <div className="text-center mb-8">

              <div
                className="
                  text-5xl
                  font-extrabold
                  tracking-tight
                "
              >
                €4.99
              </div>

              <div className="text-gray-500 mt-1">
                par mois
              </div>
            </div>

            {/* FEATURES */}
            <div className="space-y-4 mb-8">

              <Feature>
                Corrections illimitées
              </Feature>

              <Feature>
                Historique complet
              </Feature>

              <Feature>
                Français professionnel avancé
              </Feature>

              <Feature>
                Explications intelligentes IA
              </Feature>

              <Feature>
                Futures fonctionnalités premium
              </Feature>

              <Feature>
                Support prioritaire
              </Feature>
            </div>

            {/* CTA */}
            <a
              href="https://corrigemoi.lemonsqueezy.com/checkout/buy/231fbe99-b197-4fa7-9eb8-8c0bb9ae6bcd"
              target="_blank"
              rel="noopener noreferrer"
              className="
                block
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-4
                rounded-2xl
                font-semibold
                text-center
                transition
              "
            >
              Débloquer Premium
            </a>

            {/* GUARANTEE */}
            <div
              className="
                mt-5
                text-center
                text-sm
                text-gray-500
                leading-relaxed
              "
            >
              ✅ Annule ton abonnement à tout moment
              depuis ton espace client Lemon Squeezy.
            </div>

            {/* PAYMENT INFO */}
            <p
              className="
                text-center
                text-sm
                text-gray-400
                mt-3
              "
            >
              Paiement sécurisé via Lemon Squeezy
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-10 space-y-4">

            <Faq
              question="Puis-je annuler mon abonnement ?"
              answer="Oui. Tu peux annuler à tout moment sans engagement."
            />

            <Faq
              question="Mes données sont-elles sécurisées ?"
              answer="Oui. Les données sont sécurisées via Supabase et les paiements sont gérés par Lemon Squeezy."
            />

            <Faq
              question="Y a-t-il une limite de corrections ?"
              answer="Non. Le plan Premium permet des corrections illimitées."
            />

            <Faq
              question="Puis-je utiliser CorrigeMoi sur mobile ?"
              answer="Oui. CorrigeMoi fonctionne sur ordinateur, tablette et mobile."
            />
          </div>
        </div>
      </section>
    </main>
  )
}

/* FEATURE */
function Feature({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">

      <span className="text-green-500 text-lg">
        ✓
      </span>

      <span className="text-gray-800">
        {children}
      </span>
    </div>
  )
}

/* FAQ */
function Faq({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-5
      "
    >

      <h3
        className="
          font-semibold
          mb-2
        "
      >
        {question}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {answer}
      </p>
    </div>
  )
}