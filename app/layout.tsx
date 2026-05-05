import "./globals.css"

export const metadata = {
  title: "CorrigeMoi",
  description: "Écris un français impeccable"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        
        {/* HEADER */}
        <header className="w-full border-b bg-white">
          <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
            
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="logo" className="h-8" />
              <span className="font-semibold text-lg">CorrigeMoi</span>
            </div>

            <span className="text-sm text-gray-500">
              par Français Impeccable
            </span>

          </div>
        </header>

        {children}

      </body>
    </html>
  )
}