import { Link } from 'react-router-dom';
import type { StoreProduct } from '../../data/storefront';
import { studioOneRelated } from '../../data/studioOneDetail';
import ProductGrid from '../landing/ProductGrid';
import ProductGallery from './ProductGallery';
import ProductInformation from './ProductInformation';
import ProductPurchasePanel from './ProductPurchasePanel';
import './product-detail.scss';

interface ProductDetailProps {
  product: StoreProduct;
  onAddToCart: (productName: string, quantity?: number) => void;
}

function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  return (
    <>
      <div className="section-wrap pdp-breadcrumb-wrap">
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span>
          <Link to="/#categories">Audio</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
      </div>
      <main className="pdp-main">
        <section className="pdp section-wrap" aria-label={`${product.name} product details`}>
          <ProductGallery />
          <ProductPurchasePanel onAddToCart={onAddToCart} />
        </section>
        <div id="pdp-information">
          <ProductInformation />
        </div>
        <ProductGrid
          products={studioOneRelated}
          searchTerm=""
          onAddToCart={onAddToCart}
          eyebrow="HARDWARE ECOSYSTEM"
          title="Engineered in tandem"
        />
      </main>
    </>
  );
}

export default ProductDetail;
