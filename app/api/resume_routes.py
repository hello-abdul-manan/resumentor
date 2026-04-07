from fastapi import APIRouter, UploadFile, File, HTTPException, Body
from app.services.resume_parser import extract_text_from_pdf
from app.services.skill_extractor import extract_skills
from app.services.ai_analyzer import analyze_resume
from app.services.job_matcher import compute_match_score

router = APIRouter()

# Create API endpoint for resume upload
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

        # AI analysis
        ai_feedback = analyze_resume(extracted_text)

        return {
            "filename": file.filename,
            "skills": skills,
            "ai_feedback": ai_feedback,
            "preview_text": extracted_text[:300]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Create an API endpoint for job match
@router.post("/match-job")
async def match_job(resume_text: str = Body(...), job_description: str = Body(...)):
    """
    Compare resume text with job description
    """

    try:
        result = compute_match_score(resume_text, job_description)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
