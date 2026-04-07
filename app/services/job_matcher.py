from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.services.skill_extractor import extract_skills

def compute_match_score(resume_text: str, job_text: str) -> dict:
    """
    Compare resume with job description and return match insights.
    """

    # Skill extraction
    resume_skills = set(extract_skills(resume_text))
    job_skills = set(extract_skills(job_text))

    # Extract matched and missing skills
    matched_skills = list(resume_skills.intersection(job_skills))
    missing_skills = list(job_skills - resume_skills)

    # Check text similarity and get match score
    vectorizer = TfidfVectorizer(stop_words="english")
    vectors = vectorizer.fit_transform([resume_text, job_text])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
    match_score = round(similarity * 100)

    return {
        "match_score": match_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }
