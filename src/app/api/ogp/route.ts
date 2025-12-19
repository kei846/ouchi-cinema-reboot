// src/app/api/ogp/route.ts
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic'; // APIルートのキャッシュを完全に無効化

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      cache: 'no-store', // Next.jsのキャッシュを無効化
      // revalidate: 0, // Next.jsのrevalidateオプションも追加 (fetchの第二引数に直接は指定できないため、headersで対応)
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // HTTPヘッダーでCDNキャッシュを強制的に無効化
        'Pragma': 'no-cache', // HTTP/1.0互換
        'Expires': '0', // HTTP/1.0互換
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch OGP: ${response.statusText}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const ogp = {
      title: $('meta[property="og:title"]').attr('content') || $('title').text(),
      description: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content'),
      url: $('meta[property="og:url"]').attr('content') || url,
      siteName: $('meta[property="og:site_name"]').attr('content'),
    };

    return NextResponse.json(ogp);
  } catch (error: any) {
    console.error('Error fetching OGP:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch OGP' }, { status: 500 });
  }
}
