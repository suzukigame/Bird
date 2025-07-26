import React from 'react';

interface IPrefectureSelectorProps {
  prefectures: string[];
  selectedPrefecture: string | null;
  onSelectPrefecture: (prefecture: string | null) => void;
}

const PrefectureSelector: React.FC<IPrefectureSelectorProps> = ({
  prefectures,
  selectedPrefecture,
  onSelectPrefecture,
}) => {
  return (
    <div className="prefecture-selector">
      <button
        onClick={() => onSelectPrefecture(null)}
        className={selectedPrefecture === null ? 'active' : ''}
      >
        全ての都道府県
      </button>
      {prefectures.map((prefecture) => (
        <button
          key={prefecture}
          onClick={() => onSelectPrefecture(prefecture)}
          className={selectedPrefecture === prefecture ? 'active' : ''}
        >
          {prefecture}
        </button>
      ))}
    </div>
  );
};

export default PrefectureSelector;
