# DocuMind AI Backend API Documentation

## Base URL
```
http://127.0.0.1:8000
```

---

## System Endpoints

### 1) GET / (Root)
**Description:** Welcome message

**Request:**
```
GET http://127.0.0.1:8000/
```

**Response:** `200 OK`
```json
{
  "message": "DocuMind AI backend running"
}
```

---

### 2) GET /health
**Description:** Health check endpoint

**Request:**
```
GET http://127.0.0.1:8000/health
```

**Response:** `200 OK`
```json
{
  "status": "ok"
}
```

---

### 3) GET /test-db
**Description:** Test database connectivity

**Request:**
```
GET http://127.0.0.1:8000/test-db
```

**Response:** `200 OK`
```json
{
  "message": "Database connection successful",
  "result": 1
}
```

**Error Response:** `500 Internal Server Error`
```json
{
  "error": "Error message describing database issue"
}
```

---

## Authentication Endpoints

### 4) POST /api/v1/auth/signup
**Description:** Register a new user and get access token for immediate dashboard access

**Request:**
```
POST http://127.0.0.1:8000/api/v1/auth/signup
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Request Body Fields:**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| name | string | Yes | Min length: 2, Max length: 100 |
| email | string | Yes | Valid email format |
| password | string | Yes | Min length: 6 |

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiZXhwIjoxNzc0MzExMzQwfQ.abc123def456",
  "token_type": "bearer"
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| id | integer | User ID |
| name | string | User's full name |
| email | string | User's email address |
| access_token | string | JWT token for authenticated requests (valid for 30 mins) |
| token_type | string | Always "bearer" |

**Key Feature:** After signup, user receives an access token and can directly access the dashboard without needing to login separately.

**Error Responses:**

**400 Bad Request** (Duplicate email):
```json
{
  "detail": "Email already registered"
}
```

**422 Unprocessable Entity** (Validation error):
```json
{
  "detail": [
    {
      "type": "string_too_short",
      "loc": ["body", "name"],
      "msg": "String should have at least 2 characters",
      "input": "A"
    }
  ]
}
```

---

### 5) POST /api/v1/auth/login
**Description:** Authenticate user and get JWT token

**Request:**
```
POST http://127.0.0.1:8000/api/v1/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Request Body Fields:**
| Field | Type | Required |
|-------|------|----------|
| email | string | Yes |
| password | string | Yes |

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiZXhwIjoxNzc0MzExMzQwfQ.abc123def456",
  "token_type": "bearer"
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| access_token | string | JWT token for authenticated requests |
| token_type | string | Always "bearer" |

**Error Responses:**

**401 Unauthorized** (Invalid credentials):
```json
{
  "detail": "Invalid credentials"
}
```

---

### 6) GET /api/v1/auth/me
**Description:** Get current authenticated user profile using valid JWT token

**Request:**
```
GET http://127.0.0.1:8000/api/v1/auth/me
Authorization: Bearer <access_token>
```

**Request Headers:**
| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| Authorization | Bearer {token} | Yes | JWT token from signup or login |

**How it works:**
1. Extracts JWT token from Authorization header
2. Decodes and validates token
3. Fetches user from database using email from token
4. Returns actual authenticated user data

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| id | integer | User ID |
| name | string | User's full name |
| email | string | User's email address |

**Error Responses:**

**401 Unauthorized** (Missing/invalid token):
```json
{
  "detail": "Invalid or expired token"
}
```

**401 Unauthorized** (Token payload invalid):
```json
{
  "detail": "Invalid token payload"
}
```

**401 Unauthorized** (User not found):
```json
{
  "detail": "User not found"
}
```

---

## Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required or failed |
| 404 | Not Found - Resource doesn't exist |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error - Server error |

---

## Example cURL Commands

### Signup (Get Token for Dashboard Access)
```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response will include `access_token` - use for immediate dashboard access without separate login.


### Login
```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User (with JWT token)
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://127.0.0.1:8000/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## Example PowerShell Commands

### Signup (Get Token Immediately)
```powershell
$json = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri http://127.0.0.1:8000/api/v1/auth/signup `
  -Method POST `
  -Body $json `
  -ContentType "application/json"

# Extract token for dashboard access
$token = $response.access_token
Write-Host "User registered successfully!"
Write-Host "Access Token: $token"
```

### Login
```powershell
$json = @{
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri http://127.0.0.1:8000/api/v1/auth/login `
  -Method POST `
  -Body $json `
  -ContentType "application/json"

$token = $response.access_token
```

### Get Current User (with JWT token)
```powershell
# You can use the token from signup or login response
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri http://127.0.0.1:8000/api/v1/auth/me `
  -Headers $headers
```

**Full example - Signup and immediately get user profile:**
```powershell
# Step 1: Signup
$signupJson = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$signup_response = Invoke-RestMethod -Uri http://127.0.0.1:8000/api/v1/auth/signup `
  -Method POST `
  -Body $signupJson `
  -ContentType "application/json"

$token = $signup_response.access_token

# Step 2: Get current user using token
$headers = @{
    "Authorization" = "Bearer $token"
}

$user = Invoke-RestMethod -Uri http://127.0.0.1:8000/api/v1/auth/me `
  -Headers $headers

Write-Host "Authenticated User: $($user.name) ($($user.email))"
```

---

## API Validation Rules

### Email
- Must be valid email format (name@domain.com)
- Must be unique in system
- Case-insensitive for storage

### Password
- Minimum 6 characters
- Stored as hashed value (argon2)
- Never returned in API responses

### Name
- Minimum 2 characters
- Maximum 100 characters
- Any characters allowed

### JWT Token
- Expires in 30 minutes by default
- Used for /auth/me endpoint
- Format: "Bearer {token}" in Authorization header

---

## Interactive API Documentation
Visit: `http://127.0.0.1:8000/docs` for Swagger UI with test interface
