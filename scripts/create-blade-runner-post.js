// scripts/create-blade-runner-post.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const newPost = {
  _type: 'post',
  title: '『ブレードランナー 2049』：静寂が語る映像美と存在の問い',
  slug: {
    _type: 'slug',
    current: 'blade-runner-2049-visual-philosophy',
  },
  theme: 'mushin',
  excerpt: 'ライアン・ゴズリング主演のSF映画『ブレードランナー 2049』は、前作の哲学的な問いを深めつつ、息をのむような映像美で観客を魅了する。この作品は、まさに「無心の夜」にじっくりと味わいたい一本だ。',
  tags: ['深層考察', 'SF', '映像美'],
  body: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'ライアン・ゴズリング主演のSF映画『ブレードランナー 2049』は、前作の哲学的な問いを深めつつ、息をのむような映像美で観客を魅了する。この作品は、まさに「無心の夜」にじっくりと味わいたい一本だ。' },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: '静寂の中に宿る圧倒的な映像美' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '本作の最大の魅力は、その徹底して作り込まれたビジュアルにある。荒廃した未来都市、砂漠と化したラスベガス、そして常に降り続く雨や雪。ドゥニ・ヴィルヌーヴ監督とロジャー・ディーキンス撮影監督が織りなす映像は、一枚一枚が絵画のように美しく、観る者を圧倒する。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '特に印象的なのは、広大な空間とそこに佇む孤独な人物の対比だ。静寂の中で響く足音や環境音は、登場人物の内面的な葛藤を際立たせ、観客に深い没入感を与える。' },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: '「人間らしさ」とは何か？存在の問い' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '前作から引き継がれる「レプリカント（人造人間）と人間の境界線」というテーマは、本作でさらに深く掘り下げられる。主人公Kは、自身がレプリカントであることに疑問を抱き、自らのルーツを探る旅に出る。' },
      ],
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [
        { _type: 'span', text: '記憶、感情、そして愛。これらは本当に人間固有のものなのか？レプリカントにも魂は宿るのか？' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '映画は明確な答えを与えることなく、観客に問いかけ続ける。Kの孤独な探求は、私たち自身の存在意義やアイデンティティについて深く考えさせるきっかけとなるだろう。' },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: '「無心の夜」に観るべき理由' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '『ブレードランナー 2049』は、情報過多な現代において、あえて「間」を大切にする作品だ。派手なアクションよりも、静かな情景描写や登場人物の表情に多くの意味が込められている。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '「無心の夜」に、部屋を暗くして、この映画の世界に身を委ねてみてほしい。美しい映像と深遠なテーマが、あなたの心を静かに揺さぶり、新たな発見をもたらしてくれるはずだ。' },
      ],
    },
  ],
};

async function createBladeRunnerPost() {
  try {
    console.log('『ブレードランナー 2049』の記事を作成しています...');
    const result = await client.create(newPost);
    console.log('記事が正常に作成されました！');
    console.log(`ドキュメントID: ${result._id}`);
  } catch (error) {
    console.error('記事の作成中にエラーが発生しました:', error);
  }
}

// スクリプトを実行
createBladeRunnerPost();
