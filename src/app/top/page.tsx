'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Orbitron } from 'next/font/google';
import { useEffect, useState, useRef } from 'react';
import { sanityPublicClient } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

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
  slug?: { current: string; };
  mainImage?: any;
  mainImageUrl?: string;
}

interface Goods {
  name: string;
  link: string;
  color: string;
}

const builder = imageUrlBuilder(sanityPublicClient);
function urlFor(source: any) {
  return builder.image(source);
}

const ArticleCard = ({ post, index }: { post: Post, index: number }) => (
  <motion.div key={index} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={index} className="flex-none w-72 md-w80">
    <Link href={`/post/${post.slug?.current}`} className="block group">
      <article className="rounded-xl border border-white/10 bg-white/[0.04] hover:border-white/25 transition-all duration-300 h-full flex flex-col">
        <div className="relative w-full aspect-video rounded-t-xl overflow-hidden">
          {(post.mainImageUrl || post.mainImage) ? (
            <Image src={post.mainImageUrl || urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center"><span className="text-xs text-white/40">No Image</span></div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          {post.tag && <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/70 mb-2 inline-block self-start">{post.tag}</span>}
          <h3 className="text-white/90 font-semibold mb-1 line-clamp-2 flex-grow">{post.title}</h3>
          <p className="text-sm text-white/65 leading-relaxed line-clamp-2 mt-auto">{post.desc}</p>
        </div>
      </article>
    </Link>
  </motion.div>
);


export default function TopPage() {
  const [featuredList, setFeaturedList] = useState<Post[]>([]);
  const [deepList, setDeepList] = useState<Post[]>([]);
  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('vibe-mode');
    const heroContent = heroContentRef.current;
    
    const handleScroll = () => {
      if (heroContent) {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.4));
        heroContent.style.opacity = `${opacity}`;
        heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const canvas = document.querySelector('canvas');
    const ctx = canvas?.getContext('2d');

    let animationFrameId: number;
    let resizeTimeout: NodeJS.Timeout;

    if (canvas && ctx) { // Only proceed if canvas and ctx are available
      let particles: Particle[] = [];
      let shootingStars: ShootingStar[] = [];

      class Particle {
          x: number; y: number; size: number; speedX: number; speedY: number;
          baseOpacity: number; opacity: number; opacitySpeed: number;
          constructor(public canvasWidth: number, public canvasHeight: number) { // Accepts w, h
              this.x = Math.random() * canvasWidth;
              this.y = Math.random() * canvasHeight;
              this.size = Math.random() * 1.5 + 0.5;
              this.speedX = (Math.random() * 0.4 - 0.2);
              this.speedY = (Math.random() * 0.4 - 0.2);
              this.baseOpacity = Math.random() * 0.4 + 0.1;
              this.opacity = this.baseOpacity;
              this.opacitySpeed = Math.random() * 0.02 + 0.01;
          }
          update() {
              this.x += this.speedX;
              this.y += this.speedY;
              this.opacity = this.baseOpacity + (Math.sin(Date.now() * this.opacitySpeed) * (this.baseOpacity / 2));
              if (this.x < 0 || this.x > this.canvasWidth) { this.x = Math.random() * this.canvasWidth; }
              if (this.y < 0 || this.y > this.canvasHeight) { this.y = Math.random() * this.canvasHeight; }
          }
          draw() {
              ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
              ctx.fill();
          }
      }

      class ShootingStar {
          x: number; y: number; len: number; speed: number; size: number;
          constructor(public canvasWidth: number, public canvasHeight: number) { // Accepts w, h
              this.x = Math.random() * canvasWidth * 1.5;
              this.y = 0;
              this.len = Math.random() * 150 + 50;
              this.speed = Math.random() * 8 + 8;
              this.size = Math.random() * 1.2 + 0.4;
          }
          update() { this.x -= this.speed; this.y += this.speed; }
          draw() {
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
              this.ctx.lineWidth = this.size;
              this.ctx.beginPath();
              this.ctx.moveTo(this.x, this.y);
              this.ctx.lineTo(this.x - this.len, this.y + this.len);
              this.ctx.stroke();
          }
      }

      const init = () => {
          particles = [];
          const numberOfParticles = window.innerWidth / 25;
          for (let i = 0; i < numberOfParticles; i++) {
              particles.push(new Particle(canvas.width, canvas.height));
          }
      }

      const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach(p => { p.update(); p.draw(); });
          if (Math.random() < 0.02 && shootingStars.length < 3) {
              shootingStars.push(new ShootingStar(canvas.width, canvas.height));
          }
          for(let i = shootingStars.length - 1; i >= 0; i--) {
              const s = shootingStars[i];
              if (s.x < -s.len || s.y > canvas.height) {
                  shootingStars.splice(i, 1);
              } else {
                  s.update(); s.draw();
              }
          }
          animationFrameId = requestAnimationFrame(animate);
      }
      
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          canvas.width = window.innerWidth;
          canvas.height = document.documentElement.scrollHeight;
          init();
        }, 100);
      }
      
      handleResize(); // Initial setup
      animate();
      window.addEventListener('resize', handleResize);
    }
    
    const fetchAllContent = async () => {
      const postFields = `{ title, "desc": excerpt, "tag": tags[0], slug, mainImage, mainImageUrl }`;
      const queries = {
        featuredList: `*[_type == "post"] | order(publishedAt desc) ${postFields}[0...6]`,
        deepList: `*[_type == "post" && "深層考察" in tags] | order(publishedAt desc) ${postFields}[0...5]`,
        goodsList: `*[_type == "goodsCategory"] | order(_createdAt asc) { name, "link": "/goods/" + slug.current, color }`,
      };

      try {
        const [ featuredPosts, deepPosts, goodsItems, ] = await Promise.all([
          sanityPublicClient.fetch(queries.featuredList),
          sanityPublicClient.fetch(queries.deepList),
          sanityPublicClient.fetch(queries.goodsList),
        ]);
        setFeaturedList(featuredPosts.filter((p: Post) => p.slug?.current));
        setDeepList(deepPosts.filter((p: Post) => p.slug?.current));
        setGoodsList(goodsItems);
      } catch (error) {
        console.error('Failed to fetch page content:', error);
      }
    };
    fetchAllContent();
    
    return () => {
        document.body.classList.remove('vibe-mode');
        window.removeEventListener('scroll', handleScroll);
        // Need to remove the resize listener as well
        // window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-clip">
      <canvas id="particle-canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"></canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#0a0b12] to-black pointer-events-none" />

      <header className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
        <Link href="/top" className={`${orbitron.className} tracking-[0.18em] text-sm sm:text-base md:text-lg text-white/90 hover:text-white transition`}>
          OUCHI-CINEMA
        </Link>
        <nav className="flex items-center gap-5 text-xs sm:text-sm text-white/60">
          <Link href="/main" className="hover:text-white transition">NIGHT</Link>
          <Link href="/about" className="hover:text-white transition">ABOUT</Link>
          <Link href="/contact" className="hover:text-white transition">CONTACT</Link>
        </nav>
      </header>

      <section ref={heroContentRef} className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-28 md:pt-16 md:pb-32 text-center h-[80vh] flex flex-col justify-center items-center">
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" className={`${orbitron.className} font-bold text-[1.9rem] sm:text-[2.6rem] md:text-[3.4rem] tracking-[0.14em] text-white/95 leading-tight`}>
          おうちで、最高の<br className="block sm:hidden" />映画体験を。
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-3 text-[0.95rem] sm:text-base text-white/65 leading-relaxed">
          夜は二つ — 無心の夜 / 問いの夜。<br />あなたの部屋がスクリーンになる。
        </motion.p>
      </section>

      <div className="relative z-10">
        <section id="new" className="py-12 md:py-16">
          <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-8 text-center text-glow">Featured Articles</h2>
          <div className="flex overflow-x-auto space-x-6 px-5 sm:px-8 pb-4 scrollbar-hide">
            {featuredList.map((post, i) => (
              <ArticleCard post={post} index={i} key={`featured-${i}`} />
            ))}
          </div>
        </section>

        <section id="deep" className="py-12 md:py-16">
          <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-8 text-center text-glow">深層考察の間</h2>
           <div className="flex overflow-x-auto space-x-6 px-5 sm:px-8 pb-4 scrollbar-hide">
            {deepList.map((post, i) => (
              <ArticleCard post={post} index={i} key={`deep-${i}`} />
            ))}
          </div>
        </section>

        <section id="goods" className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
          <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-6 text-center text-glow">映画グッズコーナー</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {goodsList.map((g, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className={`rounded-xl border border-white/10 bg-gradient-to-br ${g.color} p-6 hover:border-white/30 transition`}>
                <h3 className="text-white/90 font-semibold mb-2">{g.name}</h3>
                <Link href="/goods/" className="text-sm text-white/70 hover:text-white transition">見る →</Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 text-center text-[0.78rem] text-white/55 leading-relaxed space-y-4">
          <div>The night continues… <span className="mx-2">•</span> © 2025 OUCHI-CINEMA</div>
          <div className="flex justify-center gap-6 text-xs sm:text-sm text-white/50">
            <Link href="/policy" className="hover:text-yellow-300 transition">プライバシーポリシー</Link>
            <span className="opacity-40">|</span>
            <Link href="/terms" className="hover:text-yellow-300 transition">利用規約</Link>
            <span className="opacity-40">|</span>
            <Link href="/contact" className="hover:text-yellow-300 transition">お問い合わせ</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
