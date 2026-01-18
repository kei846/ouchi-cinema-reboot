// src/app/series/[slug]/page.tsx
import { sanityPublicClient } from '@/sanity/lib/client';
import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { notFound } from 'next/navigation';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const builder = imageUrlBuilder(sanityPublicClient);
function urlFor(source: any) {
  return builder.image(source);
}

interface Post {
  title: string;
  desc: string;
  tag?: string;
  slug?: { current: string; };
  mainImage?: any;
  mainImageUrl?: string;
}

interface Series {
  title: string;
  description: string;
  posts: Post[];
}

// NOTE: This is a duplicated component from top/page.tsx. Consider refactoring into a shared component.
const ArticleCard = ({ post }: { post: Post }) => (
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
);


async function getSeriesData(slug: string): Promise<Series | null> {
  const query = `*[_type == "series" && slug.current == $slug][0]{
    title,
    description,
    "posts": posts[]->{
      title,
      "desc": excerpt,
      slug,
      mainImage,
      mainImageUrl,
      "tag": tags[0]
    } | order(publishedAt asc)
  }`;
  const data = await sanityPublicClient.fetch(query, { slug });
  return data;
}

export default async function SeriesPage({ params }: { params: { slug: string } }) {
  const series = await getSeriesData(params.slug);

  if (!series) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      <pre className="absolute top-0 left-0 bg-red-900 text-white p-4 z-50 text-xs">
        DEBUG INFO (This is temporary):<br />
        PROJECT_ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET'}<br />
        DATASET: {process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT SET'}
      </pre>
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#0a0b12] to-black" />
      
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

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-16 md:py-24">
        <section className="text-center mb-16">
          <p className="text-sm text-yellow-400/80 mb-2 tracking-widest">SERIES</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white/95 leading-tight">{series.title}</h1>
          {series.description && (
            <p className="mt-4 max-w-3xl mx-auto text-white/70 leading-relaxed">{series.description}</p>
          )}
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.posts?.map((post, i) => (
              <ArticleCard post={post} key={`series-post-${i}`} />
            ))}
          </div>
        </section>
      </div>
      
      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 text-center text-[0.78rem] text-white/55 leading-relaxed">
          © 2026 OUCHI-CINEMA
        </div>
      </footer>
    </main>
  );
}
