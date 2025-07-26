import React from 'react';
import { birdDatabase } from '../data/bird_database';

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
  const filteredBirdSpecies = selectedFamily
    ? birdDatabase.find(family => family.familyName === selectedFamily)?.types.flatMap(type => type.species.map(s => s.japaneseName)) || []
    : birdSpecies;

  return (
    <div className="bird-species-selector">
      <button
        onClick={() => onSelectBirdSpecies(null)}
        className={selectedBirdSpecies === null ? 'active' : ''}
      >
        全ての鳥
      </button>
      {filteredBirdSpecies.map((species) => (
        <button
          key={species}
          onClick={() => onSelectBirdSpecies(species)}
          className={selectedBirdSpecies === species ? 'active' : ''}
        >
          {species}
        </button>
      ))}
    </div>
  );
};

export default BirdSpeciesSelector;