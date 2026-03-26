# Backend API Endpoints
# This file contains all API URLs for the DocuMind AI backend

# Base URL
BASE_URL = "http://127.0.0.1:8000"

# Health & Status Endpoints
HEALTH_ENDPOINT = f"{BASE_URL}/health"
ROOT_ENDPOINT = f"{BASE_URL}/"
TEST_DB_ENDPOINT = f"{BASE_URL}/test-db"

# Documentation
SWAGGER_DOCS = f"{BASE_URL}/docs"
REDOC_DOCS = f"{BASE_URL}/redoc"
OPENAPI_JSON = f"{BASE_URL}/openapi.json"

# Auth Endpoints
AUTH_BASE = f"{BASE_URL}/api/v1/auth"
SIGNUP_ENDPOINT = f"{AUTH_BASE}/signup"
LOGIN_ENDPOINT = f"{AUTH_BASE}/login"
CURRENT_USER_ENDPOINT = f"{AUTH_BASE}/me"

# Workspace Endpoints (Phase 2)
WORKSPACES_BASE = f"{BASE_URL}/api/v1/workspaces"
CREATE_WORKSPACE_ENDPOINT = f"{WORKSPACES_BASE}"
LIST_WORKSPACES_ENDPOINT = f"{WORKSPACES_BASE}"
GET_WORKSPACE_ENDPOINT = f"{WORKSPACES_BASE}/{{workspace_id}}"
UPDATE_WORKSPACE_ENDPOINT = f"{WORKSPACES_BASE}/{{workspace_id}}"
DELETE_WORKSPACE_ENDPOINT = f"{WORKSPACES_BASE}/{{workspace_id}}"

# Document Endpoints (Phase 2)
DOCUMENTS_BASE = f"{BASE_URL}/api/v1/documents"
UPLOAD_DOCUMENT_ENDPOINT = f"{DOCUMENTS_BASE}/upload"
LIST_DOCUMENTS_ENDPOINT = f"{DOCUMENTS_BASE}"
GET_DOCUMENT_ENDPOINT = f"{DOCUMENTS_BASE}/{{document_id}}"
DELETE_DOCUMENT_ENDPOINT = f"{DOCUMENTS_BASE}/{{document_id}}"

# API Versions
API_V1_PREFIX = "/api/v1"

# Endpoint Methods
class METHODS:
    GET = "GET"
    POST = "POST"
    PUT = "PUT"
    DELETE = "DELETE"
    PATCH = "PATCH"

# Endpoint Information
ENDPOINTS = {
    # System Endpoints
    "root": {
        "url": ROOT_ENDPOINT,
        "method": METHODS.GET,
        "description": "Returns welcome message"
    },
    "health": {
        "url": HEALTH_ENDPOINT,
        "method": METHODS.GET,
        "description": "Health check endpoint"
    },
    "test_db": {
        "url": TEST_DB_ENDPOINT,
        "method": METHODS.GET,
        "description": "Test database connectivity"
    },
    
    # Auth Endpoints
    "signup": {
        "url": SIGNUP_ENDPOINT,
        "method": METHODS.POST,
        "description": "User registration",
        "body": {
            "name": "string (2-100 chars)",
            "email": "string (valid email)",
            "password": "string (min 6 chars)"
        }
    },
    "login": {
        "url": LOGIN_ENDPOINT,
        "method": METHODS.POST,
        "description": "User login - returns JWT token",
        "body": {
            "email": "string (valid email)",
            "password": "string"
        }
    },
    "current_user": {
        "url": CURRENT_USER_ENDPOINT,
        "method": METHODS.GET,
        "description": "Get current authenticated user profile",
        "headers": {
            "Authorization": "Bearer <access_token>"
        }
    },
    
    # Workspace Endpoints (Phase 2)
    "create_workspace": {
        "url": CREATE_WORKSPACE_ENDPOINT,
        "method": METHODS.POST,
        "description": "Create a new workspace",
        "auth_required": True,
        "body": {
            "name": "string (1-200 chars)",
            "description": "string (optional)"
        }
    },
    "list_workspaces": {
        "url": LIST_WORKSPACES_ENDPOINT,
        "method": METHODS.GET,
        "description": "List all user workspaces",
        "auth_required": True
    },
    "get_workspace": {
        "url": GET_WORKSPACE_ENDPOINT,
        "method": METHODS.GET,
        "description": "Get workspace details",
        "auth_required": True,
        "params": {"workspace_id": "integer"}
    },
    "update_workspace": {
        "url": UPDATE_WORKSPACE_ENDPOINT,
        "method": METHODS.PUT,
        "description": "Update workspace name or description",
        "auth_required": True,
        "params": {"workspace_id": "integer"},
        "body": {
            "name": "string (optional)",
            "description": "string (optional)"
        }
    },
    "delete_workspace": {
        "url": DELETE_WORKSPACE_ENDPOINT,
        "method": METHODS.DELETE,
        "description": "Delete workspace and all documents",
        "auth_required": True,
        "params": {"workspace_id": "integer"}
    },
    
    # Document Endpoints (Phase 2)
    "upload_document": {
        "url": UPLOAD_DOCUMENT_ENDPOINT,
        "method": METHODS.POST,
        "description": "Upload document to workspace",
        "auth_required": True,
        "params": {"workspace_id": "integer"},
        "body": "multipart/form-data with file"
    },
    "list_documents": {
        "url": LIST_DOCUMENTS_ENDPOINT,
        "method": METHODS.GET,
        "description": "List documents (optionally filtered by workspace)",
        "auth_required": True,
        "params": {"workspace_id": "integer (optional)"}
    },
    "get_document": {
        "url": GET_DOCUMENT_ENDPOINT,
        "method": METHODS.GET,
        "description": "Get document details",
        "auth_required": True,
        "params": {"document_id": "integer"}
    },
    "delete_document": {
        "url": DELETE_DOCUMENT_ENDPOINT,
        "method": METHODS.DELETE,
        "description": "Delete document",
        "auth_required": True,
        "params": {"document_id": "integer"}
    }
}

# Quick Testing URLs (for manual testing)
# TODO: Add quick URLs if needed

# File Upload Configuration
from pathlib import Path

ALLOWED_FILE_TYPES = {"pdf", "docx", "txt", "md"}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB
UPLOAD_DIR = Path(__file__).parent.parent / "uploads"

UPLOAD_DIR.mkdir(exist_ok=True)

FILE_TYPE_EXTENSIONS = {
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "text/plain": "txt",
    "text/markdown": "md",
}
TESTING_URLS = {
    "swagger": SWAGGER_DOCS,
    "health": HEALTH_ENDPOINT,
    "root": ROOT_ENDPOINT,
    "db_test": TEST_DB_ENDPOINT,
    "signup": SIGNUP_ENDPOINT,
    "login": LOGIN_ENDPOINT,
    "me": CURRENT_USER_ENDPOINT,
    "create_workspace": CREATE_WORKSPACE_ENDPOINT,
    "list_workspaces": LIST_WORKSPACES_ENDPOINT,
    "upload_document": UPLOAD_DOCUMENT_ENDPOINT,
    "list_documents": LIST_DOCUMENTS_ENDPOINT,
}
