from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.user import User
from app.schemas import LoginRequest, SignupRequest, SignupResponse, TokenResponse, UserResponse
from cores.security import create_access_token, decode_access_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])
security = HTTPBearer()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Extract and validate JWT token from Authorization header.
    Returns the authenticated user or raises 401 error.
    """
    token = credentials.credentials
    
    # Decode token
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    # Get email from token
    email = payload.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    
    # Fetch user from database
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return user


@router.post("/signup", response_model=SignupResponse, status_code=status.HTTP_201_CREATED)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """
    Register a new user and return access token for immediate dashboard access.
    
    - **name**: User's full name (2-100 chars)
    - **email**: Unique email address
    - **password**: Minimum 6 characters (will be hashed)
    
    Returns user data along with JWT access token.
    """
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password
    password_hash = hash_password(request.password)
    
    # Create new user
    user = User(
        name=request.name,
        email=request.email,
        password_hash=password_hash
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Generate access token
    access_token = create_access_token(data={"sub": user.email})
    
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate user and return access token.
    
    - **email**: User's email
    - **password**: User's password
    """
    # Find user by email
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify password
    if not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Generate JWT token
    access_token = create_access_token(data={"sub": user.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/me", response_model=UserResponse)
def me(current_user: User = Depends(get_current_user)):
    """
    Get current authenticated user profile.
    
    Requires valid JWT token in Authorization header:
    Authorization: Bearer {access_token}
    
    Returns authenticated user data (id, name, email).
    """
    return current_user
