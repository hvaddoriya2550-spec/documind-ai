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

## Workspace Endpoints (Phase 2)

### 7) POST /api/v1/workspaces
**Description:** Create a new workspace in the user's account

**Request:**
```
POST http://127.0.0.1:8000/api/v1/workspaces
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Headers:**
| Header | Value | Required |
|--------|-------|----------|
| Authorization | Bearer {token} | Yes |

**Request Body:**
```json
{
  "name": "My Documents",
  "description": "All important documents go here"
}
```

**Request Body Fields:**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| name | string | Yes | Min: 1, Max: 200 characters |
| description | string | No | Max: 5000 characters |

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "My Documents",
  "description": "All important documents go here",
  "created_at": "2026-03-26T10:55:19.565496",
  "updated_at": "2026-03-26T10:55:19.565505"
}
```

**Error Responses:**

**401 Unauthorized** (Missing or invalid token):
```json
{
  "detail": "Invalid or expired token"
}
```

---

### 8) GET /api/v1/workspaces
**Description:** List all workspaces for the authenticated user

**Request:**
```
GET http://127.0.0.1:8000/api/v1/workspaces
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "My Documents",
    "description": "All important documents go here",
    "created_at": "2026-03-26T10:55:19.565496",
    "updated_at": "2026-03-26T10:55:19.565505"
  },
  {
    "id": 2,
    "name": "Work Files",
    "description": "Project-related files",
    "created_at": "2026-03-26T10:56:20.123456",
    "updated_at": "2026-03-26T10:56:20.123456"
  }
]
```

---

### 9) GET /api/v1/workspaces/{workspace_id}
**Description:** Get details of a specific workspace

**Request:**
```
GET http://127.0.0.1:8000/api/v1/workspaces/1
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "My Documents",
  "description": "All important documents go here",
  "user_id": 1,
  "created_at": "2026-03-26T10:55:19.565496",
  "updated_at": "2026-03-26T10:55:19.565505"
}
```

**Error Responses:**

