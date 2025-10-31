import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'series',
  title: 'シリーズ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'シリーズ名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'description',
      title: '概要',
      type: 'text',
      rows: 3,
      description: 'このシリーズの説明やテーマを記載してください。',
    }),
    defineField({
      name: 'color',
      title: '背景カラー',
      type: 'string',
      description: 'シリーズカードの背景色（例: from-[#0a0f1f] to-[#111a33])',
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})

