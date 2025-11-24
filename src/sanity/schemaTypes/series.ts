import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'series',
  title: 'シリーズ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'シリーズ名',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ（URL）',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '概要',
      type: 'text',
      rows: 3,
      description: 'シリーズ全体の説明を入力してください。',
    }),
    defineField({
      name: 'color',
      title: 'テーマカラー',
      type: 'string',
      options: {
        list: [
          { title: '青（静寂）', value: 'from-blue-900 to-indigo-900' },
          { title: '赤（情熱）', value: 'from-red-900 to-pink-900' },
          { title: '緑（癒し）', value: 'from-green-900 to-emerald-900' },
          { title: '黄（光）', value: 'from-yellow-900 to-amber-900' },
        ],
        layout: 'radio',
      },
      initialValue: 'from-blue-900 to-indigo-900',
      description: 'シリーズカードの背景グラデーションカラー。',
    }),
    defineField({
      name: 'posts',
      title: '含まれる記事',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      description: 'このシリーズに含まれる記事を選択してください。',
    }),
  ],
});

