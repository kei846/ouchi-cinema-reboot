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
    transition: { duration: 0.9, ease: 'easeOut', delay: 0.12 * i },
  }),
};

export default function TopPage() {
  const newList = [
    { title: 'メメント', desc: '記憶の断片が導く真実。ノーラン初期の傑作。', tag: 
'スリラー' },
    { title: 'パプリカ', desc: '夢と現実の境界が崩れる、映像のカオス。', tag: 
'アニメ・SF' },
    { title: 'シン・エヴァンゲリオン', desc: '終焉と再生の狭間にある、庵野監督の祈り。', 
tag: 'シリーズ完結' },
  ];

  const seriesList = [
    { title: 'Nolan Universe', desc: '思考を刺激する映像迷宮。', color: `from-[#0a0f1f] 
to-[#111a33]` },
    { title: 'Ghibli Dreams', desc: '静けさと生命が息づく夜。', color: `from-[#1f120a] 
to-[#2b1a0f]` },
    { title: 'Sci-Fi Nights', desc: '光と闇が交錯する未来譚。', color: `from-[#0a1f1d] 
to-[#16332f]` },
  ];

  const recommendList = [
    { title: 'ジョーカー', desc: 
'狂気と孤独の狭間で生まれる悲劇。人間の「笑い」とは何かを問う。', tag: '心理ドラマ' },
    { title: 'ラ・ラ・ランド', desc: '夢と現実、愛と別れ。色彩が心に残る音楽の夜。', tag: 
'音楽・ロマンス' },
    { title: 'ミッドサマー', desc: '白昼の悪夢。幸福の裏に潜む崩壊の儀式。', tag: 
'ホラー・心理' },
  ];

  const deepList = [
    { title: 'TENET / テネット', desc: 
'時間の矛盾がもたらす「認知の断層」。映像の奥で何が反転しているのか。' },
    { title: 'Drive My Car', desc: '沈黙が語る距離。喪失を超えて、言葉の外にある救い。' 
},
    { title: 'Her', desc: 
'AIとの愛は孤独の延長か、それとも救済か。デジタルの夜に灯る微光。' },
  ];

  const goodsList = [
    { name: 'ポスター&アート', link: '/goods/posters', color: `from-[#1a1a1a] 
to-[#262626]` },
    { name: 'サウンドトラック', link: '/goods/soundtrack', color: `from-[#0f1a2e] 
to-[#1a2a48]` },
    { name: 'コレクターズアイテム', link: '/goods/collectibles', color: `from-[#241a0f] 
to-[#3a2a18]` },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white overflow-clip">
      {/* === Background === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#0a0b12] 
to-black pointer-events-none" />

      {/* === Header === */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-5 flex 
items-center justify-between">
        <Link href="/top" className={`${orbitron.className} tracking-[0.18em] text-sm 
sm:text-base md:text-lg text-white/90 hover:text-white transition`}>
          OUCHI-CINEMA
        </Link>
        <nav className="flex items-center gap-5 text-xs sm:text-sm text-white/60">
          <Link href="/main" className="hover:text-white transition">NIGHT</Link>
          <Link href="/about" className="hover:text-white transition">ABOUT</Link>
          <Link href="/contact" className="hover:text-white transition">CONTACT</Link>
        </nav>
      </header>

      {/* === Hero === */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-14 
text-center">
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" 
className={`${orbitron.className} font-bold text-[1.9rem] sm:text-[2.6rem] 
md:text-[3.4rem] tracking-[0.14em] text-white/95 leading-tight`}>
          おうちで、最高の<br className="block sm:hidden" />映画体験を。
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1} 
className="mt-3 text-[0.95rem] sm:text-base text-white/65 leading-relaxed">
          夜は二つ — 無心の夜 / 問いの夜。あなたの部屋がスクリーンになる。
        </motion.p>
      </section>

      {/* === 新着記事 === */}
      <section id="new" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 
md:py-16">
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">📰 新着記事</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newList.map((n, i) => (
            <motion.article key={i} variants={fadeUp} initial="hidden" whileInView="show" 
viewport={{ once: true }} custom={i} className="rounded-xl border border-white/10 
bg-white/[0.04] p-6 hover:border-white/25 transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full 
text-white/70">{n.tag}</span>
              </div>
              <h3 className="text-white/90 font-semibold mb-1">{n.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-3">{n.desc}</p>
              <Link href="#" className="text-sm text-white/70 hover:text-white 
transition">続きを読む →</Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* === シリーズ === */}
      <section id="series" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 
md:py-16">
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">🎞 シリーズで観る夜</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {seriesList.map((s, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" 
viewport={{ once: true }} custom={i} className={`rounded-xl border border-white/10 
bg-gradient-to-br ${s.color} p-6 hover:border-white/25 transition`}>
              <h3 className="text-white/90 font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-white/65">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === おすすめ記事 === */}
      <section id="recommend" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 
py-12 md:py-16">
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">🎬 おすすめ記事</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendList.map((r, i) => (
            <motion.article key={i} variants={fadeUp} initial="hidden" whileInView="show" 
viewport={{ once: true }} custom={i} className="rounded-xl border border-white/10 
bg-white/[0.04] p-6 hover:border-white/25 transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full 
text-white/70">{r.tag}</span>
              </div>
              <h3 className="text-white/90 font-semibold mb-1">{r.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-3">{r.desc}</p>
              <Link href="#" className="text-sm text-white/70 hover:text-white 
transition">続きを読む →</Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* === 深層考察 === */}
      <section id="deep" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 
md:py-16">
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">🌀 深層考察の間</h2>
        <div className="space-y-6">
          {deepList.map((d, i) => (
            <motion.article key={i} variants={fadeUp} initial="hidden" whileInView="show" 
viewport={{ once: true }} custom={i} className="border border-white/10 rounded-xl 
bg-white/[0.03] p-6 hover:border-white/25 transition">
              <h3 className="text-white/90 font-semibold text-lg mb-2">{d.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{d.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* === グッズ === */}
      <section id="goods" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 
md:py-16">
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">🛍 映画グッズコーナー</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {goodsList.map((g, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" 
viewport={{ once: true }} custom={i} className={`rounded-xl border border-white/10 
bg-gradient-to-br ${g.color} p-6 hover:border-white/30 transition`}>
              <h3 className="text-white/90 font-semibold mb-2">{g.name}</h3>
              <Link href={g.link} className="text-sm text-white/70 hover:text-white 
transition">見る →</Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === Footer === */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 text-center text-[0.78rem] 
text-white/55 leading-relaxed">
          The night continues… <span className="mx-2">•</span> © 2025 OUCHI-CINEMA
        </div>
      </footer>
    </main>
  );
}

