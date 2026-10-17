import { useState, type FormEvent } from 'react';
import { FaArrowLeft, FaCheckCircle, FaCreditCard } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import CartItemRow from './CartItemRow';
import OrderSummary from './OrderSummary';
import './cart-checkout.scss';

type PaymentMethod = 'card' | 'paypal' | 'wallet';

function CheckoutPage() {
  const cart = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [orderNumber, setOrderNumber] = useState('');

  if (!cart.items.length && !orderNumber) return <Navigate to="/cart" replace />;

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderNumber(`NX-${Date.now().toString().slice(-7)}`);
    cart.clearCart();
  };

  if (orderNumber) {
    return (
      <main className="cart-page">
        <div className="cart-shell">
          <section className="checkout-confirmation" aria-labelledby="confirmation-title">
            <FaCheckCircle aria-hidden="true" />
            <p className="cart-eyebrow">ORDER PREVIEW COMPLETE</p>
            <h1 id="confirmation-title">Your order is ready.</h1>
            <p>Reference <strong>{orderNumber}</strong></p>
            <p>This frontend demo does not process payment or submit an order to a server.</p>
            <Link className="button" to="/products">Continue browsing</Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-shell">
        <nav className="cart-breadcrumb" aria-label="Breadcrumb">
          <Link to="/cart">Your bag</Link><span aria-hidden="true">/</span>
          <span aria-current="step">Checkout</span>
        </nav>
        <div className="checkout-heading">
          <div>
            <p className="cart-eyebrow">STEP 02 / DELIVERY &amp; PAYMENT</p>
            <h1>Secure checkout</h1>
          </div>
          <Link to="/cart"><FaArrowLeft aria-hidden="true" /> Back to bag</Link>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submitOrder}>
            <fieldset className="checkout-section">
              <legend><span>01</span> Contact information</legend>
              <div className="checkout-fields">
                <label className="checkout-field checkout-field--full">
                  Email address
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label className="checkout-field">
                  First name
                  <input name="given-name" autoComplete="given-name" required />
                </label>
                <label className="checkout-field">
                  Last name
                  <input name="family-name" autoComplete="family-name" required />
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout-section">
              <legend><span>02</span> Shipping address</legend>
              <div className="checkout-fields">
                <label className="checkout-field checkout-field--full">
                  Address
                  <input name="street-address" autoComplete="street-address" required />
                </label>
                <label className="checkout-field">
                  City
                  <input name="address-level2" autoComplete="address-level2" required />
                </label>
                <label className="checkout-field">
                  State / province
                  <input name="address-level1" autoComplete="address-level1" required />
                </label>
                <label className="checkout-field">
                  Postal code
                  <input name="postal-code" autoComplete="postal-code" required />
                </label>
                <label className="checkout-field">
                  Country / region
                  <select name="country-name" autoComplete="country-name" defaultValue="" required>
                    <option value="" disabled>Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout-section checkout-section--payment">
              <legend><span>03</span> Payment method</legend>
              <p className="checkout-demo-notice">Payment choices are for interface preview only; no payment details are collected.</p>
              <div className="payment-options">
                {([
                  ['card', 'Credit or debit card'],
                  ['paypal', 'PayPal'],
                  ['wallet', 'Digital wallet'],
                ] as const).map(([value, label]) => (
                  <label className={`payment-option${paymentMethod === value ? ' payment-option--selected' : ''}`} key={value}>
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={paymentMethod === value}
                      onChange={() => setPaymentMethod(value)}
                    />
                    <span><FaCreditCard aria-hidden="true" /> {label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button className="button checkout-submit" type="submit">
              Prepare demo order · ${cart.total.toFixed(2)}
            </button>
            <p className="checkout-legal">Selecting this button creates a local demonstration confirmation only. No order is placed and no payment is processed.</p>
          </form>

          <aside className="checkout-order">
            <OrderSummary showCheckoutAction={false} />
            <div className="checkout-order__items">
              <h2>In your bag <span>{cart.itemCount}</span></h2>
              {cart.items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQuantityChange={cart.setQuantity}
                  onRemove={cart.removeItem}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
