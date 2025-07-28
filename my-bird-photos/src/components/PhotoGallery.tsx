import React, { useState } from 'react';
import { IPhoto } from '../types/photo';
import { characterData } from '../data/character_data';
import { useCollection } from '../hooks/useCollection';
import { useTranslation } from 'react-i18next';
import Masonry from 'react-masonry-css'; // Import Masonry

interface IPhotoGalleryProps {
  photos: IPhoto[];
}

const PhotoGallery: React.FC<IPhotoGalleryProps> = ({ photos }) => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<IPhoto | null>(null);
  const { addToCollection, isInCollection } = useCollection();

  const handleImageClick = (photo: IPhoto) => {
    setSelectedImage(photo);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const characterInfo = selectedImage ? characterData[selectedImage.birdSpecies.ja] : null;

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-item">
          <img src={photo.thumbnail} alt={photo.birdSpecies[i18n.language as keyof typeof photo.birdSpecies]} onClick={() => handleImageClick(photo)} />
          <div className="photo-info">
            <h3>{photo.birdSpecies[i18n.language as keyof typeof photo.birdSpecies]}</h3>
            <p>{photo.prefecture[i18n.language as keyof typeof photo.prefecture]} - {photo.locationDetail[i18n.language as keyof typeof photo.locationDetail]}</p>
            <p>{photo.date}</p>
            <button
              onClick={() => addToCollection(photo)}
              disabled={isInCollection(photo.id)}
              className={isInCollection(photo.id) ? 'added-to-collection' : 'add-to-collection'}
            >
              {t(isInCollection(photo.id) ? 'addedToCollection' : 'addToCollection')}
            </button>
          </div>
        </div>
      ))}

      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.birdSpecies[i18n.language as keyof typeof selectedImage.birdSpecies]} />
            <button className="close-button" onClick={handleCloseModal}>&times;</button>
            <div className="modal-info">
              <h3>{selectedImage.birdSpecies[i18n.language as keyof typeof selectedImage.birdSpecies]}</h3>
              <p>{selectedImage.prefecture[i18n.language as keyof typeof selectedImage.prefecture]} - {selectedImage.locationDetail[i18n.language as keyof typeof selectedImage.locationDetail]}</p>
              <p>{selectedImage.date}</p>
              {selectedImage.memo && <p>{selectedImage.memo[i18n.language as keyof typeof selectedImage.memo]}</p>}

              {characterInfo && (
                <div className="character-section">
                  <h4>{t('characterEncyclopedia')}</h4>
                  <img src={process.env.PUBLIC_URL + characterInfo.image} alt="Character" className="character-image" />
                  <p>{t(characterInfo.descriptionKey)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Masonry>
  );
};

export default PhotoGallery;