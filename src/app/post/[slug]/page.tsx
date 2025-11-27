/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityPublicClient } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TableOfContents from '@/components/TableOfContents'; // Import the new component

export const revalidate = 60; // Next.js 14 App Router のキャッシュ再検証設定

// --- ヘルパー関数 ---
// テキストをURLに適したIDに変換 (日本語対応)
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/「|」|『|』/g, '') // 日本語の引用符を削除
    .replace(/[^\p{L}\p{N}\s-]+/gu, '') // Unicodeの文字、数字、スペース、ハイフン以外を削除 (uフラグ必須)
    .replace(/\s+/g, '-'); // スペースをハイフンに
};

// Portable Textのブロックからプレーンテキストを取得
const getBlockText = (block: any): string => {
  // block.children は Portable Text の span の配列
  return block.children?.map((child: any) => child.text).join('') || '';
};

// --- メインコンポーネント ---
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await sanityPublicClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      body,
      "seriesTitle": series->title,
      "seriesSlug": series->slug.current,
      tags
    }`,
    { slug: params.slug }
  );

  if (!post || !post.body) notFound();

  // --- 目次用の見出し（h2, h3）を抽出 ---
  const headings = post.body
    .filter((block: any) => {
      const isHeading = block._type === 'block' && ['h2', 'h3'].includes(block.style);
      return isHeading;
    })
    .map((block: any) => ({
      _key: block._key, // Portable Textの_keyを保持
      style: block.style, // h2 or h3
      text: getBlockText(block), // プレーンテキスト
      id: slugify(getBlockText(block)), // ページ内リンク用のID
    }));

  // --- Custom PortableText Components ---
  // 見出しにidを付与し、基本的なマークアップを定義
  const portableTextComponents = {
    block: {
      h2: ({ value, children }: any) => {
        const id = slugify(getBlockText(value));
        return (
          <h2 id={id} className="mt-12 mb-4 text-2xl font-bold">
            {children}
          </h2>
        );
      },
      h3: ({ value, children }: any) => {
        const id = slugify(getBlockText(value));
        return (
          <h3 id={id} className="mt-8 mb-3 text-xl font-bold">
            {children}
          </h3>
        );
      },
      normal: ({ children }: any) => <p className="mb-4">{children}</p>,
      blockquote: ({ children }: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
    },
    marks: {
      strong: ({ children }: any) => <strong>{children}</strong>,
      em: ({ children }: any) => <em>{children}</em>,
      link: ({ value, children }: any) => {
        const { href } = value;
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {children}
          </a>
        );
      },
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-5 my-4">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li>{children}</li>,
      number: ({ children }: any) => <li>{children}</li>,
    },
  };

  return (
    <main className="bg-white text-gray-800 min-h-screen px-6 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto"> {/* Removed flexbox classes */}
        {/* ページヘッダー */}
        <header className="mb-12">
          {post.seriesTitle && post.seriesSlug && (
            <Link
              href={`/series/${post.seriesSlug}`}
              className="text-sm text-indigo-500 hover:text-indigo-700 transition mb-2 block"
            >
              シリーズ: {post.seriesTitle}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500">{post.excerpt}</p>
        </header>

        {/* 目次エリア */}
        {headings.length > 0 && (
          <div className="mb-8"> {/* Added margin-bottom */}
            <TableOfContents headings={headings} />
          </div>
        )}

        {/* 本文 */}
        <article className="prose prose-lg max-w-none text-black">
          <PortableText value={post.body} components={portableTextComponents} />
        </article>
      </div>
    </main>
  );
}