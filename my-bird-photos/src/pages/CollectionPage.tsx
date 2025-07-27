import React from 'react';
import { useCollection } from '../hooks/useCollection';
import PhotoGallery from '../components/PhotoGallery';

const CollectionPage: React.FC = () => {
  const { collection, removeFromCollection } = useCollection();

  return (
    <div className="collection-page">
      <h2>マイ図鑑</h2>
      {collection.length === 0 ? (
        <p>まだ図鑑に鳥が追加されていません。</p>
      ) : (
        <div className="photo-gallery">
          {collection.map((photo) => (
            <div key={photo.id} className="photo-item">
              <img src={photo.thumbnail} alt={photo.birdSpecies} />
              <div className="photo-info">
                <h3>{photo.birdSpecies}</h3>
                <p>{photo.prefecture} - {photo.locationDetail}</p>
                <p>{photo.date}</p>
                <button onClick={() => removeFromCollection(photo.id)} className="remove-from-collection">
                  図鑑から削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
