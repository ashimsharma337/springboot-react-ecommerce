import { FaCheckCircle, FaTruck } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';

const SHIPPING_THRESHOLD = 150;

function FreeShippingProgress() {
  const { subtotal } = useCart();
  const remaining = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100);

  return (
    <section className="shipping-progress" aria-label="Free express delivery progress">
      <div className="shipping-progress__top">
        <div className="shipping-progress__copy">
          <span className="shipping-progress__icon">
            {remaining ? <FaTruck aria-hidden="true" /> : <FaCheckCircle aria-hidden="true" />}
          </span>
          <div>
            <h2>{remaining ? 'Complimentary express delivery' : 'Complimentary express delivery unlocked'}</h2>
            <p>{remaining ? `Add $${remaining.toFixed(2)} to qualify for complimentary express delivery.` : 'Your bag qualifies for complimentary express delivery.'}</p>
          </div>
        </div>
        <strong>{remaining ? `$${remaining.toFixed(2)} TO GO` : 'THRESHOLD MET'}</strong>
      </div>
      <div
        className="shipping-progress__track"
        role="progressbar"
        aria-label="Free delivery threshold"
        aria-valuemin={0}
        aria-valuemax={SHIPPING_THRESHOLD}
        aria-valuenow={Math.min(subtotal, SHIPPING_THRESHOLD)}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}

export default FreeShippingProgress;
