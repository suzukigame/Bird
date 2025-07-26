import React from 'react';
import { IPhoto } from '../types/photo';

interface IPhotoGalleryProps {
  photos: IPhoto[];
}

const PhotoGallery: React.FC<IPhotoGalleryProps> = ({ photos }) => {
  return (
    <div className="photo-gallery">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-item">
          <img src={photo.thumbnail} alt={photo.birdSpecies} />
          <div className="photo-info">
            <h3>{photo.birdSpecies}</h3>
            <p>{photo.prefecture} - {photo.locationDetail}</p>
            <p>{photo.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
