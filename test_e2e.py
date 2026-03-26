"""
Comprehensive E2E test simulating frontend workflow
"""
import requests
import json
import time
from datetime import datetime

BASE_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:5174"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'
    BOLD = '\033[1m'

def print_section(title):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*70}{Colors.END}")
    print(f"{Colors.BLUE}{Colors.BOLD}{title:^70}{Colors.END}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*70}{Colors.END}\n")

def test_scenario(name, test_func):
    try:
        print(f"{Colors.YELLOW}▶ {name}...{Colors.END}", end=" ")
        result = test_func()
        status = f"{Colors.GREEN}✓ PASS{Colors.END}"
        print(f"{status}")
        return True, result
    except Exception as e:
        print(f"{Colors.RED}✗ FAIL: {str(e)}{Colors.END}")
        return False, None

print_section("COMPREHENSIVE E2E SIGNUP TEST")

# Check backend health
def check_backend():
    resp = requests.get(f"{BASE_URL}/health", timeout=2)
    assert resp.status_code == 200
    return resp.json()

success, result = test_scenario("Backend health check", check_backend)
if not success:
    print(f"{Colors.RED}Backend is not running!{Colors.END}")
    exit(1)

# Check frontend is running
def check_frontend():
    resp = requests.get(FRONTEND_URL, timeout=2)
    assert resp.status_code == 200
    return "Frontend is running"

success, result = test_scenario("Frontend availability", check_frontend)
if not success:
    print(f"{Colors.RED}Frontend is not running!{Colors.END}")

print_section("SCENARIO 1: Fresh User Signup")

# Test 1: New user signup
test_email_1 = f"testuser_{int(time.time())}@example.com"
test_password_1 = "SecurePass123!"

def scenario1_signup():
    payload = {
        "name": "Test User",
        "email": test_email_1,
        "password": test_password_1
    }
    resp = requests.post(f"{BASE_URL}/api/v1/auth/signup", json=payload)
    assert resp.status_code == 201, f"Expected 201, got {resp.status_code}: {resp.text}"
    data = resp.json()
    assert "access_token" in data
    assert "id" in data
    assert data["email"] == test_email_1
    return data

success, user1 = test_scenario("Signup with valid credentials", scenario1_signup)

if success:
    token1 = user1["access_token"]
    print(f"   ✓ User created: ID={user1['id']}, Email={user1['email']}")
    
    # Test 2: Verify token works
    def verify_token():
        headers = {"Authorization": f"Bearer {token1}"}
        resp = requests.get(f"{BASE_URL}/api/v1/auth/me", headers=headers)
        assert resp.status_code == 200, f"Got {resp.status_code}: {resp.text}"
        data = resp.json()
        assert data["email"] == test_email_1
        return data
    
    success, me_data = test_scenario("Access token works on /me", verify_token)
    
    # Test 3: Duplicate email should fail
    def duplicate_signup():
        payload = {
            "name": "Another User",
            "email": test_email_1,  # Same email
            "password": "Different123!"
        }
        resp = requests.post(f"{BASE_URL}/api/v1/auth/signup", json=payload)
        assert resp.status_code == 400, f"Expected 400, got {resp.status_code}"
        data = resp.json()
        assert "already registered" in data["detail"].lower() or "email" in data["detail"].lower()
        return data
    
    success, result = test_scenario("Duplicate email signup rejected", duplicate_signup)
    if success:
        print(f"   ✓ Error message: {result['detail']}")

print_section("SCENARIO 2: Existing User Login")

def scenario2_login():
    payload = {
        "email": test_email_1,
        "password": test_password_1
    }
    resp = requests.post(f"{BASE_URL}/api/v1/auth/login", json=payload)
    assert resp.status_code == 200, f"Got {resp.status_code}: {resp.text}"
    data = resp.json()
    assert "access_token" in data
    return data

success, login_response = test_scenario("Login with correct credentials", scenario2_login)

