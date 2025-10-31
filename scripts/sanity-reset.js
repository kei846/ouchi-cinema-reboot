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

async function resetSanityData() {
  console.log('🧹 Sanityコンテンツのクリーンアップと更新を開始します…');

  try {
    // 1. 「テスト記事」というタイトルを含む記事をすべて削除
    console.log('🗑 「テスト記事」を含む記事を検索中…');
    const testPostsToDelete = await sanityClient.fetch('*[_type == "post" && title match "テスト記事*"]{_id}');
    if (testPostsToDelete.length > 0) {
      console.log(`🗑 ${testPostsToDelete.length} 件の「テスト記事」を削除します…`);
      for (const post of testPostsToDelete) {
        await sanityClient.delete(post._id);
      }
      console.log('✅ 「テスト記事」の削除が完了しました。');
    } else {
      console.log('🟢 「テスト記事」は存在しません。削除スキップ。');
    }

    // 2. ハリーポッター記事にスラッグを付与
    console.log('✨ ハリーポッター記事にスラッグを付与します…');
    const harryPotterPosts = await sanityClient.fetch('*[_type == "post" && series->title == "ハリーポッター"]{_id, title}');

    if (harryPotterPosts.length > 0) {
      const slugMap = {
        '『ハリー・ポッターと賢者の石』──魔法の始まり': 'harry-potter-1',
        '『秘密の部屋』──過去が囁く声': 'harry-potter-2',
        '『アズカバンの囚人』──時間と恐怖を超えて': 'harry-potter-3',
      };

      for (const post of harryPotterPosts) {
        const newSlug = slugMap[post.title];
        if (newSlug) {
          await sanityClient.patch(post._id).set({ slug: { current: newSlug } }).commit();
          console.log(`✅ 記事「${post.title}」にスラッグ「${newSlug}」を付与しました。`);
        } else {
          console.log(`⚠️ 記事「${post.title}」に対応するスラッグが見つかりませんでした。`);
        }
      }
      console.log('✅ ハリーポッター記事へのスラッグ付与が完了しました。');
    } else {
      console.log('🟢 ハリーポッターシリーズの記事は存在しません。スラッグ付与スキップ。');
    }

    console.log('\n🎉 Sanityコンテンツのクリーンアップと更新が完了しました！');
    process.exit(0);
  } catch (err) {
    console.error('❌ エラーが発生しました:', err.message);
    process.exit(1);
  }
}

resetSanityData();