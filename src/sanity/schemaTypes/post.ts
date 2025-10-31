import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'post',
  title: '記事',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ（URL）',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: '夜のタイプ',
      type: 'string',
      options: {
        list: [
          { title: '無心の夜', value: 'mushin' },
          { title: '問いの夜', value: 'toi' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'タグ',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'theme',
      title: 'テーマカラー',
      type: 'string',
      options: {
        list: [
          { title: 'ライト（白）', value: 'light' },
          { title: 'ダーク（黒）', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
      description: '記事全体の背景トーンを選択します。',
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'リード文（概要）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'series', // 新しく追加するフィールド名
      title: '関連シリーズ',
      type: 'reference',
      to: [{type: 'series'}], // series スキーマを参照
      description: 'この記事が属するシリーズを選択してください。',
    }),
    defineField({
      name: 'body',
      title: '本文',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});

