// scripts/delete-test-post.js
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

// 削除するテスト記事のID
// create-test-post.jsで作成した記事のドキュメントIDを指定
const documentId = '9rDCh1WATrku58yWoIpeIP'; 

// 記事を削除する関数
async function deleteTestPost() {
  try {
    console.log(`ドキュメントID: ${documentId} のテスト記事を削除しています...`);
    await client.delete(documentId);
    console.log('テスト記事が正常に削除されました！');
  } catch (error) {
    console.error('記事の削除中にエラーが発生しました:', error);
  }
}

// スクリプトを実行
deleteTestPost();
