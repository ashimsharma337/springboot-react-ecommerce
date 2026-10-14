import { FaArrowRight, FaCartPlus } from 'react-icons/fa';
import type { StoreProduct } from '../../data/storefront';

interface ProductGridProps {
  products: StoreProduct[];
  searchTerm: string;
  onAddToCart: (productName: string) => void;
}

interface ProductCardProps {
  product: StoreProduct;
  onAddToCart: (productName: string) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <span className={`product-badge product-badge--${product.badgeTone}`}>{product.badge}</span>
        <span className="stock-badge"><span className="status-dot status-dot--green" /> In Stock</span>
        <img src={product.image} alt={product.imageAlt} loading="lazy" />
      </div>
      <div className="product-card__details">
        <div className="product-card__meta">
          <span>{product.specs}</span>
          <span className="product-rating" aria-label={`${product.rating} out of 5, ${product.reviews} reviews`}>
            ★ {product.rating} <span>({product.reviews})</span>
          </span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card__purchase">
          <div><small>MSRP</small><strong>${product.price.toFixed(2)}</strong></div>
          <button className="button button--quick-add" onClick={() => onAddToCart(product.name)}>
            <FaCartPlus aria-hidden="true" /> Quick Add
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductGrid({ products, searchTerm, onAddToCart }: ProductGridProps) {
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.category} ${product.description} ${product.specs}`
      .toLocaleLowerCase()
      .includes(normalizedSearch)
  );

  return (
    <section className="section section--tint" id="featured">
      <div className="section-wrap">
        <div className="section-heading section-heading--products">
          <div>
            <p className="section-kicker">02 / THE NEXUS EDIT</p>
            <h2>Curated hardware bench</h2>
          </div>
          <a className="text-link" href="#categories">View all hardware <FaArrowRight aria-hidden="true" /></a>
        </div>
        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.name} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <p className="empty-results" role="status">No hardware matched “{searchTerm}”. Try another search.</p>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
