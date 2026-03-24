/**
 * User-related types
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Auth response from API
 */
export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  access_token: string;
  token_type: string;
}

/**
 * Login request payload
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Signup request payload
 */
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

/**
 * Generic API response
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

/**
 * Pagination data
 */
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Auth context type
 */
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
