from fastapi import FastAPI

app = FastAPI(title="Resumind API")

@app.get("/")
def read_root():
    return {"message": "Resumind API is running"}
