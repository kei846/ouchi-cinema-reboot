// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// 環境変数から再検証用のシークレットトークンを取得
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

// SanityからのWebhookリクエストを処理するPOSTハンドラ
export async function POST(req: NextRequest) {
  try {
    // リクエストボディの正当性を検証
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, REVALIDATE_SECRET);

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(message, { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }

    // 'sanity'タグが付いたすべてのキャッシュを再検証
    revalidateTag('sanity');

    const message = `Revalidated sanity tag`;
    return NextResponse.json({ message });

  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response('Internal Server Error', { status: 500 });
  }
}
