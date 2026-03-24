# Frontend Project Setup Guide

## Installation

The frontend project structure has been set up with a professional, scalable architecture.

### Dependencies
Make sure you have installed all required packages:

```bash
npm install
```

Key packages installed:
- **react-router-dom** v6.x - Client-side routing with protected routes
- **axios** - HTTP client for API communication
- **tailwindcss** - Utility-first CSS framework

## Project Structure

```
src/
├── api/                 # API communication layer
│   ├── client.ts       # Axios instance with interceptors
│   ├── auth.ts         # Auth API endpoints
│   └── index.ts        # Central API exports
├── components/
│   ├── common/         # Reusable UI components
│   │   ├── Button.tsx  # Primary, secondary, danger, ghost variants
│   │   ├── Input.tsx   # Form input with validation states
│   │   ├── Card.tsx    # Container component
│   │   └── PageContainer.tsx
│   ├── forms/          # Form-specific components
│   └── layout/         # Layout-specific components
├── constants/
│   ├── colors.ts       # Color palette
│   ├── routes.ts       # All route definitions
│   ├── strings.ts      # UI copy and labels
│   └── index.ts        # Central exports
├── context/            # React Context providers (prepared)
├── hooks/
│   ├── useAuth.ts      # Authentication state and methods
│   ├── useLocalStorage.ts # Typed localStorage wrapper
│   └── index.ts
├── layouts/
│   ├── AuthLayout.tsx  # For login/signup pages
│   ├── AppLayout.tsx   # For authenticated pages
│   └── index.ts
├── pages/
│   ├── auth/
│   │   ├── Login.tsx   # Login page with form
│   │   ├── Signup.tsx  # Signup page with form
│   │   └── index.ts
│   ├── Dashboard.tsx   # Protected dashboard page
│   └── (additional pages)
├── routes/
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   ├── AppRoutes.tsx      # Route configuration
│   └── index.ts
├── services/           # Business logic (prepared for future)
├── styles/
│   ├── theme.ts        # Theme variables (prepared)
│   └── global.css      # Global styles
├── types/              # TypeScript type definitions
│   └── index.ts        # User, Auth, Api types
├── utils/
│   ├── validation.ts   # Email, password validation
│   ├── storage.ts      # localStorage helpers
│   └── index.ts
├── App.tsx             # App component with routing
├── App.css
├── main.tsx            # React entry point
└── index.css           # Global styles
```

## Running the Application

### Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Key Features Implemented

### 1. **Authentication Flow**
- Signup page with form validation
- Login page with JWT token handling
- Token stored in localStorage
- Automatic token refresh via API interceptors

### 2. **Routing**
- Protected routes that require authentication
- Automatic redirect to login if token is missing
- Route guards via `ProtectedRoute` component
- Lazy-loaded pages for performance

### 3. **API Communication**
- Axios instance with automatic token injection
- Request/response interceptors
- Automatic logout on 401 response
- Type-safe API calls

### 4. **UI Components**
- Button (primary, secondary, danger, ghost variants)
- Input with validation error display
- Card component (default, elevated, outlined)
- PageContainer for consistent max-width

### 5. **State Management**
- useAuth hook for authentication logic
- useLocalStorage hook for persistent state
- localStorage for token and user data

### 6. **Type Safety**
- Full TypeScript coverage
- Type definitions for User, Auth, Api responses
- Typed API functions

## API Integration

The frontend is configured to communicate with:
- **Base URL**: `http://localhost:8000` (configurable via `VITE_API_URL` env variable)
- **API Prefix**: `/api/v1`
- **Timeout**: 30 seconds

### Environment Variables
Create a `.env.local` file to override defaults:

```
VITE_API_URL=http://localhost:8000
```

## Authentication

### Signup
1. User fills signup form (name, email, password)
2. Form validation checks:
   - Name is required
   - Email is valid
   - Password is at least 6 characters
   - Passwords match
3. On success, user is logged in immediately
4. Token is stored in localStorage
5. Redirect to dashboard

### Login
1. User fills login form (email, password)
2. On success, JWT token is received
3. Token stored in localStorage
4. Logged in user data stored
5. Redirect to dashboard

### Protected Pages
1. ProtectedRoute checks if token exists in localStorage
2. If no token, redirect to login
3. If token exists, allow access to page
4. API calls automatically inject token in Authorization header

## Development Tips

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/routes/AppRoutes.tsx`
3. Use appropriate layout (AuthLayout or AppLayout)

### Adding New Components
1. Create reusable components in `src/components/common/`
2. Export from `src/components/common/index.ts`
3. Use existing Button, Input, Card components

### Adding New API Endpoints
1. Add endpoint function in `src/api/`
2. Import and use in pages/components
3. Use useAuth hook for authentication context

### Type Safety
1. Define types in `src/types/`
2. Import types in components
3. Use types for function parameters and returns

## Common Issues

### Token Not Being Sent
- Check if token exists in localStorage (STORAGE_KEYS.TOKEN)
- Verify Authorization header format: "Bearer <token>"
- Check API client interceptor in `src/api/client.ts`

### Redirect Loop
- Ensure ProtectedRoute properly checks for token
- Verify logout clears localStorage
- Check AppRoutes has correct route configurations

### CORS Issues
- Ensure backend is running on `http://localhost:8000`
- Backend should have CORS middleware configured
- Check requests in browser DevTools Network tab

## Next Steps

1. **Add More Pages**: Create profile, documents, settings pages
2. **Enhance Components**: Add form wrappers, modals, notifications
3. **State Management**: Consider adding Redux or Zustand for complex state
4. **Testing**: Add Jest and React Testing Library
5. **Styling**: Customize Tailwind theme in `tailwind.config.js`
6. **Error Handling**: Add global error boundary and toast notifications
