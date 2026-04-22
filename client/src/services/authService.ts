import { API_BASE } from '../api/http';

const BASE_URL = `${API_BASE}/api/auth`;
const TOKEN_KEY = 'bm_token';

export interface AuthResponse {
  token: string;
  expiresAt: string;
  email: string;
  role: string;
}

export interface AuthUser {
  email: string;
  role: string;
  expiresAt: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? 'Login failed.');
  }
  const data: AuthResponse = await res.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? 'Registration failed.');
  }
  const data: AuthResponse = await res.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

// Decode the JWT payload (no signature verification — trust the server for that).
// Returns null if token is missing or expired.
export function getStoredUser(): AuthUser | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      logout();
      return null;
    }
    return {
      email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ?? '',
      role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? 'User',
      expiresAt: new Date(payload.exp * 1000).toISOString(),
    };
  } catch {
    logout();
    return null;
  }
}
