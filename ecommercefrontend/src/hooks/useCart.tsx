import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { StoreProduct } from '../data/storefront';

const CART_STORAGE_KEY = 'nexus-cart';
const FREE_SHIPPING_THRESHOLD = 150;
const STANDARD_SHIPPING = 25;

export interface CartItem {
  id: string;
  product: StoreProduct;
  quantity: number;
  variant?: string;
}

interface CartSnapshot {
  items: CartItem[];
  storageError: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  discountCode: string;
  discountError: string;
  storageError: string;
  addItem: (product: StoreProduct, quantity?: number, variant?: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  applyDiscountCode: (code: string) => boolean;
  clearDiscountCode: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<CartItem>;
  return typeof item.id === 'string'
    && typeof item.quantity === 'number'
    && Number.isInteger(item.quantity)
    && item.quantity > 0
    && Boolean(item.product)
    && typeof item.product?.name === 'string'
    && Number.isFinite(item.product?.price)
    && item.product.price >= 0
    && typeof item.product?.category === 'string'
    && typeof item.product?.description === 'string'
    && typeof item.product?.image === 'string'
    && typeof item.product?.imageAlt === 'string'
    && typeof item.product?.rating === 'string'
    && typeof item.product?.reviews === 'number'
    && typeof item.product?.badge === 'string'
    && typeof item.product?.badgeTone === 'string'
    && typeof item.product?.specs === 'string';
}

function readCart(): CartSnapshot {
  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return { items: [], storageError: '' };

    const parsed: unknown = JSON.parse(savedCart);
    if (!Array.isArray(parsed) || !parsed.every(isCartItem)) {
      return { items: [], storageError: 'Saved cart data was invalid and could not be restored.' };
    }
    return { items: parsed, storageError: '' };
  } catch {
    return { items: [], storageError: 'Saved cart data could not be read from this browser.' };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [initialCart] = useState(readCart);
  const [items, setItems] = useState(initialCart.items);
  const [storageError, setStorageError] = useState(initialCart.storageError);
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const canPersist = useRef(!initialCart.storageError);

  useEffect(() => {
    if (!canPersist.current && items.length === 0) return;
    canPersist.current = true;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      setStorageError('');
    } catch {
      setStorageError('Your cart could not be saved in this browser. It may not be available after you leave this page.');
    }
  }, [items]);

  const addItem = useCallback((product: StoreProduct, quantity = 1, variant = '') => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Cart quantity must be a positive whole number.');
    }

    const itemId = `${product.slug ?? product.name}::${variant}`;
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === itemId);
      if (existing) {
        return currentItems.map((item) => (
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        ));
      }
      return [...currentItems, { id: itemId, product, quantity, ...(variant ? { variant } : {}) }];
    });
  }, []);

  const setQuantity = useCallback((itemId: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Cart quantity must be a positive whole number.');
    }
    setItems((currentItems) => currentItems.map((item) => (
      item.id === itemId ? { ...item, quantity } : item
    )));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  }, []);

  const applyDiscountCode = useCallback((code: string) => {
    if (code.trim().toLocaleUpperCase() !== 'FIRSTORDER') {
      setDiscountError('That promotional code could not be applied. Check the code and try again.');
      return false;
    }
    setDiscountCode('FIRSTORDER');
    setDiscountError('');
    return true;
  }, []);

  const clearDiscountCode = useCallback(() => {
    setDiscountCode('');
    setDiscountError('');
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    clearDiscountCode();
  }, [clearDiscountCode]);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = discountCode ? subtotal * 0.1 : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING;
  const total = subtotal - discount + shipping;

  const value = useMemo(() => ({
    items,
    itemCount,
    subtotal,
    discount,
    shipping,
    total,
    discountCode,
    discountError,
    storageError,
    addItem,
    setQuantity,
    removeItem,
    applyDiscountCode,
    clearDiscountCode,
    clearCart,
  }), [
    items,
    itemCount,
    subtotal,
    discount,
    shipping,
    total,
    discountCode,
    discountError,
    storageError,
    addItem,
    setQuantity,
    removeItem,
    applyDiscountCode,
    clearDiscountCode,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used within a CartProvider.');
  }
  return cart;
}
