import { useState } from 'react';
import { FaApple, FaInfoCircle, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { StoreProduct } from '../../data/storefront';

interface ProductPurchasePanelProps {
  product: StoreProduct;
  onAddToCart: (product: StoreProduct, quantity?: number, variant?: string) => void;
}

const finishes = [
  { name: 'Obsidian Black', description: 'Matte deep black anodized', color: '#20242c' },
  { name: 'Titanium Silver', description: 'Brushed natural titanium', color: '#b9bdc1' },
  { name: 'Midnight Ceramic', description: 'Ultra-deep navy with pearl coat', color: '#263454' },
];

function ProductPurchasePanel({ product, onAddToCart }: ProductPurchasePanelProps) {
  const [finish, setFinish] = useState(finishes[0]);
  const [includeCase, setIncludeCase] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 349 + (includeCase ? 39 : 0);
  const total = unitPrice * quantity;

  return (
    <section className="pdp-purchase" aria-labelledby="pdp-title">
      <div className="pdp-purchase__eyebrow">
        <span className="pdp-rating"><span aria-hidden="true">★★★★★</span> 4.9 <span>(428 reviews)</span></span>
        <span className="pdp-staff-pick">STAFF PICK 2025</span>
      </div>
      <p className="pdp-sku">SKU: NX-S1-BLK-2025 <span>•</span> BERLIN LAB CERTIFIED</p>
      <h1 id="pdp-title">NEXUS Studio One</h1>
      <p className="pdp-purchase__description">
        Studio-grade active noise cancelling headphones with Hybrid Triple-Feed
        ANC and LDAC audiophile master stream.
      </p>
      <div className="pdp-price">
        <strong>$349.00</strong>
        <span>USD · MSRP <s>$399.00</s></span>
        <span className="pdp-price__save">SAVE $50</span>
      </div>
      <p className="pdp-installment">
        Or 4 interest-free payments of $87.25 with <strong>KLARNA</strong>
        <FaInfoCircle aria-label="Installment information" />
      </p>

      <fieldset className="pdp-finish">
        <legend>Color finish: <strong>{finish.name}</strong></legend>
        <div className="pdp-finish__options">
          {finishes.map((option) => (
            <button
              key={option.name}
              className={`pdp-finish__swatch${finish.name === option.name ? ' pdp-finish__swatch--selected' : ''}`}
              type="button"
              aria-label={`${option.name} — ${option.description}`}
              aria-pressed={finish.name === option.name}
              title={`${option.name} — ${option.description}`}
              onClick={() => setFinish(option)}
            >
              <span style={{ backgroundColor: option.color }} />
            </button>
          ))}
          <span className="pdp-finish__label">{finish.description}</span>
        </div>
      </fieldset>

      <label className="pdp-bundle">
        <input
          type="checkbox"
          checked={includeCase}
          onChange={(event) => setIncludeCase(event.target.checked)}
        />
        <span className="pdp-bundle__copy">
          <strong>Add Molded Hard Flight Shell</strong>
          <small>Water-resistant ballistic nylon with cable lock</small>
        </span>
        <span className="pdp-bundle__price">+$39 <s>$59</s></span>
      </label>

      <div className="pdp-stock">
        <div className="pdp-quantity" aria-label="Quantity">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >−</button>
          <output aria-live="polite" aria-label="Selected quantity">{quantity}</output>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((value) => value + 1)}
          >+</button>
        </div>
        <div>
          <strong><span className="status-dot status-dot--green" /> In Stock · Ready for Dispatch</strong>
          <p>Order now for complimentary express delivery.</p>
        </div>
      </div>

      <div className="pdp-actions">
        <button
          className="button button--dark pdp-actions__add"
          type="button"
          onClick={() => onAddToCart(
            { ...product, name: 'NEXUS Studio One', price: unitPrice },
            quantity,
            `${finish.name}${includeCase ? ' with Flight Shell' : ''}`
          )}
        >
          <FaShoppingBag aria-hidden="true" /> Add to Bag — ${total.toFixed(2)} USD
        </button>
        <button className="button pdp-actions__apple" type="button" disabled aria-label="Apple Pay checkout is not available yet">
          <span>Buy with</span><FaApple aria-hidden="true" /> Pay
        </button>
      </div>
      <p className="pdp-demo-note">Checkout is not connected yet. <Link to="/#featured">Continue browsing</Link>.</p>

      <div className="pdp-assurances">
        <div><span className="material-symbols-outlined" aria-hidden="true">local_shipping</span><strong>Express Delivery</strong><small>Complimentary 2-Day</small></div>
        <div><span className="material-symbols-outlined" aria-hidden="true">verified_user</span><strong>30-Day Audition</strong><small>Zero-Risk Home Trial</small></div>
        <div><span className="material-symbols-outlined" aria-hidden="true">workspace_premium</span><strong>2-Year Warranty</strong><small>Direct Swiss Exchange</small></div>
      </div>
    </section>
  );
}

export default ProductPurchasePanel;
