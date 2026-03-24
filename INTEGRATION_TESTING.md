# Frontend & Backend Integration Testing Guide

## Prerequisites

### Ensure Backend is Running
```bash
cd backend
python -m uvicorn app.main:app --reload
```

Backend should be running on `http://localhost:8000`

### Ensure Frontend Dependencies are Installed
```bash
cd frontend
npm install
```

### Start Frontend Dev Server
```bash
npm run dev
```

Frontend should be running on `http://localhost:5173`

## Testing the Complete Authentication Flow

### Test 1: User Signup

**Steps:**
1. Navigate to http://localhost:5173/signup
2. Fill in the form:
   - Name: `John Doe`
   - Email: `john.doe@example.com`
   - Password: `SecurePassword123`
   - Confirm Password: `SecurePassword123`
3. Click "Sign Up" button

**Expected Results:**
- Form validation passes
- Loading spinner appears
- Request sent to `POST /api/v1/auth/signup`
- Response contains `access_token`, `id`, `name`, `email`
- Token stored in localStorage
- User data stored in localStorage
- Redirect to `/dashboard`
- Dashboard displays welcome message with user name

**How to Verify:**
- Open browser DevTools → Application → LocalStorage
- Check `auth_token` key contains JWT token
- Check `user_data` key contains user object

### Test 2: User Login with Same Account

**Steps:**
1. Go to http://localhost:5173/login
2. Fill in the form:
   - Email: `john.doe@example.com`
   - Password: `SecurePassword123`
3. Click "Sign In" button

**Expected Results:**
- Form validation passes
- Loading spinner appears
- Request sent to `POST /api/v1/auth/login`
- Response contains token
- Token stored in localStorage
- Redirect to `/dashboard`

### Test 3: Protected Route Access

**Steps:**
1. Click "Logout" button on dashboard
2. Navigate directly to http://localhost:5173/dashboard
3. Should redirect to login page

**Expected Results:**
- ProtectedRoute component checks localStorage for token
- No token found
- Automatic redirect to `/login`

### Test 4: Logout Functionality

**Steps:**
1. Login with credentials from Test 2
2. Dashboard is displayed
3. Click "Logout" button

**Expected Results:**
- localStorage cleared (`auth_token` and `user_data` removed)
- Redirect to `/login`
- Dashboard no longer accessible

### Test 5: Form Validation Errors

**Signup Form:**
1. Navigate to `/signup`
2. Leave all fields empty and click "Sign Up"
3. Should show validation errors:
   - "Name is required"
   - "Email is required"
   - "Password is required"

4. Enter name less than 2 characters
5. Should show: "Name is required"

6. Enter invalid email `notanemail`
7. Should show: "Invalid email format"

8. Enter password with 5 characters
9. Should show: "Password must be at least 6 characters"

9. Enter different passwords
10. Should show: "Passwords do not match"

**Login Form:**
1. Navigate to `/login`
2. Leave fields empty and click "Sign In"
3. Should show validation errors

### Test 6: API Error Handling

**Signup with Existing Email:**
1. Signup with email: `test@example.com`
2. Signup again with same email
3. Should show error: "Signup failed. Email may already exist."

**Login with Wrong Password:**
1. Enter correct email but wrong password
2. Should show error: "Invalid email or password"

### Test 7: Token Injection in API Requests

**Steps:**
1. Login successfully
2. Open browser DevTools → Network tab
3. Observe the Authorization header format

**Expected Results:**
- Request headers should contain:
  ```
  Authorization: Bearer <jwt_token>
  ```

### Test 8: Automatic Logout on 401

**Steps:**
1. Login successfully
2. Manually remove `auth_token` from localStorage using DevTools Console
3. Try to navigate to protected page
4. Manually modify token to invalid value
5. Try to make API request

**Expected Results:**
- If 401 response received, redirect to login

## API Endpoint Testing

### Signup Endpoint

**URL:** `POST http://localhost:8000/api/v1/auth/signup`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "password": "TestPassword123"
}
```

**Expected Response:**
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Login Endpoint

**URL:** `POST http://localhost:8000/api/v1/auth/login`

**Request Body:**
```json
{
  "email": "jane.smith@example.com",
  "password": "TestPassword123"
}
```

**Expected Response:**
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Get Current User Endpoint

**URL:** `GET http://localhost:8000/api/v1/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Expected Response:**
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```

## Testing with cURL (Command Line)

### Signup via cURL
```bash
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### Login via cURL
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### Get Current User (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## Debugging Tips

### Check Backend Logs
Monitor FastAPI logs in terminal:
```
INFO:     127.0.0.1:xxxx - "POST /api/v1/auth/signup HTTP/1.1" 200 OK
```

### Check Frontend Console
1. Open browser DevTools → Console tab
2. Look for API response logs
3. Check for JavaScript errors

### Verify Database Connection
```bash
# In PostgreSQL
psql -U postgres
\c documind_ai
SELECT * FROM users;
```

### Test Token Validity
Use jwt.io to decode token:
1. Copy token from localStorage
2. Paste at https://jwt.io
3. Verify payload contains:
   - `sub` (subject - usually email)
   - `exp` (expiration time)
   - `iat` (issued at time)

## Common Issues & Solutions

### Issue: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Ensure backend has CORS middleware configured
- Check backend is running on `http://localhost:8000`
- Verify frontend `VITE_API_URL` matches backend URL

### Issue: 401 Unauthorized
```
Response status: 401
```

**Solutions:**
1. Check token exists in localStorage
2. Verify token format: `Bearer <token>`
3. Check token expiration
4. Verify Authorization header spelling (case-sensitive)

### Issue: Network Timeout
```
Failed to load resource: the server responded with a status of 0
```

**Solutions:**
1. Ensure backend is running: `python -m uvicorn app.main:app --reload`
2. Check backend port (8000) is not in use
3. Increase API timeout in `src/constants/index.ts`

### Issue: Token Not Being Sent
**Solution:**
- Check axios interceptor in `src/api/client.ts`
- Verify token exists: `localStorage.getItem('auth_token')`
- Clear browser cache and localStorage, try again

### Issue: Login Redirect Loop
**Solution:**
- Check ProtectedRoute logic
- Verify logout clears localStorage correctly
- Ensure token is being stored properly on login

## Performance Testing

### Measure API Response Times
1. Open DevTools → Network tab
2. Filter by `xhr` (XHR requests)
3. Check response times for each endpoint
4. Expected: 100-500ms for local setup

### Monitor Bundle Size
```bash
npm run build
# Check dist/ folder size
```

## Load Testing (Optional)

Using Apache Bench:
```bash
# Test signup endpoint (requires backend running)
ab -n 10 -c 2 -p data.json -T application/json http://localhost:8000/api/v1/auth/login
```

## Checklist for Production

- [ ] Environment variables configured
- [ ] API_CONFIG.BASE_URL points to production backend
- [ ] CORS properly configured
- [ ] Token refresh implemented (if expiration < 1 hour)
- [ ] Error boundaries added
- [ ] Logging/monitoring setup
- [ ] Security headers configured
- [ ] HTTPS enabled
- [ ] Database backups configured
- [ ] User input sanitization implemented

## Conclusion

This complete integration test verifies:
1. ✅ Frontend can communicate with backend
2. ✅ Authentication flow works end-to-end
3. ✅ Token management is secure
4. ✅ Protected routes work correctly
5. ✅ Error handling is proper
6. ✅ Form validation prevents bad data
7. ✅ API interceptors inject tokens automatically

All tests should pass for production readiness.
