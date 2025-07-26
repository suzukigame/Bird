import React, { useState, useMemo } from 'react';
import './App.css';
import { prefectures } from './data/prefectures';
import { photos } from './data/photos';

import PhotoGallery from './components/PhotoGallery';
import JapanMap from './components/JapanMap';
import YearSelector from './components/YearSelector';
import BirdSpeciesSelector from './components/BirdSpeciesSelector';
import { Tooltip } from 'react-tooltip';


function App() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);

  const handleSelectPrefecture = (prefecture: string | null) => {
    setSelectedPrefecture(prefecture);
  };

  const uniqueYears = useMemo(() => {
    const years = new Set<string>();
    photos.forEach(photo => {
      const year = photo.date.substring(0, 4);
      years.add(year);
    });
    return Array.from(years).sort();
  }, []);

  const uniqueBirdSpecies = useMemo(() => {
    const species = new Set<string>();
    photos.forEach(photo => {
      species.add(photo.birdSpecies);
    });
    return Array.from(species).sort();
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesPrefecture = selectedPrefecture === null || photo.prefecture === selectedPrefecture;
      return matchesPrefecture;
    });
  }, [selectedPrefecture]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>GauraBirder奮闘記</h1>
      </header>
      <main>
        
        <PrefectureSelector
          prefectures={prefectures}
          selectedPrefecture={selectedPrefecture}
          onSelectPrefecture={handleSelectPrefecture}
        />
        <PhotoGallery photos={filteredPhotos} />
      </main>
    </div>
  );
}

export default App;