require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-05-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const seriesData = {
  _type: 'series',
  title: 'MCU：ゼロから歩む「世界再起動」の全記録',
  slug: {
    _type: 'slug',
    current: 'mcu-world-reboot-record',
  },
  description: '2008年、『アイアンマン』という一石が映画界に投じられた。それは単なるヒーロー映画の始まりではなく、世界そのものを『再起動』させる巨大な物語の幕開けだった。本シリーズでは、全作品を公開順（作順）に徹底レビュー。一人の男の再起から、宇宙規模の終焉と再生まで。あの時、僕らが目撃した興奮を、今一度ゼロから体験するためのロードマップ。',
  color: 'from-red-900 to-pink-900',
  // posts フィールドは含めない (後から手動で追加)
};

async function createSeriesDocument() {
  try {
    console.log('新しいシリーズドキュメントを作成しています...');
    const result = await client.create(seriesData);
    console.log('シリーズが正常に作成されました！');
    console.log(`Document ID: ${result._id}`);
  } catch (error) {
    console.error('シリーズの作成中にエラーが発生しました:', error);
  }
}

createSeriesDocument();
