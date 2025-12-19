// src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'; // revalidateTagを追加
import { type NextRequest, NextResponse } from 'next/server';

// 環境変数から再検証用のシークレットトークンを取得
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

// SanityからのWebhookリクエストを処理するPOSTハンドラ
export async function POST(req: NextRequest) {
  try {
    // リクエストヘッダーからシークレットを取得
    const secret = req.headers.get('sanity-secret');

    // シークレットが一致しない場合はエラーを返す
    if (secret !== REVALIDATE_SECRET) {
      console.warn('Invalid revalidate secret provided.');
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // リクエストボディから_typeとslugを取得
    const body = await req.json();
    const { _type, slug } = body;

    if (!_type) {
      console.warn('Bad Request: Missing _type in webhook body.');
      return new Response('Bad Request', { status: 400 });
    }

    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    // 記事タイプに応じてrevalidateTagとrevalidatePathを使い分ける
    if (_type === 'post') {
      // 全ての記事関連のキャッシュを無効化するタグ
      revalidateTag('posts');
      revalidatedTags.push('posts');

      if (slug?.current) {
        // 特定の記事詳細ページのパスを再検証
        revalidatePath(`/post/${slug.current}`);
        revalidatedPaths.push(`/post/${slug.current}`);
      }
      // トップページやメインページも再検証
      revalidatePath('/');
      revalidatePath('/top');
      revalidatePath('/main');
      revalidatedPaths.push('/', '/top', '/main');
    }
    // 他のスキーマタイプ（例: author, categoryなど）も必要に応じて追加

    console.log('Revalidated tags:', revalidatedTags);
    console.log('Revalidated paths:', revalidatedPaths);

    const message = `Revalidated tags: ${revalidatedTags.join(', ')} and paths: ${revalidatedPaths.join(', ')}`;
    return NextResponse.json({ message });

  } catch (err) {
    console.error('Error during revalidation:', err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response('Internal Server Error', { status: 500 });
  }
}
