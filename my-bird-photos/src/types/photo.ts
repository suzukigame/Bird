export interface IPhoto {
  id: string;
  src: string;
  thumbnail: string;
  prefecture: { ja: string; en: string; zh: string; };
  date: string;
  birdSpecies: { ja: string; en: string; zh: string; };
  locationDetail: { ja: string; en: string; zh: string; };
  memo?: { ja: string; en: string; zh: string; };
  family?: { ja: string; en: string; zh: string; };
}