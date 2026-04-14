import { cartReducer } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

const baseState = {
  items: [] as CartItem[],
  loading: false,
  error: null,
  successMessage: null,
};

const item: CartItem = {
  id: 1,
  userId: 'user1',
  productId: 10,
  quantity: 2,
  addedDate: '2026-01-01',
  product: null,
};

describe('cartReducer — pure function', () => {
  it('SET_CART replaces items, clears loading and error', () => {
    const state = { ...baseState, loading: true, error: 'old error' };
    const next = cartReducer(state, { type: 'SET_CART', items: [item] });
    expect(next.items).toEqual([item]);
    expect(next.loading).toBe(false);
    expect(next.error).toBeNull();
  });

  it('REMOVE_ITEM filters out the item with the matching id', () => {
    const second: CartItem = { ...item, id: 2, quantity: 3 };
    const state = { ...baseState, items: [item, second] };
    const next = cartReducer(state, { type: 'REMOVE_ITEM', cartItemId: 1 });
    expect(next.items).toHaveLength(1);
    expect(next.items[0].id).toBe(2);
  });

  it('UPDATE_ITEM replaces the item with a matching id in-place', () => {
    const state = { ...baseState, items: [item] };
    const updated: CartItem = { ...item, quantity: 7 };
    const next = cartReducer(state, { type: 'UPDATE_ITEM', item: updated });
    expect(next.items).toHaveLength(1);
    expect(next.items[0].quantity).toBe(7);
  });

  it('CLEAR empties the items array', () => {
    const state = { ...baseState, items: [item] };
    const next = cartReducer(state, { type: 'CLEAR' });
    expect(next.items).toHaveLength(0);
  });

  it('SET_ERROR records the error message and clears loading', () => {
    const state = { ...baseState, loading: true };
    const next = cartReducer(state, { type: 'SET_ERROR', error: 'something broke' });
    expect(next.error).toBe('something broke');
    expect(next.loading).toBe(false);
  });

  it('SET_SUCCESS stores the success message', () => {
    const state = { ...baseState };
    const next = cartReducer(state, { type: 'SET_SUCCESS', message: 'Item added to cart!' });
    expect(next.successMessage).toBe('Item added to cart!');
  });

  it('unknown action type returns state unchanged', () => {
    // @ts-expect-error — intentional unknown action to verify default branch
    const next = cartReducer(baseState, { type: 'UNKNOWN' });
    expect(next).toBe(baseState);
  });
});
