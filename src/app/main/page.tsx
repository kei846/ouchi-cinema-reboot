// src/app/main/page.tsx
import { sanityPublicClient } from '@/sanity/lib/client';
import { RandomArticleButton } from './RandomArticleButton';

export const dynamic = 'force-dynamic';

interface Slug {
  slug: {
    current: string;
  };
}

async function getSlugs() {
  const query = `*[_type == "post"]{ theme, slug }`;
  const slugs = await sanityPublicClient.fetch<Slug[]>(query);
  
  const mushinSlugs = slugs.filter((s: any) => s.theme === 'mushin').map((s) => s.slug.current);
  const toiSlugs = slugs.filter((s: any) => s.theme === 'toi').map((s) => s.slug.current);

  return { mushinSlugs, toiSlugs };
}

export default async function MainPage() {
  const { mushinSlugs, toiSlugs } = await getSlugs();

  return (
    <RandomArticleButton mushinSlugs={mushinSlugs} toiSlugs={toiSlugs} />
  );
}