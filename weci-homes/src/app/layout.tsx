import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthProvider } from "@/contexts/auth-context"
import { Toast } from "@/components/ui/toast"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: {
    default: "We Call It Homes - Your Stay, Elevated",
    template: "%s | We Call It Homes"
  },
  description: "Discover extraordinary properties and create unforgettable memories. We curate the finest homes for the most discerning travelers.",
  keywords: ["luxury rentals", "vacation homes", "premium properties", "boutique stays", "luxury travel"],
  authors: [{ name: "We Call It Homes" }],
  creator: "We Call It Homes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wecallithomes.com",
    siteName: "We Call It Homes",
    title: "We Call It Homes - Your Stay, Elevated",
    description: "Discover extraordinary properties and create unforgettable memories. We curate the finest homes for the most discerning travelers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "We Call It Homes"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "We Call It Homes - Your Stay, Elevated",
    description: "Discover extraordinary properties and create unforgettable memories.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
          <Toast />
        </AuthProvider>
      </body>
    </html>
  )
}