export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-4">
          CorrigeMoi Premium
        </h1>

        <p className="text-gray-600 mb-8">
          Corrige ton français sans limites et progresse plus rapidement.
        </p>

        {/* PRICE */}
        <div className="mb-8">

          <div className="text-5xl font-bold">
            €4.99
          </div>

          <p className="text-gray-500 mt-2">
            par mois
          </p>
        </div>

        {/* FEATURES */}
        <div className="space-y-4 text-left mb-10">

          <div className="flex items-center gap-3">
            <span>✅</span>

            <span>
              Corrections illimitées
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>

            <span>
              Historique complet
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>

            <span>
              Français professionnel avancé
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>

            <span>
              Futures fonctionnalités IA
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>

            <span>
              Support prioritaire
            </span>
          </div>
        </div>

        {/* CTA */}
        <a
          href="https://corrigemoi.lemonsqueezy.com/checkout/buy/231fbe99-b197-4fa7-9eb8-8c0bb9ae6bcd"
          target="_blank"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
        >
          Passer Premium
        </a>

        {/* SMALL TEXT */}
        <p className="text-xs text-gray-400 mt-6">
          Paiement sécurisé via Lemon Squeezy.
        </p>
      </div>
    </main>
  )
}