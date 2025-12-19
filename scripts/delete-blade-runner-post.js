// scripts/delete-blade-runner-post.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const documentId = 'G5mTPQhfUgiN17m61FkYiJ'; // 『ブレードランナー 2049』の記事のID

async function deleteBladeRunnerPost() {
  try {
    console.log('『ブレードランナー 2049』の記事を削除しています...');
    const result = await client.delete(documentId);
    console.log('記事が正常に削除されました！', result);
  } catch (error) {
    console.error('記事の削除中にエラーが発生しました:', error);
  }
}

// スクリプトを実行
deleteBladeRunnerPost();
