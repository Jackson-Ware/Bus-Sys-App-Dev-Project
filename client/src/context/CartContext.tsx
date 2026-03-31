import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem } from '../types/CartItem';
import * as cartService from '../services/cartService';

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

type CartAction =
  | { type: 'SET_CART'; items: CartItem[] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SET_SUCCESS'; message: string | null }
  | { type: 'UPDATE_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; cartItemId: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.items, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
    case 'SET_SUCCESS':
      return { ...state, successMessage: action.message };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.item.id ? action.item : i)),
      };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.cartItemId) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  itemCount: number;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: true,
    error: null,
    successMessage: null,
  });

  // Load cart on mount
  useEffect(() => {
    cartService
      .getCart()
      .then((items) => dispatch({ type: 'SET_CART', items }))
      .catch(() => dispatch({ type: 'SET_ERROR', error: 'Could not load cart.' }));
  }, []);

  // Auto-clear success messages after 3 seconds
  useEffect(() => {
    if (!state.successMessage) return;
    const timer = setTimeout(() => dispatch({ type: 'SET_SUCCESS', message: null }), 3000);
    return () => clearTimeout(timer);
  }, [state.successMessage]);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  async function addToCart(productId: number, quantity = 1) {
    dispatch({ type: 'SET_ERROR', error: null });
    try {
      const updated = await cartService.addToCart(productId, quantity);
      // If item already existed it comes back updated; replace or add
      const exists = state.items.some((i) => i.id === updated.id);
      if (exists) {
        dispatch({ type: 'UPDATE_ITEM', item: updated });
      } else {
        dispatch({ type: 'SET_CART', items: [...state.items, updated] });
      }
      dispatch({ type: 'SET_SUCCESS', message: 'Item added to cart!' });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', error: err instanceof Error ? err.message : 'Failed to add item' });
    }
  }

  async function updateQuantity(cartItemId: number, quantity: number) {
    try {
      const updated = await cartService.updateQuantity(cartItemId, quantity);
      dispatch({ type: 'UPDATE_ITEM', item: updated });
    } catch {
      dispatch({ type: 'SET_ERROR', error: 'Failed to update quantity.' });
    }
  }

  async function removeFromCart(cartItemId: number) {
    // Optimistic remove
    dispatch({ type: 'REMOVE_ITEM', cartItemId });
    try {
      await cartService.removeItem(cartItemId);
    } catch {
      // Revert by reloading cart on failure
      const items = await cartService.getCart().catch(() => state.items);
      dispatch({ type: 'SET_CART', items });
      dispatch({ type: 'SET_ERROR', error: 'Failed to remove item.' });
    }
  }

  async function clearCart() {
    dispatch({ type: 'CLEAR' });
    try {
      await cartService.clearCart();
    } catch {
      const items = await cartService.getCart().catch(() => state.items);
      dispatch({ type: 'SET_CART', items });
      dispatch({ type: 'SET_ERROR', error: 'Failed to clear cart.' });
    }
  }

  return (
    <CartContext.Provider value={{ state, itemCount, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
