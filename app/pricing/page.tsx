import Link from "next/link"
import Image from "next/image"

export default function PricingPage() {
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
          "
        >
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
        </div>
      </header>

      {/* CONTENT */}
      <section className="px-6 py-16">

        <div className="max-w-md mx-auto">

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
              Corrige ton français sans limites
              et progresse plus rapidement.
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
                Futures fonctionnalités IA
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
                Passer Premium
            </a>

            {/* FOOTER */}
            <p
              className="
                text-center
                text-sm
                text-gray-400
                mt-5
              "
            >
              Paiement sécurisé via Lemon Squeezy
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

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