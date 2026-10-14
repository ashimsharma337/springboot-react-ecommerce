import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from './components/login/login';
import MainNav from './components/common/navbar/mainNav';
import BrandStory from './components/landing/BrandStory';
import CategoryGrid from './components/landing/CategoryGrid';
import Hero from './components/landing/Hero';
import ProductGrid from './components/landing/ProductGrid';
import SiteFooter from './components/landing/SiteFooter';
import { products } from './data/storefront';
import './styles/main.scss';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem('token'))
  );
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const addToCart = (productName: string) => {
    setCartCount((count) => count + 1);
    setToastMessage(`${productName} added to your cart`);
    window.setTimeout(() => setToastMessage(''), 3200);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  return (
    <>
      <MainNav
        cartCount={cartCount}
        isAuthenticated={isAuthenticated}
        onLogin={() => setShowLogin(true)}
        onLogout={() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }}
        onSearch={setSearchTerm}
      />
      <main>
        <Hero onAddToCart={() => addToCart('NEXUS Studio One Headphone')} />
        <CategoryGrid />
        <ProductGrid
          products={products}
          searchTerm={searchTerm}
          onAddToCart={addToCart}
        />
        <BrandStory />
      </main>
      <SiteFooter />
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
