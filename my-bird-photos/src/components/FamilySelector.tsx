import React from 'react';
import { birdDatabase } from '../data/bird_database';

interface FamilySelectorProps {
  selectedFamily: string;
  onSelectFamily: (family: string) => void;
}

const FamilySelector: React.FC<FamilySelectorProps> = ({ selectedFamily, onSelectFamily }) => {
  const families = birdDatabase.map(family => family.familyName);

  return (
    <div className="family-selector">
      <label htmlFor="family-select">科で絞り込み:</label>
      <select
        id="family-select"
        value={selectedFamily}
        onChange={(e) => onSelectFamily(e.target.value)}
      >
        <option value="">全ての科</option>
        {families.map((family) => (
          <option key={family} value={family}>
            {family}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FamilySelector;
