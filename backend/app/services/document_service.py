import uuid
import shutil
from pathlib import Path
from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.models.document import Document, DocumentStatus
from app.models.workspace import Workspace
from app.constants import ALLOWED_FILE_TYPES, MAX_FILE_SIZE, UPLOAD_DIR


class DocumentService:
    @staticmethod
    def validate_file(file: UploadFile) -> None:
        if not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File name is required"
            )

        file_ext = Path(file.filename).suffix.lstrip(".").lower()
        if file_ext not in ALLOWED_FILE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File type '{file_ext}' not allowed. Allowed types: {', '.join(ALLOWED_FILE_TYPES)}"
            )

    @staticmethod
    async def save_file(file: UploadFile) -> tuple[str, int]:
        unique_filename = f"{uuid.uuid4()}_{file.filename}"
        file_path = UPLOAD_DIR / unique_filename

        try:
            with open(file_path, "wb") as buffer:
                content = await file.read()
                file_size = len(content)

                if file_size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"File size exceeds maximum allowed size of {MAX_FILE_SIZE / (1024*1024):.0f}MB"
                    )

                buffer.write(content)

            return str(file_path), file_size

        except Exception as e:
            if file_path.exists():
                file_path.unlink()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save file"
            )

    @staticmethod
    def create_document(
        db: Session,
        workspace_id: int,
        file_name: str,
        file_type: str,
        file_path: str,
        file_size: int,
    ) -> Document:
        document = Document(
            workspace_id=workspace_id,
            file_name=file_name,
            file_type=file_type,
            file_path=file_path,
            file_size=file_size,
            status=DocumentStatus.UPLOADED,
        )
        db.add(document)
        db.commit()
        db.refresh(document)
        return document

    @staticmethod
    def get_documents_by_workspace(db: Session, workspace_id: int) -> list[Document]:
        return db.query(Document).filter(Document.workspace_id == workspace_id).all()

    @staticmethod
    def get_user_documents(db: Session, user_id: int, workspace_id: int | None = None) -> list[Document]:
        query = db.query(Document).join(Workspace).filter(Workspace.user_id == user_id)

        if workspace_id:
            query = query.filter(Document.workspace_id == workspace_id)

        return query.all()

    @staticmethod
    def get_document_by_id(db: Session, document_id: int) -> Document | None:
        return db.query(Document).filter(Document.id == document_id).first()

    @staticmethod
    def verify_document_ownership(db: Session, document_id: int, user_id: int) -> Document:
        document = DocumentService.get_document_by_id(db, document_id)
        if not document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found"
            )

        workspace = db.query(Workspace).filter(Workspace.id == document.workspace_id).first()
        if not workspace or workspace.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this document"
            )

        return document

    @staticmethod
    def delete_document(db: Session, document: Document) -> None:
        try:
            file_path = Path(document.file_path)
            if file_path.exists():
                file_path.unlink()
        except Exception:
            pass

        db.delete(document)
        db.commit()