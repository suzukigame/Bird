export interface ICollectionItem {
  id: string;
  birdSpecies: { ja: string; en: string; zh: string; };
  src: string;
  thumbnail: string;
  prefecture: string;
  date: string;
  locationDetail: { ja: string; en: string; zh: string; }; // 修正
  memo?: { ja: string; en: string; zh: string; }; // 追加
  family?: string;
}