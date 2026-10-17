import { FaArrowRight, FaHeadphones, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { StoreProduct } from '../../data/storefront';
import { products } from '../../data/storefront';
import { useCart } from '../../hooks/useCart';
import CartItemRow from './CartItemRow';
import FreeShippingProgress from './FreeShippingProgress';
import OrderSummary from './OrderSummary';
import './cart-checkout.scss';

interface CartPageProps {
  onAddToCart: (product: StoreProduct, quantity?: number, variant?: string) => void;
}

const recommendations = [products[1], products[3]];

function CartPage({ onAddToCart }: CartPageProps) {
  const cart = useCart();

  return (
    <main className="cart-page">
      <div className="cart-shell">
        <nav className="cart-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Your bag</span>
        </nav>

        <div className="cart-system-status">
          <div><span className="cart-system-status__tag">LOCAL_CART / 01</span><span>Cart preview: active</span></div>
          <span>LOCAL SESSION · NO PAYMENT PROCESSING</span>
        </div>

        <FreeShippingProgress />

        {cart.items.length ? (
          <div className="cart-layout">
            <div className="cart-main-column">
              <section className="cart-panel" aria-labelledby="cart-title">
                <div className="cart-panel__heading">
                  <div>
                    <h1 id="cart-title">Your hardware bag</h1>
                    <span>{cart.items.length} {cart.items.length === 1 ? 'item line' : 'item lines'} · {cart.itemCount} units</span>
                  </div>
                  <Link to="/products">Continue browsing <FaArrowRight aria-hidden="true" /></Link>
                </div>

                <div className="cart-item-list">
                  {cart.items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onQuantityChange={cart.setQuantity}
                      onRemove={cart.removeItem}
                    />
                  ))}
                </div>

                <div className="cart-guarantee">
                  <FaShieldAlt aria-hidden="true" />
                  <div>
                    <h2>Risk-free 30-day workstation evaluation</h2>
                    <p>Try your hardware at home. Complimentary returns are available within 30 days.</p>
                  </div>
                </div>
              </section>

              <section className="cart-panel cart-recommendations" aria-labelledby="recommendations-title">
                <div className="cart-recommendations__heading">
                  <div>
                    <span>Recommended integration</span>
                    <h2 id="recommendations-title">Frequently paired with your setup</h2>
                  </div>
                  <span>DIRECT COMPATIBLE</span>
                </div>
                <div className="cart-recommendations__grid">
                  {recommendations.map((product) => {
                    const alreadyInCart = cart.items.some((item) => item.product.name === product.name);
                    return (
                      <article className="cart-recommendation" key={product.name}>
                        <img src={product.image} alt={product.imageAlt} loading="lazy" />
                        <div>
                          <h3>{product.name}</h3>
                          <p>{product.description}</p>
                          <strong>${product.price.toFixed(2)} USD</strong>
                        </div>
                        <button
                          type="button"
                          disabled={alreadyInCart}
                          aria-label={alreadyInCart ? `${product.name} already in your bag` : `Add ${product.name} to bag`}
                          onClick={() => onAddToCart(product)}
                        >
                          {alreadyInCart ? 'In bag' : 'Add'}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="cart-summary-column">
              <OrderSummary />
              <div className="cart-help-card">
                <FaHeadphones aria-hidden="true" />
                <div><strong>Need hardware assistance?</strong><span>Explore related audio hardware and specifications.</span></div>
                <Link to="/products">Browse</Link>
              </div>
            </div>
          </div>
        ) : (
          <section className="cart-empty">
            <span className="cart-empty__icon"><FaHeadphones aria-hidden="true" /></span>
            <p className="cart-eyebrow">YOUR BAG IS READY WHEN YOU ARE</p>
            <h1 id="cart-title">Nothing in your bag yet.</h1>
            <p>Explore precision audio, workstation hardware, and accessories built to work together.</p>
            <Link className="button" to="/products">Explore audio hardware <FaArrowRight aria-hidden="true" /></Link>
          </section>
        )}
      </div>
    </main>
  );
}

export default CartPage;
