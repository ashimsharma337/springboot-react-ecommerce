import { FaTimes } from 'react-icons/fa';

export interface ActiveFilter {
  id: string;
  label: string;
  onRemove: () => void;
}

interface ActiveFilterChipsProps {
  filters: ActiveFilter[];
  onClear: () => void;
}

function ActiveFilterChips({ filters, onClear }: ActiveFilterChipsProps) {
  if (!filters.length) return null;

  return (
    <div className="active-filter-row" aria-label="Active filters">
      <span className="active-filter-row__label">Active filters</span>
      {filters.map((filter) => (
        <button className="filter-chip" type="button" key={filter.id} onClick={filter.onRemove}>
          {filter.label}<FaTimes aria-hidden="true" />
        </button>
      ))}
      <button className="active-filter-row__clear" type="button" onClick={onClear}>Clear all</button>
    </div>
  );
}

export default ActiveFilterChips;
