'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function TopPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center relative 
overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black 
opacity-70"></div>

      {/* ヘッダー */}
      <header className="w-full py-6 px-8 flex justify-between items-center z-10">
        <h1 className={`${orbitron.className} text-2xl tracking-[0.2em]`}>
          OUCHI-CINEMA
        </h1>
        <nav className="flex gap-6 text-sm text-gray-400">
          <Link href="/main" className="hover:text-white transition-all">
            NIGHT
          </Link>
          <Link href="/about" className="hover:text-white transition-all">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-white transition-all">
            CONTACT
          </Link>
        </nav>
      </header>

      {/* メインビジュアル */}
      <section className="flex flex-col items-center justify-center text-center h-[70vh] 
z-10">
        <motion.h2
          className={`${orbitron.className} text-yellow-400 text-[1.6rem] 
sm:text-[2.5rem] md:text-[4rem] tracking-[0.2em] whitespace-nowrap text-center`}
          style={{
            textShadow: '0 0 5px #FFD700, 0 0 15px #FFA500',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          FIND YOUR NIGHT.
        </motion.h2>

        <motion.p
          className="text-gray-400 mt-4 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          「無心の夜」と「問いの夜」へ。静寂のスクリーンで物語が始まる。
        </motion.p>

        <motion.div
          className="flex gap-6 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link
            href="/main"
            className="px-8 py-3 border border-yellow-400 text-yellow-400 
hover:bg-yellow-400 hover:text-black transition-all duration-300 rounded"
          >
            ENTER NIGHT
          </Link>
        </motion.div>
      </section>

      {/* 記事カード */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 px-8 pb-20 z-10">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="border border-gray-700 rounded-2xl p-6 hover:bg-gray-900 
transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-2">記事タイトル {i}</h3>
            <p className="text-sm text-gray-400 mb-4">
              これはサンプル記事です。後でSanityから取得する予定。
            </p>
            <Link
              href="#"
              className="text-yellow-400 hover:underline text-sm tracking-wide"
            >
              READ MORE →
            </Link>
          </motion.div>
        ))}
      </section>

      {/* フッター */}
      <footer className="w-full text-center text-xs text-gray-600 py-6 border-t 
border-gray-800 z-10">
        © 2025 OUCHI-CINEMA. All Rights Reserved.
      </footer>
    </main>
  );
}

