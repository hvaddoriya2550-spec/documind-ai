"""Script to check and clear database"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)) + "/backend")

from app.core.database import SessionLocal, engine, Base
from app.models.user import User
from sqlalchemy import text

def check_database():
    """Check what users exist in database"""
    db = SessionLocal()
    try:
        users = db.query(User).all()
        print(f"Found {len(users)} users in database:")
        for user in users:
            print(f"  - ID: {user.id}, Email: {user.email}, Name: {user.name}")
        return users
    finally:
        db.close()

def clear_users_table():
    """Clear all users from database"""
    db = SessionLocal()
    try:
        db.query(User).delete()
        db.commit()
        print("✓ All users cleared from database")
    except Exception as e:
        print(f"✗ Error clearing users: {e}")
        db.rollback()
    finally:
        db.close()

def reset_database():
    """Reset database - drop and recreate all tables"""
    try:
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)
        print("✓ Database tables reset successfully")
    except Exception as e:
        print(f"✗ Error resetting database: {e}")

if __name__ == "__main__":
    print("Checking current database state...")
    users = check_database()
    
    if users:
        print("\nClearing database...")
        clear_users_table()
        print("\nDatabase state after clearing:")
        check_database()
    else:
        print("✓ Database is already clean")
