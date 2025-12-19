// src/app/api/preview/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

// 環境変数からプレビュー用のシークレットトークンを取得
const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET;

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // シークレットトークンを検証
  if (secret !== PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!slug) {
    return new Response('Missing slug', { status: 400 })
  }

  // Next.jsのプレビューモードを有効化
  draftMode().enable()

  // 記事ページにリダイレクト
  redirect(`/post/${slug}`)
}
