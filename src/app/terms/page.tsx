'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function TermsPage() {
  const fade = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: 'easeOut', delay: 0.12 * i },
    }),
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 
py-20 relative overflow-hidden">
      {/* 背景 */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0, 
rgba(255,255,255,.03) 1px, transparent 1px, transparent 2px)',
        }}
      />

      <motion.h1
        variants={fade}
        initial="hidden"
        animate="show"
        className={`${orbitron.className} text-3xl sm:text-4xl text-yellow-300 mb-10 
tracking-[0.25em]`}
        style={{
          textShadow: [
            '0 0 10px rgba(255,255,180,0.6)',
            '0 0 20px rgba(255,230,140,0.4)',
          ].join(', '),
        }}
      >
        TERMS OF USE
      </motion.h1>

      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={1}
        className="max-w-3xl text-[0.9rem] leading-relaxed text-white/80 space-y-6"
      >
        <p>
          
この利用規約（以下「本規約」）は、OUCHI-CINEMA（以下「当サイト」といいます。）が提供するコンテンツ・サービスの利用条件を定めるものです。
          ご利用の際は、本規約に同意されたものとみなします。
        </p>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">1. 
著作権</h2>
          <p>
            
当サイトに掲載される文章・画像・映像・デザイン等の著作権は、原則として当サイトまたは原権利者に帰属します。
            無断転載・再配布・商用利用を固く禁じます。
          </p>
        </section>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">2. 
引用について</h2>
          <p>
            
引用の際は、出典として「OUCHI-CINEMA」および該当ページのURLを明記してください。
            公正な範囲内での引用であればご自由にご利用いただけます。
          </p>
        </section>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">3. 
免責事項</h2>
          <p>
            
当サイトは、掲載内容の正確性・最新性の確保に努めていますが、情報の完全性を保証するものではありません。
            
利用者が当サイトの情報を用いて行う一切の行為について、当サイトは責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">4. 
外部リンクについて</h2>
          <p>
            当サイトには第三者サイトへのリンクが含まれる場合がありますが、
            その内容や利用による損害について一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">5. 
規約の変更</h2>
          <p>
            本規約の内容は、予告なく変更される場合があります。
            変更後の利用条件は、当サイトに掲載された時点から効力を持つものとします。
          </p>
        </section>

        <div className="pt-10 text-white/60 text-[0.8rem] space-y-2">
          <p>制定日：2025年1月4日</p>
          <p>運営者：OUCHI-CINEMA編集部（代表：上江洲 慶）</p>
        </div>
      </motion.div>

      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={2}
        className="mt-16 text-sm text-white/60"
      >
        <Link href="/top" className="hover:text-yellow-300 transition">← BACK TO 
HOME</Link>
      </motion.div>
    </main>
  );
}

