// scripts/create-test-post.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

// 書き込み権限のあるクライアントを初期化
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01', // APIバージョンを固定
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // 書き込み時はCDNを使わない
});

// 作成するテスト記事のデータ
const testPost = {
  _type: 'post',
  title: 'テスト記事：自動デプロイの確認',
  slug: {
    _type: 'slug',
    current: 'test-post-auto-deploy-check',
  },
  theme: 'mushin', // '無心の夜'
  excerpt: 'この記は、SanityのWebhookとVercelの自動デプロイが正しく連携しているかを確認するためのテストです。',
  body: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'これはテスト記事の本文です。',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'この記事が本番サイトに自動で反映されれば、設定は成功です。',
        },
      ],
    },
  ],
  publishedAt: new Date().toISOString(),
};

// 記事を作成する関数
async function createTestPost() {
  try {
    console.log('テスト記事を作成しています...');
    const result = await client.create(testPost);
    console.log('テスト記事が正常に作成されました！');
    console.log(`ドキュメントID: ${result._id}`);
  } catch (error) {
    console.error('記事の作成中にエラーが発生しました:', error);
  }
}

// スクリプトを実行
createTestPost();
