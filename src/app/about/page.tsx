'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';
import { useEffect, useState } from 'react';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });

// ===== 共通スタイル定義（この中だけで完結） =====
const glowText = [
  '0 0 5px rgba(255,255,180,0.8)',
  '0 0 15px rgba(255,255,120,0.6)',
  '0 0 25px rgba(255,220,120,0.4)',
].join(', ');

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: 'easeOut' as const,
    },
  }),
};

// ===== タイピング効果 =====
function useTypewriter(text: string, speed = 50) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

// ===== ページ本体 =====
export default function AboutPage() {
  const title = useTypewriter('ABOUT OUCHI-CINEMA', 80);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center relative 
overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black 
opacity-90" />

      {/* ヘッダー */}
      <header className="w-full py-6 px-8 flex justify-between items-center z-10">
        <Link href="/top" className={`${orbitron.className} text-2xl tracking-[0.2em]`}>
          OUCHI-CINEMA
        </Link>
        <nav className="flex gap-6 text-sm text-gray-400">
          <Link href="/main" className="hover:text-white transition-all">
            NIGHT
          </Link>
          <Link href="/about" className="text-white">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-white transition-all">
            CONTACT
          </Link>
        </nav>
      </header>

      {/* メインコンテンツ */}
      <section className="z-10 w-full max-w-4xl px-6 py-16 text-center leading-relaxed 
text-white/80">
        <motion.h1
          className={`${orbitron.className} text-3xl md:text-4xl mb-10 tracking-[0.25em] 
text-yellow-300`}
          style={{ textShadow: glowText }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {title}
          <motion.span
            className="inline-block w-[1ch] bg-yellow-300 ml-1"
            style={{ height: '1em' }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.h1>

        <div className="relative max-w-3xl mx-auto space-y-10">
          {[
            
'静かな夜。時計の針が少し遅く進む気がして、窓の外には、誰もいない街の灯りが滲んで見える。',
            
'そのとき、あなたの部屋は劇場になる。カーテンの隙間から差す街の光が、まるでスクリーンを照らすように。スピーカーの奥から響く音が、遠い記憶を呼び覚ますように。',
            
'「おうちシネマ」は、そんな夜の物語を愛する人たちのための場所。ここでは映画はただの娯楽じゃない。記憶であり、祈りであり、ひとりの心を映す鏡でもある。',
            
'“無心の夜”では、ただ映像に身を委ねて、何も考えずに呼吸する。“問いの夜”では、ひとつのシーンに隠された思索を辿る。そしてその狭間で、人は少しだけ「生きている」という感覚を取り戻す。',
            
'この場所に集う言葉や記録、レビューたちは、まるでひとつの映画の断片のように積み重なっていく。あなたが次に観る作品が、誰かにとっての「救い」になるかもしれない。',
            
'夜は長い。でも、画面の向こうにはいつも物語がある。それを見つける旅こそが、“おうちシネマ”という、ひとつの夜の形。',
          ].map((text, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="text-white/75 text-sm sm:text-base font-light"
            >
              {text}
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

      {/* 残光エフェクト */}
      <motion.div
        className="absolute inset-0 
bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] 
mix-blend-overlay"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </main>
  );
}

