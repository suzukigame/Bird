export interface ICharacterData {
  [birdSpecies: string]: {
    image: string;
    descriptionKey: string; // descriptionをdescriptionKeyに変更
  };
}

export const characterData: ICharacterData = {
  'オオワシ': {
    image: '/images/characters/Stellers sea eagle.png',
    descriptionKey: 'description.stellersSeaEagle',
  },
  'コマドリ': {
    image: '/images/characters/komadori.png',
    descriptionKey: 'description.komadori',
  },
  'オジロワシ': {
    image: '/images/characters/White-tailed eagle.png',
    descriptionKey: 'description.whiteTailedEagle',
  },
  'スズメ': {
    image: '/images/characters/sparrow.png',
    descriptionKey: 'description.sparrow',
  },
  'ライチョウ': {
    image: '/images/characters/Rock Ptarmigan.png',
    descriptionKey: 'description.rockPtarmigan',
  },
  'シマフクロウ': {
    image: '/images/characters/Blakistons fish Owl.png',
    descriptionKey: 'description.blakistonsFishOwl',
  },
  'タンチョウ': {
    image: '/images/characters/Red-crowned crane.png',
    descriptionKey: 'description.redCrownedCrane',
  },
  'オオハクチョウ': {
    image: '/images/characters/Whooper swan.png',
    descriptionKey: 'description.whooperSwan',
  },
  // 他のキャラデータもここに追加
};
