// src/lib/fetchOgp.ts
import 'server-only';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

export async function fetchOgp(url: string) {
  try {
    const { hostname } = new URL(url);
    const allowedHostnames = ['youtube.com', 'www.youtube.com', 'youtu.be'];

    if (!allowedHostnames.includes(hostname)) {
      return null;
    }

    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'user-agent': 'Mozilla/5.0',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch OGP from ${url}: ${res.statusText}`);
      return null;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const image = $('meta[property="og:image"]').attr('content');

    if (image) {
      return { image };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching OGP for ${url}:`, error);
    return null;
  }
}

