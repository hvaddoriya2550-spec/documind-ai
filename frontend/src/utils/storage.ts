/**
 * Utility functions for localStorage
 */

import { STORAGE_KEYS } from '../constants';
import type { User } from '../types';

export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const setToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const clearAuthStorage = (): void => {
  removeToken();
  removeUser();
};
