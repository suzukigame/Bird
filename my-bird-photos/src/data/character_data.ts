export interface ICharacterData {
  [birdSpecies: string]: {
    image: string;
    description: string;
  };
}

export const characterData: ICharacterData = {
  'オオワシ': {
    image: '/images/characters/Stellers sea eagle.png',
    description: '北の空を舞う、威厳ある姿の大型猛禽類だよ！',
  },
  'コマドリ': {
    image: '/images/characters/komadori.png',
    description: '日本三鳴鳥の一種で、美しい声でさえずるよ！',
  },
  'オジロワシ': {
    image: '/images/characters/White-tailed eagle.png',
    description: '白い尾羽が特徴の、力強いワシだよ！',
  },
  'スズメ': {
    image: '/images/characters/sparrow.png',
    description: 'みんなの身近にいる、ちっちゃな友達だよ！',
  },
  'ライチョウ': {
    image: '/images/characters/Rock/Ptarmigan.png',
    description: '高山に住む、季節で羽の色が変わる不思議な鳥だよ！',
  },
  'シマフクロウ': {
    image: '/images/characters/Blakistons fish Owl.png',
    description: '日本最大のフクロウで、魚を捕まえるのが得意だよ！',
  },
  'オオハクチョウ': {
    image: '/images/characters/Whooper swan.png',
    description: '優雅な姿で冬の湖を彩る、大きな白鳥だよ！',
  },
  // 他のキャラデータもここに追加
};
