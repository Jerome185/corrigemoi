import Navbar from "@/components/Navbar"
import HomePage from "@/components/HomePage"
import CheckoutButton from "../components/CheckoutButton"

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="flex justify-center mt-6">
        <CheckoutButton />
      </div>

      <HomePage />
    </>
  )
}