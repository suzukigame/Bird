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
      <button
        onClick={() => onSelectBirdSpecies(null)}
        className={selectedBirdSpecies === null ? 'active' : ''}
      >
        {t('allBirds')}
      </button>
      {filteredBirdSpecies.map((species) => (
        <button
          key={species}
          onClick={() => onSelectBirdSpecies(species)}
          className={selectedBirdSpecies === species ? 'active' : ''}
        >
          {t(`birdSpeciesNames.${species}`)}
        </button>
      ))}
    </div>
  );
};

export default BirdSpeciesSelector;