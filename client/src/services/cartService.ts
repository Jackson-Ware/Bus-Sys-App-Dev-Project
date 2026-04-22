import type { CartItem } from '../types/CartItem';
import { API_BASE } from '../api/http';
import { getToken } from './authService';

const BASE_URL = `${API_BASE}/api/cart`;

function authHeaders(): HeadersInit {
  const token = getToken();
  if (!token) throw new Error('Not authenticated. Please log in.');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export async function getCart(): Promise<CartItem[]> {
  const response = await fetch(BASE_URL, { headers: authHeaders() });
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
}

export async function addToCart(productId: number, quantity: number): Promise<CartItem> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: 'Failed to add item' }));
    throw new Error((err as { message?: string }).message ?? 'Failed to add item');
  }
  return response.json();
}

export async function updateQuantity(cartItemId: number, quantity: number): Promise<CartItem> {
  const response = await fetch(`${BASE_URL}/${cartItemId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error('Failed to update quantity');
  return response.json();
}

export async function removeItem(cartItemId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${cartItemId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Failed to remove item');
}

export async function clearCart(): Promise<void> {
  const response = await fetch(`${BASE_URL}/clear`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Failed to clear cart');
}
