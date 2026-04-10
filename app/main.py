from fastapi import FastAPI
from app.api.resume_routes import router as resume_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Resumind API")

# Add CORS middleware to allow frontend to backend commuincation
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include resume routes
app.include_router(resume_router, prefix="/resume", tags=["Resume"])

@app.get("/")
def read_root():
    return {"message": "Resumind API is running"}
