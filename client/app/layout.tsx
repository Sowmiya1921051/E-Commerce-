import  './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Dashboard - Built with jdoodle.ai',
  description: 'Built with jdoodle.ai - A complete e-commerce product management dashboard',
  openGraph: {
    title: 'E-Commerce Dashboard - Built with jdoodle.ai',
    description: 'Built with jdoodle.ai - A complete e-commerce product management dashboard',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlLWNvbW1lcmNlJTIwYWRtaW4lMjBkYXNoYm9hcmQlMjB1aXxlbnwwfHx8fDE3NDU2NDYyODN8MA&ixlib=rb-4.0.3',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
 