import { useState, useEffect } from 'react';
import { IPhoto } from '../types/photo';
import { ICollectionItem } from '../types/collection';

const COLLECTION_KEY = 'birdCollection';

export const useCollection = () => {
  const [collection, setCollection] = useState<ICollectionItem[]>([]);

  useEffect(() => {
    const storedCollection = localStorage.getItem(COLLECTION_KEY);
    if (storedCollection) {
      setCollection(JSON.parse(storedCollection));
    }
  }, []);

  const addToCollection = (photo: IPhoto) => {
    setCollection((prevCollection) => {
      const isAlreadyInCollection = prevCollection.some(item => item.id === photo.id);
      if (isAlreadyInCollection) {
        return prevCollection; // Already in collection, do nothing
      }
      const newCollection = [...prevCollection, photo as ICollectionItem];
      localStorage.setItem(COLLECTION_KEY, JSON.stringify(newCollection));
      return newCollection;
    });
  };

  const removeFromCollection = (photoId: string) => {
    setCollection((prevCollection) => {
      const newCollection = prevCollection.filter(item => item.id !== photoId);
      localStorage.setItem(COLLECTION_KEY, JSON.stringify(newCollection));
      return newCollection;
    });
  };

  const isInCollection = (photoId: string) => {
    return collection.some(item => item.id === photoId);
  };

  return { collection, addToCollection, removeFromCollection, isInCollection };
};
