import { useMemo, useState } from 'react';
import { FaArrowRight, FaHeadphones } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ProductCard } from '../landing/ProductGrid';
import ActiveFilterChips, { type ActiveFilter } from './ActiveFilterChips';
import ListingToolbar from './ListingToolbar';
import ProductFilters from './ProductFilters';
import ProductPagination from './ProductPagination';
import { audioProducts } from '../../data/audioCatalog';
import type { StoreProduct } from '../../data/storefront';
import { useProductListing } from '../../hooks/useProductListing';
import './product-listing.scss';

interface ProductListingPageProps {
  onAddToCart: (product: StoreProduct, quantity?: number, variant?: string) => void;
}

function ProductListingPage({ onAddToCart }: ProductListingPageProps) {
  const listing = useProductListing(audioProducts);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const categoryCounts = useMemo(() => audioProducts.reduce<Record<string, number>>((counts, product) => {
    counts[product.subcategory] = (counts[product.subcategory] ?? 0) + 1;
    return counts;
  }, {}), []);

  const activeFilters: ActiveFilter[] = [];
  if (listing.selectedCategory) {
    activeFilters.push({
      id: 'category',
      label: listing.selectedCategory,
      onRemove: () => listing.setCategory(''),
    });
  }
  if (listing.minPrice > 0 || listing.maxPrice < 1200) {
    activeFilters.push({
      id: 'price',
      label: `$${listing.minPrice}–$${listing.maxPrice}`,
      onRemove: () => listing.setPriceRange(0, 1200),
    });
  }
  if (listing.stockOnly) {
    activeFilters.push({ id: 'stock', label: 'In stock', onRemove: () => listing.setStockOnly(false) });
  }
  if (listing.noiseCancellingOnly) {
    activeFilters.push({ id: 'anc', label: 'Noise cancelling', onRemove: () => listing.setNoiseCancellingOnly(false) });
  }
  listing.selectedConnectivity.forEach((connection) => activeFilters.push({
    id: `connectivity-${connection}`,
    label: connection,
    onRemove: () => listing.toggleParam('connectivity', connection),
  }));
  listing.selectedFinishes.forEach((finish) => activeFilters.push({
    id: `finish-${finish}`,
    label: finish,
    onRemove: () => listing.toggleParam('finish', finish),
  }));

  const filterProps = {
    selectedCategory: listing.selectedCategory,
    minPrice: listing.minPrice,
    maxPrice: listing.maxPrice,
    stockOnly: listing.stockOnly,
    noiseCancellingOnly: listing.noiseCancellingOnly,
    selectedConnectivity: listing.selectedConnectivity,
    selectedFinishes: listing.selectedFinishes,
    categoryCounts,
    onCategoryChange: listing.setCategory,
    onPriceChange: listing.setPriceRange,
    onStockChange: listing.setStockOnly,
    onNoiseCancellingChange: listing.setNoiseCancellingOnly,
    onToggleConnectivity: (value: string) => listing.toggleParam('connectivity', value),
    onToggleFinish: (value: string) => listing.toggleParam('finish', value),
    onReset: listing.clearFilters,
  };

  return (
    <main className="product-listing-page">
      <div className="listing-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true">/</span>
        <span>Audio &amp; Acoustics</span>
      </div>

      <section className="listing-hero">
        <div className="listing-hero__copy">
          <p className="listing-eyebrow"><FaHeadphones aria-hidden="true" /> NEXUS / AUDIO DIVISION</p>
          <h1>Precision <span>in every</span> frequency.</h1>
          <p className="listing-hero__description">Studio-grade acoustics, engineered for the moments that matter. Explore the full spectrum of NEXUS audio hardware.</p>
          <a href="#audio-products" className="listing-hero__link">Explore the collection <FaArrowRight aria-hidden="true" /></a>
        </div>
        <div className="listing-hero__visual" role="img" aria-label="Studio headphones in a warm, minimal listening room">
          <span className="listing-hero__index">AUDIO / 001</span>
        </div>
        <div className="listing-hero__note"><span>01</span><p>Designed for<br />critical listening</p></div>
      </section>

      <div className="listing-content" id="audio-products">
        <div className="listing-intro">
          <div>
            <p className="listing-eyebrow">THE COMPLETE COLLECTION</p>
            <h2>Audio &amp; Acoustics</h2>
          </div>
          <p>From reference monitors to everyday listening. Every component is tuned with intention, built to last, and designed to disappear into your space.</p>
        </div>

        <ActiveFilterChips filters={activeFilters} onClear={listing.clearFilters} />

        <div className="listing-layout">
          <div className={`listing-filter-drawer${filtersOpen ? ' listing-filter-drawer--open' : ''}`}>
            <ProductFilters {...filterProps} onClose={() => setFiltersOpen(false)} />
          </div>
          {filtersOpen && <button className="listing-drawer-backdrop" type="button" aria-label="Close filter panel" onClick={() => setFiltersOpen(false)} />}
          <section className="listing-results" aria-label="Audio product results">
            <ListingToolbar
              sort={listing.sort}
              view={listing.view}
              activeFilterCount={listing.activeFilterCount}
              onSortChange={listing.setSort}
              onViewChange={listing.setView}
              onOpenFilters={() => setFiltersOpen(true)}
            />
            <div className="listing-results__summary">
              <p role="status" aria-live="polite"><strong>{listing.totalProducts}</strong> products <span>curated for uncompromising sound</span></p>
              <span>{listing.totalProducts.toString().padStart(2, '0')} / AUDIO DIVISION</span>
            </div>

            {listing.pageProducts.length ? (
              <div className={`product-grid listing-product-grid${listing.view === 'list' ? ' product-grid--list' : ''}`}>
                {listing.pageProducts.map((product) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    onAddToCart={onAddToCart}
                    isFavorite={listing.favorites.has(product.name)}
                    onToggleFavorite={listing.toggleFavorite}
                    view={listing.view}
                  />
                ))}
              </div>
            ) : (
              <div className="listing-empty" role="status">
                <FaHeadphones aria-hidden="true" />
                <h3>No products match these filters</h3>
                <p>Try changing your search or clearing one or more filters.</p>
                <button className="button" type="button" onClick={listing.clearAll}>Clear search and filters</button>
              </div>
            )}

            <ProductPagination
              currentPage={listing.currentPage}
              pageCount={listing.pageCount}
              totalProducts={listing.totalProducts}
              onPageChange={listing.setPage}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductListingPage;
