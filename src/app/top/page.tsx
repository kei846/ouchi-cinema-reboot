'use client';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: 'easeOut',
      delay: 0.12 * i,
    },
  }),
};

export default function TopPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-clip">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#0a0b12] 
to-black pointer-events-none" />

      {/* Subtle Noise */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-15"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,.02) 0,
            rgba(255,255,255,.02) 1px,
            transparent 1px,
            transparent 2px
          )`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-5 flex 
items-center justify-between">
        <Link
          href="/top"
          className={`${orbitron.className} tracking-[0.18em] text-sm sm:text-base 
md:text-lg text-white/90 hover:text-white transition`}
        >
          OUCHI-CINEMA
        </Link>
        <nav className="flex items-center gap-5 text-xs sm:text-sm text-white/60">
          <Link className="hover:text-white transition" href="/main">
            NIGHT
          </Link>
          <Link className="hover:text-white transition" href="/about">
            ABOUT
          </Link>
          <Link className="hover:text-white transition" href="/contact">
            CONTACT
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-10 
md:pb-14">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className={`${orbitron.className} text-center mx-auto font-bold text-[1.7rem] 
sm:text-[2.4rem] md:text-[3.1rem] tracking-[0.14em] text-white/95 leading-snug 
text-balance`}
          style={{
            textShadow:
              '0 0 12px rgba(220,220,255,.08), 0 0 28px rgba(120,150,255,.15)',
            WebkitTextStroke: '0.3px rgba(255,255,255,0.15)',
          }}
        >
          おうちで、最高の映画体験を。
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-3 md:mt-4 text-center text-[0.9rem] sm:text-base text-white/65 
leading-relaxed text-balance"
        >
          夜は二つ — 無心の夜 / 問いの夜。あなたの部屋がスクリーンになる。
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-7 md:mt-9 flex items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="/main"
            className="px-6 sm:px-7 py-2.5 border border-white/25 rounded-md 
text-[0.85rem] sm:text-sm text-white/90 hover:bg-white hover:text-black transition"
          >
            夜を選ぶ
          </Link>
          <a
            href="#new"
            className="px-6 sm:px-7 py-2.5 rounded-md text-[0.85rem] sm:text-sm 
bg-white/10 hover:bg-white/15 border border-white/10 transition"
          >
            新着を見る
          </a>
        </motion.div>
      </section>

      {/* New Articles */}
      <section
        id="new"
        className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-10 md:py-14"
      >
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-white/90 flex 
items-center gap-2">
            🎬 新着記事
          </h2>
          <Link
            href="#"
            className="text-xs sm:text-sm text-white/60 hover:text-white transition"
          >
            すべて見る →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="group relative overflow-hidden rounded-2xl border 
border-white/12 bg-white/[0.03] backdrop-blur-sm"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-[#151826] 
to-[#0b0e16]" />
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.68rem] 
text-white/70">
                    Review
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[0.68rem] 
text-white/60">
                    無心の夜
                  </span>
                </div>
                <h3 className="text-[1.05rem] sm:text-[1.1rem] font-semibold 
text-white/95 leading-snug">
                  シーンの断片 {i} — 静けさが語るもの
                </h3>
                <p className="mt-2 text-[0.86rem] text-white/60 line-clamp-2 
leading-relaxed">
                  言葉より前に届く、映像の温度。夜の画面に浮かぶ微かな呼吸を聞く。
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    className="text-sm text-white/80 group/link hover:text-white 
transition"
                    href="#"
                  >
                    続きを読む →
                  </Link>
                  <span className="text-[0.78rem] text-white/50">5 min</span>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 
group-hover:opacity-100 transition duration-500 bg-gradient-to-t from-white/5" />
            </motion.article>
          ))}
        </div>
      </section>

      {/* Featured of the Week */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-10 
md:py-14">
        <h2 className="mb-6 text-base sm:text-lg font-semibold text-white/90">
          🌟 今週のイチオシ
        </h2>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative overflow-hidden rounded-2xl border border-yellow-300/20 
bg-gradient-to-br from-yellow-200/10 to-yellow-400/5"
        >
          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <h3 className="text-xl md:text-2xl font-bold text-yellow-300/95 
leading-tight">
                The Batman
              </h3>
              <p className="mt-2 text-white/70 text-sm md:text-base leading-relaxed">
                
闇に滲む都市と孤独な呼吸。音が消え、影が語る。今週はこの1本で、夜の密度を上げよう。
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Link
                  href="#"
                  className="px-5 py-2 rounded-md text-sm border border-yellow-300/40 
text-yellow-200 hover:bg-yellow-300 hover:text-black transition"
                >
                  詳しく見る
                </Link>
                <Link
                  href="#"
                  className="text-sm text-white/70 hover:text-white transition"
                >
                  配信情報 →
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-[#2a2418] 
to-[#0f0c07] border border-white/10" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 text-center text-[0.78rem] 
text-white/55 leading-relaxed">
          The night continues… <span className="mx-2">•</span> © 2025 OUCHI-CINEMA
        </div>
      </footer>
    </main>
  );
}

