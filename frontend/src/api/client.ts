/**
 * Axios API client with interceptors
 */

import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { API_CONFIG, STORAGE_KEYS } from '../constants';

/**
 * Creates an axios instance with default configuration
 */
export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - add token to headers
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle errors globally
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Unauthorized - clear storage and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();
