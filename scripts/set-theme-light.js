require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !apiVersion || !token) {
  console.error('❌ Missing Sanity environment variables:');
  console.error({ projectId, dataset, apiVersion, token });
  throw new Error('Sanity environment variables are not set. Check your .env.local file.');
}

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function setAllPostsToLightTheme() {
  console.log('⚪️ 全ての記事のテーマを「ライト」に更新します...');

  try {
    const postsToUpdate = await sanityClient.fetch('*[_type == "post" && (!defined(theme) || theme != "light")]{_id, title}');

    if (postsToUpdate.length === 0) {
      console.log('🟢 全ての記事は既にライトテーマに設定済みです。');
      process.exit(0);
    }

    console.log(`Found ${postsToUpdate.length}件の記事を更新します...`);

    for (const post of postsToUpdate) {
      await sanityClient.patch(post._id).set({ theme: 'light' }).commit();
      console.log(`✅ 記事「${post.title}」をライトテーマに更新しました。`);
    }

    console.log('\n🎉 全ての記事のテーマ更新が完了しました！');
    process.exit(0);
  } catch (err) {
    console.error('❌ エラーが発生しました:', err.message);
    process.exit(1);
  }
}

setAllPostsToLightTheme();
