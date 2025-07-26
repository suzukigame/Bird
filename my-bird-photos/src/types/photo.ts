export interface IPhoto {
  id: string;
  src: string;
  thumbnail: string;
  prefecture: string;
  date: string;
  birdSpecies: string;
  locationDetail: string;
  memo?: string;
  family?: string; // Add family property
}