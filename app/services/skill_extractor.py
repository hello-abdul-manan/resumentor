import spacy

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Basic skill database
SKILLS_DB = [
"python", "java", "c++", "javascript",
    "fastapi", "django", "flask",
    "machine learning", "deep learning",
    "nlp", "data science",
    "docker", "kubernetes",
    "sql", "postgresql", "mongodb",
    "git", "github",
    "aws", "azure", "gcp"
]

def extract_skills(text: str) -> list:
    """
    Extract skills from resume text using simple matching
    """
    extracted_skills = set()

    # Convert text into tokens
    doc = nlp(text.lower())

    # Convert tokens into actual words
    words = [token.text for token in doc]

    # Match single-word skills
    for word in words:
        if word in SKILLS_DB:
            extracted_skills.add(word)

    # Match multi-word skills:
    for skill in SKILLS_DB:
        if " " in skill and skill in text.lower():
            extracted_skills.add(skill)

    return list(extracted_skills)
