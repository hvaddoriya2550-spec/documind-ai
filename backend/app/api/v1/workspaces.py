from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.workspace import (
    WorkspaceCreateRequest,
    WorkspaceUpdateRequest,
    WorkspaceResponse,
    WorkspaceDetailResponse,
)
from app.services.workspace_service import WorkspaceService


router = APIRouter(
    prefix="/workspaces",
    tags=["workspaces"],
    dependencies=[Depends(get_current_user)],
)


@router.post("", response_model=WorkspaceResponse, status_code=status.HTTP_201_CREATED)
async def create_workspace(
    request: WorkspaceCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Create a new workspace for the authenticated user.
    
    - **name**: Workspace name (1-200 characters)
    - **description**: Optional workspace description
    """
    workspace = WorkspaceService.create_workspace(
        db=db,
        user_id=current_user.id,
        name=request.name,
        description=request.description,
    )
    return workspace


@router.get("", response_model=list[WorkspaceResponse])
async def list_workspaces(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get all workspaces for the authenticated user."""
    workspaces = WorkspaceService.get_user_workspaces(db=db, user_id=current_user.id)
    return workspaces


@router.get("/{workspace_id}", response_model=WorkspaceDetailResponse)
async def get_workspace(
    workspace_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get details of a specific workspace."""
    workspace = WorkspaceService.get_workspace_by_id(db=db, workspace_id=workspace_id)
    WorkspaceService.verify_workspace_ownership(db=db, workspace=workspace, user_id=current_user.id)
    return workspace


@router.put("/{workspace_id}", response_model=WorkspaceResponse)
async def update_workspace(
    workspace_id: int,
    request: WorkspaceUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update workspace name or description."""
    workspace = WorkspaceService.get_workspace_by_id(db=db, workspace_id=workspace_id)
    WorkspaceService.verify_workspace_ownership(db=db, workspace=workspace, user_id=current_user.id)

    updated_workspace = WorkspaceService.update_workspace(
        db=db,
        workspace=workspace,
        name=request.name,
        description=request.description,
    )
    return updated_workspace


@router.delete("/{workspace_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_workspace(
    workspace_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete a workspace and all its documents."""
    workspace = WorkspaceService.get_workspace_by_id(db=db, workspace_id=workspace_id)
    WorkspaceService.verify_workspace_ownership(db=db, workspace=workspace, user_id=current_user.id)
    
    WorkspaceService.delete_workspace(db=db, workspace=workspace)
    return None
