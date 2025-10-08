'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Opening() {
  const router = useRouter();
  const targetText = 'OUCHI-CINEMA';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?/';
  const [displayText, setDisplayText] = useState('');
  const [fadeOut, setFadeOut] = useState(false);

  // グリッチアニメーション
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / 40, 1);
      const revealedCount = Math.floor(progress * targetText.length);

      const randomPart = Array.from({ length: targetText.length - revealedCount })
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('');

      setDisplayText(targetText.slice(0, revealedCount) + randomPart);

      if (progress === 1) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // 3秒後フェードアウト＋遷移
  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500);
    const redirect = setTimeout(() => router.push('/main'), 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <motion.div
      className="h-screen w-full flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <motion.h1
        className={`${orbitron.className} font-bold text-[4rem] md:text-[6rem] 
tracking-[0.25em] text-white`}
        style={{
          textShadow:
            '0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(100,150,255,0.8)',
          letterSpacing: '0.15em',
        }}
      >
        {displayText}
      </motion.h1>
    </motion.div>
  );
}

