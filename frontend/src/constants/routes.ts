/**
 * Application Routes
 * Centralized route definitions
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  
  // Resource routes
  DOCUMENTS: '/documents',
  DOCUMENT_DETAIL: '/documents/:id',
  
  // Catch-all
  NOT_FOUND: '*',
} as const;

/**
 * Route groups for easier navigation
 */
export const ROUTE_GROUPS = {
  PUBLIC: [ROUTES.HOME, ROUTES.LOGIN, ROUTES.SIGNUP],
  PROTECTED: [ROUTES.DASHBOARD, ROUTES.PROFILE, ROUTES.DOCUMENTS],
} as const;
