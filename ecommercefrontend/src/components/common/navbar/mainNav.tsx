import { useEffect, useRef, useState } from 'react';
import { FaBars, FaHeart, FaSearch, FaShoppingBag, FaTimes, FaUser } from 'react-icons/fa';
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
        <a className="brand" href="#top" aria-label="NEXUS home">NEXUS<span>®</span></a>
        <nav className={`primary-nav${menuOpen ? ' primary-nav--open' : ''}`} aria-label="Main navigation">
          <a className="primary-nav__active" href="#top" onClick={closeMenu}>Home</a>
          <a href="#categories" onClick={closeMenu}>Audio &amp; Sound</a>
          <a href="#categories" onClick={closeMenu}>Computing</a>
          <a href="#categories" onClick={closeMenu}>Displays</a>
          <a href="#categories" onClick={closeMenu}>Accessories</a>
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
          <a className="nav-icon nav-icon--wishlist" href="#featured" aria-label="Wishlist, 2 saved items">
            <FaHeart aria-hidden="true" /><span className="nav-count">2</span>
          </a>
          <a
            className="cart-link"
            href="#featured"
            aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          >
            <FaShoppingBag aria-hidden="true" /><span className="cart-link__label">Bag</span>
            <span className="cart-link__count">{cartCount}</span>
          </a>
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
