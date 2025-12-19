// src/sanity/structure.ts
import type { StructureBuilder, DefaultDocumentNodeResolver } from 'sanity/structure'
import IFrame from './components/IFrame'

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
                    .filter('_type == "post" && theme == "mushin"')
                ),
              S.listItem()
                .title('問いの夜')
                .id('toi-night')
                .child(
                  S.documentTypeList('post')
                    .title('問いの夜')
                    .filter('_type == "post" && theme == "toi"')
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
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view.component(IFrame).options({
        url: (doc: any) => `http://localhost:3000/api/preview?secret=cmVFxHHkavKCerUB7e4MD8p0qECm5EamtzPm/Z7cs6Y=&slug=${doc.slug.current}`,
        reload: {
          button: true,
        },
      }).title('Preview'),
    ]);
  }
  return S.document().views([S.view.form()]);
};
