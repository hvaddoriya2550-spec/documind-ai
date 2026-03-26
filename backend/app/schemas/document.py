from datetime import datetime
from pydantic import BaseModel, Field
from app.models.document import DocumentStatus


class DocumentResponse(BaseModel):
    id: int
    workspace_id: int
    file_name: str
    file_type: str
    file_size: int
    status: DocumentStatus
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class DocumentListResponse(BaseModel):
    documents: list[DocumentResponse]
    total: int
    workspace_id: int | None = None
