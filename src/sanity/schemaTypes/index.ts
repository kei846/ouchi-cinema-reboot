import blockContentType from './blockContentType'
import series from './series'
import { goodsCategoryType } from './goodsCategoryType'
import post from './post'
import { linkCardType } from './linkCardType' // 追加

export const schema = {
  types: [
    post,
    blockContentType,
    series,
    goodsCategoryType,
    linkCardType, // 追加
  ],
}