interface ProductPaginationProps {
  currentPage: number;
  pageCount: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
}

function ProductPagination({
  currentPage,
  pageCount,
  totalProducts,
  onPageChange,
}: ProductPaginationProps) {
  if (!totalProducts) return null;

  return (
    <nav className="listing-pagination" aria-label="Product pages">
      <span>Showing page {currentPage} of {pageCount}</span>
      <div>
        <button type="button" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
          <button
            type="button"
            key={page}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            className={page === currentPage ? 'listing-pagination__current' : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button type="button" disabled={currentPage === pageCount} onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </nav>
  );
}

export default ProductPagination;
