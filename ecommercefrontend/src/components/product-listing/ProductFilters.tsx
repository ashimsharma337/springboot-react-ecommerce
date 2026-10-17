import {
  audioConnectivityOptions,
  audioFinishes,
  audioSubcategories,
} from '../../data/audioCatalog';

interface ProductFiltersProps {
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  stockOnly: boolean;
  noiseCancellingOnly: boolean;
  selectedConnectivity: string[];
  selectedFinishes: string[];
  categoryCounts: Record<string, number>;
  onCategoryChange: (value: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onStockChange: (enabled: boolean) => void;
  onNoiseCancellingChange: (enabled: boolean) => void;
  onToggleConnectivity: (value: string) => void;
  onToggleFinish: (value: string) => void;
  onReset: () => void;
  onClose?: () => void;
}

function ProductFilters({
  selectedCategory,
  minPrice,
  maxPrice,
  stockOnly,
  noiseCancellingOnly,
  selectedConnectivity,
  selectedFinishes,
  categoryCounts,
  onCategoryChange,
  onPriceChange,
  onStockChange,
  onNoiseCancellingChange,
  onToggleConnectivity,
  onToggleFinish,
  onReset,
  onClose,
}: ProductFiltersProps) {
  const updateMinPrice = (value: string) => {
    const min = Number(value);
    if (Number.isFinite(min)) onPriceChange(Math.min(min, maxPrice), maxPrice);
  };

  const updateMaxPrice = (value: string) => {
    const max = Number(value);
    if (Number.isFinite(max)) onPriceChange(minPrice, Math.max(max, minPrice));
  };

  return (
    <aside className="listing-filter-panel" aria-label="Filter audio products">
      <div className="listing-filter-panel__header">
        <div><span className="material-symbols-outlined" aria-hidden="true">tune</span><h2>Find your sound</h2></div>
        <button className="listing-filter-panel__reset" type="button" onClick={onReset}>Reset</button>
        {onClose && <button className="listing-filter-panel__close" type="button" aria-label="Close filters" onClick={onClose}>×</button>}
      </div>

      <fieldset className="filter-group">
        <legend>Categories</legend>
        <label className="filter-choice">
          <input
            type="radio"
            name="audio-category"
            checked={!selectedCategory}
            onChange={() => onCategoryChange('')}
          />
          <span>All audio hardware</span><small>{Object.values(categoryCounts).reduce((sum, count) => sum + count, 0).toString().padStart(2, '0')}</small>
        </label>
        {audioSubcategories.map((category) => (
          <label className="filter-choice" key={category}>
            <input
              type="radio"
              name="audio-category"
              checked={selectedCategory === category}
              onChange={() => onCategoryChange(category)}
            />
            <span>{category}</span><small>{(categoryCounts[category] ?? 0).toString().padStart(2, '0')}</small>
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Price range <span>${minPrice}–${maxPrice} USD</span></legend>
        <div className="price-histogram" aria-hidden="true">
          {[20, 38, 69, 100, 77, 53, 29, 15].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="price-fields">
          <label><span>Minimum</span><span className="price-input"><span>$</span><input type="number" min="0" max={maxPrice} value={minPrice} onChange={(event) => updateMinPrice(event.target.value)} /></span></label>
          <label><span>Maximum</span><span className="price-input"><span>$</span><input type="number" min={minPrice} max="1200" value={maxPrice} onChange={(event) => updateMaxPrice(event.target.value)} /></span></label>
        </div>
        <label className="range-label">
          <span className="sr-only">Maximum price</span>
          <input
            type="range"
            min={minPrice}
            max="1200"
            step="10"
            value={maxPrice}
            onChange={(event) => onPriceChange(minPrice, Number(event.target.value))}
          />
        </label>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Connectivity</legend>
        {audioConnectivityOptions.map((connection) => (
          <label className="filter-choice filter-choice--check" key={connection}>
            <input
              type="checkbox"
              checked={selectedConnectivity.includes(connection)}
              onChange={() => onToggleConnectivity(connection)}
            />
            <span>{connection}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Chassis finish</legend>
        <div className="finish-filter-grid">
          {audioFinishes.map((finish, index) => (
            <label className={`finish-filter${selectedFinishes.includes(finish) ? ' finish-filter--selected' : ''}`} key={finish}>
              <input
                type="checkbox"
                checked={selectedFinishes.includes(finish)}
                onChange={() => onToggleFinish(finish)}
              />
              <span className={`finish-filter__swatch finish-filter__swatch--${index}`} />
              <span>{finish}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group filter-group--toggles">
        <legend className="sr-only">Availability and features</legend>
        <label className="filter-switch">
          <span><strong>Warehouse in stock</strong><small>Ready to ship</small></span>
          <input type="checkbox" checked={stockOnly} onChange={(event) => onStockChange(event.target.checked)} />
        </label>
        <label className="filter-switch">
          <span><strong>Noise cancelling</strong><small>Active ANC models</small></span>
          <input type="checkbox" checked={noiseCancellingOnly} onChange={(event) => onNoiseCancellingChange(event.target.checked)} />
        </label>
      </fieldset>
    </aside>
  );
}

export default ProductFilters;
