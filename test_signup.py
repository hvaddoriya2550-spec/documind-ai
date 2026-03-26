import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health():
    """Test if server is running"""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=2)
        print(f"✓ Server is running: {response.json()}")
        return True
    except Exception as e:
        print(f"✗ Server not running: {e}")
        return False

def test_signup(name, email, password):
    """Test signup endpoint"""
    data = {
        "name": name,
        "email": email,
        "password": password
    }
    try:
        response = requests.post(f"{BASE_URL}/api/v1/auth/signup", json=data)
        print(f"\n📝Test Signup: {email}")
        print(f"  Status: {response.status_code}")
        print(f"  Response: {json.dumps(response.json(), indent=2)}")
        return response.json() if response.status_code in [200, 201] else None
    except Exception as e:
        print(f"✗ Signup error: {e}")
        return None

def test_login(email, password):
    """Test login endpoint"""
    data = {
        "email": email,
        "password": password
    }
    try:
        response = requests.post(f"{BASE_URL}/api/v1/auth/login", json=data)
        print(f"\n🔑 Test Login: {email}")
        print(f"  Status: {response.status_code}")
        print(f"  Response: {json.dumps(response.json(), indent=2)}")
        return response.json().get("access_token") if response.status_code == 200 else None
    except Exception as e:
        print(f"✗ Login error: {e}")
        return None

def test_me(token):
    """Test /me endpoint"""
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(f"{BASE_URL}/api/v1/auth/me", headers=headers)
        print(f"\n👤 Test /me endpoint")
        print(f"  Status: {response.status_code}")
        print(f"  Response: {json.dumps(response.json(), indent=2)}")
        return response.json()
    except Exception as e:
        print(f"✗ /me error: {e}")
        return None

if __name__ == "__main__":
    # Wait for server to start
    print("Waiting for server to start...")
    for i in range(30):
        if test_health():
            break
        time.sleep(1)
        if i == 29:
            print("✗ Server failed to start")
            exit(1)
    
    print("\n" + "="*60)
    print("TESTING SIGNUP FLOW")
    print("="*60)
    
    # Test 1: Signup new user
    print("\n[Test 1] Signup with new email")
    signup_response = test_signup("John Doe", "john@example.com", "password123")
    
    if signup_response and "access_token" in signup_response:
        token = signup_response["access_token"]
        
        # Test 2: Verify /me works with token
        print("\n[Test 2] Verify /me endpoint")
        test_me(token)
        
        # Test 3: Try signup with same email (should fail)
        print("\n[Test 3] Signup with duplicate email (should fail)")
        test_signup("Jane Doe", "john@example.com", "password456")
        
        # Test 4: Login with correct password
        print("\n[Test 4] Login with correct credentials")
        login_token = test_login("john@example.com", "password123")
        
        # Test 5: Login with wrong password  
        print("\n[Test 5] Login with wrong password (should fail)")
        test_login("john@example.com", "wrongpassword")
        
        # Test 6: Login with non-existent user
        print("\n[Test 6] Login with non-existent user (should fail)")
        test_login("nonexistent@example.com", "password123")

    print("\n" + "="*60)
    print("TESTS COMPLETED")
    print("="*60)
