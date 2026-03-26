from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.workspace import Workspace
from app.schemas.workspace import WorkspaceCreateRequest, WorkspaceUpdateRequest


class WorkspaceService:
    @staticmethod
    def create_workspace(db: Session, user_id: int, name: str, description: str | None = None) -> Workspace:
        workspace = Workspace(
            user_id=user_id,
            name=name,
            description=description,
        )
        db.add(workspace)
        db.commit()
        db.refresh(workspace)
        return workspace

    @staticmethod
    def get_user_workspaces(db: Session, user_id: int) -> list[Workspace]:
        return db.query(Workspace).filter(Workspace.user_id == user_id).all()

    @staticmethod
    def get_workspace_by_id(db: Session, workspace_id: int) -> Workspace | None:
        return db.query(Workspace).filter(Workspace.id == workspace_id).first()

    @staticmethod
    def verify_workspace_ownership(db: Session, workspace: Workspace, user_id: int) -> Workspace:
        if not workspace:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workspace not found"
            )
        if workspace.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this workspace"
            )
        return workspace

    @staticmethod
    def update_workspace(db: Session, workspace: Workspace, name: str | None = None, description: str | None = None) -> Workspace:
        if name is not None:
            workspace.name = name
        if description is not None:
            workspace.description = description

        db.commit()
        db.refresh(workspace)
        return workspace

    @staticmethod
    def delete_workspace(db: Session, workspace: Workspace) -> None:
        db.delete(workspace)
        db.commit()
