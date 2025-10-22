'use client';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import Link from 'next/link';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center 
justify-center px-6 py-16 overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] 
to-[#000]" />

      {/* ノイズレイヤー */}
      <div
        className="absolute inset-0 z-0 mix-blend-overlay opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.04) 0,
            rgba(255,255,255,0.04) 1px,
            transparent 1px,
            transparent 2px
          )`,
        }}
      />

      {/* コンテンツ */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className={`${orbitron.className} text-3xl md:text-4xl font-bold 
tracking-[0.25em] text-white/90 mb-10 text-center`}
          style={{
            textShadow:
              '0 0 8px rgba(255,255,255,0.15), 0 0 18px rgba(255,255,255,0.08)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          CONTACT
        </motion.h1>

        <motion.div
          className="space-y-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* メール */}
          <div>
            <p className="text-sm text-white/60 mb-1">📩 メール</p>
            <a
              href="mailto:ouchishinema@gmail.com"
              className="text-white/90 hover:text-white transition underline 
underline-offset-4"
            >
              ouchishinema@gmail.com
            </a>
          </div>

          {/* インスタ */}
          <div>
            <p className="text-sm text-white/60 mb-1">📷 Instagram</p>
            <Link
              
href="https://www.instagram.com/popcornmessiah?igsh=MXhneXdmb3A2bzV5dA%3D%3D&utm_source=qr"
              target="_blank"
              className="text-white/90 hover:text-white transition underline 
underline-offset-4"
            >
              @popcornmessiah
            </Link>
          </div>

          {/* note */}
          <div>
            <p className="text-sm text-white/60 mb-1">📝 note</p>
            <Link
              href="https://note.com/ouchi_cinema"
              target="_blank"
              className="text-white/90 hover:text-white transition underline 
underline-offset-4"
            >
              note.com/ouchi_cinema
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="mt-14 text-sm text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <Link href="/top" className="hover:text-white/80 transition">
            ← TOPへ戻る
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

