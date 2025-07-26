import React, { useState, useMemo } from 'react';
import './App.css';
import { prefectures } from './data/prefectures';
import { photos } from './data/photos';
import PrefectureSelector from './components/PrefectureSelector';
import PhotoGallery from './components/PhotoGallery';
import JapanMap from './components/JapanMap';
import YearSelector from './components/YearSelector';
import BirdSpeciesSelector from './components/BirdSpeciesSelector';
import { Tooltip } from 'react-tooltip';


function App() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedBirdSpecies, setSelectedBirdSpecies] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string>("");

  const handleSelectPrefecture = (prefecture: string | null) => {
    setSelectedPrefecture(prefecture);
  };

  const handleSelectYear = (year: string | null) => {
    setSelectedYear(year);
  };

  const handleSelectBirdSpecies = (species: string | null) => {
    setSelectedBirdSpecies(species);
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
      const matchesYear = selectedYear === null || photo.date.startsWith(selectedYear);
      const matchesBirdSpecies = selectedBirdSpecies === null || photo.birdSpecies === selectedBirdSpecies;
      return matchesPrefecture && matchesYear && matchesBirdSpecies;
    });
  }, [selectedPrefecture, selectedYear, selectedBirdSpecies]);

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
        <YearSelector
          years={uniqueYears}
          selectedYear={selectedYear}
          onSelectYear={handleSelectYear}
        />
        <BirdSpeciesSelector
          birdSpecies={uniqueBirdSpecies}
          selectedBirdSpecies={selectedBirdSpecies}
          onSelectBirdSpecies={handleSelectBirdSpecies}
        />
        <JapanMap setTooltipContent={setTooltipContent} onSelectPrefecture={handleSelectPrefecture} />
        <Tooltip>{tooltipContent}</Tooltip>
        <PhotoGallery photos={filteredPhotos} />
      </main>
    </div>
  );
}

export default App;