import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginComponent from './components/login/login';
import MainNav from './components/common/navbar/mainNav';
import BrandStory from './components/landing/BrandStory';
import CategoryGrid from './components/landing/CategoryGrid';
import Hero from './components/landing/Hero';
import ProductGrid from './components/landing/ProductGrid';
import SiteFooter from './components/landing/SiteFooter';
import ProductDetail from './components/product-detail/ProductDetail';
import ProductListingPage from './components/product-listing/ProductListingPage';
import CartPage from './components/cart/CartPage';
import CheckoutPage from './components/cart/CheckoutPage';
import { products } from './data/storefront';
import type { StoreProduct } from './data/storefront';
import { useCart } from './hooks/useCart';
import './styles/main.scss';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem('token'))
  );
  const cart = useCart();
  const [searchTerm, setSearchTerm] = useState(
    () => new URLSearchParams(window.location.search).get('search') ?? ''
  );
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    document.title = location.pathname === '/products'
      ? 'Audio & Acoustics — NEXUS'
      : location.pathname === '/cart'
        ? 'Your Bag — NEXUS'
        : location.pathname === '/checkout'
          ? 'Secure Checkout — NEXUS'
          : location.pathname.startsWith('/products/')
            ? 'NEXUS Studio One — Minimalist Electronics'
            : 'NEXUS — Minimalist Electronics';

    if (location.hash) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  const addToCart = (product: StoreProduct, quantity = 1, variant = '') => {
    cart.addItem(product, quantity, variant);
    setToastMessage(`${quantity} × ${product.name} added to your bag`);
    window.setTimeout(() => setToastMessage(''), 3200);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (location.pathname === '/products') {
      const nextParams = new URLSearchParams(location.search);
      if (value.trim()) nextParams.set('search', value);
      else nextParams.delete('search');
      nextParams.delete('page');
      const query = nextParams.toString();
      navigate(`/products${query ? `?${query}` : ''}`, { replace: true });
    } else if (location.pathname !== '/') {
      navigate(value ? `/products?search=${encodeURIComponent(value)}` : '/products');
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  return (
    <>
      <MainNav
        cartCount={cart.itemCount}
        isAuthenticated={isAuthenticated}
        onLogin={() => setShowLogin(true)}
        onLogout={() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }}
        onSearch={handleSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <CategoryGrid />
              <ProductGrid
                products={products}
                searchTerm={searchTerm}
                onAddToCart={addToCart}
              />
              <BrandStory />
            </main>
          }
        />
        <Route
          path="/products"
          element={<ProductListingPage onAddToCart={addToCart} />}
        />
        <Route
          path="/products/studio-one-headphone"
          element={
            <ProductDetail
              product={products[0]}
              onAddToCart={addToCart}
            />
          }
        />
        <Route path="/cart" element={<CartPage onAddToCart={addToCart} />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
      {cart.storageError && (
        <p className="cart-storage-warning" role="alert">{cart.storageError}</p>
      )}
      <div
        className={`cart-toast${toastMessage ? ' cart-toast--visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          check_circle
        </span>
        {toastMessage}
      </div>
      <LoginComponent
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default App;
