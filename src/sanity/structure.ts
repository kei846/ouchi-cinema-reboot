import type {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .id('root')
    .title('コンテンツ')
    .items([
      // 1. 新着記事 (postの全一覧)
      S.listItem()
        .id('new-posts')
        .title('新着記事')
        .schemaType('post')
        .child(
          S.documentList()
            .id('new-posts-list')
            .title('新着記事')
            .filter('_type == "post"')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      // 2. おすすめ記事 (postの絞り込み)
      S.listItem()
        .id('recommended-posts')
        .title('おすすめ記事')
        .schemaType('post')
        .child(
          S.documentList()
            .id('recommended-posts-list')
            .title('おすすめ記事')
            .filter('_type == "post" && "おすすめ" in tags'),
        ),
      // 3. 深層考察の間 (postの絞り込み)
      S.listItem()
        .id('deep-dive-posts')
        .title('深層考察の間')
        .schemaType('post')
        .child(
          S.documentList()
            .id('deep-dive-posts-list')
            .title('深層考察の間')
            .filter('_type == "post" && "深層考察" in tags'),
        ),
      S.divider(),
      // 4. グッズコーナー (goodsCategoryの一覧)
      S.documentTypeListItem('goodsCategory').title('映画グッズコーナー'),
    ])
