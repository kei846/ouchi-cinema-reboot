import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Cinzel } from 'next/font/google';
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const cinzel = Cinzel({ subsets: ['latin'], weight: ['700'], variable: '--font-cinzel' });

export const metadata: Metadata = {
  title: "OUCHI-CINEMA",
  description: "おうちで映画を楽しもう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${cinzel.variable} antialiased bg-black text-gray-200`}>
        {children}
      </body>
    </html>
  );
}
