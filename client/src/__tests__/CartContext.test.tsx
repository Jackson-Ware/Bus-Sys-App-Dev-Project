import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../context/CartContext';
import * as cartService from '../services/cartService';
import type { CartItem } from '../types/CartItem';

vi.mock('../services/cartService');

const itemA: CartItem = {
  id: 1, userId: 'u1', productId: 10, quantity: 2,
  addedDate: '2026-01-01', product: null,
};

const itemB: CartItem = {
  id: 2, userId: 'u1', productId: 11, quantity: 3,
  addedDate: '2026-01-01', product: null,
};

// Minimal consumer component that surfaces the values we want to assert on.
function Probe() {
  const { itemCount, state, addToCart } = useCart();
  return (
    <div>
      <span data-testid="count">{itemCount}</span>
      <span data-testid="loading">{state.loading.toString()}</span>
      <span data-testid="error">{state.error ?? ''}</span>
      <button onClick={() => addToCart(itemA.productId)}>Add</button>
    </div>
  );
}

describe('CartProvider / useCart', () => {
  beforeEach(() => {
    vi.mocked(cartService.getCart).mockResolvedValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('starts loading and then resolves to an empty cart', async () => {
    render(
      <CartProvider>
        <Probe />
      </CartProvider>,
    );

    // Before the async effect resolves, loading should be true.
    expect(screen.getByTestId('loading').textContent).toBe('true');

    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false');
    });
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('itemCount sums quantities across all cart items', async () => {
    vi.mocked(cartService.getCart).mockResolvedValue([itemA, itemB]);

    render(
      <CartProvider>
        <Probe />
      </CartProvider>,
    );

    // itemA.quantity=2 + itemB.quantity=3 = 5
    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('5');
    });
  });

  it('addToCart adds a new item and increments itemCount', async () => {
    const newItem: CartItem = { ...itemA, id: 99, quantity: 1 };
    vi.mocked(cartService.addToCart).mockResolvedValue(newItem);

    render(
      <CartProvider>
        <Probe />
      </CartProvider>,
    );

    // Wait for initial load to settle.
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false');
    });

    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('1');
    });
    expect(screen.getByTestId('error').textContent).toBe('');
  });

  it('addToCart sets an error message when the service throws', async () => {
    vi.mocked(cartService.addToCart).mockRejectedValue(new Error('Out of stock'));

    render(
      <CartProvider>
        <Probe />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false');
    });

    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe('Out of stock');
    });
  });
});