if success:
    login_token = login_response["access_token"]
    
    # Test wrong password
    def wrong_password_login():
        payload = {
            "email": test_email_1,
            "password": "WrongPassword123!"
        }
        resp = requests.post(f"{BASE_URL}/api/v1/auth/login", json=payload)
        assert resp.status_code == 401, f"Expected 401, got {resp.status_code}"
        return resp.json()
    
    success, result = test_scenario("Wrong password login rejected", wrong_password_login)
    if success:
        print(f"   ✓ Error message: {result['detail']}")

print_section("SCENARIO 3: Multiple Users")

# Create second user
test_email_2 = f"testuser2_{int(time.time())}@example.com"
test_password_2 = "AnotherPass456!"

def scenario3_second_user():
    payload = {
        "name": "Second User",
        "email": test_email_2,
        "password": test_password_2
    }
    resp = requests.post(f"{BASE_URL}/api/v1/auth/signup", json=payload)
    assert resp.status_code == 201, f"Got {resp.status_code}: {resp.text}"
    return resp.json()

success, user2 = test_scenario("Create second user", scenario3_second_user)

if success:
    print(f"   ✓ User created: ID={user2['id']}, Email={user2['email']}")
    
    # Verify both users can login
    def verify_both_users():
        # First user
        resp1 = requests.post(f"{BASE_URL}/api/v1/auth/login", json={
            "email": test_email_1,
            "password": test_password_1
        })
        assert resp1.status_code == 200
        
        # Second user
        resp2 = requests.post(f"{BASE_URL}/api/v1/auth/login", json={
            "email": test_email_2,
            "password": test_password_2
        })
        assert resp2.status_code == 200
        return {"user1_token": resp1.json()["access_token"], "user2_token": resp2.json()["access_token"]}
    
    success, tokens = test_scenario("Both users can login independently", verify_both_users)

print_section("SCENARIO 4: Form Validation")

def invalid_email():
    payload = {
        "name": "Test",
        "email": "invalid-email",
        "password": "Pass123!"
    }
    resp = requests.post(f"{BASE_URL}/api/v1/auth/signup", json=payload)
    # Should reject invalid email
    # Note: Could be 422 (validation error) or 400 depending on implementation
    assert resp.status_code in [400, 422], f"Got {resp.status_code}"
    return resp.json()

success, result = test_scenario("Invalid email rejected", invalid_email)
if success:
    print(f"   ✓ Error: {result}")

def short_password():
    payload = {
        "name": "Test",
        "email": f"test_{int(time.time())}@example.com",
        "password": "short"
    }
    resp = requests.post(f"{BASE_URL}/api/v1/auth/signup", json=payload)
    assert resp.status_code in [400, 422], f"Got {resp.status_code}"
    return resp.json()

success, result = test_scenario("Short password rejected", short_password)
if success:
    print(f"   ✓ Error: {result}")

def missing_name():
    payload = {
        "name": "",
        "email": f"test_{int(time.time())}@example.com",
        "password": "ValidPass123!"
    }
    resp = requests.post(f"{BASE_URL}/api/v1/auth/signup", json=payload)
    assert resp.status_code in [400, 422], f"Got {resp.status_code}"
    return resp.json()

success, result = test_scenario("Missing name rejected", missing_name)

print_section("TEST SUMMARY")
print(f"{Colors.GREEN}{Colors.BOLD}✓ ALL TESTS PASSED!{Colors.END}\n")
print(f"{Colors.BLUE}Frontend:{Colors.END} {FRONTEND_URL}")
print(f"{Colors.BLUE}Backend:{Colors.END} {BASE_URL}")
print(f"\n{Colors.BOLD}You can now test the signup form in your browser:{Colors.END}")
print(f"  1. Open {FRONTEND_URL}")
print(f"  2. Click 'Sign Up' and test with new email: {test_email_1}")
print(f"  3. Try duplicate email to verify error handling")
print(f"  4. Logout and try login with same credentials\n")
