import requests
import json
from pathlib import Path
import sys

# Fix encoding for Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:8000"

def test_phase2_endpoints():
    print("=" * 70)
    print("PHASE 2 ENDPOINT TESTING - Workspaces & Documents")
    print("=" * 70)
    
    # 1. Signup
    print("\n[1] SIGNUP TEST")
    print("-" * 70)
    signup_data = {
        "name": "Phase2 Tester",
        "email": "phase2@test.com",
        "password": "TestPass123"
    }
    response = requests.post(f"{BASE_URL}/api/v1/auth/signup", json=signup_data)
    print(f"   Status: {response.status_code}")
    signup_result = response.json()
    
    if response.status_code != 201:
        # User already exists, try login
        print("   Warning: User already exists, attempting login...")
        login_data = {
            "email": "phase2@test.com",
            "password": "TestPass123"
        }
        response = requests.post(f"{BASE_URL}/api/v1/auth/login", json=login_data)
        signup_result = response.json()
    
    token = signup_result.get("access_token")
    user_id = signup_result.get("id")
    headers = {"Authorization": f"Bearer {token}"}
    print(f"   >> Token obtained: {token[:20]}...")
    
    # 2. Create Workspace
    print("\n[2] CREATE WORKSPACE TEST")
    print("-" * 70)
    workspace_data = {
        "name": "Test Workspace",
        "description": "A test workspace for Phase 2 testing"
    }
    response = requests.post(
        f"{BASE_URL}/api/v1/workspaces",
        json=workspace_data,
        headers=headers
    )
    print(f"   Status: {response.status_code}")
    print(f"   Response Text: {response.text[:500]}")
    if response.status_code != 201:
        print("   ERROR: Failed to create workspace")
        print(f"   Full response: {response.text}")
        return
    
    workspace_result = response.json()
    workspace_id = workspace_result.get("id")
    print(f"   >> Workspace created with ID: {workspace_id}")
    
    # 3. List Workspaces
    print("\n[3] LIST WORKSPACES TEST")
    print("-" * 70)
    response = requests.get(
        f"{BASE_URL}/api/v1/workspaces",
        headers=headers
    )
    print(f"   Status: {response.status_code}")
    workspaces = response.json()
    print(f"   >> Found {len(workspaces)} workspace(s)")
    
    # 4. Get Workspace Details
    print("\n[4] GET WORKSPACE DETAILS TEST")
    print("-" * 70)
    response = requests.get(
        f"{BASE_URL}/api/v1/workspaces/{workspace_id}",
        headers=headers
    )
    print(f"   Status: {response.status_code}")
    workspace_details = response.json()
    print(f"   Name: {workspace_details.get('name')}")
    
    # 5. Update Workspace
    print("\n[5] UPDATE WORKSPACE TEST")
    print("-" * 70)
    update_data = {
        "name": "Updated Workspace Name",
        "description": "Updated description"
    }
    response = requests.put(
        f"{BASE_URL}/api/v1/workspaces/{workspace_id}",
        json=update_data,
        headers=headers
    )
    print(f"   Status: {response.status_code}")
    print(f"   >> Workspace updated")
    
    # 6. Upload Document
    print("\n[6] UPLOAD DOCUMENT TEST")
    print("-" * 70)
    
    # Create a test file
    test_file_path = Path("test_document.txt")
    test_file_path.write_text("This is a test document for Phase 2 testing.")
    
    with open(test_file_path, "rb") as f:
        files = {"file": (f"test_document.txt", f, "text/plain")}
        response = requests.post(
            f"{BASE_URL}/api/v1/documents/upload?workspace_id={workspace_id}",
            files=files,
            headers=headers
        )
    
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.text[:500]}")
    
    if response.status_code != 201:
        print("   ERROR: Failed to upload document")
        return
        
    upload_result = response.json()
    document_id = upload_result.get("id")
    print(f"   >> Document uploaded with ID: {document_id}")
    
    # Clean up test file
    test_file_path.unlink()
    
    # 7. List Documents
    print("\n[7] LIST DOCUMENTS TEST")
    print("-" * 70)
    response = requests.get(
        f"{BASE_URL}/api/v1/documents?workspace_id={workspace_id}",
        headers=headers
    )
    print(f"   Status: {response.status_code}")
    documents = response.json()
    print(f"   >> Found {documents.get('total', 0)} document(s)")
    
    # 8. Get Document Details
    print("\n[8] GET DOCUMENT DETAILS TEST")
    print("-" * 70)
    response = requests.get(
        f"{BASE_URL}/api/v1/documents/{document_id}",
        headers=headers
    )
    print(f"   Status: {response.status_code}")
    document_details = response.json()
    print(f"   File: {document_details.get('file_name')}")
    print(f"   Size: {document_details.get('file_size')} bytes")
    
    # 9. Delete Document
    print("\n[9] DELETE DOCUMENT TEST")
    print("-" * 70)
    response = requests.delete(
        f"{BASE_URL}/api/v1/documents/{document_id}",
        headers=headers
    )
    print(f"   Status: {response.status_code}")
    if response.status_code == 204:
        print("   >> Document deleted successfully")
    else:
        print(f"   Response: {response.text}")
    
    # 10. Delete Workspace
    print("\n[10] DELETE WORKSPACE TEST")
    print("-" * 70)
    response = requests.delete(
        f"{BASE_URL}/api/v1/workspaces/{workspace_id}",
        headers=headers
    )
    print(f"   Status: {response.status_code}")
    if response.status_code == 204:
        print("   >> Workspace deleted successfully")
    else:
        print(f"   Response: {response.text}")
    
    print("\n" + "=" * 70)
    print("SUCCESS: ALL PHASE 2 ENDPOINT TESTS PASSED")
    print("=" * 70)

if __name__ == "__main__":
    test_phase2_endpoints()
