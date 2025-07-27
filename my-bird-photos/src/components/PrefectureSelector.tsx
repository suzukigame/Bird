import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <div className="prefecture-selector">
      <button
        onClick={() => onSelectPrefecture(null)}
        className={selectedPrefecture === null ? 'active' : ''}
      >
        {t('allPrefectures')}
      </button>
      {prefectures.map((prefecture) => (
        <button
          key={prefecture}
          onClick={() => onSelectPrefecture(prefecture)}
          className={selectedPrefecture === prefecture ? 'active' : ''}
        >
          {t(`prefectures.${prefecture}`)}
        </button>
      ))}
    </div>
  );
};

export default PrefectureSelector;
