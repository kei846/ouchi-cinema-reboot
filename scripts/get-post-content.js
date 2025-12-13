// scripts/get-post-content.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const documentId = 'pe0kD1XSoZkvIEuOv6k6Np';

async function getPostContent() {
  try {
    console.log(`ドキュメントID: ${documentId} の記事内容を取得しています...`);
    const post = await client.getDocument(documentId);
    console.log('--- 記事内容 ---');
    console.log(JSON.stringify(post, null, 2));
    console.log('--- 取得完了 ---');
  } catch (error) {
    console.error('記事内容の取得中にエラーが発生しました:', error);
  }
}

getPostContent();
