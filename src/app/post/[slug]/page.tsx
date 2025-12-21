/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityPublicClient } from '@/sanity/lib/client';
import { createClient } from 'next-sanity';
import { draftMode } from 'next/headers';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import TableOfContents from '@/components/TableOfContents'; // Import the new component
import LinkCard from '@/components/LinkCard'; // LinkCardコンポーネントをインポート
import { fetchOgp } from '@/lib/fetchOgp'; // fetchOgp関数をインポート

// export const revalidate = 60; // revalidateTagを使うため、ページレベルのrevalidateは削除または調整
export const revalidate = 0; // ページレベルのキャッシュを無効にする
export const dynamic = 'force-dynamic';

// --- メタデータ生成 ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await sanityPublicClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      body
    }`,
    { slug: params.slug }
  );

  if (!post || !post.body) {
    return {};
  }

  // 本文中の最初のYouTubeリンクを探す
  const linkCardBlock = post.body.find((block: any) => block._type === 'linkCard' && block.url?.includes('youtu'));
  
  if (linkCardBlock) {
    const ogpData = await fetchOgp(linkCardBlock.url);
    if (ogpData?.image) {
      return {
        openGraph: {
          images: [{ url: ogpData.image }],
        },
        twitter: {
          images: [{ url: ogpData.image }],
        },
      };
    }
  }

  return {};
}

// --- メインコンポーネント ---
export default async function PostPage({ params }: { params: { slug: string } }) {
  const isDraftMode = draftMode().isEnabled;

  let client = sanityPublicClient;
  let builder = imageUrlBuilder(client);

  if (isDraftMode) {
    const previewClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: '2024-05-01',
      useCdn: false,
      token: process.env.SANITY_API_TOKEN!,
      perspective: 'previewDrafts',
    });
    client = previewClient;
    builder = imageUrlBuilder(client);
  }

  function urlFor(source: any) {
    return builder.image(source);
  }

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      excerpt,
      body,
      "seriesTitle": series->title,
      "seriesSlug": series->slug.current,
      tags
    }`,
    { slug: params.slug },
    {
      cache: 'no-store', // 常に最新のデータを取得
      // tags: ['posts'], // revalidateTagと連携させるためのタグ
    }
  );

  if (!post || !post.body) notFound();

  // --- LinkCardのOGP情報をサーバーサイドで取得し、bodyに埋め込む ---
  const processedBody = await Promise.all(
    post.body.map(async (block: any) => {
      if (block._type === 'linkCard' && block.url) {
        const ogpData = await fetchOgp(block.url);
        return { ...block, ogp: ogpData }; // OGP情報をブロックに埋め込む
      }
      return block;
    })
  );

  // 他の記事を取得
  const otherPosts = await client.fetch(
    `*[_type == "post" && _id != $currentId] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      mainImage
    }`,
    { currentId: post._id },
    {
      cache: 'no-store', // 常に最新のデータを取得
      // tags: ['posts'], // 全ての記事リストのキャッシュを無効化するタグ
    }
  );

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

  // --- 目次用の見出し（h2, h3）を抽出 ---
  const headings = processedBody // 処理済みのbodyを使用
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
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="my-8 flex justify-center relative w-full h-96"> {/* 親要素にrelativeとサイズを指定 */}
            <Image
              src={urlFor(value).fit('max').auto('format').url()} // widthを削除
              alt={value.alt || ' '}
              fill // fillプロパティを追加
              style={{ objectFit: 'contain' }} // 画像が親要素に収まるように調整
              sizes="(max-width: 768px) 100vw, 800px" // レスポンシブなサイズ指定
              className="rounded-lg"
              loading="lazy"
            />
          </div>
        );
      },
      linkCard: ({ value }: any) => {
        if (!value?.url || !value?.ogp) { // ogpがnullの場合もレンダリングしない
          return null;
        }
        // OGP情報が埋め込まれたブロックを受け取り、LinkCardに渡す
        return <LinkCard ogp={value.ogp} url={value.url} />;
      },
    },
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
        <article className="prose prose-lg max-w-none prose-neutral">
          <PortableText value={processedBody} components={portableTextComponents} />
        </article>

        {/* 他の記事も読む */}
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-8">他の記事も読む</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherPosts.map((p: any) => (
              <Link href={`/post/${p.slug.current}`} key={p._id} className="group block bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative aspect-video">
                  {p.mainImage ? (
                    <Image
                      src={urlFor(p.mainImage).width(400).height(225).fit('crop').auto('format').url()}
                      alt={p.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-500 transition-colors">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* トップページに戻るボタン */}
        <div className="mt-12 text-center">
          <Link
            href="/top"
            className="inline-flex items-center px-6 py-3 border border-gray-700 rounded-md text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition-all duration-300"
          >
            Back to Top
          </Link>
        </div>
      </div>
    </main>
  );
}