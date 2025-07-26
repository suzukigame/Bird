import { IPhoto } from '../types/photo';

export const photos: IPhoto[] = [
  {
    id: '1',
    src: process.env.PUBLIC_URL + '/images/birds/20250719_ibaraki_owl01.JPG',
    thumbnail: process.env.PUBLIC_URL + '/images/birds/20250719_ibaraki_owl01.JPG',
    prefecture: '茨城県',
    date: '2025-07-19',
    birdSpecies: 'owl01',
    locationDetail: '',
    memo: '',
  },
  {
    id: '2',
    src: process.env.PUBLIC_URL + '/images/birds/20250717_ibaraki_asianparadiseflycatcher.JPG',
    thumbnail: process.env.PUBLIC_URL + '/images/birds/20250717_ibaraki_asianparadiseflycatcher.JPG',
    prefecture: '茨城県',
    date: '2025-07-17',
    birdSpecies: 'サンコウチョウ',
    locationDetail: '',
    memo: '',
  },
];
