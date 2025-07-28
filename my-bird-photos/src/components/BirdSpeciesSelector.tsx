import React from 'react';
import { birdDatabase } from '../data/bird_database';
import { useTranslation } from 'react-i18next';

interface IBirdSpeciesSelectorProps {
  birdSpecies: string[];
  selectedBirdSpecies: string | null;
  onSelectBirdSpecies: (species: string | null) => void;
  selectedFamily: string | null; // Add selectedFamily prop
}

const BirdSpeciesSelector: React.FC<IBirdSpeciesSelectorProps> = ({
  birdSpecies,
  selectedBirdSpecies,
  onSelectBirdSpecies,
  selectedFamily,
}) => {
  const { t } = useTranslation();
  const filteredBirdSpecies = selectedFamily
    ? birdDatabase.find(family => family.familyName === selectedFamily)?.types.flatMap(type => type.species.map(s => s.japaneseName)) || []
    : birdSpecies;

  return (
    <div className="bird-species-selector">
      <label htmlFor="bird-species-select">{t('filterBySpecies')}</label>
      <select
        id="bird-species-select"
        value={selectedBirdSpecies || ''}
        onChange={(e) => onSelectBirdSpecies(e.target.value || null)}
      >
        <option value="">{t('allSpecies')}</option>
        {filteredBirdSpecies.map((species) => (
          <option key={species} value={species}>
            {species}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BirdSpeciesSelector;
