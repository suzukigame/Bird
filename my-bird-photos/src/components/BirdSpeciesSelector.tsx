import React from 'react';

interface IBirdSpeciesSelectorProps {
  birdSpecies: string[];
  selectedBirdSpecies: string | null;
  onSelectBirdSpecies: (species: string | null) => void;
}

const BirdSpeciesSelector: React.FC<IBirdSpeciesSelectorProps> = ({
  birdSpecies,
  selectedBirdSpecies,
  onSelectBirdSpecies,
}) => {
  return (
    <div className="bird-species-selector">
      <button
        onClick={() => onSelectBirdSpecies(null)}
        className={selectedBirdSpecies === null ? 'active' : ''}
      >
        全ての鳥
      </button>
      {birdSpecies.map((species) => (
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
