// src/sanity/schemaTypes/linkCardType.ts
import { defineType, defineField } from 'sanity';

export const linkCardType = defineType({
  name: 'linkCard',
  title: 'Link Card',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: '外部リンクのURLを入力してください。OGP情報を取得して表示します。',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https'],
      }),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare({ url }) {
      return {
        title: url || 'No URL',
        subtitle: 'Link Card',
      };
    },
  },
});
