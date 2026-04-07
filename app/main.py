from fastapi import FastAPI
from app.api.resume_routes import router as resume_router

app = FastAPI(title="Resumind API")

# Include resume routes
app.include_router(resume_router, prefix="/resume", tags=["Resume"])

@app.get("/")
def read_root():
    return {"message": "Resumind API is running"}
