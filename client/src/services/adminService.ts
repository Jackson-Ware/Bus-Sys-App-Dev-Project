import type { Order } from '../types/Order';
import { API_BASE } from '../api/http';
import { getToken } from './authService';

const ORDERS_BASE = `${API_BASE}/api/orders`;
const ADMIN_BASE = `${API_BASE}/api/admin`;
const PRODUCTS_BASE = `${API_BASE}/api/products`;

export interface AdminOrder extends Order {
  userEmail: string;
}

export interface ProductRequest {
  title: string;
  description: string;
  price: number;
  category: string;
  sellerName: string;
  imageUrl: string;
}

function authHeaders(): HeadersInit {
  const token = getToken();
  if (!token) throw new Error('Not authenticated. Please log in.');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export async function getAllOrders(): Promise<AdminOrder[]> {
  const res = await fetch(`${ADMIN_BASE}/orders`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function updateOrderStatus(id: number, status: string): Promise<void> {
  const res = await fetch(`${ORDERS_BASE}/${id}/status`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to update status' }));
    throw new Error((err as { message?: string }).message ?? 'Failed to update status');
  }
}

export async function createProduct(data: ProductRequest): Promise<void> {
  const res = await fetch(PRODUCTS_BASE, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to create product' }));
    throw new Error((err as { message?: string }).message ?? 'Failed to create product');
  }
}

export async function updateProduct(id: number, data: ProductRequest): Promise<void> {
  const res = await fetch(`${PRODUCTS_BASE}/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to update product' }));
    throw new Error((err as { message?: string }).message ?? 'Failed to update product');
  }
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${PRODUCTS_BASE}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to delete product' }));
    throw new Error((err as { message?: string }).message ?? 'Failed to delete product');
  }
}
