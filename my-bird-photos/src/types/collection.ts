export interface ICollectionItem {
  id: string;
  birdSpecies: string;
  src: string;
  thumbnail: string;
  prefecture: string;
  date: string;
  locationDetail: { ja: string; en: string; }; // 修正
  memo?: { ja: string; en: string; }; // 追加
  family?: string;
}