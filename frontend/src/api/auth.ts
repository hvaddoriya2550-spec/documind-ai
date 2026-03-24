/**
 * Auth API endpoints
 */

import { apiClient } from './client';
import type { AuthResponse, LoginPayload, SignupPayload, User } from '../types';
import { API_CONFIG } from '../constants';

const BASE_URL = `${API_CONFIG.API_V}/auth`;

export const authApi = {
  /**
   * Login user
   */
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>(`${BASE_URL}/login`, payload),

  /**
   * Signup new user
   */
  signup: (payload: SignupPayload) =>
    apiClient.post<AuthResponse>(`${BASE_URL}/signup`, payload),

  /**
   * Get current user profile
   */
  getCurrentUser: () =>
    apiClient.get<User>(`${BASE_URL}/me`),
};
