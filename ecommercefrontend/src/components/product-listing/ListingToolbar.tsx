import { FaFilter, FaTh, FaThList } from 'react-icons/fa';
import type { ProductSort, ProductView } from '../../hooks/useProductListing';

interface ListingToolbarProps {
  sort: ProductSort;
  view: ProductView;
  activeFilterCount: number;
  onSortChange: (sort: ProductSort) => void;
  onViewChange: (view: ProductView) => void;
  onOpenFilters: () => void;
}

function ListingToolbar({
  sort,
  view,
  activeFilterCount,
  onSortChange,
  onViewChange,
  onOpenFilters,
}: ListingToolbarProps) {
  return (
    <div className="listing-toolbar">
      <button className="listing-toolbar__filters" type="button" onClick={onOpenFilters}>
        <FaFilter aria-hidden="true" /> Filters
        {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
      </button>
      <label className="listing-sort">
        <span>Sort by</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value as ProductSort)}>
          <option value="featured">Featured specification</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Highest rated</option>
          <option value="newest">Latest release</option>
        </select>
      </label>
      <div className="listing-view-switch" role="group" aria-label="Product layout">
        <button
          type="button"
          aria-label="Grid view"
          aria-pressed={view === 'grid'}
          className={view === 'grid' ? 'listing-view-switch__active' : ''}
          onClick={() => onViewChange('grid')}
        ><FaTh aria-hidden="true" /></button>
        <button
          type="button"
          aria-label="List view"
          aria-pressed={view === 'list'}
          className={view === 'list' ? 'listing-view-switch__active' : ''}
          onClick={() => onViewChange('list')}
        ><FaThList aria-hidden="true" /></button>
      </div>
    </div>
  );
}

export default ListingToolbar;
