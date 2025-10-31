'use client';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import Link from 'next/link';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function PolicyPage() {
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
        プライバシーポリシー
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
          OUCHI-CINEMA（以下「当サイト」）は、利用者の皆さまの個人情報を適切に保護し、
          安心してご利用いただけるよう努めます。
          以下に当サイトの個人情報保護方針を定めます。
        </p>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">1. 個人情報の利用目的</h2>
        <p>
          当サイトでは、メールでのお問い合わせやコメント投稿の際に、
          
名前（ハンドルネーム）やメールアドレスなどの個人情報をお預かりする場合があります。
          これらの情報はお問い合わせへの回答や必要なご連絡のみに使用します。
        </p>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">2. 個人情報の第三者提供</h2>
        <p>
          当サイトは、法令に基づく場合を除き、利用者本人の同意を得ることなく
          第三者に個人情報を開示・提供することはありません。
        </p>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">3. 
アクセス解析ツールについて</h2>
        <p>
          当サイトでは、アクセス解析のために「Google Analytics」を使用しています。
          これによりCookieを利用して匿名のトラフィックデータを収集しますが、
          個人を特定する情報は含まれません。
        </p>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">4. 免責事項</h2>
        <p>
          当サイトの掲載情報には正確性を期していますが、
          利用者が当サイトの情報を用いて行う行為については一切の責任を負いません。
        </p>

        <h2 className="text-yellow-300 text-lg mt-8 mb-2">5. 改訂について</h2>
        <p>
          本ポリシーの内容は、法令の改正や運営方針の変更に応じて、
          事前の告知なく改訂される場合があります。
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

