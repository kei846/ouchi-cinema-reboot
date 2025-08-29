import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import type { SanityDocument } from "next-sanity";
import Link from "next/link"; // 戻るリンク用にインポート

// URLのslugを使って、Sanityから特定の記事を1件だけ取ってくる関数
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const data = await client.fetch<SanityDocument>(query, { slug });
  return data;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-16 lg:p-24">
      {/* 記事のコンテナ */}
      <article className="w-full max-w-4xl">
        {/* 記事タイトル */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400">{post.title}</h1>
        
        {/* 公開日とかのメタ情報（あれば） */}
        <p className="text-gray-400 mb-8">公開日: {new Date(post._createdAt).toLocaleDateString()}</p>

        {/* 記事本文 */}
        <div className="prose prose-invert lg:prose-xl prose-headings:text-amber-400">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p>この記事には本文がありません。</p>
          )}
        </div>
        
        {/* トップページへ戻るリンク */}
        <Link href="/" className="mt-12 inline-block text-amber-400 hover:underline">
          &larr; 記事一覧へ戻る
        </Link>
      </article>
    </main>
  );
}