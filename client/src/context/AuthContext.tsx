import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import * as authService from '../services/authService';
import type { AuthUser } from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => authService.getStoredUser());

  // Re-check token validity on mount (handles page refresh)
  useEffect(() => {
    setUser(authService.getStoredUser());
  }, []);

  async function login(email: string, password: string) {
    const data = await authService.login(email, password);
    setUser({ email: data.email, role: data.role, expiresAt: data.expiresAt });
  }

  async function register(email: string, password: string) {
    const data = await authService.register(email, password);
    setUser({ email: data.email, role: data.role, expiresAt: data.expiresAt });
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
