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
import TableOfContents from '@/components/TableOfContents';
import { fetchOgp } from '@/lib/fetchOgp';

// --- メタデータ生成 ---
export async function generateMetadata({ params }: { params: { slug:string } }): Promise<Metadata> {
  const post = await sanityPublicClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      body,
      mainImage,
      mainImageUrl
    }`,
    { slug: params.slug }
  );

  if (!post) {
    return {};
  }

  let imageUrl: string | undefined = post.mainImageUrl;

  // If no mainImageUrl, try to fetch from YouTube link
  if (!imageUrl) {
    const linkCardBlock = post.body?.find((block: any) => block._type === 'linkCard' && block.url?.includes('youtu'));
    if (linkCardBlock) {
      const ogpData = await fetchOgp(linkCardBlock.url);
      if (ogpData?.image) {
        imageUrl = ogpData.image;
      }
    }
  }

  // Fallback to mainImage if still no image
  if (!imageUrl && post.mainImage) {
    imageUrl = imageUrlBuilder(sanityPublicClient).image(post.mainImage).url();
  }

  const metadata: Metadata = {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
  };

  return metadata;
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
      mainImage,
      mainImageUrl,
      "seriesTitle": series->title,
      "seriesSlug": series->slug.current,
      tags
    }`,
    { slug: params.slug },
    {
      cache: 'no-store',
    }
  );

  if (!post || !post.body) notFound();

  const processedBody = await Promise.all(
    post.body.map(async (block: any) => {
      if (block._type === 'linkCard' && block.url) {
        let ogpData = await fetchOgp(block.url);
        if (!ogpData && block.url.includes('youtu') && post.mainImage) {
          ogpData = {
            image: imageUrlBuilder(client).image(post.mainImage).url(),
            title: post.title,
            description: post.excerpt,
          };
        }
        return { ...block, ogp: ogpData };
      }
      return block;
    })
  );

  const otherPosts = await client.fetch(
    `*[_type == "post" && _id != $currentId] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      mainImage,
      mainImageUrl
    }`,
    { currentId: post._id },
    {
      cache: 'no-store',
    }
  );

  const slugify = (text: string): string => {
    return text.toLowerCase().replace(/「|」|『|』/g, '').replace(/[^\p{L}\p{N}\s-]+/gu, '').replace(/\s+/g, '-');
  };

  const getBlockText = (block: any): string => {
    return block.children?.map((child: any) => child.text).join('') || '';
  };

  const headings = processedBody
    .filter((block: any) => {
      const isHeading = block._type === 'block' && ['h2', 'h3'].includes(block.style);
      return isHeading;
    })
    .map((block: any) => ({
      _key: block._key,
      style: block.style,
      text: getBlockText(block),
      id: slugify(getBlockText(block)),
    }));

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="my-8 flex justify-center relative w-full h-96">
            <Image src={urlFor(value).fit('max').auto('format').url()} alt={value.alt || ' '} fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 800px" className="rounded-lg" loading="lazy" />
          </div>
        );
      },
      linkCard: ({ value }: any) => {
        if (!value?.url || !value?.ogp?.image) {
          return null;
        }
        return (
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="my-6 block rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out overflow-hidden"
          >
            <div className="relative w-full aspect-video bg-black">
              {/* Background Blurred Image */}
              <Image
                src={value.ogp.image}
                alt=""
                fill
                className="object-cover filter blur-xl scale-110 brightness-75"
              />
              {/* Foreground Contained Image */}
                        <Image
                          src={value.ogp.image}
                          alt={value.ogp.title || 'YouTube thumbnail'}
                          fill
                          className="object-contain drop-shadow-lg"
                        />            </div>
          </a>
        );
      },
    },
    block: {
      h2: ({ value, children }: any) => <h2 id={slugify(getBlockText(value))} className="mt-12 mb-4 text-2xl font-bold">{children}</h2>,
      h3: ({ value, children }: any) => <h3 id={slugify(getBlockText(value))} className="mt-8 mb-3 text-xl font-bold">{children}</h3>,
      normal: ({ children }: any) => <p className="mb-4">{children}</p>,
      blockquote: ({ children }: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
    },
    marks: {
      strong: ({ children }: any) => <strong>{children}</strong>,
      em: ({ children }: any) => <em>{children}</em>,
      link: ({ value, children }: any) => <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{children}</a>,
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
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          {post.seriesTitle && post.seriesSlug && (
            <Link href={`/series/${post.seriesSlug}`} className="text-sm text-indigo-500 hover:text-indigo-700 transition mb-2 block">
              シリーズ: {post.seriesTitle}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
          <p className="text-lg text-gray-500">{post.excerpt}</p>
        </header>

        {headings.length > 0 && (
          <div className="mb-8">
            <TableOfContents headings={headings} />
          </div>
        )}

        <article className="prose prose-lg max-w-none prose-neutral">
          <PortableText value={processedBody} components={portableTextComponents} />
        </article>

        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-8">他の記事も読む</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherPosts.map((p: any) => (
              <Link href={`/post/${p.slug.current}`} key={p._id} className="group block bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative aspect-video">
                  { (p.mainImageUrl || p.mainImage) ? (
                    <Image
                      src={p.mainImageUrl || urlFor(p.mainImage).width(400).height(225).fit('crop').auto('format').url()}
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

        <div className="mt-12 text-center">
          <Link href="/top" className="inline-flex items-center px-6 py-3 border border-gray-700 rounded-md text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition-all duration-300">
            Back to Top
          </Link>
        </div>
      </div>
    </main>
  );
}