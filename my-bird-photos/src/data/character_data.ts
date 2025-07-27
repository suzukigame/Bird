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
  // 他のキャラデータもここに追加
};