'use client';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import Link from 'next/link';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function MainPage() {
  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center justify-center bg-black 
text-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 24風タイトル */}
      <motion.h1
        className="font-bold uppercase text-[3rem] md:text-[5rem] tracking-tight 
text-yellow-400"
        style={{
          textShadow:
            '0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 20px #FFA500',
          fontFamily: 'Orbitron, monospace',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        CHOOSE YOUR NIGHT
      </motion.h1>

      {/* 選択エリア */}
      <motion.div
        className="text-center text-gray-300 text-lg mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="flex flex-row gap-10 items-center justify-center">
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
        transition={{ delay: 1.8, duration: 1 }}
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

