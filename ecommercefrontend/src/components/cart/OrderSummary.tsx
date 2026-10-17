import { useState, type FormEvent } from 'react';
import { FaArrowRight, FaCheck, FaLock, FaShieldAlt, FaUndo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

interface OrderSummaryProps {
  showCheckoutAction?: boolean;
}

function OrderSummary({ showCheckoutAction = true }: OrderSummaryProps) {
  const cart = useCart();
  const [code, setCode] = useState('');
  const unitsLabel = `${cart.itemCount} ${cart.itemCount === 1 ? 'unit' : 'units'}`;

  const applyCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart.applyDiscountCode(code)) setCode('');
  };

  return (
    <aside className="order-summary" aria-labelledby="order-summary-title">
      <h2 id="order-summary-title">Order Summary</h2>
      <div className="order-summary__ledger">
        <div><span>Subtotal ({unitsLabel})</span><strong>${cart.subtotal.toFixed(2)}</strong></div>
        <div>
          <span>Express delivery</span>
          <strong className={cart.shipping === 0 ? 'order-summary__free' : ''}>
            {cart.shipping === 0 ? 'FREE' : `$${cart.shipping.toFixed(2)}`}
          </strong>
        </div>
        {cart.discountCode && (
          <div className="order-summary__discount">
            <span><FaCheck aria-hidden="true" /> {cart.discountCode} (-10%)</span>
            <strong>−${cart.discount.toFixed(2)}</strong>
          </div>
        )}
        <div className="order-summary__tax">
          <span>Duty &amp; tax</span><span>Not calculated in this demo</span>
        </div>
      </div>

      <details className="order-promo">
        <summary>Add promotional code or hardware voucher</summary>
        <form onSubmit={applyCode}>
          <label className="sr-only" htmlFor="promo-code">Promotional code</label>
          <input
            id="promo-code"
            type="text"
            autoComplete="off"
            value={code}
            placeholder="Enter code"
            onChange={(event) => setCode(event.target.value)}
          />
          <button type="submit">Apply</button>
        </form>
        {cart.discountError && <p className="order-promo__error" role="alert">{cart.discountError}</p>}
        {cart.discountCode && (
          <button className="order-promo__remove" type="button" onClick={cart.clearDiscountCode}>
            Remove applied code
          </button>
        )}
        <p className="order-promo__hint">Try FIRSTORDER for 10% off your subtotal.</p>
      </details>

      <div className="order-summary__total">
        <div><strong>Total amount</strong><span>Shipping included where eligible</span></div>
        <div className="order-summary__amount"><strong>${cart.total.toFixed(2)}</strong><span>USD</span></div>
      </div>

      {showCheckoutAction && (
        <Link className="button order-summary__checkout" to="/checkout">
          Proceed to secure checkout <FaArrowRight aria-hidden="true" />
        </Link>
      )}

      <div className="order-trust">
        <p><FaLock aria-hidden="true" /> Checkout preview · no payment is processed</p>
        <p><FaShieldAlt aria-hidden="true" /> Manufacturer direct with a 3-year warranty</p>
        <p><FaUndo aria-hidden="true" /> Complimentary returns within 30 days</p>
      </div>
    </aside>
  );
}

export default OrderSummary;
