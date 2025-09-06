import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Image from "next/image";
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import './homepage.css'; // Import the new CSS file
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['700'] });

interface Article {
  _id: string;
  title: string;
  slug: string;
  mainImage?: SanityImageSource;
}

async function getLatestArticle() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0] {
    _id,
    title,
    "slug": slug.current,
    mainImage
  }`;
  const article = await client.fetch<Article>(query);
  return article;
}

async function getOtherArticles() {
  const query = `*[_type == "post"] | order(publishedAt desc)[1...10] {
    _id,
    title,
    "slug": slug.current
  }`;
  const articles = await client.fetch<Article[]>(query);
  return articles;
}

export default async function Home() {
  const latestArticle = await getLatestArticle();
  const otherArticles = await getOtherArticles();

  return (
    <>
      <div className="splash-screen">
        <h1 className={cinzel.className}>OUCHI-CINEMA</h1>
      </div>
      <div className="main-content-wrapper">
        {latestArticle && (
          <section className="hero-section">
            {latestArticle.mainImage && (
              <Image
                src={urlFor(latestArticle.mainImage).width(1800).height(1200).url()}
                alt={latestArticle.title}
                fill
                className="hero-image"
                priority
              />
            )}
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <p>映画を見る旅へ、ようこそ。</p>
              <h1>{latestArticle.title}</h1>
              <Link href={`/posts/${latestArticle.slug}`} className="btn btn-light">
                続きを読む
              </Link>
            </div>
          </section>
        )}

        <main className="container mt-5">
          <h2 className="mb-4">新着記事</h2>
          <div className="new-articles-list">
            {otherArticles.map((article) => (
              <div className="article-list-item" key={article._id}>
                <h3 className="article-title">{article.title}</h3>
                <Link href={`/posts/${article.slug}`} className="read-more-link">
                  続きを読む &gt;
                </Link>
              </div>
            ))}
          </div>
        </main>

        <section className="ticket-category-section">
          <div className="container">
            <h2 className="mb-5 text-center">テーマから探す</h2>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <a href="#" className="movie-ticket-link">
                  <div className="ticket-main">
                    <div className="ticket-title">VODサービス徹底活用術</div>
                  </div>
                </a>
                <a href="#" className="movie-ticket-link">
                  <div className="ticket-main">
                    <div className="ticket-title">映画の「なぜ？」を深掘り</div>
                  </div>
                </a>
                <a href="#" className="movie-ticket-link">
                  <div className="ticket-main">
                    <div className="ticket-title">シーンから学ぶ映画術</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="featured-section container mt-5 mb-5">
          <h2 className="mb-4 text-center">今月のピックアップ</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="featured-card">
                <h3 className="featured-title">【特集】〇〇監督の全作品を徹底解説！</h3>
                <p className="featured-excerpt">
                  今月は、映画界の巨匠〇〇監督の全作品を深掘り。その哲学と影響を徹底解説します。
                </p>
                <Link href="#" className="btn btn-outline-light">
                  特集を読む
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer-section mt-5 py-4">
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-md-4 mb-3">
                <h5 className="footer-heading">ABOUT US</h5>
                <ul className="list-unstyled">
                  <li><Link href="#" className="footer-link">このブログについて</Link></li>
                  <li><Link href="#" className="footer-link">運営者情報</Link></li>
                  <li><Link href="#" className="footer-link">お問い合わせ</Link></li>
                </ul>
              </div>
              <div className="col-md-4 mb-3">
                <h5 className="footer-heading">おすすめVODサービス</h5>
                <ul className="list-unstyled">
                  <li><Link href="#" className="footer-link">Netflix</Link></li>
                  <li><Link href="#" className="footer-link">Prime Video</Link></li>
                  <li><Link href="#" className="footer-link">ディズニープラス</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-3 border-top border-secondary">
              <p className="text-muted mb-0">&copy; 2025 OUCHI-CINEMA. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
