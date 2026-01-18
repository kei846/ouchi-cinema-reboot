require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-05-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Ensure we are hitting the latest data
});

async function deleteAllPosts() {
  try {
    console.log('Sanityから全ての記事を削除しています...');

    // Fetch all post documents
    const postsToDelete = await client.fetch(`*[_type == "post"]._id`);

    if (postsToDelete.length === 0) {
      console.log('削除対象の記事は見つかりませんでした。');
      return;
    }

    // Create a transaction for deleting multiple documents
    const transaction = postsToDelete.reduce((tx, postId) => tx.delete(postId), client.transaction());

    await transaction.commit();

    console.log(`${postsToDelete.length}件の記事が正常に削除されました。`);
    console.log('Sanity Studioで記事が削除されていることをご確認ください。');

  } catch (error) {
    console.error('記事の削除中にエラーが発生しました:', error);
  }
}

deleteAllPosts();
