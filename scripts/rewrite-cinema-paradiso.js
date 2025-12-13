// scripts/rewrite-cinema-paradiso.js
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

// リライト後の記事データ
const rewrittenPost = {
  title: '便利さと引き換えに、僕らは何を失ったのか？──『ニュー・シネマ・パラダイス』が問いかけるもの',
  excerpt: 'スマホで映画を観るのが当たり前の時代。でも、本当に「豊か」になったんだろうか？この映画は、失われた「時間」と「場所」の価値を、静かに、そして痛いほど思い出させてくれる。',
  theme: 'toi', // 問いの夜
  body: [
    // 起
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'スマホの画面をタップすれば、いつでもどこでも映画が観られる。なんて便利な時代なんだろう。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'でも、ふと考える。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '僕らはこの「便利さ」と引き換えに、何か大切なものを失ってしまったんじゃないだろうか？', marks: ['strong'] },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '『ニュー・シネマ・パラダイス』は、そんな現代に生きる僕らに、静かに、そして痛いほど鋭い「問い」を投げかけてくる映画だ。' },
      ],
    },
    // 承 1
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: 'なぜ僕らは、映画館に集うのをやめたのか？' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'この映画の舞台は、シチリア島の小さな村にある映画館「パラダイス座」。そこは単なる上映施設じゃない。村人たちが集い、笑い、泣き、恋をする、人生の喜怒哀楽が詰まった「広場」そのものだった。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'スクリーンに映るキスシーンに、神父が検閲の鐘を鳴らす。すると観客は「またかよ！」と野次を飛ばす。今なら炎上案件かもしれないこの光景も、当時は映画を介したコミュニケーションだった。そこには、スクリーンと観客、そして観客同士の間に、確かな「共有体験」が存在していた。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'でも、テレビが普及し、時代の波が押し寄せると、パラダイス座は静かに閉館する。人々は、もう映画館に集わなくなった。' },
      ],
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [
        { _type: 'span', text: '僕らは、一人で好きな時間に好きな作品を観られる自由と引き換えに、暗闇の中で見知らぬ誰かと感情を共有する「場の力」を手放してしまったのかもしれない。' },
      ],
    },
    // 承 2
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: 'なぜ「叶わなかった恋」は、人生の道しるべになるのか？' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '主人公トトの人生を決定づけたのは、映写技師アルフレードとの友情と、そして叶わなかった初恋だ。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '重要なのは、この恋が「完結しない物語」として描かれていること。もし、あのまま二人が結ばれていたら、トトは村を出て、映画監督という「物語を紡ぐ者」になっていただろうか？' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '人は、心の中に「欠けたピース」があるからこそ、それを埋めるために何かを求め、創造しようとするのかもしれない。', marks: ['strong'] },
        { _type: 'span', text: 'トトが映画を作り続けるのは、あの夏の日の想い出を、何度もスクリーン上で再生しようとする試みだったんじゃないだろうか。' },
      ],
    },
    // 転
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: 'アルフレードが遺した「最後のフィルム」の意味' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '数十年後、故郷に帰ったトトを待っていたのは、アルフレードが遺した一本のフィルム。それは、かつて検閲でカットされた「キスシーンばかり」を繋ぎ合わせた、愛に満ちた贈り物だった。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'このラストシーンは、僕らに教えてくれる。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '失われた時間は、決して戻らない。でも、そこで感じた愛情や情熱は、形を変えて必ず誰かの心に残り、未来を照らす光になるのだと。', marks: ['strong'] },
      ],
    },
    // 結
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: 'おわりに：あなたの「パラダイス」は、どこにありますか？' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '『ニュー・シネマ・パラダイス』は、単なるノスタルジーに浸る映画じゃない。それは、「便利さ」の名の下に僕らが何を切り捨ててきたのかを、静かに見つめ直させてくれる鏡のような作品だ。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'もし、あなたが最近「何か物足りない」と感じているなら、それは失われた「共有体験」や「完結しない物語」への渇望なのかもしれない。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'この映画を観終わった後、きっとあなたも誰かと語り合いたくなるはずだ。あの頃の映画館のこと、叶わなかった恋のこと、そして、あなた自身の「ニュー・シネマ・パラダイス」のことを。' },
      ],
    },
  ],
};

// 記事を更新する関数
async function rewriteCinemaParadiso() {
  try {
    console.log(`ドキュメントID: ${documentId} の記事をリライトしています...`);
    const result = await client
      .patch(documentId)
      .set({
        title: rewrittenPost.title,
        excerpt: rewrittenPost.excerpt,
        theme: rewrittenPost.theme,
        body: rewrittenPost.body,
      })
      .commit();
    console.log('記事が正常にリライトされました！');
    console.log(`ドキュメントID: ${result._id}`);
  } catch (error) {
    console.error('記事のリライト中にエラーが発生しました:', error);
  }
}

// スクリプトを実行
rewriteCinemaParadiso();
