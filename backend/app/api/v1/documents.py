from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.document_service import save_uploaded_file

router = APIRouter()

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt", ".md"}


@router.get("/")
def list_documents():
    return {"message": "Documents route working"}


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="File name missing")

    extension = "." + file.filename.split(".")[-1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOCX, TXT, MD files allowed"
            
        )

    return save_uploaded_file(file)