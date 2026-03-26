import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.services.workspace_service import WorkspaceService
from app.models.workspace import Workspace
from app.models.user import User
from cores.database import SessionLocal

# Create a test session
db = SessionLocal()

try:
    # First, get or create a test user
    print("Looking for test user...")
    test_user = db.query(User).filter(User.email == "phase2@test.com").first()
    
    if not test_user:
        print("ERROR: Test user not found. Please signup first.")
        db.close()
        exit(1)
    
    print(f"Found user: {test_user.email} (ID: {test_user.id})")
    
    # Test the create_workspace method directly
    print("\nTesting WorkspaceService.create_workspace...")
    
    workspace = WorkspaceService.create_workspace(
        db=db,
        user_id=test_user.id,
        name="Debug Test Workspace",
        description="Test workspace for debugging"
    )
    
    print(f"SUCCESS: Workspace created with ID: {workspace.id}")
    print(f"  Name: {workspace.name}")
    print(f"  User ID: {workspace.user_id}")
    print(f"  Created At: {workspace.created_at}")
    
except Exception as e:
    print(f"ERROR: {type(e).__name__}")
    print(f"Message: {str(e)}")
    import traceback
    traceback.print_exc()
finally:
    db.close()
