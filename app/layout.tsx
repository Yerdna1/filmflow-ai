import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'FilmFlow AI - Slovak Drama Scene Generator',
  description: 'Generujte filmové scény, storyboardy a dialógy s pomocou AI. Slovenská lokalizácia.',
  keywords: ['AI', 'film', 'video generation', 'drama', 'Slovak', 'storyboard'],
  authors: [{ name: 'FilmFlow AI Team' }],
  openGraph: {
    title: 'FilmFlow AI - Slovak Drama Scene Generator',
    description: 'Generujte filmové scény, storyboardy a dialógy s pomocou AI.',
    type: 'website',
    locale: 'sk_SK',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sk" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
