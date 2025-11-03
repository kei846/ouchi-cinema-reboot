'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';
import { useEffect, useState } from 'react';
import { sanityPublicClient } from '@/sanity/lib/client';

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

interface Post {
  title: string;
  desc: string;
  tag?: string;
  slug: {
    current: string;
  };
}

interface Series {
  title: string;
  desc: string;
  color: string;
}

interface Goods {
  name: string;
  link: string;
  color: string;
}

export default function TopPage() {
  const [newList, setNewList] = useState<Post[]>([]);
  const [recommendList, setRecommendList] = useState<Post[]>([]);
  const [deepList, setDeepList] = useState<Post[]>([]);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  // ハリポタはもう使わんけど、あとで消せるように一応残しとく
  const [harryPotterList, setHarryPotterList] = useState<Post[]>([]);

  useEffect(() => {
    const fetchAllContent = async () => {
      const queries = {
        newList: `*[_type == "post"] | order(publishedAt desc) { title, 
"desc": excerpt, "tag": tags[0], slug }[0...3]`,
        recommendList: `*[_type == "post" && "おすすめ" in tags] | 
order(publishedAt desc) { title, "desc": excerpt, "tag": tags[0], slug 
}[0...3]`,
        deepList: `*[_type == "post" && "深層考察" in tags] | 
order(publishedAt desc) { title, "desc": excerpt, slug }[0...3]`,
        seriesList: `*[_type == "series"] | order(_createdAt asc) { title, 
"desc": description, color }`,
        goodsList: `*[_type == "goodsCategory"] | order(_createdAt asc) { 
name, "link": "/goods/" + slug.current, color }`,
        harryPotterList: `*[_type == "post" && series->title == 
"ハリーポッター"] | order(publishedAt asc) { title, "desc": excerpt, 
"tag": "ハリーポッター", slug }`,
      };

      try {
        const [
          newPosts,
          recommendedPosts,
          deepPosts,
          seriesItems,
          goodsItems,
          harryPotterPosts,
        ] = await Promise.all([
          sanityPublicClient.fetch(queries.newList),
          sanityPublicClient.fetch(queries.recommendList),
          sanityPublicClient.fetch(queries.deepList),
          sanityPublicClient.fetch(queries.seriesList),
          sanityPublicClient.fetch(queries.goodsList),
          sanityPublicClient.fetch(queries.harryPotterList),
        ]);

        setNewList(newPosts);
        setRecommendList(recommendedPosts);
        setDeepList(deepPosts);
        setSeriesList(seriesItems);
        setGoodsList(goodsItems);
        setHarryPotterList(harryPotterPosts);
      } catch (error) {
        console.error('Failed to fetch page content:', error);
      }
    };

    fetchAllContent();
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white 
overflow-clip">
      {/* === Background === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] 
via-[#0a0b12] to-black pointer-events-none" />

      {/* === Header === */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-5 
sm:px-8 py-5 flex items-center justify-between">
        <Link
          href="/top"
          className={`${orbitron.className} tracking-[0.18em] text-sm 
sm:text-base md:text-lg text-white/90 hover:text-white transition`}
        >
          OUCHI-CINEMA
        </Link>
        <nav className="flex items-center gap-5 text-xs sm:text-sm 
text-white/60">
          <Link href="/main" className="hover:text-white transition">
            NIGHT
          </Link>
          <Link href="/about" className="hover:text-white transition">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            CONTACT
          </Link>
        </nav>
      </header>

      {/* === Hero === */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-5 
sm:px-8 pt-10 pb-14 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className={`${orbitron.className} font-bold text-[1.9rem] 
sm:text-[2.6rem] md:text-[3.4rem] tracking-[0.14em] text-white/95 
leading-tight`}
        >
          おうちで、最高の
          <br className="block sm:hidden" />
          映画体験を。
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-3 text-[0.95rem] sm:text-base text-white/65 
leading-relaxed"
        >
          夜は二つ — 無心の夜 / 問いの夜。
          <br />
          あなたの部屋がスクリーンになる。
        </motion.p>
      </section>

      {/* === 新着記事 === */}
      <section
        id="new"
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 
md:py-16"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">
          新着記事
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newList.map((n, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-xl border border-white/10 bg-white/[0.04] 
p-6 hover:border-white/25 transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-white/10 px-2 py-0.5 
rounded-full text-white/70">
                  {n.tag}
                </span>
              </div>
              <h3 className="text-white/90 font-semibold 
mb-1">{n.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-3">
                {n.desc}
              </p>
              <Link
                href={`/post/${n.slug.current}`}
                className="text-sm text-white/70 hover:text-white 
transition"
              >
                続きを読む →
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* === シリーズで観る夜 === */}
      <section
        id="series"
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 
md:py-16"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">
          シリーズで観る夜
        </h2>

        {/* 中身（カードのmap）は一旦非表示にする */}
        {/* もし後で戻したくなったらここに seriesList.map(...) 
を戻せばいい */}
      </section>

      {/* === おすすめ記事 === */}
      <section
        id="recommend"
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 
md:py-16"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">
          おすすめ記事
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendList.map((r, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-xl border border-white/10 bg-white/[0.04] 
p-6 hover:border-white/25 transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-white/10 px-2 py-0.5 
rounded-full text-white/70">
                  {r.tag}
                </span>
              </div>
              <h3 className="text-white/90 font-semibold 
mb-1">{r.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-3">
                {r.desc}
              </p>
              <Link
                href={`/post/${r.slug.current}`}
                className="text-sm text-white/70 hover:text-white 
transition"
              >
                続きを読む →
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* === 深層考察の間 === */}
      <section
        id="deep"
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 
md:py-16"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">
          深層考察の間
        </h2>
        <div className="space-y-6">
          {deepList.map((d, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="border border-white/10 rounded-xl bg-white/[0.03] 
p-6 hover:border-white/25 transition"
            >
              <h3 className="text-white/90 font-semibold text-lg mb-2">
                {d.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-3">
                {d.desc}
              </p>
              <Link
                href={`/post/${d.slug.current}`}
                className="text-sm text-white/70 hover:text-white 
transition"
              >
                続きを読む →
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* === 映画グッズコーナー === */}
      <section
        id="goods"
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 
md:py-16"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 
text-center">
          映画グッズコーナー
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {goodsList.map((g, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className={`rounded-xl border border-white/10 
bg-gradient-to-br ${g.color} p-6 hover:border-white/30 transition`}
            >
              <h3 className="text-white/90 font-semibold 
mb-2">{g.name}</h3>
              <Link
                href={g.link}
                className="text-sm text-white/70 hover:text-white 
transition"
              >
                見る →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === Footer === */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 text-center 
text-[0.78rem] text-white/55 leading-relaxed space-y-4">
          <div>
            The night continues… <span className="mx-2">•</span> © 2025
            OUCHI-CINEMA
          </div>
          <div className="flex justify-center gap-6 text-xs sm:text-sm 
text-white/50">
            <Link
              href="/policy"
              className="hover:text-yellow-300 transition"
            >
              プライバシーポリシー
            </Link>
            <span className="opacity-40">|</span>
            <Link href="/terms" className="hover:text-yellow-300 
transition">
              利用規約
            </Link>
            <span className="opacity-40">|</span>
            <Link
              href="/contact"
              className="hover:text-yellow-300 transition"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
