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
      <label htmlFor="prefecture-select">{t('filterByPrefecture')}</label>
      <select
        id="prefecture-select"
        value={selectedPrefecture || ''}
        onChange={(e) => onSelectPrefecture(e.target.value || null)}
      >
        <option value="">{t('allPrefectures')}</option>
        {prefectures.map((prefecture) => (
          <option key={prefecture} value={prefecture}>
            {prefecture}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PrefectureSelector;