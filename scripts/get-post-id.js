// scripts/get-post-id.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function getPostId() {
  try {
    const id = await client.fetch(`*[_type == 'post' && slug.current == 'cinema-paradiso'][0]._id`);
    console.log(id);
  } catch (error) {
    console.error('IDの取得中にエラーが発生しました:', error);
  }
}

getPostId();
