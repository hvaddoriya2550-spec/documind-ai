/**
 * useAuth hook - manage authentication state
 */

import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';
import type { User } from '../types';
import { authApi } from '../api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!token;

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login({ email, password });
      const { data } = response;

      // Store token and user
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.access_token);
        const userData: User = {
          id: data.id,
          name: data.name,
          email: data.email,
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        setToken(data.access_token);
        setUser(userData);
      }
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.signup({ name, email, password });
      const { data } = response;

      // Store token and user
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.access_token);
        const userData: User = {
          id: data.id,
          name: data.name,
          email: data.email,
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        setToken(data.access_token);
        setUser(userData);
      }
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Signup failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      setToken(null);
      setUser(null);
      setError(null);
      window.location.href = '/login';
    }
  }, []);

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
  };
};
