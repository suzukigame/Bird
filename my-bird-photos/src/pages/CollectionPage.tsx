import React, { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { IPhoto } from '../types/photo';
import { characterData } from '../data/character_data';

const CollectionPage: React.FC = () => {
  const { collection, removeFromCollection } = useCollection();
  const [selectedImage, setSelectedImage] = useState<IPhoto | null>(null);

  const handleImageClick = (photo: IPhoto) => {
    setSelectedImage(photo);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const characterInfo = selectedImage ? characterData[selectedImage.birdSpecies] : null;

  return (
    <div className="collection-page">
      <h2>マイ図鑑</h2>
      {collection.length === 0 ? (
        <p>まだ図鑑に鳥が追加されていません。</p>
      ) : (
        <div className="photo-gallery">
          {collection.map((photo) => (
            <div key={photo.id} className="photo-item">
              <img src={photo.thumbnail} alt={photo.birdSpecies} onClick={() => handleImageClick(photo)} />
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

      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.birdSpecies} />
            <button className="close-button" onClick={handleCloseModal}>&times;</button>
            <div className="modal-info">
              <h3>{selectedImage.birdSpecies}</h3>
              <p>{selectedImage.prefecture} - {selectedImage.locationDetail}</p>
              <p>{selectedImage.date}</p>
              {selectedImage.memo && <p>{selectedImage.memo}</p>}

              {characterInfo && (
                <div className="character-section">
                  <h4>キャラ図鑑</h4>
                  <img src={process.env.PUBLIC_URL + characterInfo.image} alt="Character" className="character-image" />
                  <p>{characterInfo.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;