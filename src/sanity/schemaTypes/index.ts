import blockContentType from './blockContentType'
import series from './series'
import { goodsCategoryType } from './goodsCategoryType'
import post from './post'

export const schema = { // ここを修正
  types: [
    post,
    blockContentType,
    series,
    goodsCategoryType,
  ],
}