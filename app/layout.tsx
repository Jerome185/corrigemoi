import "./globals.css"

export const metadata = {
  title: "CorrigeMoi",
  description: "Écris un français impeccable",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}