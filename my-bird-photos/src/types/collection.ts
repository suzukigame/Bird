export interface ICollectionItem {
  id: string;
  birdSpecies: string;
  src: string;
  thumbnail: string;
  prefecture: string;
  date: string;
  locationDetail: string; // Add locationDetail property
  family?: string;
}