import type { CartItem } from '../types/CartItem';

const BASE_URL = 'http://localhost:5000/api/cart';

export async function getCart(): Promise<CartItem[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
}

export async function addToCart(productId: number, quantity: number): Promise<CartItem> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: 'Failed to add item' }));
    throw new Error(err.message ?? 'Failed to add item');
  }
  return response.json();
}

export async function updateQuantity(cartItemId: number, quantity: number): Promise<CartItem> {
  const response = await fetch(`${BASE_URL}/${cartItemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error('Failed to update quantity');
  return response.json();
}

export async function removeItem(cartItemId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${cartItemId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to remove item');
}

export async function clearCart(): Promise<void> {
  const response = await fetch(`${BASE_URL}/clear`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to clear cart');
}
