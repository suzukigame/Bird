export interface ICollectionItem {
  id: string;
  birdSpecies: { ja: string; en: string; zh: string; };
  src: string;
  thumbnail: string;
  prefecture: { ja: string; en: string; zh: string; };
  date: string;
  locationDetail: { ja: string; en: string; zh: string; };
  memo?: { ja: string; en: string; zh: string; };
  family?: { ja: string; en: string; zh: string; };
}