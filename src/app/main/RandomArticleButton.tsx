// src/app/main/RandomArticleButton.tsx
'use client';

import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface RandomArticleButtonProps {
  mushinSlugs: string[];
  toiSlugs: string[];
}

export function RandomArticleButton({ mushinSlugs, toiSlugs }: RandomArticleButtonProps) {
  const router = useRouter();

  const handleRandomRedirect = (slugs: string[]) => {
    if (slugs.length === 0) {
      alert('対象となる記事がまだありません。');
      return;
    }
    const randomSlug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/post/${randomSlug}`);
  };

  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* タイトル */}
      <motion.h1
        className="font-bold uppercase text-[1.8rem] sm:text-[2.5rem] md:text-[4rem] tracking-tight text-yellow-300 whitespace-nowrap text-center"
        style={{
          textShadow: `
            0 0 4px rgba(255,215,0,0.8),
            0 0 10px rgba(255,200,0,0.6),
            0 0 18px rgba(255,180,0,0.4)
          `,
          fontFamily: 'Orbitron, monospace',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        CHOOSE YOUR NIGHT
      </motion.h1>

      {/* 選択ボタン */}
      <motion.div
        className="text-center text-gray-300 text-lg mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="flex flex-row gap-10 items-center justify-center">
          <button
            onClick={() => handleRandomRedirect(mushinSlugs)}
            className="px-8 py-4 border border-gray-400 rounded-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            無心の夜
          </button>
          <button
            onClick={() => handleRandomRedirect(toiSlugs)}
            className="px-8 py-4 border border-gray-400 rounded-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            問いの夜
          </button>
        </div>
      </motion.div>

      {/* ▼ トップページに戻る */}
      <motion.div
        className="absolute bottom-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <Link
          href="/top"
          className={`${orbitron.className} border border-gray-500 px-5 py-2 rounded-md text-sm text-gray-300 hover:bg-white hover:text-black transition-all duration-300`}
        >
          TOP
        </Link>
      </motion.div>
    </motion.div>
  );
}