**404 Not Found** (Workspace doesn't exist):
```json
{
  "detail": "Workspace not found"
}
```

**403 Forbidden** (User doesn't own workspace):
```json
{
  "detail": "You don't have access to this workspace"
}
```

---

### 10) PUT /api/v1/workspaces/{workspace_id}
**Description:** Update workspace name or description

**Request:**
```
PUT http://127.0.0.1:8000/api/v1/workspaces/1
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "New description"
}
```

**Request Body Fields:** (Both optional - updates only provided fields)
| Field | Type | Required |
|-------|------|----------|
| name | string | No |
| description | string | No |

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Updated Name",
  "description": "New description",
  "created_at": "2026-03-26T10:55:19.565496",
  "updated_at": "2026-03-26T10:56:45.123456"
}
```

---

### 11) DELETE /api/v1/workspaces/{workspace_id}
**Description:** Delete a workspace and all its documents (cascading delete)

**Request:**
```
DELETE http://127.0.0.1:8000/api/v1/workspaces/1
Authorization: Bearer <access_token>
```

**Response:** `204 No Content` (Empty response body)

**Warning:** This action permanently deletes the workspace and all documents within it. This cannot be undone.

---

## Document Endpoints (Phase 2)

### 12) POST /api/v1/documents/upload
**Description:** Upload a document to a specific workspace

**Request:**
```
POST http://127.0.0.1:8000/api/v1/documents/upload?workspace_id=1
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Query Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| workspace_id | integer | Yes |

**Request Body:** (multipart/form-data)
```
file: [binary file data]
```

**Supported File Types:**
- PDF (.pdf)
- Word Documents (.docx)
- Text Files (.txt)
- Markdown Files (.md)

**File Constraints:**
- Maximum size: 50 MB
- Minimum 1 character filename

**Response:** `201 Created`
```json
{
  "id": 1,
  "workspace_id": 1,
  "file_name": "report.pdf",
  "file_type": "pdf",
  "file_size": 2048576,
  "status": "uploaded",
  "created_at": "2026-03-26T10:55:19.726765",
  "updated_at": "2026-03-26T10:55:19.726774"
}
```

**Error Responses:**

**400 Bad Request** (Invalid file type):
```json
{
  "detail": "File type 'exe' not allowed. Allowed types: pdf, docx, txt, md"
}
```

**400 Bad Request** (File too large):
```json
{
  "detail": "File size exceeds maximum allowed size of 50MB"
}
```

**404 Not Found** (Workspace doesn't exist):
```json
{
  "detail": "Workspace not found"
}
```

**403 Forbidden** (User doesn't own workspace):
```json
{
  "detail": "You don't have access to this workspace"
}
```

---

### 13) GET /api/v1/documents
**Description:** List documents for the authenticated user, optionally filtered by workspace

**Request:**
```
GET http://127.0.0.1:8000/api/v1/documents?workspace_id=1
Authorization: Bearer <access_token>
```

**Query Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| workspace_id | integer | No |

**Response:** `200 OK`
```json
{
  "documents": [
    {
      "id": 1,
      "workspace_id": 1,
      "file_name": "report.pdf",
      "file_type": "pdf",
      "file_size": 2048576,
      "status": "uploaded",
      "created_at": "2026-03-26T10:55:19.726765",
      "updated_at": "2026-03-26T10:55:19.726774"
    }
  ],
  "total": 1,
  "workspace_id": 1
}
```

**Document Status Values:**
- `uploaded` - File recently uploaded, ready for processing
- `processing` - Currently being analyzed by AI
- `ready` - Fully processed and indexed
- `failed` - Processing failed, document may need re-upload

---

### 14) GET /api/v1/documents/{document_id}
**Description:** Get details of a specific document

**Request:**
```
GET http://127.0.0.1:8000/api/v1/documents/1
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "workspace_id": 1,
  "file_name": "report.pdf",
  "file_type": "pdf",
  "file_size": 2048576,
  "status": "uploaded",
  "created_at": "2026-03-26T10:55:19.726765",
  "updated_at": "2026-03-26T10:55:19.726774"
}
```

**Error Responses:**

**404 Not Found** (Document doesn't exist):
```json
{
  "detail": "Document not found"
}
```

**403 Forbidden** (User doesn't own document):
```json
{
  "detail": "You don't have access to this document"
}
```

---

### 15) DELETE /api/v1/documents/{document_id}
**Description:** Delete a document and remove it from storage

**Request:**
```
DELETE http://127.0.0.1:8000/api/v1/documents/1
Authorization: Bearer <access_token>
```

**Response:** `204 No Content` (Empty response body)

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
- Used for authenticated endpoints
- Format: "Bearer {token}" in Authorization header

### Workspace
- Name: 1-200 characters (required)
- Description: 0-5000 characters (optional)
- Ownership: Only creator can view/edit/delete
- Cascade Delete: Deleting workspace deletes all documents

### Document
- File Types: PDF, DOCX, TXT, MD only
- Maximum Size: 50 MB
- Filename: 1+ characters (auto-ensured by system)
- Status Tracking: uploaded → processing → ready/failed
- Ownership: Only documents in user's workspaces visible
- Auto-Delete: Document files removed from disk when deleted

---

## Example PowerShell Commands - Phase 2

### Create Workspace
```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

$workspaceJson = @{
    name = "My Documents"
    description = "All important documents"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
}

$workspace = Invoke-RestMethod -Uri http://127.0.0.1:8000/api/v1/workspaces `
  -Method POST `
  -Body $workspaceJson `
  -ContentType "application/json" `
  -Headers $headers

$workspace_id = $workspace.id
Write-Host "Workspace created: $($workspace.name) (ID: $workspace_id)"
```

### List Workspaces
```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

$headers = @{
    "Authorization" = "Bearer $token"
}

$workspaces = Invoke-RestMethod -Uri http://127.0.0.1:8000/api/v1/workspaces `
  -Headers $headers

foreach ($ws in $workspaces) {
    Write-Host "$($ws.id): $($ws.name) - $($ws.description)"
}
```

### Upload Document
```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$workspace_id = 1
$file_path = "C:\path\to\document.pdf"

$headers = @{
    "Authorization" = "Bearer $token"
}

$document = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/documents/upload?workspace_id=$workspace_id" `
  -Method POST `
  -Form @{
    file = Get-Item -Path $file_path
  } `
  -Headers $headers

Write-Host "Document uploaded: $($document.file_name) ($($document.file_size) bytes)"
```

### List Documents in Workspace
```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$workspace_id = 1

$headers = @{
    "Authorization" = "Bearer $token"
}

$result = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/documents?workspace_id=$workspace_id" `
  -Headers $headers

Write-Host "Total documents: $($result.total)"
foreach ($doc in $result.documents) {
    Write-Host "$($doc.id): $($doc.file_name) [$($doc.status)]"
}
```

### Delete Workspace (and all documents)
```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$workspace_id = 1

$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/workspaces/$workspace_id" `
  -Method DELETE `
  -Headers $headers

Write-Host "Workspace deleted successfully (documents also removed)"
```

---

## Interactive API Documentation
Visit: `http://127.0.0.1:8000/docs` for Swagger UI with test interface
