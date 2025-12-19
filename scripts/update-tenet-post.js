// scripts/update-tenet-post.js
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

// 追加する「双殺しのパラドックス」の解説ブロック
const paradoxBlock = [
  {
    _key: 'paradox01',
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'これは、タイムトラベルにおける「双殺しのパラドックス（または祖父のパラドックス）」に対する、ノーラン監督からの明確な回答とも言える。' },
    ],
  },
  {
    _key: 'paradox02',
    _type: 'block',
    style: 'blockquote',
    children: [
      { _type: 'span', text: 'もし逆行して「過去の自分」を殺してしまったら、未来の自分はどうなるのか？答えは「何も起こらない」。なぜなら、未来の自分が過去の自分を殺すという行為自体が、既に「起きてしまったこと」であり、歴史の一部として確定しているからだ。' },
    ],
  },
  {
    _key: 'paradox03',
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '未来から来た人間が過去に干渉した結果も、すべて「最初から歴史に織り込み済み」という考え方だ。これを「運命論」と捉えるか、「自由意志の否定」と捉えるか。ここに、ノーラン監督が仕掛けた最大の「問い」がある。' },
    ],
  },
];

async function updateTenetPost() {
  try {
    console.log('『TENET』の記事を更新しています...');

    // 既存の本文を取得
    const post = await client.getDocument(documentId);
    const body = post.body || [];

    // 「ルール3」のセクションのインデックスを探す
    const rule3Index = body.findIndex(block => 
      block._type === 'block' && 
      block.style === 'h2' && 
      block.children[0]?.text.includes('「起きたこと」は変えられない')
    );

    if (rule3Index === -1) {
      console.error('「ルール3」のセクションが見つかりませんでした。');
      return;
    }

    // 「ルール3」のセクションの後の、既存の解説部分を削除
    // 'fea10e0b13f2' は、元の本文で「人は完結しない物語を〜」が始まるブロックの_key
    const originalTextIndex1 = body.findIndex(block => block.children[0]?.text.includes('タイムトラベル映画でよくある'));
    const originalTextIndex2 = body.findIndex(block => block.children[0]?.text.includes('未来から来た人間が過去に干渉した結果も'));
    
    const newBody = body.filter((_, index) => index !== originalTextIndex1 && index !== originalTextIndex2);

    // 新しい解説ブロックを挿入
    newBody.splice(rule3Index + 1, 0, ...paradoxBlock);

    // 記事を更新
    await client
      .patch(documentId)
      .set({ body: newBody })
      .commit();

    console.log('記事が正常に更新されました！');

  } catch (error) {
    console.error('記事の更新中にエラーが発生しました:', error);
  }
}

// スクリプトを実行
updateTenetPost();
