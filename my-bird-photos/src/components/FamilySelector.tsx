import React from 'react';
import { birdDatabase } from '../data/bird_database';
import { useTranslation } from 'react-i18next';

interface FamilySelectorProps {
  selectedFamily: string;
  onSelectFamily: (family: string) => void;
}

const FamilySelector: React.FC<FamilySelectorProps> = ({ selectedFamily, onSelectFamily }) => {
  const { t } = useTranslation();
  const families = birdDatabase.map(family => family.familyName);

  return (
    <div className="family-selector">
      <label htmlFor="family-select">{t('filterByFamily')}:</label>
      <select
        id="family-select"
        value={selectedFamily}
        onChange={(e) => onSelectFamily(e.target.value)}
      >
        <option value="">{t('allFamilies')}</option>
        {families.map((family) => (
          <option key={family} value={family}>
            {t(`familyNames.${family}`)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FamilySelector;
