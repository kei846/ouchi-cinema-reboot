import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Google Fonts 設定
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// メタデータ
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OUCHI-CINEMA',
    description:
      'おうちで、最高の映画体験を。無心の夜と問いの夜。あなたの部屋がスクリーンになる。',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black 
text-white`}
      >
        {children}
      </body>
    </html>
  );
}

