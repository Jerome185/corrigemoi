import "./globals.css"

export const metadata = {
  title: "CorrigeMoi",

  description:
    "Écris un français impeccable instantanément.",

  openGraph: {
    title: "CorrigeMoi",

    description:
      "Écris un français impeccable instantanément.",

    url: "https://corrigemoi.vercel.app",

    siteName: "CorrigeMoi",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "CorrigeMoi",
      },
    ],

    locale: "fr_FR",

    type: "website",
  },
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