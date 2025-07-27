export interface ICharacterData {
  [birdSpecies: string]: {
    image: string;
    description: string;
  };
}

export const characterData: ICharacterData = {
  'オオワシ': {
    image: '/images/characters/Stellers sea eagle.png',
    description: `オオワシは、世界でもっとも大きなワシのなかまのひとつです。
    とても力もちで、空を大きな羽ではばたきながら飛びます。
ロシアで生まれ、日本の北海道に冬にやってきます。

発見した学者の名前から「ステラーワシ」とも呼ばれます。
数が減っていて絶滅危惧種に指定されています。

GBは冬の羅臼で一生分見ましたが、
また会いに行きたいくらいかっこよかったです。
`,
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
    image: '/images/characters/Rock Ptarmigan.png',
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
