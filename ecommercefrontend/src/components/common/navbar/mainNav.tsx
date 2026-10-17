import { useEffect, useRef, useState } from 'react';
import { FaBars, FaHeart, FaSearch, FaShoppingBag, FaTimes, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './mainNav.scss';

interface MainNavProps {
  cartCount: number;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onSearch: (value: string) => void;
}

function MainNav({ cartCount, isAuthenticated, onLogin, onLogout, onSearch }: MainNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    if (location.pathname === '/products' && searchRef.current) {
      searchRef.current.value = new URLSearchParams(location.search).get('search') ?? '';
    }
  }, [location.pathname, location.search]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" id="top">
      <div className="announcement">
        <span className="status-dot" />
        <span>Complimentary worldwide express shipping on orders over $150</span>
        <span className="announcement__divider">·</span>
        <span>30-day trial guarantee</span>
      </div>
      <div className="nav-shell">
        <Link className="brand" to="/" aria-label="NEXUS home">NEXUS<span>®</span></Link>
        <nav className={`primary-nav${menuOpen ? ' primary-nav--open' : ''}`} aria-label="Main navigation">
          <Link className={location.pathname === '/' ? 'primary-nav__active' : ''} to="/" onClick={closeMenu}>Home</Link>
          <Link className={location.pathname === '/products' ? 'primary-nav__active' : ''} to="/products" onClick={closeMenu}>Audio &amp; Sound</Link>
          <Link to="/#categories" onClick={closeMenu}>Computing</Link>
          <Link to="/#categories" onClick={closeMenu}>Displays</Link>
          <Link to="/#categories" onClick={closeMenu}>Accessories</Link>
        </nav>
        <div className="nav-actions">
          <label className="search-field">
            <FaSearch aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              placeholder="Search precision hardware..."
              aria-label="Search products"
              onChange={(event) => onSearch(event.target.value)}
            />
            <kbd>⌘K</kbd>
          </label>
          <Link className="nav-icon nav-icon--wishlist" to="/#featured" aria-label="Wishlist, 2 saved items">
            <FaHeart aria-hidden="true" /><span className="nav-count">2</span>
          </Link>
          <Link
            className="cart-link"
            to="/cart"
            aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          >
            <FaShoppingBag aria-hidden="true" /><span className="cart-link__label">Bag</span>
            <span className="cart-link__count">{cartCount}</span>
          </Link>
          {isAuthenticated ? (
            <button className="account-button" onClick={onLogout} aria-label="Log out">
              <FaUser aria-hidden="true" /><span>Log out</span>
            </button>
          ) : (
            <button className="account-button" onClick={onLogin}>
              <FaUser aria-hidden="true" /><span>Sign in</span>
            </button>
          )}
          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default MainNav;
