import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'blockContentType',
  title: '本文ブロック',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: '通常', value: 'normal' },
        { title: '見出し1', value: 'h1' },
        { title: '見出し2', value: 'h2' },
      ],
      marks: {
        decorators: [
          { title: '太字', value: 'strong' },
          { title: '斜体', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'リンク',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
            ],
          },
        ],
      },
    }),

    // ✅ コードブロックは削除
    // defineArrayMember({ type: 'code' }),

    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})

