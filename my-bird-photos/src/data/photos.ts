import { IPhoto } from '../types/photo';

export const photos: IPhoto[] = [
  {
    id: '1',
    src: process.env.PUBLIC_URL + '/images/birds/2025/茨城県/0717/20250719_ibaraki_owl.JPG',
    thumbnail: process.env.PUBLIC_URL + '/images/birds/2025/茨城県/0717/20250719_ibaraki_owl.JPG',
    prefecture: '茨城県',
    date: '2025-07-19',
    birdSpecies: 'フクロウ',
    locationDetail: '',
    memo: '',
  },
  {
    id: '2',
    src: process.env.PUBLIC_URL + '/images/birds/2025/茨城県/0717/20250717_ibaraki_asianparadiseflycatcher.JPG',
    thumbnail: process.env.PUBLIC_URL + '/images/birds/2025/茨城県/0717/20250717_ibaraki_asianparadiseflycatcher.JPG',
    prefecture: '茨城県',
    date: '2025-07-17',
    birdSpecies: 'サンコウチョウ',
    locationDetail: '',
    memo: '',
  },
  {
    id: '3',
    src: process.env.PUBLIC_URL + '/images/birds/2025/茨城県/0712/20250712_ibaraki_tern.JPG',
    thumbnail: process.env.PUBLIC_URL + '/images/birds/2025/茨城県/0712/20250712_ibaraki_tern.JPG',
    prefecture: '茨城県',
    date: '2025-07-12',
    birdSpecies: 'アジサシ',
    locationDetail: '',
    memo: '',
  },
  {
    id: '4',
    src: process.env.PUBLIC_URL + '/images/birds/2025/茨城県/0712/20250712_ibaraki_sparrowhawk.JPG',
    thumbnail: process.env.PUBLIC_URL + '/images/birds/2025/茨城県/0712/20250712_ibaraki_sparrowhawk.JPG',
    prefecture: '茨城県',
    date: '2025-07-12',
    birdSpecies: 'ツミ',
    locationDetail: '',
    memo: '',
  },
];
