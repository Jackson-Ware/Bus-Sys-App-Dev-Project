import type { CheckoutFormData, Order, OrderConfirmation } from '../types/Order';
import { API_BASE } from '../api/http';
import { getToken } from './authService';

const BASE_URL = `${API_BASE}/api/orders`;

function authHeaders(): HeadersInit {
  const token = getToken();
  if (!token) throw new Error('Not authenticated. Please log in.');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export async function placeOrder(data: CheckoutFormData): Promise<OrderConfirmation> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: 'Failed to place order' }));
    throw new Error((err as { message?: string }).message ?? 'Failed to place order');
  }
  return response.json();
}

export async function getMyOrders(): Promise<Order[]> {
  const response = await fetch(`${BASE_URL}/mine`, { headers: authHeaders() });
  if (!response.ok) throw new Error('Failed to fetch order history');
  return response.json();
}
