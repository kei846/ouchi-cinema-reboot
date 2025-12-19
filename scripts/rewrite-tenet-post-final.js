// scripts/rewrite-tenet-post-final.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const rewrittenPost = {
  _type: 'post', // ドキュメントタイプを指定
  title: '『TENET』を読み解く3つのルール - 難解映画の正体',
  slug: {
    _type: 'slug',
    current: 'tenet-time-inversion-rules',
  },
  theme: 'toi', // テーマをtoiに設定
  excerpt: 'クリストファー・ノーラン監督の『TENET』。観終わった後、多くの人が「面白かったけど、よく分からなかった」という感想を抱く、まさに「問いの夜」にふさわしい映画だ。',
  tags: ['深層考察'],
  body: [
    // Introduction
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'クリストファー・ノーラン監督の『TENET』。観終わった後、多くの人が「面白かったけど、よく分からなかった」という感想を抱く、まさに「問いの夜」にふさわしい映画だ。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'でも、もしこの映画の根幹をなす「時間逆行」のルールが、たった3つだと聞いたらどうだろう？' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'この記事では、難解とされる『TENET』の世界を、3つのシンプルなルールで読み解いていく。これを読めば、あなたもきっと「もう一度観たい！」と思うはずだ。' },
      ],
    },
    // Rule 1
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: 'ルール1：時間は「逆行」するが、「巻き戻る」わけではない' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '『TENET』の最大の特徴は、モノの「エントロピー（乱雑さ）」が逆行する現象だ。弾痕に吸い込まれる弾丸、転覆した車が元に戻る様は、まさに時間が逆再生されているように見える。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'しかし、重要なのは、これは「タイムトラベル」とは違うということ。過去に飛ぶのではなく、時間の流れを逆向きに進んでいるだけなのだ。' },
      ],
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [
        { _type: 'span', text: '順行する視点から見れば、逆行する人間は「後ろ向きに動いている」ように見える。逆に、逆行する人間から見れば、周りの世界がすべて「逆再生」しているように見える。ただ、それだけのことだ。' },
      ],
    },
    // Rule 2
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: 'ルール2：同じ人間が同じ時間に存在すると「対消滅」する' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'これが、この映画のサスペンスを加速させるルールだ。順行している自分と、逆行している自分が接触すると、「対消滅」という恐ろしい現象が起きる。だから、逆行する際は、過去の自分に出会わないように、細心の注意を払わなければならない。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '防護服を着ているのは、単に逆行世界で呼吸するためだけではない。過去の自分との不意の遭遇を防ぐための、最後の砦でもあるのだ。' },
      ],
    },
    // Rule 3
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: 'ルール3：「起きたこと」は変えられない（祖父のパラドックスは起きない）' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'タイムトラベル映画でよくある「過去を変えたら未来が変わる」という展開。しかし、『TENET』の世界では、それは起こらない。「起きたことは、もう起きている」のだ。' },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        { _type: 'span', text: '祖父殺しのパラドックスとは何か？' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '「祖父殺しのパラドックス」とは、タイムトラベルの可能性を考える際に必ず浮上する、有名な思考実験だ。' },
      ],
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [
        { _type: 'span', text: 'もし過去に戻って、自分の祖父を殺したらどうなるのか？', marks: ['strong'] },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '論理はこうだ。祖父が死ねば、父親は生まれない。父親が生まれなければ、自分も生まれない。しかし、自分が生まれなかったら、そもそも過去に戻って祖父を殺すこともできない。すると祖父は生きていることになり、父親も自分も生まれる。するとまた祖父を殺しに行ける——。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '完全に矛盾している。', marks: ['strong'] },
        { _type: 'span', text: 'これがパラドックスだ。' },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        { _type: 'span', text: '『TENET』が示す答え' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'ノーラン監督は、この古典的なパラドックスに対して、明確な立場を取っている。' },
      ],
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [
        { _type: 'span', text: '「起きたことは、最初から起きていた」', marks: ['strong'] },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '未来から来た人間が過去に干渉した結果も、すべて「最初から歴史に織り込み済み」という考え方だ。つまり、過去を「変える」ことはできない。なぜなら、未来人が過去で行ったことは、すでに「その時代の出来事」として確定しているからだ。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'これによって、祖父殺しのパラドックスは起きない。仮に過去に戻ったとしても、何らかの理由で祖父を殺すことはできない。銃が故障するかもしれないし、誰かに止められるかもしれない。いずれにせる、「歴史」はすでに確定しているのだ。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'これを「運命論」と捉えるか、「自由意志の否定」と捉えるか。ここに、ノーラン監督が仕掛けた最大の「問い」がある。' },
      ],
    },
    // Why Nolan made it
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: 'なぜノーランは、これほど難解な物語を作ったのか？' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '彼は、観客に「体験」してほしかったのだ。時間の流れが入り乱れる映像を、理屈で理解するのではなく、五感で感じてほしかった。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '主人公が初めて逆行の世界に足を踏み入れたときの、あの混乱と驚き。それこそが、ノーランが私たちに与えたかった純粋な映画体験そのものなのだ。' },
      ],
    },
    // Conclusion
    {
      _type: 'block',
      style: 'h2',
      children: [
        { _type: 'span', text: 'おわりに：未来は、変えられるのか？' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '「起きたことは変えられない」というルールは、一見すると絶望的に聞こえる。しかし、主人公たちはそのルールの中で、未来を知る者として「今、何をするか」を選択し、戦い続ける。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: '『TENET』が本当に描きたかったのは、未来が決定しているかどうかではなく、その中で「どう行動するか」という人間の意志の力なのかもしれない。' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'この映画は、一度観ただけではすべてを理解できない。だが、それでいい。何度も観て、その度に新しい発見がある。それこそが、ノーランが仕掛けた壮大な「挑戦状」なのだから。' },
      ],
    },
  ],
};

async function rewriteTenetPost() {
  try {
    console.log('『TENET』の記事を再作成しています...');
    const result = await client.create(rewrittenPost);
    console.log('記事が正常に再作成されました！');
    console.log(`ドキュメントID: ${result._id}`);
  } catch (error) {
    console.error('記事の再作成中にエラーが発生しました:', error);
  }
}

// スクリプトを実行
rewriteTenetPost();
