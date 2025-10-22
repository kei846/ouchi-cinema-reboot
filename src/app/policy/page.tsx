'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function PolicyPage() {
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
        PRIVACY POLICY
      </motion.h1>

      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={1}
        className="max-w-3xl text-[0.9rem] leading-relaxed text-white/80 space-y-6"
      >
        <p>
          OUCHI-CINEMA（以下「当サイト」といいます。）は、
          ご利用者様のプライバシーを尊重し、安心してご覧いただけるよう
          個人情報の保護に関する方針を以下の通り定めます。
        </p>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">1. 
個人情報の取得と利用目的</h2>
          <p>
            
当サイトでは、お問い合わせやコメントの際にお名前やメールアドレス等をお預かりする場合があります。
            取得した個人情報は、回答・連絡・運営改善などの正当な目的のみに利用します。
          </p>
        </section>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">2. 
第三者提供について</h2>
          <p>
            当サイトは、法令に基づく場合を除き、取得した個人情報を第三者へ提供しません。
          </p>
        </section>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">3. 
アクセス解析ツール</h2>
          <p>
            当サイトでは、アクセス向上と改善のためにGoogle 
Analyticsなどの解析ツールを使用しています。
            
これによりCookieを通じて匿名のトラフィックデータを収集しますが、個人を特定するものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">4. 
安全管理措置</h2>
          <p>
            
個人情報の漏えいや不正アクセスを防止するため、合理的な安全対策を講じています。
          </p>
        </section>

        <section>
          <h2 className="text-yellow-300 mt-6 mb-2 text-sm tracking-widest">5. 
改定について</h2>
          <p>
            本方針の内容は、必要に応じて見直し・改訂を行う場合があります。
            最新の内容は常に本ページにてご確認いただけます。
          </p>
        </section>

        <div className="pt-10 text-white/60 text-[0.8rem] space-y-2">
          <p>制定日：2025年1月4日</p>
          <p>運営者：OUCHI-CINEMA編集部（代表：上江洲 慶）</p>
          <p>お問い合わせ：ouchishinema@gmail.com</p>
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

