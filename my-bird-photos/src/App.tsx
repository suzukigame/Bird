import React, { useState, useMemo } from 'react';
import './App.css';
import { prefectures } from './data/prefectures';
import { photos } from './data/photos';
import PrefectureSelector from './components/PrefectureSelector';
import PhotoGallery from './components/PhotoGallery';
import JapanMap from './components/JapanMap';
import { Tooltip } from 'react-tooltip';


function App() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string>("");

  const handleSelectPrefecture = (prefecture: string | null) => {
    setSelectedPrefecture(prefecture);
  };

  const filteredPhotos = useMemo(() => {
    if (selectedPrefecture === null) {
      return photos;
    }
    return photos.filter(photo => photo.prefecture === selectedPrefecture);
  }, [selectedPrefecture]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>日本の野鳥、都道府県で巡る写真の旅</h1>
      </header>
      <main>
        <PrefectureSelector
          prefectures={prefectures}
          selectedPrefecture={selectedPrefecture}
          onSelectPrefecture={handleSelectPrefecture}
        />
        <JapanMap setTooltipContent={setTooltipContent} onSelectPrefecture={handleSelectPrefecture} />
        <Tooltip>{tooltipContent}</Tooltip>
        <PhotoGallery photos={filteredPhotos} />
      </main>
    </div>
  );
}

export default App;