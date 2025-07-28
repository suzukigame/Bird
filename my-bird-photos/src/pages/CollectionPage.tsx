import React, { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { IPhoto } from '../types/photo';
import { characterData } from '../data/character_data';
import { useTranslation } from 'react-i18next';

const CollectionPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { collection, removeFromCollection } = useCollection();
  const [selectedImage, setSelectedImage] = useState<IPhoto | null>(null);

  const handleImageClick = (photo: IPhoto) => {
    setSelectedImage(photo);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const characterInfo = selectedImage ? characterData[selectedImage.birdSpecies] : null;

  // descriptionの改行を<br />に変換するヘルパー関数
  const formatDescription = (description: string) => {
    return description.split('\n').map((item, key) => (
      <React.Fragment key={key}>
        {item}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="collection-page">
      <h2>{t('myCollectionTitle')}</h2>
      {collection.length === 0 ? (
        <p>{t('noBirdsInCollection')}</p>
      ) : (
        <div className="photo-gallery">
          {collection.map((photo) => (
            <div key={photo.id} className="photo-item">
              <img src={photo.thumbnail} alt={photo.birdSpecies} onClick={() => handleImageClick(photo)} />
              <div className="photo-info">
                <h3>{photo.birdSpecies}</h3>
                <p>{photo.prefecture} - {photo.locationDetail[i18n.language as keyof typeof photo.locationDetail]}</p>
                <p>{photo.date}</p>
                <button onClick={() => removeFromCollection(photo.id)} className="remove-from-collection">
                  {t('removeFromCollection')}
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
              <p>{selectedImage.prefecture} - {selectedImage.locationDetail[i18n.language as keyof typeof selectedImage.locationDetail]}</p>
              <p>{selectedImage.date}</p>
              {selectedImage.memo && <p>{selectedImage.memo[i18n.language as keyof typeof selectedImage.memo]}</p>}

              {characterInfo && (
                <div className="character-section">
                  <h4>{t('characterEncyclopedia')}</h4>
                  <img src={process.env.PUBLIC_URL + characterInfo.image} alt="Character" className="character-image" />
                                    <p>{formatDescription(t(characterInfo.descriptionKey))}</p>
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