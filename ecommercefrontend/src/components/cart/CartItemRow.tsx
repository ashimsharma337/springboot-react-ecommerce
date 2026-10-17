import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import type { CartItem } from '../../hooks/useCart';

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const { product, quantity, variant } = item;

  return (
    <article className="cart-item">
      <div className="cart-item__product">
        <div className="cart-item__image">
          <img src={product.image} alt={product.imageAlt} />
        </div>
        <div className="cart-item__details">
          <p className="cart-item__availability"><span aria-hidden="true" /> In stock · Ready to dispatch</p>
          <h2>{product.name}</h2>
          <p>{variant || product.specs}</p>
          <strong className="cart-item__mobile-price">${product.price.toFixed(2)} USD</strong>
        </div>
      </div>
      <div className="cart-item__actions">
        <div className="cart-item__price">
          <strong>${(product.price * quantity).toFixed(2)}</strong>
          <span>{quantity} × ${product.price.toFixed(2)}</span>
        </div>
        <div className="cart-quantity" aria-label={`Quantity for ${product.name}`}>
          <button
            type="button"
            aria-label={`Decrease ${product.name} quantity`}
            disabled={quantity <= 1}
            onClick={() => onQuantityChange(item.id, quantity - 1)}
          ><FaMinus aria-hidden="true" /></button>
          <output aria-live="polite" aria-label={`${quantity} units`}>{quantity}</output>
          <button
            type="button"
            aria-label={`Increase ${product.name} quantity`}
            onClick={() => onQuantityChange(item.id, quantity + 1)}
          ><FaPlus aria-hidden="true" /></button>
        </div>
        <button
          className="cart-item__remove"
          type="button"
          aria-label={`Remove ${product.name} from bag`}
          onClick={() => onRemove(item.id)}
        ><FaTrash aria-hidden="true" /></button>
      </div>
    </article>
  );
}

export default CartItemRow;
