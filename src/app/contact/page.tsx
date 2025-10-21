'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center relative 
overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black 
opacity-80"></div>

      {/* Header */}
      <header className="w-full py-6 px-8 flex justify-between items-center z-10">
        <Link href="/top" className={`${orbitron.className} text-2xl tracking-[0.2em]`}>
          OUCHI-CINEMA
        </Link>
        <nav className="flex gap-6 text-sm text-gray-400">
          <Link href="/main" className="hover:text-white transition-all">NIGHT</Link>
          <Link href="/about" className="hover:text-white transition-all">ABOUT</Link>
          <Link href="/contact" className="text-white">CONTACT</Link>
        </nav>
      </header>

      {/* Content */}
      <section className="z-10 w-full max-w-2xl px-6 py-16 text-center text-white/80">
        <motion.h1
          className={`${orbitron.className} text-3xl mb-6 tracking-[0.2em]`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CONTACT
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          レビュー依頼、コラボレーション、その他お問い合わせは<br />
          下記フォームまたはメールよりお気軽にどうぞ。
        </motion.p>

        <a
          href="mailto:ouchi.cinema.info@gmail.com"
          className="inline-block px-6 py-3 border border-white/30 rounded-md 
hover:bg-white hover:text-black transition-all duration-300"
        >
          ✉️ ouchi.cinema.info@gmail.com
        </a>
      </section>

      <footer className="w-full text-center text-xs text-gray-600 py-6 border-t 
border-gray-800 z-10">
        © 2025 OUCHI-CINEMA. All Rights Reserved.
      </footer>
    </main>
  );
}

