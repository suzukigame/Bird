import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { prefectures } from './data/prefectures';
import { photos } from './data/photos';
import { birdDatabase } from './data/bird_database';
import { useTranslation } from 'react-i18next';

import PhotoGallery from './components/PhotoGallery';
import PrefectureSelector from './components/PrefectureSelector';
import YearSelector from './components/YearSelector';
import BirdSpeciesSelector from './components/BirdSpeciesSelector';
import FamilySelector from './components/FamilySelector';
import CollectionPage from './pages/CollectionPage';


function App() {
  const { t, i18n } = useTranslation();
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedBirdSpecies, setSelectedBirdSpecies] = useState<string | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  const handleSelectPrefecture = (prefecture: string | null) => {
    setSelectedPrefecture(prefecture);
  };

  const handleSelectYear = (year: string | null) => {
    setSelectedYear(year);
  };

  const handleSelectBirdSpecies = (species: string | null) => {
    setSelectedBirdSpecies(species);
  };

  const handleSelectFamily = (family: string | null) => {
    setSelectedFamily(family);
    setSelectedBirdSpecies(null); // Reset bird species when family changes
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
      // If no family is selected (null or empty string), include all bird species
      if (!selectedFamily || photo.family?.ja === selectedFamily) {
        species.add(photo.birdSpecies[i18n.language as keyof typeof photo.birdSpecies]);
      }
    });
    return Array.from(species).sort();
  }, [photos, selectedFamily]);

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesPrefecture = selectedPrefecture === null || photo.prefecture[i18n.language as keyof typeof photo.prefecture] === selectedPrefecture;
      const matchesYear = selectedYear === null || photo.date.startsWith(selectedYear);
      const matchesBirdSpecies = selectedBirdSpecies === null || photo.birdSpecies[i18n.language as keyof typeof photo.birdSpecies] === selectedBirdSpecies;
      const matchesFamily = !selectedFamily || photo.family?.ja === selectedFamily;
      return matchesPrefecture && matchesYear && matchesBirdSpecies && matchesFamily;
    });
  }, [selectedPrefecture, selectedYear, selectedBirdSpecies, selectedFamily]);

  

  const foundBirdSpeciesCount = useMemo(() => {
    const uniqueSpecies = new Set<string>();
    filteredPhotos.forEach(photo => uniqueSpecies.add(photo.birdSpecies[i18n.language as keyof typeof photo.birdSpecies]));
    return uniqueSpecies.size;
  }, [filteredPhotos]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="App-header">
          <h1>{t('appTitle')}</h1>
          <nav>
            <Link to="/">{t('gallery')}</Link>
            <Link to="/collection">{t('myCollection')}</Link>
          </nav>
          <div className="language-selector">
            <label htmlFor="language-select">{t('language')}: </label>
            <select id="language-select" onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
              <option value="ja">{t('japanese')}</option>
              <option value="en">{t('english')}</option>
              <option value="zh">{t('chinese')}</option>
            </select>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <FamilySelector
                  selectedFamily={selectedFamily || ''}
                  onSelectFamily={handleSelectFamily}
                />
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
                  selectedFamily={selectedFamily} // Pass selectedFamily prop
                />
                <p>{t('foundBirdSpeciesCount', { count: foundBirdSpeciesCount })}</p>
                <PhotoGallery photos={filteredPhotos} />
              </>
            } />
            <Route path="/collection" element={<CollectionPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;