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

# Documents Endpoints
DOCUMENTS_BASE = f"{BASE_URL}/api/v1/documents"

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
    
    # Documents Endpoints
    "documents": {
        "url": DOCUMENTS_BASE,
        "method": METHODS.GET,
        "description": "Get all documents"
    }
}

# Quick Testing URLs (for manual testing)
TESTING_URLS = {
    "swagger": SWAGGER_DOCS,
    "health": HEALTH_ENDPOINT,
    "root": ROOT_ENDPOINT,
    "db_test": TEST_DB_ENDPOINT,
    "signup": SIGNUP_ENDPOINT,
    "login": LOGIN_ENDPOINT,
    "me": CURRENT_USER_ENDPOINT,
}
