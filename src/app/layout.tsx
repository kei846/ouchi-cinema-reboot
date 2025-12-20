// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'OUCHI-CINEMA | おうちで、最高の映画体験を。',
  description:
    '無心の夜と問いの夜。あなたの部屋がスクリーンになる。OUCHI-CINEMAでは、心を揺らす映画体験を提案します。',
  openGraph: {
    title: 'OUCHI-CINEMA',
    description:
      '無心の夜と問いの夜。あなたの部屋がスクリーンになる。OUCHI-CINEMAでは、心を揺らす映画体験を提案します。',
    url: 'https://ouchi-cinema-reboot.vercel.app',
    siteName: 'OUCHI-CINEMA',
    locale: 'ja_JP',
    type: 'website',
    images: [ // OGP画像を追加
      {
        url: 'https://ouchi-cinema-reboot.vercel.app/ogp-default.jpg', // デフォルトのOGP画像URL
        width: 1200,
        height: 630,
        alt: 'OUCHI-CINEMA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OUCHI-CINEMA',
    description:
      'おうちで、最高の映画体験を。無心の夜と問いの夜。あなたの部屋がスクリーンになる。',
    images: ['https://ouchi-cinema-reboot.vercel.app/ogp-default.jpg'], // Twitterカード画像を追加
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} 
antialiased`}>
        {children}
      </body>
    </html>
  )
}

