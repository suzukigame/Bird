export interface ICharacterData {
  [birdSpecies: string]: {
    image: string;
    descriptionKey: string;
    stats?: { [key: string]: number }; // レーダーチャート用のデータ
  };
}

export const characterData: ICharacterData = {
  'オオワシ': {
    image: '/images/characters/Stellers sea eagle.png',
    descriptionKey: 'description.stellersSeaEagle',
    stats: { popularity: 3, individualCount: 3, cuteness: 3, coolness: 3, visibility: 3 },
  },
  'コマドリ': {
    image: '/images/characters/komadori.png',
    descriptionKey: 'description.komadori',
    stats: { popularity: 3, individualCount: 3, cuteness: 3, coolness: 3, visibility: 3 },
  },
  'オジロワシ': {
    image: '/images/characters/White-tailed eagle.png',
    descriptionKey: 'description.whiteTailedEagle',
    stats: { popularity: 3, individualCount: 3, cuteness: 3, coolness: 3, visibility: 3 },
  },
  'スズメ': {
    image: '/images/characters/sparrow.png',
    descriptionKey: 'description.sparrow',
    stats: { popularity: 3, individualCount: 3, cuteness: 3, coolness: 3, visibility: 3 },
  },
  'ライチョウ': {
    image: '/images/characters/Rock Ptarmigan.png',
    descriptionKey: 'description.rockPtarmigan',
    stats: { popularity: 3, individualCount: 3, cuteness: 3, coolness: 3, visibility: 3 },
  },
  'シマフクロウ': {
    image: '/images/characters/Blakistons fish Owl.png',
    descriptionKey: 'description.blakistonsFishOwl',
    stats: { popularity: 3, individualCount: 3, cuteness: 3, coolness: 3, visibility: 3 },
  },
  'タンチョウ': {
    image: '/images/characters/Red-crowned crane.png',
    descriptionKey: 'description.redCrownedCrane',
    stats: { popularity: 3, individualCount: 3, cuteness: 3, coolness: 3, visibility: 3 },
  },
  'オオハクチョウ': {
    image: '/images/characters/Whooper swan.png',
    descriptionKey: 'description.whooperSwan',
    stats: { popularity: 3, individualCount: 3, cuteness: 3, coolness: 3, visibility: 3 },
  },
  // 他のキャラデータもここに追加
};