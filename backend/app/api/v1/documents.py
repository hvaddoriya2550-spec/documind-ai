from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.document import DocumentResponse, DocumentListResponse
from app.services.document_service import DocumentService
from app.services.workspace_service import WorkspaceService


router = APIRouter(
    prefix="/documents",
    tags=["documents"],
    dependencies=[Depends(get_current_user)],
)


@router.post("/upload", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def upload_document(
    workspace_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Upload a document to a workspace.
    
    - **workspace_id**: ID of the workspace to upload to
    - **file**: Document file (PDF, DOCX, TXT, MD)
    
    Returns the created document with metadata.
    """
    workspace = WorkspaceService.get_workspace_by_id(db=db, workspace_id=workspace_id)
    if not workspace:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workspace not found"
        )
    
    WorkspaceService.verify_workspace_ownership(db=db, workspace=workspace, user_id=current_user.id)

    DocumentService.validate_file(file)

    file_path, file_size = await DocumentService.save_file(file)

    file_ext = file.filename.split(".")[-1].lower()

    document = DocumentService.create_document(
        db=db,
        workspace_id=workspace_id,
        file_name=file.filename,
        file_type=file_ext,
        file_path=file_path,
        file_size=file_size,
    )

    return document


@router.get("", response_model=DocumentListResponse)
async def list_documents(
    workspace_id: int | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    List documents for the authenticated user.
    
    - **workspace_id**: Optional filter by workspace
    
    Returns all user's documents or filtered by workspace.
    """
    documents = DocumentService.get_user_documents(
        db=db,
        user_id=current_user.id,
        workspace_id=workspace_id,
    )

    return DocumentListResponse(
        documents=documents,
        total=len(documents),
        workspace_id=workspace_id,
    )


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get details of a specific document."""
    document = DocumentService.verify_document_ownership(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
    )
    return document


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete a document."""
    document = DocumentService.verify_document_ownership(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
    )
    
    DocumentService.delete_document(db=db, document=document)
    return None