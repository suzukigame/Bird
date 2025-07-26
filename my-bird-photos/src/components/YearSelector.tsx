import React from 'react';

interface IYearSelectorProps {
  years: string[];
  selectedYear: string | null;
  onSelectYear: (year: string | null) => void;
}

const YearSelector: React.FC<IYearSelectorProps> = ({
  years,
  selectedYear,
  onSelectYear,
}) => {
  return (
    <div className="year-selector">
      <button
        onClick={() => onSelectYear(null)}
        className={selectedYear === null ? 'active' : ''}
      >
        全ての年
      </button>
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onSelectYear(year)}
          className={selectedYear === year ? 'active' : ''}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

export default YearSelector;
