"use client"

export default function CheckoutButton() {
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.com",
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error(data)
        alert("Erreur création checkout")
      }
    } catch (error) {
      console.error(error)
      alert("Erreur serveur")
    }
  }

  return (
    <button
      onClick={handleCheckout}
      className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
    >
      Tester abonnement
    </button>
  )
}