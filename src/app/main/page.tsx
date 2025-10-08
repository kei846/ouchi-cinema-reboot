'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Orbitron } from 'next/font/google';
import Link from 'next/link';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function MainPage() {
  const targetText = 'OUCHI-CINEMA';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?/';
  const [displayText, setDisplayText] = useState('');

  // グリッチ文字アニメーション
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / 50, 1);
      const revealedCount = Math.floor(progress * targetText.length);

      const randomPart = Array.from({ length: targetText.length - revealedCount })
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('');

      setDisplayText(targetText.slice(0, revealedCount) + randomPart);

      if (progress === 1) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center justify-center bg-black 
text-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* タイトル */}
      <motion.h1
        className={`${orbitron.className} font-bold text-[2.5rem] md:text-[4rem] 
tracking-[0.25em] text-white mb-8`}
        style={{
          textShadow:
            '0 0 25px rgba(255,255,255,0.9), 0 0 50px rgba(100,150,255,0.8)',
        }}
      >
        {displayText}
      </motion.h1>

      {/* 選択エリア */}
      <motion.div
        className="text-center text-gray-300 text-lg mt-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p>Choose your side.......</p>
        <div className="mt-8 flex flex-row gap-10 items-center justify-center">
          <button className="px-8 py-4 border border-gray-400 rounded-lg hover:bg-white 
hover:text-black transition-all duration-300">
            無心の夜
          </button>
          <button className="px-8 py-4 border border-gray-400 rounded-lg hover:bg-white 
hover:text-black transition-all duration-300">
            問いの夜
          </button>
        </div>
      </motion.div>

      {/* ▼ トップページに戻るボタン */}
      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <Link
          href="/"
          className={`${orbitron.className} border border-gray-500 px-5 py-2 rounded-md 
text-sm text-gray-300 hover:bg-white hover:text-black transition-all duration-300`}
        >
          ⬆TOP
        </Link>
      </motion.div>
    </motion.div>
  );
}

