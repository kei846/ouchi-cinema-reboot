// scripts/get-tenet-post-content.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const documentId = 'G5mTPQhfUgiN17m61EmDQG'; // 『TENET』の記事のID

async function getTenetPostContent() {
  try {
    console.log('『TENET』の記事内容を取得しています...');
    const post = await client.getDocument(documentId);
    
    if (post) {
      console.log('--- 記事の本文 (body) ---');
      console.log(JSON.stringify(post.body, null, 2));
    } else {
      console.log('記事が見つかりませんでした。');
    }

  } catch (error) {
    console.error('記事内容の取得中にエラーが発生しました:', error);
  }
}

// スクリプトを実行
getTenetPostContent();
