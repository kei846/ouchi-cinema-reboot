import { sanityPublicClient } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function PostPage({ params }: any) {
  const { slug } = params;

  const post = await sanityPublicClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      body,
      "seriesTitle": series->title,
      tags,
      theme
    }`,
    { slug }
  );

  if (!post) notFound();

  const isLightTheme = post.theme === 'light';
  const themeClass = isLightTheme ? 'bg-white text-black' : 'bg-[#0a0a0a] text-gray-100';
  const articleClass = `max-w-none ${isLightTheme ? 'prose' : 'prose prose-invert'}`;

  return (
    <main className={`${themeClass} min-h-screen px-6 py-10`}>
      <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
      {post.seriesTitle && (
        <p className='text-sm opacity-70 mb-2'>シリーズ: {post.seriesTitle}</p>
      )}
      <p className='mb-6 opacity-80'>{post.excerpt}</p>
      <article className={articleClass}>
        <PortableText value={post.body} />
      </article>
    </main>
  );
}
