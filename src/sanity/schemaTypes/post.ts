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
      name: 'tags',
      title: 'タグ',
      type: 'array',
      of: [{ type: 'string' }],
      description: '「おすすめ」「深層考察」などのタグを入力します。',
    }),
    defineField({
      name: 'theme',
      title: 'テーマ（夜の種類）',
      type: 'string',
      options: {
        list: [
          { title: '無心の夜', value: 'mushin' },
          { title: '問いの夜', value: 'toi' },
        ],
        layout: 'radio',
      },
      description: '記事がどちらの「夜」のテーマに属するか選択してください。',
      initialValue: 'mushin',
      validation: (Rule) => Rule.required(),
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
      name: 'series',
      title: '関連シリーズ',
      type: 'reference',
      to: [{type: 'series'}],
      description: 'この記事が属するシリーズを選択してください。',
    }),
    defineField({
      name: 'body',
      title: '本文',
      type: 'blockContentType',
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});

