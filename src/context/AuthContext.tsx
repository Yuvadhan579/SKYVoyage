import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

export interface User {
  id: string; name: string; email: string;
  frequentFlyerTier: 'Silver' | 'Gold' | 'Platinum' | 'Member'; miles: number;
}
interface AuthContextType {
  user: User | null; isAuthenticated: boolean; loading: boolean;
  login: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void; loginDemoUser: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('skyvoyage_auth_token');
    if (!token) { setLoading(false); return; }
    apiRequest<{ user: User }>('/auth/me').then(data => setUser(data.user))
      .catch(() => { localStorage.removeItem('skyvoyage_auth_token'); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  const saveSession = (data: { user: User; token: string }) => {
    localStorage.setItem('skyvoyage_auth_token', data.token);
    setUser(data.user);
  };
  const login = async (email: string, password: string, name?: string) => {
    const endpoint = name ? '/auth/register' : '/auth/login';
    const data = await apiRequest<{ user: User; token: string }>(endpoint, {
      method: 'POST', body: JSON.stringify({ email, password, name }),
    });
    saveSession(data);
  };
  const loginDemoUser = async () => {
    const data = await apiRequest<{ user: User; token: string }>('/auth/demo', { method: 'POST' });
    saveSession(data);
  };
  const logout = () => {
    void apiRequest('/auth/logout', { method: 'POST' }).catch(() => undefined);
    localStorage.removeItem('skyvoyage_auth_token'); setUser(null);
  };
  return <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout, loginDemoUser }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
