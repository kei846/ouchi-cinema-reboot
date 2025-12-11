// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
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

    // 再検証するパスを決定
    const staleRoutes: string[] = ['/']; // トップページは常に再検証

    if (body._type === 'post' && body.slug?.current) {
      // 記事詳細ページのパスを追加
      staleRoutes.push(`/post/${body.slug.current}`);
      // 記事一覧ページ（/top, /mainなど）も追加
      staleRoutes.push('/top');
      staleRoutes.push('/main');
    }

    // パスの再検証を実行
    staleRoutes.forEach((path) => revalidatePath(path));

    const message = `Revalidated routes: ${staleRoutes.join(', ')}`;
    return NextResponse.json({ message });

  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response('Internal Server Error', { status: 500 });
  }
}
