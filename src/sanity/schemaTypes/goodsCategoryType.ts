import {defineField, defineType} from 'sanity'

export const goodsCategoryType = defineType({
  name: 'goodsCategory',
  title: 'グッズカテゴリ',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'カテゴリ名',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'color',
      title: '背景グラデーション',
      type: 'string',
      description: 'Tailwindのクラス名を記述 (例: from-[#1a1a1a] to-[#262626])',
    }),
  ],
})
