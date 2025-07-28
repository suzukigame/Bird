export interface IPhoto {
  id: string;
  src: string;
  thumbnail: string;
  prefecture: string;
  date: string;
  birdSpecies: string;
  locationDetail: { ja: string; en: string; }; // Change to object
  memo?: { ja: string; en: string; }; // Change to object
  family?: string;
}
