from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.resume_parser import extract_text_from_pdf
from app.services.skill_extractor import extract_skills

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload a resume PDF and return extracted text.
    """

    # Validate file type
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    try:
        # Read file into memory
        file_bytes = await file.read()

        # Extract text from PDF
        extracted_text = extract_text_from_pdf(file_bytes)

        if not extracted_text:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")

        # Extract skills
        skills = extract_skills(extracted_text)

        return {
            "filename": file.filename,
            "skills": skills,
            "preview_text": extracted_text[:1000]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

