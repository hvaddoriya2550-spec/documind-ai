/**
 * Central exports for all constants
 */

export * from './colors';
export * from './routes';
export * from './strings';

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  TIMEOUT: 30000, // 30 seconds
  API_V: '/api/v1',
} as const;

// Time constants
export const TIME = {
  MS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes before actual expiry
} as const;

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  THEME: 'app_theme',
} as const;
