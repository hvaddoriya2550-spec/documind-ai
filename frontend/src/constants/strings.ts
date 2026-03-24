/**
 * UI Strings / Copy
 * Centralized text content for the application
 */

export const STRINGS = {
  // Common buttons
  BUTTON: {
    SUBMIT: 'Submit',
    CANCEL: 'Cancel',
    SAVE: 'Save',
    DELETE: 'Delete',
    LOGOUT: 'Logout',
    LOGIN: 'Login',
    SIGNUP: 'Sign Up',
    CONTINUE: 'Continue',
    SIGN_IN: 'Sign In',
    SIGN_UP: 'Sign Up',
  },

  // Navigation
  NAV: {
    DASHBOARD: 'Dashboard',
    DOCUMENTS: 'Documents',
    PROFILE: 'Profile',
    SETTINGS: 'Settings',
  },

  // Auth pages
  AUTH: {
    LOGIN_TITLE: 'Welcome Back',
    LOGIN_SUBTITLE: 'Sign in to your account to continue',
    SIGNUP_TITLE: 'Create Account',
    SIGNUP_SUBTITLE: 'Get started with DocuMind AI',
    
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    EMAIL: 'Email Address',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    
    ALREADY_HAVE_ACCOUNT: 'Already have an account?',
    NO_ACCOUNT: "Don't have an account?",
    
    FORGOT_PASSWORD: 'Forgot password?',
    REMEMBER_ME: 'Remember me',
    
    SIGN_IN: 'Sign In',
    SIGN_UP: 'Sign Up',
    
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
    EMAIL_ALREADY_EXISTS: 'Email already registered',
    INVALID_CREDENTIALS: 'Invalid email or password',
  },

  // Dashboard
  DASHBOARD: {
    WELCOME: 'Welcome to DocuMind AI',
    QUICK_START: 'Quick Start',
    RECENT_DOCUMENTS: 'Recent Documents',
    NO_DOCUMENTS: 'No documents yet. Create one to get started.',
  },

  // Errors
  ERRORS: {
    SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    NOT_FOUND: 'Page not found',
    UNAUTHORIZED: 'You are not authorized to access this page',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
  },

  // Success messages
  SUCCESS: {
    LOGIN_SUCCESS: 'Logged in successfully!',
    SIGNUP_SUCCESS: 'Account created successfully!',
    SAVED: 'Changes saved successfully!',
    DELETED: 'Deleted successfully!',
  },

  // Labels
  LABELS: {
    OR: 'OR',
    LOADING: 'Loading...',
    NO_DATA: 'No data available',
    EMAIL: 'Email Address',
    PASSWORD: 'Password',
    NAME: 'Full Name',
    CONFIRM_PASSWORD: 'Confirm Password',
  },
} as const;
