from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.router import api_router
from app.core.database import Base, engine
from app.models.user import User  # noqa: F401

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DocuMind Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
def root():
    return {"message": "DocuMind AI backend running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/test-db")
def test_db():
    try:
        conn = engine.connect()
        result = conn.execute(text("SELECT 1"))
        conn.close()
        return {"message": "Database connection successful", "result": result.scalar()}
    except Exception as e:
        return {"error": str(e)}