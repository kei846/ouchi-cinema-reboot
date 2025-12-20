// src/lib/fetchOgp.ts
import 'server-only';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic' // これを追加

export async function fetchOgp(url: string) {
  try {
    const res = await fetch(url, {
      cache: 'no-store', // 常に最新のデータを取得
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'user-agent': 'Mozilla/5.0' // これを追加
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch OGP from ${url}: ${res.statusText}`);
      return null;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const ogp = {
      title: $('meta[property="og:title"]').attr('content') || $('title').text(),
      description: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content'),
      url: $('meta[property="og:url"]').attr('content') || url,
      siteName: $('meta[property="og:site_name"]').attr('content'),
    };

    // OGPが空の場合にnullを返す処理を追加
    if (!ogp.title && !ogp.image) {
      console.log(`OGP data is empty for ${url}. Returning null.`);
      return null;
    }

    console.log('Fetched OGP:', ogp); // デバッグログを追加

    return ogp;
  } catch (error) {
    console.error(`Error fetching OGP for ${url}:`, error);
    return null;
  }
}
