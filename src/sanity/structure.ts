// src/sanity/structure.ts
import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('コンテンツ')
    .id('content-root')
    .items([
      // === 記事セクション ===
      S.listItem()
        .title('記事')
        .id('post-root')
        .child(
          S.list()
            .title('記事')
            .id('post-sub')
            .items([
              S.listItem()
                .title('無心の夜')
                .id('mushin-night')
                .child(
                  S.documentTypeList('post')
                    .title('無心の夜')
                    .filter('_type == "post" && "無心の夜" in tags')
                ),
              S.listItem()
                .title('問いの夜')
                .id('toi-night')
                .child(
                  S.documentTypeList('post')
                    .title('問いの夜')
                    .filter('_type == "post" && "問いの夜" in tags')
                ),
              S.listItem()
                .title('すべての記事')
                .id('all-posts')
                .child(S.documentTypeList('post').title('すべての記事')),
            ])
        ),

      // === シリーズ ===
      S.listItem()
        .title('シリーズ')
        .id('series')
        .child(S.documentTypeList('series').title('シリーズ一覧')),

      // === 区切り線 ===
      S.divider(),

      // === おすすめ記事 ===
      S.listItem()
        .title('おすすめ記事')
        .id('recommend-posts')
        .child(
          S.documentTypeList('post')
            .title('おすすめ記事')
            .filter('_type == "post" && "おすすめ" in tags')
        ),

      // === 深層考察 ===
      S.listItem()
        .title('深層考察')
        .id('deep-posts')
        .child(
          S.documentTypeList('post')
            .title('深層考察')
            .filter('_type == "post" && "深層考察" in tags')
        ),

      // === 映画グッズコーナー ===
      S.listItem()
        .title('映画グッズコーナー')
        .id('goods-corner')
        .child(S.documentTypeList('goodsCategory').title('グッズカテゴリ')),
    ])

