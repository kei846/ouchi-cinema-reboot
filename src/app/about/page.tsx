'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';
import { useEffect, useState } from 'react';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });

// ===== アニメーション設定 =====
const glowText = [
  '0 0 8px rgba(255,255,180,0.8)',
  '0 0 20px rgba(255,255,120,0.6)',
  '0 0 35px rgba(255,220,120,0.4)',
].join(', ');

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.25, ease: 'easeOut' as const },
  }),
};

// ===== タイピング風フェード（1回だけ動作） =====
function useTypewriterLines(lines: string[], delayBetween = 2000) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    let active = true;

    const showNext = () => {
      if (!active || i >= lines.length) return;
      setVisibleLines((prev) => [...prev, lines[i]]);
      i++;
      setTimeout(showNext, delayBetween);
    };

    showNext();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← ここが重要！依存なし＝1回だけ実行

  return visibleLines;
}

// ===== ページ本体 =====
export default function AboutPage() {
  const lines = [
    '静かな夜。時計の針が少し遅く進む気がして、窓の外には誰もいない街の灯が滲む。',
    
'そのとき、あなたの部屋は劇場になる。カーテンの隙間からこぼれる光がスクリーンを照らす。',
    'スピーカーの奥で、記憶がひっそりと目を覚ます。',
    'OUCHI-CINEMAは、そんな夜のための小さな魔法。',
    'ここでは映画は娯楽ではなく、記憶であり、祈りであり、心を映す鏡。',
    '“無心の夜”では、ただ映像に身を委ねる。',
    '“問いの夜”では、ひとつのシーンの奥に潜む思索を辿る。',
    'そして、その狭間で、人は少しだけ「生きている」という感覚を取り戻す。',
    '夜は長い。でも、物語がある限り、孤独は照らされ続ける。',
    '— すべての夜に、スクリーンを。',
  ];

  const visibleLines = useTypewriterLines(lines, 1800);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center relative 
overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a10] to-black 
opacity-95" />
      <motion.div
        className="absolute inset-0 
bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] 
mix-blend-overlay"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ヘッダー */}
      <header className="w-full py-6 px-8 flex justify-between items-center z-10">
        <Link href="/top" className={`${orbitron.className} text-2xl tracking-[0.2em]`}>
          OUCHI-CINEMA
        </Link>
        <nav className="flex gap-6 text-sm text-gray-400">
          <Link href="/main" className="hover:text-white transition-all">NIGHT</Link>
          <Link href="/about" className="text-white">ABOUT</Link>
          <Link href="/contact" className="hover:text-white 
transition-all">CONTACT</Link>
        </nav>
      </header>

      {/* 本文 */}
      <section className="z-10 w-full max-w-3xl px-8 py-16 text-center leading-relaxed">
        <motion.h1
          className={`${orbitron.className} text-3xl md:text-4xl mb-12 text-yellow-300 
tracking-[0.25em]`}
          style={{ textShadow: glowText }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ABOUT OUCHI-CINEMA
        </motion.h1>

        <div className="flex flex-col gap-6 text-white/75 text-sm sm:text-base 
font-light">
          {visibleLines.map((line, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i}
              className="whitespace-pre-line"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </section>

      {/* フッター */}
      <motion.footer
        className="w-full text-center text-xs text-gray-600 py-6 border-t border-gray-800 
z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        © 2025 OUCHI-CINEMA. All Rights Reserved.
      </motion.footer>
    </main>
  );
}

