import {defineField, defineType} from 'sanity';
import {MoonIcon, SparklesIcon} from '@sanity/icons';

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
      name: 'layoutStyle',
      title: 'レイアウトスタイル',
      type: 'string',
      options: {
        list: [
          { title: '通常レイアウト', value: 'default' },
          { title: 'Vlog風レイアウト', value: 'vibe' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: { hotspot: true },
      description: '手動でアップロードする場合のメイン画像です。',
    }),
    defineField({
      name: 'mainImageUrl',
      title: 'サムネイルURL',
      type: 'url',
      description: '記事内のYouTubeリンクから自動取得したサムネイルURL。設定されている場合、メイン画像よりこちらが優先されます。',
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
  preview: {
    select: {
      title: 'title',
      theme: 'theme',
      media: 'mainImage',
    },
    prepare({ title, theme, media }) {
      const icon = theme === 'mushin' ? MoonIcon : theme === 'toi' ? SparklesIcon : undefined;
      return {
        title: title,
        subtitle: theme === 'mushin' ? '無心の夜' : theme === 'toi' ? '問いの夜' : '',
        media: icon || media,
      };
    },
  },
});
