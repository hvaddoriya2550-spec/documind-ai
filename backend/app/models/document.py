from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Index, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base


class DocumentStatus(str, enum.Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    READY = "ready"
    FAILED = "failed"


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    workspace_id = Column(Integer, ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=False, index=True)
    file_name = Column(String(500), nullable=False)
    file_type = Column(String(50), nullable=False)
    file_path = Column(String(1000), nullable=False)
    file_size = Column(Integer, nullable=False)
    status = Column(SQLEnum(DocumentStatus), default=DocumentStatus.UPLOADED, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    workspace = relationship("Workspace", back_populates="documents")

    __table_args__ = (
        Index("idx_workspace_id_document", "workspace_id"),
        Index("idx_status_document", "status"),
        Index("idx_created_at_document", "created_at"),
    )
