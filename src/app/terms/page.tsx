'use client';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import Link from 'next/link';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center 
justify-center overflow-hidden">
      {/* 背景ノイズ */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0, 
rgba(255,255,255,.03) 1px, transparent 1px, transparent 2px)`,
        }}
      />

      {/* タイトル */}
      <motion.h1
        className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl mb-6 
text-yellow-300 tracking-[0.2em] text-center`}
        style={{
          textShadow: [
            '0 0 10px rgba(255,255,180,0.6)',
            '0 0 25px rgba(255,230,140,0.4)',
          ].join(', '),
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        利用規約
      </motion.h1>

      {/* 本文 */}
      <motion.div
        className="max-w-3xl text-sm sm:text-base text-white/80 leading-relaxed px-6 
text-left space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      >
        <p>
          この利用規約（以下「本規約」）は、OUCHI-CINEMA（以下「当サイト」）が
          
提供するコンテンツおよびサービス（以下「本サービス」）の利用条件を定めるものです。
          利用者は、本規約に同意した上で、本サービスをご利用いただくものとします。
        </p>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">1. 本サービスの内容</h2>
        <p>
          当サイトは、映画や映像作品に関するレビュー、コラム、考察などの情報を
          無償で提供します。提供内容は、事前の予告なく変更・停止する場合があります。
        </p>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">2. 知的財産権</h2>
        <p>
          本サービスに掲載される文章、画像、デザイン、映像、その他のコンテンツは、
          当サイトまたは正当な権利者に帰属します。
          無断転載・無断使用を固く禁じます。
        </p>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">3. 禁止事項</h2>
        <p>
          利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。
        </p>
        <ul className="list-disc pl-6 space-y-1 text-white/70">
          <li>当サイトまたは第三者の権利・利益を侵害する行為</li>
          <li>不正アクセス、改ざん、情報の漏洩を目的とする行為</li>
          <li>公序良俗に反する行為、またはそれを助長する行為</li>
          <li>営利目的での無断利用や再配布</li>
        </ul>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">4. 免責事項</h2>
        <p>
          当サイトは、提供する情報の正確性・安全性を保証しません。
          利用者が当サイトの情報を用いて行う行為に対して、一切の責任を負いません。
        </p>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">5. 規約の変更</h2>
        <p>
          当サイトは、必要に応じて本規約を変更できるものとします。
          改定後の内容は、本ページに掲載された時点で効力を生じます。
        </p>

        <p className="mt-10 text-right text-xs text-white/60">
          制定：2025年1月4日<br />
          OUCHI-CINEMA 編集部
        </p>
      </motion.div>

      {/* 戻るボタン */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <Link
          href="/top"
          className="border border-yellow-300 px-6 py-2 rounded-md text-yellow-300 
hover:bg-yellow-300 hover:text-black transition-all duration-300"
        >
          BACK TO HOME
        </Link>
      </motion.div>
    </main>
  );
}

