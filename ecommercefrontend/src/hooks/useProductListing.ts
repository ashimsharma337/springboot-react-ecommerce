import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { AudioProduct } from '../data/audioCatalog';

export type ProductSort =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';

export type ProductView = 'grid' | 'list';

const PAGE_SIZE = 8;
const MAX_PRICE = 1200;
const SORT_OPTIONS: ProductSort[] = ['featured', 'price-asc', 'price-desc', 'rating', 'newest'];

function parsePrice(value: string | null, fallback: number): number {
  if (value === null || value.trim() === '') {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(MAX_PRICE, Math.max(0, parsed)) : fallback;
}

function matchesSearch(product: AudioProduct, search: string): boolean {
  if (!search) return true;
  const haystack = [
    product.name,
    product.category,
    product.subcategory,
    product.description,
    product.specs,
    product.series,
    ...product.connectivities,
    ...product.finishes,
  ].join(' ').toLocaleLowerCase();
  return haystack.includes(search);
}

function compareProducts(left: AudioProduct, right: AudioProduct, sort: ProductSort): number {
  switch (sort) {
    case 'price-asc':
      return left.price - right.price;
    case 'price-desc':
      return right.price - left.price;
    case 'rating':
      return Number(right.rating) - Number(left.rating);
    case 'newest':
      return right.series.localeCompare(left.series);
    case 'featured':
    default:
      return 0;
  }
}

export function useProductListing(products: AudioProduct[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const query = searchParams.get('search')?.trim().toLocaleLowerCase() ?? '';
  const selectedCategory = searchParams.get('category') ?? '';
  const minPrice = parsePrice(searchParams.get('min_price'), 0);
  const maxPrice = Math.max(minPrice, parsePrice(searchParams.get('max_price'), MAX_PRICE));
  const stockOnly = searchParams.get('stock') === 'in_stock';
  const noiseCancellingOnly = searchParams.get('anc') === 'true';
  const selectedConnectivity = searchParams.getAll('connectivity');
  const selectedFinishes = searchParams.getAll('finish');
  const requestedSort = searchParams.get('sort');
  const sort: ProductSort = SORT_OPTIONS.includes(requestedSort as ProductSort)
    ? requestedSort as ProductSort
    : 'featured';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => (
      matchesSearch(product, query)
      && (!selectedCategory || product.subcategory === selectedCategory)
      && product.price >= minPrice
      && product.price <= maxPrice
      && (!stockOnly || product.inStock)
      && (!noiseCancellingOnly || Boolean(product.noiseCancelling))
      && (!selectedConnectivity.length || selectedConnectivity.some((item) => product.connectivities.includes(item)))
      && (!selectedFinishes.length || selectedFinishes.some((item) => product.finishes.includes(item)))
    ));
    return [...matches].sort((left, right) => compareProducts(left, right, sort));
  }, [
    products,
    query,
    selectedCategory,
    minPrice,
    maxPrice,
    stockOnly,
    noiseCancellingOnly,
    selectedConnectivity,
    selectedFinishes,
    sort,
  ]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const updateParams = (
    update: (params: URLSearchParams) => void,
    resetPage = true
  ) => {
    const next = new URLSearchParams(searchParams);
    update(next);
    if (resetPage) next.delete('page');
    setSearchParams(next, { replace: true });
  };

  const setCategory = (category: string) => updateParams((params) => {
    if (category) params.set('category', category);
    else params.delete('category');
  });

  const setPriceRange = (nextMin: number, nextMax: number) => updateParams((params) => {
    const safeMin = Math.max(0, Math.min(MAX_PRICE, nextMin));
    const safeMax = Math.max(safeMin, Math.min(MAX_PRICE, nextMax));
    if (safeMin) params.set('min_price', String(safeMin));
    else params.delete('min_price');
    if (safeMax < MAX_PRICE) params.set('max_price', String(safeMax));
    else params.delete('max_price');
  });

  const setStockOnly = (enabled: boolean) => updateParams((params) => {
    if (enabled) params.set('stock', 'in_stock');
    else params.delete('stock');
  });

  const setNoiseCancellingOnly = (enabled: boolean) => updateParams((params) => {
    if (enabled) params.set('anc', 'true');
    else params.delete('anc');
  });

  const toggleParam = (key: 'connectivity' | 'finish', value: string) => updateParams((params) => {
    const current = params.getAll(key);
    params.delete(key);
    if (!current.includes(value)) current.push(value);
    else {
      for (const item of current.filter((entry) => entry !== value)) {
        params.append(key, item);
      }
      return;
    }
    for (const item of current) params.append(key, item);
  });

  const setSort = (nextSort: ProductSort) => updateParams((params) => {
    if (nextSort === 'featured') params.delete('sort');
    else params.set('sort', nextSort);
  });

  const setPage = (nextPage: number) => updateParams(
    (params) => {
      if (nextPage <= 1) params.delete('page');
      else params.set('page', String(Math.min(pageCount, nextPage)));
    },
    false
  );

  const clearFilters = () => {
    const next = new URLSearchParams();
    if (query) next.set('search', searchParams.get('search') ?? '');
    setSearchParams(next, { replace: true });
  };

  const clearAll = () => setSearchParams(new URLSearchParams(), { replace: true });

  const toggleFavorite = (productName: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(productName)) next.delete(productName);
      else next.add(productName);
      return next;
    });
  };

  const activeFilterCount = Number(Boolean(selectedCategory))
    + Number(minPrice > 0 || maxPrice < MAX_PRICE)
    + Number(stockOnly)
    + Number(noiseCancellingOnly)
    + selectedConnectivity.length
    + selectedFinishes.length;

  return {
    activeFilterCount,
    clearAll,
    clearFilters,
    currentPage,
    favorites,
    filteredProducts,
    maxPrice,
    minPrice,
    noiseCancellingOnly,
    pageCount,
    pageProducts,
    selectedCategory,
    selectedConnectivity,
    selectedFinishes,
    setCategory,
    setNoiseCancellingOnly,
    setPage,
    setPriceRange,
    setSort,
    setStockOnly,
    sort,
    stockOnly,
    toggleFavorite,
    toggleParam,
    totalProducts: filteredProducts.length,
    view: (searchParams.get('view') === 'list' ? 'list' : 'grid') as ProductView,
    setView: (view: ProductView) => updateParams((params) => {
      if (view === 'grid') params.delete('view');
      else params.set('view', view);
    }, false),
  };
}
