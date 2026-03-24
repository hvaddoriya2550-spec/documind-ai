from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.documents import router as documents_router

api_router = APIRouter()

api_router.include_router(
    auth_router,
    prefix="/api/v1"
)

api_router.include_router(
    documents_router,
    prefix="/api/v1/documents",
    tags=["Documents"]
)