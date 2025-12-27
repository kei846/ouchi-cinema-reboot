// src/lib/fetchOgp.ts
import 'server-only';

export const dynamic = 'force-dynamic';

function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export async function fetchOgp(url: string): Promise<{ image: string } | null> {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    // YouTube以外のURLは対象外
    return null;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error('YouTube API key is not set.');
    return null;
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

  try {
    const res = await fetch(apiUrl, {
      cache: 'no-store', // キャッシュを完全に無効化
      headers: {
        Referer: 'https://ouchi-cinema-reboot.vercel.app',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch from YouTube API: ${res.statusText}`);
      const errorBody = await res.json().catch(() => ({ message: 'Could not parse error body as JSON.' }));
      console.error('YouTube API Error Body (Production):', JSON.stringify(errorBody, null, 2));
      return null;
    }

    const data = await res.json();
    console.log('YouTube API Success Response (Production):', JSON.stringify(data, null, 2)); // 成功時もログに出力

    const item = data.items?.[0];
    const thumbnailUrl = item?.snippet?.thumbnails?.standard?.url || item?.snippet?.thumbnails?.high?.url;

    if (thumbnailUrl) {
      return { image: thumbnailUrl };
    }

    return null;
  } catch (error) {
    console.error('Error fetching from YouTube API (Production):', error);
    return null;
  }
}


